/**
 * Depreciation Schedule Posting Hook — fires GL posting on status → 'posted'.
 *
 * Closes the Slice FFF DOA: depreciation previously delegated to
 * `req.payload.services?.depreciation` which never existed. New model:
 *
 *   1. User (or future scheduled job) creates a `depreciation-schedules`
 *      row in `status: 'calculated'` — projection only, no GL impact.
 *   2. When that row's status flips to `'posted'`, this hook calls the
 *      canonical `depreciationService.postForPeriod(...)` which emits
 *      `depreciation:posted`. `glPostingService` subscribes to that event
 *      and books the canonical IAS-16 entry:
 *        Dr Depreciation Expense        depreciationAmount
 *          Cr Accumulated Depreciation     depreciationAmount
 *   3. The journal-entry id is then linked back to the schedule via the
 *      collection's `journalEntry` relationship (left to a follow-up
 *      slice that wires the GL→schedule callback; for now it stays null
 *      and the audit trail uses `sourceId = scheduleId`).
 *
 * @accounting IFRS IAS-16 §62 depreciation-methods
 * @accounting IFRS IAS-36 impairment-of-assets
 * @accounting US-GAAP ASC-360-10-35 depreciation
 * @standard ISO-8601-1:2019 date-time depreciation-period
 * @audit ISO-19011:2018 audit-trail period-expense
 * @compliance SOX §404 internal-controls capital-asset-register
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionAfterChangeHook } from 'payload';
import {
  depreciationService,
  type DepreciationMethod,
  type FixedAssetForDepreciation,
} from '@/services/depreciation.service';

type ScheduleDoc = Record<string, unknown> & {
  id: string | number;
  status?: string;
  tenant?: string | { id?: string };
  fixedAsset?: string | (Record<string, unknown> & { id?: string });
  periodStart?: string | Date;
  periodEnd?: string | Date;
  currency?: string;
  monthsInPeriod?: number;
  unitsProducedThisPeriod?: number;
};

const isStatusTransitionToPosted = (
  doc: ScheduleDoc,
  previousDoc?: ScheduleDoc,
): boolean => {
  if (doc?.status !== 'posted') return false;
  if (!previousDoc) return true;
  return previousDoc.status !== 'posted';
};

const toFixedAssetForDepreciation = (
  asset: Record<string, unknown>,
  schedule: ScheduleDoc,
): FixedAssetForDepreciation => ({
  id: String(asset.id),
  assetCost: Number(asset.assetCost ?? 0),
  residualValue: Number(asset.residualValue ?? 0),
  usefulLifeYears: Number(asset.usefulLifeYears ?? 0),
  depreciationMethod:
    (asset.depreciationMethod as DepreciationMethod) ?? 'straight_line',
  accumulatedDepreciation: Number(asset.accumulatedDepreciation ?? 0),
  bookValue: Number(asset.bookValue ?? 0),
  totalUnitsExpected:
    Number(asset.totalUnitsExpected ?? 0) || undefined,
  unitsProducedToDate:
    Number(asset.unitsProducedToDate ?? 0) || undefined,
  unitsProducedThisPeriod:
    Number(schedule.unitsProducedThisPeriod ?? 0) || undefined,
  currencyCode: String(schedule.currency ?? asset.currency ?? 'EUR'),
});

export const depreciationSchedulePostingHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  const schedule = doc as ScheduleDoc;
  if (!schedule || (operation !== 'create' && operation !== 'update')) return doc;
  if (!isStatusTransitionToPosted(schedule, previousDoc as ScheduleDoc | undefined)) {
    return doc;
  }

  try {
    const tenantRaw = schedule.tenant;
    const tenant =
      typeof tenantRaw === 'object' && tenantRaw !== null
        ? tenantRaw.id
        : tenantRaw;
    const userId = req.user?.id;
    if (!tenant || !userId) return doc;

    // Resolve the fixed asset — Payload may pass it as id or as the
    // populated relationship object depending on `depth`.
    const assetRel = schedule.fixedAsset;
    let asset: Record<string, unknown> | null = null;
    if (typeof assetRel === 'object' && assetRel !== null) {
      asset = assetRel as Record<string, unknown>;
    } else if (assetRel) {
      const populated = await req.payload.findByID({
        collection: 'fixed-assets',
        id: assetRel as string,
      });
      asset = populated ? (populated as unknown as Record<string, unknown>) : null;
    }
    if (!asset) return doc;

    depreciationService.postForPeriod(
      String(tenant),
      String(userId),
      toFixedAssetForDepreciation(asset, schedule),
      {
        periodStart: new Date(schedule.periodStart as string | Date),
        periodEnd: new Date(schedule.periodEnd as string | Date),
        monthsInPeriod: Number(schedule.monthsInPeriod ?? 12),
      },
      String(schedule.id),
    );

    req.payload.logger.info(
      `✓ Depreciation posted for schedule ${schedule.id} (asset ${asset.id})`,
    );
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error posting depreciation for schedule ${schedule.id}:`,
    );
  }

  return doc;
};
