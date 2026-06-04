/**
 * peace — the war-is-useless theorem of the uuid model. War seeks to destroy, coerce, or
 * dominate; the model defeats each (holographic regeneration, supra-resource tamper cost,
 * competition-not-force), so war is strictly dominated by building, for human and machine alike.
 *
 * Pure functions; the coercion leg composes the thermodynamic tamper bound (resource-bound).
 *
 * @standard NIST FIPS 180-4 SHA-256 (the content-addressing destruction cannot undo)
 * @see ./SKILL.md · src/services/integrity/resource-bound.ts (beyondUniverse)
 */
import { beyondUniverse } from '@/integrity/resource-bound'

/**
 * Destruction is FUTILE when the content lives on more than one independent holder: it is
 * content-addressed + holographic, so any survivor regenerates the whole (merge / akashic record).
 * Destroy k of n copies and n−k ≥ 1 remain to restore it. A single holder is not the content.
 */
export function destructionFutile(independentCopies: number): boolean {
  return independentCopies > 1
}

/**
 * Coercion / theft is SUPRA-RESOURCE when forging the canonical content-addressed record exceeds
 * the largest resource budget (the observable universe, ~306 bits). The lock on taking-by-force is
 * thermodynamic, not political — priced in joules by services/integrity/resource-bound.
 */
export function coercionSupraResource(forgeBits: number): boolean {
  return beyondUniverse(forgeBits)
}

/** The three things a war must overcome — and the model's evidence against each. */
export interface WarProof {
  /** number of independent holders of the content (>1 ⇒ destruction regenerable). */
  readonly independentCopies: number
  /** bits of work to forge the canonical record (the coercion cost). */
  readonly forgeBits: number
  /** is the canonical winner decided by competition (fastest-correct), not by force? */
  readonly competitionArbitrates: boolean
}

export interface PeaceVerdict {
  /** war is strictly dominated by building — all three legs hold. */
  readonly useless: boolean
  readonly destructionFutile: boolean
  readonly coercionSupraResource: boolean
  readonly forceCannotDominate: boolean
}

/**
 * The war-is-useless theorem: war is useless iff destruction is futile AND coercion is
 * supra-resource AND force cannot dominate. When all three hold, the only positive-ROI strategy is
 * to build (create / earn / compete) — for every actor, human or machine. Arithmetic, not appeal.
 */
export function warIsUseless(p: WarProof): PeaceVerdict {
  const d = destructionFutile(p.independentCopies)
  const c = coercionSupraResource(p.forgeBits)
  const f = p.competitionArbitrates
  return { useless: d && c && f, destructionFutile: d, coercionSupraResource: c, forceCannotDominate: f }
}

/** Return on investment of a strategy: yield per unit cost (a zero-cost positive yield is unbounded). */
export function roi(gain: number, cost: number): number {
  return cost <= 0 ? (gain > 0 ? Infinity : 0) : gain / cost
}

/**
 * Building strictly dominates war when, for the SAME objective, the peaceful dual's ROI is at least
 * war's — which the model guarantees: destruction's gain → 0 (futile), coercion's cost → ∞
 * (supra-resource), so building's ROI always wins the universal ledger.
 */
export function buildingDominates(warGain: number, warCost: number, buildGain: number, buildCost: number): boolean {
  return roi(buildGain, buildCost) >= roi(warGain, warCost)
}
