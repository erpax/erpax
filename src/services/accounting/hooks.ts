/**
 * Accounting Hooks — no-op stubs for removed collection hooks.
 *
 * Previously these hooks delegated to services that don't exist in src/services/.
 * Aging is now a service-generated DTO via `financialReportingService`.
 * COGS will fold into `gl-posting.service.ts`'s invoice handler when built.
 *
 * @see src/collections/Invoices/index.ts (Slice PPP)
 */

import type { AfterChangeHook } from 'payload'

/**
 * No-op hook for invoice accounting — kept for backward compatibility
 */
export const invoiceAccountingHook: AfterChangeHook = async ({ doc }) => {
  // Aging is now service-generated; no action needed here
  return doc
}

/**
 * No-op hook for item accounting
 */
export const itemAccountingHook: AfterChangeHook = async ({ doc }) => {
  // COGS handled by gl-posting service
  return doc
}

/**
 * No-op hook for payment accounting
 */
export const paymentAccountingHook: AfterChangeHook = async ({ doc }) => {
  // Payment allocation handled by AR/AP services
  return doc
}
