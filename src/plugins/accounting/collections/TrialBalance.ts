/**
 * @deprecated Report-shaped collection retired.
 *
 * Per Payload's collection-design guidance, derived/aggregate data should not
 * be a write-collection — these are computed from `gl-accounts` /
 * `journal-entries` / `gl-postings` on demand. Replacement: a service
 * method returning a typed DTO, called from a custom Payload endpoint.
 *
 * Replacement service method (sketch):
 *   import { generateTrialBalance } from '@/plugins/accounting/services/reports'
 *   const report = await generateTrialBalance({ hostId, periodStart, periodEnd })
 *
 * Safe to `git rm src/plugins/accounting/collections/TrialBalance.ts` once verified.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205-10 overall-presentation
 * @audit ISO-19011:2018 audit-trail trial-balance
 * @see docs/STANDARDS.md §4.2
 */
import type { CollectionConfig } from 'payload'

const Stub: CollectionConfig = { slug: 'deprecated-report-stub-trialbalance', fields: [] }
export default Stub
export const TrialBalance: CollectionConfig = Stub
