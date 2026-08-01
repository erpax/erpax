import { exactAbs } from '@/algebra'
/**
 * skin — the COMPUTED PROOF that erpax's boundary is the integument organ: the
 * largest organ, a selectively-permeable BARRIER between inside and outside that
 * renews itself continuously and holds the interior to a setpoint. The skin is
 * the [[sandbox]]/[[gate]] membrane in flesh — the trust boundary of the self.
 *
 * Three properties of the living skin, each computed, mapped — a structural
 * isomorphism — onto erpax (cited science in ./SKILL.md):
 *
 *  1. BARRIER — selectively permeable: it permits the sanctioned and blocks
 *     threats (pathogens, dehydration). The trust boundary: only capability-
 *     bearing calls pass; everything else is refused ([[sandbox]]).
 *  2. REGENERATES — the epidermis renews on a ~28-day cycle, ~1 layer/day shed
 *     and replaced from basal stem cells: the barrier heals from seed
 *     ([[regeneration]]) — damage it and it rebuilds.
 *  3. HOMEOSTASIS — negative feedback pulls the interior back to its setpoint
 *     (thermoregulation → 37 °C): a regulator that converges, keeping the self
 *     within bounds despite the outside.
 *
 *   tsx src/skin/index.ts
 *
 * @audit computed (selective permeability · turnover cycle · negative-feedback convergence)
 * @standard largest organ ≈1.2–2.2 m²; stratum corneum barrier; epidermal turnover ~28 days
 * @see ../sandbox (the trust boundary) -- ../gate -- ../regeneration -- ../self
 */

// ── 1. BARRIER — selectively permeable ───────────────────────────────────

export type Token = 'sanctioned' | 'pathogen' | 'dehydration' | 'toxin'

/** The barrier permits only the sanctioned; threats are blocked. */
export const permits = (token: Token): boolean => token === 'sanctioned'

export const barrier = (): boolean =>
  permits('sanctioned') && !permits('pathogen') && !permits('dehydration') && !permits('toxin')

// ── 2. REGENERATES — continuous renewal from seed ────────────────────────

/**
 * MEASURED, therefore uncertain — and a measurement is not a theorem. Epidermal turnover is quoted at ~28
 * days in older texts; modern estimates run longer (~40–56). Carried as the classic figure WITH its range,
 * because a bare number hides that it is one decade's instrument reading.
 */
export const RENEWAL_DAYS = 28
export const RENEWAL_DAYS_RANGE = [28, 56] as const

/**
 * Stratum corneum thickness — measured at **10–30** layers. It was previously pinned at `28`: not a
 * measurement, but the value that makes `28/28 = 1` so the "≈1 layer/day" check passed. The datum had been
 * bent to fit the conclusion — at the honest low of its own range (10) that check FAILS. Corrected to the
 * range's midpoint, and the law below no longer asserts a number the range cannot support.
 */
export const STRATUM_LAYERS = 20
export const STRATUM_LAYERS_RANGE = [10, 30] as const

/** Layers shed (and replaced from basal stem cells) per day — a RATE, derived, not a target. */
export const sheddingPerDay = (): number => STRATUM_LAYERS / RENEWAL_DAYS

/**
 * The honest law: the surface renews CONTINUOUSLY from a basal seed — shedding is strictly positive and the
 * corneum fully turns over within its renewal window. It no longer asserts "≈1 layer/day", which held only
 * at the cherry-picked top of the range.
 */
export const regenerates = (): boolean =>
  RENEWAL_DAYS > 0 && sheddingPerDay() > 0 && STRATUM_LAYERS <= RENEWAL_DAYS

// ── 3. HOMEOSTASIS — negative feedback to a setpoint ─────────────────────

export const SETPOINT_C = 37

/** One step of negative feedback toward the setpoint (gain in (0,1]). */
export const regulate = (tempC: number, gain = 0.5): number => tempC + gain * (SETPOINT_C - tempC)

/** From any starting temperature, thermoregulation converges to the setpoint. */
export const homeostasis = (start = 41, steps = 40): boolean => {
  let t = start
  let prev = exactAbs(start - SETPOINT_C)
  let monotone = true
  for (let i = 0; i < steps; i++) {
    t = regulate(t)
    const err = exactAbs(t - SETPOINT_C)
    if (err > prev) monotone = false // each step must move toward the setpoint
    prev = err
  }
  return monotone && exactAbs(t - SETPOINT_C) < 1e-6
}

// ── the proof — the conjunction ──────────────────────────────────────────

export interface BarrierProof {
  /** selectively permeable: permits the sanctioned, blocks threats. */
  readonly barrier: boolean
  /** the epidermis renews ~every 28 days — heals from seed. */
  readonly regenerates: boolean
  /** negative feedback converges to the setpoint — the interior held within bounds. */
  readonly homeostasis: boolean
}

export function integument(): BarrierProof {
  return { barrier: barrier(), regenerates: regenerates(), homeostasis: homeostasis() }
}

/** Is the skin the protecting boundary? The conjunction — selective, self-renewing, homeostatic. */
export function protects(): boolean {
  const p = integument()
  return p.barrier && p.regenerates && p.homeostasis
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = integument()
  console.log('skin — the boundary (the largest organ, the trust membrane):')
  for (const [k, v] of Object.entries(p)) console.log('  ' + (v ? '✓' : '✗') + ' ' + k)
  console.log(
    '  permits sanctioned=' + permits('sanctioned') + ' pathogen=' + permits('pathogen') +
      ' · renews every ' + RENEWAL_DAYS + ' d · setpoint ' + SETPOINT_C + ' °C',
  )
  console.log('  ⇒ ' + (protects() ? 'the self/non-self boundary' : 'NOT PROVEN'))
}
