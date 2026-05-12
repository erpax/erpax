/**
 * # Lease Period Postings Collection
 *
 * @summary Period-by-period IFRS-16 / ASC-842 lease accounting evidence: interest accretion, principal repayment, ROU amortization, and GL posting reference.
 *
 * ## Core Function
 *
 * The Lease Period Postings collection maintains detailed, period-by-period (typically monthly or quarterly) audit
 * evidence of lease accounting per IFRS-16 §29-38 and ASC-842-20-35. Like the depreciation-schedules collection for
 * fixed assets, this collection records one row per (lease × period) and captures the three components of lease
 * accounting in each period: (1) interest accretion on the lease liability using the effective-interest method
 * per IFRS-16 §36, (2) principal repayment of the lease liability (portion of the cash payment), and (3) ROU asset
 * amortization per IFRS-16 §29-31 (typically straight-line over the lease term). The collection is the primary SOX §404
 * audit evidence that lease carrying amounts progress correctly from period to period; auditors can walk from a
 * lease record → lease-period-postings rows → journal-entries to verify completeness and accuracy of accrual
 * accounting. Status lifecycle (calculated → posted → reversed) mirrors depreciation-schedules: initial creation marks
 * the posting as 'calculated' (ready for GL posting), status = 'posted' triggers the afterChange hook to book GL entries
 * (Dr Interest Expense / Cr Lease Liability; Dr ROU Amortization Expense / Cr Accumulated ROU Amortization; Dr Lease
 * Liability / Cr Cash), and status = 'reversed' (if needed) creates a reversal entry. Closing balances are read-only
 * and computed (openingLiabilityCarrying + interest − principalRepayment = closingLiabilityCarrying per IFRS-16 §36;
 * openingRouCarrying − rouAmortisation = closingRouCarrying per IFRS-16 §29-31).
 *
 * ## Architecture
 *
 * Multi-tenancy is enforced via the `tenant` field (indexed). Each posting has a unique postingId (e.g., 'LPP-2026-04-LEASE-001')
 * and links to a single lease (required, indexed). Opening balances (openingLiabilityCarrying, openingRouCarrying) are required
 * and tied to the prior period's closing balances (or the initial-measurement values for the first period). Period boundaries
 * (periodStart, periodEnd, indexed) define the fiscal period; typically monthly or quarterly. Currency field ensures consistency
 * with the lease's currency (per ISO-4217:2015). Period-activity fields (interest, principalRepayment, cashPayment, rouAmortisation)
 * are required and calculated by the leaseService (or pre-supplied by a batch process). Closing balances (closingLiabilityCarrying,
 * closingRouCarrying) are read-only and computed: closingLiability = opening + interest − principalRepayment; closingROU = opening − rouAmortisation.
 * GL account overrides (interestExpenseAccount, leaseLiabilityAccount, rouAmortisationAccount, accumulatedRouAmortisationAccount,
 * cashAccount) are optional relationship fields; if omitted, the system uses the lease's default accounts. A costCenter field
 * (optional, relationship to cost-centers) supports analytical dimension tracking per IFRS-8 / ASC-280 segment reporting.
 * Status lifecycle (calculated → posted → reversed) and period lock (validateNotLocked) prevent editing of closed-period postings.
 * journalEntry (read-only) is populated by the leasePeriodPostingHook when status → 'posted'.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:**
 *   - `autoPopulateTenant`: Stamps `tenant` from context.
 * - **beforeChange:**
 *   - `validateNotLocked`: Prevents modification if the fiscal period is closed/locked per period-lock policy.
 *   - `autoPopulateCreatedBy`: Stamps `createdBy` on initial insert.
 *   - `autoSetTimestamp('postedAt', ...)`: Auto-stamps postedAt when status → 'posted'.
 * - **afterChange:**
 *   - `leasePeriodPostingHook`: Fires when status → 'posted'; emits 'lease-period:posted' event to glPostingService, which books:
 *     Dr Interest Expense / Cr Lease Liability (interest portion),
 *     Dr Lease Liability / Cr Cash (principal portion),
 *     Dr ROU Amortization Expense / Cr Accumulated ROU Amortization (amortization portion).
 *   - `auditTrailAfterChange('lease-period-postings')`: Logs full record delta to audit-events for compliance.
 *
 * ## Key Fields
 *
 * - **postingId (text, required, unique, indexed):** Stable identifier for the posting row (e.g., 'LPP-2026-04-LEASE-001'). Index for period-by-period audit queries. Immutable.
 * - **lease (relationship to leases, required, indexed):** The lease being posted. Immutable once created. Index for lease-roll-forward queries.
 * - **periodStart (date, required):** Fiscal period start date (first day of month, quarter, or year) per ISO-8601:2019. Used to identify the accrual period.
 * - **periodEnd (date, required, indexed):** Fiscal period end date (last day of month, quarter, or year) per ISO-8601:2019. Index for period-end roll-forward and carrying-amount reconciliation.
 * - **currency (select, default 'EUR'):** Currency of all amounts (must match lease.currency) per ISO-4217:2015.
 * - **openingLiabilityCarrying (number, required):** Lease liability carrying amount at period start (cents). Source value for interest-accretion calculation per IFRS-16 §36 effective-interest method: opening × (annualRate / periods_per_year).
 * - **openingRouCarrying (number, required):** ROU asset carrying amount at period start (cents). Source value for amortization base: typically openingRouCarrying / remaining-months (straight-line) or per lease-specific amortization method.
 * - **interest (number, required, min 0):** Interest accretion this period (cents) per IFRS-16 §36 effective-interest method: = openingLiabilityCarrying × periodicDiscountRate. Example: 447,000 BGN liability × 3.5% annual ÷ 12 = ~1,304 BGN/month.
 * - **principalRepayment (number, required, min 0):** Principal portion of the cash payment (cents). = cashPayment − interest. Reduces the lease liability directly per IFRS-16 §36.
 * - **cashPayment (number, required, min 0):** Total cash paid this period (cents). = principalRepayment + interest. Typically = lease.fixedPayment, or adjusted for variable-payment index resets or partial payments.
 * - **rouAmortisation (number, required, min 0):** ROU asset amortization booked this period (cents) per IFRS-16 §29-31. Typically = initialRouAsset / leaseTermMonths (straight-line), unless the lease employs accelerated amortization (rare). Example: 505,500 BGN initial ROU ÷ 36 months = ~14,042 BGN/month.
 * - **closingLiabilityCarrying (number, read-only):** Lease liability carrying at period end (cents). = openingLiabilityCarrying + interest − principalRepayment per IFRS-16 §36. Immutable computation; carried forward as next period's opening balance.
 * - **closingRouCarrying (number, read-only):** ROU asset carrying at period end (cents). = openingRouCarrying − rouAmortisation per IFRS-16 §29-31. Immutable computation; carried forward as next period's opening balance.
 * - **interestExpenseAccount (relationship to gl-accounts):** GL account for interest expense (e.g., 6200 'Interest Expense — Leases'). Optional override; if omitted, uses lease.interestExpenseAccount.
 * - **leaseLiabilityAccount (relationship to gl-accounts):** GL account for lease liability (e.g., 2110 'Lease Liabilities'). Optional override; if omitted, uses lease.leaseLiabilityAccount.
 * - **rouAmortisationAccount (relationship to gl-accounts):** GL account for ROU amortization expense (e.g., 6120 'ROU Amortization Expense'). Optional override; if omitted, uses lease.rouAmortizationAccount.
 * - **accumulatedRouAmortisationAccount (relationship to gl-accounts):** Contra-asset account for accumulated ROU amortization (e.g., 1899 'Accumulated ROU Amortization'). Optional override.
 * - **cashAccount (relationship to gl-accounts):** Cash account debited for the principal repayment (e.g., 1000 'Cash — Operating'). Drives IAS-7 cash-flow classification (financing activities). Optional override.
 * - **costCenter (relationship to cost-centers):** Cost center the lease cost allocates to (e.g., 'Sofia HQ' or 'IT Department') per IFRS-8 / ASC-280 segment reporting. Optional; if omitted, lease cost rolls up to corporate level.
 * - **status (select, default 'calculated'):** Lifecycle state: 'calculated' (initial creation, ready for GL posting), 'posted' (GL entries booked, immutable), 'reversed' (reversal entry booked).
 * - **postedAt (date, read-only):** ISO-8601 timestamp when status → 'posted'. Auto-stamped by autoSetTimestamp hook. Null until posting.
 * - **journalEntry (relationship to journal-entries, read-only):** Reference to the GL posting created by leasePeriodPostingHook. Null until status = 'posted'.
 * - **notes (textarea):** Optional commentary (e.g., "CPI adjustment applied, payment increased 2%", "Partial payment 10,000 BGN due to cash constraints").
 * - **createdBy (user ID + timestamp):** Initial posting creator (usually a scheduled job for auto-generated postings).
 * - **modifiedBy (user ID + timestamp, read-only after posting):** Last modifier; locked once status = 'posted'.
 *
 * ## Core Invariants
 *
 * - **Immutability Post-Posting:** Once status = 'posted' and journalEntry is populated, the lease-period-posting row is immutable. Corrections require reversal + new posting row.
 * - **Period Lock Enforcement:** The validateNotLocked hook prevents creation or modification of rows in closed/locked fiscal periods per SOX §404.
 * - **Carrying-Amount Symmetry:** closingLiabilityCarrying of period N must equal openingLiabilityCarrying of period N+1 (no gaps or discontinuities). closingRouCarrying of period N equals openingRouCarrying of period N+1.
 * - **Interest Calculation Consistency:** interest must be calculated per IFRS-16 §36 effective-interest method at the lease's discountRatePercent. If discountRate is modified (per lease-modifications), subsequent postings use the new rate.
 * - **ROU Amortization Non-Negativity:** closingRouCarrying must never be negative (ROU does not reverse once fully amortized). Once closingRouCarrying = 0 (or ≤ impairmentReserve), amortization stops and rouAmortisation = 0 for subsequent periods.
 * - **GL Account Immutability:** GL accounts used in journalEntry (linked from the lease or optional overrides) are immutable to preserve audit trail.
 * - **Status Transition Immutability:** status transitions must follow the lifecycle (calculated → posted / reversed). No skipping or out-of-sequence transitions.
 *
 * ## Audit Trail
 *
 * Every lease-period-posting record captures:
 * - `createdBy` (user ID + timestamp): Initial posting creator (typically a scheduled job or batch process).
 * - `modifiedBy` (user ID + timestamp, locked once posted): Last modifier.
 * - All changes (opening balances, interest, principal, amortization) are logged to audit-events with before/after values.
 * Once status = 'posted', the row is immutable and the GL posting is recorded in the journal-entries collection.
 * Auditors can walk from lease → lease-period-postings (one row per month) → journal-entries to verify:
 * (1) interest accretion per IFRS-16 §36 effective-interest method (opening × rate),
 * (2) principal repayment matching lease payments,
 * (3) ROU amortization per lease term (typically straight-line),
 * (4) GL posting accuracy (accounts, amounts, currency).
 * Per SOX §404, auditors often perform roll-forward testing on carrying amounts (opening balance + interest − principal
 * = closing balance) and trace to GL trial balances at period end. Reversals are tracked via status = 'reversed' with
 * a reference to the original journalEntry for traceability. @standard IFRS-16 §29-38 ROU-asset-and-liability-subsequent-measurement;
 * @standard SOX §404 internal-controls lease-accounting-completeness-and-accuracy.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "lpp_uuid_2026_may",
 *   "tenant": "tenant_bg_001",
 *   "postingId": "LPP-2026-05-LEASE-042",
 *   "lease": "lease_uuid_sofia_office",
 *   "periodStart": "2026-05-01",
 *   "periodEnd": "2026-05-31",
 *   "currency": "BGN",
 *   "openingLiabilityCarrying": 44700000,  // 447,000 BGN (from prior month close)
 *   "openingRouCarrying": 34500000,         // 345,000 BGN
 *   "interest": 130500,  // 447,000 × 3.5% ÷ 12 months
 *   "principalRepayment": 1369500,  // 15,000 − 1,305
 *   "cashPayment": 1500000,  // 15,000 BGN fixed payment
 *   "rouAmortisation": 140425,  // 505,500 initial ÷ 36 months
 *   "closingLiabilityCarrying": 43460500,  // 434,605 BGN
 *   "closingRouCarrying": 34359575,         // 343,596 BGN (reading decimals after rounding)
 *   "status": "posted",
 *   "postedAt": "2026-05-31T18:45:00Z",
 *   "journalEntry": "je_uuid_lpp_2026_05",
 *   "costCenter": "cc_sofia_hq",
 *   "createdBy": "batch_job_lease_accrual",
 *   "createdAt": "2026-05-31T16:00:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation for lease period postings
 * @useCase Lease period-end accrual, interest-accretion and ROU-amortization posting, SOX §404 audit evidence, carrying-amount roll-forward verification
 * @accounting IFRS-16 §29-31 rou-asset-subsequent-measurement-straight-line
 * @accounting IFRS-16 §36-38 lease-liability-amortised-cost-effective-interest-method
 * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time fiscal-period-boundaries
 * @audit ISO-19011:2018 audit-trail period-evidence-immutability carrying-amount-roll-forward
 * @compliance SOX §302 §404 internal-controls period-lock-enforcement completeness-accuracy
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/plugins/accounting/collections/leases.ts (lease master)
 * @see src/plugins/accounting/collections/leasemodifications.ts (modification register)
 * @see src/hooks/collections/accounting/lease-period-posting.hook.ts (GL posting hook)
 * @see docs/STANDARDS.md §4.2 lease-period-accounting
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields'
import { validateNotLocked } from '@/services/accounting/utilities/period-lock'
import { leasePeriodPostingHook } from '@/hooks/collections/accounting/lease-period-posting.hook'

const LeasePeriodPostings: CollectionConfig = {
  slug: 'lease-period-postings',
  labels: {
    singular: 'Lease Period Posting',
    plural: 'Lease Period Postings',
  },
  admin: {
    useAsTitle: 'postingId',
    defaultColumns: [
      'postingId',
      'lease',
      'periodEnd',
      'interest',
      'rouAmortisation',
      'closingLiabilityCarrying',
      'status',
    ],
    description:
      'Per-period IAS 16 / ASC 842 evidence. One row per (lease × period). JE fires on status → posted.',
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    {
      name: 'postingId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Stable id (e.g. LPP-2026-04-LEASE-001).' },
    },
    {
      name: 'lease',
      type: 'relationship',
      relationTo: 'leases',
      required: true,
      index: true,
    },
    {
      name: 'periodStart',
      type: 'date',
      required: true,
      admin: { description: 'Inclusive start of the period.' },
    },
    {
      name: 'periodEnd',
      type: 'date',
      required: true,
      index: true,
      admin: { description: 'Inclusive end of the period.' },
    },
    currencyField('EUR'),

    // ── Opening balances ──
    {
      name: 'openingLiabilityCarrying',
      type: 'number',
      required: true,
      admin: {
        description:
          'Lease liability carrying at start of period (cents). Source of the §36 effective-interest accretion.',
      },
    },
    {
      name: 'openingRouCarrying',
      type: 'number',
      required: true,
      admin: {
        description: 'ROU asset carrying at start of period (cents).',
      },
    },

    // ── Period activity ──
    {
      name: 'interest',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description:
          'Interest accretion this period (cents). IFRS 16 §36 effective-interest method: openingLiability × periodicRate.',
      },
    },
    {
      name: 'principalRepayment',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description:
          'Principal portion of the cash payment (cents). = leasePayment − interest. Reduces the liability.',
      },
    },
    {
      name: 'cashPayment',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description:
          'Total cash paid this period. = principalRepayment + interest.',
      },
    },
    {
      name: 'rouAmortisation',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description:
          'ROU asset amortisation booked this period (cents). IFRS 16 §31: typically straight-line over the lease term.',
      },
    },

    // ── Closing balances (computed) ──
    {
      name: 'closingLiabilityCarrying',
      type: 'number',
      admin: {
        readOnly: true,
        description:
          '= opening + interest − principalRepayment. Auditable evidence.',
      },
    },
    {
      name: 'closingRouCarrying',
      type: 'number',
      admin: {
        readOnly: true,
        description: '= opening − rouAmortisation.',
      },
    },

    // ── GL account overrides (optional — falls back to chart defaults) ──
    {
      name: 'interestExpenseAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
      admin: { description: 'Overrides the lease.interestExpenseAccount.' },
    },
    {
      name: 'leaseLiabilityAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
    },
    {
      name: 'rouAmortisationAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
    },
    {
      name: 'accumulatedRouAmortisationAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
    },
    {
      name: 'cashAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
      admin: {
        description:
          'Cash account debited for the principal repayment. Drives the IAS 7 cash-flows financing-activities classification.',
      },
    },

    // ── Optional cost-center analytical dimension ──
    {
      name: 'costCenter',
      type: 'relationship',
      relationTo: 'cost-centers',
      admin: {
        description:
          'Cost-center the lease cost allocates to (IFRS 8 / ASC 280 segment).',
      },
    },

    statusField(
      [
        { label: 'Calculated', value: 'calculated' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'calculated',
    ),
    {
      name: 'postedAt',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'journalEntry',
      type: 'relationship',
      relationTo: 'journal-entries',
      admin: { readOnly: true },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      autoSetTimestamp(
        'postedAt',
        (d) => (d as { status?: string }).status === 'posted',
      ),
    ],
    afterChange: [
      // GL post when status flips to 'posted' — books the canonical
      // IAS 16 §36-§38 + §29-§31 entries.
      leasePeriodPostingHook,
      auditTrailAfterChange('lease-period-postings'),
    ],
  },
  timestamps: true,
}

export default LeasePeriodPostings
