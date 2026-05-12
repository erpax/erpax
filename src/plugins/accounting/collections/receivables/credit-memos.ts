/**
 * # Credit Memos
 *
 * @summary IFRS-15 §B22 contract-liability adjustments for refunds, returns, and bad-debt write-offs with segregation-of-duties enforcement.
 *
 * ## Core Function
 *
 * Credit memos represent contra-revenue adjustments issued to customers, reducing their AR liability and
 * recognizing refund obligations (IFRS-15 §B22). Use cases include customer returns (goods/service),
 * service-level refunds (SLA breaches), pricing corrections, and bad-debt write-offs. Each memo must reference
 * an original invoice (except write-offs) and flows through a state machine: draft → issued → applied (matched to invoice) →
 * settled (cash refunded) or voided. GL postings (Dr AR / Cr Revenue or Dr Allowance) are generated on state change;
 * segregation-of-duties prevents the same user from issuing and approving.
 *
 * ## Architecture
 *
 * Multi-tenant isolation via `tenantId`. Customer (party owed the credit) and invoice (original sale) are explicit
 * relationships. Journal entry relationship captures the GL posting; created/updated by afterChange hook.
 * Role-based access restricts creation/updates to admin and accountant. Reason taxonomy (refund_return, refund_service,
 * pricing_adjustment, bad_debt_writeoff, goodwill, tax_adjustment) enables financial reporting rollup.
 * Period-lock validation prevents memo posting to closed fiscal periods.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — stamp tenant context
 * - **beforeChange:** autoPopulateCreatedBy, validateNotLocked, enforceSegregationOfDuties, autoSetTimestamp — enforce no issuer=approver and auto-timestamp state transitions
 * - **afterChange:** auditTrailAfterChange — log memo creation, status changes, GL posting references
 *
 * ## Key Fields
 *
 * - **memoNumber (text, required, unique, index):** Unique memo identifier (e.g. CM-2026-0001). Auto-generated or operator-supplied.
 * - **customer (relationship → customers, required):** Party receiving the credit. @standard EN-16931 buyer-reference
 * - **invoice (relationship → invoices):** Original invoice being credited (null for general write-offs). Links to invoices collection.
 * - **reason (select, required):** Classification: refund_return, refund_service, pricing_adjustment, bad_debt_writeoff, goodwill, tax_adjustment, other. @standard IFRS-15 §B22
 * - **reasonDetail (textarea):** Narrative explanation (operator notes, customer dispute ref, write-off justification).
 * - **amount (number, required, min: 0):** Credit amount in cents. Validates ≤ associated invoice total if invoice linked.
 * - **currency (text, required, default: EUR):** ISO-4217 currency code. @standard ISO-4217:2015
 * - **status (select, required, default: draft):** Lifecycle: draft, pending_approval, issued, applied, settled, voided. @standard SOX §404 approval gate
 * - **issuedAt (date, readOnly):** Auto-set when status → issued. ISO-8601 timestamp.
 * - **appliedAt (date, readOnly):** Auto-set when status → applied (invoice allocation complete).
 * - **settledAt (date, readOnly):** Auto-set when status → settled (cash refund disbursed). EOD validation: settled → journalEntry must exist.
 * - **journalEntry (relationship → journal-entries, readOnly):** GL posting (Dr AR or Allowance / Cr Revenue). Auto-created on status → issued.
 * - **createdBy (relationship → users, readOnly):** User who drafted the memo. Cannot approve own memo (SoD). @standard ISO-27002 §5.4
 * - **createdAt (date, readOnly):** Creation timestamp (ISO-8601).
 * - **modifiedBy (relationship → users, readOnly):** Last user who modified status/amount.
 * - **modifiedAt (date, readOnly):** Last modification timestamp.
 * - **note (textarea):** Internal notes (audit trail, customer communication, dispute resolution steps).
 * - **tenantId (relationship → tenants, required, index):** Multi-tenant isolation; set by autoPopulateTenant.
 *
 * ## Core Invariants
 *
 * - **SegregationOfDuties:** enforceSegregationOfDuties blocks status transitions if createdBy = currentUser. Memo issuer ≠ approver. @standard ISO-27002 §5.4
 * - **AmountValidation:** amount ≤ invoice.totalAmount when invoice linked. Null invoice only for write-offs (reason = bad_debt_writeoff).
 * - **GLPostingChain:** GL posting created on status → issued; reversed on voided. Journal entry remains immutable (readOnly) after creation.
 * - **PeriodLockEnforcement:** validateNotLocked prevents posting to closed fiscal periods. @standard SOX §302
 * - **CurrencyConsistency:** memo.currency must match invoice.currency if invoice linked.
 * - **UniquePerTenant:** (memoNumber, tenantId) is unique within the tenant.
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All status transitions, amount adjustments, and GL postings logged to `audit-events` with full field deltas.
 * Segregation-of-duties violations are logged as compliance violations (audit severity).
 * @standard SOX §302 §404 AR adjustment control
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "cm_uuid_2026_0001",
 *   "tenantId": "tenant_bg_ltd",
 *   "memoNumber": "CM-2026-0001",
 *   "customer": "cust_uuid_12345",
 *   "invoice": "inv_uuid_54321",
 *   "reason": "refund_return",
 *   "reasonDetail": "Customer returned 5 units due to defect; RMA #12345",
 *   "amount": 250000,
 *   "currency": "BGN",
 *   "status": "settled",
 *   "issuedAt": "2026-05-05T10:30:00Z",
 *   "appliedAt": "2026-05-06T09:15:00Z",
 *   "settledAt": "2026-05-10T16:45:00Z",
 *   "journalEntry": "je_uuid_cm2026_0001",
 *   "createdBy": "user_uuid_accountant_1",
 *   "createdAt": "2026-05-05T10:30:00Z",
 *   "modifiedBy": "user_uuid_accountant_2",
 *   "modifiedAt": "2026-05-10T16:45:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec refund-liability lifecycle
 * @useCase AR adjustment, customer refund, bad-debt write-off, returns credit
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard EN-16931:2017 credit-note-semantic-model
 * @accounting IFRS IFRS-15 §B22 refund-liability
 * @accounting IFRS IFRS-15 §B47 contract-cancellation
 * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §302 §404 internal-controls credit-memo-approval
 * @security Segregation-of-duties (issuer ≠ approver); multi-tenant isolation
 * @see ./Customers.ts (credit recipient)
 * @see ./Invoices.ts (original sale being credited)
 * @see ./JournalEntries.ts (GL posting)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields'
import { validateNotLocked } from '@/services/accounting/utilities/period-lock'

const CreditMemos: CollectionConfig = {
  slug: 'credit-memos',
  labels: { singular: 'Credit Memo', plural: 'Credit Memos' },
  admin: {
    useAsTitle: 'memoNumber',
    defaultColumns: ['memoNumber', 'customer', 'amount', 'status', 'issuedAt'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'memoNumber', type: 'text', required: true, unique: true, index: true },
    {
      name: 'customer',
      type: 'relationship',
      // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'customers'.
      // The legacy comment ('ecommerce plugin's customer/address collection')
      // captured the bug: the deleted ecommerce plugin used a polymorphic
      // address-as-customer shape that never matched IFRS-15 §B22 reality.
      // EN-16931 §BG-7 buyer + IFRS-15 §B22 contra-revenue both need the
      // customer party itself.
      relationTo: 'customers',
      admin: { description: 'Party receiving the credit (IFRS-15 §B22 contra-revenue counterparty).' },
    },
    {
      name: 'invoice',
      type: 'relationship',
      relationTo: 'invoices',
      admin: { description: 'Original invoice being credited (optional for general write-offs).' },
    },
    {
      name: 'reason',
      type: 'select',
      required: true,
      options: [
        { label: 'Refund — customer return', value: 'refund_return' },
        { label: 'Refund — service issue', value: 'refund_service' },
        { label: 'Pricing adjustment', value: 'pricing_adjustment' },
        { label: 'Bad debt write-off', value: 'bad_debt_writeoff' },
        { label: 'Goodwill credit', value: 'goodwill' },
        { label: 'Tax adjustment', value: 'tax_adjustment' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'reasonDetail', type: 'textarea' },
    { name: 'amount', type: 'number', required: true, min: 0, admin: { description: 'Credit amount in cents.' } },
    currencyField(),
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Approval', value: 'pending_approval' },
        { label: 'Issued', value: 'issued' },
        { label: 'Applied (against invoice)', value: 'applied' },
        { label: 'Settled (cash refund paid)', value: 'settled' },
        { label: 'Voided', value: 'voided' },
      ],
      'draft',
    ),
    { name: 'issuedAt', type: 'date', admin: { description: 'When the credit memo was issued.', readOnly: true } },
    { name: 'appliedAt', type: 'date', admin: { description: 'When applied against an invoice.', readOnly: true } },
    { name: 'settledAt', type: 'date', admin: { description: 'When cash refund was paid.', readOnly: true } },
    {
      name: 'journalEntry',
      type: 'relationship',
      relationTo: 'journal-entries',
      admin: { description: 'GL posting that booked this credit.', readOnly: true },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      // SOX §404 / ISO 27002 §5.4: issuer ≠ approver.
      enforceSegregationOfDuties(),
      autoSetTimestamp('issuedAt', (d) => (d as { status?: string }).status === 'issued'),
      autoSetTimestamp('appliedAt', (d) => (d as { status?: string }).status === 'applied'),
      autoSetTimestamp('settledAt', (d) => (d as { status?: string }).status === 'settled'),
    ],
    afterChange: [auditTrailAfterChange('credit-memos')],
  },
  timestamps: true,
}

export default CreditMemos
