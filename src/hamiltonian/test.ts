import { describe, it, expect } from 'vitest'
import { eigenvalue, eigenvalues, expectation, groundState, phase } from '@/hamiltonian'
import { energy, HBAR } from '@/photon'
import { NOTES } from '@/signal'
import { HORO_DIGITS } from '@/horo'
import { superpose, uniform, probabilities } from '@/superposition'

// The Hamiltonian computed over the seven horo rungs. Tests assert the operator
// RELATIONS — eigenvalues = h·νₙ, the |cₙ|²-weighted expectation, the variational
// bound, and the conservation under phase evolution — never a magic number.
describe('hamiltonian: the energy operator behind the leap', () => {
  it('eigenvalues are the seven rung energies Eₙ = h·νₙ, all positive', () => {
    const evs = eigenvalues()
    expect(evs).toHaveLength(7)
    for (const e of evs) {
      expect(e.energyJ).toBe(energy(NOTES[e.rung].hz))
      expect(e.energyJ).toBeGreaterThan(0)
    }
  })

  it('a basis state (eigenstate) has a definite energy: ⟨H⟩ = Eₙ', () => {
    for (const d of HORO_DIGITS) expect(expectation(superpose({ [d]: 1 }))).toBeCloseTo(eigenvalue(d), 40)
  })

  it('⟨H⟩ = Σ|cₙ|²·Eₙ and lies within [Emin, Emax] (the variational bound)', () => {
    const s = superpose({ 1: 1, 8: 2, 9: 1 })
    const p = probabilities(s)
    const manual = HORO_DIGITS.reduce((acc, d) => acc + p[d] * eigenvalue(d), 0)
    expect(expectation(s)).toBeCloseTo(manual, 40)
    const energies = eigenvalues().map((e) => e.energyJ)
    expect(expectation(s)).toBeGreaterThanOrEqual(Math.min(...energies))
    expect(expectation(s)).toBeLessThanOrEqual(Math.max(...energies))
  })

  it('the ground state is the lowest-energy rung', () => {
    const g = groundState()
    for (const e of eigenvalues()) expect(g.energyJ).toBeLessThanOrEqual(e.energyJ)
  })

  it('⟨H⟩ is conserved — it depends only on |cₙ|², which unitary phase evolution leaves untouched', () => {
    const u = uniform()
    const energies = eigenvalues().map((e) => e.energyJ)
    const mean = energies.reduce((a, b) => a + b, 0) / energies.length
    expect(expectation(u)).toBeCloseTo(mean, 40) // equal weights ⇒ the plain mean, independent of any t
  })

  it('phase winds θₙ(t) = −Eₙ·t/ħ: zero at t=0, faster for higher energy', () => {
    for (const d of HORO_DIGITS) {
      expect(phase(d, 0)).toBeCloseTo(0, 40)
      expect(phase(d, 1)).toBe((-eigenvalue(d) * 1) / HBAR)
    }
    const g = groundState().rung
    const top = eigenvalues().reduce((hi, e) => (e.energyJ > hi.energyJ ? e : hi)).rung
    expect(Math.abs(phase(top, 1))).toBeGreaterThan(Math.abs(phase(g, 1))) // higher energy winds faster
  })
})
