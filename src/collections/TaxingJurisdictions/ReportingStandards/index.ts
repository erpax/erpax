/**
 * Reporting Standards — single-folder collection node.
 *
 * @accounting IFRS reporting-framework
 * @accounting US-GAAP reporting-framework
 * @standard ESRS EU-sustainability-reporting
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/roleBasedAccess'

export const ReportingStandards: CollectionConfig = {
  slug: 'reporting-standards',
  admin: {
    useAsTitle: 'standardName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer', 'finance'],
    create: ['super-admin'],
    update: ['super-admin'],
    delete: ['super-admin'],
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
