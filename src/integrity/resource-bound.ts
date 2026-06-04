/**
 * resource-bound — the THERMODYNAMIC half of the tamper proof (Conservation Law 55,
 * physical form). `tamper-reverse-cost` gives the forge cost in BITS (2^k × depth ×
 * streams × dims); this turns bits into the minimum ENERGY any attacker must spend
 * and compares it against the actual energy budgets of the planet, the sun, the
 * galaxy and the observable universe — proving forge ≫ resources while verify stays
 * O(N) ([[proof]] · [[tamper-cost]]).
 *
 * The floor is Landauer's principle: an IRREVERSIBLE bit operation costs ≥ kT·ln2,
 * minimised at the coldest a passive computer can run — the cosmic microwave
 * background, T = 2.725 K ⇒ kT·ln2 = 2.61e-23 J. So enumerating 2^bits states costs
 * AT LEAST `2^bits × 2.61e-23 J` — a hard lower bound (a real attack, evaluating a
 * hash per trial, costs ~2^16× more; this floor only makes the proof conservative).
 *
 * THE HONEST RESULT (why "when ALL is uuid-driven" is load-bearing):
 *   - a SINGLE 128-bit content-uuid (second-preimage 2^128) costs ~10^16 J at the
 *     floor — strong, but BELOW a year of global electricity. One uuid does NOT, by
 *     itself, exceed all resources. (Stating this is what makes the proof a proof.)
 *   - but ALL-uuid-driven means the datum is committed to by its uuid AND every
 *     ancestor leaf (chain depth) AND every contributing stream AND every dimension
 *     AND every replica — and `computeTamperReverseCost` shows those MULTIPLY:
 *     totalBits = 128·depth + log2(streams)·depth + log2(dims)·depth. Any chain of
 *     depth ≥ ~6 already exceeds the observable universe's entire mass-energy; a
 *     production chain (depth 10^4) reaches ~10^6 bits — a number with no physical
 *     referent. THAT is "always higher than the resources."
 *
 * Verify, meanwhile, is O(N): recompute the hashes and compare. The released
 * asymmetry (forge ≫ verify, forge ≫ universe) IS the trust.
 *
 * @standard NIST FIPS 180-4 sha-256 (the content-uuid digest) — second-preimage 2^256, collision 2^128
 * @standard Landauer 1961 / Bennett 1982 — kT·ln2 minimum per irreversible bit op
 * @audit Conservation Law 55 (tamper-reversibility-cost) — physical bound
 * @see ./tamper-reverse-cost.ts (the bit-cost this prices in joules)
 */
import type { TamperReverseCost } from '@/integrity/tamper-reverse-cost'

/** Landauer floor at the CMB (2.725 K): kT·ln2 joules per irreversible bit operation — the absolute minimum. */
export const LANDAUER_FLOOR_JOULES = 2.61e-23

/**
 * log10 of the MINIMUM energy (joules) to perform 2^bits irreversible operations.
 * Computed in log-space so it never overflows (2^256 is not representable as a float,
 * but 256·log10(2) is). A lower bound on any 2^bits brute force.
 */
export function energyLog10Joules(bits: number): number {
  return bits * Math.log10(2) + Math.log10(LANDAUER_FLOOR_JOULES)
}

/** An energy budget an attacker might command, as log10(joules), with its provenance. */
export interface ResourceBudget {
  readonly name: string
  readonly log10Joules: number
  readonly note: string
}

/** Real energy budgets, ascending — the resources a tamper is measured against. */
export const RESOURCE_BUDGETS: readonly ResourceBudget[] = [
  { name: 'global-electricity-year', log10Joules: 19.95, note: '~25,000 TWh/yr (IEA 2023) = 9e19 J' },
  { name: 'earth-solar-influx-year', log10Joules: 24.74, note: '1.74e17 W × 1 yr = 5.5e24 J' },
  { name: 'sun-output-lifetime', log10Joules: 44.08, note: '3.83e26 W × ~10^10 yr = 1.2e44 J' },
  { name: 'milky-way-stellar-lifetime', log10Joules: 55.0, note: '~10^11 stars × sun-lifetime = 1e55 J' },
  { name: 'observable-universe-mass-energy', log10Joules: 69.6, note: '~4e69 J (total mass-energy)' },
]

/** The largest budget whose energy the 2^bits floor EXCEEDS (null = within a year of global electricity). */
export function largestBudgetExceeded(bits: number): ResourceBudget | null {
  const e = energyLog10Joules(bits)
  let exceeded: ResourceBudget | null = null
  for (const b of RESOURCE_BUDGETS) if (e > b.log10Joules) exceeded = b
  return exceeded
}

/** True iff forging this many bits costs more energy than the entire observable universe holds. */
export const beyondUniverse = (bits: number): boolean =>
  energyLog10Joules(bits) > RESOURCE_BUDGETS[RESOURCE_BUDGETS.length - 1].log10Joules

/** The full verdict: forge energy vs resources, beside the O(N) verify cost — the asymmetry made physical. */
export interface ResourceVerdict {
  readonly forgeBits: number
  readonly forgeEnergyLog10Joules: number
  readonly largestBudgetExceeded: string | null
  readonly beyondUniverse: boolean
  /** verify is O(N): one hash recomputation per leaf — linear, trustless. */
  readonly verifyOps: number
  /** log10 of the forge/verify ratio — the released asymmetry that IS the trust. */
  readonly asymmetryLog10: number
}

/** Price a {@link TamperReverseCost} (bits) into energy and prove it against the resource budgets. */
export function proveBeyondResources(cost: TamperReverseCost): ResourceVerdict {
  const verifyOps = Math.max(1, cost.leafDepth) // O(N): walk the chain once
  const forgeEnergyLog10 = energyLog10Joules(cost.totalBits)
  return {
    forgeBits: cost.totalBits,
    forgeEnergyLog10Joules: forgeEnergyLog10,
    largestBudgetExceeded: largestBudgetExceeded(cost.totalBits)?.name ?? null,
    beyondUniverse: beyondUniverse(cost.totalBits),
    verifyOps,
    asymmetryLog10: cost.totalBits * Math.log10(2) - Math.log10(verifyOps),
  }
}
