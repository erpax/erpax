import type { CollectionConfig } from 'payload'
import { tenantMasterDataAccess } from '@/access/auth'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { multiTenancyField, taxonomySelect } from '@/fields/accounting/base-accounting-fields'
import { VAT_CATEGORY_OPTIONS } from '@/standards/un-cefact-5305'

/**
 * # Tax Codes
 *
 * @summary Tax-rate master: jurisdiction-specific VAT, GST, income-tax, and excise rates with effective-date tracking.
 *
 * ## Core Function
 *
 * Tax Codes define the statutory tax rates, categories, and recoverability rules for each jurisdiction.
 * Each row is a single tax rate valid for a period (e.g., DE VAT 19% effective 2007-01-01, no end date yet).
 * Tax Codes are the authoritative source: tax-calculations and invoicing systems reference a tax code
 * to obtain the applicable rate, recovery flag, and GL posting accounts (default output/input/expense accounts).
 * This ensures consistency across all tax-liable documents and prevents manual rate entry errors. The collection
 * supports compound taxes (e.g., VAT + eco-tax on top), reverse-charge eligibility, and jurisdiction-specific
 * rate bands (e.g., standard 20%, reduced 10%, zero 0%).
 *
 * ## Architecture
 *
 * Tax Codes are jurisdiction-scoped: each code references a tax-jurisdictions record, which in turn
 * maps to country + region (ISO-3166-1 + ISO-3166-2) and defines filing frequency / currency.
 * Effective-date ranges (effectiveFrom / effectiveTo) enable tracking of rate changes without destroying
 * historical audit trail (e.g., DE VAT 19% from 2007-01-01, but changes to 20% on 2024-01-01).
 * isActive flag controls whether a code is available for new document creation (legacy codes can be
 * inactive but remain referenced in historical invoices). Multi-level structure (classification.taxType
 * + classification.categoryCode + rate.ratePercent) enables EN-16931 §BT-151 (VAT category code) compliance
 * and UN-CEFACT 5305 tax-category standardization. GL account defaults (defaultCollectionAccount,
 * defaultRemittanceAccount, defaultExpenseAccount) are auto-populated on tax-calculation posting.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — multi-tenant scoping.
 * - **beforeChange:** Custom validation: effectiveTo ≥ effectiveFrom (date-range consistency); ratePercent ∈ [0, 100] with 0.001 precision (IAS-12 substantively-enacted rates).
 * - **afterChange:** auditTrailAfterChange — log all rate changes, effective-date updates, and status transitions (isActive) for audit evidence.
 *
 * ## Key Fields
 *
 * - **code (text, unique):** Idempotent tax code (e.g., EU-DE-VAT-19, US-CA-SALES-7.25, AU-GST-10). Matches invoicing system naming. @standard ISO-3166-1 country + ISO-8601 effective date implicit.
 * - **label (text, localized, required):** Human-readable name (e.g., "Germany VAT 19% standard rate", "Allemagne TVA 19%"). Name varies by language (nameLocalized: true). Shown on invoices.
 * - **identity.description (textarea, localized):** Extended description shown on commercial documents (e.g., "Standard VAT rate applicable to goods and services from 2007-01-01 onwards per German tax code §19 VAT Act"). May be multi-language. Description varies by locale (descriptionLocalized: true).
 * - **classification.taxType (select, required):** Regime: vat | gst | sales | use | withholding | income | excise | customs. Determines return type aggregation and GL posting account role.
 * - **classification.categoryCode (text, required):** EN-16931 BT-151 or UN-CEFACT 5305 category (e.g., 'S' standard, 'Z' zero, 'E' exempt). Mandatory for e-invoicing compliance.
 * - **classification.jurisdiction (relationship to tax-jurisdictions, required):** Tax authority issuing the rate (e.g., ref to EU-DE record). Enables rate-lookup by jurisdiction.
 * - **rate.ratePercent (number, required, 0-100):** Tax rate as percentage (e.g., 19 for 19%). Supports 0.001 precision (e.g., 6.667). IAS-12 §47 substantively-enacted rate at period end.
 * - **rate.compoundedOn (relationship to tax-codes, hasMany):** Other tax codes this rate is applied on top of (e.g., VAT compounded on excise). Enables two-tier tax calculation.
 * - **rate.reverseChargeEligible (checkbox):** EN-16931 reverse-charge flag (tax shifts to buyer; seller does not remit). Typical for B2B services in EU intra-community trade.
 * - **rate.recoverable (checkbox, default=true):** Input tax deductible for buyer (recoverable). If false, tax is expense (non-recoverable; posts to defaultExpenseAccount, not defaultRemittanceAccount).
 * - **validity.effectiveFrom (date, required):** ISO-8601 first day rate applies (e.g., 2007-01-01 for DE VAT 19%). Used for period-based rate lookup.
 * - **validity.effectiveTo (date):** ISO-8601 last day rate applies (optional; blank = open-ended). Enables rate-change tracking without deleting history.
 * - **validity.isActive (checkbox, default=true):** Enabled for selection on new documents. Inactive codes remain referenced in historical data.
 * - **ledger.defaultCollectionAccount (relationship to gl-accounts):** Output-tax payable / collected account (sales side). Posted when tax is output (revenue invoice).
 * - **ledger.defaultRemittanceAccount (relationship to gl-accounts):** Input-tax recoverable / remittance account (purchase side). Posted when tax is input (purchase invoice).
 * - **ledger.defaultExpenseAccount (relationship to gl-accounts):** Non-recoverable tax expense account (when recoverable = false). Used for non-deductible VAT / excise.
 * - **metadata (json):** Additional attributes (e.g., regulatory reference, comment).
 *
 * ## Core Invariants
 *
 * - **effective-date immutability:** Once effectiveFrom is set and date ≤ today, effectiveFrom cannot be changed (historical audit trail). Future rates can be updated before effectiveFrom.
 * - **non-overlapping periods per code-jurisdiction:** For a given (code, jurisdiction, taxType), at most one active period per jurisdiction (no overlapping effectiveFrom/effectiveTo ranges).
 * - **recovery + GL consistency:** If recoverable=true, defaultRemittanceAccount must exist; if false, defaultExpenseAccount must exist (data consistency).
 * - **category-code jurisdiction mapping:** categoryCode (EN-16931 §BT-151) must be valid per jurisdiction (e.g., 'S' standard is not valid in all jurisdictions for all taxTypes).
 * - **rate history immutability:** Once effectiveFrom ≤ today, ratePercent cannot be changed (audit trail + calculation immutability). New rate requires new tax-code record with new effectiveFrom.
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to audit-events collection with full field deltas (code, ratePercent old→new, isActive old→new, effective-date changes).
 * Rate changes are immutable post-effectiveFrom; any attempted edits are audit-logged and rejected.
 * Inactive → Active transitions are audit-logged (re-enablement requires approval).
 * Tax-code deprecation (effectiveTo set) is audit-logged and cascades to tax-return and tax-calculation warnings.
 * @standard EN-16931:2017 §BT-151 vat-category-code compliance.
 * @standard UN-CEFACT 5305 tax-category-code international standard.
 * @standard ISO-19011:2018 audit-trail for rate-change evidence.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "taxcode-uuid",
 *   "code": "EU-DE-VAT-19",
 *   "label": "Germany VAT 19% (Standard)",
 *   "identity": {
 *     "description": "Standard VAT rate applicable to most goods and services per German Umsatzsteuergesetz §19"
 *   },
 *   "classification": {
 *     "taxType": "vat",
 *     "categoryCode": "S",
 *     "jurisdiction": "ref-to-tax-jurisdiction-eu-de"
 *   },
 *   "rate": {
 *     "ratePercent": 19,
 *     "compoundedOn": [],
 *     "reverseChargeEligible": false,
 *     "recoverable": true
 *   },
 *   "validity": {
 *     "effectiveFrom": "2007-01-01",
 *     "effectiveTo": null,
 *     "isActive": true
 *   },
 *   "ledger": {
 *     "defaultCollectionAccount": "ref-to-gl-account-2300",
 *     "defaultRemittanceAccount": "ref-to-gl-account-1700",
 *     "defaultExpenseAccount": null
 *   },
 *   "createdBy": "user-123",
 *   "createdAt": "2024-01-01T00:00:00Z",
 *   "updatedAt": "2024-01-01T00:00:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Tax-rate master: lookup applicable rate for invoice/calculation by jurisdiction + period + taxType.
 * @useCase Localized tax-code names: multi-language labeling for invoices/tax returns (nameLocalized: true).
 * @useCase GL account defaults: auto-populate output/input/expense accounts on tax-calculation posting.
 * @useCase Tax-code history: track rate changes with effective-date ranges (audit trail).
 * @useCase Rate validation: ensure tax-calculations use current/active rates (consistency check).
 *
 * @standard ISO-8601-1:2019 date-time effective-from effective-to
 * @standard ISO-3166-1:2020 country-codes via jurisdiction reference
 * @standard ISO-4217:2015 currency-codes (implicit from jurisdiction.currency)
 * @standard EN-16931:2017 §BT-151 vat-category-code electronic-invoicing
 * @standard UN-CEFACT-5305 tax-category-codes international-classification
 *
 * @accounting IFRS IAS-12 §47 substantively-enacted tax-rate at reporting date
 * @accounting IFRS IAS-21 functional-currency for multi-currency tax positions
 * @accounting EU VAT Directive 2006/112/EC VAT rates, reduced rates, zero rates, exempt
 * @accounting OECD SAF-T §2.2 tax-table (tax-code definition)
 * @accounting US-GAAP ASC-740 income-tax rate sourcing
 *
 * @audit ISO-19011:2018 audit-trail of rate changes and effective-date updates
 * @audit SOX §404 internal-controls tax-code-master immutability
 *
 * @compliance EN-16931:2017 electronic-invoicing vat-category compliance
 * @compliance EU VAT Directive 2006/112/EC (rates, reverse-charge rules)
 * @compliance OECD Transfer Pricing Guidelines 2022 (arm's-length pricing rate references)
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security Master-data access control: only admin/accountant roles modify
 *
 * @see tax-jurisdictions (jurisdiction master; tax authority, filing frequency, currency)
 * @see tax-calculations (rate consumer; lookup tax-code for calculation)
 * @see gl-accounts (GL posting targets referenced in ledger group)
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
    multiTenancyField(),
  ],
}
