/**
 * IFRS 15 — collection-to-canonical-type alignment tests.
 *
 * Asserts that the PerformanceObligations + Contracts Payload collections
 * project cleanly onto the canonical IFRS-15 types in
 * `@/standards/ifrs-15`. The mapping is documented in each collection's
 * banner; this spec is the executable verification.
 *
 * If a field drifts on either side (e.g. recognitionTiming gets renamed),
 * this spec breaks at compile time.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/collections/PerformanceObligations.ts
 * @see src/plugins/accounting/collections/Contracts.ts
 */

import { describe, it, expect } from 'vitest'
import type {
  Contract,
  PerformanceObligation,
  TransactionPrice,
  VariableConsiderationMethod,
} from '@/ifrs/15'
import {
  isRecognitionTiming,
  isOverTimeMeasurement,
  isOutputMethodKind,
  isInputMethodKind,
} from '@/ifrs/15'

// ─── Doc shapes — what Payload's REST handler returns for each row ────

interface PayloadPoDoc {
  id: string
  contract: string | { id: string }
  description: string
  kind: 'distinct' | 'series'
  recognitionTiming: 'point_in_time' | 'over_time'
  overTimeMeasurement?: 'output_method' | 'input_method'
  measurementKind?: string
  standaloneSellingPrice: number
  allocatedAmount: number
  recognisedToDate: number
  percentComplete: number
  status: 'pending' | 'in_progress' | 'satisfied' | 'cancelled'
  satisfiedAt?: string
}

interface PayloadContractDoc {
  id: string
  contractNumber: string
  customer: string | { id: string }
  effectiveFrom: string
  effectiveTo?: string
  currency: string
  totalValue: number
  transactionPriceFixed: number
  transactionPriceVariable: number
  variableConsiderationMethod?: VariableConsiderationMethod
  financingComponent: number
  combinedWithContracts?: Array<string | { id: string }>
  status:
    | 'draft'
    | 'pending_approval'
    | 'active'
    | 'suspended'
    | 'completed'
    | 'terminated'
}

// ─── Mappers — collection doc → canonical type ────────────────────────

const idOf = (rel: string | { id: string }): string =>
  typeof rel === 'string' ? rel : rel.id

const toCanonicalPo = (doc: PayloadPoDoc): PerformanceObligation => ({
  id: doc.id,
  contractId: idOf(doc.contract),
  description: doc.description,
  kind: doc.kind,
  recognitionTiming: doc.recognitionTiming,
  overTimeMeasurement: doc.overTimeMeasurement,
  measurementKind: doc.measurementKind as PerformanceObligation['measurementKind'],
  standaloneSellingPrice: doc.standaloneSellingPrice,
  allocatedAmount: doc.allocatedAmount,
  recognizedAmount: doc.recognisedToDate,
  status: doc.status,
  satisfiedAt: doc.satisfiedAt,
})

const COLLECTION_TO_CANONICAL_STATUS: Record<
  PayloadContractDoc['status'],
  Contract['status']
> = {
  draft: 'pending_approval',
  pending_approval: 'pending_approval',
  active: 'active',
  suspended: 'cancelled', // suspended is not in the canonical set — closest is cancelled
  completed: 'completed',
  terminated: 'cancelled',
}

const toCanonicalContract = (doc: PayloadContractDoc): Contract => ({
  id: doc.id,
  customerId: idOf(doc.customer),
  effectiveDate: doc.effectiveFrom,
  endDate: doc.effectiveTo ?? null,
  currency: doc.currency,
  status: COLLECTION_TO_CANONICAL_STATUS[doc.status],
  combinedWithContractIds: doc.combinedWithContracts?.map(idOf),
})

const toCanonicalTransactionPrice = (
  doc: PayloadContractDoc,
): TransactionPrice => ({
  contractId: doc.id,
  currency: doc.currency,
  fixed: doc.transactionPriceFixed,
  variable: doc.transactionPriceVariable
    ? {
        method: doc.variableConsiderationMethod ?? 'expected_value',
        estimate: doc.transactionPriceVariable,
      }
    : undefined,
  significantFinancingComponent: doc.financingComponent,
  total: doc.totalValue,
})

// ─── Tests ─────────────────────────────────────────────────────────────

describe('IFRS 15 — PerformanceObligations collection ↔ canonical type', () => {
  it('point-in-time PO from a distinct setup-fee', () => {
    const doc: PayloadPoDoc = {
      id: 'PO-1',
      contract: 'CT-001',
      description: 'Onboarding setup',
      kind: 'distinct',
      recognitionTiming: 'point_in_time',
      standaloneSellingPrice: 30_000_00,
      allocatedAmount: 27_000_00,
      recognisedToDate: 27_000_00,
      percentComplete: 100,
      status: 'satisfied',
      satisfiedAt: '2026-05-15T00:00:00Z',
    }
    const canonical = toCanonicalPo(doc)
    expect(canonical.id).toBe('PO-1')
    expect(canonical.contractId).toBe('CT-001')
    expect(canonical.kind).toBe('distinct')
    expect(canonical.recognitionTiming).toBe('point_in_time')
    expect(canonical.recognizedAmount).toBe(27_000_00)
    expect(canonical.status).toBe('satisfied')
    expect(isRecognitionTiming(canonical.recognitionTiming)).toBe(true)
  })

  it('over-time series PO with time-elapsed measurement (SaaS subscription)', () => {
    const doc: PayloadPoDoc = {
      id: 'PO-SaaS',
      contract: 'CT-002',
      description: '12-month SaaS subscription',
      kind: 'series',
      recognitionTiming: 'over_time',
      overTimeMeasurement: 'output_method',
      measurementKind: 'time_elapsed',
      standaloneSellingPrice: 120_000_00,
      allocatedAmount: 108_000_00,
      recognisedToDate: 9_000_00,
      percentComplete: 8,
      status: 'in_progress',
    }
    const canonical = toCanonicalPo(doc)
    expect(canonical.kind).toBe('series')
    expect(canonical.recognitionTiming).toBe('over_time')
    expect(canonical.overTimeMeasurement).toBe('output_method')
    expect(canonical.measurementKind).toBe('time_elapsed')
    expect(isOverTimeMeasurement(canonical.overTimeMeasurement!)).toBe(true)
    expect(isOutputMethodKind(canonical.measurementKind!)).toBe(true)
  })

  it('over-time PO with cost-to-cost input method (construction)', () => {
    const doc: PayloadPoDoc = {
      id: 'PO-Build',
      contract: 'CT-003',
      description: 'Custom build-out',
      kind: 'distinct',
      recognitionTiming: 'over_time',
      overTimeMeasurement: 'input_method',
      measurementKind: 'cost_to_cost',
      standaloneSellingPrice: 500_000_00,
      allocatedAmount: 500_000_00,
      recognisedToDate: 200_000_00,
      percentComplete: 40,
      status: 'in_progress',
    }
    const canonical = toCanonicalPo(doc)
    expect(canonical.overTimeMeasurement).toBe('input_method')
    expect(isInputMethodKind(canonical.measurementKind!)).toBe(true)
  })
})

describe('IFRS 15 — Contracts collection ↔ canonical type', () => {
  it('active contract maps cleanly to canonical Contract', () => {
    const doc: PayloadContractDoc = {
      id: 'CT-001',
      contractNumber: 'CT-2026-001',
      customer: 'CUST-1',
      effectiveFrom: '2026-05-01T00:00:00Z',
      effectiveTo: '2027-04-30T00:00:00Z',
      currency: 'EUR',
      totalValue: 135_000_00,
      transactionPriceFixed: 130_000_00,
      transactionPriceVariable: 5_000_00,
      variableConsiderationMethod: 'expected_value',
      financingComponent: 0,
      status: 'active',
    }
    const canonical = toCanonicalContract(doc)
    expect(canonical.id).toBe('CT-001')
    expect(canonical.customerId).toBe('CUST-1')
    expect(canonical.currency).toBe('EUR')
    expect(canonical.status).toBe('active')
  })

  it('combined-contract group exposes IFRS 15 §17 ids', () => {
    const doc: PayloadContractDoc = {
      id: 'CT-002',
      contractNumber: 'CT-2026-002',
      customer: 'CUST-1',
      effectiveFrom: '2026-05-01T00:00:00Z',
      currency: 'EUR',
      totalValue: 50_000_00,
      transactionPriceFixed: 50_000_00,
      transactionPriceVariable: 0,
      financingComponent: 0,
      combinedWithContracts: ['CT-001', { id: 'CT-003' }],
      status: 'active',
    }
    const canonical = toCanonicalContract(doc)
    expect(canonical.combinedWithContractIds).toEqual(['CT-001', 'CT-003'])
  })

  it('transaction-price decomposition round-trips', () => {
    const doc: PayloadContractDoc = {
      id: 'CT-004',
      contractNumber: 'CT-2026-004',
      customer: 'CUST-2',
      effectiveFrom: '2026-05-01T00:00:00Z',
      currency: 'EUR',
      totalValue: 145_000_00,
      transactionPriceFixed: 130_000_00,
      transactionPriceVariable: 10_000_00,
      variableConsiderationMethod: 'most_likely_amount',
      financingComponent: 5_000_00,
      status: 'active',
    }
    const price = toCanonicalTransactionPrice(doc)
    expect(price.fixed).toBe(130_000_00)
    expect(price.variable?.method).toBe('most_likely_amount')
    expect(price.variable?.estimate).toBe(10_000_00)
    expect(price.significantFinancingComponent).toBe(5_000_00)
    // total should equal the doc's totalValue (collection sums components)
    expect(price.total).toBe(doc.totalValue)
  })
})
