import { describe, it, expect } from 'vitest'
import { decay, transmission, transmissionWKB, tamperCostBits } from '@/barrier'

// Quantum tunnelling computed from ħ. Tests assert the tunnelling RELATIONS —
// exponential suppression, the −log2(T) tamper-cost, and the WKB prefactor limit —
// never a magic number.
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b)
const eV = 1.602176634e-19
const m = 9.1093837015e-31 // electron mass

describe('barrier: quantum tunnelling = the exponential of tamper-cost', () => {
  it('there is no tunnelling regime unless the barrier is classically forbidden (V0 > E)', () => {
    expect(() => decay(m, 0.5 * eV, 1 * eV)).toThrow() // V0 < E
    expect(() => decay(m, 1 * eV, 1 * eV)).toThrow() // V0 = E
    expect(decay(m, 1 * eV, 0.5 * eV)).toBeGreaterThan(0)
  })

  it('WKB transmission is in (0,1]: full at zero width, exponentially vanishing as it grows', () => {
    const k = decay(m, 1 * eV, 0.5 * eV)
    expect(transmissionWKB(k, 0)).toBe(1)
    expect(transmissionWKB(k, 5e-10)).toBeGreaterThan(0)
    expect(transmissionWKB(k, 5e-10)).toBeLessThan(1)
    expect(transmissionWKB(k, 1e-9)).toBeLessThan(transmissionWKB(k, 5e-10)) // thicker ⇒ smaller
    expect(transmissionWKB(2 * k, 5e-10)).toBeLessThan(transmissionWKB(k, 5e-10)) // higher ⇒ smaller
  })

  it('the exact rectangular-barrier transmission is a real probability in (0,1)', () => {
    const k = decay(m, 1 * eV, 0.5 * eV)
    const T = transmission(k, 5e-10, 0.5 * eV, 1 * eV)
    expect(T).toBeGreaterThan(0)
    expect(T).toBeLessThan(1)
  })

  it('tamper-cost IS −log2(T): exponential transmission ⇔ linear cost in bits', () => {
    const k = decay(m, 1 * eV, 0.5 * eV)
    for (const a of [2e-10, 5e-10, 1e-9]) {
      expect(rel(transmissionWKB(k, a), 2 ** -tamperCostBits(k, a))).toBeLessThan(1e-12)
    }
    // linear in width: doubling the barrier doubles the cost (so T squares)
    const k1 = decay(m, 1 * eV, 0.5 * eV)
    expect(rel(tamperCostBits(k1, 1e-9), 2 * tamperCostBits(k1, 5e-10))).toBeLessThan(1e-12)
  })

  it('WKB captures the exact exponential: T_exact / T_WKB → 16·E·(V0−E)/V0² for a thick barrier', () => {
    const E = 0.5 * eV
    const V0 = 1 * eV
    const k = decay(m, V0, E)
    const prefactor = (16 * E * (V0 - E)) / (V0 * V0) // = 4 for E = V0/2
    const a = 2e-9 // κa ≈ 7 — thick enough that sinh ≈ e^(κa)/2
    expect(rel(transmission(k, a, E, V0) / transmissionWKB(k, a), prefactor)).toBeLessThan(1e-2)
  })
})
