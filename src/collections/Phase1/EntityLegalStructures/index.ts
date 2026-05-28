import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const EntityLegalStructures: CollectionConfig = {
  slug: 'entity-legal-structures',
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
    },
    {
      name: 'legalCode',
      type: 'text',
      required: true,
    },
    {
      name: 'entityType',
      type: 'relationship',
      relationTo: 'entity-types',
      required: true,
    },
    {
      name: 'jurisdiction',
      type: 'relationship',
      relationTo: 'taxing-jurisdictions',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'taxTreatment',
      type: 'select',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'Opaque', value: 'opaque' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
    },
  ],
}
