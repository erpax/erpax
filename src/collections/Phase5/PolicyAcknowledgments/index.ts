import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const PolicyAcknowledgments: CollectionConfig = {
  slug: 'policy-acknowledgments',
  admin: {
    useAsTitle: 'employeeName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'policy',
      type: 'relationship',
      relationTo: 'internal-policies',
      required: true,
    },
    {
      name: 'policyVersion',
      type: 'relationship',
      relationTo: 'policy-versions',
    },
    {
      name: 'employeeName',
      type: 'text',
      required: true,
    },
    {
      name: 'employeeId',
      type: 'text',
    },
    {
      name: 'acknowledgedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'acknowledgedBy',
      type: 'text',
    },
    {
      name: 'signedDocument',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Acknowledged', value: 'acknowledged' },
        { label: 'Pending', value: 'pending' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Expired', value: 'expired' },
      ],
      defaultValue: 'pending',
    },
  ],
}
