/**
 * Production Receipts — finished-good receipts from a work-order into
 * inventory, with the absorbed-cost figure per IAS-2 §10.
 *
 * Slice UUU (2026-05-10): added per first-principles ERP gap. Distinct
 * from `goods-receipts` (which receives PURCHASED inventory from a
 * vendor); this collection receives PRODUCED inventory from internal
 * manufacturing. The cost basis comes from the work-order's standard
 * cost snapshot + actual issue/labour/overhead consumed; the variance
 * lands in `cost-variances`.
 *
 * @standard ISO-8601-1:2019 date-time receipt-date
 * @standard ISA-95:2013 §B.5 production-execution
 * @accounting IFRS IAS-2 §10 §12 cost-of-conversion
 * @accounting US-GAAP ASC-330-10-30 inventory-cost
 * @audit ISO-19011:2018 audit-trail production-receipt-evidence
 * @compliance SOX §404 internal-controls production-control TOM-PROD-02
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./WorkOrders.ts
 * @see ./GoodsReceipts.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'
import { emitProdCompleted } from '../hooks/chainEventEmitters'

const ProductionReceipts: CollectionConfig = {
  slug: 'production-receipts',
  labels: { singular: 'Production Receipt', plural: 'Production Receipts' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'workOrder', 'receivedQuantity', 'absorbedCost', 'receiptDate', 'status'],
    description:
      'Finished-good receipt from a work-order into inventory. Booked at absorbed cost per IAS-2 §10. The variance vs standard lands in `cost-variances`.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Receipt reference (e.g. `PR-2026-04-0001`).' }),
    { name: 'workOrder', type: 'relationship', relationTo: 'work-orders', required: true, index: true },
    { name: 'finishedGood', type: 'relationship', relationTo: 'items', required: true,
      admin: { description: 'Denormalised from work-order for fast filter.' } },
    { name: 'receivedQuantity', type: 'number', required: true, min: 0 },
    { name: 'targetWarehouse', type: 'relationship', relationTo: 'warehouse-locations', required: true },
    { name: 'lotNumber', type: 'text',
      admin: { description: 'Production lot number — required for traceability per FDA / EU food / pharma.' } },
    { name: 'serialNumbers', type: 'json',
      admin: { description: 'JSON array of serial numbers for serialised items.' } },
    { name: 'receiptDate', type: 'date', required: true, index: true },
    currencyField(),
    {
      name: 'cost',
      type: 'group',
      label: 'Absorbed cost (IAS-2 §10)',
      fields: [
        { name: 'materialCost', type: 'number', defaultValue: 0,
          admin: { description: 'Σ(component issues × actual cost) for this receipt. In cents.' } },
        { name: 'labourCost', type: 'number', defaultValue: 0,
          admin: { description: 'Σ(actual labour-minutes × labour rate). In cents.' } },
        { name: 'overheadCost', type: 'number', defaultValue: 0,
          admin: { description: 'Σ(actual machine-minutes × overhead rate). IAS-2 §13 normal-capacity allocation. In cents.' } },
        { name: 'absorbedCost', type: 'number', defaultValue: 0,
          admin: { readOnly: true, description: 'Σ of the three above — what gets debited to Inventory.' } },
        { name: 'unitCost', type: 'number', defaultValue: 0,
          admin: { readOnly: true, description: 'absorbedCost / receivedQuantity.' } },
      ],
    },
    { name: 'inventoryMovement', type: 'relationship', relationTo: 'inventory-movements',
      admin: { readOnly: true, description: 'Auto-created `inventory-movements` row of kind=`receipt` (production source).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE that books Dr Finished Goods / Cr WIP.' } },
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
    afterChange: [emitProdCompleted, auditTrailAfterChange('production-receipts')],
  },
  timestamps: true,
}

export default ProductionReceipts
