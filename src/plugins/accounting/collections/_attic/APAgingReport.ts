/**
 * @deprecated Report-shaped collection retired.
 *
 * Per Payload's collection-design guidance, derived/aggregate data should not
 * be a write-collection — these are computed from `gl-accounts` /
 * `journal-entries` / `gl-postings` on demand. Replacement: a service
 * method returning a typed DTO, called from a custom Payload endpoint.
 *
 * Replacement service method (sketch):
 *   import { generateAPAgingReport } from '@/plugins/accounting/services/reports'
 *   const report = await generateAPAgingReport(payload, tenantId, asOfDate)
 *
 * Safe to `git rm src/plugins/accounting/collections/APAgingReport.ts` once verified.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-405 liabilities accounts-payable
 * @audit ISO-19011:2018 audit-trail aging-report
 * @see docs/STANDARDS.md §4.2
 */
import type { CollectionConfig } from 'payload'

const Stub: CollectionConfig = { slug: 'deprecated-report-stub-apagingreport', fields: [] }
export default Stub
export const APAgingReport: CollectionConfig = Stub
