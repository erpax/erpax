/**
 * self/sufficient — self-sufficiency as a SECURITY property, made computational.
 *
 * @standard NIST SP 800-107r1 §5.1 (the digest bound — via tamper-cost)
 * @standard NIST SP 800-161r1 (supply-chain / external-dependency risk)
 */

import { exactMax, exactMin } from '@/algebra'
import { containment, crossIntersections, orthogonalLaws } from '@/conjecture'
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

/**
 * The namespace a lead's target lives in. Two targets are comparable ONLY within one scope: an axis
 * NAME (`linear-gap`) and an atom PATH (`payable/aging`) can never be equal, so crossing them
 * reports agreement as absent rather than as unasked. See ./SKILL.md § one address or no cross.
 */
export type LeadScope = 'axis' | 'atom' | 'cross' | 'boundary'

/** One lead the corpus produced about ITSELF — measured, never typed by a person. */
export interface InternalLead {
  readonly source: string
  /** The namespace {@link target} is named in — the cross compares within it and never across it. */
  readonly scope: LeadScope
  /**
   * What the lead points AT, named by the producer. Never re-extracted from {@link intent}: a regex
   * over the sentence returned `linear` for `linear-gap` and the axis name for an atom's lead, which
   * is the parse-don't-match law arriving one atom over.
   */
  readonly target: string
  /** A sentence the standing queue can rank. See ./SKILL.md § the ranker must actually fire. */
  readonly intent: string
  readonly evidence: string
}

/** The self-measurements a harvest reads, INJECTED — no network, no booted app. */
export interface InternalSources {
  readonly guardians?: () => readonly { axis: string; violations: number; baseline: number; ok: boolean }[]
  /** Proven crosses not yet drawn — `conjecture.crossStream(...).proven`, as candidate strings. */
  readonly crosses?: () => readonly string[]
  /** Atom paths, so they meet {@link populations} at the atom scope. */
  readonly unreached?: () => readonly string[]
  /**
   * An axis's violating MEMBERS, as ATOM paths — the only form a guardian can contribute that another
   * source can meet. `guardians` yields a count, and a count names no atom, so an axis reporting 249
   * violations corroborates nothing on its own however loudly it is red.
   */
  readonly populations?: () => readonly { readonly law: string; readonly members: readonly string[] }[]
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
      scope: 'axis',
      target: g.axis,
      intent: `red gate ${g.axis} — ${g.violations} above its baseline of ${g.baseline}`,
      evidence: `${g.axis} ${g.violations}>${g.baseline}`,
    })
  }
  for (const c of src.crosses?.() ?? []) {
    out.push({
      source: 'cross',
      scope: 'cross',
      target: c,
      intent: `undrawn cross — a gap two laws agree on: ${c}`,
      evidence: c,
    })
  }
  for (const a of src.unreached?.() ?? []) {
    out.push({
      source: 'unreached',
      scope: 'atom',
      target: a,
      intent: `dead weight — nothing reaches the atom ${a}`,
      evidence: a,
    })
  }
  for (const p of src.populations?.() ?? []) {
    for (const m of p.members) {
      out.push({
        source: `law:${p.law}`,
        scope: 'atom',
        target: m,
        intent: `debt in ${m} — the ${p.law} law names it`,
        evidence: `${p.law} ${m}`,
      })
    }
  }
  for (const b of src.boundary?.() ?? []) {
    if (b.state !== 'unreachable') continue
    // An unasked question is not a failure, but it IS the thing to do next about that rail.
    // The wording carries the RANK: an unreachable probe is a knowledge `gap`, not a regression.
    out.push({
      source: 'boundary',
      scope: 'boundary',
      target: b.name,
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
  /** Targets named by MORE THAN ONE source, within ONE scope — two independent measurements agreeing. */
  readonly corroborated: ReadonlyArray<{
    readonly target: string
    readonly scope: LeadScope
    readonly sources: readonly string[]
  }>
  /** A source whose targets are largely inside another's is CARRIED by it, so it sits downstream. */
  readonly carried: ReadonlyArray<{
    readonly source: string
    readonly inside: string
    readonly share: number
    readonly scope: LeadScope
  }>
  /** Shares a scope with others and meets none of their targets — genuinely independent signal. */
  readonly orthogonal: readonly string[]
  /**
   * Per pair of sources in one scope: how much they overlap AND whether that overlap beats chance.
   * A corroboration counts sources; only `lift > 1` says the agreement is evidence rather than the
   * base rate of two large populations. See ./SKILL.md § a count is not agreement.
   */
  readonly agreement: ReadonlyArray<{
    readonly a: string
    readonly b: string
    readonly scope: LeadScope
    readonly shared: number
    readonly expected: number
    readonly lift: number
  }>
  /** How many distinct targets each scope holds. */
  readonly scopes: Readonly<Record<string, number>>
  /**
   * A source ALONE in its scope. Nothing it names can ever be corroborated, so its silence is
   * incomparability and not independence — the distinction {@link orthogonal} used to swallow.
   */
  readonly incommensurable: readonly string[]
}

/**
 * Cross every lead source against every other WITHIN a scope, reusing [[conjecture]]'s intersection
 * and DIRECTIONAL containment. See ./SKILL.md § one address or no cross.
 *
 * @invariant a target named by one source only is never reported as corroborated
 * @invariant two sources in different scopes never corroborate, and are named incommensurable
 */
export function leadCross(leads: readonly InternalLead[]): LeadCross {
  const byScope = new Map<LeadScope, Map<string, Set<string>>>()
  const sizes = new Map<string, Set<string>>()
  for (const l of leads) {
    const scoped = byScope.get(l.scope) ?? new Map<string, Set<string>>()
    scoped.set(l.source, (scoped.get(l.source) ?? new Set<string>()).add(l.target))
    byScope.set(l.scope, scoped)
    sizes.set(l.source, (sizes.get(l.source) ?? new Set<string>()).add(l.target))
  }

  const corroborated: Array<{ target: string; scope: LeadScope; sources: readonly string[] }> = []
  const agreement: Array<{
    a: string
    b: string
    scope: LeadScope
    shared: number
    expected: number
    lift: number
  }> = []
  const carried: Array<{ source: string; inside: string; share: number; scope: LeadScope }> = []
  const orthogonal: string[] = []
  const incommensurable: string[] = []
  const scopes: Record<string, number> = {}

  for (const [scope, sets] of byScope) {
    scopes[scope] = new Set([...sets.values()].flatMap((s) => [...s])).size
    // A lone source in a scope has nothing to be crossed AGAINST. Passing it to the intersection
    // machinery would return the empty answer that reads as "no agreement found".
    if (sets.size < 2) {
      for (const s of sets.keys()) incommensurable.push(s)
      continue
    }
    const byTarget = new Map<string, Set<string>>()
    for (const [source, targets] of sets) {
      for (const t of targets) byTarget.set(t, (byTarget.get(t) ?? new Set<string>()).add(source))
    }
    for (const [target, srcs] of byTarget) {
      if (srcs.size > 1) corroborated.push({ target, scope, sources: [...srcs].sort() })
    }
    for (const c of containment(sets)) {
      if (c.share > 0) carried.push({ source: c.law, inside: c.inside, share: c.share, scope })
    }
    orthogonal.push(...orthogonalLaws(sets))
    for (const i of crossIntersections(sets)) {
      if (i.shared === 0) continue
      agreement.push({ a: i.a, b: i.b, scope, shared: i.shared, expected: i.expected, lift: i.lift })
    }
  }

  return {
    sources: Object.fromEntries([...sizes].map(([k, v]) => [k, v.size])),
    corroborated: corroborated.sort(
      (a, b) => b.sources.length - a.sources.length || a.target.localeCompare(b.target),
    ),
    carried: carried.sort((a, b) => b.share - a.share || a.source.localeCompare(b.source)),
    orthogonal: orthogonal.sort(),
    scopes,
    incommensurable: incommensurable.sort(),
    agreement: agreement.sort((a, b) => b.lift - a.lift || b.shared - a.shared),
  }
}
