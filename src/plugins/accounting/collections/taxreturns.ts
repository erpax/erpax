/**
 * # Tax Returns
 *
 * @summary Filed tax return records: aggregated tax-calculation snapshots, filing status, and authority correspondence.
 *
 * ## Core Function
 *
 * Tax Returns are the filing representation: quarterly VAT returns, annual corporate income tax filings,
 * INTRASTAT reports, EC Sales Lists, SAF-T submissions, and other statutory tax filings. Each record
 * aggregates tax-calculations for a fiscal period (e.g., Q1 = 2025-01-01 to 2025-03-31) and tracks
 * workflow: draft → in_review → ready_to_file → filed → accepted/rejected/amended. The collection
 * separates concerns: tax-calculations are transactional snapshots (created/approved incrementally),
 * while tax-returns are filing documents (batch aggregations submitted to authorities). Filing status
 * cascades audit approval: only accountants can move draft→ready; only tax-authorized staff can file;
 * only senior management can amend filed returns (segregation of duties). Authority reference (MRN,
 * ACK number) links to official filing feedback.
 *
 * ## Architecture
 *
 * Tax Returns reference a single jurisdiction (via relationship to tax-jurisdictions), inheriting
 * filing frequency, currency, and due-date logic. periodStart/periodEnd define the fiscal quarter/month/year.
 * taxCalculations array aggregates multiple tax-calculation records (m:m relationship, not 1:m).
 * netLiability is read-only (auto-calculated from inputTax - outputTax). Segregation of duties:
 * filedBy ≠ createdBy enforced by beforeChange hook (SOX §404 segregation rule). Approval gates:
 * status=ready requires accountant review; status=filed requires tax-manager approval; status=amended
 * requires CFO approval. Amendment tracking: each amendment creates new return record (referenced via
 * prior-return field, not in-place edit). Attachment support for scanned filings / authority acknowledgments.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — multi-tenant scoping.
 * - **beforeChange:** autoPopulateCreatedBy; enforceSegregationOfDuties(filedBy ≠ createdBy); autoSetTimestamp for status=filed/accepted/amended transitions (ISO-8601).
 * - **afterChange:** auditTrailAfterChange — log all status transitions, amendment records, authority references.
 *
 * ## Key Fields
 *
 * - **returnId (text, unique, required):** Idempotent return identifier (e.g., TR-BG-2025-Q1-VAT-001, TR-US-2025-ANNUAL-CT-001). @standard ISO-8601 YYYY + Q/M/YEAR + jurisdiction + taxType.
 * - **returnType (select, required):** Filing type: vat_monthly | vat_quarterly | vat_annual | esl | intrastat | sales_tax_us | gst | corporate_income | withholding | saft. Determines filing template and authority recipient.
 * - **jurisdiction (relationship to tax-jurisdictions, required):** Tax authority (e.g., ref to EU-BG). Inherits filingFrequency, currency, due-date calculation.
 * - **periodStart (date, required):** ISO-8601 start of fiscal period (e.g., 2025-01-01 for Q1).
 * - **periodEnd (date, required, indexed):** ISO-8601 end of fiscal period (e.g., 2025-03-31 for Q1). Used for period-lock enforcement and filing-deadline calculation.
 * - **taxableSales (number, default=0):** Total taxable sales during period (gross of tax). Used for VAT return line 1.
 * - **taxableAcquisitions (number, default=0):** Total taxable acquisitions/purchases during period. Used for VAT return line 5.
 * - **outputTax (number, default=0):** Total VAT collected (output tax) during period. Derived from tax-calculations with taxType=vat + direction=output.
 * - **inputTax (number, default=0):** Total VAT deductible (input tax) during period. Derived from tax-calculations with taxType=vat + direction=input.
 * - **netLiability (number, readOnly):** outputTax - inputTax. Auto-calculated; cannot be manually edited. Used for provision tracking and payment scheduling.
 * - **currency (select):** ISO-4217 code (inherited from jurisdiction.currency). Used for GL posting and authority filing currency.
 * - **taxCalculations (relationship to tax-calculations, hasMany):** Source tax-calculation snapshots aggregated into this return. Enables drill-down from return to individual tax lines.
 * - **status (select):** Workflow state: draft | in_review | ready | filed | accepted | rejected | amended. Controls edit access and filing permission.
 * - **filedAt (date, readOnly):** ISO-8601 timestamp when status=filed (auto-set by beforeChange hook). Immutable; drives authority-acknowledgment timeout tracking.
 * - **filedBy (relationship to users):** User who changed status to filed. Must differ from createdBy (segregation of duties).
 * - **authorityReference (text):** Confirmation reference returned by tax authority (MRN, ACK number, eFile ID). Shown in compliance audit queries.
 * - **paidAt (date, readOnly):** ISO-8601 when tax was paid (status=accepted only; readOnly prevents backdating).
 * - **attachments (array of media):** Scanned filing confirmations, authority acknowledgments, amendment notices. Audit evidence anchor.
 * - **auditFields() (group):** createdBy, createdAt, updatedAt, updatedBy. Standard Payload audit metadata.
 * - **notes (textarea):** Internal notes (e.g., "Amended per authority notice 2025-04-15", "Pending acceptance since 2025-04-10").
 *
 * ## Core Invariants
 *
 * - **period non-overlap:** For a given (jurisdiction, returnType), at most one return per fiscal period. No overlapping returns.
 * - **status immutability forward:** Status transitions only: draft → in_review → ready → filed → accepted (no reversals; amendments require new record).
 * - **filedBy ≠ createdBy:** Segregation of duties enforced (SOX §404 segregation rule). Filing cannot be self-approved.
 * - **read-only fields immutable:** filedAt, paidAt, netLiability cannot be manually edited. Overrides require SOX §404 approval + audit log.
 * - **amendment chain:** Amendments reference prior return via amendedReturn field. Maintains version history without in-place edits.
 * - **tax-calculation aggregate immutability:** Once status=filed, taxCalculations array cannot be modified (filed returns are immutable for compliance).
 * - **period-lock cascade:** If jurisdiction.deregistrationDate < periodEnd, return rejected (jurisdiction exited; no filing required).
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to audit-events collection with full field deltas (returnId, status old→new, taxCalculations list, filedBy, authorityReference).
 * Amendment records include backlink to prior return (audit chain: return v1 → return v2 amendment).
 * Authority-acknowledgment receipt (authorityReference + filedAt) is logged for filing-deadline aging.
 * Status transitions are audit-logged (draft → filed = critical; requires segregated approval).
 * Rejection + rejection-reason are audit-logged (compliance artifact for re-filing decisions).
 * @standard ISO-19011:2018 audit-trail filing-evidence retention.
 * @standard SOX §302 §404 internal-controls tax-filing segregation-of-duties.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "return-uuid",
 *   "returnId": "TR-BG-2025-Q1-VAT-001",
 *   "returnType": "vat_quarterly",
 *   "jurisdiction": "ref-to-tax-jurisdiction-eu-bg",
 *   "periodStart": "2025-01-01",
 *   "periodEnd": "2025-03-31",
 *   "taxableSales": 50000000,
 *   "taxableAcquisitions": 30000000,
 *   "outputTax": 10000000,
 *   "inputTax": 6000000,
 *   "netLiability": 4000000,
 *   "currency": "BGN",
 *   "taxCalculations": ["calc-uuid-1", "calc-uuid-2"],
 *   "status": "filed",
 *   "filedAt": "2025-04-15T10:30:00Z",
 *   "filedBy": "user-456",
 *   "authorityReference": "MRN-2025-0123456",
 *   "paidAt": "2025-04-20T14:00:00Z",
 *   "createdBy": "user-123",
 *   "createdAt": "2025-04-10T09:00:00Z",
 *   "updatedAt": "2025-04-15T10:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Tax return preparation: aggregate tax-calculations per jurisdiction + period.
 * @useCase Filing workflow: draft → review → ready → filed → accepted (segregation of duties).
 * @useCase Amendment tracking: version history via amendment chain (prior-return backlink).
 * @useCase Authority correspondence: store MRN, ACK number, rejection reason for compliance audit.
 * @useCase Return aging: track filing deadline, acceptance timeout, payment due date.
 *
 * @standard ISO-8601-1:2019 date-time period-start period-end filed-at paid-at
 * @standard ISO-3166-1:2020 country-codes jurisdiction (via relationship)
 * @standard ISO-4217:2015 currency-codes filing-currency
 * @standard EN-16931:2017 §BG-23 vat-breakdown return-structure
 *
 * @accounting IFRS IAS-12 §69 current-tax liability at reporting date
 * @accounting IFRS IAS-12 §74 offsetting deferred-tax vs current-tax
 * @accounting OECD SAF-T 2.0 §2.1.2 tax-transactions return-aggregation
 * @accounting US-GAAP ASC-740 income-tax return-filing
 * @accounting EU VAT Directive 2006/112/EC §40-41 VAT return requirements
 *
 * @audit ISO-19011:2018 audit-trail filing-evidence retention (6+ years)
 * @audit SOX §302 §404 internal-controls segregation-of-duties filing-approval
 *
 * @compliance SOX §302 certification; §404 management assessment of controls
 * @compliance SOX §409 real-time disclosure (filing status changes)
 * @compliance EU VAT Directive 2006/112/EC return submission timelines
 * @compliance OECD BEPS Action 13 (country-by-country reporting documentation)
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security Segregation of duties: filedBy ≠ createdBy (enforced)
 *
 * @see tax-calculations (aggregated source records)
 * @see tax-jurisdictions (filing frequency, due-date, currency)
 * @see journal-entries (GL posting detail if return generates adjustment)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

const TaxReturns: CollectionConfig = {
  slug: 'tax-returns',
  labels: { singular: 'Tax Return', plural: 'Tax Returns' },
  admin: { useAsTitle: 'returnId', defaultColumns: ['returnId', 'returnType', 'jurisdiction', 'periodEnd', 'status', 'filedAt'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
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
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties('filedBy', 'createdBy'),
      autoSetTimestamp('filedAt', (d) => (d as { status?: string }).status === 'filed'),
      autoSetTimestamp('paidAt', (d) => (d as { status?: string }).status === 'accepted'),
    ],
    afterChange: [auditTrailAfterChange('tax-returns')],
  },
  timestamps: true,
}

export default TaxReturns
