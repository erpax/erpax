/**
 * Quotes — IFRS 15 / ASC 606 contract origination.
 *
 * Quotes are pre-contract proposals — no GL impact until accepted →
 * converted to Order. The collection enforces issuer ≠ approver SoD
 * before sending to the customer.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time issued-at expires-at
 * @accounting IFRS IFRS-15 §10 contract-with-customer
 * @accounting US-GAAP ASC-606-10-25 contract-existence
 * @audit ISO-19011:2018 audit-trail quote-issuance
 * @compliance SOX §404 internal-controls quote-approval
 * @security ISO-27002 §5.4 segregation-of-duties
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../../../hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '../../../hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '../../../hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '../../../hooks/enforceSegregationOfDuties'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '../../../access/auth'
import { currencyField, statusField, notesField, auditFields } from '../../../fields/base-accounting-fields'

const Quotes: CollectionConfig = {
  slug: 'quotes',
  labels: { singular: 'Quote', plural: 'Quotes' },
  admin: { useAsTitle: 'quoteNumber', defaultColumns: ['quoteNumber', 'customer', 'totalAmount', 'status', 'expiresAt'] },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'quoteNumber', type: 'text', required: true, unique: true, index: true },
    // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'customers'.
    // The field name said `customer` but the relation pointed at the address
    // master — a leftover from the deleted ecommerce plugin's polymorphic
    // customer-as-address shape. EN-16931 §BG-7 (buyer) requires the buyer
    // party itself, not the address; addresses live on the customer row.
    { name: 'customer', type: 'relationship', relationTo: 'customers', required: true },
    { name: 'issuedAt', type: 'date', admin: { readOnly: true } },
    { name: 'expiresAt', type: 'date' },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        { name: 'unitPrice', type: 'number', required: true, min: 0 },
        { name: 'lineTotal', type: 'number', defaultValue: 0, admin: { readOnly: true } },
      ],
    },
    { name: 'subtotal', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'taxAmount', type: 'number', defaultValue: 0 },
    { name: 'totalAmount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    currencyField(),
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Approval', value: 'pending_approval' },
        { label: 'Sent', value: 'sent' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Expired', value: 'expired' },
        { label: 'Converted to Order', value: 'converted' },
      ],
      'draft',
    ),
    { name: 'sentAt', type: 'date', admin: { readOnly: true } },
    { name: 'acceptedAt', type: 'date', admin: { readOnly: true } },
    // Slice XXXXXXXX-c (2026-05-11): retargeted from 'orders' → 'sales-orders'.
    // 'orders' was an orphan slug (no collection ever owned it). The
    // canonical O2C target is the new sales-orders collection
    // (distinct from purchase-orders / P2P).
    { name: 'convertedToOrder', type: 'relationship', relationTo: 'sales-orders' },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [
      autoPopulateTenant,
      async ({ data }) => {
        if (data?.lines && Array.isArray(data.lines)) {
          let subtotal = 0
          for (const line of data.lines as Array<{ quantity?: number; unitPrice?: number; lineTotal?: number }>) {
            const lt = (Number(line.quantity) || 0) * (Number(line.unitPrice) || 0)
            line.lineTotal = lt
            subtotal += lt
          }
          data.subtotal = subtotal
          data.totalAmount = subtotal + (Number(data.taxAmount) || 0)
        }
        return data
      },
    ],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties('approvedBy', 'createdBy'),
      autoSetTimestamp('issuedAt', (d) => (d as { status?: string }).status === 'sent'),
      autoSetTimestamp('sentAt', (d) => (d as { status?: string }).status === 'sent'),
      autoSetTimestamp('acceptedAt', (d) => (d as { status?: string }).status === 'accepted'),
    ],
    afterChange: [auditTrailAfterChange('quotes')],
  },
  timestamps: true,
}

export default Quotes
