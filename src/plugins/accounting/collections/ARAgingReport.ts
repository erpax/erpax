/**
 * @deprecated Report-shaped collection retired.
 *
 * Per Payload's collection-design guidance, derived/aggregate data should not
 * be a write-collection — these are computed from `gl-accounts` /
 * `journal-entries` / `gl-postings` on demand. Replacement: a service
 * method returning a typed DTO, called from a custom Payload endpoint.
 *
 * Replacement service method (sketch):
 *   import { generateARAgingReport } from '@/plugins/accounting/services/reports'
 *   const report = await generateARAgingReport({ hostId, periodStart, periodEnd })
 *
 * Safe to `git rm src/plugins/accounting/collections/ARAgingReport.ts` once verified.
 */
const Stub: any = { slug: 'deprecated-report-stub-aragingreport', fields: [] }
export default Stub
export const ARAgingReport: any = Stub
