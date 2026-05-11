/**
 * Purchase Orders — first leg of three-way match (PO ↔ receipt ↔ invoice).
 *
 * Without a PurchaseOrder collection there's nothing to match an
 * incoming vendor bill against, so the SOX §404 three-way match
 * declared on `Vendors.ts` and `Payments/index.ts` is currently
 * unenforceable. This collection seeds the procure-to-pay leg.
 *
 * Lifecycle: draft → submitted → approved → sent → partially-received →
 * received → closed OR cancelled.
 *
 * Relations:
 *   tenant     → tenants
 *   vendor     → addresses (vendor party)
 *   lines.item → items
 *   lines.glAccount → gl-accounts (expense or asset to debit on receipt)
 *   receipts   → goods-receipts (one PO can have many partial receipts)
 *   invoice    → invoices (matched vendor bill)
 *
 * @standard ISO-8601-1:2019 date-time order-date due-date
 * @standard ISO-4217:2015 currency-codes
 * @standard EN-16931:2017 §BG-13 buyer-reference
 * @standard UN-EDIFACT ORDERS d96a
 * @accounting IFRS IAS-37 provisions-and-contingent-liabilities commitment
 * @accounting US-GAAP ASC 405 liabilities accounts-payable
 * @audit ISO-19011:2018 audit-trail purchase-commitment
 * @compliance SOX §404 internal-controls three-way-match
 * @security ISO-27002 §5.4 segregation-of-duties requester-vs-approver
 * @see src/plugins/accounting/collections/Vendors.ts
 * @see src/plugins/accounting/collections/GoodsReceipts.ts
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { emitPoCreated } from '@/hooks/chainEventEmitters'
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '../fields/base-accounting-fields'

const PurchaseOrders: CollectionConfig = {
  slug: 'purchase-orders',
  labels: { singular: 'Purchase Order', plural: 'Purchase Orders' },
  admin: {
    useAsTitle: 'poNumber',
    defaultColumns: ['poNumber', 'vendor', 'orderDate', 'totalAmount', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'poNumber', type: 'text', required: true, unique: true, index: true },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'addresses',
      required: true,
      admin: { description: 'Vendor receiving the PO.' },
    },
    { name: 'orderDate', type: 'date', required: true },
    { name: 'expectedDeliveryDate', type: 'date' },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'lineNumber', type: 'number', defaultValue: 1 },
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        { name: 'unitPrice', type: 'number', required: true, min: 0 },
        { name: 'lineTotal', type: 'number', defaultValue: 0, admin: { readOnly: true } },
        {
          name: 'glAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          admin: { description: 'Expense / asset account to debit on receipt.' },
        },
        {
          name: 'quantityReceived',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Cumulative quantity received via goods-receipts.', readOnly: true },
        },
      ],
    },
    { name: 'subtotal', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'taxAmount', type: 'number', defaultValue: 0 },
    { name: 'totalAmount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    currencyField(),
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Sent to Vendor', value: 'sent' },
        { label: 'Partially Received', value: 'partial' },
        { label: 'Received', value: 'received' },
        { label: 'Closed', value: 'closed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
    { name: 'sentAt', type: 'date', admin: { readOnly: true } },
    { name: 'closedAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'receipts',
      type: 'join',
      collection: 'goods-receipts',
      on: 'purchaseOrder',
      admin: { description: 'Partial / full goods-receipts against this PO.' },
    },
    {
      name: 'invoice',
      type: 'relationship',
      relationTo: 'invoices',
      admin: { description: 'Matched vendor bill (three-way-match anchor).' },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [
      autoPopulateTenant,
      // Auto-calc line totals + PO totals on every write.
      async ({ data }) => {
        if (data?.lines && Array.isArray(data.lines)) {
          let subtotal = 0
          for (const line of data.lines as Array<{ quantity?: number; unitPrice?: number; lineTotal?: number }>) {
            const lineTotal = (Number(line.quantity) || 0) * (Number(line.unitPrice) || 0)
            line.lineTotal = lineTotal
            subtotal += lineTotal
          }
          data.subtotal = subtotal
          data.totalAmount = subtotal + (Number(data.taxAmount) || 0)
        }
        return data
      },
    ],
    beforeChange: [
      autoPopulateCreatedBy,
      // SOX §404: requester ≠ approver.
      enforceSegregationOfDuties('approvedBy', 'createdBy'),
      autoSetTimestamp('submittedAt', (d) => (d as { status?: string }).status === 'submitted'),
      autoSetTimestamp('sentAt', (d) => (d as { status?: string }).status === 'sent'),
      autoSetTimestamp('closedAt', (d) =>
        ['closed', 'cancelled'].includes(String((d as { status?: string }).status)),
      ),
    ],
    afterChange: [emitPoCreated, auditTrailAfterChange('purchase-orders')],
  },
  timestamps: true,
}

export default PurchaseOrders
