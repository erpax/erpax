/**
 * self/sufficient — self-sufficiency as a SECURITY property, made computational.
 *
 * The operating heuristic (derive from within, don't ask) has a measurable
 * dual. Every EXTERNAL dependence is a cheaper attack path than out-computing
 * the content digest: an attacker who can subvert a remote AI-model API that
 * shapes content before it is hashed, a third-party service, or a remote agent
 * never needs the 2^106 second-preimage — they corrupt the input. So the
 * effective tamper cost is capped at the WEAKEST external trust link (the same
 * weak-anchor law as tamper-cost).
 *
 * Decrease dependence ⇒ increase tampering cost. Internalising a dependency —
 * a model saved locally / run on Workers AI (bindings), an external call
 * replaced by a local content-addressed SKILL — removes that cheap path, so the
 * effective cost rises toward the digest bound. The society co-evolves: external
 * agents bootstrap a new skill ONCE; the society then runs it locally forever,
 * each internalisation a shared discovery (merge: gaps filled by many, deduped
 * by content-uuid) recorded in git history (the distributed anchor that costs
 * nothing to keep). The same act, both directions — dependence ↓, tamper cost ↑.
 *
 * One MANDATORY external is kept: the distributed anchor (git history / a TSA —
 * the single drop of borrowed entropy that makes the zero-entropy whole
 * tamper-evident). It is not a liability; it is the floor's witness.
 *
 * @standard NIST SP 800-107r1 §5.1 (the digest bound — via tamper-cost)
 * @standard NIST SP 800-161r1 (supply-chain / external-dependency risk)
 * @audit Conservation Law 53 (self-referential closure — internal fallback can replay)
 * @audit Conservation Law 54 (universal identity element — every case already defined)
 */

import { crackVerdict, ERPAX_DIGEST_BITS, type CrackVerdict } from '@/services/tamper-cost'

/** Kinds of external dependence — each a trust link an attacker can target instead of the digest. */
export type DependencyKind = 'ai-model' | 'service' | 'binding' | 'agent' | 'library'

/**
 * An external dependency: a trust link with a COMPROMISE cost in bits — how
 * hard it is to subvert the dependency itself (≪ the digest's 2^106 when the
 * dep is a remote API you must trust). Lower ⇒ cheaper attack path.
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
 * The weakest link binds (min over the digest/anchor floor and every liability);
 * removing liabilities raises the floor toward the digest bound — the law.
 *
 * @param digestBits content-uuid digest width (default erpax's 106)
 * @param anchorStrengthBits the mandatory distributed anchor (git/TSA), default 128
 * @param liabilities external dependencies that are attack surface (not the anchor)
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
  const floor = Math.min(digestBits, anchorStrengthBits)
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
  const selfSufficiency = binding === 'dependency' ? Math.max(0, effectiveCostBits / floor) : 1
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
 * liability set (now a local, content-addressed skill/model); the effective
 * tamper cost rises if it was the binding link. Returns the new liability set
 * AND the new verdict, so the loop is measurable: dependence ↓, cost ↑.
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
 * weakest external link is passed as the effective anchor strength, so a society
 * with a cheap external dependency is correctly reported as bound by it (the
 * weak-anchor case); fully internalised, the digest binds and — at full
 * content-address coverage — the cost is unbounded.
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
