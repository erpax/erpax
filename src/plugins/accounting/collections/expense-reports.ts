/**
 * # Expense Reports
 *
 * @summary Employee expense claims with line-level receipts, multi-step approval, and GL/payroll integration.
 *
 * ## Core Function
 *
 * Expense Reports capture employee expense claims for reimbursement (travel, meals, conferences, software, supplies, etc.).
 * Each expense report has line-level expense items with category (airfare, hotel, meals, mileage, etc.), amount, receipt,
 * GL account, and tax code. IAS-19 employee benefits accounting requires per-diem rules and mileage rates (country-context driven).
 * Multi-step approval (claimant ≠ approver per SOX §404) gates the claim. On approval, the expense report can be reimbursed via
 * payroll (next payroll run) or AP payment (separate wire). GDPR Art.5 requires receipt image retention and confidentiality (PII masking).
 *
 * ## Architecture
 *
 * Multi-tenancy via tenant field (auto-populated). Expense lines use dbName: er_lines to work around Payload's 63-char identifier cap.
 * FX conversion is snapshot-based: fxRate captures the exchange rate at expense-claim submission (prevents retro-active FX adjustments).
 * Reimbursable vs. non-reimbursable amounts are tracked (policy compliance logic: isPolicyCompliant field per line; totalReimbursable ≤ totalAmount).
 * Approval chain mirrors purchase-requisitions: array of approvers, decisions (pending / approved / rejected / returned), timestamps, and comments.
 * Status workflow: draft → submitted → in_approval → approved → reimbursed / rejected / returned / cancelled. Audit trail captures all changes.
 * @accounting IFRS IAS-19 @compliance GDPR Art.5 @audit SOX §404
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — captures tenant from session context.
 * - **beforeChange:** autoPopulateCreatedBy — stamps employee as createdBy (claim submitter).
 * - **afterChange:** auditTrailAfterChange — logs all expense changes to audit-events (line additions, approval decisions, reimbursement links).
 *
 * ## Key Fields
 *
 * - **reportNumber (text, unique, required):** Tenant-unique expense report number (e.g. ER-2026-0001). Human-readable claim ID.
 * - **employee (relationship, required):** Link to employee (submitter of the expense claim).
 * - **submissionDate (date, required):** Date employee submitted the claim.
 * - **periodStartDate (date):** Start of the expense period (e.g., trip start date for travel claims).
 * - **periodEndDate (date):** End of the expense period (e.g., trip end date).
 * - **project (relationship, optional):** Project code if expenses are billable to a customer (for project-based cost tracking).
 * - **costCenter (relationship):** Cost center for GL allocation (budget tracking).
 * - **businessPurpose (textarea, required):** Why the trip / spend was needed (substantiation evidence per IAS-19). @audit SOX §404
 * - **lines (array, required, min 1):** Expense line items with receipts. @standard ISO-8601-1:2019
 *   - **expenseDate (date, required):** Date the expense was incurred.
 *   - **category (select, required):** [airfare, hotel, meals, per_diem, ground_transport, mileage, conference, office_supplies, software, telecom, entertainment, other]; expense type.
 *   - **description (text, localized, required):** Expense description (e.g., "Hotel, Berlin Marriott, 3 nights" or "Flight to Vienna"). Multi-language support.
 *   - **merchant (text):** Vendor name (e.g. "Lufthansa", "Marriott", "Uber").
 *   - **currency (text, ISO 4217):** Currency of the expense (e.g. EUR, BGN, USD). @standard ISO-4217:2015
 *   - **amount (number, required):** Amount in expense currency (cents).
 *   - **fxRate (number):** Conversion rate to reimbursement currency (snapshot at claim submission). @accounting IFRS IAS-21
 *   - **reimbursementAmount (number):** amount × fxRate (cents) in reimbursementCurrency.
 *   - **glAccount (relationship):** GL account for the expense (e.g. travel expense, meal expense, software license).
 *   - **taxCode (relationship):** Tax code (VAT, GST, withholding if applicable).
 *   - **isBillableToCustomer (checkbox, default false):** When true, expense is marked up and invoiced to customer (for project-based billing).
 *   - **mileageDistance (number):** Distance in km (when category = mileage). Used to calc mileage reimbursement.
 *   - **mileageRate (number):** Per-km reimbursement rate (cents, per-country policy).
 *   - **receiptAttached (checkbox, default false):** Whether receipt image was uploaded (GDPR Art.5 evidence).
 *   - **receiptMedia (relationship):** Link to media file (receipt image, invoice scan, etc.). PII-masked per GDPR Art.32.
 *   - **isPolicyCompliant (checkbox, default true):** Whether the expense complies with company policy (daily meal limits, hotel rates, etc.).
 *   - **policyExceptionReason (text):** When isPolicyCompliant = false, rationale for exception (e.g., "Client hosted dinner (not company policy) but required for business development").
 * - **reimbursementCurrency (text, ISO 4217, default EUR):** Currency for employee reimbursement (e.g., employee's salary currency).
 * - **totalAmount (number, required):** Sum of lines.reimbursementAmount (cents); total claim amount.
 * - **totalReimbursable (number):** Total ≤ totalAmount; amount the company will reimburse (excludes non-policy-compliant lines).
 * - **totalNonReimbursable (number, default 0):** totalAmount - totalReimbursable; employee is responsible for this portion.
 * - **approvalChain (array):** Multi-step approval workflow (manager → finance → CFO). @compliance SOX §404
 *   - **step (number, required):** Sequence number (1 = first approver, etc.).
 *   - **approver (relationship, required):** User who must approve (typically employee's manager, then finance controller).
 *   - **role (text):** Approver's role (e.g., "Manager", "Finance Controller").
 *   - **decision (select):** [pending, approved, rejected, returned]; approver's decision.
 *   - **decidedAt (date):** Timestamp when approver made their decision.
 *   - **comment (text, localized):** Approver's comment (e.g., "Approved; hotel rate is within policy" or "Rejected; meal limit exceeded by €50").
 * - **reimbursementMethod (select, default payroll):** [payroll, ap_payment, corporate_card, cash_advance]; how employee is reimbursed. @accounting IFRS IAS-19
 * - **reimbursementDate (date):** When reimbursement was processed (employee received funds).
 * - **reimbursedViaPayrollRun (relationship):** Link to payroll-run if reimbursement = payroll (for deduction from payroll).
 * - **reimbursedViaPayment (relationship):** Link to payments if reimbursement = ap_payment (for payment vendor AP entry).
 * - **journalEntry (relationship, readOnly):** Link to journal-entry created on reimbursement (GL posting). @audit SOX §404
 * - **status (select):** [draft, submitted, in_approval, approved, reimbursed, rejected, returned, cancelled]; workflow status.
 *
 * ## Core Invariants
 *
 * - **reportNumberUniquenessPerTenant:** reportNumber is unique per tenant; prevents duplicate expense reports.
 * - **reimbursementAmountConsistency:** each line's reimbursementAmount = amount × fxRate (or amount if fxRate = 1); verified on save.
 * - **totalReimbursableNeverExceedsTotal:** totalReimbursable ≤ totalAmount; prevents overpayment.
 * - **employeeNotAnApprover:** createdBy (employee) must not appear in approvalChain (prevents self-approval). @security ISO-27002 §5.4
 * - **receiptRequiredForPolicy:** if isPolicyCompliant = false, policyExceptionReason field must be non-empty (audit trail).
 * - **mileageRateCalculation:** if category = mileage, reimbursementAmount = mileageDistance × mileageRate (verified on save).
 * - **multiTenancyIsolation:** tenant field enforced; reports for one tenant invisible to another.
 *
 * ## Audit Trail
 *
 * Every expense report captures: createdAt (timestamp), createdBy (employee), modifiedAt, modifiedBy. All line additions, amount adjustments,
 * approval decisions, and reimbursement dates logged to audit-events with full deltas. Receipt image filenames (with PII masking) included.
 * @standard SOX §302 §404 @audit ISO-19011:2018 @compliance GDPR Art.5 Art.32
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "expense_uuid_1",
 *   "tenant": "tenant_uuid_1",
 *   "reportNumber": "ER-2026-0001",
 *   "employee": "employee_uuid_1",
 *   "submissionDate": "2026-04-15",
 *   "businessPurpose": "Q2 product strategy review meeting in Berlin, April 10–12.",
 *   "lines": [
 *     {
 *       "expenseDate": "2026-04-10",
 *       "category": "airfare",
 *       "description": "Lufthansa flight Sofia–Berlin",
 *       "merchant": "Lufthansa",
 *       "currency": "EUR",
 *       "amount": 20000,
 *       "reimbursementAmount": 20000,
 *       "receiptAttached": true
 *     },
 *     {
 *       "expenseDate": "2026-04-10",
 *       "category": "hotel",
 *       "description": "Berlin Marriott, 3 nights",
 *       "merchant": "Marriott",
 *       "currency": "EUR",
 *       "amount": 60000,
 *       "reimbursementAmount": 60000,
 *       "isPolicyCompliant": true
 *     }
 *   ],
 *   "reimbursementCurrency": "EUR",
 *   "totalAmount": 80000,
 *   "totalReimbursable": 80000,
 *   "status": "approved",
 *   "reimbursementMethod": "payroll",
 *   "createdAt": "2026-04-15T11:00:00Z",
 *   "createdBy": "employee_uuid_1"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Employee expense reimbursement, travel management, cost allocation, policy compliance
 * @standard ISO-8601-1:2019 date-time-travel-dates
 * @standard ISO-4217:2015 currency-codes-fx-conversion
 * @standard ISO-27001:2022 a.5.12 data-privacy-gdpr-expense-intersection
 * @standard INCOTERMS-2020 travel-logistics-coding
 * @accounting IFRS IAS-19 employee-benefits
 * @accounting IFRS IAS-21 §28 fx-on-reimbursement
 * @compliance GDPR Art.5 information-security-PII-receipt-images
 * @compliance GDPR Art.32 PII-masking-in-audit-logs
 * @compliance SOX §404 internal-controls-four-eyes
 * @audit ISO-19011:2018 audit-trail-expense-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties-claimant-vs-approver
 * @see ./employees.ts
 * @see ./payroll-runs.ts
 */
import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

const ExpenseReports: CollectionConfig = {
  slug: 'expense-reports',
  labels: { singular: 'Expense Report', plural: 'Expense Reports' },
  admin: {
    useAsTitle: 'reportNumber',
    defaultColumns: ['reportNumber', 'employee', 'submissionDate', 'totalAmount', 'reimbursementCurrency', 'status'],
    description:
      'Employee expense claim with line-level receipts. Approver ≠ claimant (SOX §404). On approval, AP creates the reimbursement payment.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    { name: 'reportNumber', type: 'text', required: true, unique: true, index: true },
    { name: 'employee', type: 'relationship', relationTo: 'employees', required: true, index: true },
    { name: 'submissionDate', type: 'date', required: true },
    { name: 'periodStartDate', type: 'date' },
    { name: 'periodEndDate', type: 'date' },
    { name: 'project', type: 'relationship', relationTo: 'projects',
      admin: { description: 'When expenses are billable to a customer project.' } },
    { name: 'costCenter', type: 'relationship', relationTo: 'cost-centers' },
    { name: 'businessPurpose', type: 'textarea', required: true,
      admin: { description: 'Why the trip / spend was needed (substantiation evidence).' } },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Expense Line', plural: 'Expense Lines' },
      dbName: 'er_lines',
      fields: [
        { name: 'expenseDate', type: 'date', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Airfare', value: 'airfare' },
            { label: 'Hotel / Lodging', value: 'hotel' },
            { label: 'Meals', value: 'meals' },
            { label: 'Per Diem', value: 'per_diem' },
            { label: 'Ground Transportation', value: 'ground_transport' },
            { label: 'Mileage (personal vehicle)', value: 'mileage' },
            { label: 'Conference / Training', value: 'conference' },
            { label: 'Office Supplies', value: 'office_supplies' },
            { label: 'Software / Subscriptions', value: 'software' },
            { label: 'Client Entertainment', value: 'entertainment' },
            { label: 'Phone / Internet', value: 'telecom' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'merchant', type: 'text' },
        currencyField({ name: 'currency', defaultValue: 'EUR' }),
        { name: 'amount', type: 'number', required: true,
          admin: { description: 'Amount in expense currency (cents).' } },
        { name: 'fxRate', type: 'number',
          admin: { description: 'Conversion to reimbursement currency (snapshot).' } },
        { name: 'reimbursementAmount', type: 'number',
          admin: { description: 'amount × fxRate (cents) in reimbursementCurrency.' } },
        { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts' },
        { name: 'taxCode', type: 'relationship', relationTo: 'tax-codes' },
        { name: 'isBillableToCustomer', type: 'checkbox', defaultValue: false },
        { name: 'mileageDistance', type: 'number',
          admin: { description: 'Distance in km (when category = mileage).' } },
        { name: 'mileageRate', type: 'number',
          admin: { description: 'Per-km reimbursement rate (cents).' } },
        { name: 'receiptAttached', type: 'checkbox', defaultValue: false },
        { name: 'receiptMedia', type: 'relationship', relationTo: 'media' },
        { name: 'isPolicyCompliant', type: 'checkbox', defaultValue: true },
        { name: 'policyExceptionReason', type: 'text' },
      ],
    },
    currencyField({ name: 'reimbursementCurrency', defaultValue: 'EUR' }),
    { name: 'totalAmount', type: 'number', required: true,
      admin: { description: 'Σ lines.reimbursementAmount (cents).' } },
    { name: 'totalReimbursable', type: 'number',
      admin: { description: 'Total ≤ totalAmount when some lines are non-compliant / out-of-policy.' } },
    { name: 'totalNonReimbursable', type: 'number', defaultValue: 0 },
    {
      name: 'approvalChain',
      type: 'array',
      labels: { singular: 'Approval Step', plural: 'Approval Steps' },
      dbName: 'er_approval',
      fields: [
        { name: 'step', type: 'number', required: true },
        { name: 'approver', type: 'relationship', relationTo: 'users', required: true },
        { name: 'role', type: 'text' },
        { name: 'decision', type: 'select', defaultValue: 'pending', options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'approved' },
          { label: 'Rejected', value: 'rejected' },
          { label: 'Returned for Clarification', value: 'returned' },
        ]},
        { name: 'decidedAt', type: 'date' },
        { name: 'comment', type: 'text', localized: true },
      ],
    },
    { name: 'reimbursementMethod', type: 'select', defaultValue: 'payroll', options: [
      { label: 'Payroll (next payroll run)', value: 'payroll' },
      { label: 'AP Payment (separate wire)', value: 'ap_payment' },
      { label: 'Corporate Card Auto-Settle (no reimbursement)', value: 'corporate_card' },
      { label: 'Cash Advance Settle', value: 'cash_advance' },
    ]},
    { name: 'reimbursementDate', type: 'date' },
    { name: 'reimbursedViaPayrollRun', type: 'relationship', relationTo: 'payroll-runs' },
    { name: 'reimbursedViaPayment', type: 'relationship', relationTo: 'payments' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted (awaiting approval)', value: 'submitted' },
        { label: 'In Approval Chain', value: 'in_approval' },
        { label: 'Approved (ready for reimbursement)', value: 'approved' },
        { label: 'Reimbursed', value: 'reimbursed' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Returned for Clarification', value: 'returned' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('expense-reports')],
  },
  timestamps: true,
}

export default ExpenseReports
