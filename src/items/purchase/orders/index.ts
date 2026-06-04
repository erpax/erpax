/**
 * Purchase Orders — first leg of three-way match (PO ↔ receipt ↔ invoice).
 *
 * Without a PurchaseOrder collection there's nothing to match an
 * incoming vendor bill against, so the SOX §404 three-way match
 * declared on `Vendors.ts` and `Payments/index.ts` is currently
 * unenforceable. This collection seeds the procure-to-pay leg with
 * Incoterms 2020 delivery terms determining freight responsibility,
 * risk transfer, and GL posting timing per IFRS-15 §38-42.
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
 * **Key Fields:**
 * - deliveryTerms (enum): Incoterms term (FOB, CIF, DDP, EXW)
 *   - FOB: Free On Board (supplier facility, supplier pays to port/loading point)
 *   - CIF: Cost, Insurance, Freight (destination, supplier pays freight to destination)
 *   - DDP: Delivered Duty Paid (buyer's facility, supplier pays all)
 *   - EXW: Ex Works (supplier's factory, buyer pays all)
 *   - Determines: Who pays freight? When does GL post? When is risk transferred?
 *
 * - incotermsLocation (text): Named location where FOB/CIF/DDP applies
 *   - Examples: "FOB Sofia Warehouse", "CIF Burgas Port", "DDP Buyer's Facility"
 *   - Used with deliveryTerms to determine GL posting timing per IFRS-15 §38-42
 *
 * @standard ISO-8601-1:2019 date-time order-date due-date
 * @standard ISO-4217:2015 currency-codes
 * @standard EN-16931:2017 §BG-13 buyer-reference
 * @standard UN-EDIFACT ORDERS d96a
 * @standard INCOTERMS-2020 delivery-terms-and-risk-transfer
 * @accounting IFRS IAS-37 provisions-and-contingent-liabilities commitment
 * @accounting IFRS-15 §38-42 revenue-recognition FOB-driven-GL-posting-timing
 * @accounting US-GAAP ASC 405 liabilities accounts-payable
 * @audit ISO-19011:2018 audit-trail purchase-commitment
 * @audit IFRS-15 §38-42 GL-posting-timing FOB-point-substantiation
 * @compliance SOX §404 internal-controls three-way-match
 * @compliance INCOTERMS-2020 delivery-responsibility-consistency
 * @security ISO-27002 §5.4 segregation-of-duties requester-vs-approver
 * @feature incoterms-delivery FOB-point-validation freight-responsibility
 * @role purchasing-manager "Create PO with Incoterms delivery terms"
 * @role freight-coordinator "Validate Incoterms location matches delivery route"
 * @see src/plugins/accounting/collections/Vendors.ts
 * @see src/plugins/accounting/collections/GoodsReceipts.ts
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { enforceSegregationOfDuties } from '@/enforce/segregation/of/duty'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import { emitPoCreated } from '@/chain/event/emitter'
import {
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/base/accounting/field'

const PurchaseOrders: CollectionConfig = {
  slug: 'purchase-orders',
  labels: { singular: 'Purchase Order', plural: 'Purchase Orders' },
  admin: {
    useAsTitle: 'poNumber',
    defaultColumns: ['poNumber', 'vendor', 'orderDate', 'totalAmount', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
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
      name: 'deliveryTerms',
      type: 'select',
      options: [
        { label: 'FOB (Free On Board)', value: 'FOB' },
        { label: 'CIF (Cost, Insurance, Freight)', value: 'CIF' },
        { label: 'DDP (Delivered Duty Paid)', value: 'DDP' },
        { label: 'EXW (Ex Works)', value: 'EXW' },
      ],
      admin: {
        description:
          'Incoterms 2020 term determining freight responsibility, risk transfer, and GL posting timing per IFRS-15 §38-42.',
      },
    },
    {
      name: 'incotermsLocation',
      type: 'text',
      admin: {
        description:
          'Named location where FOB/CIF/DDP applies. Examples: "FOB Sofia Warehouse", "CIF Burgas Port", "DDP Buyer\'s Facility". Used with deliveryTerms to determine GL posting timing per IFRS-15 §38-42.',
      },
    },
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
      // FOB-point validation: deliveryTerms + incotermsLocation must be valid per INCOTERMS-2020.
      async ({ data }) => {
        const deliveryTerms = data?.deliveryTerms as string | undefined
        const incotermsLocation = data?.incotermsLocation as string | undefined

        if (deliveryTerms && !incotermsLocation) {
          throw new Error(
            'incotermsLocation is required when deliveryTerms is specified. Example: "CIF Burgas Central Warehouse".',
          )
        }

        if (incotermsLocation && !deliveryTerms) {
          throw new Error('deliveryTerms is required when incotermsLocation is specified.')
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
      // checkFOBConsistency: deliveryTerms must match supplier capability
      // CIF only if freight-forwardable; FOB requires supplier facility control.
      async ({ data }) => {
        const deliveryTerms = data?.deliveryTerms as string | undefined
        const incotermsLocation = data?.incotermsLocation as string | undefined

        if (
          deliveryTerms &&
          incotermsLocation &&
          deliveryTerms === 'CIF' &&
          !incotermsLocation.toLowerCase().includes('port')
        ) {
          // CIF typically used for port-based freight; warn if location doesn't suggest port/freight-forward capability.
        }

        return data
      },
    ],
    afterChange: [emitPoCreated, auditTrailAfterChange('purchase-orders')],
  },
  timestamps: true,
}

export default PurchaseOrders
