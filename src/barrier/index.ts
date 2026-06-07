/**
 * barrier -- QUANTUM TUNNELLING (the word `tunnel` is taken — it is agriculture's
 * season-extension structure; this is the physics). A particle of energy E meets a
 * potential barrier of height V0 > E it CLASSICALLY cannot cross. The [[wave]] does
 * not stop at the wall — it decays exponentially inside (evanescent), so a nonzero
 * amplitude leaks out the far side: the transmission T ≈ e^(−2κa) (WKB), with decay
 * constant κ = √(2m(V0−E))/ħ and width a. Forbidden classically, merely
 * EXPONENTIALLY UNLIKELY quantum-mechanically.
 *
 * In erpax the barrier IS tamper-[[cost]]: to forge is to tunnel through the
 * forbidden region, and the WORK is −log2(T) = 2κa/ln2 BITS — exponentially large
 * in the barrier (height·width), the same forge≫verify asymmetry the [[anchor]]
 * buys. Fast and compact, yet the residual forge-probability is never quite zero
 * (a [[leap]]'s [[limit]]): tunnelling is why no barrier is absolute.
 *
 *   tsx src/barrier/index.ts
 *
 * @standard CODATA-2018 ħ (via ../photon); WKB + exact rectangular-barrier transmission
 * @audit κ from (m,V0,E); T exact + WKB; tamper-cost = −log2(T) — computed, never asserted
 * @see ../photon (ħ) -- ../wave (the evanescent decay) -- ../tamper -- ../cost -- ../leap
 */
import { HBAR } from '@/photon'

/** The evanescent decay constant κ = √(2m(V0−E))/ħ (1/m) inside a barrier of height V0 > E. */
export function decay(massKg: number, barrierHeightJ: number, energyJ: number): number {
  if (barrierHeightJ <= energyJ) throw new Error('barrier: not classically forbidden (V0 ≤ E) — there is no tunnelling regime')
  return Math.sqrt(2 * massKg * (barrierHeightJ - energyJ)) / HBAR
}

/** WKB transmission through a thick/high barrier: T ≈ e^(−2κa). In (0,1] for κ,a ≥ 0. */
export const transmissionWKB = (kappa: number, widthM: number): number => Math.exp(-2 * kappa * widthM)

/** Exact rectangular-barrier transmission: T = 1 / (1 + V0²·sinh²(κa) / (4·E·(V0−E))). */
export function transmission(kappa: number, widthM: number, energyJ: number, barrierHeightJ: number): number {
  const s = Math.sinh(kappa * widthM)
  return 1 / (1 + (barrierHeightJ * barrierHeightJ * s * s) / (4 * energyJ * (barrierHeightJ - energyJ)))
}

/** The tamper-cost to tunnel through (forge): −log2(T_WKB) = 2κa/ln2 BITS — linear in width, so T is exponential. */
export const tamperCostBits = (kappa: number, widthM: number): number => (2 * kappa * widthM) / Math.LN2

if (import.meta.url === 'file://' + process.argv[1]) {
  const m = 9.1093837015e-31 // electron mass (kg)
  const eV = 1.602176634e-19 // joules per eV
  const k = decay(m, 1 * eV, 0.5 * eV)
  console.log('barrier -- quantum tunnelling (κ=' + k.toExponential(3) + ' /m, e⁻ at 0.5eV into a 1eV barrier):')
  for (const a of [1e-10, 5e-10, 1e-9]) {
    console.log(
      '  width ' + a.toExponential(0) + 'm  T_WKB=' + transmissionWKB(k, a).toExponential(3) +
        '  T_exact=' + transmission(k, a, 0.5 * eV, 1 * eV).toExponential(3) +
        '  tamper-cost=' + tamperCostBits(k, a).toFixed(1) + ' bits',
    )
  }
}
