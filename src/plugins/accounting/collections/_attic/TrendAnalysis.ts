/**
 * @deprecated Report-shaped collection retired.
 *
 * Per Payload's collection-design guidance, derived/aggregate data should not
 * be a write-collection — these are computed from `gl-accounts` /
 * `journal-entries` / `gl-postings` on demand. Replacement: a service
 * method returning a typed DTO, called from a custom Payload endpoint.
 *
 * Replacement service method (sketch):
 *   import { generateTrendAnalysis } from '@/plugins/accounting/services/reports'
 *   const report = await generateTrendAnalysis(payload, tenantId, periodStart, periodEnd)
 *
 * Safe to `git rm src/plugins/accounting/collections/TrendAnalysis.ts` once verified.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @audit ISO-19011:2018 audit-trail trend-analysis
 * @quality ISO-25010 functional-suitability historical-projection
 * @see docs/STANDARDS.md §4.2
 */
import type { CollectionConfig } from 'payload'

const Stub: CollectionConfig = { slug: 'deprecated-report-stub-trendanalysis', fields: [] }
export default Stub
export const TrendAnalysis: CollectionConfig = Stub
