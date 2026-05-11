/**
 * Workflow Instances — running execution of a `workflow-definition` against
 * a specific document.
 *
 * Slice HHHH (2026-05-10): one instance per (definition × document).
 * The instance walks the steps; each step decision is appended to
 * `stepHistory`; on completion the underlying document is approved /
 * rejected / posted as the workflow dictates.
 *
 * Pairs with `audit-events` — every step transition emits an audit
 * event for ISO 19011 §6.4.6 evidence.
 *
 * @standard ISO/IEC 19510:2013 BPMN-2.0
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-workflow
 * @compliance SOX §404 internal-controls workflow-execution
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./WorkflowDefinitions.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const WorkflowInstances: CollectionConfig = {
  slug: 'workflow-instances',
  labels: { singular: 'Workflow Instance', plural: 'Workflow Instances' },
  admin: {
    useAsTitle: 'instanceId',
    defaultColumns: ['instanceId', 'definition', 'targetCollection', 'targetId', 'currentStep', 'status'],
    description:
      'Running workflow execution. One instance per (definition × document). stepHistory captures decisions for ISO 19011 audit.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    { name: 'instanceId', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'RFC 9562 UUID v4 — idempotency key.' } },
    { name: 'definition', type: 'relationship', relationTo: 'workflow-definitions', required: true, index: true },
    { name: 'definitionVersion', type: 'number', required: true,
      admin: { description: 'Frozen version snapshot — historical instances reference the version that started them.' } },
    { name: 'targetCollection', type: 'text', required: true, index: true },
    { name: 'targetId', type: 'text', required: true, index: true },
    { name: 'submittedBy', type: 'relationship', relationTo: 'users', required: true },
    { name: 'submittedAt', type: 'date', required: true },
    { name: 'currentStep', type: 'number', defaultValue: 0,
      admin: { description: 'Index of the active step (0 = first).' } },
    { name: 'currentAssignee', type: 'relationship', relationTo: 'users',
      admin: { description: 'User currently expected to act.' } },
    { name: 'currentAssigneeRole', type: 'text' },
    { name: 'currentStepDueAt', type: 'date',
      admin: { description: 'When the current step SLA expires (drives escalation).' } },
    {
      name: 'stepHistory',
      type: 'array',
      labels: { singular: 'Step Decision', plural: 'Step History' },
      dbName: 'wfi_history',
      fields: [
        { name: 'stepIndex', type: 'number', required: true },
        { name: 'stepName', type: 'text', required: true },
        { name: 'assignee', type: 'relationship', relationTo: 'users' },
        {
          name: 'decision',
          type: 'select',
          required: true,
          options: [
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
            { label: 'Returned for Clarification', value: 'returned' },
            { label: 'Delegated', value: 'delegated' },
            { label: 'Auto-Approved (SLA timeout)', value: 'auto_approved' },
            { label: 'Auto-Rejected (SLA timeout)', value: 'auto_rejected' },
            { label: 'Escalated', value: 'escalated' },
            { label: 'Skipped (condition false)', value: 'skipped' },
            { label: 'Service Task — Success', value: 'service_success' },
            { label: 'Service Task — Failure', value: 'service_failure' },
          ],
        },
        { name: 'decidedAt', type: 'date', required: true },
        { name: 'comment', type: 'text' },
        { name: 'delegatedTo', type: 'relationship', relationTo: 'users' },
        { name: 'auditEventId', type: 'text',
          admin: { description: 'audit-events.eventId for the cross-collection trail.' } },
      ],
    },
    {
      name: 'finalOutcome',
      type: 'select',
      options: [
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Errored', value: 'errored' },
      ],
    },
    { name: 'completedAt', type: 'date' },
    { name: 'errorMessage', type: 'text',
      admin: { description: 'Error / exception message when finalOutcome = errored.' } },
    statusField(
      [
        { label: 'Pending Start', value: 'pending_start' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Awaiting Action', value: 'awaiting_action' },
        { label: 'Escalated', value: 'escalated' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Errored', value: 'errored' },
      ],
      'pending_start',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('workflow-instances')],
  },
  timestamps: true,
}

export default WorkflowInstances
