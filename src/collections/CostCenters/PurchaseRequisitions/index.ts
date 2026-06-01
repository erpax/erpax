/**
 * Purchase Requisitions — pre-PO approval chain (SOX §404 four-eyes).
 *
 * Slice FFFF (2026-05-10): the prior procurement model jumped straight
 * to `purchase-orders` with no upstream approval record. SOX §404 +
 * ISO 27002 §5.4 require segregation of duties — the requisitioner
 * cannot also be the approver. This collection captures the
 * requisition + approval chain BEFORE the PO is issued, so the auditor
 * can walk PO → requisition → approver(s).
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @compliance SOX §404 internal-controls four-eyes
 * @security ISO-27002 §5.4 segregation-of-duties
 * @audit ISO-19011:2018 audit-trail requisition-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./PurchaseOrders.ts
 * @see ./VendorQuotes.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../../access/auth'
import { currencyField, statusField, notesField, auditFields } from '../../../fields/base-accounting-fields'
import { emitPrSubmitted, emitPrApproved } from '../../../hooks/chainEventEmitters'

const PurchaseRequisitions: CollectionConfig = {
  slug: 'purchase-requisitions',
  labels: { singular: 'Purchase Requisition', plural: 'Purchase Requisitions' },
  admin: {
    useAsTitle: 'requisitionNumber',
    defaultColumns: ['requisitionNumber', 'requisitioner', 'department', 'estimatedTotal', 'requiredByDate', 'status'],
    description:
      'SOX §404 pre-PO approval gate. Requisitioner ≠ approver; auditor walks PO → requisition → approval chain.',
  },
  access: accountingCollectionAccess(),
  fields: [
    { name: 'requisitionNumber', type: 'text', required: true, unique: true, index: true },
    { name: 'requisitioner', type: 'relationship', relationTo: 'users', required: true },
    { name: 'department', type: 'text' },
    { name: 'costCenter', type: 'relationship', relationTo: 'cost-centers' },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    { name: 'requestedDate', type: 'date', required: true },
    { name: 'requiredByDate', type: 'date',
      admin: { description: 'When the goods/services are needed.' } },
    { name: 'businessJustification', type: 'textarea', required: true,
      admin: { description: 'Reason for the spend (drives approver decision + audit-trail evidence).' } },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Line', plural: 'Lines' },
      dbName: 'pr_lines',
      fields: [
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        { name: 'uom', type: 'text', defaultValue: 'EA' },
        { name: 'estimatedUnitPrice', type: 'number', required: true,
          admin: { description: 'Estimated unit price (cents).' } },
        { name: 'estimatedAmount', type: 'number', required: true,
          admin: { description: 'quantity × estimatedUnitPrice (cents).' } },
        { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts' },
        { name: 'preferredVendor', type: 'relationship', relationTo: 'vendors' },
      ],
    },
    currencyField(),
    { name: 'estimatedTotal', type: 'number', required: true,
      admin: { description: 'Σ lines.estimatedAmount (cents).' } },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Critical (urgent / production blocking)', value: 'critical' },
        { label: 'High', value: 'high' },
        { label: 'Normal', value: 'normal' },
        { label: 'Low', value: 'low' },
      ],
    },
    {
      name: 'requiresQuotes',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'When true, must collect ≥ 3 vendor quotes before PO (typical for spend > €10k).' },
    },
    { name: 'minimumQuotesRequired', type: 'number', defaultValue: 0 },
    {
      name: 'approvalChain',
      type: 'array',
      labels: { singular: 'Approval Step', plural: 'Approval Steps' },
      dbName: 'pr_approval',
      fields: [
        { name: 'step', type: 'number', required: true },
        { name: 'approver', type: 'relationship', relationTo: 'users', required: true },
        { name: 'role', type: 'text', admin: { description: 'e.g. Department Head, CFO, CEO.' } },
        {
          name: 'decision',
          type: 'select',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
            { label: 'Returned for Clarification', value: 'returned' },
          ],
          defaultValue: 'pending',
        },
        { name: 'decidedAt', type: 'date' },
        { name: 'comment', type: 'text', localized: true },
      ],
    },
    { name: 'createdPurchaseOrder', type: 'relationship', relationTo: 'purchase-orders',
      admin: { readOnly: true, description: 'PO created when requisition fully approved.' } },
    { name: 'awardedQuote', type: 'relationship', relationTo: 'vendor-quotes',
      admin: { description: 'Selected vendor quote that led to PO award.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted (awaiting approval)', value: 'submitted' },
        { label: 'In Approval Chain', value: 'in_approval' },
        { label: 'Approved (ready for PO)', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Returned for Clarification', value: 'returned' },
        { label: 'PO Created', value: 'po_created' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('purchase-requisitions', { afterChange: [emitPrSubmitted, emitPrApproved] }),
  timestamps: true,
}

export default PurchaseRequisitions
