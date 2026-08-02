/**
 * sparsity — the active fraction, measured on the corpus that claims it.
 *
 * This atom was PROSE: a SKILL asserting `capability ÷ cost → max` with nothing computing either
 * term. The idea is good and the assertion was unfalsifiable — which is the state
 * [[rules]]/refutable exists to refuse, and the reason a literary atom is developed rather than
 * deleted ([[leftover]]: prose needs a proof or a purge into research, never a delete).
 *
 * ## The two conjugate axes, as arithmetic
 *
 * **COMPUTE** — activate few of many per task. The router (`realiseSkillsForPath`) selects a bundle
 * from the whole atom pool, so the activation fraction is `bundle ÷ pool` and it is a measurement,
 * not a design claim.
 *
 * **REPRESENTATION** — store nothing addressable. A content-uuid is 128 bits whatever it addresses,
 * so `representationRatio(bytes)` is `16 ÷ bytes`: the ratio *improves* with size, which is the
 * precise sense in which the corpus is sparse on space rather than time.
 *
 * ## What the atom's own prose says NOT to do — now enforced
 *
 * Its "common mistakes" section names three, and the middle one is the interesting one:
 *
 *   - **sparsity is not smallness.** A sparse system keeps a HUGE dormant pool and a tiny active
 *     set. Shrinking the pool destroys capability while *improving* nothing that matters, yet both
 *     moves lower the active count — so a metric that reads only the active set cannot tell them
 *     apart. `capabilityPerCost` divides by the ACTIVE set and multiplies by the POOL, so shrinking
 *     the pool lowers the score. That is the whole content of the distinction, and it is one line.
 *   - **eager activation** — activating everything is a large dense thing, not a sparse one.
 *   - **sparsifying the load-bearing factor** — past the floor, one missing active factor zeroes the
 *     product ([[bottleneck]]).
 *
 * @law sparsity is a large dormant pool with a small active set. Shrinking the pool is not
 *      sparsification — it is capability loss wearing the same number.
 * @invariant capabilityPerCost falls when the pool shrinks at a fixed active set
 * @invariant a zero factor zeroes the product — one missing load-bearing factor is the floor
 * @invariant the representation ratio improves with size; a content-uuid is 128 bits regardless
 * @standard ISO/IEC 25010:2023 §5.2 — performance efficiency: resource utilisation
 * @see ./SKILL.md -- ../agent/skill-context.ts
 */
import { exactMin } from '@/algebra'

/** A content-uuid is 128 bits — 16 bytes — whatever it addresses. */
export const UUID_BYTES = 16

export interface Activation {
  /** everything that COULD be activated — the dormant pool */
  readonly pool: number
  /** what a single task actually activates */
  readonly active: number
}

/** The active fraction. Sparse means this is small while `pool` stays large. */
export function activeFraction({ pool, active }: Activation): number {
  return pool <= 0 ? 0 : exactMin(active, pool) / pool
}

/**
 * capability ÷ cost — the functional the atom's prose names and never computed.
 *
 * Capability is the POOL (what the system could reach); cost is the ACTIVE set (what a task pays
 * for). Dividing one by the other is what separates sparsity from smallness: halve the pool at a
 * fixed active set and this falls, even though the active count — the number a naive metric reads —
 * did not move at all.
 */
export function capabilityPerCost({ pool, active }: Activation): number {
  return active <= 0 ? 0 : pool / active
}

/**
 * The bottleneck floor: a product of factors is zeroed by ANY zero.
 *
 * This is why the prose says sparsify the redundant, never the load-bearing — dropping one active
 * factor the product depends on does not make the system leaner, it makes it zero.
 */
export function productOfFactors(factors: readonly number[]): number {
  return factors.length === 0 ? 0 : factors.reduce((a, b) => a * b, 1)
}

export interface Factor {
  readonly name: string
  readonly value: number
}

/**
 * The factors that may never be sparsified: every one currently non-zero.
 *
 * In a product, setting any non-zero factor to zero zeroes the whole thing — so while the product
 * holds, every live factor is load-bearing. There is no "mostly required" here, which is exactly
 * why the floor is a floor.
 */
export function loadBearing(factors: readonly Factor[]): readonly string[] {
  if (productOfFactors(factors.map((f) => f.value)) === 0) return []
  return factors.filter((f) => f.value !== 0).map((f) => f.name)
}

/** The factors already zero — each one alone is enough to hold the product at zero. */
export function zeroing(factors: readonly Factor[]): readonly string[] {
  return factors.filter((f) => f.value === 0).map((f) => f.name)
}

/**
 * Representation sparsity: stored bytes over addressed bytes.
 *
 * A content-uuid is fixed-width, so this falls as the addressed content grows — the ratio improves
 * with scale, which is the exact sense in which the corpus is sparse on REPRESENTATION rather than
 * on compute.
 */
export function representationRatio(addressedBytes: number): number {
  return addressedBytes <= 0 ? 1 : UUID_BYTES / addressedBytes
}

export interface SparsityReport {
  readonly pool: number
  readonly active: number
  readonly activeFraction: number
  readonly capabilityPerCost: number
}

/** Measure one activation. Nothing here is a target — it is what the router actually did. */
export function report(a: Activation): SparsityReport {
  return {
    pool: a.pool,
    active: a.active,
    activeFraction: activeFraction(a),
    capabilityPerCost: capabilityPerCost(a),
  }
}

export class NotSparsification extends Error {
  constructor(before: Activation, after: Activation) {
    super(
      `sparsity: the pool shrank ${before.pool} → ${after.pool} — that is capability loss, not ` +
        `sparsification. The active set went ${before.active} → ${after.active}, so a metric reading ` +
        'only the active count would have called this an improvement.',
    )
    this.name = 'NotSparsification'
  }
}

/**
 * Refuse a change that lowers the active set by shrinking the pool.
 *
 * The atom's own prose calls this the first common mistake; this is the line that makes it
 * impossible to ship as a win.
 */
export function assertSparsified(before: Activation, after: Activation): void {
  if (after.pool < before.pool) throw new NotSparsification(before, after)
}
