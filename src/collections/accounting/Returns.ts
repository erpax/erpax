/**
 * Returns / RMA — customer-return authorisation with inventory + GL reversal.
 *
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-15 §B22 right-of-return-revenue-reversal
 * @accounting IFRS IAS-2 inventories return-to-stock
 * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
 * @accounting US-GAAP ASC-330 inventory cost-flow
 * @audit ISO-19011:2018 audit-trail rma-evidence
 * @compliance SOX §404 internal-controls return-approval
 * @security ISO-27002 §5.4 segregation-of-duties
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

const Returns: CollectionConfig = {
  slug: 'returns',
  labels: { singular: 'Return / RMA', plural: 'Returns / RMAs' },
  admin: { useAsTitle: 'rmaNumber', defaultColumns: ['rmaNumber', 'order', 'reason', 'status', 'createdAt'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'rmaNumber', type: 'text', required: true, unique: true, index: true },
    // Slice XXXXXXXX-c (2026-05-11): retargeted from 'orders' → 'sales-orders'.
    // IFRS-15 §B25 right-of-return links the return RMA back to the
    // originating customer-side sales order.
    { name: 'order', type: 'relationship', relationTo: 'sales-orders', required: true },
    // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'customers'.
    // Returns counterparty is the original buyer (IFRS-15 §B25 right-of-
    // return). Address can be resolved via customer.shippingAddress.
    { name: 'customer', type: 'relationship', relationTo: 'customers' },
    {
      name: 'reason',
      type: 'select',
      required: true,
      options: [
        { label: 'Defective', value: 'defective' },
        { label: 'Wrong item shipped', value: 'wrong_item' },
        { label: 'Customer changed mind', value: 'customer_changed_mind' },
        { label: 'Damaged in transit', value: 'damaged' },
        { label: 'Late delivery', value: 'late' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'quantityReturned', type: 'number', required: true, min: 0 },
        { name: 'restock', type: 'checkbox', defaultValue: true, admin: { description: 'Return to inventory or write off?' } },
      ],
    },
    statusField(
      [
        { label: 'Requested', value: 'requested' },
        { label: 'Authorised', value: 'authorised' },
        { label: 'In Transit', value: 'in_transit' },
        { label: 'Received', value: 'received' },
        { label: 'Restocked', value: 'restocked' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Closed', value: 'closed' },
        { label: 'Rejected', value: 'rejected' },
      ],
      'requested',
    ),
    { name: 'authorisedAt', type: 'date', admin: { readOnly: true } },
    { name: 'receivedAt', type: 'date', admin: { readOnly: true } },
    { name: 'restockedAt', type: 'date', admin: { readOnly: true } },
    { name: 'creditMemo', type: 'relationship', relationTo: 'credit-memos', admin: { description: 'Credit memo issued for the return.' } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties('approvedBy', 'createdBy'),
      autoSetTimestamp('authorisedAt', (d) => (d as { status?: string }).status === 'authorised'),
      autoSetTimestamp('receivedAt', (d) => (d as { status?: string }).status === 'received'),
      autoSetTimestamp('restockedAt', (d) => (d as { status?: string }).status === 'restocked'),
    ],
    afterChange: [auditTrailAfterChange('returns')],
  },
  timestamps: true,
}

export default Returns
