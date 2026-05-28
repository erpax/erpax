import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const ReportingStandards: CollectionConfig = {
  slug: 'reporting-standards',
  admin: {
    useAsTitle: 'standardName',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer', 'finance'],
    create: ['superadmin'],
    update: ['superadmin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'standardName',
      type: 'text',
      required: true,
    },
    {
      name: 'standardCode',
      type: 'text',
      required: true,
    },
    {
      name: 'standardType',
      type: 'select',
      options: [
        { label: 'GAAP', value: 'gaap' },
        { label: 'IFRS', value: 'ifrs' },
        { label: 'SOX', value: 'sox' },
        { label: 'Tax', value: 'tax' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'jurisdiction',
      type: 'relationship',
      relationTo: 'taxing-jurisdictions',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'version',
      type: 'text',
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
    },
    {
      name: 'referenceMaterial',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
