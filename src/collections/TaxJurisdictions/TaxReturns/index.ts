/**
 * Tax Returns — filed return record (separate from TaxCalculations which is the snapshot).
 *
 * @standard ISO-8601-1:2019 date-time period filed-at
 * @standard ISO-3166-1:2020 country-codes jurisdiction
 * @standard EN-16931:2017 §BG-23 vat-breakdown
 * @accounting OECD SAF-T 2.0 standard-audit-file-tax
 * @accounting US-GAAP ASC-740 income-taxes
 * @audit ISO-19011:2018 audit-trail tax-filing-evidence
 * @compliance SOX §404 internal-controls tax-position
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields } from '@/fields/base-accounting-fields'

const TaxReturns: CollectionConfig = {
  slug: 'tax-returns',
  labels: { singular: 'Tax Return', plural: 'Tax Returns' },
  admin: { useAsTitle: 'returnId', defaultColumns: ['returnId', 'returnType', 'jurisdiction', 'periodEnd', 'status', 'filedAt'] },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'returnId', type: 'text', required: true, unique: true, index: true },
    {
      name: 'returnType',
      type: 'select',
      required: true,
      options: [
        { label: 'VAT (EU monthly)', value: 'vat_monthly' },
        { label: 'VAT (EU quarterly)', value: 'vat_quarterly' },
        { label: 'VAT (EU annual)', value: 'vat_annual' },
        { label: 'EC Sales List', value: 'esl' },
        { label: 'Intrastat', value: 'intrastat' },
        { label: 'Sales Tax (US state)', value: 'sales_tax_us' },
        { label: 'GST (AU/NZ/SG)', value: 'gst' },
        { label: 'Corporate Income Tax', value: 'corporate_income' },
        { label: 'Withholding Tax', value: 'withholding' },
        { label: 'SAF-T submission', value: 'saft' },
      ],
    },
    { name: 'jurisdiction', type: 'relationship', relationTo: 'tax-jurisdictions', required: true },
    { name: 'periodStart', type: 'date', required: true },
    { name: 'periodEnd', type: 'date', required: true, index: true },
    { name: 'taxableSales', type: 'number', defaultValue: 0 },
    { name: 'taxableAcquisitions', type: 'number', defaultValue: 0 },
    { name: 'outputTax', type: 'number', defaultValue: 0 },
    { name: 'inputTax', type: 'number', defaultValue: 0 },
    { name: 'netLiability', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    currencyField(),
    {
      name: 'taxCalculations',
      type: 'relationship',
      relationTo: 'tax-calculations',
      hasMany: true,
      admin: { description: 'Source TaxCalculation snapshots aggregated into this return.' },
    },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'In Review', value: 'in_review' },
        { label: 'Ready to File', value: 'ready' },
        { label: 'Filed', value: 'filed' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Amended', value: 'amended' },
      ],
      'draft',
    ),
    { name: 'filedAt', type: 'date', admin: { readOnly: true } },
    { name: 'filedBy', type: 'relationship', relationTo: 'users' },
    { name: 'authorityReference', type: 'text', admin: { description: 'Confirmation reference returned by the tax authority.' } },
    { name: 'paidAt', type: 'date', admin: { readOnly: true } },
    { name: 'attachments', type: 'array', fields: [{ name: 'media', type: 'relationship', relationTo: 'media' }] },
    ...auditFields(),
    notesField(),
  ],
  hooks: standardCollectionHooks('tax-returns', { beforeChange: [enforceSegregationOfDuties('filedBy', 'createdBy'), autoSetTimestamp('filedAt', (d) => (d as { status?: string }).status === 'filed'), autoSetTimestamp('paidAt', (d) => (d as { status?: string }).status === 'accepted')] }),
  timestamps: true,
}

export default TaxReturns
