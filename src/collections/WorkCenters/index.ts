/**
 * Work Centers — the capacity unit production flows through.
 *
 * Generalizes a machine / production line / cell / vat / workstation /
 * crew into one industry-agnostic capacity resource (textile, food,
 * pharma, electronics, job-shop, process). A self-referential `parent`
 * forms the resource hierarchy (replacing brittle code-prefix process
 * buckets), and `capacityPerHour` + `parallelism` + the per-minute cost
 * rates feed routing/operation costing and the IAS-2 cost-of-conversion.
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.5 production-resources equipment-hierarchy
 * @standard ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-2 §12 cost-of-conversion fixed-and-variable-production-overhead
 * @accounting IFRS IAS-2 §13 normal-capacity-overhead-absorption
 * @accounting US-GAAP ASC-330-10-30 inventory-cost
 * @audit ISO-19011:2018 audit-trail capacity-resource-changes
 * @compliance SOX §404 internal-controls production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./WorkOrders.ts
 * @see ./BillsOfMaterials.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { referenceField, statusField, auditFields, notesField, currencyField } from '../../fields/base-accounting-fields'

const WorkCenters: CollectionConfig = {
  slug: 'work-centers',
  labels: { singular: 'Work Center', plural: 'Work Centers' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'name', 'type', 'capacityPerHour', 'parallelism', 'status'],
    description:
      'Capacity unit (machine/line/cell/vat/workstation/crew) production flows through. Self-referential hierarchy (ISA-95); rates feed IAS-2 cost-of-conversion.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Work-center code (e.g. `WC-CUT-01`).' }),
    { name: 'name', type: 'text', required: true, admin: { description: 'Human-readable work-center name.' } },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'machine',
      options: [
        { label: 'Machine', value: 'machine' },
        { label: 'Production Line', value: 'line' },
        { label: 'Cell', value: 'cell' },
        { label: 'Vat / Tank (process)', value: 'vat' },
        { label: 'Workstation', value: 'workstation' },
        { label: 'Crew / Team', value: 'crew' },
      ],
      admin: { description: 'Capacity-unit kind — keeps the model industry-agnostic (discrete and process).' },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'work-centers',
      admin: { description: 'Parent work-center — the ISA-95 resource hierarchy (replaces code-prefix process buckets).' },
    },
    { name: 'capacityPerHour', type: 'number', min: 0, admin: { description: 'Throughput per hour, in `capacityUnitOfMeasure`.' } },
    { name: 'capacityUnitOfMeasure', type: 'text', defaultValue: 'pcs', admin: { description: 'UoM of capacity (pcs/kg/L/m…) — process + discrete.' } },
    { name: 'parallelism', type: 'number', defaultValue: 1, min: 1, admin: { description: 'Units a single worker runs in parallel (machines-per-worker). Divides labor wage.' } },
    { name: 'costPerMinute', type: 'number', min: 0, admin: { description: 'Machine/overhead cost per minute (IAS-2 conversion cost).' } },
    { name: 'payPerHour', type: 'number', min: 0, admin: { description: 'Direct-labor pay rate per hour (feeds work-shift wage roll-up).' } },
    currencyField({ name: 'rateCurrency', allowBlank: true }),
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Idle', value: 'idle' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Retired', value: 'retired' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('work-centers'),
  timestamps: true,
}

export default WorkCenters
