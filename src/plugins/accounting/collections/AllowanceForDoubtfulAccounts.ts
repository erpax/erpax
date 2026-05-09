/**
 * @deprecated Report-shaped collection retired.
 *
 * Per Payload's collection-design guidance, derived/aggregate data should not
 * be a write-collection — these are computed from `gl-accounts` /
 * `journal-entries` / `gl-postings` on demand. Replacement: a service
 * method returning a typed DTO, called from a custom Payload endpoint.
 *
 * Replacement service method (sketch):
 *   import { generateAllowanceForDoubtfulAccounts } from '@/plugins/accounting/services/reports'
 *   const report = await generateAllowanceForDoubtfulAccounts({ hostId, periodStart, periodEnd })
 *
 * Safe to `git rm src/plugins/accounting/collections/AllowanceForDoubtfulAccounts.ts` once verified.
 *
 * @accounting IFRS IFRS-9 expected-credit-losses
 * @accounting US-GAAP ASC-326 financial-instruments-credit-losses
 * @accounting US-GAAP ASC-310-40 troubled-debt-restructurings
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */
import type { CollectionConfig } from 'payload'

const Stub: CollectionConfig = { slug: 'deprecated-report-stub-allowancefordoubtfulaccou.ts', fields: [] }
export default Stub
export const AllowanceForDoubtfulAccounts: CollectionConfig = Stub
