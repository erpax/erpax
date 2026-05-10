import type { CollectionConfig } from 'payload'
import { tenantMasterDataAccess } from '@/plugins/auth/access'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { multiTenancyField } from '../fields/base-accounting-fields'

/**
 * Fiscal Periods — accounting calendar with period locking.
 *
 * Lifecycle: open → closed → locked (admin-only to lock or unlock).
 *
 * Slice ZZ: SoD enforcement now actually wired (the user who created the
 * period cannot also close it or lock it); structured audit-trail event
 * emitted on every status transition.
 *
 * @standard ISO-8601-1:2019 date-time start-date end-date closed-at locked-at reopened-at
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-210 balance-sheet
 * @compliance SOX §404 period-close-integrity
 * @security ISO-27002 §5.4 segregation-of-duties closer-vs-creator locker-vs-creator
 * @audit ISO-19011:2018 audit-trail status-transition
 * @see docs/STANDARDS.md §4.2
 *
 *
 * Locking semantics:
 *   When status === 'locked', no GL-posting collection (Invoices, Payments,
 *   Entries, Equations, JournalEntries, GLPostings, BankStatements,
 *   PeriodEndAdjustments, …) may write a record whose posting date falls
 *   inside [startDate, endDate]. Enforced by `validateNotLocked` from
 *   `@/plugins/accounting/utilities/period-lock`.
 *
 * Only role 'admin' may transition status to / from 'locked'.
 */
export const FiscalPeriods: CollectionConfig = {
  slug: 'fiscal-periods',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'identity.fiscalYear', 'identity.periodNumber', 'dates.startDate', 'dates.endDate', 'lifecycle.status', 'lifecycle.closedAt'],
    group: 'Ledger',
  },
  access: tenantMasterDataAccess(),
  hooks: {
    beforeValidate: [
      autoPopulateTenant,
      async ({ data }) => {
        if (data && !data.label && data.fiscalYear && data.periodNumber !== undefined) {
          const padded = String(data.periodNumber).padStart(2, '0')
          data.label = `FY${data.fiscalYear}-P${padded}`
        }
        return data
      },
    ],
    beforeChange: [
      // ISO-27002 §5.4 / SOX §404 four-eyes: the user who created the
      // period cannot also be the user who closes it (`closedBy`) or
      // locks it (`lockedBy`). Two enforcers, one per approval field.
      enforceSegregationOfDuties('closedBy', 'createdBy'),
      enforceSegregationOfDuties('lockedBy', 'createdBy'),
      async ({ data }) => {
        if (data.startDate && data.endDate) {
          const from = new Date(data.startDate).getTime()
          const to = new Date(data.endDate).getTime()
          if (to < from) {
            throw new Error('endDate must be on or after startDate')
          }
        }
        return data
      },
      async ({ data, originalDoc, req }) => {
        if (!originalDoc) return data
        const prev = originalDoc.status as string | undefined
        const next = data.status as string | undefined

        const movingIntoLocked = next === 'locked' && prev !== 'locked'
        const movingOutOfLocked = prev === 'locked' && next !== 'locked'

        if (movingIntoLocked || movingOutOfLocked) {
          const isAdmin = (req.user?.roles as string[] | undefined)?.includes('admin')
          if (!isAdmin) {
            throw new Error('Only admins may lock or unlock a fiscal period')
          }
        }

        if (next === 'closed' && prev !== 'closed') {
          data.closedAt = data.closedAt ?? new Date().toISOString()
          data.closedBy = data.closedBy ?? req.user?.id
        }
        if (movingIntoLocked) {
          data.lockedAt = data.lockedAt ?? new Date().toISOString()
          data.lockedBy = data.lockedBy ?? req.user?.id
        }
        if (movingOutOfLocked) {
          data.reopenedAt = new Date().toISOString()
          data.reopenedBy = req.user?.id
        }
        return data
      },
    ],
    // SOX §404 period-close-integrity: every fiscal-period status change
    // (open → closed → locked → reopened) emits a structured audit event.
    afterChange: [auditTrailAfterChange('fiscal-periods')],
  },
  fields: [
    // Identity — `label` kept at top level so `useAsTitle` can resolve it
    // (Payload's useAsTitle does not traverse into groups). Same fix
    // pattern as TaxJurisdictions.
    { name: 'label', type: 'text', unique: true, index: true,
      admin: { description: 'Auto-derived label (e.g., FY2026-P05). Editable.' } },
    {
      type: 'group',
      name: 'identity',
      label: 'Identity',
      fields: [
        { name: 'fiscalYear', type: 'number', required: true, index: true, min: 1900, max: 2999,
          admin: { description: 'Fiscal year (e.g., 2026)' } },
        { name: 'periodNumber', type: 'number', required: true, index: true, min: 1, max: 53,
          admin: { description: 'Period within the fiscal year (1-12 monthly, up to 53 weekly)' } },
        { name: 'periodType', type: 'select', required: true, defaultValue: 'monthly',
          options: [
            { label: 'Monthly', value: 'monthly' },
            { label: '4-4-5 Weekly', value: 'weekly_445' },
            { label: 'Quarterly', value: 'quarterly' },
            { label: 'Annual', value: 'annual' },
            { label: 'Custom', value: 'custom' },
          ],
          admin: { description: 'Calendar shape' } },
      ],
    },
    {
      type: 'group',
      name: 'dates',
      label: 'Dates',
      fields: [
        { name: 'startDate', type: 'date', required: true, index: true,
          admin: { description: 'ISO 8601 first day of period (inclusive)' } },
        { name: 'endDate', type: 'date', required: true, index: true,
          admin: { description: 'ISO 8601 last day of period (inclusive)' } },
      ],
    },
    {
      type: 'group',
      name: 'lifecycle',
      label: 'Lifecycle',
      fields: [
        { name: 'status', type: 'select', required: true, defaultValue: 'open',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
            { label: 'Locked', value: 'locked' },
          ], index: true,
          admin: { description: 'open = postable. closed = soft close (adjustments still allowed). locked = no GL writes for any date in this period.' } },
        { name: 'closedAt', type: 'date',
          admin: { description: 'When period was soft-closed', readOnly: true } },
        { name: 'closedBy', type: 'relationship', relationTo: 'users',
          admin: { description: 'Actor who closed', readOnly: true } },
        { name: 'lockedAt', type: 'date',
          admin: { description: 'When period was hard-locked', readOnly: true } },
        { name: 'lockedBy', type: 'relationship', relationTo: 'users',
          admin: { description: 'Admin who locked', readOnly: true } },
        { name: 'reopenedAt', type: 'date',
          admin: { description: 'Last unlock timestamp', readOnly: true } },
        { name: 'reopenedBy', type: 'relationship', relationTo: 'users',
          admin: { description: 'Admin who reopened', readOnly: true } },
      ],
    },
    {
      type: 'group',
      name: 'notes',
      label: 'Notes',
      fields: [
        { name: 'note', type: 'textarea', admin: { description: 'Close memo / lock justification' } },
      ],
    },
    { name: 'metadata', type: 'json', admin: { description: 'Additional metadata' } },
    multiTenancyField(),
  ],
  timestamps: true,
}
