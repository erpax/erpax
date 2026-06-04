import { describe, it, expect } from 'vitest'
import {
  saturate,
  SATURATION_HALFTIMES,
  levelCeiling,
  gradientFactor,
  verifiedFraction,
  dynamicHarmonic,
  dynamicHourlyRate,
  decompressionDebt,
  isCleared,
  teamRedundancy,
  sharedDebt,
} from '@/decompression'
import { ANCHOR } from '@/allocation'
import { HORO_DIGITS } from '@/horo'

describe('decompression — pay off-gasses toward the M-value, one half-time at a time', () => {
  it('the off-gas curve 1−2⁻ⁿ: 0 at the start, half each step, ~98.44% by 6, never 100%', () => {
    expect(saturate(0)).toBe(0) // on-gas the claim; nothing verified yet
    expect(saturate(1)).toBe(0.5) // first half-time clears half the gap
    expect(saturate(2)).toBe(0.75)
    expect(saturate(SATURATION_HALFTIMES)).toBeCloseTo(0.984375, 6) // the practical surface
    expect(saturate(40)).toBeLessThan(1) // asymptotic — never reaches unity (the M-value)
    expect(saturate(5)).toBeGreaterThan(saturate(4)) // strictly monotone
  })

  it('the M-value ceiling per SFIA level IS the horo ring digit (the rodin doubling helix)', () => {
    expect(HORO_DIGITS.map((_, i) => levelCeiling(i + 1))).toEqual([...HORO_DIGITS]) // 1·2·4·8·7·5·9
    expect(levelCeiling(1)).toBe(1) // base — saves no one's time
    expect(levelCeiling(4)).toBe(8) // crest — peak individual leverage
    expect(levelCeiling(7)).toBe(9) // unity — the governing close
    expect(levelCeiling(0)).toBe(1) // clamps into the band
    expect(levelCeiling(99)).toBe(9)
  })

  it('earned harmonic climbs from the base (1) toward the M-value, never crossing it', () => {
    const M = 8
    expect(dynamicHarmonic(M, 0)).toBe(1) // base rate the instant you descend
    expect(dynamicHarmonic(M, 1)).toBe(1 + 0.5 * (M - 1)) // half the bonus after one half-time
    expect(dynamicHarmonic(M, 40)).toBeLessThan(M) // approaches the ceiling, never exceeds it
    expect(dynamicHarmonic(M, 40)).toBeGreaterThan(M - 0.01)
    // monotone in time
    expect(dynamicHarmonic(M, 3)).toBeGreaterThan(dynamicHarmonic(M, 2))
  })

  it('hourly pay = Schumann anchor × the saturating harmonic: base at descent, anchor×M at the surface', () => {
    const M = 4
    expect(dynamicHourlyRate(M, 0)).toBe(ANCHOR) // 7.83/hr at the start — only own labour confirmed
    expect(dynamicHourlyRate(M, 1)).toBe(ANCHOR * (1 + 0.5 * (M - 1)))
    expect(dynamicHourlyRate(M, 1000)).toBeCloseTo(ANCHOR * M, 6) // ceiling = anchor × M-value
  })

  it('the decompression debt is conserved: unpaid + earned = the whole bonus, and it off-gasses to zero', () => {
    const M = 8
    for (const n of [0, 1, 2, 6]) {
      const debt = decompressionDebt(M, n)
      const earnedBonus = ANCHOR * (dynamicHarmonic(M, n) - 1) // bonus above base
      expect(debt + earnedBonus).toBeCloseTo(ANCHOR * (M - 1), 9) // = the whole leverage bonus, always
    }
    expect(decompressionDebt(M, 0)).toBe(ANCHOR * (M - 1)) // full debt the instant you on-gas
    expect(decompressionDebt(M, 1000)).toBeCloseTo(0, 6) // fully off-gassed
  })

  it('a period may close only once the debt has off-gassed (≥6 half-times); surfacing early is the bends', () => {
    expect(isCleared(0)).toBe(false) // would surface with the full debt unpaid — DCS
    expect(isCleared(5)).toBe(false)
    expect(isCleared(SATURATION_HALFTIMES)).toBe(true) // cleared to the surface
    expect(isCleared(20)).toBe(true)
  })

  it('gradient factors band the ascent: a throttling gfLo banks less early; the default GF is no throttle', () => {
    // default GF (1,1) ⇒ verifiedFraction is exactly the saturation curve
    expect(verifiedFraction(2)).toBe(saturate(2))
    // a conservative first stop banks strictly less of the off-gassed fraction early
    const throttled = verifiedFraction(1, { gfLo: 0.3, gfHi: 1 })
    expect(throttled).toBeLessThan(saturate(1))
    // the band opens lo→hi as you off-gas: gf at the surface ≥ gf at the first stop
    expect(gradientFactor(1, { gfLo: 0.3, gfHi: 0.9 })).toBeGreaterThan(gradientFactor(0, { gfLo: 0.3, gfHi: 0.9 }))
    // a throttled ascent can never honestly clear (its surface fraction never reaches the threshold)
    expect(isCleared(1000, { gfLo: 0.3, gfHi: 0.9 })).toBe(false)
  })

  it('the {1,2,3} team basis shares the debt: a solo carries it whole, a buddy halves it, a trinity thirds it', () => {
    expect(teamRedundancy(1)).toBe(1) // cave — the diver is the whole team
    expect(teamRedundancy(2)).toBe(2) // recreational — the buddy pair
    expect(teamRedundancy(3)).toBe(3) // technical — the trinity
    expect(teamRedundancy(0)).toBe(1) // no team ⇒ carries alone (natural default)
    const debt = decompressionDebt(8, 0) // full debt
    expect(sharedDebt(debt, 1)).toBe(debt) // solo bears all of it
    expect(sharedDebt(debt, 2)).toBe(debt / 2) // shared both ways (give↔take)
    expect(sharedDebt(debt, 3)).toBeCloseTo(debt / 3, 9)
  })

  it('every fraction is anchor-free — only absolute pay scales with the chosen constant', () => {
    const M = 5
    // the climb shape is identical whether the anchor is Schumann (7.83) or A432 (432)
    expect(dynamicHourlyRate(M, 2, 432) / dynamicHourlyRate(M, 2, 7.83)).toBeCloseTo(432 / 7.83, 9)
    expect(dynamicHarmonic(M, 2)).toBe(1 + saturate(2) * (M - 1)) // harmonic depends only on the curve
  })
})
