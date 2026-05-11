/**
 * Maintenance Work Orders — CMMS execution rows per ISO 41001 §8.1
 * + ISO 55000:2014 maintenance-management lifecycle.
 *
 * Slice ZZZZ (2026-05-10): the executable side of the FM ticket flow.
 * Promoted from `maintenance-requests` (or pre-emptively raised for
 * preventive / scheduled work). Tracks parts issued, labour hours, and
 * cost — feeds GL via `inventory-movements` (parts) + `time-entries`
 * (labour) + capitalised work via `fixed-assets` (when work is
 * capitalisable per IAS-16 §13).
 *
 * @standard ISO-41001:2018 §8.1 facility-management operational-control
 * @standard ISO-55000:2014 asset-management work-management
 * @standard ISO-55001:2014 asset-management management-systems
 * @standard ISO-14224:2016 reliability-and-maintenance-data
 * @standard EN-13306:2017 maintenance-terminology
 * @standard ISO-8601-1:2019 date-time scheduled-actual
 * @accounting IFRS IAS-16 §12 §13 capitalisable-vs-expense routine-maintenance
 * @accounting IFRS IAS-2 §10 cost-of-purchase materials-issued
 * @accounting US-GAAP ASC-360 ppe-maintenance
 * @audit ISO-19011:2018 audit-trail work-order-evidence
 * @compliance SOX §404 internal-controls capex-vs-opex-classification
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./MaintenanceRequests.ts
 * @see ./Properties.ts
 * @see ./Spaces.ts
 * @see ./InventoryMovements.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const MaintenanceWorkOrders: CollectionConfig = {
  slug: 'maintenance-work-orders',
  labels: { singular: 'Maintenance Work Order', plural: 'Maintenance Work Orders' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'workType', 'priority', 'property', 'scheduledStartAt', 'totalCost', 'status'],
    description:
      'CMMS execution row per ISO 55000 work-management. Consumes parts (inventory-movements) + labour (time-entries) and posts cost as expense or capex.',
  },
  access: accountingCollectionAccess({ feature: 'facility_management' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential work-order reference (e.g. `WO-2026-04-001`).' }),
    { name: 'request', type: 'relationship', relationTo: 'maintenance-requests', index: true,
      admin: { description: 'Source request (when promoted from a ticket).' } },
    { name: 'subject', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'workType',
      type: 'select',
      required: true,
      defaultValue: 'corrective',
      options: [
        { label: 'Corrective Maintenance (CM)', value: 'corrective' },
        { label: 'Preventive Maintenance (PM)', value: 'preventive' },
        { label: 'Predictive Maintenance (PdM)', value: 'predictive' },
        { label: 'Inspection / Testing', value: 'inspection' },
        { label: 'Improvement / Enhancement', value: 'improvement' },
        { label: 'Compliance / Statutory', value: 'compliance' },
        { label: 'Refurbishment / Major Overhaul (capex)', value: 'refurbishment' },
        { label: 'Cleaning / Janitorial', value: 'cleaning' },
        { label: 'Move / Setup', value: 'move' },
      ],
    },
    {
      name: 'priority',
      type: 'select',
      required: true,
      defaultValue: 'p3',
      options: [
        { label: 'P1 — Critical', value: 'p1' },
        { label: 'P2 — High', value: 'p2' },
        { label: 'P3 — Medium', value: 'p3' },
        { label: 'P4 — Low', value: 'p4' },
      ],
    },
    {
      name: 'capitalisationTreatment',
      type: 'select',
      required: true,
      defaultValue: 'expense',
      options: [
        { label: 'Expense (routine — IAS-16 §12)', value: 'expense' },
        { label: 'Capitalise (component-replacement — IAS-16 §13)', value: 'capitalise' },
        { label: 'Mixed (split per cost line)', value: 'mixed' },
      ],
      admin: { description: 'IAS-16 §12 vs §13 — drives whether cost hits OPEX or CAPEX (and thus depreciation schedule).' },
    },
    { name: 'property', type: 'relationship', relationTo: 'properties', index: true },
    { name: 'space', type: 'relationship', relationTo: 'spaces', index: true },
    { name: 'fixedAsset', type: 'relationship', relationTo: 'fixed-assets', index: true,
      admin: { description: 'When work targets a specific asset (HVAC, lift, machinery).' } },
    { name: 'bookableResource', type: 'relationship', relationTo: 'bookable-resources',
      admin: { description: 'When work targets a bookable resource (vehicle / equipment / room) — drives blocking of bookings during the window.' } },
    { name: 'assignedTo', type: 'relationship', relationTo: 'employees',
      admin: { description: 'FM technician or maintenance lead.' } },
    { name: 'vendor', type: 'relationship', relationTo: 'vendors',
      admin: { description: 'External contractor (when outsourced).' } },
    { name: 'scheduledStartAt', type: 'date',
      admin: { description: 'Planned start.' } },
    { name: 'scheduledEndAt', type: 'date' },
    { name: 'actualStartAt', type: 'date', admin: { readOnly: true } },
    { name: 'actualEndAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'parts',
      type: 'array',
      labels: { singular: 'Part Issued', plural: 'Parts Issued' },
      admin: { description: 'Spare parts / materials consumed — each row issues an inventory-movement.' },
      dbName: 'mwo_parts',
      fields: [
        { name: 'itemSku', type: 'text', required: true },
        { name: 'description', type: 'text', localized: true },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        { name: 'unitOfMeasure', type: 'text', defaultValue: 'EA' },
        { name: 'unitCost', type: 'number', defaultValue: 0, min: 0 },
        { name: 'lineCost', type: 'number', defaultValue: 0, admin: { readOnly: true } },
        { name: 'inventoryMovement', type: 'relationship', relationTo: 'inventory-movements' },
      ],
    },
    {
      name: 'labour',
      type: 'array',
      labels: { singular: 'Labour Entry', plural: 'Labour Entries' },
      admin: { description: 'Hours booked against the work order — each row links to a time-entry.' },
      dbName: 'mwo_labour',
      fields: [
        { name: 'employee', type: 'relationship', relationTo: 'employees' },
        { name: 'hours', type: 'number', required: true, min: 0 },
        { name: 'hourlyCost', type: 'number', defaultValue: 0, min: 0 },
        { name: 'lineCost', type: 'number', defaultValue: 0, admin: { readOnly: true } },
        { name: 'timeEntry', type: 'relationship', relationTo: 'time-entries' },
      ],
    },
    { name: 'partsCost', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'labourCost', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'externalCost', type: 'number', defaultValue: 0,
      admin: { description: 'Vendor invoice cost (cents).' } },
    { name: 'totalCost', type: 'number', defaultValue: 0, admin: { readOnly: true,
      description: 'partsCost + labourCost + externalCost (cents).' } },
    currencyField(),
    {
      name: 'safety',
      type: 'group',
      label: 'Safety / Permits',
      fields: [
        { name: 'requiresPermitToWork', type: 'checkbox', defaultValue: false },
        { name: 'permitReference', type: 'text' },
        { name: 'requiresLOTO', type: 'checkbox', defaultValue: false,
          admin: { description: 'Lockout-Tagout required (per OSHA 29 CFR 1910.147 / EN 50110).' } },
        { name: 'isHotWork', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'failureCode', type: 'text',
      admin: { description: 'ISO 14224 failure code — fed back to reliability KPIs.' } },
    { name: 'rootCause', type: 'textarea' },
    { name: 'qualityInspection', type: 'relationship', relationTo: 'quality-inspections',
      admin: { description: 'Optional FK to the post-work QC inspection.' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE posted on completion (Dr Maintenance Expense / Cr Inventory + Accruals; or Dr PPE for capitalised).' } },
    statusField(
      [
        { label: 'Planned', value: 'planned' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Dispatched', value: 'dispatched' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Awaiting Parts', value: 'awaiting_parts' },
        { label: 'Awaiting Inspection', value: 'awaiting_inspection' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Closed (cost-posted)', value: 'closed' },
      ],
      'planned',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp('actualStartAt', (d) => (d as { status?: string }).status === 'in_progress'),
      autoSetTimestamp('actualEndAt', (d) => {
        const s = (d as { status?: string }).status
        return s === 'completed' || s === 'closed'
      }),
    ],
    afterChange: [auditTrailAfterChange('maintenance-work-orders')],
  },
  timestamps: true,
}

export default MaintenanceWorkOrders
