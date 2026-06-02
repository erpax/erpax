/**
 * Goods Receipts — second leg of three-way match (PO → Receipt → Invoice).
 *
 * **Architecture:**
 * GR receipt confirms goods arrival and triggers GL accrual posting per IAS-2 §10.
 * However, revenue recognition timing is determined by shipment FOB point
 * (IFRS-15 §38-42), not GR date. GR is goods-in-transit interim state;
 * final revenue trigger is shipment FOB. GL posting (debit inventory, credit
 * accounts-payable) on GR; revenue posting on shipment FOB date confirmed via
 * purchase-orders.incotermsLocation.
 *
 * **Hooks & Lifecycle:**
 * FOB-point validation via purchase-orders relationship. GR date establishes
 * inventory accrual; shipment FOB point (from linked PO Incoterms) establishes
 * revenue and risk-transfer timing.
 *
 * **Audit Trail:**
 * IFRS-15 §31 requires substantiation that GR date ≠ revenue date. Revenue
 * date derived from shipment FOB point, not GR receipt date.
 *
 * @standard ISO-8601-1:2019 date-time received-at
 * @standard EN-16931:2017 §BG-13 delivery-information
 * @accounting IFRS IAS-2 inventories goods-in-transit
 * @accounting IFRS-15 §38-42 revenue-recognition FOB-point-timing
 * @accounting US-GAAP ASC-330 inventory at-cost
 * @audit ISO-19011:2018 audit-trail receipt-evidence
 * @audit IFRS-15 §31 revenue-substantiation shipment-FOB-date
 * @compliance SOX §404 internal-controls three-way-match
 * @security ISO-27002 §5.4 segregation-of-duties receiver-vs-requester
 * @feature goods-inspection quality-control three-way-match
 * @role goods-receiver "Receive goods, inspect, confirm GR"
 * @role quality-inspector "Inspect goods, assess condition per ISO-9001"
 * @role purchasing-accountant "Review GR for three-way-match, post GL"
 * @invariant checkInvoicePaymentCanonicalAccess GR date separates inventory accrual from revenue (FOB-driven)
 * @see src/plugins/accounting/collections/PurchaseOrders.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../../hooks/standardCollectionHooks'
import { autoSetTimestamp } from '../../../../hooks/autoSetTimestamp'
import { enforceSegregationOfDuties } from '../../../../hooks/enforceSegregationOfDuties'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '../../../../access/auth'
import { statusField, notesField, auditFields } from '../../../../fields/base-accounting-fields'
import { emitGrPosted } from '../../../../hooks/chainEventEmitters'

const GoodsReceipts: CollectionConfig = {
  slug: 'goods-receipts',
  labels: { singular: 'Goods Receipt', plural: 'Goods Receipts' },
  admin: { useAsTitle: 'receiptNumber', defaultColumns: ['receiptNumber', 'purchaseOrder', 'receivedDate', 'status'] },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
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
        { name: 'description', type: 'text', localized: true },
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
  hooks: standardCollectionHooks('goods-receipts', { beforeChange: [enforceSegregationOfDuties('inspectedBy', 'createdBy'), autoSetTimestamp('inspectedAt', (d) => Boolean((d as { inspectedBy?: unknown }).inspectedBy))], afterChange: [emitGrPosted] }),
  timestamps: true,
}

export default GoodsReceipts
