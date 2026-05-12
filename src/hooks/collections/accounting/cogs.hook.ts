/**
 * COGS Posting Hook — calculates and posts COGS on invoice finalization.
 *
 * @deprecated Slice FFF: this hook delegates to `req.payload.services?.cogs`
 * but **no `cogs.service.ts` exists** at `src/services/`. Currently
 * silent no-op in production. Build the service or fold COGS posting
 * into `gl-posting.service.ts`'s invoice handler — see
 * `ap-aging.hook.ts` deprecation note for options.
 *
 * Inventory valuation methods: FIFO, LIFO, weighted-average.
 *
 * @accounting IFRS IAS-2 inventories
 * @accounting US-GAAP ASC-330 inventory
 * @accounting US-GAAP ASC-705 cost-of-sales-and-services
 * @audit ISO-19011:2018 audit-trail double-entry-posting
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionAfterChangeHook } from 'payload'
export const cogsHook: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  if (!doc || (operation !== 'create' && operation !== 'update')) return doc;

  // Only process when invoice is finalized (not draft)
  if (doc.status === 'draft' || doc.status === 'issued') return doc;

  try {
    const cogsService = req.payload.services?.cogs;
    const tenant = doc.tenant;

    if (cogsService) {
      const invoiceData = {
        id: doc.id,
        invoiceNumber: doc.invoiceNumber || doc.number,
        invoiceDate: doc.invoiceDate || doc.date,
        lineItems: doc.lineItems || [],
        totalAmount: doc.totalAmount,
        totalCOGS: 0, // Will be calculated by service
        currency: doc.currency || 'EUR',
        status: doc.status,
      };

      await cogsService.postCOGS(tenant, invoiceData);
      req.payload.logger.info(`✓ COGS calculation posted for invoice ${invoiceData.invoiceNumber}`);
    }
  } catch (error) {
    req.payload.logger.error({ err: error }, `✗ Error posting COGS:`);
  }

  return doc;
};
