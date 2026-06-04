/**
 * Prior-Period Adjustments — IAS-8 §42-49 retrospective corrections of
 * material errors discovered after a period was closed.
 *
 * Slice TTT (2026-05-10): added per Slice NNN gap discovery. Distinct
 * from `period-end-adjustments` (which books regular accruals into the
 * CURRENT open period) — this collection records corrections to a
 * PRIOR closed period via restatement of the opening balances of the
 * earliest period presented.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time adjustment-date post-date
 * @accounting IFRS IAS-8 §42-49 errors-of-prior-periods
 * @accounting US-GAAP ASC-250-10-45 accounting-changes-and-error-corrections
 * @accounting US-GAAP ASC-250-10-50 disclosure-of-prior-period-adjustments
 * @audit ISO-19011:2018 audit-trail prior-period-restatement
 * @compliance SOX §404 internal-controls restatement-control TOM-PPA-01
 * @compliance SOX §906 ceo-cfo-certification material-misstatement
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./PeriodEndAdjustments.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { tenantAdminWriteAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/base-accounting-fields'

const PriorPeriodAdjustments: CollectionConfig = {
  slug: 'prior-period-adjustments',
  labels: { singular: 'Prior-Period Adjustment', plural: 'Prior-Period Adjustments' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'adjustmentDate', 'postDate', 'amount', 'reason', 'status'],
    description:
      'IAS-8 §42 retrospective corrections of material errors discovered after a period was closed. Restates opening balances; never re-opens the prior period.',
  },
  access: tenantAdminWriteAccess(), // Slice VVV: gated by feature 'period_end_closing' (see featureGuard wiring TBA)
  fields: [
    referenceField({ description: 'PPA reference (e.g. `PPA-2026-001`).' }),
    { name: 'adjustmentDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — original date of the misstatement (the prior-period transaction date).' } },
    { name: 'postDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — current-period date the restatement entry is booked. Per IAS-8 §42, restatement adjusts opening balances of the earliest period presented.' } },
    { name: 'priorPeriod', type: 'relationship', relationTo: 'fiscal-periods',
      admin: { description: 'The closed fiscal period being restated.' } },
    { name: 'reason', type: 'text', required: true,
      admin: { description: 'Description of the error — required for IAS-8 §49 disclosure.' } },
    {
      name: 'errorCategory',
      type: 'select',
      defaultValue: 'mathematical',
      options: [
        { label: 'Mathematical / Computational', value: 'mathematical' },
        { label: 'Misapplication of Accounting Policy', value: 'policy_misapplication' },
        { label: 'Oversight or Misinterpretation of Facts', value: 'oversight' },
        { label: 'Fraud Discovered Post-Close', value: 'fraud' },
      ],
      admin: { description: 'IAS-8 §41 categorisation — drives §49 disclosure depth.' },
    },
    currencyField(),
    { name: 'amount', type: 'number', required: true,
      admin: { description: 'Net adjustment amount in cents (signed: + restates equity up, − restates equity down).' } },
    { name: 'restatementJournalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { description: 'The current-period JE booking the opening-balance restatement.' } },
    { name: 'disclosureText', type: 'textarea',
      admin: { description: 'IAS-8 §49(b) — nature + amount of the correction text for the financial statement notes.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Auditor Review', value: 'pending_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted', value: 'posted' },
        { label: 'Disclosed in Statements', value: 'disclosed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('prior-period-adjustments'),
  timestamps: true,
}

export default PriorPeriodAdjustments
