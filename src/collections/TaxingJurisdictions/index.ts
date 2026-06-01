/**
 * Taxing Jurisdictions — single-folder collection node.
 *
 * @standard ISO-3166-1:2020 country-codes
 * @standard OECD tax-jurisdiction
 * @standard EU Directive 2006/112/EC VAT
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { superAdminOnly } from '../../access/auth'

export const TaxingJurisdictions: CollectionConfig = {
  slug: 'taxing-jurisdictions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'type', 'parentJurisdiction', 'isActive'],
    group: 'Compliance Foundation',
    description: 'Read-only reference data for tax jurisdictions',
  },
  access: {
    read: authenticated,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  timestamps: true,
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true, admin: { description: 'Jurisdiction code (e.g., "US", "DE", "BG")' } },
    { name: 'name', type: 'text', required: true, admin: { description: 'Jurisdiction name' } },
    { name: 'type', type: 'select', options: [ { label: 'Country', value: 'country' }, { label: 'Region/State/Province', value: 'region' }, { label: 'Local/City', value: 'local' }, { label: 'Supranational', value: 'supranational' } ], required: true, admin: { description: 'Type of jurisdiction' } },
    { name: 'parentJurisdiction', type: 'relationship', relationTo: 'taxing-jurisdictions', admin: { description: 'Parent jurisdiction' } },
    { name: 'iso2Code', type: 'text', admin: { description: 'ISO 3166-1 alpha-2 code' } },
    { name: 'iso3Code', type: 'text', admin: { description: 'ISO 3166-1 alpha-3 code' } },
    { name: 'primaryCurrency', type: 'text', admin: { description: 'Primary currency code' } },
    { name: 'languages', type: 'array', fields: [ { name: 'languageCode', type: 'text', required: true }, { name: 'languageName', type: 'text' } ], admin: { description: 'Languages spoken in jurisdiction' } },
    { name: 'regulatoryCharacteristics', type: 'json', admin: { description: 'Regulatory characteristics' } },
    { name: 'bankingRequirements', type: 'json', admin: { description: 'Banking and financial institution requirements' } },
    { name: 'filingDeadlines', type: 'array', fields: [ { name: 'filingType', type: 'text', required: true }, { name: 'deadline', type: 'text', required: true }, { name: 'frequency', type: 'text' } ], admin: { description: 'Key filing deadlines' } },
    { name: 'complianceFrameworks', type: 'relationship', relationTo: 'compliance-frameworks', hasMany: true, admin: { description: 'Applicable compliance frameworks' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}
