/**
 * handoff — the specification, computed against the tree.
 *
 * The observation that built this: **every time the handoff document is re-read by hand, a
 * different subset of gaps is visible.** Not because the document changes — because a human (or an
 * agent) reading prose resolves a different part of it each pass, and the parts they happen not to
 * resolve read as satisfied. That is `noExpectation` failing on the specification itself: a claim
 * that the handoff is implemented, asserted from a reading rather than computed.
 *
 * So the reading becomes a command. Each requirement is transcribed ONCE, carrying the line it came
 * from, and its satisfaction is computed from the tree on every run. Re-reading the document by hand
 * stops being how you find out.
 *
 * **Computed vs declared, the honest split.**
 *
 *   DECLARED   the requirements themselves. No theorem extracts requirements from English prose —
 *              a human read the document and wrote down what each line asks for. Every one carries
 *              its `line`, so the transcription can be checked against the source in seconds.
 *   COMPUTED   whether each is satisfied. Symbols come from [[syntax]]'s parser (`boundNames`),
 *              never a pattern that resembles the language; atoms are checked for the real trinity;
 *              env keys are read from the actual files.
 *
 * **Deviations are recorded, not silently absorbed.** The document spells two atoms with stray
 * sibling files (`trello/plugin.ts`, `anchor/surface.ts`) that the corpus's own folder law forbids.
 * They were built as child atoms instead. That is a divergence from the specification and it is
 * listed as one — a spec followed loosely without saying so is the same defect this atom exists to
 * close, pointed the other way.
 *
 * @law a specification is checked by a command, not by a reading — every requirement carries the
 *      line it came from and the check that decides it, and a deviation is recorded, never absorbed.
 * @invariant a requirement is met only when the tree says so — nothing is satisfied by assertion
 * @invariant every requirement cites the document line it was transcribed from
 * @invariant an unmet requirement names what is missing, not merely that something is
 * @see ./SKILL.md -- ./seed.ts -- ../constitution
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { boundNames } from '@/syntax'

/** How a requirement is decided. Each shape is checkable from the tree with no interpretation. */
export type Satisfier =
  /** an atom folder with the real trinity: SKILL.md · index.ts · test.ts */
  | { readonly kind: 'atom'; readonly path: string }
  /** a symbol the corpus BINDS, read from the parser rather than matched */
  | { readonly kind: 'symbol'; readonly file: string; readonly name: string }
  /** an env key present in every file that must declare it */
  | { readonly kind: 'env'; readonly key: string; readonly files: readonly string[] }
  /** a literal string present in a file — the weakest check, and named as such */
  | { readonly kind: 'text'; readonly file: string; readonly needle: string }

export interface Requirement {
  readonly id: string
  /** the line of the handoff document this was transcribed from — check the transcription */
  readonly line: number
  /** what the document asks for, in its own words */
  readonly asks: string
  readonly satisfiedBy: Satisfier
}

export interface RequirementVerdict {
  readonly id: string
  readonly line: number
  readonly asks: string
  readonly met: boolean
  /** what was found, or what was looked for and absent — never a bare boolean */
  readonly evidence: string
}

const TRINITY = ['SKILL.md', 'index.ts', 'test.ts'] as const

/** Decide one requirement against the tree. Reads files; asserts nothing. */
export function check(req: Requirement, cwd: string): RequirementVerdict {
  const s = req.satisfiedBy
  const base = { id: req.id, line: req.line, asks: req.asks }

  if (s.kind === 'atom') {
    const dir = join(cwd, 'src', s.path)
    const missing = TRINITY.filter((f) => !existsSync(join(dir, f)))
    return {
      ...base,
      met: missing.length === 0,
      evidence: missing.length === 0 ? `src/${s.path} — trinity complete` : `src/${s.path} — missing ${missing.join(' · ')}`,
    }
  }

  if (s.kind === 'symbol') {
    const path = join(cwd, s.file)
    if (!existsSync(path)) return { ...base, met: false, evidence: `${s.file} does not exist` }
    // PARSED, never matched — a regex over TypeScript is a guess ([[rules]]/cycle)
    const names = boundNames(s.file, readFileSync(path, 'utf8'))
    const met = names.includes(s.name)
    return { ...base, met, evidence: met ? `${s.file} binds ${s.name}` : `${s.file} does not bind ${s.name}` }
  }

  if (s.kind === 'env') {
    const absent = s.files.filter((f) => {
      const p = join(cwd, f)
      return !existsSync(p) || !readFileSync(p, 'utf8').includes(s.key)
    })
    return {
      ...base,
      met: absent.length === 0,
      evidence: absent.length === 0 ? `${s.key} declared in ${s.files.join(' + ')}` : `${s.key} absent from ${absent.join(' · ')}`,
    }
  }

  const p = join(cwd, s.file)
  const met = existsSync(p) && readFileSync(p, 'utf8').includes(s.needle)
  return { ...base, met, evidence: met ? `${s.file} contains "${s.needle}"` : `${s.file} lacks "${s.needle}"` }
}

export interface HandoffVerdict {
  readonly total: number
  readonly met: number
  readonly unmet: readonly RequirementVerdict[]
  /** met / total — the only number this atom publishes about itself */
  readonly coverage: number
  readonly deviations: readonly Deviation[]
}

/**
 * A place the build knowingly departs from the document. Recorded so that "implemented" never
 * quietly means "implemented differently".
 */
export interface Deviation {
  readonly line: number
  readonly specified: string
  readonly built: string
  readonly because: string
}

/**
 * A specification — and **any prompt is one**.
 *
 * A handoff document, a chat directive, a PR description, a ticket, a standard: each states what
 * must be true when the work is done, and each is read by a human who resolves a different part of
 * it every pass. The shape is identical, so one model checks them all: `source` names where the
 * prose lives, `requirements` are its lines transcribed, `deviations` are the places the build
 * departs from it on purpose.
 *
 * The consequence is the useful part. A prompt registered here stops being something an agent must
 * remember to honour and becomes something the tree either satisfies or does not — and the answer is
 * the same on every run, for every reader.
 */
export interface Spec {
  readonly id: string
  /** where the prose lives — a file path, a URL, or `chat:<date>` for a spoken directive */
  readonly source: string
  readonly requirements: readonly Requirement[]
  readonly deviations: readonly Deviation[]
}

export function checkSpec(spec: Spec, cwd: string): HandoffVerdict {
  return checkAll(spec.requirements, cwd, spec.deviations)
}

/** Check every registered spec at once — the whole standing instruction set, in one command. */
export function checkSpecs(specs: readonly Spec[], cwd: string): readonly (HandoffVerdict & { readonly spec: string })[] {
  return specs.map((s) => ({ ...checkSpec(s, cwd), spec: s.id }))
}

export function checkAll(reqs: readonly Requirement[], cwd: string, deviations: readonly Deviation[] = []): HandoffVerdict {
  const verdicts = reqs.map((r) => check(r, cwd))
  const unmet = verdicts.filter((v) => !v.met)
  return {
    total: verdicts.length,
    met: verdicts.length - unmet.length,
    unmet,
    coverage: verdicts.length === 0 ? 0 : (verdicts.length - unmet.length) / verdicts.length,
    deviations,
  }
}

/**
 * Fail closed above a ceiling of unmet requirements. A ratchet run downward: the specification may
 * not become less implemented than it already is.
 */
export function assertHandoffMet(v: HandoffVerdict, ceiling: number): void {
  if (v.unmet.length > ceiling) {
    throw new Error(
      `handoff: ${v.unmet.length} unmet requirement(s) > ceiling ${ceiling}\n` +
        v.unmet.map((u) => `  line ${u.line}  ${u.id} — ${u.evidence}`).join('\n'),
    )
  }
}

/** The report, for a human or a CLI. Every line carries the document line it came from. */
export function render(v: HandoffVerdict): string {
  const head = `handoff — ${v.met}/${v.total} requirement(s) met (${(v.coverage * 100).toFixed(1)}%)`
  const gaps = v.unmet.length === 0 ? ['  no unmet requirement'] : v.unmet.map((u) => `  ✗ line ${u.line}  ${u.id} — ${u.evidence}`)
  const dev =
    v.deviations.length === 0
      ? []
      : ['', `  ${v.deviations.length} recorded deviation(s) — built differently, on purpose:`, ...v.deviations.map((d) => `    line ${d.line}  ${d.specified} → ${d.built}  (${d.because})`)]
  return [head, ...gaps, ...dev].join('\n')
}
