import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { auditWork, auditVerdict, atomPath, swallowedInMutation, auditPanel, AUDITORS } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-agentaudit-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('audit/agent — audit the agent as a real auditor audits a human', () => {
  it('names its path', () => {
    expect(atomPath).toBe('agent')
  })

  // The auditor's core move: a control (a claim) with no test of it is a submission with no evidence.
  it('REFUSES a changed atom that claims and has no proof leg', () => {
    const cwd = corpus({
      'src/ledger/index.ts': '/**\n * @invariant debits === credits\n * @compliance SOX §404\n */\nexport const post = () => 1',
    })
    const v = auditVerdict(['src/ledger/index.ts'], cwd)
    expect(v.accepted).toBe(false)
    expect(v.findings[0]).toMatchObject({ concern: 'no-proof-leg' })
    expect(v.findings.map((f) => f.claim)).toContain('debits === credits')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('ACCEPTS the same claim once a test sits beside it — the auditor can trace the evidence', () => {
    const cwd = corpus({
      'src/ledger/index.ts': '/**\n * @invariant debits === credits\n */\nexport const post = () => 1',
      'src/ledger/test.ts': 'it("balances", () => {})',
    })
    expect(auditVerdict(['src/ledger/index.ts'], cwd).accepted).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('audits every @-claim class a human signs — invariant, standard, compliance, audit', () => {
    const cwd = corpus({
      'src/x/index.ts': '/**\n * @standard SOX:2002\n * @audit ISO-19011\n */\nexport const x = 1',
    })
    expect(auditWork(['src/x/index.ts'], cwd)).toHaveLength(2)
    rmSync(cwd, { recursive: true, force: true })
  })

  // A standard named in a STRING is data, not a claim the agent is making — the lie reference and emit each
  // paid for. syntax settles what a comment is, so the auditor does not flag a fixture.
  it('a standard in a STRING is not a claim — the auditor reads comments, not data', () => {
    const cwd = corpus({
      'src/s/index.ts': `export const msg = 'mentions @invariant and SOX §404 in a string'\nexport const x = 1`,
    })
    expect(auditWork(['src/s/index.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a code file with no claim is nothing to audit — silence is not a submission', () => {
    const cwd = corpus({ 'src/q/index.ts': 'export const q = 1' })
    expect(auditVerdict(['src/q/index.ts'], cwd).accepted).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the test file itself is not a claimant, and markdown is prose by design', () => {
    const cwd = corpus({
      'src/a/test.ts': 'it("x", () => { /* @invariant y */ })',
      'src/a/SKILL.md': '# a\n@invariant this is documentation prose',
    })
    expect(auditWork(['src/a/test.ts', 'src/a/SKILL.md'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a deleted file is not audited — there is nothing to submit', () => {
    const cwd = corpus({ 'src/keep/index.ts': 'export const k = 1' })
    expect(auditWork(['src/gone/index.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })
})

describe('the PANEL — all kinds of auditors, each from their own seat', () => {
  const corpus2 = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-panel-'))
    for (const [p, text] of Object.entries(files)) {
      mkdirSync(join(cwd, p, '..'), { recursive: true })
      writeFileSync(join(cwd, p), text)
    }
    return cwd
  }

  // The FINANCIAL auditor: a posting that records as done while the entry silently did not — the
  // swallowed-JE class, saved from a throwaway probe into a real detector an auditor composes.
  it('the financial auditor refuses a swallowed journal entry', () => {
    const cwd = corpus2({
      'src/post/index.ts':
        'export const hook = async () => {\n  try {\n    await journalEntryService.createEntry()\n  } catch (e) {\n    logger.error(e)\n  }\n}',
    })
    const fin = swallowedInMutation(['src/post/index.ts'], cwd)
    expect(fin).toHaveLength(1)
    expect(fin[0]!.claim).toMatch(/books a journal entry and does not rethrow/)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the financial auditor ACCEPTS a posting that rethrows — the failure is surfaced', () => {
    const cwd = corpus2({
      'src/post/index.ts':
        'export const hook = async () => {\n  try {\n    await journalEntryService.createEntry()\n  } catch (e) {\n    logger.error(e)\n    throw e\n  }\n}',
    })
    expect(swallowedInMutation(['src/post/index.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the panel convenes EVERY seat on one changeset — one submission, N auditors', () => {
    const cwd = corpus2({
      'src/post/index.ts':
        '/**\n * @compliance SOX §404\n */\nexport const hook = async () => {\n  try { await journalEntryService.createEntry() } catch (e) { logger.error(e) }\n}',
    })
    const panel = auditPanel(['src/post/index.ts'], cwd)
    const roles = panel.map((s) => s.role)
    expect(roles).toEqual(['lead-auditor', 'financial-auditor', 'compliance-officer'])
    // the lead auditor sees the unproven SOX claim; the financial auditor sees the swallowed JE — DIFFERENT
    // findings on the SAME file, each only from its own seat.
    expect(panel.find((s) => s.role === 'lead-auditor')!.findings.length).toBeGreaterThan(0)
    expect(panel.find((s) => s.role === 'financial-auditor')!.findings.length).toBeGreaterThan(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a clean submission is accepted by the whole panel', () => {
    const cwd = corpus2({
      'src/clean/index.ts': '/**\n * @invariant x > 0\n */\nexport const x = 1',
      'src/clean/test.ts': 'it("x", () => {})',
    })
    const panel = auditPanel(['src/clean/index.ts'], cwd)
    expect(panel.every((s) => s.findings.length === 0)).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })
})
