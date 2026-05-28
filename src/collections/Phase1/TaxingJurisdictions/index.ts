import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const TaxingJurisdictions: CollectionConfig = {
  slug: 'taxing-jurisdictions',
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
      name: 'jurisdictionType',
      type: 'select',
      options: [
        { label: 'Country', value: 'country' },
        { label: 'State/Region', value: 'state' },
        { label: 'Local Authority', value: 'local' },
        { label: 'Special Zone', value: 'special-zone' },
      ],
      required: true,
    },
    {
      name: 'isoCountryCode',
      type: 'text',
    },
    {
      name: 'isoRegionCode',
      type: 'text',
    },
    {
      name: 'currency',
      type: 'text',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'taxing-jurisdictions',
    },
    {
      name: 'filingDeadlines',
      type: 'array',
      fields: [
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'dueDate',
          type: 'date',
        },
      ],
    },
  ],
}
