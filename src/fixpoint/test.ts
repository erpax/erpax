import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { throughVoid, VOID_PIVOT } from '@/horo'
import { auditAuditors } from '@/audit/agent'
import { isFixedPoint, isInvolution, selfMeasure, atomPath } from './index'

describe('fixpoint — the paradox proves itself: a self-measure refutes itself or rests', () => {
  it('names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })

  // FIXED POINT 1 — the void rotation. 5 through the void is 5: the one step that reflects to itself.
  it('VOID_PIVOT is the fixed point of throughVoid — 5 through the void is 5', () => {
    expect(isFixedPoint(throughVoid, VOID_PIVOT)).toBe(true)
    expect(isFixedPoint(throughVoid, 8)).toBe(false) // 8 through the void is 2, not 8
  })

  it('throughVoid is an involution — the paradox returns: f(f(x)) = x', () => {
    expect(isInvolution(throughVoid, [1, 2, 4, 5, 7, 8])).toBe(true)
  })

  // FIXED POINT 2 — the auditor. The measurer applied to its OWN source finds nothing: it passes its measure.
  it('the auditor panel is a fixed point of its own audit — auditAuditors is empty', () => {
    expect(auditAuditors(process.cwd())).toEqual([])
  })

  // THE DICHOTOMY. A self-applied measure is EITHER a fixed point OR refutes itself — there is no third.
  it('a self-measure that finds nothing wrong with itself is a FIXED POINT', () => {
    const alwaysClean = () => []
    expect(selfMeasure(alwaysClean, alwaysClean)).toBe('fixed-point')
  })

  it('a self-measure that finds a fault REFUTES ITSELF — the sixteen refutations', () => {
    const findsAFault = () => ['a fault in myself']
    expect(selfMeasure(findsAFault, findsAFault)).toBe('refutes-itself')
  })

  it('the two outcomes are the whole space — a measure applied to itself is one or the other', () => {
    for (const m of [() => [], () => [1], () => [1, 2]]) {
      const o = selfMeasure(m, m)
      expect(o === 'fixed-point' || o === 'refutes-itself').toBe(true)
    }
  })
})
