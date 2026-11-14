import { describe, it, expect } from 'vitest'
import { FinancialAnalysisEngine } from '@/utilities/accounting/analysis'

describe('accounting/analysis — ratio engine face', () => {
  it('FinancialAnalysisEngine exposes calculateFinancialRatios', () => {
    const engine = new FinancialAnalysisEngine()
    expect(typeof engine.calculateFinancialRatios).toBe('function')
  })
})
