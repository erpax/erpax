/**
 * @deprecated Report-shaped collection retired.
 *
 * Per Payload's collection-design guidance, derived/aggregate data should not
 * be a write-collection — these are computed from `gl-accounts` /
 * `journal-entries` / `gl-postings` on demand. Replacement: a service
 * method returning a typed DTO, called from a custom Payload endpoint.
 *
 * Replacement service method (sketch):
 *   import { generateCashFlowForecast } from '@/plugins/accounting/services/reports'
 *   const report = await generateCashFlowForecast({ hostId, periodStart, periodEnd })
 *
 * Safe to `git rm src/plugins/accounting/collections/CashFlowForecast.ts` once verified.
 *
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */
import type { CollectionConfig } from 'payload'

const Stub: CollectionConfig = { slug: 'deprecated-report-stub-cashflowforecast', fields: [] }
export default Stub
export const CashFlowForecast: CollectionConfig = Stub
