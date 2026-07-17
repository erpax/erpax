/**
 * agent — audit an agent's work the way a real auditor audits a human's.
 *
 * Every catastrophe this corpus produced was an AGENT (or a past developer) doing precisely what an auditor
 * catches a human doing:
 *
 *   marked `posted` with no journal entry           — work recorded as done that did not happen
 *   "the source of truth" holding 8 of 231          — a control asserting completeness it does not have
 *   "tamper detection" that was reversible base64   — a control that does nothing, documented as doing it
 *   a test asserting `typeof fn === 'function'`      — evidence that proves the thing was never exercised
 *
 * A human auditor does not read the code for beauty. They take the SUBMISSION — here, the agent's changeset
 * — and ask one question of every claim in it: **where is the evidence?** (ISO 19011 §6.4: a finding must
 * trace to objective evidence.) A claim with a proof beside it can be refuted; a claim with none is an
 * assertion the auditor cannot accept, from a human or an agent.
 *
 * This is [[rules]]/refutable's law, moved from the whole corpus to the agent's OWN diff — because an agent
 * should be audited on what it just did, not asked to trust itself. It composes the computed facts
 * ([[syntax]] for what is a comment; the trinity for what is a proof) and adds the AUDITOR'S STANCE: the
 * work product is a submission, and a submission without evidence is refused.
 *
 * HONEST BOUNDARY — an auditor checks that a control EXISTS and is documented, never that the business is
 * honest. This finds a claim with no evidence BESIDE it; it does not judge whether present evidence is
 * correct (a test can assert a lie — that is [[rules]]/refutable's boundary, inherited here). It audits the
 * FORM of the submission, which is exactly what ISO 19011 §6.4 scopes, and no more.
 *
 * Run: `tsx src/audit/agent/index.ts <file…>`  ·  or pipe `git diff --name-only`.
 *
 * @standard ISO-19011:2018 §6.4 — audit evidence: a finding traces to objective evidence
 *
 * Composes [[rules]]/refutable · [[syntax]] · [[audit]] · [[law]].
 */
import ts from 'typescript'
import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { commentsOf } from '@/syntax'
import { deadReferencesIn } from '@/rules/reference'

/** Canonical atom path. */
export const atomPath = 'agent' as const

/** What an auditor writes up: a claim in the submission with no evidence they can trace it to. */
export interface Finding {
  /** The file in the changeset carrying the claim (repo-relative). */
  readonly file: string
  /** The claim as the agent stated it — verbatim, because an auditor quotes the submission. */
  readonly claim: string
  /** Why it fails the evidence standard. */
  readonly concern: 'no-proof-leg' | 'claim-unrefutable'
}

const CLAIM = /@(?:invariant|standard|compliance|audit)\s+([^\n*]+)/g
/** The trinity's proof leg — the only evidence that can refute a code atom's claim. */
const proofBeside = (file: string): boolean =>
  ['test.ts', 'test.tsx', 'index.test.ts'].some((n) => existsSync(join(dirname(file), n)))

const isCode = (f: string): boolean => /\.tsx?$/.test(f) && !/(?:^|[/.])test\.tsx?$/.test(f)

/**
 * Audit a changeset as a submission: every claim in a modified CODE file must have a proof leg beside it.
 *
 * A markdown file is prose by design and makes no code claim; a test file IS the evidence, not a claimant.
 * So the audit scopes to the code the agent changed — the work it is asking to be accepted.
 *
 * @invariant a claim in a code atom with no test beside it is a finding — evidence is required, not assumed
 * @invariant the audit reads the file's COMMENTS ([[syntax]]) — a standard named in a string is data, not a
 *   claim the agent is making
 */
export function auditWork(files: readonly string[], cwd: string = process.cwd()): Finding[] {
  const out: Finding[] = []
  for (const rel of files) {
    if (!isCode(rel)) continue
    const abs = join(cwd, rel)
    let text: string
    try {
      text = readFileSync(abs, 'utf8')
    } catch {
      continue // deleted in the changeset — nothing to audit
    }
    const prose = commentsOf(abs, text).join('\n')
    const claims = [...prose.matchAll(CLAIM)].map((m) => m[1]!.trim())
    if (claims.length === 0) continue
    if (proofBeside(abs)) continue // evidence is present — the auditor can trace the claim
    for (const claim of claims) {
      out.push({ file: rel.replace(/\\/g, '/'), claim: claim.slice(0, 90), concern: 'no-proof-leg' })
    }
  }
  return out
}

/**
 * Would a real auditor accept this submission? A changeset with claims and no evidence beside them is
 * refused — the finding an auditor writes when a human hands them a control with no test of it.
 */
export function auditVerdict(files: readonly string[], cwd: string = process.cwd()): {
  readonly accepted: boolean
  readonly findings: readonly Finding[]
} {
  const findings = auditWork(files, cwd)
  return { accepted: findings.length === 0, findings }
}

// ─────────────────────────────────────────────────────────────────────────────
// THE PANEL — all kinds of auditors, each auditing the agent from their own seat.
//
// audit/agent above is the GENERAL auditor: evidence beside every claim. But a real audit is a PANEL, and
// each auditor finds what only their standard reveals — the same law as [[rules]]/audience (one claim, N
// readers) turned into ACTION: one changeset, N auditors, each refusing what their seat forbids. Each
// composes a tool the corpus already computes, so no auditor re-implements the corpus — it applies it.
// ─────────────────────────────────────────────────────────────────────────────

/** One seat on the panel: a professional standard, applied to the agent's changeset. */
export interface Auditor {
  readonly role: string
  readonly standard: string
  readonly review: (files: readonly string[], cwd: string) => Finding[]
}

/**
 * A swallowed error in a MUTATION path — the financial auditor's core finding: a posting that records as
 * done while the work silently did not. This detector was a THROWAWAY probe when it found the swallowed-JE
 * batch; saved here because an auditor that composes a deleted script is a control with no evidence — the
 * very thing this atom refuses. Grammar, not pattern ([[syntax]]/[[rules]]/cycle discipline): `ts` decides
 * what a catch is.
 */
export function swallowedInMutation(files: readonly string[], cwd: string = process.cwd()): Finding[] {
  const out: Finding[] = []
  for (const rel of files) {
    if (!isCode(rel)) continue
    let text: string
    try {
      text = readFileSync(join(cwd, rel), 'utf8')
    } catch {
      continue
    }
    if (!/createEntry|postEntry|journalEntryService|payload\.(create|update)/.test(text)) continue
    const src = ts.createSourceFile(rel, text, ts.ScriptTarget.ESNext, true)
    const walk = (n: ts.Node): void => {
      if (ts.isTryStatement(n) && n.catchClause) {
        const books = /createEntry|postEntry|journalEntryService/.test(n.tryBlock.getText())
        const rethrows = /throw\b/.test(n.catchClause.getText())
        if (books && !rethrows) {
          const line = src.getLineAndCharacterOfPosition(n.getStart()).line + 1
          out.push({ file: rel.replace(/\\/g, '/'), claim: `catch at line ${line} books a journal entry and does not rethrow`, concern: 'no-proof-leg' })
        }
      }
      ts.forEachChild(n, walk)
    }
    walk(src)
  }
  return out
}

/**
 * A function body that appears IDENTICALLY in two changed files — the quality auditor's finding, and a
 * theorem not a heuristic: same content ⇒ same address ([[merge]]), so a collision is copy, not resemblance.
 * This was the `dupscan` throwaway that found the ten-fold audit leaf and the `relation` merge; saved here,
 * because a quality auditor composing a deleted script is the evidence-with-no-control this atom refuses.
 */
export function duplicateBodies(files: readonly string[], cwd: string = process.cwd()): Finding[] {
  const bodies = new Map<string, { file: string; name: string }[]>()
  for (const rel of files) {
    if (!isCode(rel)) continue
    let text: string
    try {
      text = readFileSync(join(cwd, rel), 'utf8')
    } catch {
      continue
    }
    const src = ts.createSourceFile(rel, text, ts.ScriptTarget.ESNext, true)
    const walk = (n: ts.Node): void => {
      const body =
        (ts.isFunctionDeclaration(n) || ts.isMethodDeclaration(n) || ts.isArrowFunction(n) || ts.isFunctionExpression(n)) && n.body
          ? n.body.getText()
          : undefined
      if (body) {
        const norm = body.replace(/\s+/g, ' ').trim()
        if (norm.length >= 120) {
          const name = 'name' in n && n.name ? n.name.getText() : '(anon)'
          const addr = createHash('sha256').update(norm).digest('hex').slice(0, 16)
          bodies.set(addr, [...(bodies.get(addr) ?? []), { file: rel.replace(/\\/g, '/'), name }])
        }
      }
      ts.forEachChild(n, walk)
    }
    walk(src)
  }
  const out: Finding[] = []
  for (const group of bodies.values()) {
    if (new Set(group.map((g) => g.file)).size > 1) {
      const where = group.map((g) => `${g.file}:${g.name}`).join(' = ')
      for (const g of group) out.push({ file: g.file, claim: `identical body duplicated: ${where}`, concern: 'claim-unrefutable' })
    }
  }
  return out
}

/**
 * A report that reads a CAPPED page and sums it — the integrity auditor's finding: a `payload.find({ limit })`
 * with a hardcoded ceiling, in a summing/report file, with no `hasNextPage`/`findAll`/`totalDocs` guard. A cap
 * that drops rows is a report about a SUBSET wearing the name of the whole — the trial-balance defect that fed
 * the balance sheet and the SAF-T export while reporting `isBalanced: true`.
 *
 * This was a THROWAWAY probe when it found five live sites; saved here because an auditor that composes a
 * deleted script is a control with no evidence — the exact thing this atom refuses. It is the fifth seat, and
 * the reason the class cannot silently return.
 */
export function truncatedInReport(files: readonly string[], cwd: string = process.cwd()): Finding[] {
  const out: Finding[] = []
  for (const rel of files) {
    if (!isCode(rel)) continue
    let text: string
    try {
      text = readFileSync(join(cwd, rel), 'utf8')
    } catch {
      continue
    }
    // only a SUMMING file is at risk — a report, a balance, an aggregate
    const sums = /\.reduce\(|aggregate|generate\w*(Balance|Statement|Report|Trial|Sheet|Aging)/i.test(text)
    if (!sums) continue
    const guarded = /hasNextPage|totalDocs|findAll\(|\.totalPages/.test(text)
    if (guarded) continue
    const src = ts.createSourceFile(rel, text, ts.ScriptTarget.ESNext, true)
    const walk = (n: ts.Node): void => {
      if (
        ts.isCallExpression(n) &&
        ts.isPropertyAccessExpression(n.expression) &&
        n.expression.name.text === 'find' &&
        n.arguments[0] &&
        ts.isObjectLiteralExpression(n.arguments[0])
      ) {
        for (const p of n.arguments[0].properties) {
          if (ts.isPropertyAssignment(p) && p.name.getText() === 'limit' && ts.isNumericLiteral(p.initializer) && Number(p.initializer.text) >= 1000) {
            const line = src.getLineAndCharacterOfPosition(n.getStart()).line + 1
            out.push({ file: rel.replace(/\\/g, '/'), claim: `find at line ${line} caps at limit:${p.initializer.text} and sums it, unguarded — a report about a subset`, concern: 'claim-unrefutable' })
          }
        }
      }
      ts.forEachChild(n, walk)
    }
    walk(src)
  }
  return out
}

/**
 * An UNACKNOWLEDGED proof — the peer-reviewer's finding: a proven control (an atom with a claim AND a test)
 * that cites NOTHING. A proof in scientific format acknowledges its foundations — the standards it satisfies
 * (`@standard`/`@rfc`) and the atoms it builds on (`Composes [[…]]`) — the way a paper's references
 * acknowledge prior work. A theorem with a method and no citations is unsourced: it may be correct, but it
 * cannot be traced to what it rests on, and an auditor cannot accept a result that acknowledges no method.
 *
 * This is the complement of [[conditional]]: that discloses what a proof ASSUMES (its hypotheses); this
 * demands what a proof BUILDS ON (its acknowledgments). Together they are full scientific honesty — cite
 * your foundations, disclose your assumptions. The format itself already exists ([[readme]]'s ScientificPaper
 * — title · abstract · methods · results · references · uuid); this seat enforces that the `references` are
 * not empty for a proof that makes a claim.
 */
export function unacknowledgedProof(files: readonly string[], cwd: string = process.cwd()): Finding[] {
  const out: Finding[] = []
  for (const rel of files) {
    if (!isCode(rel)) continue
    const abs = join(cwd, rel)
    let text: string
    try {
      text = readFileSync(abs, 'utf8')
    } catch {
      continue
    }
    if (!proofBeside(abs)) continue // only a PROVEN control is held to acknowledgment — a proof, not a draft
    const prose = commentsOf(abs, text).join('\n')
    const claims = prose.match(CLAIM)
    if (!claims) continue // no theorem to source
    // acknowledgment = it cites a standard, an RFC, or the atoms it composes — its references
    const acknowledged = /@standard\s|@rfc\s|@see\s|Composes\s+\[\[/.test(prose)
    if (!acknowledged) {
      out.push({ file: rel.replace(/\\/g, '/'), claim: `a proven control makes a claim but acknowledges nothing — no @standard, no Composes; an unsourced theorem`, concern: 'claim-unrefutable' })
    }
  }
  return out
}

/**
 * A HOLLOW proof — a test whose assertions are ALL existence-checks (`toBeDefined`, `typeof`, `toBe(
 * 'function')`) with no behavioural assertion. It credits the ledger and proves nothing — the trial balance
 * had exactly one (`expect(typeof generateTrialBalance).toBe('function')`).
 *
 * This crosses the boundary every other seat stops at — "a proof EXISTS, not that it is correct". It does
 * not close it: it proves the test asserts BEHAVIOUR, never that the behaviour is the CLAIMED one (a test can
 * exercise the wrong thing). That next edge is named, not hidden — it is the honest target, not a disguise.
 *
 * The detector caught its AUTHOR first: the initial pattern missed `toHaveBeenCalledWith`, so it flagged a
 * genuine behavioural test (jobs/dunningJob, 13 interaction assertions) as hollow. The measurement lied
 * before the tree did — the corpus is ~99.9% behavioural (2 of 1398, one a type atom). Distrust the
 * measurement before the tree, even here.
 */
const BEHAVIOURAL = /\.toBe\((?!\s*['"]function['"])|toEqual\(|toMatch\(|toThrow\(|toHaveLength\(|toContain\(|toBeGreaterThan|toBeLessThan|toBeCloseTo|toMatchObject|toHaveBeenCalled|toHaveProperty|rejects\.|resolves\./
export function hollowProof(files: readonly string[], cwd: string = process.cwd()): Finding[] {
  const out: Finding[] = []
  for (const rel of files) {
    if (!/(?:^|[/.])test\.tsx?$/.test(rel)) continue // only a TEST can be a hollow proof
    let text: string
    try {
      text = readFileSync(join(cwd, rel), 'utf8')
    } catch {
      continue
    }
    if ([...text.matchAll(/expect\(/g)].length === 0) continue // no assertions is not this finding
    if (BEHAVIOURAL.test(text)) continue // it exercises behaviour — a real credit
    out.push({ file: rel.replace(/\\/g, '/'), claim: `a test with only existence-checks (typeof/toBeDefined) — it credits the ledger and proves no behaviour`, concern: 'claim-unrefutable' })
  }
  return out
}

/** The panel — every auditor seat. Add a seat by adding a standard, never by re-scanning the corpus. */
export const AUDITORS: readonly Auditor[] = [
  {
    role: 'lead-auditor',
    standard: 'ISO-19011:2018 §6.4 — a finding traces to objective evidence',
    review: (files, cwd) => auditWork(files, cwd),
  },
  {
    role: 'financial-auditor',
    standard: 'IAS 1 — a transaction recorded is a transaction that occurred; no posting without its entry',
    review: (files, cwd) => swallowedInMutation(files, cwd),
  },
  {
    role: 'compliance-officer',
    standard: 'ISO-19011:2018 §6.4 — a statutory citation must lead to its implementation',
    review: (files, cwd) => deadStatutoryInChangeset(files, cwd),
  },
  {
    role: 'quality-auditor',
    standard: 'ISO/IEC 25010 §5.6 maintainability — DRY: a body copied is a law stated twice, free to drift',
    review: (files, cwd) => duplicateBodies(files, cwd),
  },
  {
    role: 'integrity-auditor',
    standard: 'IAS 1 completeness — a report sums ALL rows; a silent cap is a subset wearing the name of the whole',
    review: (files, cwd) => truncatedInReport(files, cwd),
  },
  {
    role: 'peer-reviewer',
    standard: 'scientific method — a proof acknowledges its foundations: a proven claim cites its @standard and Composes',
    review: (files, cwd) => unacknowledgedProof(files, cwd),
  },
]

/**
 * THE PANEL AUDITS ITSELF — an auditor that fails its own standard is not credible.
 *
 * `rules/prose` blocked its own SKILL; `rules/cycle`'s first version missed the cycle it was written for.
 * A panel is only trustworthy if it survives its own review: every auditor's atom must pass every SEAT — a
 * proof leg beside its claims, no swallowed error, no dead statute, no duplicated body. This convenes the
 * panel on the auditors' OWN source and returns anything a seat catches in a fellow seat (or itself). Empty
 * is the invariant; non-empty names a hypocrite.
 *
 * @invariant no auditor enforces a standard its own code violates
 */
export function auditAuditors(cwd: string = process.cwd()): Finding[] {
  const own = ['src/audit/agent/index.ts', 'src/audit/agent/test.ts', 'src/audit/agent/SKILL.md']
  return AUDITORS.flatMap((a) => a.review(own, cwd))
}

// ─────────────────────────────────────────────────────────────────────────────
// THE AUDITORS DEFINE THE GATES.
//
// A gate ([[rules]]) blocks a violation at the write; an auditor ([[audit]]/agent) refuses a submission that
// lacks evidence. They are the SAME LAW at two moments — the gate is the auditor firing at the write, fail-
// closed, where it cannot be skipped ([[confirm]]). Stated as two systems (rulesOf beside AUDITORS) it is
// the duplication this whole corpus exists to remove: a compliance-officer IS the reference gate; a lead-
// auditor IS refutable. So the gate is DERIVED from the auditor, never written beside it — one definition,
// two projections (a report when you read the diff, a wall when you write it).
// ─────────────────────────────────────────────────────────────────────────────

/** A gate: the auditor's review, projected to FAIL CLOSED. It throws the auditor's own findings. */
export type Gate = (files: readonly string[], cwd?: string) => void

/**
 * The gate an auditor defines — the same standard, at the write instead of the read.
 *
 * @invariant a gate throws IFF its auditor finds something — the enforcement is the finding, made blocking
 */
export function gateFrom(auditor: Auditor): Gate {
  return (files, cwd = process.cwd()) => {
    const findings = auditor.review(files, cwd)
    if (findings.length === 0) return
    throw new Error(
      `✖ ${auditor.role} — ${findings.length} finding(s) · ${auditor.standard}\n${findings
        .slice(0, 8)
        .map((f) => `  ${f.file}: ${f.claim}`)
        .join('\n')}`,
    )
  }
}

/** The gate registry, DEFINED BY the panel — one gate per auditor seat. `rulesOf` is this, made blocking. */
export const AUDIT_GATES: ReadonlyMap<string, Gate> = new Map(AUDITORS.map((a) => [a.role, gateFrom(a)]))

/** Fail-closed over a changeset: run every gate the auditors define. The write-time face of the panel. */
export function assertChangesetAudited(files: readonly string[], cwd: string = process.cwd()): void {
  for (const gate of AUDIT_GATES.values()) gate(files, cwd)
}

// ─────────────────────────────────────────────────────────────────────────────
// EACH AUDITOR IS A ROSETTA, AND ALL ARE A ROSETTA.
//
// A rosetta is a basis that projects a signal onto its poles. An auditor projects the changeset onto its
// own standard — a rosetta with one pole. The PANEL projects onto all of them — a rosetta of rosettas. So
// the panel is the SAME TYPE as an auditor: it reviews files → findings. `panelAuditor` folds the whole
// panel into ONE `Auditor`, which means the structure is fractal — an auditor is a leaf, a panel is a node,
// and both are `Auditor`. A panel can be a seat on a larger panel, without end.
//
// This is the self-address congruence at the level of judgement: the thing that judges is the same shape as
// the things it is made of, so it can be judged BY itself (`auditAuditors`) — a rosetta decoding its own
// basis. That the leaves and the whole share a type is why "each is a rosetta and all are a rosetta" is not
// a metaphor but a signature.
// ─────────────────────────────────────────────────────────────────────────────

/** The stash-pop of 2026-07-16 left a prior session's uncommitted work in these paths — not HEAD. */
const POLLUTED = /^src\/(agent|agents|law\/folder|quantum|seal|message)\b/

/**
 * Let the auditors audit ALL of src — the whole tree as one submission, not a changeset.
 *
 * "Find what does not belong": every seat, over every tracked source file, aggregated by role. A finding
 * here is a QUESTION an auditor raises, not a verdict — a `.tsx` component or a config legitimately has no
 * colocated test, so the lead-auditor's count is an upper bound on unproven controls, each needing a
 * per-case answer (the evidence is elsewhere, or the claim should go). The financial and quality seats are
 * sharper: a swallowed JE and a duplicated body are defects, not questions.
 *
 * @invariant findings in stash-polluted paths are FLAGGED, never counted as HEAD — a measurement over an
 *   uncommitted tree is a claim from the wrong coordinate ([[run]]/load)
 */
export function auditTree(files: readonly string[], cwd: string = process.cwd()): Map<string, { trusted: Finding[]; polluted: number }> {
  const out = new Map<string, { trusted: Finding[]; polluted: number }>()
  for (const a of AUDITORS) {
    const found = a.review(files, cwd)
    const trusted = found.filter((f) => !POLLUTED.test(f.file))
    out.set(a.role, { trusted, polluted: found.length - trusted.length })
  }
  return out
}

/** The whole panel, folded into ONE auditor — a rosetta of rosettas, the same type as any seat. */
export const panelAuditor: Auditor = {
  role: 'panel',
  standard: `the union of all seats — ${AUDITORS.map((a) => a.role).join(' · ')}`,
  review: (files, cwd) => AUDITORS.flatMap((a) => a.review(files, cwd)),
}

/** Dead statutory references the agent introduced — composes [[rules]]/reference, scoped to the changeset. */
function deadStatutoryInChangeset(files: readonly string[], cwd: string): Finding[] {
  const dead = deadReferencesIn(files, cwd)
  return dead.map((d) => ({ file: d.from, claim: `statutory trace to ${d.target} does not resolve`, concern: 'claim-unrefutable' as const }))
}

/** Convene the whole panel on one changeset — every auditor's findings, labelled by seat. */
export function auditPanel(
  files: readonly string[],
  cwd: string = process.cwd(),
): { readonly role: string; readonly standard: string; readonly findings: Finding[] }[] {
  return AUDITORS.map((a) => ({ role: a.role, standard: a.standard, findings: a.review(files, cwd) }))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const argv = process.argv.slice(2)
  const files =
    argv.length > 0 ? argv : readFileSync(0, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean)
  const panel = auditPanel(files.map((f) => relative(process.cwd(), join(process.cwd(), f))))
  let total = 0
  for (const seat of panel) {
    total += seat.findings.length
    const mark = seat.findings.length === 0 ? '✓ accepts' : `✖ REFUSES (${seat.findings.length})`
    console.log(`\n${mark}  ${seat.role} · ${seat.standard}`)
    for (const f of seat.findings) console.log(`    ${f.file}\n      ${f.claim}`)
  }
  console.log(`\n${total === 0 ? '✓ the panel accepts the submission' : `✖ the panel REFUSES — ${total} finding(s) across ${panel.filter((s) => s.findings.length).length} seat(s)`}`)
  process.exit(total === 0 ? 0 : 1)
}
