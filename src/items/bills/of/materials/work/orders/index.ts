/**
 * Work Orders — production-order header + execution log.
 *
 * Slice UUU (2026-05-10): added per first-principles ERP gap — every
 * ERP that converts raw materials into finished goods needs a
 * production-order entity. Pairs with `bills-of-materials` (the
 * recipe), `inventory-movements` (issues + receipts the order causes),
 * and `cost-variances` (the IAS-2 §21 standard-vs-actual deltas).
 *
 * @standard ISO-8601-1:2019 date-time release-due-completion-dates
 * @standard ISA-95:2013 §B.5 production-operations-management
 * @accounting IFRS IAS-2 §10 §12 cost-of-conversion
 * @accounting IFRS IAS-2 §13 normal-capacity-overhead-absorption
 * @accounting US-GAAP ASC-330-10-30 inventory-cost
 * @audit ISO-19011:2018 audit-trail production-execution
 * @compliance SOX §404 internal-controls production-control TOM-PROD-01
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./BillsOfMaterials.ts
 * @see ./CostVariances.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { statusField, notesField, auditFields, referenceField } from '@/base/accounting/field'
import { emitWoReleased } from '@/chain/event/emitter'

const WorkOrders: CollectionConfig = {
  slug: 'work-orders',
  labels: { singular: 'Work Order', plural: 'Work Orders' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'finishedGood', 'plannedQuantity', 'completedQuantity', 'status'],
    description:
      'Production order — releases a BOM into manufacturing. Drives inventory issues + finished-good receipts + IAS-2 §21 cost variances.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Work-order reference (e.g. `WO-2026-04-0123`).' }),
    { name: 'bom', type: 'relationship', relationTo: 'bills-of-materials', required: true, index: true,
      admin: { description: 'BOM version this order executes against.' } },
    { name: 'finishedGood', type: 'relationship', relationTo: 'items', required: true,
      admin: { description: 'Finished-good item the order produces (denormalised from BOM for fast filter).' } },
    { name: 'plannedQuantity', type: 'number', required: true, min: 0,
      admin: { description: 'Planned output quantity.' } },
    { name: 'completedQuantity', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Cumulative completed quantity (updated per production-receipt).' } },
    { name: 'scrappedQuantity', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Cumulative scrap (NCR) quantity.' } },
    { name: 'releaseDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — date the order was released to production.' } },
    { name: 'dueDate', type: 'date', index: true,
      admin: { description: 'ISO 8601 — required completion date.' } },
    { name: 'completedAt', type: 'date',
      admin: { readOnly: true, description: 'ISO 8601 — actual completion timestamp.' } },
    {
      name: 'demandSource',
      type: 'select',
      options: [
        { label: 'Customer Order (make-to-order)', value: 'customer_order' },
        { label: 'Stock Replenishment (make-to-stock)', value: 'stock_replenishment' },
        { label: 'Sub-Assembly for Parent WO', value: 'sub_assembly' },
        { label: 'Engineering Build', value: 'engineering' },
        { label: 'Sample / R&D', value: 'sample' },
      ],
    },
    { name: 'demandReference', type: 'text',
      admin: { description: 'Reference to the demand source (e.g. customer order number, parent WO).' } },
    { name: 'targetWarehouse', type: 'relationship', relationTo: 'warehouse-locations',
      admin: { description: 'Where the finished good is received.' } },
    {
      name: 'standardCosts',
      type: 'group',
      label: 'Standard cost snapshot (IAS-2 §21)',
      fields: [
        { name: 'standardMaterialCost', type: 'number', defaultValue: 0,
          admin: { description: 'Σ(component qty × component standard cost) per BOM. In cents.' } },
        { name: 'standardLabourCost', type: 'number', defaultValue: 0,
          admin: { description: 'Σ(operation labour-min × labour rate). In cents.' } },
        { name: 'standardOverheadCost', type: 'number', defaultValue: 0,
          admin: { description: 'Σ(operation machine-min × overhead rate). In cents.' } },
        { name: 'standardTotalCost', type: 'number', defaultValue: 0,
          admin: { readOnly: true, description: 'Σ of the three above.' } },
      ],
    },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Released', value: 'released' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Closed (cost-variance booked)', value: 'closed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('work-orders', { afterChange: [emitWoReleased] }),
  timestamps: true,
}

export default WorkOrders
