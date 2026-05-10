/**
 * Goods Receipts — second leg of three-way match (PO → Receipt → Invoice).
 *
 * @standard ISO-8601-1:2019 date-time received-at
 * @standard EN-16931:2017 §BG-13 delivery-information
 * @accounting IFRS IAS-2 inventories goods-in-transit
 * @accounting US-GAAP ASC-330 inventory at-cost
 * @audit ISO-19011:2018 audit-trail receipt-evidence
 * @compliance SOX §404 internal-controls three-way-match
 * @security ISO-27002 §5.4 segregation-of-duties receiver-vs-requester
 * @see src/plugins/accounting/collections/PurchaseOrders.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'
import { emitGrPosted } from '@/hooks/chainEventEmitters'

const GoodsReceipts: CollectionConfig = {
  slug: 'goods-receipts',
  labels: { singular: 'Goods Receipt', plural: 'Goods Receipts' },
  admin: { useAsTitle: 'receiptNumber', defaultColumns: ['receiptNumber', 'purchaseOrder', 'receivedDate', 'status'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'receiptNumber', type: 'text', required: true, unique: true, index: true },
    {
      name: 'purchaseOrder',
      type: 'relationship',
      relationTo: 'purchase-orders',
      required: true,
      index: true,
    },
    { name: 'receivedDate', type: 'date', required: true },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'description', type: 'text' },
        { name: 'quantityReceived', type: 'number', required: true, min: 0 },
        { name: 'quantityDamaged', type: 'number', defaultValue: 0, min: 0 },
        { name: 'condition', type: 'select', options: ['good', 'damaged', 'partial', 'rejected'].map(v => ({ label: v, value: v })) },
      ],
    },
    statusField(
      [
        { label: 'Pending Inspection', value: 'pending' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Partially Accepted', value: 'partial' },
        { label: 'Rejected', value: 'rejected' },
      ],
      'pending',
    ),
    { name: 'inspectedAt', type: 'date', admin: { readOnly: true } },
    { name: 'inspectedBy', type: 'relationship', relationTo: 'users' },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties('inspectedBy', 'createdBy'),
      autoSetTimestamp('inspectedAt', (d) => Boolean((d as { inspectedBy?: unknown }).inspectedBy)),
    ],
    afterChange: [emitGrPosted, auditTrailAfterChange('goods-receipts')],
  },
  timestamps: true,
}

export default GoodsReceipts
