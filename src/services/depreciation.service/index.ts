/**
 * Depreciation Service — period-by-period PP&E depreciation.
 *
 * Closes the Slice FFF DOA: `depreciation.hook.ts` previously delegated to
 * `req.payload.services?.depreciation` which never existed. This singleton
 * replaces that dispatch — direct-imported by the hook + scheduled jobs —
 * and emits `depreciation:posted` so `glPostingService` can book the JE.
 *
 * Method coverage matches the FixedAssets `depreciationMethod` enum:
 *   • straight_line
 *   • declining_balance       (rate-driven, caller supplies %)
 *   • double_declining_balance (2/N book-value, with residual stop)
 *   • sum_of_years_digits     (per-year fraction)
 *   • units_of_activity       (per-unit, with cumulative stop)
 *
 * Canonical math lives in `@/services/accounting/utilities/calculations.ts`
 * — this service composes those primitives, picks the method, and is the
 * one place a hook or job calls. Pure-math test coverage stays on the
 * utilities; this service is integration-tested via the hook.
 *
 * @standard ISO-8601-1:2019 date-time period-start period-end
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-16 §62 depreciation-methods
 * @accounting IFRS IAS-36 impairment-of-assets
 * @accounting US-GAAP ASC-360-10-35 depreciation
 * @accounting OECD SAF-T §3 fixed-asset-register
 * @audit ISO-19011:2018 audit-trail depreciation-evidence
 * @compliance SOX §404 internal-controls capital-asset-register
 * @see docs/STANDARDS.md §4.2
 */

import { v4 as uuid } from 'uuid';
import {
  calculateStraightLineDepreciation,
  calculateDecliningBalanceDepreciation,
  calculateDoubleDecliningBalanceDepreciation,
  calculateSumOfYearsDigitsDepreciation,
  calculateUnitsOfActivityDepreciation,
  calculateDepreciableBase,
} from '@/services/accounting/utilities/calculations';
import { EventEmitterService, eventEmitter } from '@/services/event-emitter.service';
import type { DepreciationPostedEvent } from '@/types/events';

/**
 * The five canonical methods supported. Mirrors the FixedAssets enum so a
 * type-error appears at compile time if either side drifts.
 */
export type DepreciationMethod =
  | 'straight_line'
  | 'declining_balance'
  | 'double_declining_balance'
  | 'units_of_activity'
  | 'sum_of_years_digits';

/**
 * Subset of FixedAsset fields the math actually needs. The service stays
 * decoupled from the Payload type so it's testable without a full doc.
 */
export interface FixedAssetForDepreciation {
  id: string;
  assetCost: number;
  residualValue: number;
  usefulLifeYears: number;
  depreciationMethod: DepreciationMethod;
  /** Optional current-period book value. Defaults to cost - accumulated. */
  bookValue?: number;
  accumulatedDepreciation?: number;
  /** For declining_balance only — caller supplies the percentage rate. */
  decliningBalanceRate?: number;
  /** For sum_of_years_digits — 1-indexed year within useful life. */
  currentYearOneIndexed?: number;
  /** For units_of_activity. */
  totalUnitsExpected?: number;
  unitsProducedThisPeriod?: number;
  unitsProducedToDate?: number;
  /** Resolved GL account codes (optional — fall back to defaults at post). */
  expenseAccountCode?: string;
  accumulatedAccountCode?: string;
  currencyCode?: string;
}

export interface DepreciationCalculationResult {
  amount: number;
  method: DepreciationMethod;
  bookValueBefore: number;
  bookValueAfter: number;
  accumulatedAfter: number;
}

/**
 * Period-bounded calculation request. Periods are caller-supplied so
 * monthly / quarterly / annual cadence is left to the orchestrator
 * (scheduled job, hook, or admin action). The math here is per-period.
 */
export interface DepreciationPeriod {
  periodStart: Date;
  periodEnd: Date;
  /**
   * Annualised methods (straight_line, double_declining_balance, SYD)
   * pro-rate by `monthsInPeriod / 12`. Defaults to 12 — i.e. annual
   * cadence — for compatibility with existing seed data.
   */
  monthsInPeriod?: number;
}

class DepreciationService {
  constructor(private readonly emitter: EventEmitterService) {}

  /**
   * Pure calculation entry point — returns the period's expense without
   * mutating anything or emitting events. Useful for what-if previews
   * and unit tests.
   */
  calculateForPeriod(
    asset: FixedAssetForDepreciation,
    period: DepreciationPeriod,
  ): DepreciationCalculationResult {
    const accumulatedDepreciation = asset.accumulatedDepreciation ?? 0;
    const bookValueBefore =
      asset.bookValue ?? asset.assetCost - accumulatedDepreciation;
    const depreciableBase = calculateDepreciableBase(
      asset.assetCost,
      asset.residualValue,
    );
    const proRata = (period.monthsInPeriod ?? 12) / 12;

    let amount = 0;
    switch (asset.depreciationMethod) {
      case 'straight_line': {
        const annual = calculateStraightLineDepreciation(
          depreciableBase,
          asset.usefulLifeYears,
        );
        amount = annual * proRata;
        break;
      }
      case 'declining_balance': {
        const rate = asset.decliningBalanceRate ?? 0;
        amount =
          calculateDecliningBalanceDepreciation(bookValueBefore, rate) * proRata;
        break;
      }
      case 'double_declining_balance': {
        amount =
          calculateDoubleDecliningBalanceDepreciation(
            bookValueBefore,
            asset.usefulLifeYears,
            asset.residualValue,
          ) * proRata;
        break;
      }
      case 'sum_of_years_digits': {
        const year = asset.currentYearOneIndexed ?? 1;
        amount =
          calculateSumOfYearsDigitsDepreciation(
            depreciableBase,
            asset.usefulLifeYears,
            year,
          ) * proRata;
        break;
      }
      case 'units_of_activity': {
        amount = calculateUnitsOfActivityDepreciation(
          depreciableBase,
          asset.totalUnitsExpected ?? 0,
          asset.unitsProducedThisPeriod ?? 0,
          asset.unitsProducedToDate ?? 0,
        );
        // UOA is usage-driven; pro-rata doesn't apply (already per-period).
        break;
      }
    }

    // Final stop-rule: never depreciate below residual value.
    const headroom = bookValueBefore - asset.residualValue;
    const cappedAmount = amount > headroom ? Math.max(0, headroom) : amount;
    const accumulatedAfter = accumulatedDepreciation + cappedAmount;
    const bookValueAfter = bookValueBefore - cappedAmount;

    return {
      amount: cappedAmount,
      method: asset.depreciationMethod,
      bookValueBefore,
      bookValueAfter,
      accumulatedAfter,
    };
  }

  /**
   * Compute the period's expense AND emit `depreciation:posted` so the
   * GL subscriber posts the JE. Returns the calculation result so the
   * caller (hook or job) can write the `depreciation-schedules` row.
   *
   * The schedule row is intentionally NOT created here — that's a
   * collection write and belongs in the hook / job that has the
   * `payload` instance. Keeping the service pure-ish makes it
   * trivially testable.
   */
  postForPeriod(
    tenantId: string,
    userId: string,
    asset: FixedAssetForDepreciation,
    period: DepreciationPeriod,
    scheduleId: string = uuid(),
  ): DepreciationCalculationResult {
    const result = this.calculateForPeriod(asset, period);

    if (result.amount > 0) {
      const event: DepreciationPostedEvent = {
        eventId: uuid(),
        eventType: 'depreciation:posted',
        aggregateType: 'fixed_asset',
        aggregateId: asset.id,
        tenantId,
        userId,
        timestamp: new Date(),
        payload: {
          fixedAssetId: asset.id,
          scheduleId,
          periodStart: period.periodStart,
          periodEnd: period.periodEnd,
          depreciationAmount: result.amount,
          method: result.method,
          expenseAccountCode: asset.expenseAccountCode,
          accumulatedAccountCode: asset.accumulatedAccountCode,
          currencyCode: asset.currencyCode ?? 'EUR',
        },
      };
      void this.emitter.emit(event);
    }

    return result;
  }
}

/**
 * Default singleton bound to the global event emitter. Mirrors the
 * Slice FFF pattern (`journalEntryService`, `glPostingService`).
 */
export const depreciationService = new DepreciationService(eventEmitter);

/**
 * Test seam — lets integration tests inject a private emitter to assert
 * on emitted events without leaking handlers across cases.
 */
export const initializeDepreciation = (emitter: EventEmitterService) =>
  new DepreciationService(emitter);
