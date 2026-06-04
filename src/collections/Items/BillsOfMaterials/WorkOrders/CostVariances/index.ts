/**
 * Cost Variances — IAS-2 §21 standard-cost vs actual-cost variances.
 *
 * Slice UUU (2026-05-10): added per first-principles ERP gap.
 * Generated when a work-order closes — the difference between
 * (standardCost × completedQuantity) and the actual costs absorbed
 * into production receipts, decomposed into the canonical 4
 * categories (price, quantity, labour-rate, labour-efficiency,
 * overhead-volume, overhead-spending).
 *
 * @standard ISO-8601-1:2019 date-time variance-date
 * @accounting IFRS IAS-2 §21 standard-cost-method
 * @accounting US-GAAP ASC-330-10-30 standard-cost-variance-recognition
 * @audit ISO-19011:2018 audit-trail variance-evidence
 * @compliance SOX §404 internal-controls variance-disposition TOM-PROD-03
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./WorkOrders.ts
 * @see ./ProductionReceipts.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/base-accounting-fields'

const CostVariances: CollectionConfig = {
  slug: 'cost-variances',
  labels: { singular: 'Cost Variance', plural: 'Cost Variances' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'workOrder', 'varianceDate', 'totalVariance', 'status'],
    description:
      'IAS-2 §21 standard-cost variances. One row per work-order close — decomposed into price/quantity/labour-rate/labour-efficiency/overhead variance categories.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Variance reference (e.g. `VAR-2026-04-0001`).' }),
    { name: 'workOrder', type: 'relationship', relationTo: 'work-orders', required: true, index: true },
    { name: 'varianceDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — date the variance was computed (typically WO close).' } },
    currencyField(),
    {
      name: 'variances',
      type: 'group',
      label: 'Variance decomposition (IAS-2 §21)',
      fields: [
        { name: 'materialPriceVariance', type: 'number', defaultValue: 0,
          admin: { description: 'Σ((actual price − standard price) × actual qty). + = unfavourable. In cents.' } },
        { name: 'materialQuantityVariance', type: 'number', defaultValue: 0,
          admin: { description: 'Σ((actual qty − standard qty) × standard price). + = unfavourable. In cents.' } },
        { name: 'labourRateVariance', type: 'number', defaultValue: 0,
          admin: { description: '(Actual rate − standard rate) × actual hours. In cents.' } },
        { name: 'labourEfficiencyVariance', type: 'number', defaultValue: 0,
          admin: { description: '(Actual hours − standard hours) × standard rate. In cents.' } },
        { name: 'overheadSpendingVariance', type: 'number', defaultValue: 0,
          admin: { description: 'Actual overhead − (standard rate × actual hours). In cents.' } },
        { name: 'overheadVolumeVariance', type: 'number', defaultValue: 0,
          admin: { description: '(Standard rate × actual hours) − (standard rate × standard hours allowed). IAS-2 §13 unallocated overhead. In cents.' } },
      ],
    },
    { name: 'totalVariance', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Σ of the 6 variance components.' } },
    {
      name: 'disposition',
      type: 'select',
      defaultValue: 'cogs',
      options: [
        { label: 'COGS (sold + on-hand pro-rata, IAS-2 §13)', value: 'cogs' },
        { label: 'Inventory Adjustment (capitalise to FG)', value: 'inventory' },
        { label: 'Period Expense (write off immediately)', value: 'period' },
      ],
      admin: { description: 'How the variance is disposed at WO close. IAS-2 §13 requires cogs/inventory split when material; immaterial → period.' },
    },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE that books the variance disposition.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Disposition', value: 'pending_disposition' },
        { label: 'Disposed', value: 'disposed' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('cost-variances'),
  timestamps: true,
}

export default CostVariances
