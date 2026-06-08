import { describe, it, expect } from 'vitest'
import {
  doublingGroup, reverseIsInverse, axisOffCircuit, nineIsVoid, octaveFixesDigit,
  cayleyIsCyclic, compositionMatrix, stateUuids, cmykKey, proof,
  orbit, unitsMod9, DOUBLING, AXIS, RODIN_FLOW_RATIO, RODIN_CONTROL_RATIO,
} from '@/rodin'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

// Marko Rodin's vortex math proven as (ℤ/9ℤ) arithmetic. Every assertion is a
// RELATION computed on the residues / live matrix, never a pasted magic number.
// The metaphysics (free energy etc.) is out of scope -- only the group theory is.
describe('rodin: vortex math = (ℤ/9ℤ) group theory, computed', () => {
  it('the doubling helix IS the cyclic group ⟨2⟩ = (ℤ/9ℤ)*, order 6 = φ(9)', () => {
    const g = doublingGroup()
    expect(g.order).toBe(6)
    expect(g.equalsUnits).toBe(true)
    expect(g.cyclic).toBe(true)
    expect(orbit(2)).toEqual([...DOUBLING]) // the computed orbit matches the documented constant
    expect(unitsMod9()).toEqual([1, 2, 4, 5, 7, 8])
  })

  it('×5 inverts ×2 (2·5 ≡ 1); the reverse helix mirrors the forward', () => {
    const r = reverseIsInverse()
    expect(r.product).toBe(1)
    expect(r.mirrors).toBe(true)
    expect(r.reverse).toEqual([1, 5, 7, 8, 4, 2])
  })

  it('the 3·6·9 axis is off the helix (3↔6 swap, 9 fixed); flow:control = 6:3 = 2/3', () => {
    const a = axisOffCircuit()
    expect(a.disjoint).toBe(true)
    expect(a.nineFixed).toBe(true)
    expect([...AXIS].every((d) => !new Set(orbit(2)).has(d))).toBe(true)
    expect(a.flow / (a.flow + a.control)).toBeCloseTo(2 / 3)
    expect(RODIN_FLOW_RATIO).toBe(2 / 3)
    expect(RODIN_CONTROL_RATIO).toBe(1 / 3)
    expect(RODIN_FLOW_RATIO).not.toBe(0.666)
  })

  it('9 is the void (additive identity of digital root): dr(n+9) = dr(n)', () => {
    expect(nineIsVoid().holds).toBe(true)
  })

  it('the octave ×10 fixes the digit (10 ≡ 1); 9 wraps to 1', () => {
    const o = octaveFixesDigit()
    expect(o.holds).toBe(true)
    expect(o.wrap).toBe(1)
  })

  it('THE HOLOGRAM: the unit Cayley table is index addition — 6 generators → 36 cells, 0 free parameters (zero entropy)', () => {
    const c = cayleyIsCyclic()
    expect(c.holds).toBe(true)
    expect(c.whole).toBe(36)
    expect(c.generators).toBe(6)
    expect(c.freeParameters).toBe(0)
  })

  it('the composition matrix is 10×10, every cell a single digit on the ring', () => {
    const m = compositionMatrix()
    expect(m.length).toBe(10)
    expect(m.every((row) => row.length === 10)).toBe(true)
    expect(m.flat().every((d) => d >= 1 && d <= 9)).toBe(true)
  })

  it('each state is carried by content-uuids — the vortex digits partition every matrix node', () => {
    const total = stateUuids().reduce((s, x) => s + x.count, 0)
    expect(total).toBe(UUID_MATRIX_NODES.length)
  })

  it('CMYK {0,3,6,9} = {K,C,M,Y}; 0/K is the key; 9 → 1 seeds the next dimension', () => {
    const k = cmykKey()
    expect(k.key).toBe(0)
    expect(k.keyChannel).toBe('K')
    expect(k.wrap).toBe(1)
    expect(k.gamut.map((g) => g.channel)).toEqual(['K', 'C', 'M', 'Y'])
  })

  it('the whole proof holds (every Rodin arithmetic claim computed true)', () => {
    expect(Object.values(proof()).every(Boolean)).toBe(true)
  })
})
