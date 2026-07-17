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
]

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
