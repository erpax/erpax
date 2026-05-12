/**
 * # Vendors
 *
 * @summary Master data for purchase-side suppliers with bank, tax ID, and commercial terms.
 *
 * ## Core Function
 *
 * The Vendors collection maintains the single source of truth for all supplier party information in the procure-to-pay cycle.
 * Each vendor record captures legal identity (name, tax ID, type), contact details, bank account information for disbursement,
 * and commercial terms (payment terms, default currency, preferred payment method). Country-context drives API routing for
 * VIES validation, sanctions screening, and e-invoicing compliance. Vendor master data is immutable once linked to POs,
 * invoices, or payments; historical audits are maintained per ISO-19011 and SOX §302.
 *
 * ## Architecture
 *
 * Multi-tenancy enforced via tenant field (auto-populated on create). Data isolation prevents cross-tenant vendor visibility
 * or merge operations. Role-based access (tenantMasterDataAccess) ensures only accounting/admin roles can create or modify vendor
 * master records. Tax ID is auto-classified against per-country regex registry on save (classifyTaxId hook); IBAN jurisdiction
 * is auto-derived (deriveCountryFromIban hook). All changes logged to audit-events collection with full field deltas per createdBy,
 * modifiedBy, and ISO-8601 lastModified timestamp (auditTrailAfterChange hook). GL defaults (payable account, expense account,
 * withholding account) allow per-vendor GL posting customization to support multi-entity / multi-currency accounting.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — captures tenant from session context; prevents cross-tenant inserts.
 * - **beforeChange:** classifyTaxId — validates VAT number format against country-specific regex (e.g. VIES for EU),
 *   auto-stamps vatNumberType field (e.g. "VAT (FR)", "EIK / Bulstat" for Bulgaria).
 * - **beforeChange:** deriveCountryFromIban — extracts bank country code from IBAN prefix if bankCountryCode is blank.
 * - **afterChange:** auditTrailAfterChange — writes full change delta to audit-events; createdBy/modifiedBy tracked per user.
 *
 * ## Key Fields
 *
 * - **code (text, unique):** Tenant-unique vendor code (e.g. VEND-BG-0001). Human-readable identifier for PO/invoice reference.
 * - **name (text, required, localized):** Display name; useAsTitle in Payload admin. Multi-language vendor lookup.
 * - **country (text, ISO 3166-1 alpha-2):** Drives country-context routing for tax API (VIES), business registry, screening.
 * - **identity.legalName (text):** Registered legal name per EN-16931 §BT-27; used in formal invoices and tax reporting.
 * - **identity.vendorType (select):** [individual, company, government, non_profit]; determines 1099 eligibility, tax treatment.
 * - **identity.status (select):** [active, on_hold, inactive, archived]; prevents PO issuance to archived vendors.
 * - **contact.email, phone, website (text):** Contact information for RFQ distribution and vendor communication.
 * - **addresses.addresses (relationship, multi):** All known vendor addresses (invoice, remit-to, warehouse). @standard EN-16931 BT-50
 * - **addresses.remitToAddress (relationship):** Default remit-to address for vendor ACH/check payments.
 * - **tax.vatNumber (text, unique per country):** VAT ID or Tax ID; auto-classified by classifyTaxId hook. @standard EN-16931 BT-31
 * - **tax.vatNumberType (text, readOnly):** Auto-stamped classification (e.g. "VAT (FR)", "EIK / Bulstat"). @audit SOX §404
 * - **tax.taxExempt (checkbox):** Exempts vendor from sales/use tax on POs (e.g. non-profit entities).
 * - **tax.vendor1099Eligible (checkbox):** Flags US vendors subject to IRS Form 1099 reporting. @standard US-IRS Form-1099
 * - **tax.tax1099FormType (select):** [1099_nec, 1099_misc, 1099_k, 1099_int, 1099_div]; determines 1099 variant issued.
 * - **tax.withholdingRate (number 0–100):** Backup withholding percentage; impacts payment net amount.
 * - **commercial.paymentTerms (select):** [due_on_receipt, net_7…90, custom]; default payment terms.
 * - **commercial.preferredPaymentMethod (select):** [ach, wire, check, credit_card, sepa, cash, other]; disbursement method.
 * - **commercial.defaultCurrency (text, ISO 4217):** ISO 4217 code (e.g. EUR, BGN); invoice currency default. @standard ISO-4217:2015
 * - **commercial.defaultLocale (text, BCP 47):** Locale for vendor communications (e.g. bg-BG, en-US).
 * - **bank.bankAccountName (text):** Account holder name (may differ from vendor name for holding companies).
 * - **bank.bankIban (text):** IBAN (ISO 13616); auto-derives bankCountryCode on save. @standard ISO-13616-1:2020
 * - **bank.bankSwiftBic (text):** SWIFT/BIC code (ISO 9362); required for international wires. @standard ISO-9362:2022
 * - **bank.bankCountryCode (text):** ISO 3166-1 alpha-2 of bank; auto-populated from IBAN if blank.
 * - **ledger.defaultPayableAccount (relationship):** GL account for AP control (liability). @standard US-GAAP ASC-405
 * - **ledger.defaultExpenseAccount (relationship):** GL account for vendor expenses (e.g. COGS, supplies).
 * - **ledger.defaultWithholdingAccount (relationship):** GL account for withholding tax payable.
 * - **notes.note (textarea):** Internal notes (payment quirks, contact preferences, risk flags).
 * - **metadata (json):** Additional custom fields per tenant extension.
 *
 * ## Core Invariants
 *
 * - **vendorUniquenessPerTenant:** code is unique per tenant; prevents duplicate vendor master entries.
 * - **countryContextRouting:** country field must be ISO 3166-1 alpha-2 and match tax API routing.
 * - **taxIdAutoClassification:** vatNumber + country → vatNumberType is auto-stamped; auditor verifies tax ID compliance.
 * - **bankIbanDerivation:** if bankIban is set, bankCountryCode is auto-derived; prevents mismatched jurisdiction data.
 * - **glDefaultCascade:** when vendor linked in PO lines, glAccount defaults to vendor.ledger.defaultExpenseAccount.
 * - **statusImmutabilityForLinkedPOs:** vendors with active POs/invoices cannot be archived without unlinking.
 * - **multiTenancyIsolation:** tenant field enforced on every read/write; cross-tenant access denied via access control.
 *
 * ## Audit Trail
 *
 * Every vendor record captures: createdBy (user + ISO-8601 timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601),
 * lastModifiedBy (user ID). All vendor changes logged to audit-events collection with full field deltas. Sensitive fields
 * (bankAccountNumber, IBAN, SWIFT) are PII-masked in audit logs per GDPR Art.32. @standard SOX §302 §404
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "vendors_uuid_1",
 *   "tenant": "tenant_uuid_1",
 *   "code": "VEND-BG-BOLGAR",
 *   "name": "ООО Болгар Снабдяване",
 *   "country": "BG",
 *   "identity": {
 *     "legalName": "ООО Болгар Снабдяване",
 *     "vendorType": "company",
 *     "status": "active"
 *   },
 *   "contact": { "email": "sales@bolgar.bg", "phone": "+359 2 123 4567" },
 *   "tax": { "vatNumber": "BG123456789", "vatNumberType": "VAT (BG)" },
 *   "commercial": { "paymentTerms": "net_30", "preferredPaymentMethod": "sepa", "defaultCurrency": "EUR" },
 *   "bank": { "bankIban": "BG80UNCR70001999490", "bankSwiftBic": "UNCRBGSF" },
 *   "createdAt": "2026-02-15T10:30:00Z", "createdBy": "user_uuid_accountant"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Vendor master management, PO issuance, payment setup, tax reporting
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes-via-addresses
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-17442-1:2020 lei
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard EN-16931:2017 §BG-4 seller
 * @accounting US-GAAP ASC-405 liabilities
 * @accounting US-IRS Form-1099 information-return
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance GDPR Art.32 PII-masking-in-audit-logs
 * @audit SOX §302 §404 vendor-master-data-controls
 * @audit ISO-19011:2018 vendor-data-audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see docs/STANDARDS.md §2 vendor-master-data-standards
 */
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
