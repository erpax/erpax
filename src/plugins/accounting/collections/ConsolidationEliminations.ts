/**
 * Consolidation Eliminations — group consolidation elimination entries.
 *
 * Slice TTT (2026-05-10): added per Slice NNN gap discovery. Each row
 * is a single elimination JE applied at consolidation time to remove
 * intercompany balances and unrealised intra-group profit per IFRS 10
 * §B86(c) / ASC 810. Distinct from `intercompany-transactions` (the
 * paired source-document register) and `journal-entries` (per-tenant
 * GL postings); this collection lives at the **group/consolidation
 * level** and is replayed each consolidation cycle.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time consolidation-date
 * @accounting IFRS IFRS-10 §B86 consolidated-financial-statements
 * @accounting IFRS IAS-21 §39 foreign-currency-translation-on-consolidation
 * @accounting US-GAAP ASC-810-10-45 consolidation-elimination
 * @accounting US-GAAP ASC-830-30 foreign-currency-translation
 * @audit ISO-19011:2018 audit-trail consolidation-evidence
 * @compliance SOX §404 internal-controls consolidation-control TOM-CON-01
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./IntercompanyTransactions.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { tenantAdminWriteAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const ConsolidationEliminations: CollectionConfig = {
  slug: 'consolidation-eliminations',
  labels: { singular: 'Consolidation Elimination', plural: 'Consolidation Eliminations' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'consolidationDate', 'eliminationType', 'debitAmount', 'creditAmount', 'status'],
    description:
      'Group-level elimination JEs applied at consolidation per IFRS 10 §B86 / ASC 810. Replayed each consolidation cycle.',
  },
  access: tenantAdminWriteAccess(), // Slice VVV: gated by feature 'consolidation' (see featureGuard wiring TBA)
  fields: [
    multiTenancyField({
      description: 'The group / parent tenant that owns the consolidation. Eliminations cross subsidiary tenants.',
    }),
    referenceField({ description: 'Sequential elimination reference (e.g. `ELIM-2026-Q1-001`).' }),
    { name: 'consolidationDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — consolidation-period as-of date the elimination applies to.' } },
    {
      name: 'eliminationType',
      type: 'select',
      required: true,
      options: [
        { label: 'Investment in Subsidiary', value: 'investment' },
        { label: 'Intercompany Receivable / Payable', value: 'ic_balance' },
        { label: 'Intercompany Revenue / Expense', value: 'ic_pl' },
        { label: 'Unrealised Profit on Inventory', value: 'unrealised_profit' },
        { label: 'Intercompany Loan + Interest', value: 'ic_loan' },
        { label: 'Dividend Distribution Within Group', value: 'ic_dividend' },
        { label: 'Foreign Currency Translation Reserve', value: 'fctr' },
        { label: 'Other', value: 'other' },
      ],
    },
    currencyField(),
    { name: 'debitAmount', type: 'number', required: true,
      admin: { description: 'Debit leg of the elimination JE (cents). Must equal creditAmount.' } },
    { name: 'creditAmount', type: 'number', required: true,
      admin: { description: 'Credit leg of the elimination JE (cents).' } },
    {
      name: 'subsidiaries',
      type: 'array',
      admin: { description: 'Subsidiary tenants whose balances this elimination touches.' },
      fields: [
        { name: 'tenant', type: 'relationship', relationTo: 'tenants', required: true },
        { name: 'role', type: 'select', defaultValue: 'subsidiary', options: [
          { label: 'Subsidiary', value: 'subsidiary' },
          { label: 'Joint Venture', value: 'joint_venture' },
          { label: 'Associate (equity-method)', value: 'associate' },
        ] },
      ],
    },
    { name: 'sourceJournalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { description: 'The actual elimination JE booked on the consolidation-tenant ledger.' } },
    { name: 'sourceIntercompany', type: 'relationship', relationTo: 'intercompany-transactions',
      admin: { description: 'The intercompany pair this elimination resolves (if elimination_type ∈ {ic_balance, ic_pl}).' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('consolidation-eliminations')],
  },
  timestamps: true,
}

export default ConsolidationEliminations
