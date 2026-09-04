import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import {
  atomPath,
  realiseEarth,
  squarePyramidEuler,
  genus2Earth,
  genusFromChi,
  homologyTips,
  tipOmega,
  navigateTip,
  earthNavigate,
  tipGeodetic,
  tipAtPhase,
  CARDINAL_TIPS,
} from '@/earth'
import { atPole } from '@/globe'

describe('earth — realised by computing poles as a pyramid', () => {
  it('names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })

  it('square pyramid Euler: V−E+F = 2', () => {
    const e = squarePyramidEuler()
    expect(e).toEqual({ V: 5, E: 8, F: 5, chi: 2 })
  })

  it('genus-2: χ=−2 ⇒ g=2 ⇒ H₁ rank 4 = ℤ⁴; no-gap cost ∞', () => {
    expect(genusFromChi(-2)).toBe(2)
    const g = genus2Earth(0)
    expect(g.chi).toBe(-2)
    expect(g.genus).toBe(2)
    expect(g.h1Rank).toBe(4)
    expect(g.h1).toBe('Z^4')
    expect(g.noGapCost).toBe(Infinity)
  })

  it('four tips phase-locked at 0°·90°·180°·270° with alternating ±ω', () => {
    const tips = homologyTips()
    expect(tips.map((t) => t.tip)).toEqual(['N', 'E', 'S', 'W'])
    expect(tips.map((t) => t.phaseDeg)).toEqual([0, 90, 180, 270])
    expect(tips.map((t) => t.omega)).toEqual([1, -1, 1, -1])
    expect(tipOmega('N')).toBe(1)
    expect(tipOmega('E')).toBe(-1)
  })

  it('realiseEarth: 7/7 complete · WGS 84 honest · bothEarths counter-rotates', () => {
    const e = realiseEarth()
    expect(e.complete).toBe(true)
    expect(e.poles7).toHaveLength(7)
    expect(e.physicalDatum).toBe('WGS 84')
    expect(e.structuralOnly).toBe(true)
    expect(e.square.base).toBe(4)
    expect(e.eulerSquare.chi).toBe(2)
    expect(e.genus2.chi).toBe(-2)
    expect(e.zenith).not.toBe(e.nadir)
    expect(e.bothEarths.counterRotates).toBe(true)
    expect(e.tips.every((t) => /^[0-9a-f-]{36}$/.test(t.seal))).toBe(true)
  })

  it('navigateTip circulates the square N→E→S→W→N (phase lock)', () => {
    expect(navigateTip('N').tip).toBe('E')
    expect(navigateTip('E').tip).toBe('S')
    expect(navigateTip('S').tip).toBe('W')
    expect(navigateTip('W').tip).toBe('N')
    expect(tipAtPhase(90).tip).toBe('E')
    expect(tipAtPhase(270).tip).toBe('W')
  })

  it('earthNavigate holds with merkaba bothEarths', () => {
    const n = earthNavigate('N')
    expect(n.holds).toBe(true)
    expect(n.next).toBe('E')
    expect(n.phaseDeg).toBe(0)
    expect(n.bothEarths.counterRotates).toBe(true)
  })

  it('tipGeodetic: cardinals on equator; zenith/nadir are poles (WGS 84 model)', () => {
    for (const tip of CARDINAL_TIPS) {
      const g = tipGeodetic(tip)
      expect(g.latitude).toBe(0)
      expect(g.longitude).not.toBeNull()
    }
    expect(atPole(tipGeodetic('zenith'))).toBe(true)
    expect(atPole(tipGeodetic('nadir'))).toBe(true)
  })
})
