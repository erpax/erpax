import { describe, it, expect } from 'vitest'
import { consultCost, consultProfit, roi, infiniteProfitAtNoCost } from '@/quantum/consulting'
import type { ResearchRun } from '@/quantum/research'

const sunk: ResearchRun = { agent: 'a', agents: 5, tokens: 1000, entropyReduced: 8000 }

describe('quantum/consulting — infinite profit at no cost', () => {
  it('a cache HIT costs 0 to serve; a MISS costs a full research run', () => {
    expect(consultCost(true)).toBe(0)
    expect(consultCost(false, sunk)).toBe(5000)
  })
  it('profit is value × reuses (non-rivalrous reuse)', () => {
    expect(consultProfit(100, 7)).toBe(700)
  })
  it('any profit at zero cost is infinite ROI (the cache-hit limit)', () => {
    expect(roi(100, 0)).toBe(Number.POSITIVE_INFINITY)
    expect(roi(0, 0)).toBe(0)
    expect(roi(100, 50)).toBe(2)
  })
  it('the headline: cache hit cost 0 + ROI ∞, and ROI climbs with reuse toward ∞', () => {
    const c = infiniteProfitAtNoCost(100, sunk)
    expect(c.cacheHitCost).toBe(0)
    expect(c.cacheHitRoi).toBe(Number.POSITIVE_INFINITY)
    expect(c.roiAfterResearch(1e6)).toBeGreaterThan(c.roiAfterResearch(10))
    expect(c.limit).toBe(Number.POSITIVE_INFINITY)
  })
})
