/**
 * Audit Evidence — single-folder collection node.
 *
 * @standard ISA-500 audit-evidence
 * @standard PCAOB AS-1105 audit-evidence
 * @audit ISO-19011:2018 evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../../access/authenticated'
import { adminOnly } from '../../../access/auth'
import { auditTrailAfterChange } from '../../../hooks/auditTrailAfterChange'

export const AuditEvidence: CollectionConfig = {
  slug: 'audit-evidence',
  admin: { useAsTitle: 'title', defaultColumns: ['tenant', 'documentType', 'uploadedDate', 'confidentiality', 'isActive'], group: 'Evidence & Findings' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: adminOnly },
  hooks: { afterChange: [auditTrailAfterChange('auditEvidence')] },
  timestamps: true,
  fields: [
    { name: 'title', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea' },
    { name: 'documentType', type: 'select', options: [{ label: 'PDF Document', value: 'pdf' }, { label: 'Email/Screenshot', value: 'screenshot' }, { label: 'Signed Approval', value: 'signed-approval' }, { label: 'Bank Statement', value: 'bank-statement' }, { label: 'GL Printout', value: 'gl-printout' }, { label: 'Reconciliation', value: 'reconciliation' }, { label: 'Workpaper', value: 'workpaper' }, { label: 'Audit Log', value: 'audit-log' }, { label: 'Policy/Procedure', value: 'policy' }, { label: 'Other', value: 'other' }], required: true },
    { name: 'documentFile', type: 'upload', relationTo: 'media', required: true },
    { name: 'sourceSystem', type: 'text' },
    { name: 'documentDate', type: 'date' },
    { name: 'uploadedDate', type: 'date', required: true },
    { name: 'uploadedBy', type: 'relationship', relationTo: 'users', required: true },
    { name: 'relatedControl', type: 'relationship', relationTo: 'internal-controls' },
    { name: 'relatedControlTest', type: 'relationship', relationTo: 'control-tests' },
    { name: 'relatedAuditSample', type: 'relationship', relationTo: 'audit-samples' },
    { name: 'relatedFinding', type: 'relationship', relationTo: 'audit-findings' },
    { name: 'evidenceChain', type: 'array', fields: [{ name: 'actor', type: 'text', required: true }, { name: 'action', type: 'select', options: [{ label: 'Created', value: 'created' }, { label: 'Collected', value: 'collected' }, { label: 'Reviewed', value: 'reviewed' }, { label: 'Approved', value: 'approved' }, { label: 'Secured', value: 'secured' }], required: true }, { name: 'actionDate', type: 'date' }, { name: 'notes', type: 'text' }] },
    { name: 'confidentiality', type: 'select', options: [{ label: 'Public', value: 'public' }, { label: 'Internal', value: 'internal' }, { label: 'Confidential', value: 'confidential' }, { label: 'Restricted', value: 'restricted' }], defaultValue: 'restricted' },
    { name: 'retentionPeriod', type: 'select', options: [{ label: '3 Years', value: '3-years' }, { label: '5 Years', value: '5-years' }, { label: '7 Years', value: '7-years' }, { label: '10 Years', value: '10-years' }, { label: 'Indefinite', value: 'indefinite' }], defaultValue: '7-years' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text', required: true }] },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}