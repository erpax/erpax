import { describe, it, expect } from 'vitest'
import { FinancialAnalysisEngine } from '@/accounting'

// The accounting atom's pure, deterministic face is the FinancialAnalysisEngine —
// ratios/working-capital/variance derived FROM the model (the accounting equation
// assets = liabilities + equity), never from baked literals. The report generators
// re-exported alongside it require a live Payload instance; the engine is the
// independently-testable proof cross.
const data = {
  asOfDate: '2026-06-07',
  assets: 1000,
  currentAssets: 600,
  inventory: 200,
  receivables: 150,
  liabilities: 400,
  currentLiabilities: 300,
  payables: 100,
  equity: 600, // assets - liabilities ⇒ the accounting equation holds
  retainedEarnings: 100,
  revenue: 1000,
  cogs: 400,
  grossProfit: 600,
  operatingExpenses: 200,
  operatingIncome: 400,
  netIncome: 300,
  cash: 120,
  depreciation: 50,
  interestExpense: 40,
}

describe('accounting — FinancialAnalysisEngine: ratios derived from the model', () => {
  const engine = new FinancialAnalysisEngine()

  it('liquidity ratios are the literal current-assets / current-liabilities quotients', () => {
    const r = engine.calculateFinancialRatios(data)
    expect(r.liquidity.currentRatio).toBeCloseTo(600 / 300) // = 2
    // quick ratio strips inventory: (600 - 200) / 300
    expect(r.liquidity.quickRatio).toBeCloseTo(400 / 300)
    expect(r.liquidity.cashRatio).toBeCloseTo(120 / 300)
    // quick ≤ current always (inventory is non-negative)
    expect(r.liquidity.quickRatio).toBeLessThanOrEqual(r.liquidity.currentRatio)
  })

  it('profitability margins are percentages of revenue (gross ≥ operating ≥ net here)', () => {
    const r = engine.calculateFinancialRatios(data)
    expect(r.profitability.grossProfitMargin).toBeCloseTo(60) // 600/1000 = 60%
    expect(r.profitability.operatingMargin).toBeCloseTo(40)
    expect(r.profitability.netProfitMargin).toBeCloseTo(30)
    expect(r.profitability.grossProfitMargin).toBeGreaterThanOrEqual(r.profitability.netProfitMargin)
  })

  it('solvency: debt-to-equity + equity-ratio reconcile to the accounting equation', () => {
    const r = engine.calculateFinancialRatios(data)
    expect(r.solvency.debtToEquity).toBeCloseTo(400 / 600)
    expect(r.solvency.debtToAssets).toBeCloseTo(400 / 1000)
    expect(r.solvency.equityRatio).toBeCloseTo(600 / 1000)
    // debt-to-assets + equity-ratio = 1 because liabilities + equity = assets
    expect(r.solvency.debtToAssets + r.solvency.equityRatio).toBeCloseTo(1)
  })

  it('safeDiv guards division by zero (no Infinity/NaN leaks)', () => {
    const r = engine.calculateFinancialRatios({ ...data, currentLiabilities: 0, revenue: 0 })
    expect(r.liquidity.currentRatio).toBe(0)
    expect(r.profitability.netProfitMargin).toBe(0)
    expect(Number.isFinite(r.liquidity.currentRatio)).toBe(true)
  })

  it('working capital = current assets − current liabilities', () => {
    expect(engine.calculateWorkingCapital(600, 300)).toBe(300)
  })

  it('cash conversion cycle = DIO + DRO − DPO', () => {
    expect(engine.calculateCashConversionCycle(30, 45, 20)).toBe(55)
  })

  it('budget variance: actual − budget, classified on-target within ±5%', () => {
    const over = engine.analyzeBudgetVariance(100, 150)
    expect(over.variance).toBe(50)
    expect(over.status).toBe('over')

    const onTarget = engine.analyzeBudgetVariance(100, 103)
    expect(onTarget.status).toBe('on-target')

    const under = engine.analyzeBudgetVariance(100, 50)
    expect(under.variance).toBe(-50)
    expect(under.status).toBe('under')
  })

  it('segment revenue percentages sum to 100', () => {
    const segs = engine.analyzeSegments([
      { segment: 'A', revenue: 300, revenuePercent: 0, cogs: 0, grossProfit: 0, grossProfitMargin: 0, operatingExpenses: 0, operatingIncome: 0, operatingMargin: 0 },
      { segment: 'B', revenue: 700, revenuePercent: 0, cogs: 0, grossProfit: 0, grossProfitMargin: 0, operatingExpenses: 0, operatingIncome: 0, operatingMargin: 0 },
    ])
    expect(segs.reduce((s, x) => s + x.revenuePercent, 0)).toBeCloseTo(100)
  })
})
