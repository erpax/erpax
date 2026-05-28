import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const EntityLegalStructures: CollectionConfig = {
  slug: 'entity-legal-structures',
  admin: {
    useAsTitle: 'name',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin'],
    update: ['super-admin'],
    delete: ['super-admin'],
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
