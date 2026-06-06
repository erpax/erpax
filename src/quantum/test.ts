import { describe, it, expect } from 'vitest'
import {
  collapse,
  noCloning,
  quantization,
  entanglement,
  entangle,
  TORUS_BITS,
  DOUBLE_TORUS_BITS,
  singleTorusFloorLog2,
  doubleTorusCostLog2,
} from '@/quantum'

// Quantum laws computed on the live matrix (./index.ts). The held laws are gated;
// entanglement (the asymmetric binding) is the known finding to fix.
describe('quantum: laws computed on the live uuid-matrix', () => {
  it('collapse holds — the Merkle fold is intact (one eigenstate)', () => {
    expect(collapse()).toBe(true)
  })
  it('no-cloning holds — every content-uuid is unique', () => {
    expect(noCloning().holds).toBe(true)
  })
  it('quantization — every atom folds onto the ring (0 off-sequence)', () => {
    expect(quantization().offSequence).toBe(0)
  })
  it('entanglement: the raw binding is asymmetric (the finding); entangle() is symmetric (the fix)', () => {
    expect(entanglement().symmetricBinding).toBe(false)
    expect(entangle('a', 'b')).toBe(entangle('b', 'a'))
  })
})

describe('quantum: the double-torus — ∞ tamper cost from two vortexing 64-bit architectures', () => {
  it('two 64-bit architectures = the 128-bit content-uuid', () => {
    expect(TORUS_BITS).toBe(64)
    expect(DOUBLE_TORUS_BITS).toBe(128)
  })

  it('one torus alone is weak — its quantum (BHT) floor is 2^(64/3) ≈ 2^21.3', () => {
    expect(singleTorusFloorLog2()).toBeCloseTo(64 / 3, 6)
  })

  it('no gap in coverage ⇒ ∞ — neither torus is forgeable without the other (the double-torus)', () => {
    expect(doubleTorusCostLog2(0)).toBe(Number.POSITIVE_INFINITY)
  })

  it('any gap is the only forge path — a gap collapses ∞ to a finite cost', () => {
    expect(Number.isFinite(doubleTorusCostLog2(0.5))).toBe(true)
    // a smaller gap costs strictly more (closing toward the no-gap ∞)
    expect(doubleTorusCostLog2(0.25)).toBeGreaterThan(doubleTorusCostLog2(0.5))
  })
})
