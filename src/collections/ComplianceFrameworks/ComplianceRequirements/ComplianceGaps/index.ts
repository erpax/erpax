/**
 * Compliance Gaps — single-folder collection node.
 *
 * @standard ISO-37301:2021 compliance-management
 * @audit ISO-19011:2018 nonconformity
 * @compliance SOX §404 deficiency
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { adminOnly } from '@/access/auth'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'

export const ComplianceGaps: CollectionConfig = {
  slug: 'compliance-gaps',
  admin: { useAsTitle: 'title', defaultColumns: ['tenant', 'requirement', 'severity', 'status', 'isActive'], group: 'Control & Testing' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: adminOnly },
  hooks: { afterChange: [auditTrailAfterChange('complianceGaps')] },
  timestamps: true,
  fields: [
    { name: 'title', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'requirement', type: 'relationship', relationTo: 'compliance-requirements', required: true },
    { name: 'gapType', type: 'select', options: [{ label: 'Missing Control', value: 'missing-control' }, { label: 'Design Deficiency', value: 'design-deficiency' }, { label: 'Operating Deficiency', value: 'operating-deficiency' }, { label: 'Documentation Gap', value: 'documentation-gap' }, { label: 'Resource Gap', value: 'resource-gap' }, { label: 'System Gap', value: 'system-gap' }, { label: 'Process Gap', value: 'process-gap' }], required: true },
    { name: 'severity', type: 'select', options: [{ label: 'Critical', value: 'critical' }, { label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }], required: true },
    { name: 'status', type: 'select', options: [{ label: 'Identified', value: 'identified' }, { label: 'Under Review', value: 'under-review' }, { label: 'Remediation Planned', value: 'remediation-planned' }, { label: 'In Remediation', value: 'in-remediation' }, { label: 'Closed', value: 'closed' }], required: true, defaultValue: 'identified' },
    { name: 'currentState', type: 'textarea' },
    { name: 'requiredState', type: 'textarea' },
    { name: 'rootCause', type: 'textarea' },
    { name: 'identifiedDate', type: 'date', required: true },
    { name: 'identifiedBy', type: 'relationship', relationTo: 'users', required: true },
    { name: 'targetClosureDate', type: 'date' },
    { name: 'actualClosureDate', type: 'date' },
    { name: 'riskExposure', type: 'select', options: [{ label: 'No Impact', value: 'none' }, { label: '<$1K', value: 'minimal' }, { label: '$1K-$10K', value: 'moderate' }, { label: '$10K-$100K', value: 'significant' }, { label: '>$100K', value: 'material' }] },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}