/**
 * # Leases Collection
 *
 * @summary IFRS-16 / ASC-842 lessee accounting: right-of-use (ROU) asset + lease liability measurement, classification, and period-end posting evidence.
 *
 * ## Core Function
 *
 * The Leases collection registers all lease contracts from the lessee perspective (rented equipment, facilities,
 * vehicles, software licenses). Under IFRS-16 (effective 2019) and US-GAAP ASC-842, almost all leases are recognized
 * on the balance sheet as a right-of-use (ROU) asset and corresponding lease liability, with two narrow exemptions:
 * short-term leases (≤12 months) and low-value underlying assets (per ASC-842 materiality threshold or IFRS-16 bright-line).
 * Each lease record captures the master data needed to measure initial ROU and liability at commencement (cost basis,
 * payments, discount rate, lease incentives, prepayments, direct costs) and to calculate period-end interest accretion
 * and ROU amortization. The lease-classification field (finance vs. operating under ASC-842; default to "finance" under
 * IFRS-16 single-model) gates subsequent accounting. Modifications (term extensions, payment changes, scope changes)
 * are recorded separately in the lease-modifications collection and trigger remeasurement of liability and ROU per
 * IFRS-16 §39-42 / ASC-842-10-25-8. Period-end carrying amounts (rouAssetCarrying, liabilityCarrying) are updated
 * monthly/quarterly by the lease-period-postings posting hook, providing auditable evidence of amortization and
 * accrued interest. The collection is the master register for lease accounting compliance under SOX §404.
 *
 * ## Architecture
 *
 * Multi-tenancy is enforced via the `tenant` field (indexed). Each lease has a unique leaseNumber and optional description
 * (localized for multi-language lease purpose or underlying-asset names). The lessor field links to the counterparty
 * (vendor/supplier offering the lease); classification and underlyingAssetCategory drive GL account selection and
 * reporting categorization. Commencement and endDate define the lease term; leaseTermMonths is computed (read-only).
 * Payment terms (fixedPayment, paymentFrequency, paymentTiming, variablePaymentNotes) define the cash flow schedule.
 * The discount-rate basis (rate implicit in lease vs. incremental borrowing rate per IFRS-16 §26) and the discountRatePercent
 * (annually, e.g., 4.5 for 4.5%) are immutable post-commencement (except in lease modifications). Initial measurement fields
 * (initialLeaseLiability, initialDirectCosts, leaseIncentivesReceived, prepaidRent, initialRouAsset) are read-only snapshots
 * computed at commencement. Carrying-amount fields (rouAssetCarrying, liabilityCarrying, lastPostingDate) are read-only
 * and updated by the lease-period-postings afterChange hook. GL account mappings (rouAssetAccount, leaseLiabilityAccount,
 * rouAmortizationAccount, interestExpenseAccount) are relationship fields pointing to gl-accounts and drive JE posting
 * templates in the lease-period-posting hook. The modifications array (inline, not a separate relationship) captures
 * per-modification detail (effectiveDate, kind, newTerms); each modification also spawns a row in lease-modifications
 * for audit substantiation per IFRS-16 §44-46 guidance. Status lifecycle (draft → active → modified / terminated / expired)
 * gates whether the lease is accrual-active. Impairment reserve (per IAS-36) is optional and reduces the ROU carrying amount.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:**
 *   - `autoPopulateTenant`: Stamps `tenant` from context.
 * - **beforeChange:**
 *   - `validateNotLocked`: Prevents modification if the fiscal period is locked per period-lock policy (prevents mid-period lease reclassification).
 *   - `autoPopulateCreatedBy`: Stamps `createdBy` on initial insert.
 *   - `autoSetTimestamp('terminationDate', ...)`: Auto-stamps terminationDate when status → 'terminated'.
 * - **afterChange:**
 *   - `auditTrailAfterChange('leases')`: Logs full record delta to audit-events.
 *   - (Future) lease-measurement hook: on initial creation or modification, calculates initialLeaseLiability and initialRouAsset
 *     and stamps the carrying amounts; emits GL entry to book the initial ROU asset and lease liability per IFRS-16 §24.
 *
 * ## Key Fields
 *
 * - **leaseNumber (text, required, unique, indexed):** Immutable sequential or contract-ref identifier (e.g., 'LEASE-2026-0042'). Primary user-facing ID.
 * - **description (text, localized):** Underlying asset description (e.g., 'Office space — Sofia HQ Floor 3') in user's locale. Optional but recommended for clarity.
 * - **lessor (relationship to addresses):** Counterparty / lessor contact. Links to vendor/supplier address registry.
 * - **classification (select, required, default 'finance'):** Lease classification per IFRS-16 / ASC-842. Under IFRS-16 (single model), 'finance' is the norm; 'operating', 'short_term', 'low_value' are exemptions. Under ASC-842 (dual model), 'finance' vs. 'operating' distinction drives ROU/liability recognition (operating = off-balance). @standard IFRS-16 §22-35, ASC-842-20-25.
 * - **underlyingAssetCategory (select):** Lease subject-matter (real_estate, vehicles, equipment, it_hardware, software, other). Drives GL-account defaults and disclosure categorization.
 * - **commencementDate (date, required):** Lease commencement (lessor makes asset available) per IFRS-16 §22. Immutable; drives initial measurement reference date.
 * - **endDate (date, required):** Lease end date including reasonably-certain extensions/options per IFRS-16 §B37. Immutable unless modified per IFRS-16 §44-46.
 * - **leaseTermMonths (number, read-only):** Computed lease term in months (endDate − commencementDate). Used to calculate monthly ROU amortization.
 * - **fixedPayment (number, required, min 0):** Fixed periodic payment (cents, per paymentFrequency cycle) per IFRS-16 §27. Immutable unless modified.
 * - **paymentFrequency (select, default 'monthly'):** Payment cycle: monthly, quarterly, semi_annually, annually. Drives period-end payment-recognition schedule.
 * - **paymentTiming (select, default 'in_advance'):** Annuity due (in_advance) vs. ordinary annuity (in_arrears). Affects NPV calculation per IFRS-16 §27.
 * - **variablePaymentNotes (textarea):** Variable lease payments (e.g., "CPI-linked 2% annually", "Linked to Euribor + 2.5%"). Per IFRS-16 §27, only those linked to an index/rate are included in the liability; capture the remeasurement rules here for next-period recalculation.
 * - **residualValueGuarantee (number, default 0):** Guaranteed residual value (cents) per IFRS-16 §27. Included in the initial liability if the lessee guarantees the residual to the lessor.
 * - **terminationPenalty (number, default 0):** Early-termination penalty (cents). Included in liability if termination is reasonably certain per IFRS-16 §27.
 * - **discountRateBasis (select, default 'incremental_borrowing'):** Rate selection per IFRS-16 §26: 'rate_implicit' (if readily determinable) or 'incremental_borrowing' (IBR). Immutable post-commencement.
 * - **discountRatePercent (number, required, min 0):** Annual discount rate (percent, e.g., 4.5 for 4.5% per annum). Used to compute PV of payments and interest accretion per IFRS-16 §36 effective-interest method.
 * - **currency (select, default 'EUR'):** Lease payment currency per ISO-4217:2015.
 * - **initialLeaseLiability (number, read-only):** PV of unpaid payments at commencement (cents) discounted at discountRatePercent per IFRS-16 §26. Computed on initial insertion and immutable until modification.
 * - **initialDirectCosts (number, default 0):** Initial direct costs incurred by lessee (legal, appraisal, transaction costs) per IFRS-16 §24(c). Added to initial ROU.
 * - **leaseIncentivesReceived (number, default 0):** Lease incentives (rent-free period, lessor improvement allowance) per IFRS-16 §24(b). Subtracted from initial ROU.
 * - **prepaidRent (number, default 0):** Lease payments made at or before commencement per IFRS-16 §24(b). Added to initial ROU.
 * - **initialRouAsset (number, read-only):** = initialLeaseLiability + initialDirectCosts + prepaidRent − leaseIncentivesReceived per IFRS-16 §24. Initial cost basis of the ROU asset (amortized over leaseTermMonths).
 * - **rouAssetCarrying (number, read-only):** ROU asset net book value at last posting date (cents). = initialRouAsset − cumulativeRouAmortization. Updated monthly/quarterly by lease-period-postings hook.
 * - **liabilityCarrying (number, read-only):** Lease liability balance at last posting date (cents). = initialLeaseLiability + interest − principal payments. Updated monthly/quarterly by lease-period-postings hook.
 * - **lastPostingDate (date, read-only):** Last date lease-period-posting was booked; used for carry-forward diagnostics.
 * - **modifications (array, inline):** Lease modifications (term extension, payment change, scope change) with IFRS-16 §44-46 classification. Each array element captures: effectiveDate, kind (scope_increase_separate, scope_increase_combined, term_extension, term_reduction, payment_change, discount_rate_reset), newDiscountRatePercent, newFixedPayment, newEndDate, localized notes. Parallel rows in lease-modifications collection provide substantiation.
 * - **impairmentReserve (number, default 0):** IAS-36 impairment loss on ROU asset (cents). Reduces rouAssetCarrying for reporting.
 * - **status (select, default 'draft'):** Lease lifecycle: 'draft' (not yet active), 'active' (in-service, generating monthly postings), 'modified' (remeasured after modification), 'terminated' (early termination), 'expired' (normal maturity). Only 'active' and 'modified' generate period postings.
 * - **terminationDate (date):** Early termination date (if applicable; auto-stamped when status → 'terminated'). Triggers final-period posting with gain/loss on termination per IFRS-16 §46.
 * - **rouAssetAccount (relationship to gl-accounts):** GL account for ROU asset (e.g., 1810 'Right-of-Use Assets'). Required for JE posting.
 * - **leaseLiabilityAccount (relationship to gl-accounts):** GL account for lease liability (e.g., 2110 'Lease Liabilities'). Required for JE posting.
 * - **rouAmortizationAccount (relationship to gl-accounts):** GL account for ROU amortization expense (e.g., 6120 'ROU Amortization Expense'). Debited monthly.
 * - **interestExpenseAccount (relationship to gl-accounts):** GL account for interest on lease liability (e.g., 6200 'Interest Expense — Leases'). Debited monthly per effective-interest method.
 * - **notes (textarea):** Commentary (e.g., "5-year office lease; extension options require 90-day notice", "Pledged under asset-based lending facility").
 *
 * ## Core Invariants
 *
 * - **Lease Classification Immutability (Post-Commencement):** classification is set at inception and immutable per IFRS-16 §22, ASC-842-10-25. Reclassification (e.g., finance → operating) would require a substantive contract change or restatement per IAS-8, recorded in lease-modifications.
 * - **Commencement & End Date Immutability (Unless Modified):** commencementDate and endDate are immutable except via formal lease modifications per IFRS-16 §44-46. Changes must be documented in lease-modifications collection.
 * - **Discount Rate Immutability (Unless Modified):** discountRatePercent is set at commencement and immutable unless modified (captured in modifications array and lease-modifications row) per IFRS-16 §26, §45(c).
 * - **ROU Asset & Liability Symmetry:** initialRouAsset and initialLeaseLiability are computed together and immutable until modification. Any adjustment to ROU must be mirrored in liability per IFRS-16 §39(b).
 * - **Period-Lock Enforcement:** lease-period-postings respect validateNotLocked; once a period is closed, no new postings can be created for that period, and existing postings are immutable per SOX §404.
 * - **Status Transition Immutability:** status transitions (draft → active → modified / terminated / expired) are tracked in audit-events and affect whether new period postings are auto-generated.
 *
 * ## Audit Trail
 *
 * Every lease record captures:
 * - `createdBy` (user ID + timestamp): Initial creation stamp.
 * - `modifiedBy` (user ID + timestamp): Last modification stamp (locked once status = 'active').
 * - All changes (classification, terms, modifications) are logged to audit-events with before/after values.
 * The modifications array + lease-modifications rows provide a detailed change log substantiating each IFRS-16 §44-46
 * remeasurement event. Auditors can walk from leases → lease-modifications → lease-period-postings → journal-entries
 * to verify (1) lease inception and classification, (2) modification and remeasurement, (3) period-end interest accretion
 * and ROU amortization, (4) GL posting accuracy. Per SOX §404, the period-lock constraint prevents editing of closed-period
 * postings, ensuring audit trail immutability. @standard IFRS-16 §22-35 recognition-and-initial-measurement; @standard
 * SOX §404 internal-controls lease-accounting-completeness.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "lease_uuid_sofia_office",
 *   "tenant": "tenant_bg_001",
 *   "leaseNumber": "LEASE-2026-0042",
 *   "description": "Sofia HQ — Office space (Floor 3, 500 sqm)",
 *   "descriptionLocalized": {
 *     "en": "Sofia HQ — Office space (Floor 3, 500 sqm)",
 *     "bg": "Централа София — Офис (Етаж 3, 500 кв.м)"
 *   },
 *   "lessor": "addr_uuid_landlord_acme",
 *   "classification": "finance",
 *   "underlyingAssetCategory": "real_estate",
 *   "commencementDate": "2026-01-01",
 *   "endDate": "2028-12-31",
 *   "leaseTermMonths": 36,
 *   "fixedPayment": 1500000,  // 15,000 BGN/month
 *   "paymentFrequency": "monthly",
 *   "paymentTiming": "in_advance",
 *   "variablePaymentNotes": "Index-linked to CPI annual reset, capped at +3% per annum",
 *   "residualValueGuarantee": 0,
 *   "discountRatePercent": 3.5,
 *   "discountRateBasis": "incremental_borrowing",
 *   "currency": "BGN",
 *   "initialLeaseLiability": 52500000,  // ~525,000 BGN (PV of 36×15,000)
 *   "initialDirectCosts": 50000,  // 500 BGN
 *   "leaseIncentivesReceived": 1500000,  // 15,000 BGN (1-month free)
 *   "prepaidRent": 1500000,  // 15,000 BGN (paid on commencement)
 *   "initialRouAsset": 50550000,  // 525,000 + 0.5 − 15 + 15 (thousands in cents)
 *   "rouAssetCarrying": 34500000,  // 345,000 BGN (after 7 months amortization)
 *   "liabilityCarrying": 44700000,  // 447,000 BGN (after payments + interest)
 *   "lastPostingDate": "2026-05-31",
 *   "status": "active",
 *   "rouAssetAccount": "gl_1810",
 *   "leaseLiabilityAccount": "gl_2110",
 *   "rouAmortizationAccount": "gl_6120",
 *   "interestExpenseAccount": "gl_6200",
 *   "createdBy": "accountant_001",
 *   "createdAt": "2025-12-10T10:00:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation for leases & lease accounting
 * @useCase Lease accounting, ROU asset + liability recognition, period-end interest accrual, lease modifications, SOX §404 lease-control audit
 * @accounting IFRS-16 §22-35 lessee-recognition-and-initial-measurement
 * @accounting IFRS-16 §26-28 initial-measurement-lease-liability
 * @accounting IFRS-16 §29-31 subsequent-measurement-rou-asset
 * @accounting IFRS-16 §36-38 subsequent-measurement-lease-liability-effective-interest
 * @accounting IFRS-16 §39-42 lease-remeasurement
 * @accounting IFRS-16 §44-46 lease-modifications
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 * @accounting US-GAAP ASC-842-20-25 classification-as-finance-or-operating
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time commencement-date end-date
 * @audit ISO-19011:2018 audit-trail lease-accounting-evidence
 * @compliance SOX §302 §404 internal-controls capital-asset-register
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/plugins/accounting/collections/leasemodifications.ts (modification register)
 * @see src/plugins/accounting/collections/leaseperiodpostings.ts (period-end evidence)
 * @see src/standards/ifrs-16/types.ts (canonical type definitions)
 * @see docs/STANDARDS.md §4.2 lease-accounting-standards
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

const Leases: CollectionConfig = {
  slug: 'leases',
  labels: { singular: 'Lease', plural: 'Leases' },
  admin: {
    useAsTitle: 'leaseNumber',
    defaultColumns: [
      'leaseNumber',
      'lessor',
      'classification',
      'commencementDate',
      'endDate',
      'rouAssetCarrying',
      'liabilityCarrying',
      'status',
    ],
    description:
      'IFRS 16 / ASC 842 lessee leases. ROU asset + lease liability with period-end carrying amounts.',
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
      name: 'leaseNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description:
          'Underlying asset description (e.g. "Office space — Sofia HQ Floor 3").',
      },
    },
    {
      name: 'lessor',
      type: 'relationship',
      relationTo: 'addresses',
      admin: { description: 'Counterparty / lessor.' },
    },

    // ── Recognition + classification ──
    {
      name: 'classification',
      type: 'select',
      required: true,
      defaultValue: 'finance',
      options: [
        { label: 'Finance (IFRS 16 default / ASC 842 finance)', value: 'finance' },
        { label: 'Operating (ASC 842 operating only)', value: 'operating' },
        { label: 'Short-term — recognition exemption (≤ 12 months)', value: 'short_term' },
        { label: 'Low-value — recognition exemption', value: 'low_value' },
      ],
      admin: {
        description:
          'IFRS 16: lessee uses single model — "finance" maps to ROU+Liability. ASC 842 retains operating/finance distinction. Short-term and low-value are IFRS 16 exemptions (off-balance-sheet).',
      },
    },
    {
      name: 'underlyingAssetCategory',
      type: 'select',
      options: [
        { label: 'Real estate', value: 'real_estate' },
        { label: 'Vehicles', value: 'vehicles' },
        { label: 'Equipment', value: 'equipment' },
        { label: 'IT / hardware', value: 'it_hardware' },
        { label: 'Software (licences as ROU)', value: 'software' },
        { label: 'Other', value: 'other' },
      ],
    },

    // ── Lease term ──
    {
      name: 'commencementDate',
      type: 'date',
      required: true,
      admin: {
        description:
          'Date the lessor makes the underlying asset available — IFRS 16 §22.',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: { description: 'Lease end date including any reasonably certain extensions.' },
    },
    {
      name: 'leaseTermMonths',
      type: 'number',
      admin: {
        readOnly: true,
        description:
          'Computed lease term in months (commencement → end including extension options reasonably certain — IFRS 16 §B37).',
      },
    },

    // ── Payments ──
    {
      name: 'fixedPayment',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description:
          'Fixed periodic payment, integer cents. Per `paymentFrequency` cycle.',
      },
    },
    {
      name: 'paymentFrequency',
      type: 'select',
      defaultValue: 'monthly',
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Semi-annually', value: 'semi_annually' },
        { label: 'Annually', value: 'annually' },
      ],
    },
    {
      name: 'paymentTiming',
      type: 'select',
      defaultValue: 'in_advance',
      options: [
        { label: 'In advance (annuity-due)', value: 'in_advance' },
        { label: 'In arrears (annuity-immediate)', value: 'in_arrears' },
      ],
    },
    {
      name: 'variablePaymentNotes',
      type: 'textarea',
      admin: {
        description:
          'Variable lease payments (e.g. CPI-linked, performance-based). Per IFRS 16 §27, only those linked to an index/rate are included in the liability — capture the rules here for next-remeasurement.',
      },
    },
    {
      name: 'residualValueGuarantee',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Residual value guaranteed to lessor — included in liability per IFRS 16 §27.',
      },
    },
    {
      name: 'terminationPenalty',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Penalty for terminating, included in liability if termination is reasonably certain (IFRS 16 §27).',
      },
    },

    // ── Discount rate ──
    {
      name: 'discountRateBasis',
      type: 'select',
      defaultValue: 'incremental_borrowing',
      options: [
        { label: 'Rate implicit in the lease', value: 'rate_implicit' },
        { label: 'Lessee incremental borrowing rate (IBR)', value: 'incremental_borrowing' },
      ],
      admin: {
        description:
          'IFRS 16 §26 — use rate implicit in the lease if readily determinable; otherwise IBR.',
      },
    },
    {
      name: 'discountRatePercent',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Annual discount rate (percent, e.g. 4.5 for 4.5%).',
      },
    },

    // ── Initial measurement ──
    currencyField('EUR'),
    {
      name: 'initialLeaseLiability',
      type: 'number',
      admin: {
        readOnly: true,
        description:
          'PV of unpaid lease payments at commencement, discounted at the rate above. Computed by leaseService.calculateInitialMeasurement.',
      },
    },
    {
      name: 'initialDirectCosts',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Initial direct costs incurred by the lessee — IFRS 16 §24(c).' },
    },
    {
      name: 'leaseIncentivesReceived',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lease incentives received from the lessor — IFRS 16 §24(b).' },
    },
    {
      name: 'prepaidRent',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lease payments made at or before commencement — IFRS 16 §24(b).' },
    },
    {
      name: 'initialRouAsset',
      type: 'number',
      admin: {
        readOnly: true,
        description:
          '= initialLeaseLiability + initialDirectCosts + prepaidRent − leaseIncentivesReceived. IFRS 16 §24.',
      },
    },

    // ── Period-end carrying telemetry (recomputed by service) ──
    {
      name: 'rouAssetCarrying',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'ROU asset carrying amount as of last posting (after amortisation).',
      },
    },
    {
      name: 'liabilityCarrying',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Lease liability carrying amount as of last posting (after interest + payment).',
      },
    },
    {
      name: 'lastPostingDate',
      type: 'date',
      admin: { readOnly: true },
    },

    // ── Modifications + impairment ──
    {
      name: 'modifications',
      type: 'array',
      admin: {
        description:
          'Lease modifications (scope, payments, term). IFRS 16 §44-§46 / ASC 842-10-25-8 trigger remeasurement.',
      },
      fields: [
        { name: 'effectiveDate', type: 'date', required: true },
        {
          name: 'kind',
          type: 'select',
          required: true,
          options: [
            { label: 'Scope increase (separate lease)', value: 'scope_increase_separate' },
            { label: 'Scope increase (not separate — remeasure)', value: 'scope_increase_combined' },
            { label: 'Term extension', value: 'term_extension' },
            { label: 'Term reduction', value: 'term_reduction' },
            { label: 'Payment change', value: 'payment_change' },
            { label: 'Discount-rate reset', value: 'discount_rate_reset' },
          ],
        },
        { name: 'newDiscountRatePercent', type: 'number' },
        { name: 'newFixedPayment', type: 'number' },
        { name: 'newEndDate', type: 'date' },
        { name: 'notes', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'impairmentReserve',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'IAS 36 impairment reserve on the ROU asset.' },
    },

    // ── Status lifecycle ──
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Modified', value: 'modified' },
        { label: 'Terminated', value: 'terminated' },
        { label: 'Expired', value: 'expired' },
      ],
      'draft',
    ),
    {
      name: 'terminationDate',
      type: 'date',
      admin: { description: 'Date the lease was terminated early (if applicable).' },
    },

    // ── GL account mapping ──
    {
      name: 'rouAssetAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
      admin: { description: 'Right-of-use asset GL account.' },
    },
    {
      name: 'leaseLiabilityAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
      admin: { description: 'Lease liability GL account.' },
    },
    {
      name: 'rouAmortizationAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
    },
    {
      name: 'interestExpenseAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
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
        'terminationDate',
        (d) => (d as { status?: string }).status === 'terminated',
      ),
    ],
    afterChange: [auditTrailAfterChange('leases')],
  },
  timestamps: true,
}

export default Leases
