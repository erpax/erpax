import { describe, expect, it } from 'vitest'
import {
  EXPOSURE_LIMIT_SHARE,
  LARGE_EXPOSURE_SHARE,
  aggregate,
  breachesLimit,
  concentration,
  counterparty,
  exposureRatio,
  isLargeExposure,
  type Exposure,
} from '@/risk'

const TIER1 = 100_000_000

describe('risk — the thresholds are the regulation’s, and the edges are exact', () => {
  it('is a large exposure AT the share, not only above it', () => {
    expect(isLargeExposure(TIER1 * LARGE_EXPOSURE_SHARE, TIER1)).toBe(true)
    expect(isLargeExposure(TIER1 * LARGE_EXPOSURE_SHARE - 1, TIER1)).toBe(false)
  })

  it('breaches the limit only ABOVE it — the limit itself is permitted', () => {
    expect(breachesLimit(TIER1 * EXPOSURE_LIMIT_SHARE, TIER1)).toBe(false)
    expect(breachesLimit(TIER1 * EXPOSURE_LIMIT_SHARE + 1, TIER1)).toBe(true)
  })

  it('treats absent capital as infinite exposure, never as NaN', () => {
    expect(exposureRatio(1, 0)).toBe(Number.POSITIVE_INFINITY)
    expect(breachesLimit(1, 0)).toBe(true)
    expect(breachesLimit(1, -5)).toBe(true)
  })
})

describe('risk — connected clients are grouped BEFORE the test, which is the whole point', () => {
  it('aggregates a group split across names', () => {
    const split: Exposure[] = [
      { client: 'alpha-trading', group: 'alpha', amount: 12_000_000 },
      { client: 'alpha-leasing', group: 'alpha', amount: 9_000_000 },
      { client: 'alpha-holdings', group: 'alpha', amount: 8_000_000 },
    ]
    // Ungrouped, every name sits under the 25% limit. Grouped, the exposure is 29%.
    for (const e of split) expect(breachesLimit(e.amount, TIER1)).toBe(false)
    expect(aggregate(split).get('alpha')).toBe(29_000_000)
    expect(breachesLimit(29_000_000, TIER1)).toBe(true)
  })

  it('aggregates a standalone client under its own name', () => {
    expect(counterparty({ client: 'beta', amount: 1 })).toBe('beta')
    expect(counterparty({ client: 'alpha-trading', group: 'alpha', amount: 1 })).toBe('alpha')
  })

  it('reports the split group as ONE breach, not three clean names', () => {
    const split: Exposure[] = [
      { client: 'alpha-trading', group: 'alpha', amount: 12_000_000 },
      { client: 'alpha-leasing', group: 'alpha', amount: 9_000_000 },
      { client: 'alpha-holdings', group: 'alpha', amount: 8_000_000 },
    ]
    const r = concentration(split, TIER1)
    expect(r.parties.length).toBe(1)
    expect(r.breaches.map((p) => p.counterparty)).toEqual(['alpha'])
  })
})

describe('risk — large and breach are different obligations and are reported separately', () => {
  const book: Exposure[] = [
    { client: 'alpha-trading', group: 'alpha', amount: 12_000_000 },
    { client: 'alpha-leasing', group: 'alpha', amount: 9_000_000 },
    { client: 'alpha-holdings', group: 'alpha', amount: 8_000_000 },
    { client: 'beta', amount: 15_000_000 },
    { client: 'gamma', amount: 4_000_000 },
  ]

  it('reports a large exposure that is not a breach', () => {
    const r = concentration(book, TIER1)
    const beta = r.parties.find((p) => p.counterparty === 'beta')
    expect(beta?.large).toBe(true)
    expect(beta?.breach).toBe(false)
  })

  it('leaves a small exposure out of both lists', () => {
    const r = concentration(book, TIER1)
    const gamma = r.parties.find((p) => p.counterparty === 'gamma')
    expect(gamma?.large).toBe(false)
    expect(gamma?.breach).toBe(false)
    expect(r.large.map((p) => p.counterparty)).not.toContain('gamma')
  })

  it('totals the LARGE exposures only — the Art. 394 reporting figure', () => {
    const r = concentration(book, TIER1)
    expect(r.largeTotal).toBe(29_000_000 + 15_000_000)
  })

  it('orders counterparties largest first, so the register reads top-down', () => {
    const r = concentration(book, TIER1)
    expect(r.parties.map((p) => p.counterparty)).toEqual(['alpha', 'beta', 'gamma'])
  })

  it('every breach is also a large exposure — the thresholds nest', () => {
    const r = concentration(book, TIER1)
    for (const b of r.breaches) expect(b.large).toBe(true)
  })
})
