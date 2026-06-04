/**
 * Quality Inspections — ISO 9001 §8.7 nonconformance + §9.1 measurement.
 *
 * Slice UUU (2026-05-10): added per first-principles ERP gap. Captures
 * incoming inspection (vendor receipts), in-process inspection (per
 * routing operation), and final inspection (pre-shipment) records.
 * Drives `inventory-movements.kind=write_off` for failed lots and
 * `non-conformance` evidence for ISO 9001 audits.
 *
 * @standard ISO-8601-1:2019 date-time inspection-date
 * @standard ISO 9001:2015 §8.7 control-of-nonconforming-outputs
 * @standard ISO 9001:2015 §9.1.3 analysis-and-evaluation
 * @standard ISO 17025:2017 testing-and-calibration-laboratories
 * @audit ISO-19011:2018 audit-trail inspection-evidence
 * @compliance SOX §404 internal-controls quality-control TOM-QC-01
 * @compliance ISO 9001:2015 §8.7 quality-management-system
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./WorkOrders.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { statusField, notesField, auditFields, referenceField } from '@/base/accounting/field'
import { emitQcComplete } from '@/chain/event/emitter'

const QualityInspections: CollectionConfig = {
  slug: 'quality-inspections',
  labels: { singular: 'Quality Inspection', plural: 'Quality Inspections' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'inspectionType', 'item', 'inspectionDate', 'outcome', 'status'],
    description:
      'ISO 9001 §8.7 nonconformance + §9.1 measurement records. Drives inventory write-offs for failed lots.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Inspection reference (e.g. `QC-2026-04-0001`).' }),
    {
      name: 'inspectionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Incoming (vendor receipt)', value: 'incoming' },
        { label: 'In-Process (per routing op)', value: 'in_process' },
        { label: 'Final (pre-shipment)', value: 'final' },
        { label: 'Customer Complaint Investigation', value: 'complaint' },
        { label: 'Calibration Check (ISO 17025)', value: 'calibration' },
      ],
    },
    { name: 'item', type: 'relationship', relationTo: 'items', required: true, index: true },
    { name: 'inspectedQuantity', type: 'number', required: true, min: 0 },
    { name: 'sampleSize', type: 'number',
      admin: { description: 'For lot-acceptance sampling (ISO 2859) — how many of `inspectedQuantity` were tested.' } },
    { name: 'failedQuantity', type: 'number', defaultValue: 0,
      admin: { description: 'Quantity that failed the inspection criteria.' } },
    { name: 'workOrder', type: 'relationship', relationTo: 'work-orders', index: true,
      admin: { description: 'For in-process inspection — the WO this inspection ran against.' } },
    { name: 'goodsReceipt', type: 'relationship', relationTo: 'goods-receipts',
      admin: { description: 'For incoming inspection — the GRN this inspection covers.' } },
    { name: 'shipment', type: 'relationship', relationTo: 'shipments',
      admin: { description: 'For final inspection — the shipment this inspection releases.' } },
    { name: 'inspectionDate', type: 'date', required: true, index: true },
    { name: 'inspector', type: 'relationship', relationTo: 'users',
      admin: { description: 'Inspector who performed the check.' } },
    {
      name: 'outcome',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Passed', value: 'passed' },
        { label: 'Failed (NCR raised)', value: 'failed' },
        { label: 'Conditional Pass (rework allowed)', value: 'conditional' },
        { label: 'Quarantined', value: 'quarantined' },
      ],
    },
    { name: 'failureReason', type: 'textarea',
      admin: { description: 'NCR detail — required when outcome = failed/conditional/quarantined.' } },
    { name: 'capaReference', type: 'text',
      admin: { description: 'Corrective and Preventive Action reference (ISO 9001 §10.2).' } },
    { name: 'inventoryMovement', type: 'relationship', relationTo: 'inventory-movements',
      admin: { readOnly: true, description: 'Auto-created `kind=write_off` movement for failed quantities.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Disputed', value: 'disputed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('quality-inspections', { afterChange: [emitQcComplete] }),
  timestamps: true,
}

export default QualityInspections
