import { describe, it, expect } from 'vitest'
import { TaxPeriodReconciliation } from '@/tax/period/integration'

// Phase B5 — tax period integration. The barrel re-exports the
// TaxPeriodReconciliation static service; these assert its pure invariants:
// tax/fiscal alignment, OECD-documented transfer pricing, and the Law 60 leaf.

const adj = () =>
  TaxPeriodReconciliation.computeTransferPricingAdjustment(
    'EntityA',
    'EntityB',
    'DE',
    'services',
    100,
    120,
    'comparable-uncontrolled',
    'Arm-length adjustment to OECD median',
    's3://docs/tp-2026.pdf',
  )

describe('tax/period/integration — TaxPeriodReconciliation invariants', () => {
  it('tax periods must end on the same date as fiscal periods', () => {
    expect(TaxPeriodReconciliation.validateTaxFiscalAlignment('2026-12-31', '2026-12-31')).toBe(true)
    expect(TaxPeriodReconciliation.validateTaxFiscalAlignment('2026-12-30', '2026-12-31')).toBe(false)
  })

  it('a fully-documented transfer pricing adjustment passes the 90% tolerance', () => {
    expect(TaxPeriodReconciliation.validateTransferPricingDocumentation(adj())).toBe(true)
  })

  it('missing method/reason/docs drops below tolerance', () => {
    const bare = TaxPeriodReconciliation.computeTransferPricingAdjustment(
      'A', 'B', 'DE', 'services', 100, 120,
      'cost-plus',
      'short', // <= 10 chars → no reason credit
      '', // no supporting docs
    )
    expect(TaxPeriodReconciliation.validateTransferPricingDocumentation(bare)).toBe(false)
  })

  it('computeTransferPricingAdjustment carries through its inputs + ISO date', () => {
    const a = adj()
    expect(a.fromEntity).toBe('EntityA')
    expect(a.originalAmount).toBe(100)
    expect(a.adjustedAmount).toBe(120)
    expect(a.methodUsed).toBe('comparable-uncontrolled')
    expect(a.adjustmentDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('immaterial adjustments produce no journal entries', () => {
    const noop = TaxPeriodReconciliation.computeTransferPricingAdjustment(
      'A', 'B', 'DE', 'services', 100, 100, // zero difference
      'cost-plus', 'documented reason here', 's3://x',
    )
    expect(TaxPeriodReconciliation.prepareTaxAdjustmentEntries([noop], '2026-12-31')).toHaveLength(0)
  })

  it('a positive difference yields an expense entry plus a tax-payable offset', () => {
    const entries = TaxPeriodReconciliation.prepareTaxAdjustmentEntries([adj()], '2026-12-31')
    expect(entries).toHaveLength(2)
    expect(entries[0]!.adjustmentAmount).toBe(20) // |120-100|
    expect(entries[0]!.accountType).toBe('expense')
    expect(entries[1]!.adjustmentAmount).toBe(20) // offset, difference > 0
    expect(entries[0]!.sequenceNumber).toBe(1)
    expect(entries[1]!.sequenceNumber).toBe(2)
  })

  it('assessTaxPeriodReadiness is green when aligned + documented + compliant', () => {
    const r = TaxPeriodReconciliation.assessTaxPeriodReadiness(
      { DE: '2026-12-31', BG: '2026-12-31' },
      '2026-12-31',
      [adj()],
      [
        { jurisdiction: 'DE', taxStatus: 'compliant', filingDeadline: '2027-03-31' },
        { jurisdiction: 'BG', taxStatus: 'compliant', filingDeadline: '2027-03-31' },
      ],
    )
    expect(r.taxPeriodsAlignedWithFiscal).toBe(true)
    expect(r.allTransferPricingDocumented).toBe(true)
    expect(r.taxAuthorityCompliance).toBe(true)
    expect(r.complianceErrors).toHaveLength(0)
    expect(r.documentationCount).toBe(1)
    expect(r.chainLeafUuid).toHaveLength(32)
  })

  it('assessTaxPeriodReadiness reports misalignment and non-compliance as errors', () => {
    const r = TaxPeriodReconciliation.assessTaxPeriodReadiness(
      { DE: '2026-12-30' },
      '2026-12-31',
      [],
      [{ jurisdiction: 'DE', taxStatus: 'pending', filingDeadline: '2027-03-31' }],
    )
    expect(r.taxPeriodsAlignedWithFiscal).toBe(false)
    expect(r.taxAuthorityCompliance).toBe(false)
    expect(r.complianceErrors.length).toBeGreaterThanOrEqual(2)
    expect(r.jurisdictionStatuses[0]!.complianceStatus).toBe('non-compliant')
  })

  it('computeChainLeaf is deterministic and prior-leaf-linked (Law 60)', () => {
    const data = { a: 1, b: 'x' }
    const leaf = TaxPeriodReconciliation.computeChainLeaf(data)
    expect(leaf).toBe(TaxPeriodReconciliation.computeChainLeaf(data))
    expect(leaf.length).toBeGreaterThan(0)
    expect(leaf.length).toBeLessThanOrEqual(32) // base64 of JSON, capped at 32
    expect(TaxPeriodReconciliation.computeChainLeaf(data, 'prior')).not.toBe(leaf)
  })
})
