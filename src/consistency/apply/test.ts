import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  applyChainProducerBackfill,
  applyEmitsLegacyToStructured,
  applyLocalizedTrueFlag,
  applyEmergingGapScaffold,
  applyAllConsistencyFixes,
  type ApplySummary,
  type EmergingGapHint,
} from '@/consistency/apply'

// consistency/apply (./index.ts): deterministic, idempotent, audited
// transforms — read · rewrite · write-back · report. Re-running is a no-op
// and a missing target directory yields the empty summary. All tests run
// against an isolated temp repoRoot so the real repo is never touched.

const EMPTY: ApplySummary = { applied: 0, skipped: 0, changes: [] }

describe('consistency/apply — deterministic idempotent audited transforms', () => {
  let root: string
  beforeAll(() => {
    root = mkdtempSync(join(tmpdir(), 'erpax-apply-'))
  })
  afterAll(() => {
    rmSync(root, { recursive: true, force: true })
  })

  it('a missing target directory yields the empty summary', () => {
    expect(applyChainProducerBackfill({ repoRoot: root })).toEqual(EMPTY)
    expect(applyEmitsLegacyToStructured({ repoRoot: root })).toEqual(EMPTY)
    expect(applyLocalizedTrueFlag({ repoRoot: root })).toEqual(EMPTY)
  })

  it('applyLocalizedTrueFlag injects localized:true on localizable fields and is idempotent', () => {
    const collDir = join(root, 'src/plugins/accounting/collections')
    mkdirSync(collDir, { recursive: true })
    const fp = join(collDir, 'demo.ts')
    writeFileSync(
      fp,
      [
        `const fields = [`,
        `  { name: 'title', type: 'text' },`,
        `  { name: 'amount', type: 'number' },`, // not text/textarea, not localizable
        `  { name: 'description', type: 'textarea' },`,
        `]`,
      ].join('\n'),
    )

    // dryRun computes the summary without writing
    const before = readFileSync(fp, 'utf8')
    const dry = applyLocalizedTrueFlag({ repoRoot: root, dryRun: true })
    expect(dry.applied).toBe(2) // title + description
    expect(readFileSync(fp, 'utf8')).toBe(before) // unchanged on dry run

    // real run writes back
    const run1 = applyLocalizedTrueFlag({ repoRoot: root })
    expect(run1.applied).toBe(2)
    const after = readFileSync(fp, 'utf8')
    expect(after).toContain(`name: 'title', type: 'text', localized: true`)
    expect(after).toContain(`name: 'description', type: 'textarea', localized: true`)
    expect(after).toContain(`name: 'amount', type: 'number'`) // non-localizable untouched
    expect(after.match(/localized: true/g)).toHaveLength(2)

    // idempotent: re-running is a no-op
    const run2 = applyLocalizedTrueFlag({ repoRoot: root })
    expect(run2.applied).toBe(0)
    expect(readFileSync(fp, 'utf8')).toBe(after)
  })

  it('every change is auditable — (file, action, detail) tuples are reported', () => {
    const collDir = join(root, 'src/plugins/accounting/collections')
    const fp = join(collDir, 'audit-demo.ts')
    writeFileSync(fp, `const fields = [{ name: 'summary', type: 'text' }]`)
    const run = applyLocalizedTrueFlag({ repoRoot: root })
    expect(run.changes.length).toBeGreaterThan(0)
    const change = run.changes.find((c) => c.file.endsWith('audit-demo.ts'))!
    expect(change.action).toBe('applyLocalizedTrueFlag')
    expect(typeof change.detail).toBe('string')
    expect(change.detail.length).toBeGreaterThan(0)
  })

  it('applyEmergingGapScaffold skips weak gaps and writes/skips deterministically', () => {
    const strong: EmergingGapHint = {
      suggestedTool: 'erpax.demo.reconcile',
      area: 'demo',
      concept: 'reconcile',
      evidence: ['ledger', 'balance'],
      anchorPair: ['erpax.demo.a', 'erpax.demo.b'],
      anchorScore: 0.9,
    }
    const weakScore: EmergingGapHint = { ...strong, concept: 'weak', anchorScore: 0.1 }
    const weakEvidence: EmergingGapHint = { ...strong, concept: 'thin', evidence: ['only-one'] }

    const dry = applyEmergingGapScaffold({ repoRoot: root, dryRun: true, gaps: [strong, weakScore, weakEvidence] })
    expect(dry.applied).toBe(1) // only the strong gap qualifies
    expect(dry.skipped).toBe(2)
    expect(existsSync(join(root, 'src/services/agents/mcp/generated/demo/reconcile.ts'))).toBe(false)

    const run = applyEmergingGapScaffold({ repoRoot: root, gaps: [strong] })
    expect(run.applied).toBe(1)
    const out = join(root, 'src/services/agents/mcp/generated/demo/reconcile.ts')
    expect(existsSync(out)).toBe(true)
    expect(readFileSync(out, 'utf8')).toContain('erpax.demo.reconcile')

    // idempotent: existing stub is skipped
    const run2 = applyEmergingGapScaffold({ repoRoot: root, gaps: [strong] })
    expect(run2.applied).toBe(0)
    expect(run2.skipped).toBe(1)
  })

  it('applyAllConsistencyFixes aggregates a well-formed ApplySummary', () => {
    const fresh = mkdtempSync(join(tmpdir(), 'erpax-applyall-'))
    try {
      const summary = applyAllConsistencyFixes({ repoRoot: fresh, dryRun: true })
      expect(typeof summary.applied).toBe('number')
      expect(typeof summary.skipped).toBe('number')
      expect(Array.isArray(summary.changes)).toBe(true)
      // aggregate count is the sum of the per-class change lists' integrity:
      for (const c of summary.changes) {
        expect(typeof c.file).toBe('string')
        expect(typeof c.action).toBe('string')
      }
    } finally {
      rmSync(fresh, { recursive: true, force: true })
    }
  })
})
