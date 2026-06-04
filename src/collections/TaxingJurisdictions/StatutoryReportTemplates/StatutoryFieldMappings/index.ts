/**
 * Statutory Field Mappings — single-folder collection node.
 *
 * @standard SAF-T OECD standard-audit-file-tax
 * @standard XBRL taxonomy-mapping
 * @standard EN-16931 e-invoicing-semantic-model
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/roleBasedAccess'

export const StatutoryFieldMappings: CollectionConfig = {
  slug: 'statutory-field-mappings',
  admin: {
    useAsTitle: 'mappingName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin'],
    update: ['super-admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'mappingName',
      type: 'text',
      required: true,
    },
    {
      name: 'reportTemplate',
      type: 'relationship',
      relationTo: 'statutory-report-templates',
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
}
