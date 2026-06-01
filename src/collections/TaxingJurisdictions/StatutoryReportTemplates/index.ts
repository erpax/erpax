/**
 * Statutory Report Templates — single-folder collection node.
 *
 * @standard SAF-T OECD audit-file
 * @standard XBRL business-reporting
 * @standard IFRS-Taxonomy
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const StatutoryReportTemplates: CollectionConfig = {
  slug: 'statutory-report-templates',
  admin: {
    useAsTitle: 'templateName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin'],
    update: ['super-admin'],
    delete: ['super-admin'],
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
