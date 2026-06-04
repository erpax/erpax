/**
 * Projects — anchor for IFRS-15 §35 over-time revenue recognition.
 *
 * Slice AAAA (2026-05-10): we already have `contracts` and
 * `performance-obligations`, but no project entity to attach **cost-to-cost**
 * (IFRS-15 §B14-B19) or **output-method** (IFRS-15 §B15) progress
 * measurement to. A project is the unit of WIP — the customer-facing
 * deliverable whose costs accumulate, get measured against budget, and
 * close to revenue per the revenue-recognition pattern of the contract.
 *
 * Pairs with:
 *   - `project-tasks` (decomposition for tracking)
 *   - `project-milestones` (milestone-billing trigger points)
 *   - `wip-snapshots` (period-end WIP valuation)
 *   - `contracts` + `performance-obligations` (revenue side)
 *   - `time-entries` (labour cost side)
 *   - `purchase-orders` + `goods-receipts` (material cost side)
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 §35 over-time-recognition
 * @accounting IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress
 * @accounting IFRS IFRS-15 §126 milestone-billing
 * @accounting US-GAAP ASC-606-10-25-27 over-time-criteria
 * @accounting IFRS IAS-1 §125 estimation-uncertainty (project budgets)
 * @audit ISO-19011:2018 audit-trail wip-evidence
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./ProjectTasks.ts
 * @see ./ProjectMilestones.ts
 * @see ./WipSnapshots.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields } from '@/base/accounting/field'

const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  admin: {
    useAsTitle: 'projectCode',
    defaultColumns: ['projectCode', 'name', 'customer', 'recognitionMethod', 'plannedStartDate', 'status'],
    description:
      'IFRS-15 §35 over-time-recognition anchor. WIP accumulates per project; revenue recognises per chosen progress measurement (cost-to-cost / milestone / output-method).',
  },
  access: accountingCollectionAccess({ feature: 'project_accounting' }),
  fields: [
    { name: 'projectCode', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Tenant-unique project code (e.g. PRJ-2026-001).' } },
    { name: 'name', type: 'text', required: true,
      admin: { description: 'Customer-facing project name.' } },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'customer', type: 'relationship', relationTo: 'customers', required: true, index: true },
    { name: 'contract', type: 'relationship', relationTo: 'contracts',
      admin: { description: 'Master contract this project executes against (one contract may have many projects).' } },
    { name: 'legalEntity', type: 'relationship', relationTo: 'legal-entities',
      admin: { description: 'Reporting legal entity that books this project\'s revenue + costs.' } },
    { name: 'projectManager', type: 'relationship', relationTo: 'users',
      admin: { description: 'Internal project owner (responsible for delivery + status).' } },
    {
      name: 'projectType',
      type: 'select',
      defaultValue: 'fixed_price',
      options: [
        { label: 'Fixed Price', value: 'fixed_price' },
        { label: 'Time & Materials', value: 'time_and_materials' },
        { label: 'Cost-Plus', value: 'cost_plus' },
        { label: 'Milestone (per IFRS-15 §126)', value: 'milestone' },
        { label: 'Internal (no customer billing)', value: 'internal' },
      ],
    },
    {
      name: 'recognitionMethod',
      type: 'select',
      defaultValue: 'cost_to_cost',
      options: [
        { label: 'Point-in-Time (no WIP)', value: 'point_in_time' },
        { label: 'Cost-to-Cost (IFRS-15 §B18)', value: 'cost_to_cost' },
        { label: 'Output Method — Units Delivered (§B15)', value: 'output_units' },
        { label: 'Output Method — Time Elapsed (§B15)', value: 'output_time' },
        { label: 'Output Method — Surveys / Appraisals (§B15)', value: 'output_survey' },
        { label: 'Milestone (§126)', value: 'milestone' },
        { label: 'Right to Invoice (§B16)', value: 'right_to_invoice' },
      ],
      admin: { description: 'Progress measurement method per IFRS-15. Drives the WIP / revenue posting cadence.' },
    },
    currencyField(),
    { name: 'contractedAmount', type: 'number',
      admin: { description: 'Total transaction price for this project (cents). For T&M projects use the not-to-exceed cap.' } },
    { name: 'budgetedCost', type: 'number',
      admin: { description: 'Estimated total cost at completion (EAC) — denominator in cost-to-cost % complete.' } },
    { name: 'budgetedHours', type: 'number',
      admin: { description: 'Estimated total labour hours (used by output-time method).' } },
    { name: 'budgetedMargin', type: 'number',
      admin: { readOnly: true, description: 'contractedAmount − budgetedCost (auto-derived).' } },
    { name: 'actualCostToDate', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Cumulative posted cost (auto-summed from time-entries + materials + overhead allocation).' } },
    { name: 'recognisedRevenueToDate', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Cumulative recognised revenue (auto-summed from period postings).' } },
    { name: 'percentComplete', type: 'number', min: 0, max: 100,
      admin: { readOnly: true, description: 'Snapshot of latest period progress measurement.' } },
    { name: 'plannedStartDate', type: 'date' },
    { name: 'plannedEndDate', type: 'date' },
    { name: 'actualStartDate', type: 'date' },
    { name: 'actualEndDate', type: 'date' },
    { name: 'isOnerous', type: 'checkbox', defaultValue: false,
      admin: { description: 'IAS-37 §66 onerous-contract flag — when EAC > contracted, provision the full expected loss now.' } },
    statusField(
      [
        { label: 'Draft / Planning', value: 'draft' },
        { label: 'Approved (commit budget)', value: 'approved' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('projects'),
  timestamps: true,
}

export default Projects
