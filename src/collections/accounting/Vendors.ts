import type { CollectionConfig } from 'payload'
import { tenantMasterDataAccess } from '@/access/auth'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { classifyTaxId } from '@/hooks/classifyTaxId'
import { deriveCountryFromIban } from '@/hooks/deriveCountryFromIban'
import { multiTenancyField } from '@/fields/accounting/base-accounting-fields'

/**
 * Vendors — purchase-side party master.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes via-addresses
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-17442-1:2020 lei
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @standard EN-16931:2017 §BG-4 seller
 * @accounting US-GAAP ASC-405 liabilities
 * @accounting US-IRS Form-1099 information-return
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @see docs/STANDARDS.md §2
 */
export const Vendors: CollectionConfig = {
  slug: 'vendors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'identity.vendorType', 'commercial.defaultCurrency', 'commercial.preferredPaymentMethod', 'identity.status'],
    group: 'Billing',
  },
  access: tenantMasterDataAccess(),
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      // Country-context: classify VAT/Tax-ID against the per-country regex registry.
      classifyTaxId({ taxIdField: 'tax.vatNumber', countryField: 'country', labelField: 'tax.vatNumberType' }),
      // Bank-side jurisdiction comes from the IBAN if `bank.bankCountryCode` is blank.
      deriveCountryFromIban({ ibanField: 'bank.bankIban', countryField: 'bank.bankCountryCode' }),
    ],
    afterChange: [auditTrailAfterChange('vendors')],
  },
  timestamps: true,
  fields: [
    // Identity — `name` and `code` kept at top level so `useAsTitle` and
    // `defaultColumns` can resolve them (Payload's useAsTitle does not
    // traverse into groups). Same fix pattern as TaxJurisdictions.
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Unique vendor code (e.g., VEND-0001)' } },
    { name: 'name', type: 'text', required: true, index: true,
      admin: { description: 'Display name' } },
    { name: 'country', type: 'text', index: true,
      admin: { description: 'ISO 3166-1 alpha-2 — drives country-context API routing (VIES, business-registry lookup, sanctions screening, e-invoicing).' } },
    {
      type: 'group',
      name: 'identity',
      label: 'Identity',
      fields: [
        { name: 'legalName', type: 'text',
          admin: { description: 'Registered legal name (EN 16931 BT-27)' } },
        { name: 'vendorType', type: 'select', required: true, defaultValue: 'company',
          options: [
            { label: 'Individual / Sole Proprietor', value: 'individual' },
            { label: 'Company', value: 'company' },
            { label: 'Government', value: 'government' },
            { label: 'Non-Profit', value: 'non_profit' },
          ], index: true,
          admin: { description: 'Party legal form' } },
        { name: 'status', type: 'select', required: true, defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'On Hold', value: 'on_hold' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Archived', value: 'archived' },
          ], index: true,
          admin: { description: 'Lifecycle status' } },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contact',
      fields: [
        { name: 'email', type: 'email', index: true, admin: { description: 'Primary email' } },
        { name: 'phone', type: 'text', admin: { description: 'Primary phone' } },
        { name: 'website', type: 'text', admin: { description: 'Web site' } },
      ],
    },
    {
      type: 'group',
      name: 'addresses',
      label: 'Addresses',
      fields: [
        { name: 'addresses', type: 'relationship', relationTo: 'addresses', hasMany: true,
          admin: { description: 'All known addresses for this vendor' } },
        { name: 'remitToAddress', type: 'relationship', relationTo: 'addresses',
          admin: { description: 'Default remit-to address' } },
      ],
    },
    {
      type: 'group',
      name: 'tax',
      label: 'Tax',
      fields: [
        { name: 'vatNumber', type: 'text', index: true,
          admin: { description: 'VAT / Tax ID (EN 16931 BT-31). Auto-classified against the per-country regex registry on save.' } },
        { name: 'vatNumberType', type: 'text', admin: { readOnly: true,
          description: 'Auto-stamped — e.g. "VAT (FR)", "EIN", "GSTIN", "EIK / Bulstat".' } },
        { name: 'taxExempt', type: 'checkbox', defaultValue: false,
          admin: { description: 'Tax-exempt vendor' } },
        { name: 'defaultTaxCode', type: 'relationship', relationTo: 'tax-codes',
          admin: { description: 'Default tax code applied on bills' } },
        { name: 'vendor1099Eligible', type: 'checkbox', defaultValue: false, index: true,
          admin: { description: 'US: subject to IRS Form 1099 reporting' } },
        { name: 'tax1099FormType', type: 'select',
          options: [
            { label: '1099-NEC', value: '1099_nec' },
            { label: '1099-MISC', value: '1099_misc' },
            { label: '1099-K', value: '1099_k' },
            { label: '1099-INT', value: '1099_int' },
            { label: '1099-DIV', value: '1099_div' },
          ],
          admin: { description: 'IRS 1099 form variant' } },
        { name: 'taxIdType', type: 'select',
          options: [
            { label: 'EIN', value: 'ein' },
            { label: 'SSN', value: 'ssn' },
            { label: 'ITIN', value: 'itin' },
            { label: 'VAT', value: 'vat' },
            { label: 'Other', value: 'other' },
          ],
          admin: { description: 'Tax ID format' } },
        { name: 'withholdingRate', type: 'number', min: 0, max: 100,
          admin: { description: 'Backup withholding / WHT rate %', step: 0.01 } },
      ],
    },
    {
      type: 'group',
      name: 'commercial',
      label: 'Commercial Terms',
      fields: [
        { name: 'paymentTerms', type: 'select', defaultValue: 'net_30',
          options: [
            { label: 'Due on Receipt', value: 'due_on_receipt' },
            { label: 'Net 7', value: 'net_7' },
            { label: 'Net 14', value: 'net_14' },
            { label: 'Net 30', value: 'net_30' },
            { label: 'Net 45', value: 'net_45' },
            { label: 'Net 60', value: 'net_60' },
            { label: 'Net 90', value: 'net_90' },
            { label: 'Custom', value: 'custom' },
          ],
          admin: { description: 'Default payment terms' } },
        { name: 'paymentTermsDays', type: 'number', min: 0,
          admin: { description: 'Custom net days (used when paymentTerms = custom)' } },
        { name: 'preferredPaymentMethod', type: 'select', defaultValue: 'ach',
          options: [
            { label: 'ACH', value: 'ach' },
            { label: 'Wire', value: 'wire' },
            { label: 'Check', value: 'check' },
            { label: 'Credit Card', value: 'credit_card' },
            { label: 'SEPA', value: 'sepa' },
            { label: 'Cash', value: 'cash' },
            { label: 'Other', value: 'other' },
          ],
          admin: { description: 'Preferred disbursement method' } },
        { name: 'defaultCurrency', type: 'text', required: true, defaultValue: 'EUR',
          admin: { description: 'ISO 4217 default purchasing currency' } },
        { name: 'defaultLocale', type: 'text', defaultValue: 'en',
          admin: { description: 'BCP 47 locale' } },
      ],
    },
    {
      type: 'group',
      name: 'bank',
      label: 'Bank Account (ACH/Wire)',
      fields: [
        { name: 'bankAccountName', type: 'text', admin: { description: 'Account holder name' } },
        { name: 'bankName', type: 'text', admin: { description: 'Bank name' } },
        { name: 'bankRoutingNumber', type: 'text',
          admin: { description: 'ABA routing (US) / sort code (UK)' } },
        { name: 'bankAccountNumber', type: 'text',
          admin: { description: 'Account number (last 4 visible recommended)' } },
        { name: 'bankIban', type: 'text', admin: { description: 'IBAN (ISO 13616)' } },
        { name: 'bankSwiftBic', type: 'text', admin: { description: 'SWIFT/BIC (ISO 9362)' } },
        { name: 'bankCountryCode', type: 'text',
          admin: { description: 'ISO 3166-1 alpha-2 country of bank' } },
      ],
    },
    {
      type: 'group',
      name: 'ledger',
      label: 'Ledger Defaults',
      fields: [
        { name: 'defaultPayableAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default AP control account (liability)' } },
        { name: 'defaultExpenseAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default expense account on bills' } },
        { name: 'defaultWithholdingAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Withholding tax payable account' } },
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
    multiTenancyField(),
  ],
}
