/**
 * A/P Aging Hook — superseded by query-based reporting.
 *
 * Same architecture decision as `ar-aging.hook.ts` — aging is a *query*,
 * not an event-driven precomputation.
 *
 * **Canonical replacement:**
 *   import { generateAPAgingReport } from '@/plugins/accounting/services/reports'
 *   const dto = await generateAPAgingReport(payload, tenantId, asOfDate)
 *
 * Discount-window detection (e.g. "2/10 Net 30") that this hook flagged
 * inline is left to a follow-up `discount-opportunity.service.ts` slice;
 * it's a payment-strategy concern, not aging.
 *
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting US-GAAP ASC-405 liabilities
 * @standard EN-16931:2017 §BG-20 document-level-allowances
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @audit ISO-19011:2018 audit-trail aging-of-payables
 * @see src/plugins/accounting/services/reports.ts generateAPAgingReport
 */

import type { CollectionAfterChangeHook } from 'payload'

/**
 * @deprecated Use `generateAPAgingReport(payload, tenant, asOfDate)`.
 */
export const apAgingHook: CollectionAfterChangeHook = ({ doc }) => doc
