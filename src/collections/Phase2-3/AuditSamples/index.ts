import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const AuditSamples: CollectionConfig = {
  slug: 'audit-samples',
  admin: {
    useAsTitle: 'itemIdentifier',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin', 'audit-staff'],
    update: ['super-admin', 'admin', 'audit-staff'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'controlTest',
      type: 'relationship',
      relationTo: 'control-tests',
      required: true,
    },
    {
      name: 'itemIdentifier',
      type: 'text',
      required: true,
    },
    {
      name: 'sampleItemType',
      type: 'select',
      options: [
        { label: 'Invoice', value: 'invoice' },
        { label: 'Payment', value: 'payment' },
        { label: 'Journal Entry', value: 'journal-entry' },
        { label: 'Vendor', value: 'vendor' },
        { label: 'Customer', value: 'customer' },
        { label: 'Employee', value: 'employee' },
        { label: 'GL Account', value: 'gl-account' },
        { label: 'Reconciliation', value: 'reconciliation' },
        { label: 'Purchase Order', value: 'purchase-order' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'testResult',
      type: 'select',
      options: [
        { label: 'Pass', value: 'pass' },
        { label: 'Fail', value: 'fail' },
        { label: 'Not Tested', value: 'not-tested' },
        { label: 'Unable to Test', value: 'unable-test' },
      ],
    },
    {
      name: 'exceptionCategory',
      type: 'select',
      options: [
        { label: 'No Exception', value: 'no-exception' },
        { label: 'Process Exception', value: 'process-exception' },
        { label: 'System Exception', value: 'system-exception' },
        { label: 'Data Exception', value: 'data-exception' },
        { label: 'Missing Documentation', value: 'missing-docs' },
      ],
    },
    {
      name: 'notes',
      type: 'richText',
    },
    {
      name: 'evidence',
      type: 'relationship',
      relationTo: 'audit-evidence',
      hasMany: true,
    },
  ],
}
