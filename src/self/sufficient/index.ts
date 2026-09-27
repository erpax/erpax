import { exactMax, exactMin } from '@/algebra'
import { containment, orthogonalLaws } from '@/conjecture'
/**
 * self/sufficient — self-sufficiency as a SECURITY property, made computational.
 *
 * @standard NIST SP 800-107r1 §5.1 (the digest bound — via tamper-cost)
 * @standard NIST SP 800-161r1 (supply-chain / external-dependency risk)
 */

import { crackVerdict, type CrackVerdict } from '@/tamper/cost'
import { ERPAX_DIGEST_BITS } from '@/cost'

/** Kinds of external dependence — each a trust link an attacker can target instead of the digest. */
export type DependencyKind = 'ai-model' | 'service' | 'binding' | 'agent' | 'library'

/**
 * An external dependency: a trust link with a COMPROMISE cost in bits — how
 */
export interface ExternalDependency {
  readonly id: string
  readonly kind: DependencyKind
  /** log2 cost to compromise this dependency (the attacker's cheap path). */
  readonly compromiseBits: number
  /** can it be internalised — run locally / replaced by a content-addressed skill? */
  readonly internalisable?: boolean
}

export interface SelfSufficiencyVerdict {
  /** effective tamper cost in bits — capped by the weakest external link. */
  readonly effectiveCostBits: number
  /** what binds: the digest, the mandatory anchor, or a liability dependency. */
  readonly binding: 'digest' | 'anchor' | 'dependency'
  /** the id of the weakest external liability, if one binds. */
  readonly weakestLink: string | null
  /** count of external liabilities (lower ⇒ more self-sufficient). */
  readonly dependenceCount: number
  /** 0 (fully dependent) … 1 (fully self-sufficient: nothing external binds below the floor). */
  readonly selfSufficiency: number
  readonly note: string
}

/**
 * The effective tamper cost of a society carrying these external liabilities.
 */
export function selfSufficiencyVerdict(opts: {
  digestBits?: number
  anchorStrengthBits?: number
  liabilities?: ReadonlyArray<ExternalDependency>
}): SelfSufficiencyVerdict {
  const digestBits = opts.digestBits ?? ERPAX_DIGEST_BITS
  const anchorStrengthBits = opts.anchorStrengthBits ?? 128
  const liabilities = opts.liabilities ?? []
  // Without liabilities the floor is the tamper-cost bound itself.
  const floor = exactMin(digestBits, anchorStrengthBits)
  let effectiveCostBits = floor
  let binding: SelfSufficiencyVerdict['binding'] = anchorStrengthBits < digestBits ? 'anchor' : 'digest'
  let weakestLink: string | null = null
  for (const dep of liabilities) {
    if (dep.compromiseBits < effectiveCostBits) {
      effectiveCostBits = dep.compromiseBits
      binding = 'dependency'
      weakestLink = dep.id
    }
  }
  const selfSufficiency = binding === 'dependency' ? exactMax(0, effectiveCostBits / floor) : 1
  return {
    effectiveCostBits,
    binding,
    weakestLink,
    dependenceCount: liabilities.length,
    selfSufficiency,
    note:
      binding === 'dependency'
        ? `Bound by external '${weakestLink}' (${effectiveCostBits}-bit) — internalise it (local model / content-addressed skill) to raise the floor toward ${floor} bits.`
        : `Self-sufficient: no external liability is cheaper than the ${effectiveCostBits}-bit ${binding}. Decreasing dependence cannot lower this floor — only protect it.`,
  }
}

/**
 * Internalise one dependency — the co-evolution step. The dependency leaves the
 */
export function internalise(
  liabilities: ReadonlyArray<ExternalDependency>,
  id: string,
  bound?: { digestBits?: number; anchorStrengthBits?: number },
): { liabilities: ReadonlyArray<ExternalDependency>; verdict: SelfSufficiencyVerdict } {
  const next = liabilities.filter((d) => d.id !== id)
  return { liabilities: next, verdict: selfSufficiencyVerdict({ ...bound, liabilities: next }) }
}

/**
 * The bridge to tamper-cost: the full crack verdict under self-sufficiency. The
 */
export function selfSufficientCrackVerdict(opts: {
  digestBits?: number
  anchorStrengthBits?: number
  liabilities?: ReadonlyArray<ExternalDependency>
  coverage?: number
  checks?: number
}): CrackVerdict {
  const v = selfSufficiencyVerdict(opts)
  return crackVerdict({
    digestBits: opts.digestBits,
    anchored: true,
    anchorStrengthBits: v.effectiveCostBits,
    coverage: opts.coverage,
    checks: opts.checks,
  })
}

// ── derive the next direction from WITHIN — ask the machine, not the operator ──
// The atom's operating heuristic ("derive from within, don't ask") applied to
// WORKFLOW: the corpus's own open intents (think.openIntents — its akashic frontier)
// ARE the direction. Ranking them by the standing priority queue turns "what next?"
// from a question to the operator into a computed answer — the self-sufficient move.
// Pure/DI: the caller passes the intents (openIntents(cwd)), so this stays cycle-free.

export interface Direction {
  readonly intent: string
  /** priority rank — higher runs first (the standing queue). */
  readonly rank: number
  readonly why: string
}

/**
 * The standing queue: regression > auditor/signer-facing > blocks-everything > debt > cosmetic.
 */
const PRIORITY: readonly (readonly [RegExp, number, string])[] = [
  [/regress|broke|broken|\bred\b|fail|does not (boot|load|build)|TDZ/i, 5, 'regression — a broken thing blocks everything'],
  [/audit|signer|director|compliance|SOX|§404|§302|fiscal|НАП|auditor/i, 4, 'auditor/signer-facing — invisible from every seat but theirs'],
  [/\bgate|pre-push|\bbuild\b|deploy|\bboot\b|\bload\b|green/i, 3, 'blocks-everything — boot · build · push · deploy'],
  [/debt|\bgap\b|un-?fold|\bdead\b|stray|dissolve|duplicat/i, 2, 'largest debt'],
  [/rename|cosmetic|tidy|comment|typo|whitespace/i, 1, 'cosmetic — last'],
]

/**
 * Rank the corpus's open intents into a direction — the highest-priority next move first.
 */
export function nextDirection(intents: readonly string[]): Direction[] {
  return intents
    .map((intent) => {
      let best = { rank: 0, why: 'unranked — no queue keyword matched' }
      for (const [re, rank, why] of PRIORITY) if (re.test(intent) && rank > best.rank) best = { rank, why }
      return { intent, rank: best.rank, why: best.why }
    })
    .sort((a, b) => b.rank - a.rank)
}

/** @index-cross.foldback child=self/sufficient parent=self — this cross folds back into its parent. */

/** One lead the corpus produced about ITSELF — measured, never typed by a person. */
export interface InternalLead {
  readonly source: string
  /** A sentence the standing queue can rank. See ./SKILL.md § the ranker must actually fire. */
  readonly intent: string
  readonly evidence: string
}

/** The self-measurements a harvest reads, INJECTED — no network, no booted app. */
export interface InternalSources {
  readonly guardians?: () => readonly { axis: string; violations: number; baseline: number; ok: boolean }[]
  /** Proven crosses not yet drawn — `conjecture.crossStream(...).proven`, as candidate strings. */
  readonly crosses?: () => readonly string[]
  readonly unreached?: () => readonly string[]
  /** Boundary rows; an `unreachable` one is an unanswered question, not a failure. */
  readonly boundary?: () => readonly { name: string; state: string }[]
}

/**
 * Leads the corpus generates about itself. See ./SKILL.md § self-sufficiency needs its own frontier.
 *
 * @invariant every emitted intent is ranked above 0 by `nextDirection`
 */
export function internalLeads(src: InternalSources = {}): InternalLead[] {
  const out: InternalLead[] = []
  for (const g of src.guardians?.() ?? []) {
    if (g.ok) continue
    // "red" and "gate" both hit the queue, so a broken axis outranks an ordinary debt.
    out.push({
      source: 'guardian',
      intent: `red gate ${g.axis} — ${g.violations} above its baseline of ${g.baseline}`,
      evidence: `${g.axis} ${g.violations}>${g.baseline}`,
    })
  }
  for (const c of src.crosses?.() ?? []) {
    out.push({ source: 'cross', intent: `undrawn cross — a gap two laws agree on: ${c}`, evidence: c })
  }
  for (const a of src.unreached?.() ?? []) {
    out.push({ source: 'unreached', intent: `dead weight — nothing reaches the atom ${a}`, evidence: a })
  }
  for (const b of src.boundary?.() ?? []) {
    if (b.state !== 'unreachable') continue
    // An unasked question is not a failure, but it IS the thing to do next about that rail.
    // The wording carries the RANK: an unreachable probe is a knowledge `gap`, not a regression.
    out.push({
      source: 'boundary',
      intent: `gap in what is known — the ${b.name} boundary could not be asked`,
      evidence: `${b.name} unreachable`,
    })
  }
  return out
}

/** The corpus's own next move: measured leads, ranked, most urgent first. */
export function selfSufficientNext(src: InternalSources = {}): Direction[] {
  return nextDirection(internalLeads(src).map((l) => l.intent))
}

/** What a crossed lead harvest says. See ./SKILL.md § crossing the leads. */
export interface LeadCross {
  /** How many distinct targets each source named. */
  readonly sources: Readonly<Record<string, number>>
  /** Targets named by MORE THAN ONE source — two independent measurements agreeing. */
  readonly corroborated: ReadonlyArray<{ readonly target: string; readonly sources: readonly string[] }>
  /** A source whose targets are largely inside another's is CARRIED by it, so it sits downstream. */
  readonly carried: ReadonlyArray<{ readonly source: string; readonly inside: string; readonly share: number }>
  /** A source meeting nothing — independent signal, and the only one nothing else would find. */
  readonly orthogonal: readonly string[]
}

/** The target a lead points at — never the sentence, which two sources never share. */
const leadTarget = (l: InternalLead): string => (l.evidence.match(/[A-Za-z][A-Za-z0-9/-]*/)?.[0] ?? l.evidence)

/**
 * Cross every lead source against every other, reusing [[conjecture]]'s intersection and DIRECTIONAL
 *
 * @invariant a target named by one source only is never reported as corroborated
 */
export function leadCross(leads: readonly InternalLead[]): LeadCross {
  const sets = new Map<string, Set<string>>()
  for (const l of leads) {
    const s = sets.get(l.source) ?? new Set<string>()
    s.add(leadTarget(l))
    sets.set(l.source, s)
  }
  const byTarget = new Map<string, Set<string>>()
  for (const [source, targets] of sets) {
    for (const t of targets) byTarget.set(t, (byTarget.get(t) ?? new Set<string>()).add(source))
  }
  return {
    sources: Object.fromEntries([...sets].map(([k, v]) => [k, v.size])),
    corroborated: [...byTarget]
      .filter(([, srcs]) => srcs.size > 1)
      .map(([target, srcs]) => ({ target, sources: [...srcs].sort() }))
      .sort((a, b) => b.sources.length - a.sources.length || a.target.localeCompare(b.target)),
    carried: containment(sets)
      .filter((c) => c.share > 0)
      .map((c) => ({ source: c.law, inside: c.inside, share: c.share })),
    orthogonal: orthogonalLaws(sets),
  }
}
