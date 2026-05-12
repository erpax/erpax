/**
 * Project Milestones — IFRS-15 §126 milestone-billing trigger points.
 *
 * Slice AAAA (2026-05-10): contracts that recognise revenue at discrete
 * milestones (rather than over time via cost-to-cost) need a structured
 * milestone register. When a milestone is marked `achieved`, the GL
 * handler emits a `milestone:achieved` event that triggers invoicing
 * + revenue recognition for the milestone amount.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 §126 milestone-billing
 * @accounting IFRS IFRS-15 §35 over-time-recognition
 * @accounting US-GAAP ASC-606-10-25-30 milestone-method
 * @audit ISO-19011:2018 audit-trail milestone-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Projects.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'
import { emitMilestoneAchieved } from '@/hooks/chainEventEmitters'

const ProjectMilestones: CollectionConfig = {
  slug: 'project-milestones',
  labels: { singular: 'Project Milestone', plural: 'Project Milestones' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['project', 'milestoneNumber', 'name', 'plannedDate', 'amount', 'status'],
    description:
      'IFRS-15 §126 milestone register. When achieved, fires milestone:achieved → invoice + revenue posting for the milestone amount.',
  },
  access: accountingCollectionAccess({ feature: 'project_accounting' }),
  fields: [
    multiTenancyField(),
    { name: 'project', type: 'relationship', relationTo: 'projects', required: true, index: true },
    { name: 'milestoneNumber', type: 'number', required: true,
      admin: { description: 'Sequential ordinal within the project (1, 2, 3, …).' } },
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'milestoneType',
      type: 'select',
      defaultValue: 'billing',
      options: [
        { label: 'Billing (triggers invoice)', value: 'billing' },
        { label: 'Acceptance (triggers revenue recognition)', value: 'acceptance' },
        { label: 'Payment (release of held funds)', value: 'payment' },
        { label: 'Internal (no financial trigger)', value: 'internal' },
      ],
    },
    currencyField(),
    { name: 'amount', type: 'number', required: true,
      admin: { description: 'Milestone billing / revenue amount in cents. Σ(milestones.amount) ≤ project.contractedAmount.' } },
    { name: 'percentOfContract', type: 'number', min: 0, max: 100,
      admin: { description: 'Optional: amount expressed as % of contract (validates against contracted amount).' } },
    { name: 'plannedDate', type: 'date', required: true },
    { name: 'achievedDate', type: 'date',
      admin: { readOnly: true, description: 'Set when status → achieved. Drives the GL post date.' } },
    { name: 'achievedBy', type: 'relationship', relationTo: 'users',
      admin: { readOnly: true, description: 'User who marked the milestone achieved (SOX §404 four-eyes evidence).' } },
    { name: 'invoice', type: 'relationship', relationTo: 'invoices', index: true,
      admin: { readOnly: true, description: 'Invoice raised for this milestone (set by the milestone:achieved handler).' } },
    { name: 'acceptanceDocumentRef', type: 'text',
      admin: { description: 'Customer acceptance document reference (e.g. signed sign-off PDF in `evidence-attestations`).' } },
    statusField(
      [
        { label: 'Planned', value: 'planned' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Pending Acceptance', value: 'pending_acceptance' },
        { label: 'Achieved (triggers GL post)', value: 'achieved' },
        { label: 'Invoiced', value: 'invoiced' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'planned',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitMilestoneAchieved, auditTrailAfterChange('project-milestones')],
  },
  timestamps: true,
}

export default ProjectMilestones
