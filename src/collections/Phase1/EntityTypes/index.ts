import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const EntityTypes: CollectionConfig = {
  slug: 'entity-types',
  admin: {
    useAsTitle: 'name',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin'],
    update: ['superadmin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'applicableFrameworks',
      type: 'relationship',
      relationTo: 'compliance-frameworks',
      hasMany: true,
    },
  ],
}
