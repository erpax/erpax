/**
 * Depreciation Methods — canonical math for IAS-16 / ASC-360.
 *
 * Validates the five depreciation methods exposed by the FixedAssets
 * collection (`depreciationMethod` enum) against their textbook formulas
 * + the canonical stop-rule (book value never crosses below residual).
 *
 * Pure-math test — no payload, no DB, no event emitter. The integration
 * test for the schedule-posting hook lives separately and only verifies
 * the wiring (status → 'posted' fires `depreciation:posted`).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-16 §62 depreciation-methods
 * @accounting US-GAAP ASC-360-10-35 depreciation
 * @audit ISO-19011:2018 audit-trail period-expense-evidence
 * @compliance SOX §404 internal-controls capital-asset-register
 * @see src/plugins/accounting/utilities/calculations.ts
 * @see src/services/depreciation.service.ts
 */

import { describe, it, expect } from 'vitest'
import {
  calculateDepreciableBase,
  calculateStraightLineDepreciation,
  calculateDecliningBalanceDepreciation,
  calculateDoubleDecliningBalanceDepreciation,
  calculateSumOfYearsDigitsDepreciation,
  calculateUnitsOfActivityDepreciation,
} from '@/accounting/utility/calculations'
import {
  initializeDepreciation,
  type FixedAssetForDepreciation,
} from '@/depreciation.service'
import { EventEmitterService } from '@/event/emitter.service'
import type { DepreciationPostedEvent } from '@/types/events'

describe('Depreciation — canonical math (IAS-16 / ASC-360)', () => {
  // Canonical fixture: $100,000 asset, $10,000 residual, 5-year life.
  // depreciableBase = 90,000.
  const cost = 100_000
  const residual = 10_000
  const life = 5
  const base = calculateDepreciableBase(cost, residual)

  it('depreciable base = cost − residual', () => {
    expect(base).toBe(90_000)
  })

  describe('Straight-line', () => {
    it('annual = base / life', () => {
      expect(calculateStraightLineDepreciation(base, life)).toBe(18_000)
    })

    it('zero life returns 0 (no division by zero)', () => {
      expect(calculateStraightLineDepreciation(base, 0)).toBe(0)
    })
  })

  describe('Declining balance (caller-supplied rate)', () => {
    it('20% on $90,000 book = $18,000', () => {
      expect(calculateDecliningBalanceDepreciation(90_000, 20)).toBe(18_000)
    })
  })

  describe('Double declining balance (2/N rate)', () => {
    it('Year 1 on full cost = 2/N × cost', () => {
      // Year 1 rate = 2/5 = 40%, applied to full cost (no accumulated yet).
      expect(
        calculateDoubleDecliningBalanceDepreciation(cost, life, residual),
      ).toBe(40_000)
    })

    it('caps at residual headroom (cannot depreciate below salvage)', () => {
      // Book value $11,000, residual $10,000 → only $1,000 of headroom
      // even though 2/5 × 11,000 = 4,400 would otherwise apply.
      expect(
        calculateDoubleDecliningBalanceDepreciation(11_000, life, residual),
      ).toBe(1_000)
    })

    it('returns 0 once book value reaches residual', () => {
      expect(
        calculateDoubleDecliningBalanceDepreciation(residual, life, residual),
      ).toBe(0)
    })

    it('zero life returns 0', () => {
      expect(
        calculateDoubleDecliningBalanceDepreciation(cost, 0, residual),
      ).toBe(0)
    })
  })

  describe('Sum-of-years-digits', () => {
    it('Year 1 on a 5-year life uses 5/15 of base', () => {
      // Σ(1..5) = 15. Year 1 fraction = 5/15. 90,000 × 5/15 = 30,000.
      expect(calculateSumOfYearsDigitsDepreciation(base, life, 1)).toBe(
        30_000,
      )
    })

    it('Year 5 (final) uses 1/15 of base', () => {
      expect(calculateSumOfYearsDigitsDepreciation(base, life, 5)).toBe(
        6_000,
      )
    })

    it('sum across all years equals depreciable base', () => {
      let sum = 0
      for (let y = 1; y <= life; y++) {
        sum += calculateSumOfYearsDigitsDepreciation(base, life, y)
      }
      // Floating-point — allow 0.01 of slop.
      expect(sum).toBeCloseTo(base, 2)
    })

    it('returns 0 outside useful-life window', () => {
      expect(calculateSumOfYearsDigitsDepreciation(base, life, 0)).toBe(0)
      expect(calculateSumOfYearsDigitsDepreciation(base, life, 6)).toBe(0)
    })
  })

  describe('Units of activity', () => {
    it('per-unit × units-this-period for an asset with 100k expected units', () => {
      // 90,000 base / 100,000 units = $0.90 per unit. 5,000 units = $4,500.
      expect(
        calculateUnitsOfActivityDepreciation(90_000, 100_000, 5_000),
      ).toBe(4_500)
    })

    it('caps at remaining units (cannot exceed total expected)', () => {
      // Already produced 99,000 of 100,000. Period claims 5,000 — only
      // 1,000 should bill. 1,000 × $0.90 = $900.
      expect(
        calculateUnitsOfActivityDepreciation(
          90_000,
          100_000,
          5_000,
          99_000,
        ),
      ).toBe(900)
    })

    it('returns 0 when totalUnitsExpected is 0', () => {
      expect(calculateUnitsOfActivityDepreciation(90_000, 0, 100)).toBe(0)
    })
  })
})

describe('depreciationService.postForPeriod — event emission + cap', () => {
  const buildEmitter = () => new EventEmitterService()

  const baseAsset: FixedAssetForDepreciation = {
    id: 'asset-1',
    assetCost: 100_000,
    residualValue: 10_000,
    usefulLifeYears: 5,
    depreciationMethod: 'straight_line',
    accumulatedDepreciation: 0,
  }

  const fullYear = {
    periodStart: new Date('2026-01-01'),
    periodEnd: new Date('2026-12-31'),
    monthsInPeriod: 12,
  }

  it('emits depreciation:posted with the computed amount on a positive run', async () => {
    const emitter = buildEmitter()
    const captured: DepreciationPostedEvent[] = []
    emitter.subscribe('depreciation:posted', async (e) => {
      captured.push(e as DepreciationPostedEvent)
    })

    const svc = initializeDepreciation(emitter)
    const result = svc.postForPeriod(
      'tenant-1',
      'user-1',
      baseAsset,
      fullYear,
      'sched-1',
    )

    // Allow the queue to drain.
    await new Promise((r) => setTimeout(r, 0))

    expect(result.amount).toBe(18_000)
    expect(captured).toHaveLength(1)
    expect(captured[0].payload.depreciationAmount).toBe(18_000)
    expect(captured[0].payload.scheduleId).toBe('sched-1')
    expect(captured[0].payload.method).toBe('straight_line')
  })

  it('does NOT emit when the period amount is zero (e.g. fully depreciated asset)', async () => {
    const emitter = buildEmitter()
    const captured: DepreciationPostedEvent[] = []
    emitter.subscribe('depreciation:posted', async (e) => {
      captured.push(e as DepreciationPostedEvent)
    })

    const svc = initializeDepreciation(emitter)
    // Asset already at residual — headroom 0 — service should compute 0
    // and skip the event entirely.
    const result = svc.postForPeriod(
      'tenant-1',
      'user-1',
      {
        ...baseAsset,
        accumulatedDepreciation: 90_000, // book value = residual
      },
      fullYear,
      'sched-2',
    )

    await new Promise((r) => setTimeout(r, 0))

    expect(result.amount).toBe(0)
    expect(captured).toHaveLength(0)
  })

  it('pro-rates an annualised method when monthsInPeriod < 12', async () => {
    const emitter = buildEmitter()
    const svc = initializeDepreciation(emitter)
    const result = svc.postForPeriod(
      'tenant-1',
      'user-1',
      baseAsset,
      {
        periodStart: new Date('2026-01-01'),
        periodEnd: new Date('2026-01-31'),
        monthsInPeriod: 1,
      },
      'sched-3',
    )
    // 18,000 / 12 = 1,500.
    expect(result.amount).toBe(1_500)
  })
})
