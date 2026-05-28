import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const ComplianceRequirements: CollectionConfig = {
  slug: 'compliance-requirements',
  admin: {
    useAsTitle: 'requirementName',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'requirementName',
      type: 'text',
      required: true,
    },
    {
      name: 'framework',
      type: 'relationship',
      relationTo: 'compliance-frameworks',
      required: true,
    },
    {
      name: 'requirementType',
      type: 'select',
      options: [
        { label: 'Disclosure', value: 'disclosure' },
        { label: 'Accounting', value: 'accounting' },
        { label: 'Control', value: 'control' },
        { label: 'Reporting', value: 'reporting' },
        { label: 'Policy', value: 'policy' },
        { label: 'Attestation', value: 'attestation' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'testableStatement',
      type: 'richText',
    },
    {
      name: 'applicableEntityTypes',
      type: 'relationship',
      relationTo: 'entity-types',
      hasMany: true,
    },
  ],
}
