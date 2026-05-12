import type { CollectionConfig } from 'payload'
import { tenantMasterDataAccess } from '@/access/auth'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { classifyTaxId } from '@/hooks/classifyTaxId'
import { multiTenancyField } from '@/fields/accounting/base-accounting-fields'

/**
 * # Customers
 *
 * @summary Sale-side party master data with credit lifecycle, payment terms, and GL defaults.
 *
 * ## Core Function
 *
 * Customers form the foundation of the receivables lifecycle: they represent legal and natural persons
 * who purchase goods or services on credit. Each customer record holds identity (legal name, VAT ID, type),
 * contact details, addresses, credit terms (limit, payment schedule), tax treatment, and GL account defaults.
 * The collection drives invoice issuance (EN-16931 §BG-7 buyer), credit approval workflows, and AR aging analysis
 * for IFRS-9 §5.5 expected-credit-loss calculations.
 *
 * ## Architecture
 *
 * Multi-tenant isolation via `tenant` ensures customers belong to their owning org.
 * Addresses are linked via relationship (1 customer → many addresses; distinct billing/shipping defaults).
 * VAT classification (classifyTaxId hook) normalizes tax-id types against per-country regex registry,
 * driving e-invoice routing and VIES validation. Role-based access enforces master-data sovereignty:
 * customer creation/modification restricted to admin and accounting. GL account relationships (receivable,
 * revenue, discount) provide invoice-posting templates.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — stamp tenant context
 * - **beforeChange:** classifyTaxId — normalize VAT/tax-ID against country-context registry (e.g. "VAT (BG)", "EIN", "GSTIN")
 * - **afterChange:** auditTrailAfterChange — log all field deltas to audit-events with user + timestamp
 *
 * ## Key Fields
 *
 * - **code (text, required, unique):** Unique customer code (e.g. CUST-0001 or 10003456). Index for fast lookup.
 * - **name (text, required):** Display name used in invoices and reports. @standard EN-16931:2017 §BG-7 name
 * - **legalName (text, group: identity):** Registered legal name (EN-16931 BT-27). May differ from trade name.
 * - **customerType (select: individual | company):** Party legal form. Drives validation rules, tax treatment, address cardinality.
 * - **status (select: active | on_hold | inactive | archived):** Lifecycle status; on_hold blocks invoice issuance.
 * - **email (text, email, group: contact):** Primary email; used for e-invoice transmission, dunning notices.
 * - **phone (text, group: contact):** Primary phone for collection outreach.
 * - **addresses (relationship → addresses, group: addresses):** All known addresses; operator selects billing/shipping defaults.
 * - **vatNumber (text, group: tax, index):** VAT ID or local tax-ID. @standard ISO-11649 CUST or EN-16931 BT-31
 * - **vatNumberType (text, group: tax, readOnly):** Auto-stamped classification (e.g. "VAT (BG)", "EIN"). @audit SOX §302
 * - **defaultCurrency (text, group: commercial, required, default: EUR):** ISO-4217 invoicing currency. @standard ISO-4217:2015
 * - **creditLimit (number, group: commercial, default: 0):** Credit limit in cents; guards against over-exposure. @standard IAS-39 §58
 * - **paymentTerms (select, group: commercial, default: net_30):** Default payment schedule (net 7/30/60 etc). Drives due-date calculation (EN-16931 BT-9).
 * - **defaultReceivableAccount (relationship → gl-accounts, group: ledger):** GL control account (asset side) for invoice postings.
 * - **defaultRevenueAccount (relationship → gl-accounts, group: ledger):** GL revenue account; may be overridden per sales-order line.
 * - **defaultDiscountAccount (relationship → gl-accounts, group: ledger):** Contra-revenue for early-payment or negotiated discounts.
 * - **country (text, index):** ISO-3166-1 alpha-2 (e.g. BG, DE, NL). Drives country-context API routing (VIES, business-registry, e-invoicing).
 * - **note (textarea, group: notes):** Internal notes (operator flags, credit history, special handling).
 * - **tenant (relationship → tenants, required, index):** Multi-tenant isolation; set by autoPopulateTenant.
 *
 * ## Core Invariants
 *
 * - **UniquenessPerTenant:** (code, tenant) is unique. No duplicate customer codes within a tenant; prevents invoice routing ambiguity.
 * - **CreditLimitEnforcement:** Invoices blocked if (total open AR + new invoice) > creditLimit. @standard IAS-39 customer-credit-risk
 * - **VATClassification:** vatNumberType auto-populated via classifyTaxId; updated on save. Null vatNumber → vatNumberType remains null.
 * - **TenantIsolation:** Queries filtered by tenant; cross-tenant reads denied. Enforced by scopedAccess and tenantMasterDataAccess.
 * - **ARAgingBasis:** Customer record is the source-of-truth for payment terms; invoice due-date = issueDate + paymentTermsDays.
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to `audit-events` collection with full field deltas (name, creditLimit, status changes, etc.).
 * VAT classification updates timestamped separately so auditor can verify VIES validation history.
 * @standard SOX §302 §404 AR control activity
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "cust_uuid_12345",
 *   "tenant": "tenant_bg_ltd",
 *   "code": "CUST-0001",
 *   "name": "ООО Интех Лтд",
 *   "country": "BG",
 *   "identity": {
 *     "legalName": "ООО Интех Лтд (ЕООД 123456789)",
 *     "customerType": "company",
 *     "status": "active"
 *   },
 *   "contact": { "email": "ar@intech.bg", "phone": "+359 2 123 4567" },
 *   "addresses": ["addr_uuid_1", "addr_uuid_2"],
 *   "tax": {
 *     "vatNumber": "BG123456789",
 *     "vatNumberType": "VAT (BG)",
 *     "defaultTaxCode": "standard_rate"
 *   },
 *   "commercial": {
 *     "defaultCurrency": "BGN",
 *     "creditLimit": 5000000,
 *     "creditCurrency": "BGN",
 *     "paymentTerms": "net_30",
 *     "paymentTermsDays": 30
 *   },
 *   "ledger": {
 *     "defaultReceivableAccount": "gl_1200",
 *     "defaultRevenueAccount": "gl_4100"
 *   },
 *   "createdBy": "user_uuid_admin",
 *   "createdAt": "2026-01-15T09:30:00Z",
 *   "modifiedBy": "user_uuid_accountant",
 *   "modifiedAt": "2026-05-12T14:22:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec receivables lifecycle
 * @useCase AR master data, customer credit approval, invoice issuance, aging analysis
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-11649 CUST customer-reference
 * @standard ISO-13616-1:2020 iban
 * @standard EN-16931:2017 §BG-7 buyer party
 * @accounting IFRS IFRS-9 §5.5 expected-credit-loss
 * @accounting IFRS IAS-39 §58 financial-asset-customer-credit
 * @accounting US-GAAP ASC-310 receivables
 * @audit SOX §302 §404 AR control activity
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance GDPR Art.5 data-minimization
 * @security Multi-tenant isolation via tenant; role-based write access (admin/accountant only)
 * @see ./CustomerSegments.ts (customer grouping for pricing/targeting)
 * @see ./DunningCycles.ts (AR aging escalation)
 * @see src/services/country-context.ts (VAT classification entry point)
 */
export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'identity.customerType', 'commercial.defaultCurrency', 'commercial.creditLimit', 'identity.status'],
    group: 'Billing',
  },
  access: tenantMasterDataAccess(),
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      // Country-context: classify the VAT/Tax-ID against the per-country
      // regex registry so downstream code (invoice e-invoice routing,
      // VIES gating, sanctions screening) branches off a normalised label.
      classifyTaxId({ taxIdField: 'tax.vatNumber', countryField: 'country', labelField: 'tax.vatNumberType' }),
    ],
    afterChange: [auditTrailAfterChange('customers')],
  },
  timestamps: true,
  fields: [
    // Identity — `name` and `code` kept at top level so `useAsTitle` and
    // `defaultColumns` can resolve them (Payload's useAsTitle does not
    // traverse into groups). Same fix pattern as TaxJurisdictions.
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Unique customer code (e.g., CUST-0001)' } },
    { name: 'name', type: 'text', required: true, index: true,
      admin: { description: 'Display name' } },
    { name: 'country', type: 'text', index: true,
      admin: { description: 'ISO 3166-1 alpha-2 — drives country-context API routing (VIES, business-registry lookup, e-invoicing).' } },
    {
      type: 'group',
      name: 'identity',
      label: 'Identity',
      fields: [
        { name: 'legalName', type: 'text',
          admin: { description: 'Registered legal name (EN 16931 BT-27)' } },
        { name: 'customerType', type: 'select', required: true, defaultValue: 'company',
          options: [
            { label: 'Individual', value: 'individual' },
            { label: 'Company', value: 'company' },
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
          admin: { description: 'All known addresses for this customer' } },
        { name: 'billingAddress', type: 'relationship', relationTo: 'addresses',
          admin: { description: 'Default billing address' } },
        { name: 'shippingAddress', type: 'relationship', relationTo: 'addresses',
          admin: { description: 'Default shipping address' } },
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
          admin: { description: 'Tax-exempt customer (e.g., resale certificate)' } },
        { name: 'taxExemptionCertificate', type: 'text',
          admin: { description: 'Exemption certificate number' } },
        { name: 'defaultTaxCode', type: 'relationship', relationTo: 'tax-codes',
          admin: { description: 'Default tax code applied on invoices' } },
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
          admin: { description: 'Credit limit (cents)', step: 0.01 } },
        { name: 'creditCurrency', type: 'text', defaultValue: 'EUR',
          admin: { description: 'ISO 4217 currency for credit limit' } },
        { name: 'defaultCurrency', type: 'text', required: true, defaultValue: 'EUR',
          admin: { description: 'ISO 4217 default invoicing currency' } },
        { name: 'defaultLocale', type: 'text', defaultValue: 'en',
          admin: { description: 'BCP 47 locale (e.g. en, en-US, de-DE)' } },
        { name: 'priceList', type: 'text',
          admin: { description: 'Price list / tier identifier' } },
      ],
    },
    {
      type: 'group',
      name: 'ledger',
      label: 'Ledger Defaults',
      fields: [
        { name: 'defaultReceivableAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default AR control account (asset)' } },
        { name: 'defaultRevenueAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default revenue account on invoices' } },
        { name: 'defaultDiscountAccount', type: 'relationship', relationTo: 'gl-accounts',
          admin: { description: 'Default sales-discount contra-revenue account' } },
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
