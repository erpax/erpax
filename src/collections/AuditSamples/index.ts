import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { adminOnly } from '../../access/auth'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'

export const AuditSamples: CollectionConfig = {
  slug: 'audit-samples',
  admin: { useAsTitle: 'sampleId', defaultColumns: ['tenant', 'controlTest', 'sampleItemType', 'testResult', 'isActive'], group: 'Control & Testing' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: adminOnly },
  hooks: { afterChange: [auditTrailAfterChange('auditSamples')] },
  timestamps: true,
  fields: [
    { name: 'sampleId', type: 'text', required: true, unique: true, index: true },
    { name: 'controlTest', type: 'relationship', relationTo: 'control-tests', required: true, index: true },
    { name: 'samplingSequence', type: 'number' },
    { name: 'sampleItemType', type: 'select', options: [{ label: 'Invoice', value: 'invoice' }, { label: 'Invoice Line', value: 'invoice-line' }, { label: 'Journal Entry', value: 'journal-entry' }, { label: 'Payment', value: 'payment' }, { label: 'Vendor', value: 'vendor' }, { label: 'Customer', value: 'customer' }, { label: 'Employee', value: 'employee' }, { label: 'GL Account', value: 'gl-account' }, { label: 'Bank Reconciliation', value: 'bank-reconciliation' }, { label: 'Purchase Order', value: 'purchase-order' }, { label: 'Other', value: 'other' }], required: true },
    { name: 'sampleItemId', type: 'text', required: true },
    { name: 'sampleItemDate', type: 'date' },
    { name: 'sampleItemAmount', type: 'number' },
    { name: 'testResult', type: 'select', options: [{ label: 'Pass', value: 'pass' }, { label: 'Fail', value: 'fail' }, { label: 'Not Yet Tested', value: 'not-tested' }, { label: 'Unable to Test', value: 'unable-test' }] },
    { name: 'exceptionDescription', type: 'textarea' },
    { name: 'exceptionCategory', type: 'select', options: [{ label: 'Missing Approval', value: 'missing-approval' }, { label: 'Unauthorized Approval', value: 'unauthorized-approval' }, { label: 'Amount Mismatch', value: 'amount-mismatch' }, { label: 'Incorrect Classification', value: 'incorrect-classification' }, { label: 'Late Posting', value: 'late-posting' }, { label: 'Duplicate', value: 'duplicate' }, { label: 'Unsupported', value: 'unsupported' }, { label: 'Other', value: 'other' }] },
    { name: 'testedBy', type: 'relationship', relationTo: 'users' },
    { name: 'testedDate', type: 'date' },
    { name: 'notes', type: 'textarea' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}