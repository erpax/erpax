/**
 * Remediation Plans — single-folder collection node.
 *
 * @standard COSO-2013 deficiency-remediation
 * @compliance SOX §404 control-remediation
 * @security ISO-27001 A.10 improvement
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/authenticated'
import { adminOnly } from '@/auth'
import { auditTrailAfterChange } from '@/audit/trail/after/change'

export const RemediationPlans: CollectionConfig = {
  slug: 'remediation-plans',
  admin: { useAsTitle: 'title', defaultColumns: ['tenant', 'relatedFinding', 'status', 'targetDate', 'owner', 'isActive'], group: 'Evidence & Findings' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: adminOnly },
  hooks: { afterChange: [auditTrailAfterChange('remediationPlans')] },
  timestamps: true,
  fields: [
    { name: 'title', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'relatedFinding', type: 'relationship', relationTo: 'audit-findings' },
    { name: 'relatedGap', type: 'relationship', relationTo: 'compliance-gaps' },
    { name: 'remediationType', type: 'select', options: [{ label: 'Design Change', value: 'design-change' }, { label: 'Process Change', value: 'process-change' }, { label: 'System Implementation', value: 'system-implementation' }, { label: 'Training', value: 'training' }, { label: 'Documentation', value: 'documentation' }, { label: 'Resource Addition', value: 'resource-addition' }, { label: 'Policy Update', value: 'policy-update' }, { label: 'Organizational Change', value: 'organizational-change' }], required: true },
    { name: 'priority', type: 'select', options: [{ label: 'Critical', value: 'critical' }, { label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }], required: true },
    { name: 'owner', type: 'relationship', relationTo: 'users', required: true },
    { name: 'actionSteps', type: 'array', fields: [{ name: 'sequence', type: 'number', required: true }, { name: 'description', type: 'text', required: true }, { name: 'owner', type: 'text' }, { name: 'targetDate', type: 'date' }, { name: 'status', type: 'select', options: [{ label: 'Not Started', value: 'not-started' }, { label: 'In Progress', value: 'in-progress' }, { label: 'Completed', value: 'completed' }, { label: 'On Hold', value: 'on-hold' }], defaultValue: 'not-started' }, { name: 'completedDate', type: 'date' }] },
    { name: 'targetDate', type: 'date', required: true },
    { name: 'completionDate', type: 'date' },
    { name: 'status', type: 'select', options: [{ label: 'Planned', value: 'planned' }, { label: 'In Progress', value: 'in-progress' }, { label: 'Completed', value: 'completed' }, { label: 'Delayed', value: 'delayed' }, { label: 'On Hold', value: 'on-hold' }, { label: 'Superseded', value: 'superseded' }], required: true, defaultValue: 'planned' },
    { name: 'requiredResources', type: 'textarea' },
    { name: 'budget', type: 'number' },
    { name: 'riskOfDelay', type: 'textarea' },
    { name: 'approvedBy', type: 'relationship', relationTo: 'users' },
    { name: 'approvalDate', type: 'date' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}