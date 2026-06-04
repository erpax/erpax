/**
 * Activities — calls / emails / meetings log per lead / opportunity / customer.
 *
 * Slice EEEE (2026-05-10): structured CRM activity log so the team
 * sees the relationship history (next-step recommendations, last-touch
 * date, rep activity volumes).
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard rfc-5545 icalendar
 * @compliance GDPR Art.5(1)(c) data-minimisation
 * @compliance GDPR Art.30 records-of-processing-activities
 * @audit ISO-19011:2018 audit-trail crm-activity
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Leads.ts
 * @see ./Opportunities.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { statusField, notesField, auditFields } from '@/fields/base-accounting-fields'

const Activities: CollectionConfig = {
  slug: 'activities',
  labels: { singular: 'Activity', plural: 'Activities' },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'activityType', 'activityDate', 'assignedTo', 'relatedTo', 'status'],
    description:
      'CRM activity log — calls, emails, meetings, tasks. Linked to lead / opportunity / customer / contact.',
  },
  access: accountingCollectionAccess({ feature: 'crm' }),
  fields: [
    { name: 'subject', type: 'text', localized: true, required: true },
    {
      name: 'activityType',
      type: 'select',
      required: true,
      options: [
        { label: 'Call', value: 'call' },
        { label: 'Email', value: 'email' },
        { label: 'Meeting', value: 'meeting' },
        { label: 'Demo', value: 'demo' },
        { label: 'Task', value: 'task' },
        { label: 'Note', value: 'note' },
        { label: 'LinkedIn / Social Touch', value: 'social' },
        { label: 'Document Send', value: 'document_send' },
        { label: 'Quote Send', value: 'quote_send' },
        { label: 'Site Visit', value: 'site_visit' },
      ],
    },
    {
      name: 'direction',
      type: 'select',
      options: [
        { label: 'Outbound', value: 'outbound' },
        { label: 'Inbound', value: 'inbound' },
        { label: 'Internal', value: 'internal' },
      ],
    },
    { name: 'activityDate', type: 'date', required: true, index: true },
    { name: 'durationMinutes', type: 'number', min: 0 },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'relatedTo',
      type: 'select',
      required: true,
      options: [
        { label: 'Lead', value: 'lead' },
        { label: 'Opportunity', value: 'opportunity' },
        { label: 'Customer', value: 'customer' },
        { label: 'Vendor', value: 'vendor' },
        { label: 'Project', value: 'project' },
      ],
    },
    { name: 'lead', type: 'relationship', relationTo: 'leads' },
    { name: 'opportunity', type: 'relationship', relationTo: 'opportunities' },
    { name: 'customer', type: 'relationship', relationTo: 'customers' },
    { name: 'vendor', type: 'relationship', relationTo: 'vendors' },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'outcome', type: 'select', options: [
      { label: 'Positive — moved forward', value: 'positive' },
      { label: 'Neutral — informational', value: 'neutral' },
      { label: 'Negative — stalled', value: 'negative' },
      { label: 'Action Required', value: 'action_required' },
    ]},
    { name: 'nextStep', type: 'text' },
    { name: 'nextStepDate', type: 'date' },
    statusField(
      [
        { label: 'Planned', value: 'planned' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Deferred', value: 'deferred' },
      ],
      'planned',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('activities'),
  timestamps: true,
}

export default Activities
