/**
 * Operation Runs — execution of one routing step on a work-order.
 *
 * The per-operation production record: what was actually produced (and
 * scrapped/backordered) at one `operation` × `work-center`, optionally
 * by one `work-shift`. Quantities are monotonic stage counters
 * (ordered → produced) and `status` is DERIVED from comparing them. The
 * `variants` array is the unbounded replacement for the fixed
 * `option_1..12` grid: each entry carries an open `attributes` map
 * (size/colour/grade — any axes, generated from the product's
 * dimensions) with its own counters and UoM. A blank attribute resolves
 * to its identity element, so the model never crashes on a missing axis.
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.5 production-performance work-response
 * @standard ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)
 * @standard ISO-8601-1:2019 date-time start-completion
 * @accounting IFRS IAS-2 §12 cost-of-conversion
 * @accounting US-GAAP ASC-330-10-30 inventory-cost
 * @audit ISO-19011:2018 audit-trail production-execution
 * @compliance SOX §404 internal-controls production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Routings.ts
 * @see ./WorkShifts.ts
 * @see ./WorkOrders.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { referenceField, statusField, auditFields, notesField, unitOfMeasureField } from '@/base/accounting/field'
import { emitOpRunCompleted } from '@/chain/event/emitter'

const OperationRuns: CollectionConfig = {
  slug: 'operation-runs',
  labels: { singular: 'Operation Run', plural: 'Operation Runs' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'workOrder', 'operation', 'workCenter', 'qtyProduced', 'qtyScrap', 'status'],
    description:
      'Per-operation production record: produced/scrap/backorder at one operation × work-center. Unbounded `variants` replace option_1..12.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Operation-run reference.' }),
    { name: 'workOrder', type: 'relationship', relationTo: 'work-orders', required: true, index: true,
      admin: { description: 'Production order this run belongs to.' } },
    { name: 'routing', type: 'relationship', relationTo: 'routings',
      admin: { description: 'Routing step executed (carries seq + run time).' } },
    { name: 'operation', type: 'relationship', relationTo: 'operations',
      admin: { description: 'Operation type (denormalised from the routing for fast filter).' } },
    { name: 'workCenter', type: 'relationship', relationTo: 'work-centers',
      admin: { description: 'Work-center the run was performed at.' } },
    { name: 'workShift', type: 'relationship', relationTo: 'work-shifts',
      admin: { description: 'Labor shift that performed the run (optional).' } },
    { name: 'qtyOrdered', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Quantity released to this run.' } },
    { name: 'qtyProduced', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Good quantity produced.' } },
    { name: 'qtyScrap', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Scrapped (NCR) quantity.' } },
    { name: 'qtyBackordered', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Quantity still owed (ordered − produced).' } },
    unitOfMeasureField({ description: 'UoM of the quantities (C62/KGM/LTR/MTR…) — discrete and process.' }),
    {
      name: 'variants',
      type: 'array',
      admin: { description: 'Generated variant rows — the unbounded replacement for the option_1..12 grid.' },
      fields: [
        { name: 'attributes', type: 'json',
          admin: { description: 'Open dimension map, e.g. { "size": "M", "colour": "red" }. A blank axis → its identity element.' } },
        { name: 'qtyOrdered', type: 'number', min: 0, defaultValue: 0 },
        { name: 'qtyProduced', type: 'number', min: 0, defaultValue: 0 },
        { name: 'qtyBackordered', type: 'number', min: 0, defaultValue: 0 },
        unitOfMeasureField(),
      ],
    },
    { name: 'startedAt', type: 'date', admin: { readOnly: true, description: 'ISO 8601 — run start (first production).' } },
    { name: 'completedAt', type: 'date', admin: { readOnly: true, description: 'ISO 8601 — run completion.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Ordered', value: 'ordered' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Backordered', value: 'backordered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('operation-runs', { afterChange: [emitOpRunCompleted] }),
  timestamps: true,
}

export default OperationRuns
