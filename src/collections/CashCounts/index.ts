/**
 * Cash Counts — denomination-level cash-drawer / till reconciliation.
 *
 * Fills the ceccec/erpax `money_counter_tallies` gap: an end-of-shift or
 * daily count of physical cash by denomination, reconciled against the
 * expected balance from the POS / fiscal device (Z-report). The variance
 * is the cash-control signal SOX §404 and the BG Наредба Н-18 retail
 * fiscal regime both require.
 *
 * @standard ISO-4217:2015 currency-codes denomination-currency
 * @standard ISO-8601-1:2019 date-time count-date
 * @standard BG Наредба Н-18 (СУПТО) daily-cash-reconciliation Z-report
 * @compliance SOX §404 internal-controls cash-handling TOM-CASH-01
 * @audit ISO-19011:2018 audit-trail cash-count-evidence dual-control
 * @security ISO-27002 §5.4 segregation-of-duties counter-vs-verifier
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Terminals.ts
 * @see ./FiscalDevices.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '../../fields/base-accounting-fields'

const CashCounts: CollectionConfig = {
  slug: 'cash-counts',
  labels: { singular: 'Cash Count', plural: 'Cash Counts' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'countDate', 'countedTotal', 'variance', 'status'],
    description:
      'Denomination-level cash count reconciled against the POS/fiscal Z-report. Dual-control (counter vs verifier) per SOX §404 + BG Наредба Н-18.',
  },
  access: accountingCollectionAccess({ feature: 'banking' }),
  fields: [
    referenceField({ description: 'Cash-count reference (e.g. `CC-2026-05-30-T1`).' }),
    { name: 'countDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — business date of the count.' } },
    { name: 'countType', type: 'select', defaultValue: 'shift_end',
      options: [
        { label: 'Opening Float', value: 'opening' },
        { label: 'Shift End', value: 'shift_end' },
        { label: 'Daily Close', value: 'daily' },
        { label: 'Spot Check', value: 'spot' },
      ] },
    { name: 'terminal', type: 'relationship', relationTo: 'terminals',
      admin: { description: 'POS terminal / till counted.' } },
    { name: 'fiscalDevice', type: 'relationship', relationTo: 'fiscal-devices',
      admin: { description: 'Fiscal device (ФУ) whose Z-report is the expected figure.' } },
    { name: 'workShift', type: 'relationship', relationTo: 'work-shifts',
      admin: { description: 'Shift this count closes (when countType = shift_end).' } },
    currencyField(),
    {
      name: 'denominations',
      type: 'array',
      label: 'Denomination tally',
      admin: { description: 'Count by note/coin face value. subtotal = faceValue × count.' },
      fields: [
        { name: 'faceValue', type: 'number', required: true, min: 0,
          admin: { description: 'Denomination face value in minor units (cents/stotinki).' } },
        { name: 'kind', type: 'select', defaultValue: 'note', options: [
          { label: 'Note', value: 'note' },
          { label: 'Coin', value: 'coin' },
        ] },
        { name: 'count', type: 'number', required: true, min: 0, defaultValue: 0 },
        { name: 'subtotal', type: 'number', defaultValue: 0,
          admin: { readOnly: true, description: 'faceValue × count, in minor units.' } },
      ],
    },
    { name: 'countedTotal', type: 'number', defaultValue: 0,
      admin: { description: 'Σ denomination subtotals — physical cash counted, in minor units.' } },
    { name: 'expectedTotal', type: 'number', defaultValue: 0,
      admin: { description: 'Expected cash from POS/fiscal Z-report, in minor units.' } },
    { name: 'variance', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'countedTotal − expectedTotal (over/short), in minor units.' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE booking any cash over/short to the variance account.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Counted', value: 'counted' },
        { label: 'Verified (dual-control)', value: 'verified' },
        { label: 'Reconciled', value: 'reconciled' },
        { label: 'Discrepancy', value: 'discrepancy' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('cash-counts'),
  timestamps: true,
}

export default CashCounts
