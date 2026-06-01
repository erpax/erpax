import { describe, it, expect } from 'vitest'
import { ANCHOR, harmonic, hourlyRate, reward, competencyWeight, apportion, distribute } from './index'

describe('allocation — who gets what, for what, as harmonic math', () => {
  it('those who save no one else’s time earn exactly the base rate (the fundamental)', () => {
    const base = { ownTime: 8 } // 8h own labour, saves nobody, no leverage
    expect(harmonic(base)).toBe(1) // the fundamental
    expect(hourlyRate(base)).toBe(ANCHOR) // base hourly rate
    expect(reward(base)).toBe(ANCHOR * 8)
  })

  it('verified leverage earns a strictly better hourly rate, monotone in time saved', () => {
    const own = { ownTime: 1 }
    const saves10 = { ownTime: 1, timeSavedForOthers: 10, verified: 1 }
    const saves100 = { ownTime: 1, timeSavedForOthers: 100, verified: 1 }
    expect(hourlyRate(own)).toBe(ANCHOR)
    expect(harmonic(saves10)).toBe(11) // 1 own + 10 saved per own-hour ⇒ 11th harmonic
    expect(harmonic(saves100)).toBe(101)
    expect(hourlyRate(saves100)).toBeGreaterThan(hourlyRate(saves10))
    expect(hourlyRate(saves10)).toBeGreaterThan(hourlyRate(own)) // raising vibration raises pay
  })

  it('the competition gates phantom leverage: unverified savings pay base only', () => {
    const claimed = { ownTime: 2, timeSavedForOthers: 1000 } // verified defaults to 0
    expect(reward(claimed)).toBe(ANCHOR * 2) // only the observed labour is paid
    expect(harmonic(claimed)).toBe(1) // no confirmed leverage ⇒ fundamental
    const half = { ownTime: 2, timeSavedForOthers: 1000, verified: 0.5 }
    expect(reward(half)).toBe(ANCHOR * (2 + 0.5 * 1000)) // partial confirmation ⇒ partial bonus
  })

  it('every property is invariant to the anchor — only absolute amounts scale', () => {
    const a = { ownTime: 1, timeSavedForOthers: 4, verified: 1 }
    const b = { ownTime: 1 }
    // the hourly-rate ratio is anchor-free (harmonics, not the unit)
    expect(hourlyRate(a, 432) / hourlyRate(b, 432)).toBe(hourlyRate(a, 7.83) / hourlyRate(b, 7.83))
    expect(harmonic(a)).toBe(5)
  })

  it('reward conserves societal time exactly: pay = anchor × (own + verified·saved)', () => {
    const w = { ownTime: 3, timeSavedForOthers: 6, verified: 1 }
    expect(reward(w)).toBe(ANCHOR * 9) // 3 own + 6 saved = 9 societal hours accounted
    expect(reward(w)).toBe(hourlyRate(w) * 3) // hourlyRate × ownTime
  })

  it('distribute a fixed pot, conserved exactly, proportional to verified time', () => {
    const pot = 1000
    const shares = distribute(pot, [
      { ownTime: 1, timeSavedForOthers: 9, verified: 1 }, // 10
      { ownTime: 5 }, //  5
      { ownTime: 5 }, //  5
    ])
    expect(shares.reduce((s, x) => s + x, 0)).toBe(pot) // value neither created nor destroyed
    expect(shares[0]).toBe(500) // 10/20 of the pot
    expect(shares[1]).toBe(250)
    expect(shares[2]).toBe(250)
  })

  it('the symmetric 6-around-1 case: equal contributors split into the hexagonal (flower-of-life) shares', () => {
    const six = Array.from({ length: 6 }, () => ({ ownTime: 1 }))
    const shares = distribute(600, six)
    expect(shares).toEqual([100, 100, 100, 100, 100, 100])
    // with an indivisible remainder, fairness is preserved to ±1 and still conserves
    const tight = distribute(601, six)
    expect(tight.reduce((s, x) => s + x, 0)).toBe(601)
    expect(Math.max(...tight) - Math.min(...tight)).toBeLessThanOrEqual(1)
  })

  it('natural defaults exist for everything: empty work, all-unverified pot, missing competency', () => {
    expect(reward({})).toBe(0) // no time ⇒ no pay, still defined
    expect(competencyWeight(undefined)).toBe(1) // missing level ⇒ multiplicative identity
    expect(competencyWeight(7)).toBe(7)
    // every contribution unverified-and-empty ⇒ symmetric equal split, still conserving
    const split = distribute(100, [{}, {}, {}, {}])
    expect(split).toEqual([25, 25, 25, 25])
    expect(apportion(10, [0, 0])).toEqual([5, 5])
  })
})
