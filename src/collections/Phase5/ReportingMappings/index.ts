import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const ReportingMappings: CollectionConfig = {
  slug: 'reporting-mappings',
  admin: {
    useAsTitle: 'mappingName',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'mappingName',
      type: 'text',
      required: true,
    },
    {
      name: 'fromStandard',
      type: 'relationship',
      relationTo: 'reporting-standards',
      required: true,
    },
    {
      name: 'toStandard',
      type: 'relationship',
      relationTo: 'reporting-standards',
      required: true,
    },
    {
      name: 'mappingType',
      type: 'select',
      options: [
        { label: 'Account Mapping', value: 'account-mapping' },
        { label: 'Line Item Mapping', value: 'line-item-mapping' },
        { label: 'Disclosure Mapping', value: 'disclosure-mapping' },
        { label: 'Metric Mapping', value: 'metric-mapping' },
      ],
      required: true,
    },
    {
      name: 'mappingRules',
      type: 'array',
      fields: [
        {
          name: 'sourceElement',
          type: 'text',
        },
        {
          name: 'targetElement',
          type: 'text',
        },
        {
          name: 'transformation',
          type: 'richText',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending Review', value: 'pending-review' },
      ],
      defaultValue: 'pending-review',
    },
  ],
}
