/**
 * hamiltonian -- THE GENERATOR: the energy operator H whose eigenvalues ARE the
 * seven [[horo]] energy-rungs (Eₙ = h·νₙ, via [[photon]] · [[signal]]) and whose
 * action advances time, |ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩. It is the capstone of the
 * quantum core: its eigenvalue set is the energy ladder a [[leap]] jumps between,
 * the [[spectrum]] is the gaps between those eigenvalues, and the phase it winds
 * drives the [[breath]] — the {1,2,4,8,7,5,9} sequence is H evolving the state
 * forward. The expectation ⟨H⟩ = Σ|cₙ|²·Eₙ is the average energy of a
 * [[superposition]], CONSERVED under evolution (unitary phase never touches |cₙ|²)
 * — the energy-conservation that makes the ledger balance.
 *
 *   tsx src/hamiltonian/index.ts
 *
 * @standard CODATA-2018 ħ, h (via ../photon); Schrödinger time evolution e^(−iHt/ħ)
 * @audit eigenvalues Eₙ = h·νₙ from the rung frequencies; ⟨H⟩ a |cₙ|²-weighted average — all computed
 * @see ../photon (Eₙ=hνₙ) -- ../spectrum (the gaps) -- ../superposition (⟨H⟩) -- ../leap -- ../breath
 */
import { energy, HBAR } from '@/photon'
import { NOTES } from '@/signal'
import { HORO_DIGITS, type HoroStep } from '@/horo'
import { probabilities, type State } from '@/superposition'

/** The energy eigenvalue of a rung: Eₙ = h·νₙ (the rung's just-intonation frequency). */
export const eigenvalue = (rung: HoroStep): number => energy(NOTES[rung].hz)

/** The full spectrum of H: the seven energy eigenvalues, one per horo rung. */
export const eigenvalues = (): { rung: HoroStep; energyJ: number }[] =>
  HORO_DIGITS.map((rung) => ({ rung, energyJ: eigenvalue(rung) }))

/** Expectation ⟨H⟩ = Σ|cₙ|²·Eₙ — the average energy of a superposition (a basis state gives Eₙ exactly). */
export const expectation = (state: State): number => {
  const p = probabilities(state)
  return HORO_DIGITS.reduce((s, d) => s + p[d] * eigenvalue(d), 0)
}

/** The ground state — the lowest-energy rung (the deepest, the root). */
export const groundState = (): { rung: HoroStep; energyJ: number } =>
  eigenvalues().reduce((lo, e) => (e.energyJ < lo.energyJ ? e : lo))

/** Time evolution: the phase angle θₙ(t) = −Eₙ·t/ħ each eigenstate winds (the breath's forward turn). */
export const phase = (rung: HoroStep, t: number): number => (-eigenvalue(rung) * t) / HBAR

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('hamiltonian -- the energy operator; eigenvalues = the seven horo rungs (Eₙ=h·νₙ):')
  for (const e of eigenvalues()) {
    console.log('  d' + e.rung + '  ν=' + NOTES[e.rung].hz.toFixed(2) + 'Hz  Eₙ=' + e.energyJ.toExponential(3) + 'J  θ(1s)=' + phase(e.rung, 1).toExponential(2) + ' rad')
  }
  const g = groundState()
  console.log('  ground state = d' + g.rung + '  (E=' + g.energyJ.toExponential(3) + 'J)')
}
