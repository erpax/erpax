/**
 * Routings — the ordered process steps that make a work-order.
 *
 * A routing step ties a work-order to one `operation` at one
 * `work-center`, with a sequence position and the per-unit run time +
 * setup time. The two universal manufacturing primitives are BOM
 * (`bills-of-materials`, what to consume) and Routing (this, how to
 * process). `runTimeSecondsPerUnit` × order quantity × the work-center
 * rate is the IAS-2 cost-of-conversion; the UoM keeps it valid for
 * discrete and process industries alike.
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing
 * @standard ISO-22400-2:2014 manufacturing-operations KPIs (cycle time)
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-2 §12 cost-of-conversion operation-time
 * @accounting US-GAAP ASC-330-10-30 inventory-cost
 * @audit ISO-19011:2018 audit-trail routing-changes
 * @compliance SOX §404 internal-controls production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Operations.ts
 * @see ./WorkCenters.ts
 * @see ./WorkOrders.ts
 * @see ./BillsOfMaterials.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { referenceField, statusField, auditFields, notesField } from '../fields/base-accounting-fields'
import { emitRoutingCompleted } from '../hooks/chainEventEmitters'

const Routings: CollectionConfig = {
  slug: 'routings',
  labels: { singular: 'Routing Step', plural: 'Routing' },
  defaultSort: 'seq',
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'workOrder', 'seq', 'operation', 'workCenter', 'runTimeSecondsPerUnit', 'status'],
    description:
      'Ordered process step on a work-order: operation × work-center × time. With BOM, the second universal manufacturing primitive; drives IAS-2 cost-of-conversion.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Routing-step reference (e.g. `WO-…/10`).' }),
    { name: 'workOrder', type: 'relationship', relationTo: 'work-orders', required: true, index: true,
      admin: { description: 'Production order this step belongs to.' } },
    { name: 'operation', type: 'relationship', relationTo: 'operations', required: true,
      admin: { description: 'Operation type executed at this step.' } },
    { name: 'workCenter', type: 'relationship', relationTo: 'work-centers',
      admin: { description: 'Work-center performing the step (defaults from the operation).' } },
    { name: 'seq', type: 'number', required: true, defaultValue: 0, index: true,
      admin: { description: 'Step order within the routing (ascending).' } },
    { name: 'setupTimeMinutes', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'One-off setup time for the step (minutes).' } },
    { name: 'runTimeSecondsPerUnit', type: 'number', min: 0,
      admin: { description: 'Run time per unit (seconds) — drives minutes-required + IAS-2 conversion cost.' } },
    { name: 'unitOfMeasure', type: 'text', defaultValue: 'pcs',
      admin: { description: 'UoM the run time is per (pcs/kg/L/m…) — discrete and process.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Released', value: 'released' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitRoutingCompleted, auditTrailAfterChange('routings')],
  },
  timestamps: true,
}

export default Routings
