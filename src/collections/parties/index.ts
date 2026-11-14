/**
 * Parties — one master for everyone the tenant trades with; customer and vendor are roles.
 *
 * `customers` and `vendors` were two collections that differed by one field group (`bank`) and a
 * few role-specific defaults. They were the same thing seen from two sides: the party you sell to
 * and the party you buy from are both a counterparty, and often the SAME counterparty. Two tables
 * could not say that; one table with a `roles` field can — a party that is both carries both.
 *
 * The two lists an operator expects are still there, as SAVED FILTERS rather than tables:
 * `partyPresets()` is two query-preset rows — Customers and Vendors — over this one collection.
 * A role-specific field shows only for the role it belongs to, so the form a user sees is the
 * customer form or the vendor form, not their union.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes via-addresses
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-17442-1:2020 lei
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @standard EN-16931:2017 §BG-4 seller §BG-7 buyer
 * @accounting IFRS IFRS-9 financial-instruments accounts-receivable
 * @accounting US-GAAP ASC-310 receivables ASC-405 liabilities
 * @accounting US-IRS Form-1099 information-return
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance GDPR Art.5 data-minimization
 * @see ./SKILL.md
 */
import type { CollectionConfig, Condition, Payload } from 'payload'
import { tenantMasterDataAccess } from '@/access/collections/shared/multiTenantRead'
import { autoPopulateTenant } from '@/hooks/collections/shared/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/collections/shared/auditTrailAfterChange'
import { classifyTaxId } from '@/hooks/collections/parties/classifyTaxId'
import { deriveCountryFromIban } from '@/hooks/collections/shared/deriveCountryFromIban'
import { loadPresets, preset, type Preset } from '@/utilities/preset'

/** The sides a party can be on. A party may hold both. */
export type PartyRole = 'customer' | 'vendor'

const has = (role: PartyRole): Condition => (data) => Array.isArray(data?.roles) && data.roles.includes(role)
const customer = has('customer')
const vendor = has('vendor')

const Parties: CollectionConfig = {
  slug: 'parties',
  labels: { singular: 'Party', plural: 'Parties' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'roles', 'identity.type', 'commercial.defaultCurrency', 'identity.status'],
    group: 'Billing',
  },
  enableQueryPresets: true,
  access: tenantMasterDataAccess(),
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      // Country-context: classify the VAT/Tax-ID against the per-country regex registry so
      // downstream code (e-invoice routing, VIES gating, sanctions screening) branches off a label.
      classifyTaxId({ taxIdField: 'tax.vatNumber', countryField: 'country', labelField: 'tax.vatNumberType' }),
      // Bank-side jurisdiction comes from the IBAN if `bank.bankCountryCode` is blank.
      deriveCountryFromIban({ ibanField: 'bank.bankIban', countryField: 'bank.bankCountryCode' }),
    ],
    afterChange: [auditTrailAfterChange('parties')],
  },
  timestamps: true,
  fields: [
    // `name` and `code` stay at top level: useAsTitle and defaultColumns do not traverse groups.
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Unique party code (e.g., CUST-0001, VEND-0001)' } },
    { name: 'name', type: 'text', required: true, index: true,
      admin: { description: 'Display name' } },
    { name: 'roles', type: 'select', hasMany: true, required: true, index: true,
      options: [
        { label: 'Customer', value: 'customer' },
        { label: 'Vendor', value: 'vendor' },
      ],
      admin: { description: 'The sides this party is on. One party may be both.' } },
    { name: 'country', type: 'text', index: true,
      admin: { description: 'ISO 3166-1 alpha-2 — drives country-context API routing (VIES, business-registry lookup, e-invoicing).' } },
    {
      type: 'group',
      name: 'identity',
      label: 'Identity',
      fields: [
        { name: 'legalName', type: 'text',
          admin: { description: 'Registered legal name (EN 16931 BT-27)' } },
        { name: 'type', type: 'select', required: true, defaultValue: 'company',
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
          admin: { description: 'All known addresses for this party' } },
        { name: 'billingAddress', type: 'relationship', relationTo: 'addresses',
          admin: { description: 'Default billing address', condition: customer } },
        { name: 'shippingAddress', type: 'relationship', relationTo: 'addresses',
          admin: { description: 'Default shipping address', condition: customer } },
        { name: 'remitToAddress', type: 'relationship', relationTo: 'addresses',
          admin: { description: 'Default remit-to address for payments', condition: vendor } },
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
          description: 'Auto-stamped — e.g. "VAT (BG)", "EIN", "GSTIN", "EIK / Bulstat".' } },
        { name: 'taxExempt', type: 'checkbox', defaultValue: false,
          admin: { description: 'Tax-exempt party (e.g., resale certificate)' } },
        { name: 'taxExemptionCertificate', type: 'text',
          admin: { description: 'Exemption certificate number', condition: customer } },
        { name: 'defaultTaxCode', type: 'relationship', relationTo: 'tax-codes',
          admin: { description: 'Default tax code applied on invoices and bills' } },
        { name: 'vendor1099Eligible', type: 'checkbox', defaultValue: false, index: true,
          admin: { description: 'US: subject to IRS Form 1099 reporting', condition: vendor } },
        { name: 'tax1099FormType', type: 'select',
          options: [
            { label: '1099-NEC', value: '1099_nec' },
            { label: '1099-MISC', value: '1099_misc' },
            { label: '1099-K', value: '1099_k' },
            { label: '1099-INT', value: '1099_int' },
            { label: '1099-DIV', value: '1099_div' },
          ],
          admin: { description: 'IRS 1099 form variant', condition: vendor } },
        { name: 'taxIdType', type: 'select',
          options: [
            { label: 'EIN', value: 'ein' },
            { label: 'SSN', value: 'ssn' },
            { label: 'ITIN', value: 'itin' },
            { label: 'VAT', value: 'vat' },
            { label: 'Other', value: 'other' },
          ],
          admin: { description: 'Tax ID format', condition: vendor } },
        { name: 'withholdingRate', type: 'number', min: 0, max: 100,
          admin: { description: 'Backup withholding / WHT rate %', step: 0.01, condition: vendor } },
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
        { name: 'creditLimit', type: 'number', defaultValue: 0, min: 0,
          admin: { description: 'Credit limit (cents)', step: 0.01, condition: customer } },
        { name: 'creditCurrency', type: 'text', defaultValue: 'EUR',
          admin: { description: 'ISO 4217 currency for credit limit', condition: customer } },
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
          admin: { description: 'Preferred disbursement method', condition: vendor } },
        { name: 'defaultCurrency', type: 'text', required: true, defaultValue: 'EUR',
          admin: { description: 'ISO 4217 default trading currency' } },
        { name: 'defaultLocale', type: 'text', defaultValue: 'en',
          admin: { description: 'BCP 47 locale (e.g. en, en-US, de-DE)' } },
        { name: 'priceList', type: 'text',
          admin: { description: 'Price list / tier identifier', condition: customer } },
      ],
    },
    {
      type: 'group',
      name: 'bank',
      label: 'Bank Account (ACH/Wire)',
      admin: { condition: vendor },
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
        { name: 'defaultReceivableAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default AR control account (asset)', condition: customer } },
        { name: 'defaultRevenueAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default revenue account on invoices', condition: customer } },
        { name: 'defaultDiscountAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default sales-discount contra-revenue account', condition: customer } },
        { name: 'defaultPayableAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default AP control account (liability)', condition: vendor } },
        { name: 'defaultExpenseAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default expense account on bills', condition: vendor } },
        { name: 'defaultWithholdingAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default withholding-tax payable account', condition: vendor } },
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

export default Parties

/** The filter that selects the parties holding a role — the whole of what the old collection was. */
export const whereRole = (role: PartyRole) => ({ roles: { in: [role] } })

/** The two lists that replace the two collections. Seed rows, so they are data, not schema. */
export function partyPresets(): Preset[] {
  return [
    preset('Customers', 'parties', whereRole('customer'), ['code', 'name', 'identity.type', 'commercial.defaultCurrency', 'commercial.creditLimit', 'identity.status']),
    preset('Vendors', 'parties', whereRole('vendor'), ['code', 'name', 'identity.type', 'commercial.defaultCurrency', 'commercial.preferredPaymentMethod', 'identity.status']),
  ]
}

/** Write the two presets that are not there yet. */
export const loadPartyPresets = (payload: Pick<Payload, 'find' | 'create'>) => loadPresets(payload, partyPresets())
