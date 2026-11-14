/**
 * Statutory Report Templates — single-folder collection node.
 *
 * @standard SAF-T OECD audit-file
 * @standard XBRL business-reporting
 * @standard IFRS-Taxonomy
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/collections/shared/roleBasedAccess'

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
      relationTo: 'tax-jurisdictions',
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
    {
      name: 'fieldMappings',
      type: 'array',
      admin: { description: 'Where each field of this template is sourced from (formerly the statutory-field-mappings collection — a mapping belongs to exactly one template).' },
      fields: [
        {
          name: 'mappingName',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldName',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldType',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Number', value: 'number' },
            { label: 'Date', value: 'date' },
            { label: 'Currency', value: 'currency' },
            { label: 'Percentage', value: 'percentage' },
            { label: 'Boolean', value: 'boolean' },
          ],
        },
        {
          name: 'sourceCollection',
          type: 'text',
        },
        {
          name: 'sourceField',
          type: 'text',
        },
        {
          name: 'transformation',
          type: 'richText',
        },
        {
          name: 'mandatory',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'validationRules',
          type: 'richText',
        },
      ],
    },
  ],
}
