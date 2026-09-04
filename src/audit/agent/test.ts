import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { auditWork, auditVerdict, atomPath, swallowedInMutation, auditPanel, AUDITORS, duplicateBodies, auditAuditors, AUDIT_GATES, assertChangesetAudited, panelAuditor, auditTree, truncatedInReport, unacknowledgedProof, hollowProof, type Auditor } from './index'

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
    expect(atomPath).toBe(atomAddress(import.meta.url).leaf)
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
    expect(roles).toEqual(['lead-auditor', 'financial-auditor', 'compliance-officer', 'quality-auditor', 'integrity-auditor', 'peer-reviewer'])
    // the lead auditor sees the unproven SOX claim; the financial auditor sees the swallowed JE — DIFFERENT
    // findings on the SAME file, each only from its own seat.
    expect(panel.find((s) => s.role === 'lead-auditor')!.findings.length).toBeGreaterThan(0)
    expect(panel.find((s) => s.role === 'financial-auditor')!.findings.length).toBeGreaterThan(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a clean submission is accepted by the whole panel', () => {
    const cwd = corpus2({
      'src/clean/index.ts': '/**\n * @invariant x > 0\n *\n * Composes [[law]].\n */\nexport const x = 1',
      'src/clean/test.ts': 'it("x", () => {})',
    })
    const panel = auditPanel(['src/clean/index.ts'], cwd)
    expect(panel.every((s) => s.findings.length === 0)).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })
})

describe('code quality + the panel auditing ITSELF', () => {
  const c = (files: Record<string, string>) => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-quality-'))
    for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
    return cwd
  }

  // The QUALITY auditor: a body copied verbatim into two files is a law stated twice, free to drift — the
  // ten-fold audit leaf, the customers/vendors merge. A theorem (same hash ⇒ same body), not resemblance.
  it('the quality auditor refuses an identical body in two files', () => {
    const body =
      'export function f() {\n  const a = 1; const b = 2; const c = a + b; const d = c * 100; const e = d - a + b * c\n  return e + a - b + c * a + d - e + a * b * c * d + e\n}'
    const cwd = c({ 'src/a/index.ts': body, 'src/b/index.ts': body.replace('function f', 'function g') })
    const dup = duplicateBodies(['src/a/index.ts', 'src/b/index.ts'], cwd)
    expect(dup.length).toBeGreaterThan(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a unique body draws no quality finding', () => {
    const cwd = c({ 'src/a/index.ts': 'export function f() {\n  return 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1\n}' })
    expect(duplicateBodies(['src/a/index.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  // THE RECURSION. An auditor that fails its own standard is not credible. rules/prose blocked its own
  // SKILL; rules/cycle missed the cycle it was written for. The panel must survive its own review — every
  // seat run against the auditors' OWN source, and clean.
  it('the panel is not a hypocrite — it passes every one of its own seats', () => {
    expect(auditAuditors()).toEqual([]) // against the LIVE auditor source, in the real repo
  })

  it('every auditor seat has a role and a named standard', () => {
    expect(AUDITORS.map((a) => a.role)).toEqual(['lead-auditor', 'financial-auditor', 'compliance-officer', 'quality-auditor', 'integrity-auditor', 'peer-reviewer'])
    expect(AUDITORS.every((a) => a.standard.length > 20)).toBe(true)
  })
})

describe('the auditors DEFINE the gates — one law, two moments', () => {
  const c = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-gate-'))
    for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
    return cwd
  }

  it('every auditor seat defines exactly one gate', () => {
    expect([...AUDIT_GATES.keys()]).toEqual(AUDITORS.map((a) => a.role))
  })

  // A gate throws IFF its auditor finds something — the finding, made blocking. Same standard, at the write.
  it("the lead-auditor's gate THROWS on a claim with no proof leg", () => {
    const cwd = c({ 'src/x/index.ts': '/**\n * @compliance SOX §404\n */\nexport const x = 1' })
    expect(() => AUDIT_GATES.get('lead-auditor')!(['src/x/index.ts'], cwd)).toThrow(/lead-auditor/)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('assertChangesetAudited fails closed over EVERY seat', () => {
    const cwd = c({
      'src/post/index.ts': '/**\n * @compliance SOX §404\n */\nexport const hook = async () => { try { await journalEntryService.createEntry() } catch (e) { log(e) } }',
    })
    expect(() => assertChangesetAudited(['src/post/index.ts'], cwd)).toThrow() // lead OR financial fires
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a clean submission passes the gate the same auditor accepts — one law, two moments', () => {
    const cwd = c({
      'src/clean/index.ts': '/**\n * @invariant x > 0\n *\n * Composes [[law]].\n */\nexport const x = 1',
      'src/clean/test.ts': 'it("x", () => {})',
    })
    expect(() => assertChangesetAudited(['src/clean/index.ts'], cwd)).not.toThrow()
    // the gate and the auditor agree: what the panel accepts, the gate lets through
    expect(auditPanel(['src/clean/index.ts'], cwd).every((s) => s.findings.length === 0)).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })
})

describe('each auditor is a rosetta, and all are a rosetta — fractal by type', () => {
  const c = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-rosetta-'))
    for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
    return cwd
  }

  // The panel is the SAME TYPE as a seat: files → findings. A leaf is a rosetta of one pole; the panel is a
  // rosetta of rosettas; both are Auditor. That shared signature is what makes "each is one, all are one"
  // structural rather than poetic.
  it('the panel folds into ONE auditor — same shape as any single seat', () => {
    expect(panelAuditor.role).toBe('panel')
    expect(typeof panelAuditor.review).toBe('function')
    // it satisfies the Auditor interface exactly as a leaf does
    const leaf: Auditor = AUDITORS[0]!
    expect(Object.keys(panelAuditor).sort()).toEqual(Object.keys(leaf).sort())
  })

  it("the panel-auditor's review IS the union of every seat's — the rosetta decode", () => {
    const cwd = c({
      'src/x/index.ts': '/**\n * @compliance SOX §404\n */\nexport const hook = async () => { try { await journalEntryService.createEntry() } catch (e) { log(e) } }',
    })
    const folded = panelAuditor.review(['src/x/index.ts'], cwd)
    const spread = AUDITORS.flatMap((a) => a.review(['src/x/index.ts'], cwd))
    expect(folded).toEqual(spread) // the whole is exactly the sum of its poles
    expect(folded.length).toBeGreaterThan(1) // lead sees the claim, financial sees the swallow
    rmSync(cwd, { recursive: true, force: true })
  })

  // A rosetta decoding its own basis: the panel, as an auditor, is clean under its own review.
  it('the panel judges itself by its own shape — the self-address congruence', () => {
    const own = ['src/audit/agent/index.ts', 'src/audit/agent/test.ts', 'src/audit/agent/SKILL.md']
    expect(panelAuditor.review(own, process.cwd())).toEqual([])
  })
})

describe('auditTree — let the auditors audit ALL of src', () => {
  const c = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-tree-'))
    for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
    return cwd
  }

  it('aggregates every seat over the whole file set', () => {
    const cwd = c({ 'src/x/index.ts': '/**\n * @compliance SOX §404\n */\nexport const x = 1' })
    const tree = auditTree(['src/x/index.ts'], cwd)
    expect([...tree.keys()]).toEqual(AUDITORS.map((a) => a.role))
    expect(tree.get('lead-auditor')!.trusted.length).toBeGreaterThan(0) // an unproven control
    rmSync(cwd, { recursive: true, force: true })
  })

  // A measurement over an uncommitted tree is a claim from the wrong coordinate — findings in the
  // stash-polluted paths are flagged, never counted as HEAD.
  it('flags findings in stash-polluted paths instead of counting them', () => {
    const cwd = c({ 'src/agent/index.ts': '/**\n * @invariant x\n */\nexport const x = 1' })
    const tree = auditTree(['src/agent/index.ts'], cwd)
    expect(tree.get('lead-auditor')!.trusted).toHaveLength(0) // src/agent is polluted
    expect(tree.get('lead-auditor')!.polluted).toBeGreaterThan(0)
    rmSync(cwd, { recursive: true, force: true })
  })
})

describe('integrity-auditor — the silent-truncation detector, saved from a throwaway', () => {
  const c = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-trunc-'))
    for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
    return cwd
  }

  // The trial-balance defect: a capped find, summed, with no pagination guard — a report about a subset.
  it('refuses a report that caps a find and sums it, unguarded', () => {
    const cwd = c({
      'src/report/index.ts':
        'export async function generateTrialBalance(p) {\n  const e = await p.find({ collection: "journal-entries", limit: 100000 })\n  return e.docs.reduce((s, r) => s + r.amount, 0)\n}',
    })
    const f = truncatedInReport(['src/report/index.ts'], cwd)
    expect(f.length).toBeGreaterThan(0)
    expect(f[0]!.claim).toMatch(/caps at limit:100000/)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('ACCEPTS a report that pages every row — the guard is the fix', () => {
    const cwd = c({
      'src/report/index.ts':
        'export async function generateBalanceSheet(p) {\n  const e = await findAll(p, "journal-entries", {})\n  return e.docs.reduce((s, r) => s + r.amount, 0)\n}',
    })
    expect(truncatedInReport(['src/report/index.ts'], cwd)).toHaveLength(0) // findAll = guarded
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a capped find in a NON-summing file is not its concern — only reports', () => {
    const cwd = c({ 'src/list/index.ts': 'export async function list(p) { return p.find({ limit: 100000 }) }' })
    expect(truncatedInReport(['src/list/index.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the integrity-auditor is a seat, and the panel still audits itself clean', () => {
    expect(AUDITORS.map((a) => a.role)).toContain('integrity-auditor')
    expect(auditAuditors()).toEqual([]) // no seat is a hypocrite
  })
})

describe('peer-reviewer — every proof must acknowledge its foundations', () => {
  const c = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-peer-'))
    for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
    return cwd
  }

  // A proven control that claims a theorem but cites NOTHING is unsourced — a result acknowledging no method.
  it('refuses a proven claim that acknowledges nothing', () => {
    const cwd = c({
      'src/x/index.ts': '/**\n * @invariant the ledger balances\n */\nexport const x = 1',
      'src/x/test.ts': 'it("x", () => {})',
    })
    const f = unacknowledgedProof(['src/x/index.ts'], cwd)
    expect(f).toHaveLength(1)
    expect(f[0]!.claim).toMatch(/unsourced theorem/)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('ACCEPTS a proof that cites a standard — the reference is the acknowledgment', () => {
    const cwd = c({
      'src/x/index.ts': '/**\n * @invariant the ledger balances\n * @standard IAS 1\n */\nexport const x = 1',
      'src/x/test.ts': 'it("x", () => {})',
    })
    expect(unacknowledgedProof(['src/x/index.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('ACCEPTS a proof that Composes the atoms it builds on', () => {
    const cwd = c({
      'src/x/index.ts': '/**\n * @invariant it holds\n *\n * Composes [[merge]] · [[law]].\n */\nexport const x = 1',
      'src/x/test.ts': 'it("x", () => {})',
    })
    expect(unacknowledgedProof(['src/x/index.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a DRAFT (claim, no test) is not held to acknowledgment — only a proof is peer-reviewed', () => {
    const cwd = c({ 'src/x/index.ts': '/**\n * @invariant it holds\n */\nexport const x = 1' })
    expect(unacknowledgedProof(['src/x/index.ts'], cwd)).toHaveLength(0) // no test = not yet a proof
    rmSync(cwd, { recursive: true, force: true })
  })

  it('SIX seats now, and the panel still audits itself clean', () => {
    expect(AUDITORS.map((a) => a.role)).toEqual([
      'lead-auditor', 'financial-auditor', 'compliance-officer', 'quality-auditor', 'integrity-auditor', 'peer-reviewer',
    ])
    expect(auditAuditors()).toEqual([]) // this atom acknowledges its own foundations
  })
})

describe('hollowProof — crossing the "form not truth" boundary', () => {
  const c = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-hollow-'))
    for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
    return cwd
  }

  // The trial-balance case: a test that only asserts the thing is a function.
  it('flags a test that only checks existence — a credit with no behaviour', () => {
    const cwd = c({ 'src/a/test.ts': 'it("x", () => { expect(typeof generateTrialBalance).toBe("function") })' })
    const f = hollowProof(['src/a/test.ts'], cwd)
    expect(f).toHaveLength(1)
    expect(f[0]!.claim).toMatch(/proves no behaviour/)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('ACCEPTS a behavioural test — toEqual exercises the result', () => {
    const cwd = c({ 'src/a/test.ts': 'it("x", () => { expect(sum([1,2])).toEqual(3) })' })
    expect(hollowProof(['src/a/test.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  // THE FALSE POSITIVE THAT CAUGHT ME. toHaveBeenCalledWith IS behavioural — it verifies an interaction. My
  // first detector missed it and flagged dunningJob (13 such assertions). The 16th self-refutation, pinned.
  it('does NOT flag toHaveBeenCalledWith — an interaction assertion is behavioural', () => {
    const cwd = c({ 'src/a/test.ts': 'it("x", () => { expect(mock.update).toHaveBeenCalledWith({ id: 1 }) })' })
    expect(hollowProof(['src/a/test.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('does NOT flag rejects.toThrow — an async behavioural assertion', () => {
    const cwd = c({ 'src/a/test.ts': 'it("x", async () => { await expect(fn()).rejects.toThrow(/nope/) })' })
    expect(hollowProof(['src/a/test.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a non-test file is never a hollow proof', () => {
    const cwd = c({ 'src/a/index.ts': 'export const x = 1' })
    expect(hollowProof(['src/a/index.ts'], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })
})
