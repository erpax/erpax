import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const StatutoryReportTemplates: CollectionConfig = {
  slug: 'statutory-report-templates',
  admin: {
    useAsTitle: 'templateName',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin'],
    update: ['superadmin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'templateName',
      type: 'text',
      required: true,
    },
    {
      name: 'jurisdiction',
      type: 'relationship',
      relationTo: 'taxing-jurisdictions',
      required: true,
    },
    {
      name: 'reportType',
      type: 'select',
      options: [
        { label: 'Annual Report', value: 'annual-report' },
        { label: 'Tax Return', value: 'tax-return' },
        { label: 'Regulatory Filing', value: 'regulatory-filing' },
        { label: 'Financial Statements', value: 'financial-statements' },
        { label: 'Audit Report', value: 'audit-report' },
      ],
      required: true,
    },
    {
      name: 'entityType',
      type: 'relationship',
      relationTo: 'entity-types',
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'sectionName',
          type: 'text',
        },
        {
          name: 'sequence',
          type: 'number',
        },
        {
          name: 'mandatory',
          type: 'checkbox',
        },
      ],
    },
    {
      name: 'templateDocument',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'effectiveFrom',
      type: 'date',
      required: true,
    },
    {
      name: 'effectiveTo',
      type: 'date',
    },
  ],
}
