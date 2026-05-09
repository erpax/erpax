/**
 * Base Accounting Hook — shared tenant extraction, error handling, logging.
 *
 * The intended pattern was for every domain-specific accounting hook to be
 * built via {@link createAccountingHook}, so error handling and tenant-scope
 * enforcement would be uniform. In practice the 8 sibling hooks were written
 * directly and never adopted the factory — Slice KKK confirmed
 * `createAccountingHook` has zero callers. Only {@link ensureHostId} is
 * actually used (called from `factories/collection-factory.ts:61`).
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @audit ISO-19011:2018 audit-trail logging
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionAfterChangeHook } from 'payload'

/** @deprecated Slice KKK: zero callers across `src/`. Kept for the type vocabulary only. */
export interface GLPostingData {
  [key: string]: any;
}

/** @deprecated Slice KKK: zero callers. Used to be the contract for `createAccountingHook` handlers. */
export type HookHandler = (hostId: string, data: GLPostingData) => Promise<void>;

/**
 * Factory for creating accounting hooks with consistent error handling.
 *
 * @deprecated Slice KKK: zero callers across `src/`. The 8 domain hooks
 * (`ap-aging`, `ar-aging`, `bill`, `cogs`, `depreciation`, `invoice`,
 * `item`, `payment`) were written directly without this factory. Plus
 * the body still references the broken `req.payload.services?.<name>`
 * pattern (Slice PP DOA). Either delete after the next maintenance pass,
 * or repurpose if the codebase ever adopts the factory pattern.
 */
export const createAccountingHook = (
  serviceName: string,
  handler: HookHandler,
  shouldProcess?: (doc: any, operation: string) => boolean,
): CollectionAfterChangeHook => {
  return async ({ doc, req, operation }) => {
    // Default: process on create and update
    if (!shouldProcess) {
      shouldProcess = (doc, op) => !!doc && (op === 'create' || op === 'update');
    }

    if (!shouldProcess(doc, operation)) return doc;

    try {
      const hostId = doc.tenant;
      if (!hostId) {
        req.payload.logger.warn(`⚠ No host context for ${serviceName}`);
        return doc;
      }

      const service = req.payload.services?.[serviceName];
      if (!service) {
        req.payload.logger.warn(`⚠ Service not available: ${serviceName}`);
        return doc;
      }

      await handler(hostId, doc);
      req.payload.logger.info(`✓ ${serviceName} processed successfully`);
    } catch (error) {
      req.payload.logger.error({ err: error }, `✗ Error in ${serviceName}:`);
      // Don't throw - allow document to save even if GL posting fails
    }

    return doc;
  };
};

/**
 * Ensure tenant is set from the request user.
 *
 * Slice CCC: derives `data.tenant` from `req.user.tenants[0]?.tenant`
 * (canonical multi-tenant plugin shape). Name kept as `ensureHostId`
 * for callsite stability — Slice ZZZ may rename callers later. The
 * legacy `undefined` path is gone (it was
 * never wired; see CHANGELOG Slice PP).
 */
export const ensureHostId = (data: any, req: any) => {
  if (!data) return data;
  if (data.tenant) return data;
  const tenantsArr = req?.user?.tenants as Array<{ tenant?: number | string }> | undefined;
  const userTenant = tenantsArr?.[0]?.tenant;
  if (userTenant !== undefined && userTenant !== null) {
    data.tenant = userTenant;
  }
  return data;
};

/**
 * Calculate total from array of items with amount field.
 *
 * @deprecated Slice KKK: zero callers across `src/`. Same domain
 * computation lives in `journalEntryService` (which IS used). Delete
 * after the next maintenance pass.
 */
export const calculateTotal = (items: any[], amountField = 'amount'): number => {
  return items ? items.reduce((sum, item) => sum + (item?.[amountField] || 0), 0) : 0;
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  return total !== 0 ? (value / total) * 100 : 0;
};
