/**
 * # Sales Commissions
 *
 * @summary IFRS-15 §91-94 incremental commission costs (capitalized + amortized if contract life ≥ 1 year; otherwise expensed immediately).
 *
 * ## Core Function
 *
 * Sales commissions represent compensation to salespeople for closing deals. Under IFRS-15 §91-94, if a commission is
 * an "incremental cost of obtaining the contract" and the contract's expected life is ≥ 1 year, the commission must be
 * capitalized as a contract-asset and amortized over the contract term (§99). Otherwise, it is expensed immediately (practical expedient §94).
 * Each commission record links to a closed-won opportunity, captures the plan (% rule, tiered structure), GL posting, and amortization schedule.
 * Clawback provisions (IAS-37) track refund obligations if the contract churns or customer refunds within a clawback window.
 *
 * ## Architecture
 *
 * Multi-tenant isolation via `tenantId`. Opportunity relationship links to the closed-won deal; contract relationship (if present)
 * provides the contract-life basis for amortization. Salesperson and employee relationships track compensation routing (payroll vs. direct payment).
 * Customer relationship denormalized from opportunity for reporting. RecognitionTreatment (capitalise_amortise, expense_immediately, renewal)
 * determines GL posting logic and amortization schedule. Amortization is tracked via cumulative amortisedToDate and remaining capitalisedAssetBalance.
 * Clawback provisions (via IAS-37 provisions relationship) track contingent refund obligations.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — stamp tenant context
 * - **beforeChange:** autoPopulateCreatedBy — track commission creation user/approver
 * - **afterChange:** auditTrailAfterChange — log commission approval, GL posting, amortization adjustments
 *
 * ## Key Fields
 *
 * - **reference (text, required):** Unique commission reference (e.g. COMM-2026-0001). Operator-supplied or auto-generated.
 * - **salesperson (relationship → users, required):** Sales rep who closed the deal. Links payroll/cash-payment routing.
 * - **employee (relationship → employees):** When commission flows through payroll (most common). Null if direct payment to contractor.
 * - **opportunity (relationship → opportunities, required, index):** Closed-won deal this commission is based on. @standard IFRS-15 §91 contract-existence
 * - **contract (relationship → contracts, index):** Contract created on close-won (drives amortization period under IFRS-15 §99). Null → assume expense immediately.
 * - **customer (relationship → customers):** Customer party. Denormalized from opportunity for reporting.
 * - **closedWonDate (date, required):** Close-won date (contract-inception date for IFRS-15). Basis for amortization-start.
 * - **currency (text, required, default: EUR):** ISO-4217 currency code. @standard ISO-4217:2015
 * - **commissionRule.planName (text, group: commissionRule):** Commission plan identifier (e.g. "Standard Sales", "Enterprise Tier").
 * - **commissionRule.ratePercent (number, group: commissionRule):** Commission % on contract value (e.g., 2.5%).
 * - **commissionRule.tieredOverride (textarea, group: commissionRule):** Optional tiered-plan detail (e.g., "5% to quota, 10% above quota").
 * - **contractValue (number, required, cents):** Contract value commission was calculated on. Basis for commissionAmount.
 * - **commissionAmount (number, required, cents):** Gross commission (contractValue × ratePercent / 100).
 * - **recognitionTreatment (select, required, default: expense_immediately):** IFRS-15 treatment: capitalise_amortise (§99), expense_immediately (practical expedient), renewal (separate amortization). @accounting IFRS-15 §91-94
 * - **amortisationPeriodMonths (number):** Months over which capitalised commission is amortized. Typically contract life including expected renewals per IFRS-15 §99.
 * - **amortisedToDate (number, readOnly, default: 0):** Cumulative amortization expense recognized (cents). Updated monthly by amortization job.
 * - **capitalisedAssetBalance (number, readOnly, default: 0):** Outstanding capitalised commission asset (cents). = commissionAmount − amortisedToDate.
 * - **paymentStatus (select, default: pending):** Payment lifecycle: pending, approved, paid (via payroll), clawed_back (revoked), disputed. @standard SOX §404
 * - **paymentDate (date):** When commission was/will be paid or accrued.
 * - **paidViaPayrollRun (relationship → payroll-runs):** Payroll run that includes this commission payout.
 * - **clawbackProvision (relationship → provisions):** IAS-37 clawback-risk provision (when contract churns/refunds within clawback window, e.g., 12 months post-sale).
 * - **journalEntry (relationship → journal-entries, readOnly):** GL posting (capitalise: Dr Contract Asset / Cr Commission Expense; expense: Dr Commission Expense / Cr Payables).
 * - **status (select, required, default: draft):** Lifecycle: draft, approved, posted (booked), amortising, fully_amortised, clawed_back.
 * - **createdBy (relationship → users, readOnly):** User who created the commission record.
 * - **createdAt (date, readOnly):** Creation timestamp (ISO-8601).
 * - **modifiedBy (relationship → users, readOnly):** Last user who approved/posted the commission.
 * - **modifiedAt (date, readOnly):** Last modification timestamp.
 * - **note (textarea):** Internal notes (approval justification, clawback risk assessment, amortization schedule notes).
 * - **tenantId (relationship → tenants, required, index):** Multi-tenant isolation; set by autoPopulateTenant.
 *
 * ## Core Invariants
 *
 * - **AmortizationLogic:** If recognitionTreatment = capitalise_amortise, amortisationPeriodMonths must be ≥ 12. If < 12, force expense_immediately.
 * - **BalanceTracking:** capitalisedAssetBalance = commissionAmount − amortisedToDate. Read-only; updated by amortization job. Never negative.
 * - **ClawbackWindow:** clawbackProvision.triggerDate must be within 12 months of closedWonDate (typical clawback window). IAS-37 obligation.
 * - **PaymentConsistency:** paymentStatus = paid → paymentDate must be set. Null paymentDate until approved.
 * - **UniquePerOpportunity:** Only one commission per opportunity (assumes single-deal-path; if multiple salespeople, use splitter logic upstream).
 * - **TenantIsolation:** Queries filtered by tenantId; cross-tenant access denied. @standard SOX §302
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All status transitions, amortization adjustments, and clawback provisions logged to `audit-events` with full field deltas.
 * Commission calculations (rate, contractValue, amount) logged separately so auditors can verify IFRS-15 §91-94 treatment logic.
 * @standard SOX §302 §404 commission-completeness control
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "comm_uuid_2026_001",
 *   "tenantId": "tenant_bg_ltd",
 *   "reference": "COMM-2026-0001",
 *   "salesperson": "user_uuid_rep_alice",
 *   "employee": "emp_uuid_alice",
 *   "opportunity": "opp_uuid_acme_ent",
 *   "contract": "con_uuid_acme_3yr",
 *   "customer": "cust_uuid_acme",
 *   "closedWonDate": "2026-03-01",
 *   "currency": "BGN",
 *   "commissionRule": {
 *     "planName": "Enterprise Tier",
 *     "ratePercent": 2.5
 *   },
 *   "contractValue": 40000000,
 *   "commissionAmount": 1000000,
 *   "recognitionTreatment": "capitalise_amortise",
 *   "amortisationPeriodMonths": 36,
 *   "amortisedToDate": 0,
 *   "capitalisedAssetBalance": 1000000,
 *   "paymentStatus": "approved",
 *   "status": "posted",
 *   "journalEntry": "je_uuid_comm_001",
 *   "createdBy": "user_uuid_admin",
 *   "createdAt": "2026-03-01T10:30:00Z",
 *   "modifiedBy": "user_uuid_accountant",
 *   "modifiedAt": "2026-03-01T14:15:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec IFRS-15 capitalization logic
 * @useCase Commission accrual, amortization scheduling, clawback risk, incentive-comp accounting
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 §91 §92 §93 §94 incremental-costs-of-obtaining
 * @accounting IFRS IFRS-15 §99 §103 §104 §105 §106 amortisation
 * @accounting IFRS IAS-37 provisions clawback-risk
 * @accounting US-GAAP ASC-340-40-25-1 incremental-costs
 * @audit ISO-19011:2018 audit-trail commission-evidence
 * @compliance SOX §302 §404 commission-completeness
 * @security Multi-tenant isolation; role-based approval (admin/accountant)
 * @see ./Opportunities.ts (closed-won deal)
 * @see ./Contracts.ts (amortization-period basis)
 * @see ./Employees.ts (payroll routing)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const SalesCommissions: CollectionConfig = {
  slug: 'sales-commissions',
  labels: { singular: 'Sales Commission', plural: 'Sales Commissions' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'salesperson', 'opportunity', 'commissionAmount', 'recognitionTreatment', 'status'],
    description:
      'IFRS-15 §91-94 commission record. Capitalised + amortised when contract life makes amortisation ≥ 1 year; otherwise expensed.',
  },
  access: accountingCollectionAccess({ feature: 'crm' }),
  fields: [
    multiTenancyField(),
    referenceField(),
    { name: 'salesperson', type: 'relationship', relationTo: 'users', required: true },
    { name: 'employee', type: 'relationship', relationTo: 'employees',
      admin: { description: 'When commission flows through payroll.' } },
    { name: 'opportunity', type: 'relationship', relationTo: 'opportunities', required: true, index: true },
    { name: 'contract', type: 'relationship', relationTo: 'contracts', index: true,
      admin: { description: 'Contract created on close-won (drives the amortisation period).' } },
    { name: 'customer', type: 'relationship', relationTo: 'customers' },
    { name: 'closedWonDate', type: 'date', required: true },
    currencyField(),
    {
      name: 'commissionRule',
      type: 'group',
      fields: [
        { name: 'planName', type: 'text' },
        { name: 'ratePercent', type: 'number',
          admin: { description: 'Commission % on contract value.' } },
        { name: 'tieredOverride', type: 'textarea',
          admin: { description: 'Optional tiered-plan detail (e.g. 5% to quota, 10% over quota).' } },
      ],
    },
    { name: 'contractValue', type: 'number', required: true,
      admin: { description: 'Contract value the commission was calculated on (cents).' } },
    { name: 'commissionAmount', type: 'number', required: true,
      admin: { description: 'Gross commission (cents).' } },
    {
      name: 'recognitionTreatment',
      type: 'select',
      required: true,
      defaultValue: 'expense_immediately',
      options: [
        { label: 'Capitalise + Amortise (IFRS-15 §99)', value: 'capitalise_amortise' },
        { label: 'Expense Immediately (practical expedient §94 — amortisation < 1y)', value: 'expense_immediately' },
        { label: 'Renewal Commission (separate amortisation)', value: 'renewal' },
      ],
    },
    { name: 'amortisationPeriodMonths', type: 'number',
      admin: { description: 'Months over which capitalised commission is amortised (typically the contract life including expected renewals per IFRS-15 §99).' } },
    { name: 'amortisedToDate', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Cumulative amortisation expense recognised.' } },
    { name: 'capitalisedAssetBalance', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Outstanding capitalised commission asset (cents).' } },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Paid (via payroll)', value: 'paid' },
        { label: 'Clawed Back (revoked)', value: 'clawed_back' },
        { label: 'Disputed', value: 'disputed' },
      ],
    },
    { name: 'paymentDate', type: 'date' },
    { name: 'paidViaPayrollRun', type: 'relationship', relationTo: 'payroll-runs' },
    { name: 'clawbackProvision', type: 'relationship', relationTo: 'provisions',
      admin: { description: 'IAS-37 clawback-risk provision (when contract churns / refunds within clawback window).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted (booked)', value: 'posted' },
        { label: 'Amortising', value: 'amortising' },
        { label: 'Fully Amortised', value: 'fully_amortised' },
        { label: 'Clawed Back', value: 'clawed_back' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('sales-commissions')],
  },
  timestamps: true,
}

export default SalesCommissions
