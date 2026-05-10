/**
 * Leases — IFRS 16 / ASC 842 right-of-use asset + lease liability.
 *
 * The canonical type lives in `@/standards/ifrs-16` (Lease + RouAsset +
 * LeaseLiability + LeasePayment + LeaseModification). This collection's
 * field set is the Payload projection of that type:
 *
 *   canonical.id                 → doc.id (Payload-managed)
 *   canonical.tenantId           → doc.tenant
 *   canonical.lessorId           → doc.lessor
 *   canonical.classification     → doc.classification (LeaseClassification)
 *   canonical.commencementDate   → doc.commencementDate
 *   canonical.endDate            → doc.endDate
 *   canonical.fixedPayment       → doc.fixedPayment
 *   canonical.paymentFrequency   → doc.paymentFrequency
 *   canonical.paymentTiming      → doc.paymentTiming
 *   canonical.currency           → doc.currency
 *   canonical.discountRatePercent → doc.discountRatePercent
 *   canonical.discountRateBasis  → doc.discountRateBasis
 *   canonical.rouAsset.initialCost     → doc.initialRouAsset
 *   canonical.rouAsset.carryingAmount  → doc.rouAssetCarrying
 *   canonical.rouAsset.impairmentReserve → doc.impairmentReserve
 *   canonical.liability.initialAmount  → doc.initialLeaseLiability
 *   canonical.liability.carryingAmount → doc.liabilityCarrying
 *   canonical.modifications      → doc.modifications (LeaseModification[])
 *   canonical.status             → doc.status
 *   canonical.terminationDate    → doc.terminationDate
 *
 * Under IFRS 16 (effective 2019) the lessee model recognises a single
 * accounting treatment for almost every lease: a right-of-use (ROU)
 * asset and a corresponding lease liability, with two recognition
 * exemptions (short-term ≤ 12 months and low-value underlying asset).
 *
 * The collection captures the master data needed to amortise both
 * sides over the lease term:
 *   • Lease term, fixed/variable payments, discount rate, currency
 *   • Initial ROU asset measurement (= initial liability + prepayments
 *     + initial direct costs − incentives)
 *   • Initial liability measurement (= PV of unpaid payments at
 *     commencement, discounted at rate implicit / IBR)
 *   • Period-end posting telemetry (carrying amounts after each cycle)
 *
 * The actual interest-accretion + amortisation JE is posted via a
 * follow-up `lease-period-postings` collection (next slice) — same
 * shape as `depreciation-schedules` for fixed assets.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time commencement-date end-date
 * @accounting IFRS IFRS-16 leases lessee-recognition
 * @accounting IFRS IFRS-16 §22-§35 initial-measurement-rou-asset
 * @accounting IFRS IFRS-16 §26-§28 initial-measurement-lease-liability
 * @accounting IFRS IFRS-16 §29-§31 subsequent-measurement-rou
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 * @accounting US-GAAP ASC-842-20-25 finance-vs-operating-lease
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls capital-asset-register
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/standards/ifrs-16/types.ts
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '../fields/base-accounting-fields'
import { validateNotLocked } from '../utilities/period-lock'

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
        { name: 'notes', type: 'textarea' },
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
