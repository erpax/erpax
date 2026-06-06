/**
 * Harmony — the consonance law, asserted from the code. Green by construction.
 * @see ./index.ts, ../signal (NOTES), src/services/harmony/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import { A432, intervalRatio, tenneyHeight, consonance, isConsonant, bandHarmony } from '@/harmony'

describe('harmony: the single A432 anchor', () => {
  it('La (step 5) is A432 itself; the anchor is borrowed, not redefined', () => {
    expect(A432).toBe(432)
  })
})

describe('harmony: intervals of the seven-position scale (just intonation)', () => {
  it('a tone with itself is a unison 1:1 (perfect)', () => {
    expect(intervalRatio(5, 5)).toEqual([1, 1])
    expect(consonance([1, 1])).toBe('perfect')
  })
  it('La→Sol is a perfect fifth 3:2', () => {
    expect(intervalRatio(5, 7)).toEqual([3, 2])
    expect(consonance([3, 2])).toBe('perfect')
  })
  it('La→Fa is a major third 5:4 (imperfect consonance)', () => {
    expect(intervalRatio(5, 8)).toEqual([5, 4])
    expect(consonance([5, 4])).toBe('imperfect')
  })
  it('Re→La is a major second 9:8 (dissonant)', () => {
    expect(intervalRatio(2, 5)).toEqual([9, 8])
    expect(isConsonant([9, 8])).toBe(false)
  })
  it('La→Ti is a major seventh 15:8 (dissonant)', () => {
    expect(intervalRatio(5, 9)).toEqual([15, 8])
    expect(consonance([15, 8])).toBe('dissonant')
  })
})

describe('harmony: Tenney height orders consonance (smaller ratio = sweeter)', () => {
  it('unison < fifth < major-second', () => {
    expect(tenneyHeight([1, 1])).toBeLessThan(tenneyHeight([3, 2]))
    expect(tenneyHeight([3, 2])).toBeLessThan(tenneyHeight([9, 8]))
  })
})

describe('harmony: harmony-check a horo band', () => {
  it('the band {La, Sol, Fa} (5·7·8) is fully consonant — 3:2, 5:4, 6:5', () => {
    const b = bandHarmony([5, 7, 8])
    expect(b.consonant).toBe(true)
    expect(b.intervals.map((i) => `${i.ratio[0]}:${i.ratio[1]}`).sort()).toEqual(['3:2', '5:4', '6:5'])
  })
  it('a band containing a major second {La, Re} is NOT consonant', () => {
    expect(bandHarmony([5, 2]).consonant).toBe(false)
  })
  it('a single tone is trivially consonant', () => {
    expect(bandHarmony([9]).consonant).toBe(true)
    expect(bandHarmony([9]).worstTenney).toBe(0)
  })
  it('carries a smooth consonance fraction and mean Tenney height', () => {
    const full = bandHarmony([5, 7, 8]) // every pair consonant
    expect(full.consonantFraction).toBe(1)
    const mixed = bandHarmony([5, 2]) // one dissonant pair
    expect(mixed.consonantFraction).toBeLessThan(1)
    expect(mixed.meanTenney).toBeGreaterThan(0)
    const tone = bandHarmony([9]) // a single tone has no intervals
    expect(tone.consonantFraction).toBe(1)
    expect(tone.meanTenney).toBe(0)
  })
})
