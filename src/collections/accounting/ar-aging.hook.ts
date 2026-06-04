/**
 * A/R Aging Hook — superseded by query-based reporting.
 *
 * Aging is a *query* against open invoices as of a date — not an
 * event-driven precomputation. Eagerly recalculating buckets on every
 * invoice/payment write would shred caches and wedge the close calendar.
 *
 * **Canonical replacement:**
 *   import { generateARAgingReport } from '@/services/accounting/reports'
 *   const dto = await generateARAgingReport(payload, tenantId, asOfDate)
 *
 * The DTO uses the canonical `BucketDefinition.key` discriminator
 * (`current | aging | overdue | stale`) shared with bank-reconciliation
 * aging. See `src/plugins/parties/types.ts` `DEFAULT_AGING_BUCKETS`.
 *
 * This file is preserved as a no-op so any straggler wiring keeps
 * compiling. Safe to delete in a future cleanup slice once verified
 * unused (`rg arAgingHook src/`).
 *
 * @accounting IFRS IFRS-9 expected-credit-loss
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-310 receivables
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @audit ISO-19011:2018 audit-trail aging-of-receivables
 * @see src/plugins/accounting/services/reports.ts generateARAgingReport
 */

import type { CollectionAfterChangeHook } from 'payload'

/**
 * @deprecated Use `generateARAgingReport(payload, tenant, asOfDate)`.
 */
export const arAgingHook: CollectionAfterChangeHook = ({ doc }) => doc
