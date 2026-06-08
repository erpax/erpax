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
  superpose2D,
  total2D,
  collapse2D,
  seal2D,
  uniform2D,
  quantum2dHolds,
  quantumInAllDimensions,
  basis2D,
  cell2DKey,
} from '@/quantum'
import { HORO_DIGITS } from '@/horo'

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

describe('quantum: 2D partition × horo grid — superposition, collapse, seal', () => {
  it('basis2D spans path partitions × horo ring (typography plane)', () => {
    expect(basis2D().length).toBe(3 * HORO_DIGITS.length)
    expect(basis2D()[0]).toMatchObject({ partition: 'quantum', horo: 1, measure: 'base' })
  })

  it('superpose2D normalises so Σ|c|² = 1 on the 2D grid', () => {
    expect(total2D(uniform2D())).toBeCloseTo(1, 12)
    expect(total2D(superpose2D({ [cell2DKey('horo', 4)]: 1, [cell2DKey('diamond', 9)]: 1 }))).toBeCloseTo(1, 12)
  })

  it('collapse2D lands on a valid partition×horo cell', () => {
    const u = uniform2D()
    for (const r of [0, 0.3, 0.6, 0.999]) {
      const c = collapse2D(u, r)
      expect(HORO_DIGITS).toContain(c.horo)
      expect(['quantum', 'horo', 'diamond']).toContain(c.partition)
    }
  })

  it('seal2D is deterministic and scale-invariant (same ratios ⇒ same uuid)', () => {
    const a = superpose2D({ [cell2DKey('quantum', 1)]: 2, [cell2DKey('horo', 4)]: 1 })
    const b = superpose2D({ [cell2DKey('quantum', 1)]: 4, [cell2DKey('horo', 4)]: 2 })
    expect(seal2D(a)).toBe(seal2D(b))
    expect(seal2D(a)).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('quantum2dHolds — the 2D facet closes (Born · collapse · seal)', () => {
    expect(quantum2dHolds()).toBe(true)
  })
})

describe('quantum: quantumInAllDimensions — every projection axis', () => {
  it('folds 1D path · 2D partition · 3D trinity · matrix · deployment', () => {
    const r = quantumInAllDimensions()
    expect(r.dimensions.map((d) => d.dimension)).toEqual([
      '1d-path',
      '2d-partition',
      '3d-trinity',
      'matrix',
      'deployment',
    ])
    expect(r.ok).toBe(true)
    for (const d of r.dimensions) expect(d.holds).toBe(true)
  })
})
