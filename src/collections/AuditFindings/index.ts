import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { adminOnly } from '../../access/auth'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'

export const AuditFindings: CollectionConfig = {
  slug: 'audit-findings',
  admin: { useAsTitle: 'title', defaultColumns: ['tenant', 'findingType', 'severity', 'status', 'isActive'], group: 'Evidence & Findings' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: adminOnly },
  hooks: { afterChange: [auditTrailAfterChange('auditFindings')] },
  timestamps: true,
  fields: [
    { name: 'title', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'findingType', type: 'select', options: [{ label: 'Control Deficiency', value: 'control-deficiency' }, { label: 'Significant Deficiency', value: 'significant-deficiency' }, { label: 'Material Weakness', value: 'material-weakness' }, { label: 'Misstatement', value: 'misstatement' }, { label: 'Exception', value: 'exception' }, { label: 'Observation', value: 'observation' }], required: true },
    { name: 'severity', type: 'select', options: [{ label: 'Critical', value: 'critical' }, { label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }], required: true },
    { name: 'relatedControl', type: 'relationship', relationTo: 'internal-controls' },
    { name: 'relatedControlTest', type: 'relationship', relationTo: 'control-tests' },
    { name: 'frequencyOfOccurrence', type: 'select', options: [{ label: 'Isolated', value: 'isolated' }, { label: 'Sporadic', value: 'sporadic' }, { label: 'Recurring', value: 'recurring' }, { label: 'Pervasive', value: 'pervasive' }] },
    { name: 'potentialImpact', type: 'select', options: [{ label: 'No Impact', value: 'none' }, { label: '<$1K', value: 'minimal' }, { label: '$1K-$10K', value: 'moderate' }, { label: '$10K-$100K', value: 'significant' }, { label: '>$100K', value: 'material' }, { label: 'Unknown', value: 'unknown' }] },
    { name: 'identifiedDate', type: 'date', required: true },
    { name: 'identifiedBy', type: 'relationship', relationTo: 'users', required: true },
    { name: 'rootCause', type: 'textarea' },
    { name: 'riskCategory', type: 'select', options: [{ label: 'Financial Reporting', value: 'financial-reporting' }, { label: 'Compliance', value: 'compliance' }, { label: 'Operational', value: 'operational' }, { label: 'Security', value: 'security' }] },
    { name: 'status', type: 'select', options: [{ label: 'Open', value: 'open' }, { label: 'In Remediation', value: 'in-remediation' }, { label: 'Pending Retest', value: 'remediated-pending' }, { label: 'Confirmed', value: 'remediated-confirmed' }, { label: 'Closed', value: 'closed' }], required: true, defaultValue: 'open' },
    { name: 'managementResponse', type: 'textarea' },
    { name: 'managementResponseDate', type: 'date' },
    { name: 'priorYearReference', type: 'text' },
    { name: 'communicatedTo', type: 'array', fields: [{ name: 'recipient', type: 'text', required: true }, { name: 'communicationDate', type: 'date' }] },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}