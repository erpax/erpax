import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const AuditCommittees: CollectionConfig = {
  slug: 'audit-committees',
  admin: {
    useAsTitle: 'name',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'charter',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'establishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'meetingFrequency',
      type: 'select',
      options: [
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Semi-annual', value: 'semi-annual' },
        { label: 'Annual', value: 'annual' },
        { label: 'As needed', value: 'as-needed' },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Dissolved', value: 'dissolved' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'audit-committee-members',
      hasMany: true,
    },
  ],
}
