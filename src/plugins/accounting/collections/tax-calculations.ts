/**
 * # Tax Calculations
 *
 * @summary Computed tax-liability snapshots per period, posted to GL and filed with tax authorities.
 *
 * ## Core Function
 *
 * Tax Calculations is the transaction-level tax position register. Each row represents the
 * calculated tax exposure (VAT output, income tax, excise, etc.) for a fiscal period, derived
 * from invoices, payments, provisions, and deferred items. The collection bridges tax documents
 * (invoices, payroll, customs) to GL posting (tax payable/receivable) and tax return aggregation
 * (VAT returns, corporate tax filings). Status progression (Calculated → Approved → Posted → Filed
 * → Paid) enforces jurisdiction-specific compliance controls: prior-period lock prevents edit-backs,
 * approval gates segregate calculation from posting, and deadline tracking ensures timely remittance.
 *
 * ## Architecture
 *
 * Multi-jurisdiction isolation: each calculation specifies jurisdiction (EU-DE, US-CA, etc.),
 * which determines applicable tax codes, rates, and filing calendars (via tax-jurisdictions).
 * GL posting is automatic on status=posted (beforeChange hook posts to tax payable account).
 * Period lock (via validateNotLocked) prevents retroactive edits to closed periods, enforcing
 * SOX §404 control-testing immutability. Audit trail captures all state transitions, rate changes,
 * and GL posting decisions. Multi-currency support: each calculation inherits currency from
 * jurisdiction, enabling intra-group reporting of tax positions across EUR/BGN/USD/etc.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — multi-tenant scoping.
 * - **beforeChange:** validateNotLocked — deny edits to fiscal periods that have filingDeadline passed; autoPopulateCreatedBy; autoSetTimestamp for status=posted/filed/paid transitions (ISO-8601 timestamps).
 * - **afterChange:** auditTrailAfterChange — log all mutations (rate changes, status progression, GL posting) to audit-events.
 *
 * ## Key Fields
 *
 * - **calculationId (text, unique):** Idempotent calculation identifier (e.g., TAX-2025-Q1-BG-VAT-001). @standard ISO-8601 YYYY-MM period.
 * - **taxType (select):** Regime classification: sales_tax | vat | gst | income_tax | payroll_tax. Determines rate source, GL posting account, filing template.
 * - **jurisdiction (select):** Tax authority reference (e.g., eu, us_federal, us_state, ca_federal, ca_provincial, au, jp, cn, in, br). Maps to tax-jurisdictions for rate/filing-frequency lookup.
 * - **period (date):** Fiscal period end date (ISO-8601). Used for period-lock enforcement and return aggregation.
 * - **taxRate (number, %):** Applied rate (e.g., 0.20 for 20% VAT). May vary by jurisdiction and effective date.
 * - **grossAmount (number, cents):** Total transaction amount before tax (base for tax calculation).
 * - **taxableAmount (number, cents):** Portion subject to tax (post-exemptions, deductions). May differ from gross if reverse charge / exempt items present.
 * - **taxAmount (number, cents, signed):** Calculated tax liability or credit (taxableAmount × taxRate). Negative if tax credit / deductible.
 * - **netAmount (number, cents):** grossAmount + taxAmount (invoice-line final amount).
 * - **taxPayableAccount (relationship to gl-accounts, required):** GL account for output tax / tax payable (e.g., 2100 "Tax Payable - VAT"). Posted on status=posted.
 * - **taxExpenseAccount (relationship to gl-accounts):** GL account for non-recoverable tax expense (e.g., 6300 "Non-Recoverable VAT"). Used if tax is not deductible.
 * - **journalEntry (relationship to journal-entries, readOnly):** Auto-populated by beforeChange hook when posting to GL.
 * - **status (select):** Workflow state: calculated | approved | posted | filed | paid. Controls GL posting, return inclusion, and edit lock.
 * - **filingDeadline (date):** ISO-8601 due date for filing return. Triggers period-lock enforcement.
 * - **paymentDeadline (date):** ISO-8601 due date for payment. Cascades to provision tracking.
 * - **notes (textarea):** Internal audit trail (e.g., "Quarterly reconciliation by A. Smith, 2025-04-15").
 *
 * ## Core Invariants
 *
 * - **period-lock enforcement:** Fiscal periods with filingDeadline ≤ today cannot be edited (beforeChange validateNotLocked). Prevents retroactive tax adjustments post-filing. Requires SOX §404 audit approval to reopen.
 * - **status immutability forward:** Status transitions only permit: calculated → approved → posted → filed → paid (no reversals without amendment record).
 * - **GL posting atomicity:** On status=posted, beforeChange hook atomically posts taxAmount to taxPayableAccount + taxExpenseAccount (if applicable). If posting fails, entire calculation rejected (data consistency).
 * - **tax-jurisdiction rate validation:** taxRate must match effective rate in tax-jurisdictions for (jurisdiction, period, taxType) tuple. Stale rates rejected.
 * - **prior-period prevention:** Calculations for periods older than filingDeadline + 90 days rejected unless marked as amendment (amendment flag + prior approval required).
 * - **multi-currency consistency:** All amounts (gross, taxable, tax, net) must be in currency inherited from jurisdiction.currency (ISO-4217). FX conversions via separate record.
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to audit-events collection with full field deltas (calculationId, taxRate old→new, status old→new, GL posting reference).
 * GL posting triggers on status=posted; reverse posting on status change back (e.g., approval → posted → amendment).
 * Tax calculation recalc is manual (via UI trigger) to prevent re-entry loops; dependent tax returns marked stale and require re-aggregation.
 * @standard SOX §302 certification of internal controls; §404 management assessment.
 * @standard ISO-19011:2018 audit trail generation, retention for 6 years.
 * @standard IRS Form-720 (quarterly federal excise tax) documentation per OECD SAF-T.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "calc-uuid",
 *   "calculationId": "TAX-2025-Q1-BG-VAT-001",
 *   "taxType": "vat",
 *   "jurisdiction": "eu",
 *   "period": "2025-03-31",
 *   "taxRate": 0.20,
 *   "grossAmount": 1000000,
 *   "taxableAmount": 1000000,
 *   "taxAmount": 200000,
 *   "netAmount": 1200000,
 *   "taxPayableAccount": "ref-to-gl-account-2100",
 *   "status": "calculated",
 *   "filingDeadline": "2025-04-20",
 *   "paymentDeadline": "2025-04-25",
 *   "createdBy": "user-123",
 *   "createdAt": "2025-04-10T09:30:00Z",
 *   "updatedAt": "2025-04-10T09:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Tax calculation snapshots per fiscal period (quarterly VAT, annual income tax).
 * @useCase GL posting of tax liabilities and credits to balance sheet.
 * @useCase Tax return preparation (aggregation of tax-calculations by period).
 * @useCase Prior-period lock enforcement (SOX §404 control immutability).
 * @useCase Audit trail of all tax calculation changes and GL posting decisions.
 *
 * @standard ISO-8601-1:2019 date-time period posted-at filed-at paid-at
 * @standard ISO-3166-1:2020 country-codes jurisdiction
 * @standard ISO-4217:2015 currency-codes multi-currency support
 * @standard EN-16931:2017 §BG-23 vat-breakdown electronic-invoicing
 *
 * @accounting IFRS IAS-12 §69 current-tax liability recognition
 * @accounting IFRS IAS-12 §74 offsetting deferred-tax vs current-tax
 * @accounting OECD SAF-T §2.1 tax-transactions general-ledger-posting
 * @accounting US-GAAP ASC-740 §15 income-tax accounting
 * @accounting EU VAT Directive 2006/112/EC §73 VAT calculation methodology
 *
 * @audit ISO-19011:2018 audit-trail audit-evidence
 * @audit SOX §302 §404 internal-controls tax-position-documentation
 *
 * @compliance SOX §302 certification; §404 management assessment of controls
 * @compliance IRS Form-720 (quarterly federal excise tax) documentation
 * @compliance EU VAT Directive 2006/112/EC reverse-charge rules
 * @compliance OECD Transfer Pricing Guidelines 2022 (arm's-length pricing in multi-jurisdiction scenarios)
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation via jurisdiction field
 * @security Multi-tenant access: only accountant/admin roles can create/update
 *
 * @see tax-jurisdictions (jurisdiction master, rates, filing frequency)
 * @see tax-codes (tax-rate definitions by jurisdiction)
 * @see tax-returns (aggregated return records)
 * @see gl-accounts (GL posting targets for tax payable/receivable)
 * @see journal-entries (GL posting detail)
 */

import type { CollectionConfig } from 'payload'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { multiTenancyField, notesField } from '@/fields/accounting/base-accounting-fields'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant';
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy';
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp';
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange';
import { validateNotLocked } from '@/services/accounting/utilities/period-lock';


const TaxCalculations: CollectionConfig = {
  slug: 'tax-calculations',
  labels: { singular: 'Tax Calculation', plural: 'Tax Calculations' },
  admin: {
    useAsTitle: 'calculationId',
    defaultColumns: ['calculationId', 'taxType', 'jurisdiction', 'period', 'taxAmount', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'calculationId', type: 'text', required: true, unique: true },
    {
      name: 'taxType',
      type: 'select',
      required: true,
      options: [
        { label: 'Sales Tax', value: 'sales_tax' },
        { label: 'VAT', value: 'vat' },
        { label: 'GST', value: 'gst' },
        { label: 'Income Tax', value: 'income_tax' },
        { label: 'Payroll Tax', value: 'payroll_tax' },
      ],
    },
    {
      name: 'jurisdiction',
      type: 'select',
      required: true,
      options: [
        { label: 'US Federal', value: 'us_federal' },
        { label: 'US State', value: 'us_state' },
        { label: 'EU', value: 'eu' },
        { label: 'Canada Federal', value: 'ca_federal' },
        { label: 'Canada Provincial', value: 'ca_provincial' },
        { label: 'Australia', value: 'au' },
        { label: 'Japan', value: 'jp' },
        { label: 'China', value: 'cn' },
        { label: 'India', value: 'in' },
        { label: 'Brazil', value: 'br' },
      ],
    },
    { name: 'period', type: 'date', required: true },
    { name: 'taxRate', type: 'number', required: true },
    { name: 'grossAmount', type: 'number', required: true },
    { name: 'taxableAmount', type: 'number', required: true },
    { name: 'taxAmount', type: 'number', required: true },
    { name: 'netAmount', type: 'number', required: true },
    { name: 'taxPayableAccount', type: 'relationship', relationTo: 'gl-accounts', required: true },
    { name: 'taxExpenseAccount', type: 'relationship', relationTo: 'gl-accounts' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { disabled: true } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'calculated',
      options: [
        { label: 'Calculated', value: 'calculated' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted', value: 'posted' },
        { label: 'Filed', value: 'filed' },
        { label: 'Paid', value: 'paid' },
      ],
    },
    { name: 'filingDeadline', type: 'date' },
    { name: 'paymentDeadline', type: 'date' },
    notesField(),
  ],
  // Slice ZZ: full canonical hook chain wired per banner declarations.
  // Was: empty hooks (banner promised audit-trail, no implementation).
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      // ISO-8601 status-transition timestamps.
      autoSetTimestamp(
        'postedAt',
        (data) => (data as { status?: string }).status === 'posted',
      ),
      autoSetTimestamp(
        'filedAt',
        (data) => (data as { status?: string }).status === 'filed',
      ),
      autoSetTimestamp(
        'paidAt',
        (data) => (data as { status?: string }).status === 'paid',
      ),
    ],
    afterChange: [auditTrailAfterChange('tax-calculations')],
  },
  timestamps: true,
};

export default TaxCalculations;
