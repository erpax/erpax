/**
 * @deprecated Report-shaped collection retired.
 *
 * Per Payload's collection-design guidance, derived/aggregate data should not
 * be a write-collection — these are computed from `gl-accounts` /
 * `journal-entries` / `gl-postings` on demand. Replacement: a service
 * method returning a typed DTO, called from a custom Payload endpoint.
 *
 * Replacement service method (sketch):
 *   import { generateInventoryCostFlow } from '@/plugins/accounting/services/reports'
 *   const report = await generateInventoryCostFlow({ hostId, periodStart, periodEnd })
 *
 * Safe to `git rm src/plugins/accounting/collections/InventoryCostFlow.ts` once verified.
 *
 * @accounting IFRS IAS-2 inventories cost-formulas
 * @accounting US-GAAP ASC-330 inventory FIFO-LIFO-weighted-average
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */
import type { CollectionConfig } from 'payload'

const Stub: CollectionConfig = { slug: 'deprecated-report-stub-inventorycostflow', fields: [] }
export default Stub
export const InventoryCostFlow: CollectionConfig = Stub
