import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const AuditTrailEvents: CollectionConfig = {
  slug: 'audit-trail-events',
  admin: {
    useAsTitle: 'collectionName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin'],
    update: ['super-admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'operation',
      type: 'select',
      options: [
        { label: 'Create', value: 'create' },
        { label: 'Update', value: 'update' },
        { label: 'Delete', value: 'delete' },
      ],
      required: true,
    },
    {
      name: 'collectionName',
      type: 'text',
      required: true,
    },
    {
      name: 'documentId',
      type: 'text',
      required: true,
    },
    {
      name: 'changedBy',
      type: 'text',
      required: true,
    },
    {
      name: 'changedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'changesSummary',
      type: 'richText',
    },
    {
      name: 'changeDetails',
      type: 'json',
    },
    {
      name: 'approvedBy',
      type: 'text',
    },
    {
      name: 'approvalStatus',
      type: 'select',
      options: [
        { label: 'Approved', value: 'approved' },
        { label: 'Pending', value: 'pending' },
        { label: 'Flagged', value: 'flagged' },
      ],
    },
    {
      name: 'changeReason',
      type: 'richText',
    },
    {
      name: 'systemDetails',
      type: 'json',
    },
  ],
}
