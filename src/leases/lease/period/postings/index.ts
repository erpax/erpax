/**
 * Lease Period Postings — period-by-period IAS 16 / ASC 842 evidence.
 *
 * One row per (lease × period). Mirrors `depreciation-schedules` for
 * fixed assets. Captures the per-period decomposition of the lease
 * payment + ROU amortisation:
 *
 *   Interest accretion (Dr Interest Expense / Cr Lease Liability)
 *   Principal repayment (Dr Lease Liability / Cr Cash)
 *   ROU amortisation   (Dr ROU Amortisation Exp / Cr Accumulated ROU Am.)
 *
 * Status lifecycle: calculated → posted → reversed. The
 * `lease-period-posting.hook.ts` fires on `status → 'posted'` and books
 * the JE via journalEntryService — same pattern as DepreciationSchedules
 * + PeriodEndAdjustments.
 *
 * SOX §404 evidence trail: every period of every lease has its own
 * row — the auditor reads carrying-amount progression directly without
 * reconstructing it from JE history.
 *
 * @standard ISO-8601-1:2019 date-time period-start period-end
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
 * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
 * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
 * @audit ISO-19011:2018 audit-trail period-evidence
 * @compliance SOX §404 internal-controls capital-asset-register
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/plugins/accounting/collections/Leases.ts
 * @see src/standards/ifrs-16/types.ts LeasePayment
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import {
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/base/accounting/field'
import { validateNotLocked } from '@/accounting/utility/period-lock'
import { leasePeriodPostingHook } from '@/accounting/hooks/lease-period-posting.hook'

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
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
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
