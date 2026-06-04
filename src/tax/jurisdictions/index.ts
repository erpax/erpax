import type { CollectionConfig } from 'payload'
import { tenantMasterDataAccess } from '@/auth'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { currencyField } from '@/base/accounting/field'

/**
 * Tax Jurisdictions — tax authority master.
 *
 * Examples:
 *   { code: 'EU-DE',   country: 'DE', name: 'Germany VAT' }
 *   { code: 'US-CA',   country: 'US', region: 'CA', name: 'California Sales Tax' }
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-3166-2:2020 subdivision-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard EN-16931:2017 §BG-23 vat-breakdown
 * @accounting OECD SAF-T jurisdiction-codes
 * @see docs/STANDARDS.md §4.1
 */
export const TaxJurisdictions: CollectionConfig = {
  slug: 'tax-jurisdictions',
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'name', 'geography.country', 'geography.region', 'filing.currency', 'filing.filingFrequency'],
    group: 'Tax',
  },
  access: tenantMasterDataAccess(),
  hooks: {
    beforeValidate: [autoPopulateTenant],
    afterChange: [auditTrailAfterChange('tax-jurisdictions')],
  },
  timestamps: true,
  fields: [
    // Identity — kept at top level so `useAsTitle` and `defaultColumns`
    // can resolve them (Payload's useAsTitle does not traverse into groups).
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Jurisdiction code (e.g., EU-DE, US-CA, US-FED) — should align with ISO 3166-2 where applicable' } },
    { name: 'name', type: 'text', required: true,
      admin: { description: 'Human-readable name (e.g., "Germany VAT")' } },
    { name: 'authorityName', type: 'text',
      admin: { description: 'Tax authority name (e.g., "Bundeszentralamt für Steuern")' } },
    {
      type: 'group',
      name: 'geography',
      label: 'Geography',
      fields: [
        { name: 'country', type: 'text', required: true, index: true,
          admin: { description: 'ISO 3166-1 alpha-2 country code (e.g., US, DE, GB)' } },
        { name: 'region', type: 'text', index: true,
          admin: { description: 'ISO 3166-2 subdivision (e.g., CA, BY, NSW)' } },
        { name: 'level', type: 'select', required: true, defaultValue: 'national',
          options: [
            { label: 'Federal / National', value: 'national' },
            { label: 'State / Province', value: 'state' },
            { label: 'County', value: 'county' },
            { label: 'City / Municipal', value: 'city' },
            { label: 'Special District', value: 'special_district' },
            { label: 'Supra-National (e.g. EU)', value: 'supranational' },
          ], index: true,
          admin: { description: 'Administrative level' } },
      ],
    },
    {
      type: 'group',
      name: 'registration',
      label: 'Registration',
      fields: [
        { name: 'registrationNumber', type: 'text', index: true,
          admin: { description: 'Tenant registration / VAT / sales-tax permit number' } },
        { name: 'registrationDate', type: 'date',
          admin: { description: 'Date of registration with the authority' } },
        { name: 'deregistrationDate', type: 'date',
          admin: { description: 'Date of deregistration (if any)' } },
      ],
    },
    {
      type: 'group',
      name: 'filing',
      label: 'Filing',
      fields: [
        { name: 'filingFrequency', type: 'select', defaultValue: 'monthly',
          options: [
            { label: 'Monthly', value: 'monthly' },
            { label: 'Bi-Monthly', value: 'bimonthly' },
            { label: 'Quarterly', value: 'quarterly' },
            { label: 'Semi-Annual', value: 'semiannual' },
            { label: 'Annual', value: 'annual' },
            { label: 'On Demand', value: 'on_demand' },
          ], index: true,
          admin: { description: 'How often returns are filed' } },
        { name: 'filingDueDayOfMonth', type: 'number', min: 1, max: 31,
          admin: { description: 'Day of month return is due (e.g. 20)' } },
        currencyField({ required: true }),
      ],
    },
    {
      type: 'group',
      name: 'notes',
      label: 'Notes',
      fields: [
        { name: 'note', type: 'textarea', admin: { description: 'Internal notes' } },
      ],
    },
    { name: 'metadata', type: 'json', admin: { description: 'Additional metadata' } },
  ],
}
