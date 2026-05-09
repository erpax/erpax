/**
 * A/P Aging Hook — recalculates aging buckets + discount opportunities.
 *
 * @deprecated Slice FFF: this hook delegates to `req.payload.services?.apAging`
 * but **no `ap-aging.service.ts` exists** at `src/services/`. The hook
 * currently silently no-ops in production. Two ways forward (design call):
 *   • Build `src/services/ap-aging.service.ts` (parallel to
 *     `gl-posting.service.ts`) with a `class APAgingService` exposing
 *     `updateAPAging(tenant, billData)`. Then wire a singleton import.
 *   • Delete this hook and let aging analytics run as a service-generated
 *     DTO (see `src/services/financial-reporting.service.ts` for the pattern).
 *
 * Buckets: current, 31-60, 61-90, 91+. Surfaces early-payment-discount windows
 * (e.g. "2/10 Net 30") that fall within the next post period.
 *
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting US-GAAP ASC-405 liabilities
 * @standard EN-16931:2017 §BG-20 document-level-allowances
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2 §5
 */

import type { CollectionAfterChangeHook } from 'payload'
export const apAgingHook: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  if (!doc || (operation !== 'create' && operation !== 'update')) return doc;

  try {
    const apAgingService = req.payload.services?.apAging;
    const tenant = doc.tenant;

    if (apAgingService) {
      const billData = {
        id: doc.id,
        billNumber: doc.billNumber || doc.number,
        billDate: doc.billDate || doc.date,
        vendorId: doc.vendorId || doc.seller,
        amount: doc.totalAmount,
        amountDue: doc.totalDue || doc.totalAmount,
        currency: doc.currency || 'EUR',
        status: doc.status,
        paymentTermsDays: doc.paymentTerms?.days || 30,
        discountPercentage: doc.discountPercentage || 0,
        discountDays: doc.discountDays || 10,
      };

      await apAgingService.updateAPAging(tenant, billData);
      req.payload.logger.info(`✓ AP aging updated for bill ${billData.billNumber}`);
    }
  } catch (error) {
    req.payload.logger.error({ err: error }, `✗ Error updating AP aging:`);
  }

  return doc;
};
