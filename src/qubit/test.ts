import { describe, it, expect } from 'vitest'
import {
  atomPath,
  isClassicalBit,
  sixthRootsOfUnity,
  doublingIsomorphicToRoots,
  vortexCircuit,
  slashFlows,
  standingWaveNodes,
  prepareQubit,
  measureQubit,
  bitShadow,
  qubitFromVortex,
} from '@/qubit'
import { DOUBLING } from '@/rodin'

describe('qubit', () => {
  it('atomPath', () => {
    expect(atomPath).toBe('qubit')
  })

  it('classical bit is 0|1', () => {
    expect(isClassicalBit(0)).toBe(true)
    expect(isClassicalBit(1)).toBe(true)
    expect(isClassicalBit(2)).toBe(false)
  })

  it('⟨2⟩ ≅ six roots — computed', () => {
    expect(sixthRootsOfUnity().map((r) => r.digit)).toEqual([...DOUBLING])
    expect(doublingIsomorphicToRoots()).toBe(true)
  })

  it('vortex circuit digits', () => {
    expect(vortexCircuit()).toEqual([0, 1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1])
  })

  it('slash coils + standing nodes — computed', () => {
    expect(slashFlows().counterRotates).toBe(true)
    expect(standingWaveNodes().length).toBeGreaterThan(0)
  })

  it('measure: 6 phases → digit → bit', () => {
    const m = measureQubit(prepareQubit(), 0)
    expect(m.fromPhases).toBe(6)
    expect(m.digit).toBe(1)
    expect(m.bit).toBe(0)
    expect(measureQubit(prepareQubit(), 1).bit).toBe(1)
    expect(bitShadow(8, 3)).toBe(1)
  })

  it('qubitFromVortex.holds is computed (no hand claims · no host Math)', () => {
    const r = qubitFromVortex()
    expect(r.holds).toBe(true)
    expect(r.isomorphic).toBe(true)
    expect(r.counterRotates).toBe(true)
    expect(prepareQubit().ampSq).toEqual({ num: 1, den: 6 })
    expect(sixthRootsOfUnity()[1]!.re).toEqual({ a: 1, b: 0, den: 2 })
    expect(sixthRootsOfUnity()[1]!.im).toEqual({ a: 0, b: 1, den: 2 })
    expect('physicalQubitClaim' in r).toBe(false)
    expect('qpu' in r).toBe(false)
  })
})
