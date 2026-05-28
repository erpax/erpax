/**
 * Cost Centers — analytical dimension for GL postings.
 *
 * IAS 1 §99 / ASC 280 segment reporting requires the entity to track
 * revenue / expense by reportable segment. CostCenters is the project's
 * canonical "secondary dimension" — every JournalEntryLine can be
 * tagged with a cost-center id, enabling segment / departmental P&L
 * without polluting the chart of accounts itself.
 *
 * Hierarchical via `parent` so a tree (Region → Country → Department →
 * Team) can be reported at any level. `costCenterCode` is the human
 * key used in JE coding.
 *
 * @standard ISO-3166-1:2020 country-codes geographic-segment-tagging
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 §99 statement-of-comprehensive-income
 * @accounting IFRS IFRS-8 operating-segments
 * @accounting US-GAAP ASC-280 segment-reporting
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §302 disclosure-controls segment-disclosure
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../access/auth'
import {
  statusField,
  notesField,
  auditFields,
} from '../fields/base-accounting-fields'

const CostCenters: CollectionConfig = {
  slug: 'cost-centers',
  labels: { singular: 'Cost Center', plural: 'Cost Centers' },
  admin: {
    useAsTitle: 'costCenterCode',
    defaultColumns: ['costCenterCode', 'name', 'kind', 'parent', 'manager', 'status'],
    description:
      'Analytical dimension for segment reporting (IFRS 8 / ASC 280). JE lines reference these.',
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'costCenterCode',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Short alphanumeric code (e.g. EU-DE-ENG-FE).' },
    },
    {
      name: 'name',
      type: 'text', localized: true,
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'department',
      options: [
        { label: 'Region', value: 'region' },
        { label: 'Country', value: 'country' },
        { label: 'Business unit', value: 'business_unit' },
        { label: 'Department', value: 'department' },
        { label: 'Team', value: 'team' },
        { label: 'Project', value: 'project' },
        { label: 'Cost pool (allocation target)', value: 'cost_pool' },
        { label: 'Profit center', value: 'profit_center' },
      ],
      admin: {
        description:
          'Drives presentation: regions/countries roll up to consolidated; departments/teams roll up to their parent BU; profit centers carry both revenue and expense.',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'cost-centers',
      admin: {
        description: 'Parent in the hierarchy. Null = root.',
      },
    },
    {
      name: 'country',
      type: 'text',
      admin: {
        description:
          'ISO 3166-1 alpha-2 — populated for kind = country, optional otherwise. Used by IFRS 8 / ASC 280 geographic disclosure.',
      },
    },
    {
      name: 'manager',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'Cost-center owner / department head.' },
    },

    // Reporting flags
    {
      name: 'reportableSegment',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'IFRS 8 §13: meets the 10% revenue / asset / loss threshold for reportable segments.',
      },
    },
    {
      name: 'allowsRevenue',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'JE lines may post revenue accounts to this CC.' },
    },
    {
      name: 'allowsExpense',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'JE lines may post expense accounts to this CC.' },
    },
    {
      name: 'allowsCapex',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'JE lines may post capex (FixedAssets) to this CC.',
      },
    },

    // Allocation
    {
      name: 'allocationRules',
      type: 'array',
      admin: {
        description:
          'When this is a cost pool (kind = cost_pool), describe the periodic allocation to consumer cost-centers (basis + percentages).',
        condition: (data) => (data as { kind?: string })?.kind === 'cost_pool',
      },
      fields: [
        {
          name: 'targetCostCenter',
          type: 'relationship',
          relationTo: 'cost-centers',
          required: true,
        },
        {
          name: 'basis',
          type: 'select',
          options: [
            { label: 'Headcount', value: 'headcount' },
            { label: 'Floor area', value: 'floor_area' },
            { label: 'Revenue %', value: 'revenue_pct' },
            { label: 'Manual %', value: 'manual_pct' },
            { label: 'Direct costs %', value: 'direct_costs_pct' },
          ],
        },
        { name: 'percentage', type: 'number', min: 0, max: 100 },
      ],
    },

    // Lifecycle
    {
      name: 'effectiveFrom',
      type: 'date',
      required: true,
    },
    {
      name: 'effectiveTo',
      type: 'date',
      admin: { description: 'Null = open-ended; populate on retirement.' },
    },

    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Retired', value: 'retired' },
      ],
      'active',
    ),

    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('cost-centers')],
  },
  timestamps: true,
}

export default CostCenters
