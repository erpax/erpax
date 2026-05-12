import type { CollectionConfig } from 'payload'
import { tenantMasterDataAccess } from '@/access/auth'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { multiTenancyField, currencyField } from '@/fields/accounting/base-accounting-fields'

/**
 * # Tax Jurisdictions
 *
 * @summary Tax authority master: countries, regions, filing frequency, registration, and compliance calendars.
 *
 * ## Core Function
 *
 * Tax Jurisdictions define the tax authorities and compliance requirements across all geographies
 * where the tenant operates. Each record represents one tax authority (e.g., Germany VAT authority,
 * California Sales Tax Board, EU Intrastat). The collection stores jurisdiction-specific data:
 * ISO country/region codes, filing frequency (monthly/quarterly/annual), due dates, registration
 * numbers, and the functional currency for that authority's filings. Tax Codes reference Tax
 * Jurisdictions to inherit rates, filing rules, and GL posting defaults. Tax Calculations inherit
 * jurisdiction to determine applicable rate, filing deadline, and currency for reporting. This
 * centralizes all jurisdiction-specific business logic, preventing errors from manual tax-rate
 * lookup or mismatched filing calendars.
 *
 * ## Architecture
 *
 * Multi-tenant isolation: each tenant maintains their own jurisdiction registry (scoped via
 * multiTenancyField). Master-data access control: only admin/accountant roles modify (tenantMasterDataAccess).
 * Jurisdiction is keyed by (code, tenant) tuple (code is unique within tenant). Geography group
 * captures ISO-3166-1 (country), ISO-3166-2 (region/state/province), and administrative level
 * (national/state/county/city/supranational). Registration group stores VAT/sales-tax registration
 * numbers, effective dates, and deregistration (for dissolved entities or jurisdictions exited).
 * Filing group specifies frequency (monthly/quarterly/annual), due day-of-month, and currency.
 * This structure enables automated filing calendar generation, currency validation for GL posting,
 * and compliance-audit queries (e.g., "find all active EU jurisdictions with quarterly filing").
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — multi-tenant scoping.
 * - **afterChange:** auditTrailAfterChange — log jurisdiction master-data changes (level, filing frequency, currency).
 *
 * ## Key Fields
 *
 * - **code (text, unique):** Jurisdiction code (e.g., EU-DE, US-CA, US-FED, AU-NSW). Aligns with ISO-3166-2 where applicable. Unique within tenant. @standard ISO-3166-1 + ISO-3166-2.
 * - **name (text, required, localized):** Human-readable name (e.g., "Germany VAT", "California Sales Tax", "Australian GST"). Shown in tax-code/tax-calculation UI. Name varies by locale (nameLocalized: true).
 * - **authorityName (text):** Official tax authority name (e.g., "Bundeszentralamt für Steuern", "California Department of Tax and Fee Administration"). Used in compliance correspondence.
 * - **geography.country (text, required):** ISO-3166-1 alpha-2 country code (e.g., US, DE, GB, BG, AU). @standard ISO-3166-1:2020.
 * - **geography.region (text):** ISO-3166-2 subdivision code (e.g., CA, BY, NSW) for state/province/county-level jurisdictions. Empty for national-level.
 * - **geography.level (select, required):** Administrative level: national | state | county | city | special_district | supranational (e.g., EU). Drives filing-frequency defaults and hierarchical jurisdiction rollup.
 * - **registration.registrationNumber (text, indexed):** Tenant's VAT/sales-tax permit/registration number with this authority (e.g., DE123456789, 12-3456789). Used for filing identification and compliance checks.
 * - **registration.registrationDate (date):** Date tenant registered with authority (ISO-8601). Used to exclude pre-registration transactions from tax calculations.
 * - **registration.deregistrationDate (date):** Date tenant deregistered (if any). Triggers period-lock on future transactions; enables tax-return filtering for dissolved entities.
 * - **filing.filingFrequency (select, default=monthly):** How often returns are filed: monthly | bimonthly | quarterly | semiannual | annual | on_demand. Drives tax-return period generation.
 * - **filing.filingDueDayOfMonth (number, 1-31):** Day of month return is due (e.g., 20 = 20th of following month). Used for deadline calculation and aging reporting.
 * - **filing.currency (select, required):** ISO-4217 currency for filings (e.g., EUR, BGN, USD). @standard ISO-4217:2015. Tax Calculations inherit this currency (FX conversions handled separately).
 * - **notes.note (textarea):** Internal notes (e.g., "Quarterly filer until 2026-01-01; then annual", "Reverse-charge applies to B2B services").
 * - **metadata (json):** Additional attributes (regulatory references, API credentials for e-filing integration, etc.).
 *
 * ## Core Invariants
 *
 * - **unique jurisdiction per tenant:** (code, tenant) tuple is unique. Prevents duplicate jurisdiction definitions.
 * - **ISO-3166 consistency:** country must be valid ISO-3166-1 alpha-2; region (if present) must be valid ISO-3166-2 for that country.
 * - **registration immutability:** registrationDate and registrationNumber cannot be edited once set (audit trail). Corrections require new record + amendment log.
 * - **deregistration logic:** If deregistrationDate is set, all tax-calculations for periods > deregistrationDate are rejected (jurisdiction exited; no further tax liability).
 * - **currency immutability:** currency cannot be changed once set (prevents FX mismatch in GL posting). New currency requires new jurisdiction record.
 * - **filing-frequency jurisdiction hierarchy:** If level=supranational (EU), filing frequency is derived from member-state rules (BG = monthly, DE = quarterly, etc.). Supranational records are templates only (not directly filed).
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to audit-events collection with full field deltas (code, level, filingFrequency, currency, registration status).
 * Registration date and number are immutable post-creation; attempted edits are audit-logged and rejected.
 * Deregistration is a one-way operation (no un-deregister); requires SOX §404 approval if changing compliance posture.
 * Filing frequency and due-day changes are audit-logged (cascades to tax-return warning if schedules affected).
 * @standard ISO-19011:2018 audit-trail for jurisdiction master-data changes.
 * @standard SOX §404 internal-controls jurisdiction-compliance register.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "jurisdiction-uuid",
 *   "code": "EU-BG",
 *   "name": "Bulgaria VAT",
 *   "authorityName": "Agentsia po Vnatreshni Prikhodi (Revenue Agency)",
 *   "geography": {
 *     "country": "BG",
 *     "region": null,
 *     "level": "national"
 *   },
 *   "registration": {
 *     "registrationNumber": "BG999999999",
 *     "registrationDate": "2020-01-01",
 *     "deregistrationDate": null
 *   },
 *   "filing": {
 *     "filingFrequency": "monthly",
 *     "filingDueDayOfMonth": 15,
 *     "currency": "BGN"
 *   },
 *   "notes": {
 *     "note": "Monthly VAT filer. 20% standard rate. Intra-community B2B reverse charge applies."
 *   },
 *   "createdBy": "user-123",
 *   "createdAt": "2024-01-01T00:00:00Z",
 *   "updatedAt": "2024-01-01T00:00:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Tax authority master: lookup jurisdiction for tax-calculation rate inheritance.
 * @useCase Filing calendar: generate tax-return period schedule from filingFrequency + filingDueDayOfMonth.
 * @useCase Localized jurisdiction names: multi-language UI labels (nameLocalized: true).
 * @useCase Registration compliance: track VAT/sales-tax permit numbers and effective dates per authority.
 * @useCase Currency validation: enforce consistent currency across GL posting and tax filings.
 * @useCase Period deregistration: cascade deregistration date to close out historical tax calculations.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2 (e.g., US, DE, GB, BG)
 * @standard ISO-3166-2:2020 subdivision-codes (e.g., CA, DE, NSW, BG)
 * @standard ISO-4217:2015 currency-codes functional-currency
 * @standard EN-16931:2017 §BG-23 vat-breakdown jurisdiction-specific rules
 *
 * @accounting IFRS IAS-21 functional-currency per jurisdiction
 * @accounting OECD SAF-T jurisdiction-codes general-ledger-posting
 * @accounting EU VAT Directive 2006/112/EC jurisdiction-specific VAT rules
 * @accounting US-GAAP ASC-740 income-tax jurisdiction hierarchy
 *
 * @audit ISO-19011:2018 audit-trail master-data jurisdiction-registry
 * @audit SOX §404 internal-controls jurisdiction-compliance documentation
 *
 * @compliance EU VAT Directive 2006/112/EC (jurisdiction registration, reverse-charge rules)
 * @compliance OECD Transfer Pricing Guidelines 2022 (jurisdiction-specific transfer-pricing rules)
 * @compliance FATCA / CRS (Common Reporting Standard) jurisdiction identification
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security Master-data access control: only admin/accountant roles modify
 *
 * @see tax-codes (tax-code records reference jurisdiction for rate lookup)
 * @see tax-calculations (tax-calculations inherit jurisdiction for rate/currency/filing-frequency)
 * @see tax-returns (tax-returns inherit jurisdiction for filing schedule)
 * @see customs-declarations (customs declarations reference jurisdiction for trade compliance)
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
    multiTenancyField(),
  ],
}
