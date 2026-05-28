import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const FiscalCalendars: CollectionConfig = {
  slug: 'fiscal-calendars',
  admin: {
    useAsTitle: 'fiscalYear',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer', 'finance'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'fiscalYear',
      type: 'text',
      required: true,
    },
    {
      name: 'yearStart',
      type: 'date',
      required: true,
    },
    {
      name: 'yearEnd',
      type: 'date',
      required: true,
    },
    {
      name: 'periods',
      type: 'array',
      fields: [
        {
          name: 'periodName',
          type: 'text',
        },
        {
          name: 'periodNumber',
          type: 'number',
        },
        {
          name: 'startDate',
          type: 'date',
        },
        {
          name: 'endDate',
          type: 'date',
        },
        {
          name: 'isClosed',
          type: 'checkbox',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'open',
    },
  ],
}
