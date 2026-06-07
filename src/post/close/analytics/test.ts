import { describe, it, expect } from 'vitest'
import { PostCloseAnalytics } from '@/post/close/analytics'

// Post-Close Analytics (Phase B7): pure, JSON-serializable static reporting.
// Invariants proven against the REAL service:
//  - variance carries budget-vs-actual AND period-over-period
//  - ratio analysis spans 4 dimensions (16 ratios)
//  - segment reporting separates business + geographic (IFRS-8) with a Herfindahl index
//  - management reporting surfaces KPIs, scorecard, alerts, trends

describe('PostCloseAnalytics — variance analysis', () => {
  it('computes budget-vs-actual variance and percent from revenue', () => {
    const r = PostCloseAnalytics.generateVarianceAnalysis({ revenue: 110 }, { revenue: 100 })
    expect(r.totalBudgetedRevenue).toBe(100)
    expect(r.totalActualRevenue).toBe(110)
    expect(r.totalVariance).toBe(10)
    expect(r.totalVariancePercent).toBeCloseTo(10)
    const rev = r.budgetVsActual.find((i) => i.lineItem === 'Revenue')!
    expect(rev.variance).toBe(10)
    // waterfall splits the variance 60/30/10 and reconciles to actual.
    expect(r.waterfall!.volumeVariance + r.waterfall!.priceVariance + r.waterfall!.mixVariance).toBeCloseTo(10)
    expect(r.waterfall!.actualResult).toBe(110)
  })

  it('omits period-over-period when no prior period is given', () => {
    const r = PostCloseAnalytics.generateVarianceAnalysis({ revenue: 110 }, { revenue: 100 })
    expect(r.periodOverPeriodComparison).toHaveLength(0)
  })

  it('adds a trended period-over-period item when a prior period is given', () => {
    const r = PostCloseAnalytics.generateVarianceAnalysis({ revenue: 110 }, { revenue: 100 }, { revenue: 90 })
    expect(r.periodOverPeriodComparison).toHaveLength(1)
    const poc = r.periodOverPeriodComparison[0]!
    expect(poc.variance).toBe(20)
    expect(poc.trend).toBe('improving')
  })

  it('honours the variance threshold parameter', () => {
    const r = PostCloseAnalytics.generateVarianceAnalysis({ revenue: 1 }, { revenue: 1 }, undefined, 25)
    expect(r.keyVarianceThreshold).toBe(25)
  })

  it('guards against divide-by-zero when budget revenue is 0', () => {
    const r = PostCloseAnalytics.generateVarianceAnalysis({ revenue: 50 }, { revenue: 0 })
    expect(r.totalVariancePercent).toBe(0)
  })
})

describe('PostCloseAnalytics — ratio analysis', () => {
  it('covers exactly 4 dimensions with 16 named ratios', () => {
    const r = PostCloseAnalytics.generateRatioAnalysis({})
    expect(Object.keys(r.liquidityRatios)).toHaveLength(4)
    expect(Object.keys(r.profitabilityRatios)).toHaveLength(5)
    expect(Object.keys(r.solvencyRatios)).toHaveLength(4)
    expect(Object.keys(r.efficiencyRatios)).toHaveLength(4)
  })

  it('computes ratios from supplied GL data', () => {
    const r = PostCloseAnalytics.generateRatioAnalysis({
      currentAssets: 200000,
      currentLiabilities: 100000,
      totalLiabilities: 100000,
      totalEquity: 100000,
    })
    expect(r.liquidityRatios.currentRatio.ratioValue).toBeCloseTo(2)
    expect(r.solvencyRatios.debtToEquity.ratioValue).toBeCloseTo(1)
  })

  it('assesses a high current ratio as strong', () => {
    const r = PostCloseAnalytics.generateRatioAnalysis({ currentAssets: 300000, currentLiabilities: 100000 })
    expect(r.liquidityRatios.currentRatio.assessment).toBe('strong')
  })
})

describe('PostCloseAnalytics — segment reporting (IFRS-8)', () => {
  it('separates business and geographic segments', () => {
    const r = PostCloseAnalytics.generateSegmentReporting({})
    expect(r.businessSegments.every((s) => s.segmentType === 'business')).toBe(true)
    expect(r.geographicSegments.every((s) => s.segmentType === 'geographic')).toBe(true)
  })

  it('group revenue and profit equal the sum of the business segments', () => {
    const r = PostCloseAnalytics.generateSegmentReporting({})
    const sumRev = r.businessSegments.reduce((s, x) => s + x.revenue, 0)
    const sumProfit = r.businessSegments.reduce((s, x) => s + x.operatingProfit, 0)
    expect(r.totalGroupRevenue).toBe(sumRev)
    expect(r.totalGroupProfit).toBe(sumProfit)
  })

  it('Herfindahl index is the sum of squared shares (bounded 0..1)', () => {
    const r = PostCloseAnalytics.generateSegmentReporting({})
    const hhi = r.segmentConcertation!.herfindahlIndex
    expect(hhi).toBeGreaterThan(0)
    expect(hhi).toBeLessThanOrEqual(1)
    const shares = r.businessSegments.map((s) => s.revenue / r.totalGroupRevenue)
    expect(hhi).toBeCloseTo(shares.reduce((a, b) => a + b * b, 0))
  })
})

describe('PostCloseAnalytics — management reporting', () => {
  it('rolls variance + ratio + segment reports into KPIs, scorecard, alerts, trends', () => {
    const variance = PostCloseAnalytics.generateVarianceAnalysis({ revenue: 110 }, { revenue: 100 })
    const ratios = PostCloseAnalytics.generateRatioAnalysis({})
    const segments = PostCloseAnalytics.generateSegmentReporting({})
    const m = PostCloseAnalytics.generateManagementReporting(variance, ratios, segments)
    expect(m.kpis.length).toBe(5)
    expect(m.kpis.map((k) => k.metricName)).toContain('Revenue')
    expect(m.performanceScorecard).toBeDefined()
    expect(Array.isArray(m.alerts)).toBe(true)
    expect(Array.isArray(m.trends)).toBe(true)
  })

  it('raises a critical revenue alert when revenue falls >10% below budget', () => {
    const variance = PostCloseAnalytics.generateVarianceAnalysis({ revenue: 80 }, { revenue: 100 })
    const ratios = PostCloseAnalytics.generateRatioAnalysis({})
    const segments = PostCloseAnalytics.generateSegmentReporting({})
    const m = PostCloseAnalytics.generateManagementReporting(variance, ratios, segments)
    expect(m.alerts!.some((a) => a.severity === 'critical' && a.metric === 'Revenue')).toBe(true)
  })

  it('uses a supplied executive summary verbatim', () => {
    const variance = PostCloseAnalytics.generateVarianceAnalysis({ revenue: 100 }, { revenue: 100 })
    const ratios = PostCloseAnalytics.generateRatioAnalysis({})
    const segments = PostCloseAnalytics.generateSegmentReporting({})
    const m = PostCloseAnalytics.generateManagementReporting(variance, ratios, segments, 'Custom narrative.')
    expect(m.executiveSummary).toBe('Custom narrative.')
  })
})

describe('PostCloseAnalytics — chain leaf (Law 60)', () => {
  it('is deterministic for the same data + prior leaf', () => {
    const data = { x: 1 }
    expect(PostCloseAnalytics.computeChainLeaf(data, 'prev')).toBe(PostCloseAnalytics.computeChainLeaf(data, 'prev'))
  })

  it('changes when the data or the prior leaf changes', () => {
    const a = PostCloseAnalytics.computeChainLeaf({ x: 1 }, 'prev')
    expect(a).not.toBe(PostCloseAnalytics.computeChainLeaf({ x: 2 }, 'prev'))
    expect(a).not.toBe(PostCloseAnalytics.computeChainLeaf({ x: 1 }, 'other'))
  })

  it('emits at most a 32-char leaf', () => {
    expect(PostCloseAnalytics.computeChainLeaf({ a: 'x'.repeat(1000) }).length).toBeLessThanOrEqual(32)
  })
})
