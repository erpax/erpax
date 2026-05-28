import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const AuditEvidence: CollectionConfig = {
  slug: 'audit-evidence',
  admin: {
    useAsTitle: 'evidenceTitle',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin', 'audit-staff'],
    update: ['superadmin', 'admin', 'audit-staff'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'evidenceTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'documentType',
      type: 'select',
      options: [
        { label: 'PDF', value: 'pdf' },
        { label: 'Screenshot', value: 'screenshot' },
        { label: 'Signed Approval', value: 'signed-approval' },
        { label: 'Bank Statement', value: 'bank-statement' },
        { label: 'GL Printout', value: 'gl-printout' },
        { label: 'Reconciliation', value: 'reconciliation' },
        { label: 'Workpaper', value: 'workpaper' },
        { label: 'Audit Log', value: 'audit-log' },
        { label: 'Policy', value: 'policy' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'documentFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'evidenceChain',
      type: 'array',
      fields: [
        {
          name: 'actor',
          type: 'text',
        },
        {
          name: 'action',
          type: 'text',
        },
        {
          name: 'actionDate',
          type: 'date',
        },
        {
          name: 'notes',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'confidentiality',
      type: 'select',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Internal', value: 'internal' },
        { label: 'Confidential', value: 'confidential' },
        { label: 'Restricted', value: 'restricted' },
      ],
      defaultValue: 'restricted',
    },
    {
      name: 'retentionPeriod',
      type: 'select',
      options: [
        { label: '3 Years', value: '3-years' },
        { label: '5 Years', value: '5-years' },
        { label: '7 Years', value: '7-years' },
        { label: '10 Years', value: '10-years' },
        { label: 'Indefinite', value: 'indefinite' },
      ],
      defaultValue: '7-years',
    },
  ],
}
