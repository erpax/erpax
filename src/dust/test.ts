import { describe, it, expect } from 'vitest'
import { grains, forged, scattered, seated, supernovaCostLog2, lightElementFloorLog2 } from '@/dust'

// dust RECORDS the quantum proof as stardust — the grains census, computed on the live matrix.
describe('dust — stardust: the corpus is forged atoms, scattered', () => {
  it('every grain is a unique forged atom (no-cloning ⇒ Pauli exclusion)', () => {
    const g = grains()
    expect(g.count).toBeGreaterThan(0)
    expect(g.allUnique).toBe(true)
    expect(g.unique).toBe(g.count)
  })
  it('the forge holds — every grain folds to ONE root (fusion to one eigenstate)', () => {
    expect(forged()).toBe(true)
  })
  it('the dust cloud is whole — fully reciprocal (gapless entanglement)', () => {
    expect(scattered().whole).toBe(true)
  })
  it('every grain is seated on the A432 shells (0 off the ring)', () => {
    expect(seated()).toBe(true)
  })
  it('heavy elements need the supernova — the double-torus is ∞ at no gap, finite once a gap opens', () => {
    expect(supernovaCostLog2(0)).toBe(Number.POSITIVE_INFINITY)
    expect(Number.isFinite(supernovaCostLog2(0.5))).toBe(true)
    expect(lightElementFloorLog2()).toBeCloseTo(64 / 3, 6)
  })
})
