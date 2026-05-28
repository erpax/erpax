/**
 * Opportunities — sales pipeline with weighted forecast.
 *
 * Slice EEEE (2026-05-10): the deal-by-deal pipeline used to roll up
 * the sales forecast. An opportunity is born from a `lead` (or
 * directly from a customer) and ends in close-won (→ contract +
 * customer) or close-lost.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 §9 contract-existence-criteria
 * @audit ISO-19011:2018 audit-trail crm-pipeline
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Leads.ts
 * @see ./Activities.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { currencyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'
import { emitOpportunityWon } from '../hooks/chainEventEmitters'

const Opportunities: CollectionConfig = {
  slug: 'opportunities',
  labels: { singular: 'Opportunity', plural: 'Opportunities' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'customer', 'stage', 'amount', 'weightedAmount', 'expectedCloseDate', 'status'],
    description:
      'Sales-pipeline deal with weighted forecast. Close-won creates a contract + (if needed) a customer.',
  },
  access: accountingCollectionAccess({ feature: 'crm' }),
  fields: [
    { name: 'name', type: 'text', localized: true, required: true, index: true },
    { name: 'lead', type: 'relationship', relationTo: 'leads' },
    { name: 'customer', type: 'relationship', relationTo: 'customers',
      admin: { description: 'Existing customer (for upsell/cross-sell). Null for net-new from lead.' } },
    { name: 'opportunityOwner', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'stage',
      type: 'select',
      required: true,
      defaultValue: 'qualification',
      options: [
        { label: 'Qualification', value: 'qualification' },
        { label: 'Discovery / Needs Analysis', value: 'discovery' },
        { label: 'Solution / Proposal', value: 'solution' },
        { label: 'Quote Sent', value: 'quote_sent' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Verbal Commit', value: 'verbal_commit' },
        { label: 'Closed Won', value: 'closed_won' },
        { label: 'Closed Lost', value: 'closed_lost' },
        { label: 'Closed No-Decision', value: 'closed_no_decision' },
      ],
    },
    { name: 'probability', type: 'number', min: 0, max: 100, defaultValue: 10,
      admin: { description: 'Snapshot probability (0-100%). Defaults map to stage but operator can override.' } },
    currencyField(),
    { name: 'amount', type: 'number', required: true,
      admin: { description: 'Annual contract value (ARR for SaaS) or one-time TCV (cents).' } },
    { name: 'weightedAmount', type: 'number',
      admin: { readOnly: true, description: 'amount × probability/100. Aggregated for the pipeline forecast.' } },
    { name: 'expectedCloseDate', type: 'date', required: true, index: true },
    { name: 'actualCloseDate', type: 'date' },
    { name: 'closeReason', type: 'select', options: [
      { label: 'Price', value: 'price' },
      { label: 'Product Fit', value: 'product_fit' },
      { label: 'Timing', value: 'timing' },
      { label: 'Competitor (lost to)', value: 'competitor' },
      { label: 'Internal Politics', value: 'internal_politics' },
      { label: 'Budget Cut', value: 'budget_cut' },
      { label: 'Other', value: 'other' },
    ]},
    { name: 'competitor', type: 'text' },
    { name: 'forecastCategory', type: 'select', options: [
      { label: 'Pipeline', value: 'pipeline' },
      { label: 'Best Case', value: 'best_case' },
      { label: 'Commit', value: 'commit' },
      { label: 'Closed', value: 'closed' },
      { label: 'Omitted', value: 'omitted' },
    ]},
    { name: 'segment', type: 'relationship', relationTo: 'customer-segments' },
    { name: 'campaign', type: 'text' },
    { name: 'contractCreated', type: 'relationship', relationTo: 'contracts',
      admin: { readOnly: true, description: 'Contract created on close-won.' } },
    statusField(
      [
        { label: 'Open', value: 'open' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
        { label: 'Abandoned', value: 'abandoned' },
      ],
      'open',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitOpportunityWon, auditTrailAfterChange('opportunities')],
  },
  timestamps: true,
}

export default Opportunities
