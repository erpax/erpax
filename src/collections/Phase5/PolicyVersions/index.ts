import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const PolicyVersions: CollectionConfig = {
  slug: 'policy-versions',
  admin: {
    useAsTitle: 'versionName',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'policy',
      type: 'relationship',
      relationTo: 'internal-policies',
      required: true,
    },
    {
      name: 'versionNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'versionName',
      type: 'text',
      required: true,
    },
    {
      name: 'releaseDate',
      type: 'date',
      required: true,
    },
    {
      name: 'changes',
      type: 'richText',
    },
    {
      name: 'documentUrl',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Final', value: 'final' },
        { label: 'Superseded', value: 'superseded' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
    },
  ],
}
