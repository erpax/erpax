import { describe, it, expect } from 'vitest'
import { TaxPeriodReconciliation, TRANSFER_PRICING_DOC_TOLERANCE } from './index'

// The @invariants "tax periods align with fiscal periods" and "transfer pricing adjustments must be
// documented" were bare axioms (no proof beside them, rules/refutable). These are the proof legs.
describe('tax/period/reconciliation — the alignment + documentation invariants, proven not asserted', () => {
  it('tax↔fiscal alignment: same period-end date ⇒ aligned; a different date REFUTES it', () => {
    expect(TaxPeriodReconciliation.validateTaxFiscalAlignment('2026-12-31', '2026-12-31')).toBe(true)
    expect(TaxPeriodReconciliation.validateTaxFiscalAlignment('2026-12-31', '2026-11-30')).toBe(false) // refutable
  })

  it('transfer-pricing documentation: all four fields ⇒ documented; a missing field REFUTES it', () => {
    // the check reads exactly these four documentation fields (the completeness score)
    const complete = {
      transactionType: 'goods',
      methodUsed: 'CUP',
      adjustmentReason: 'arm’s-length correction per OECD TPG Ch. II',
      supportingDocumentation: '/docs/tp-2026.pdf',
    } as unknown as Parameters<typeof TaxPeriodReconciliation.validateTransferPricingDocumentation>[0]
    expect(TaxPeriodReconciliation.validateTransferPricingDocumentation(complete)).toBe(true) // 4/4 ≥ 0.9

    const missingDocs = { ...complete, supportingDocumentation: '' }
    expect(TaxPeriodReconciliation.validateTransferPricingDocumentation(missingDocs)).toBe(false) // 3/4 = 0.75 < tolerance
  })

  it('the tolerance is a real threshold, never all-or-nothing — 3 of 4 fields falls short of 9/10', () => {
    expect(TRANSFER_PRICING_DOC_TOLERANCE).toBeGreaterThan(0.75)
    expect(TRANSFER_PRICING_DOC_TOLERANCE).toBeLessThanOrEqual(1)
  })
})
