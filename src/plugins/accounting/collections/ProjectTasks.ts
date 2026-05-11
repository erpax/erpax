/**
 * Project Tasks — work breakdown of a project into trackable units.
 *
 * Slice AAAA (2026-05-10): per IFRS-15 §35 over-time recognition needs a
 * progress signal more granular than the project header. Tasks let
 * `time-entries` and `purchase-orders` post against a specific WBS
 * element, so cost-to-cost % complete is computable per task and
 * rolled up to project level.
 *
 * Pairs with `time-entries.task` (labour hours) and
 * `purchase-orders.task` (material commitments).
 *
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-15 §35 over-time-recognition
 * @accounting IFRS IFRS-15 §B18 cost-to-cost
 * @audit ISO-19011:2018 audit-trail wbs-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Projects.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const ProjectTasks: CollectionConfig = {
  slug: 'project-tasks',
  labels: { singular: 'Project Task', plural: 'Project Tasks' },
  admin: {
    useAsTitle: 'taskCode',
    defaultColumns: ['taskCode', 'project', 'name', 'budgetedHours', 'actualHours', 'percentComplete', 'status'],
    description:
      'WBS element under a project. Time-entries + materials post against a task; cost-to-cost progress measurement rolls up.',
  },
  access: accountingCollectionAccess({ feature: 'project_accounting' }),
  fields: [
    multiTenancyField(),
    { name: 'project', type: 'relationship', relationTo: 'projects', required: true, index: true },
    { name: 'parentTask', type: 'relationship', relationTo: 'project-tasks',
      admin: { description: 'Optional parent task for hierarchical WBS (task → subtask).' } },
    { name: 'taskCode', type: 'text', required: true, index: true,
      admin: { description: 'Project-unique task code (e.g. T-001 / WBS 1.2.3).' } },
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'assignee', type: 'relationship', relationTo: 'users' },
    {
      name: 'taskType',
      type: 'select',
      defaultValue: 'work',
      options: [
        { label: 'Work (effort)', value: 'work' },
        { label: 'Milestone (zero duration)', value: 'milestone' },
        { label: 'Summary (rolls up children)', value: 'summary' },
        { label: 'Deliverable', value: 'deliverable' },
      ],
    },
    { name: 'budgetedHours', type: 'number', defaultValue: 0,
      admin: { description: 'Estimated effort hours.' } },
    { name: 'actualHours', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Σ approved time-entries.hours posted to this task.' } },
    { name: 'budgetedCost', type: 'number', defaultValue: 0 },
    { name: 'actualCost', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Σ posted cost (labour + materials) for this task.' } },
    { name: 'percentComplete', type: 'number', min: 0, max: 100, defaultValue: 0 },
    { name: 'plannedStartDate', type: 'date' },
    { name: 'plannedEndDate', type: 'date' },
    { name: 'actualStartDate', type: 'date' },
    { name: 'actualEndDate', type: 'date' },
    { name: 'dependencyTasks', type: 'relationship', relationTo: 'project-tasks', hasMany: true,
      admin: { description: 'Predecessor tasks (finish-to-start by default).' } },
    { name: 'isBillable', type: 'checkbox', defaultValue: true,
      admin: { description: 'When true, time-entries posted here flow into customer invoicing.' } },
    statusField(
      [
        { label: 'Not Started', value: 'not_started' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Blocked', value: 'blocked' },
        { label: 'In Review', value: 'in_review' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'not_started',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('project-tasks')],
  },
  timestamps: true,
}

export default ProjectTasks
