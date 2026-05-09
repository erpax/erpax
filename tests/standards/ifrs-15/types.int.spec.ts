/**
 * IFRS 15 / ASC 606 — canonical revenue-recognition types tests.
 *
 * Exercises the runtime guards and asserts the five-step model maps
 * correctly: contract → distinct performance obligations → transaction
 * price → relative-SSP allocation → recognition events.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail
 */

import { describe, it, expect } from 'vitest'
import {
  isRecognitionTiming,
  isOverTimeMeasurement,
  isOutputMethodKind,
  isInputMethodKind,
  isVariableConsiderationMethod,
  type Contract,
  type PerformanceObligation,
  type TransactionPrice,
  type Allocation,
  type RevenueRecognition,
  type ContractAsset,
  type ContractLiability,
  type RefundLiability,
} from '@/standards/ifrs-15'

describe('IFRS 15 — runtime guards', () => {
  it('isRecognitionTiming accepts point_in_time / over_time only', () => {
    expect(isRecognitionTiming('point_in_time')).toBe(true)
    expect(isRecognitionTiming('over_time')).toBe(true)
    expect(isRecognitionTiming('continuous')).toBe(false)
  })

  it('isOverTimeMeasurement accepts output_method / input_method', () => {
    expect(isOverTimeMeasurement('output_method')).toBe(true)
    expect(isOverTimeMeasurement('input_method')).toBe(true)
    expect(isOverTimeMeasurement('hybrid')).toBe(false)
  })

  it('isOutputMethodKind accepts the canonical IFRS 15 §B15-B17 set', () => {
    for (const k of [
      'units_delivered',
      'units_produced',
      'milestones',
      'time_elapsed',
      'survey_of_work',
    ]) {
      expect(isOutputMethodKind(k)).toBe(true)
    }
    expect(isOutputMethodKind('cost_to_cost')).toBe(false) // input method
  })

  it('isInputMethodKind accepts the canonical IFRS 15 §B18-B19 set', () => {
    for (const k of [
      'cost_to_cost',
      'labor_hours',
      'machine_hours',
      'resources_consumed',
      'time_passed',
    ]) {
      expect(isInputMethodKind(k)).toBe(true)
    }
    expect(isInputMethodKind('milestones')).toBe(false)
  })

  it('isVariableConsiderationMethod accepts expected_value / most_likely_amount', () => {
    expect(isVariableConsiderationMethod('expected_value')).toBe(true)
    expect(isVariableConsiderationMethod('most_likely_amount')).toBe(true)
    expect(isVariableConsiderationMethod('point_estimate')).toBe(false)
  })
})

describe('IFRS 15 — five-step model end-to-end', () => {
  // Step 1: contract — fixture exercised via `it('contract identification')`.
  const contract: Contract = {
    id: 'CT-001',
    customerId: 'CUST-1',
    effectiveDate: new Date('2026-05-01'),
    endDate: new Date('2027-04-30'),
    currency: 'EUR',
    status: 'active',
  }

  it('Step 1: identifies the contract', () => {
    expect(contract.status).toBe('active')
    expect(contract.currency).toBe('EUR')
  })

  // Step 2: two distinct performance obligations.
  // PO-1: SaaS subscription, over-time, time-elapsed (12 months)
  // PO-2: One-off setup fee, point-in-time
  const poSubscription: PerformanceObligation = {
    id: 'PO-1',
    contractId: 'CT-001',
    description: 'SaaS subscription — 12 months',
    kind: 'series',
    recognitionTiming: 'over_time',
    overTimeMeasurement: 'output_method',
    measurementKind: 'time_elapsed',
    standaloneSellingPrice: 120_000_00, // 120k EUR / year
    allocatedAmount: 0,
    recognizedAmount: 0,
    status: 'pending',
  }
  const poSetup: PerformanceObligation = {
    id: 'PO-2',
    contractId: 'CT-001',
    description: 'Onboarding / setup',
    kind: 'distinct',
    recognitionTiming: 'point_in_time',
    standaloneSellingPrice: 30_000_00, // 30k EUR
    allocatedAmount: 0,
    recognizedAmount: 0,
    status: 'pending',
  }

  it('Step 3: transaction price = fixed + variable + financing', () => {
    const price: TransactionPrice = {
      contractId: 'CT-001',
      currency: 'EUR',
      fixed: 130_000_00, // 130k discount off the 150k list
      variable: {
        method: 'expected_value',
        estimate: 5_000_00,
        constraint: 1_000_00,
        basis: 'Performance bonus on Y1 retention',
      },
      total: 130_000_00 + 5_000_00,
    }
    expect(price.total).toBe(135_000_00)
    expect(price.variable?.method).toBe('expected_value')
  })

  it('Step 4: relative-SSP allocation', () => {
    const transactionPrice = 135_000_00
    const totalSsp = poSubscription.standaloneSellingPrice + poSetup.standaloneSellingPrice
    const allocation: Allocation = {
      contractId: 'CT-001',
      totalTransactionPrice: transactionPrice,
      byObligation: [
        {
          obligationId: 'PO-1',
          standaloneSellingPrice: poSubscription.standaloneSellingPrice,
          method: 'relative_ssp',
          allocatedAmount: Math.round(
            (poSubscription.standaloneSellingPrice / totalSsp) * transactionPrice,
          ),
        },
        {
          obligationId: 'PO-2',
          standaloneSellingPrice: poSetup.standaloneSellingPrice,
          method: 'relative_ssp',
          allocatedAmount: Math.round(
            (poSetup.standaloneSellingPrice / totalSsp) * transactionPrice,
          ),
        },
      ],
      allocatedAt: new Date('2026-05-01'),
    }
    const sum = allocation.byObligation.reduce((s, a) => s + a.allocatedAmount, 0)
    // Off-by-one rounding tolerance
    expect(Math.abs(sum - transactionPrice)).toBeLessThanOrEqual(1)
    // PO-1 is 80% of total SSP (120k of 150k)
    expect(allocation.byObligation[0].allocatedAmount).toBeCloseTo(
      transactionPrice * 0.8,
      0,
    )
  })

  it('Step 5: monthly recognition for over-time PO uses time-elapsed progress', () => {
    const allocated = 108_000_00 // post-allocation monthly allocated
    const monthsTotal = 12
    const recognition: RevenueRecognition[] = []
    for (let m = 1; m <= monthsTotal; m++) {
      const cumulative = Math.round((allocated * m) / monthsTotal)
      const previous = recognition[recognition.length - 1]?.cumulativeRecognized ?? 0
      recognition.push({
        id: `REC-PO1-${m}`,
        contractId: 'CT-001',
        obligationId: 'PO-1',
        periodEnd: new Date(2026, 4 + m, 0),
        amount: cumulative - previous,
        cumulativeRecognized: cumulative,
        progress: m / monthsTotal,
        source: 'periodic_run',
      })
    }
    expect(recognition).toHaveLength(12)
    expect(recognition[recognition.length - 1].cumulativeRecognized).toBe(allocated)
    expect(recognition[recognition.length - 1].progress).toBe(1)
  })

  it('Step 5: point-in-time PO recognizes once at satisfaction', () => {
    const event: RevenueRecognition = {
      id: 'REC-PO2-1',
      contractId: 'CT-001',
      obligationId: 'PO-2',
      periodEnd: new Date('2026-05-15'),
      amount: 27_000_00,
      cumulativeRecognized: 27_000_00,
      source: 'periodic_run',
    }
    expect(event.progress).toBeUndefined()
  })
})

describe('IFRS 15 — balance-sheet artefacts', () => {
  it('ContractLiability — deferred revenue carries the maturity period', () => {
    const liab: ContractLiability = {
      contractId: 'CT-001',
      obligationId: 'PO-1',
      amount: 108_000_00,
      currency: 'EUR',
      receivedAt: new Date('2026-05-01'),
      expectedRecognitionPeriod: {
        from: new Date('2026-05-01'),
        to: new Date('2027-04-30'),
      },
    }
    expect(liab.amount).toBe(108_000_00)
  })

  it('ContractAsset — recognized in advance of unconditional right', () => {
    const asset: ContractAsset = {
      contractId: 'CT-001',
      obligationId: 'PO-2',
      amount: 27_000_00,
      currency: 'EUR',
      recognizedAt: new Date('2026-05-15'),
      expectedReclassDate: new Date('2026-05-31'),
    }
    expect(asset.expectedReclassDate).toBeDefined()
  })

  it('RefundLiability — variable-consideration constraint', () => {
    const refund: RefundLiability = {
      contractId: 'CT-001',
      amount: 1_000_00,
      currency: 'EUR',
      basis: 'variable_consideration_constraint',
      recognizedAt: new Date('2026-05-01'),
    }
    expect(refund.basis).toBe('variable_consideration_constraint')
  })
})
