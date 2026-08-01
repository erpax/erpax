import { describe, expect, it } from 'vitest'

import { maxTamperCost } from '@/analytics'

import { agreesWithOrgan, maxtampercost, ORGAN, weakestLink } from './index'

describe('vocabulary/maxtampercost — an alias computes its organ, or it is a fork', () => {
  it('THE OBLIGATION: the alias agrees with the organ on every input', () => {
    const inputs = [{}, { unsealedCrosses: 0 }, { impurities: 3 }, { unsealedCrosses: 7, impurities: 2 }]
    for (const w of inputs) {
      expect(agreesWithOrgan(w)).toBe(true)
      expect(maxtampercost(w)).toEqual(maxTamperCost(w))
    }
  })

  it('the organ is NAMED, so the pointer resolves instead of the prose claiming', () => {
    expect(ORGAN).toBe('analytics/max-tamper-cost')
  })

  it('the weakest link is a MINIMUM — a stronger dimension beside an open one changes nothing', () => {
    expect(weakestLink([256, 128, 64])).toBe(64)
    expect(weakestLink([256, 128, 64, 512])).toBe(64) // adding strength does not raise the floor
    expect(weakestLink([0, 256])).toBe(0) // one open link and the chain is open
  })

  it('no dimensions is no cost — an empty chain is not an unbreakable one', () => {
    expect(weakestLink([])).toBe(0)
  })
})
