import type { CollectionConfig } from 'payload'
import { tenantMasterDataAccess } from '@/auth'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { taxonomySelect } from '@/base/accounting/field'
import { VAT_CATEGORY_OPTIONS } from '@/un/cefact/5305'

/**
 * Tax Codes — tax-rate master.
 *
 * Example:
 *   { code: 'EU-DE-VAT-19', taxType: 'vat', ratePercent: 19,
 *     jurisdiction: <ref to EU-DE>, effectiveFrom: '2007-01-01' }
 *
 * @standard EN-16931:2017 §BG-23 vat-breakdown
 * @standard UN-CEFACT-5305 tax-category-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting OECD SAF-T tax-table
 * @see docs/STANDARDS.md §4.1
 */
export const TaxCodes: CollectionConfig = {
  slug: 'tax-codes',
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'label', 'classification.taxType', 'rate.ratePercent', 'classification.jurisdiction', 'validity.effectiveFrom', 'validity.effectiveTo'],
    group: 'Tax',
  },
  access: tenantMasterDataAccess(),
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      async ({ data }) => {
        if (data.effectiveFrom && data.effectiveTo) {
          const from = new Date(data.effectiveFrom).getTime()
          const to = new Date(data.effectiveTo).getTime()
          if (to < from) {
            throw new Error('effectiveTo must be on or after effectiveFrom')
          }
        }
        return data
      },
    ],
    afterChange: [auditTrailAfterChange('tax-codes')],
  },
  timestamps: true,
  fields: [
    // Identity — `code` and `label` kept at top level so `useAsTitle` and
    // `defaultColumns` can resolve them (Payload's useAsTitle does not
    // traverse into groups). Same fix pattern as TaxJurisdictions.
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Tax code (e.g., EU-DE-VAT-19, US-CA-SALES-7.25)' } },
    { name: 'label', type: 'text', required: true,
      admin: { description: 'Human-readable label (e.g., "DE VAT 19% standard rate")' } },
    {
      type: 'group',
      name: 'identity',
      label: 'Identity',
      fields: [
        { name: 'description', type: 'textarea',
          admin: { description: 'Description shown on documents' } },
      ],
    },
    {
      type: 'group',
      name: 'classification',
      label: 'Classification',
      fields: [
        { name: 'taxType', type: 'select', required: true,
          options: [
            { label: 'VAT', value: 'vat' },
            { label: 'GST', value: 'gst' },
            { label: 'Sales Tax', value: 'sales' },
            { label: 'Use Tax', value: 'use' },
            { label: 'Withholding Tax', value: 'withholding' },
            { label: 'Income Tax', value: 'income' },
            { label: 'Excise', value: 'excise' },
            { label: 'Customs / Duty', value: 'customs' },
          ], index: true,
          admin: { description: 'Tax regime' } },
        taxonomySelect('categoryCode', VAT_CATEGORY_OPTIONS, { defaultValue: 'S', description: 'EN-16931 BT-151 / UN/CEFACT 5305 tax category code' }),
        { name: 'jurisdiction', type: 'relationship', relationTo: 'tax-jurisdictions',
          required: true, index: true,
          admin: { description: 'Issuing jurisdiction' } },
      ],
    },
    {
      type: 'group',
      name: 'rate',
      label: 'Rate',
      fields: [
        { name: 'ratePercent', type: 'number', required: true, min: 0, max: 100,
          admin: { description: 'Tax rate as percentage (e.g., 19 for 19%)', step: 0.001 } },
        { name: 'compoundedOn', type: 'relationship', relationTo: 'tax-codes', hasMany: true,
          admin: { description: 'Other tax codes this rate is applied on top of (compound tax)' } },
        { name: 'reverseChargeEligible', type: 'checkbox', defaultValue: false,
          admin: { description: 'EN 16931: tax shifts to buyer (e.g., EU intra-community B2B services)' } },
        { name: 'recoverable', type: 'checkbox', defaultValue: true,
          admin: { description: 'Input tax is recoverable (deductible) for the buyer' } },
      ],
    },
    {
      type: 'group',
      name: 'validity',
      label: 'Validity',
      fields: [
        { name: 'effectiveFrom', type: 'date', required: true, index: true,
          admin: { description: 'ISO 8601 first day this rate applies' } },
        { name: 'effectiveTo', type: 'date', index: true,
          admin: { description: 'ISO 8601 last day this rate applies (open-ended if blank)' } },
        { name: 'isActive', type: 'checkbox', defaultValue: true, index: true,
          admin: { description: 'Enabled for selection on new documents' } },
      ],
    },
    {
      type: 'group',
      name: 'ledger',
      label: 'Ledger',
      fields: [
        { name: 'defaultCollectionAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Output-tax payable / collected account (sales side)' } },
        { name: 'defaultRemittanceAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Input-tax recoverable / remittance account (purchase side)' } },
        { name: 'defaultExpenseAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Non-recoverable tax expense account (when recoverable = false)' } },
      ],
    },
    { name: 'metadata', type: 'json', admin: { description: 'Additional metadata' } },
  ],
}
