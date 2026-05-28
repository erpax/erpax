/**
 * Workflow Definitions — BPMN-style multi-step approval definitions.
 *
 * Slice HHHH (2026-05-10): the prior approval pattern hard-coded chains
 * inside each collection (purchase-requisitions, expense-reports,
 * leases, etc.). To meet SOX §404 + ISO 27002 §5.4 segregation-of-duties
 * across the full ERP, the rules must be data-driven — operators must
 * be able to author a workflow without a code change. This collection
 * is the template; `workflow-instances` is each running execution.
 *
 * Inspired by BPMN 2.0 (OMG Business Process Model and Notation) but
 * scoped to approval flows; full-process orchestration would adopt
 * Cloudflare Workflows or Durable Object Tasks.
 *
 * @standard ISO/IEC 19510:2013 BPMN-2.0
 * @standard ISO-8601-1:2019 date-time
 * @compliance SOX §404 internal-controls multi-step-approval
 * @compliance ISO-27002 §5.4 segregation-of-duties
 * @audit ISO-19011:2018 audit-trail workflow-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./WorkflowInstances.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const WorkflowDefinitions: CollectionConfig = {
  slug: 'workflow-definitions',
  labels: { singular: 'Workflow Definition', plural: 'Workflow Definitions' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'targetCollection', 'triggerEvent', 'version', 'isActive', 'status'],
    description:
      'Reusable multi-step approval definition. Bound to a target collection + event. Each match creates a workflow-instance.',
  },
  access: accountingCollectionAccess(),
  fields: [
    { name: 'name', type: 'text', localized: true, required: true, index: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'version', type: 'number', required: true, defaultValue: 1,
      admin: { description: 'Version number — bump on edit; older versions remain referenced by historical instances.' } },
    { name: 'targetCollection', type: 'text', required: true, index: true,
      admin: { description: 'Slug of the collection this workflow gates (e.g. purchase-requisitions, expense-reports, leases, journal-entries).' } },
    {
      name: 'triggerEvent',
      type: 'select',
      required: true,
      defaultValue: 'beforeCreate',
      options: [
        { label: 'Before Create (gate before insert)', value: 'beforeCreate' },
        { label: 'Before Status Change (gate transition)', value: 'beforeStatusChange' },
        { label: 'Before Post (GL post gate)', value: 'beforePost' },
        { label: 'Before Approve (final approval gate)', value: 'beforeApprove' },
        { label: 'Manual Trigger Only', value: 'manual' },
      ],
    },
    { name: 'triggerCondition', type: 'textarea',
      admin: { description: 'Optional JSON-Logic expression (e.g. {">":[{"var":"totalAmount"}, 1000000]}). When present, only matching documents start the workflow.' } },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Step', plural: 'Steps' },
      dbName: 'wf_steps',
      fields: [
        { name: 'order', type: 'number', required: true },
        { name: 'name', type: 'text', localized: true, required: true },
        {
          name: 'kind',
          type: 'select',
          required: true,
          defaultValue: 'approval',
          options: [
            { label: 'Approval (single approver)', value: 'approval' },
            { label: 'All-of-N Approval (every approver must accept)', value: 'all_of_n' },
            { label: 'Any-of-N Approval (one approver suffices)', value: 'any_of_n' },
            { label: 'Notification (no approval, just inform)', value: 'notification' },
            { label: 'Service Task (call a handler)', value: 'service_task' },
            { label: 'Decision Branch (split based on condition)', value: 'decision' },
          ],
        },
        {
          name: 'assigneeMode',
          type: 'select',
          options: [
            { label: 'Specific User', value: 'specific_user' },
            { label: 'Role', value: 'role' },
            { label: 'Manager of Submitter', value: 'manager_of_submitter' },
            { label: 'Cost-Center Approver', value: 'cost_center_approver' },
            { label: 'Department Head', value: 'department_head' },
            { label: 'Highest Approver in Chain', value: 'top_of_chain' },
          ],
        },
        { name: 'assigneeUser', type: 'relationship', relationTo: 'users' },
        { name: 'assigneeRole', type: 'text' },
        { name: 'amountThreshold', type: 'number',
          admin: { description: 'Step is skipped when document amount < threshold (cents). Allows tiered approval.' } },
        { name: 'slaHours', type: 'number',
          admin: { description: 'Hours before this step escalates if not actioned.' } },
        { name: 'escalateTo', type: 'relationship', relationTo: 'users' },
        { name: 'allowDelegation', type: 'checkbox', defaultValue: true },
        { name: 'condition', type: 'textarea',
          admin: { description: 'Optional JSON-Logic — when present, step is conditional.' } },
        { name: 'serviceHandler', type: 'text',
          admin: { description: 'When kind = service_task: name of registered handler in src/services/workflow/.' } },
      ],
    },
    { name: 'isActive', type: 'checkbox', defaultValue: true, index: true,
      admin: { description: 'Inactive definitions don\'t spawn new instances; existing in-flight ones complete.' } },
    { name: 'effectiveFrom', type: 'date' },
    { name: 'effectiveTo', type: 'date' },
    { name: 'supersededBy', type: 'relationship', relationTo: 'workflow-definitions' },
    {
      name: 'onTimeoutBehavior',
      type: 'select',
      defaultValue: 'escalate',
      options: [
        { label: 'Escalate to next approver', value: 'escalate' },
        { label: 'Auto-approve', value: 'auto_approve' },
        { label: 'Auto-reject', value: 'auto_reject' },
        { label: 'Notify only (no action)', value: 'notify_only' },
      ],
    },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Superseded', value: 'superseded' },
        { label: 'Archived', value: 'archived' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('workflow-definitions')],
  },
  timestamps: true,
}

export default WorkflowDefinitions
