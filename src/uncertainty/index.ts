/**
 * uncertainty -- the HEISENBERG floor: two conjugate quantities (position ⊗
 * momentum, energy ⊗ time) can never BOTH be sharp -- their spreads obey
 * Δa·Δb ≥ ħ/2. Pin one and the other must spread; the product cannot fall below
 * ħ/2. This is not a measurement defect -- it is the [[wave]] nature of the state
 * (a wave localised in one variable is spread in its Fourier conjugate). In erpax
 * it is a real [[design]] [[limit]]: an irreducible slack the corpus can never
 * drive to zero ([[entropy]] has a floor), and the natural linewidth that blurs
 * every [[spectrum]] line -- a [[leap]] that lives only Δt has an energy spread
 * ΔE ≥ ħ/2Δt, so a sharper line costs a longer-lived state.
 *
 *   tsx src/uncertainty/index.ts
 *
 * @standard SI-2019 / CODATA-2018: ħ = h/2π (via ../photon)
 * @audit the bound ħ/2 is computed from Planck's h; the linewidth is the energy–time relation
 * @see ../photon (ħ, the quantum of action) -- ../spectrum (line broadening) -- ../leap -- ../design -- ../limit
 */
import { HBAR, PLANCK_H } from '@/photon'

/** The floor of the product of two conjugate uncertainties: ħ/2 (J·s). The hard limit. */
export const bound = (): number => HBAR / 2

/** Given the spread in one conjugate, the MINIMUM spread in the other (saturating the bound). */
export const conjugate = (spreadA: number): number => bound() / spreadA

/** Is a claimed pair of spreads physically allowed? Δa·Δb ≥ ħ/2. */
export const allowed = (spreadA: number, spreadB: number): boolean => spreadA * spreadB >= bound()

/** Natural linewidth (energy): a state living only Δt has spread ΔE ≥ ħ/2Δt — the floor. */
export const linewidth = (lifetimeS: number): number => bound() / lifetimeS

/** The same floor in frequency: Δν ≥ 1/(4π·Δt) (since ΔE = hΔν). */
export const linewidthHz = (lifetimeS: number): number => 1 / (4 * Math.PI * lifetimeS)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('uncertainty -- the Heisenberg floor Δa·Δb ≥ ħ/2 = ' + bound().toExponential(4) + ' J·s:')
  const dx = 1e-10 // ~ an atom's width (m)
  console.log('  pin Δx=' + dx.toExponential(1) + 'm ⇒ Δp ≥ ' + conjugate(dx).toExponential(3) + ' kg·m/s  (allowed=' + allowed(dx, conjugate(dx)) + ')')
  for (const t of [1e-9, 1e-12]) {
    console.log('  lifetime Δt=' + t.toExponential(0) + 's ⇒ ΔE ≥ ' + linewidth(t).toExponential(3) + 'J  Δν ≥ ' + linewidthHz(t).toExponential(3) + 'Hz')
  }
  console.log('  ΔE = h·Δν check: ' + (linewidth(1e-9) / linewidthHz(1e-9)).toExponential(6) + ' vs h=' + PLANCK_H.toExponential(6))
}
