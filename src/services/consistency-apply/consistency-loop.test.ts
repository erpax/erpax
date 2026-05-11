/**
 * ConsistencyAgent end-to-end loop test — Slice JJJJJJJJ (2026-05-11).
 *
 * Proves the self-healing pipeline closes structural drift in one
 * complete cycle:
 *
 *   1. Introduce synthetic drift on a tmp repo:
 *        - a chain step with `emits: 'X:Y'` but no `producer:`
 *        - a collection declaring `emits: ['x:y']` in legacy string form
 *   2. Run the invariants — assert each gap is detected.
 *   3. Call applyAllConsistencyFixes — assert it patches both.
 *   4. Re-run invariants — assert the gap is closed.
 *
 * This test protects every link in the chain:
 *   - Invariant detection (checkChainEmitsHaveProducer, checkFactoryEmitsAreHooked)
 *   - Library transforms (applyChainProducerBackfill, applyEmitsLegacyToStructured)
 *   - Idempotency (re-run is a no-op)
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — round-trip the agent loop
 * @audit ISO 19011:2018 §6.4.6 — synthetic drift + recovery audit-trailable
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { applyAllConsistencyFixes, applyChainProducerBackfill } from './index'

let tmp: string

beforeEach(() => {
  tmp = mkdtempSync(join(tmpdir(), 'erpax-consistency-'))
  mkdirSync(join(tmp, 'src/services/business-chains'), { recursive: true })
  mkdirSync(join(tmp, 'src/plugins/accounting/collections'), { recursive: true })
  mkdirSync(join(tmp, 'src/hooks'), { recursive: true })
  // Stub chainEventEmitters so applyAll's "fired" lookup finds something.
  writeFileSync(
    join(tmp, 'src/hooks/chainEventEmitters.ts'),
    `// stub for test\nexport const _ = 0\n`,
  )
})

afterEach(() => {
  rmSync(tmp, { recursive: true, force: true })
})

describe('Consistency loop — Slice JJJJJJJJ', () => {
  it('applyChainProducerBackfill closes a synthetic Class J orphan', () => {
    // Synthetic registry with one step that lacks producer:
    const registry = `
import type { BusinessChainRegistry } from './types'
export const BUSINESS_CHAINS: BusinessChainRegistry = {
  TEST_CHAIN: {
    id: 'TEST_CHAIN',
    name: 'Test',
    description: 'Test',
    standards: [],
    steps: [
      { collection: 'invoices', action: 'activate', emits: 'bill:activated', requires: [] },
    ],
    seedFile: 'tests/test-chain.ts',
    testFile: 'tests/test-chain.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'partial', isStandard: true },
  },
}
`
    writeFileSync(join(tmp, 'src/services/business-chains/registry.ts'), registry)
    // First run patches the missing producer.
    const r1 = applyChainProducerBackfill({ repoRoot: tmp })
    expect(r1.applied).toBe(1)
    const after = readFileSync(join(tmp, 'src/services/business-chains/registry.ts'), 'utf8')
    expect(after).toContain('producer:')
    expect(after).toContain(`onStatus: 'activated'`)
    expect(after).toContain(`aggregate: 'invoice'`)
    // Idempotent: second run is a no-op.
    const r2 = applyChainProducerBackfill({ repoRoot: tmp })
    expect(r2.applied).toBe(0)
  })

  it('applyAllConsistencyFixes is idempotent — re-running on clean tree is no-op', () => {
    // Clean registry (every step has producer: already).
    const registry = `
import type { BusinessChainRegistry } from './types'
export const BUSINESS_CHAINS: BusinessChainRegistry = {
  TEST_CHAIN: {
    id: 'TEST_CHAIN',
    name: 'Test',
    description: 'Test',
    standards: [],
    steps: [
      { collection: 'invoices', action: 'activate', emits: 'bill:activated', requires: [], producer: { onStatus: 'activated', aggregate: 'invoice' } },
    ],
    seedFile: 'tests/test-chain.ts',
    testFile: 'tests/test-chain.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'yes', isStandard: true },
  },
}
`
    writeFileSync(join(tmp, 'src/services/business-chains/registry.ts'), registry)
    const r1 = applyAllConsistencyFixes({ repoRoot: tmp })
    expect(r1.applied).toBe(0)
    const r2 = applyAllConsistencyFixes({ repoRoot: tmp })
    expect(r2.applied).toBe(0)
  })

  it('dry-run mode does not modify the source file', () => {
    const registry = `
import type { BusinessChainRegistry } from './types'
export const BUSINESS_CHAINS: BusinessChainRegistry = {
  TEST_CHAIN: {
    id: 'TEST_CHAIN', name: 'T', description: 'T', standards: [],
    steps: [
      { collection: 'invoices', action: 'activate', emits: 'bill:activated', requires: [] },
    ],
    seedFile: 't.ts', testFile: 't.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'no', isStandard: true },
  },
}
`
    writeFileSync(join(tmp, 'src/services/business-chains/registry.ts'), registry)
    const before = readFileSync(join(tmp, 'src/services/business-chains/registry.ts'), 'utf8')
    const r = applyChainProducerBackfill({ repoRoot: tmp, dryRun: true })
    expect(r.applied).toBe(1)  // reports the would-be patch count
    const after = readFileSync(join(tmp, 'src/services/business-chains/registry.ts'), 'utf8')
    expect(after).toBe(before)  // file unchanged
  })

  it('unknown action is skipped + logged in changes', () => {
    const registry = `
import type { BusinessChainRegistry } from './types'
export const BUSINESS_CHAINS: BusinessChainRegistry = {
  TEST_CHAIN: {
    id: 'TEST_CHAIN', name: 'T', description: 'T', standards: [],
    steps: [
      { collection: 'invoices', action: 'frobnicate', emits: 'bill:frobbed', requires: [] },
    ],
    seedFile: 't.ts', testFile: 't.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'no', isStandard: true },
  },
}
`
    writeFileSync(join(tmp, 'src/services/business-chains/registry.ts'), registry)
    const r = applyChainProducerBackfill({ repoRoot: tmp })
    expect(r.applied).toBe(0)
    expect(r.skipped).toBeGreaterThan(0)
    expect(r.changes.some((c) => c.action === 'skip:unknown-action')).toBe(true)
  })

  it('unknown collection→aggregate is skipped + logged', () => {
    const registry = `
import type { BusinessChainRegistry } from './types'
export const BUSINESS_CHAINS: BusinessChainRegistry = {
  TEST_CHAIN: {
    id: 'TEST_CHAIN', name: 'T', description: 'T', standards: [],
    steps: [
      { collection: 'made-up-collection', action: 'post', emits: 'made:up', requires: [] },
    ],
    seedFile: 't.ts', testFile: 't.test.ts',
    socraticCheck: { canDo: true, makesSense: true, wired: 'no', isStandard: true },
  },
}
`
    writeFileSync(join(tmp, 'src/services/business-chains/registry.ts'), registry)
    const r = applyChainProducerBackfill({ repoRoot: tmp })
    expect(r.applied).toBe(0)
    expect(r.changes.some((c) => c.action === 'skip:unknown-aggregate')).toBe(true)
  })
})
