/**
 * Vendor Quotes / RFQs — supplier RFQ responses (BEPS Action 13 evidence).
 *
 * Slice FFFF (2026-05-10): when a requisition requires competitive
 * bidding (typical for spend ≥ €10k), each vendor's response is a
 * separate quote row. The award decision (which quote wins) is
 * captured here with rationale — auditors review for arm's-length
 * pricing per OECD BEPS Action 13.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @compliance OECD BEPS Action 13 transfer-pricing-evidence
 * @compliance SOX §404 internal-controls vendor-selection
 * @standard ISO 9001:2015 §8.4 control-of-externally-provided-processes
 * @audit ISO-19011:2018 audit-trail rfq-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./PurchaseRequisitions.ts
 * @see ./Vendors.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField, taxonomySelect } from '../fields/base-accounting-fields'
import { INCOTERM_OPTIONS } from '@/standards/incoterms-2020'
import { emitRfqReceived, emitRfqAwarded } from '@/hooks/chainEventEmitters'

const VendorQuotes: CollectionConfig = {
  slug: 'vendor-quotes',
  labels: { singular: 'Vendor Quote', plural: 'Vendor Quotes' },
  admin: {
    useAsTitle: 'quoteNumber',
    defaultColumns: ['quoteNumber', 'vendor', 'requisition', 'totalAmount', 'validUntil', 'isAwarded', 'status'],
    description:
      'Per-vendor RFQ response. Award decision lives here with rationale; the awarded quote becomes the PO source.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    referenceField({ name: 'quoteNumber', description: 'Tenant-unique vendor quote number (e.g. VQ-2026-0001).' }),
    { name: 'vendor', type: 'relationship', relationTo: 'vendors', required: true, index: true },
    { name: 'requisition', type: 'relationship', relationTo: 'purchase-requisitions', index: true,
      admin: { description: 'Source requisition (one PR may have many vendor quotes).' } },
    { name: 'rfqIssuedDate', type: 'date' },
    { name: 'quoteReceivedDate', type: 'date', required: true },
    { name: 'validUntil', type: 'date',
      admin: { description: 'Quote expiry (after this date, vendor may not honour pricing).' } },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Line', plural: 'Lines' },
      dbName: 'vq_lines',
      fields: [
        { name: 'description', type: 'text', required: true },
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        { name: 'uom', type: 'text', defaultValue: 'EA' },
        { name: 'unitPrice', type: 'number', required: true },
        { name: 'lineTotal', type: 'number', required: true },
        { name: 'leadTimeDays', type: 'number' },
      ],
    },
    currencyField(),
    { name: 'subtotal', type: 'number' },
    { name: 'taxAmount', type: 'number' },
    { name: 'shippingAmount', type: 'number' },
    { name: 'discountAmount', type: 'number' },
    { name: 'totalAmount', type: 'number', required: true,
      admin: { description: 'Quote total (cents).' } },
    {
      name: 'paymentTerms',
      type: 'text',
      admin: { description: 'e.g. "Net 30", "2/10 Net 30", "50% deposit, balance on delivery".' },
    },
    taxonomySelect('incoterms', INCOTERM_OPTIONS, { description: 'INCOTERMS 2020 code (e.g. EXW / FCA / DAP / DDP) per ICC publication 723E.' }),
    { name: 'deliveryDate', type: 'date' },
    { name: 'isAwarded', type: 'checkbox', defaultValue: false, index: true,
      admin: { description: 'Set true when this is the winning quote.' } },
    { name: 'awardedDate', type: 'date' },
    { name: 'awardedBy', type: 'relationship', relationTo: 'users' },
    { name: 'awardRationale', type: 'textarea',
      admin: { description: 'OECD BEPS Action 13 + SOX §404 — reason for selection (lowest price / best fit / certified vendor / etc.).' } },
    { name: 'createdPurchaseOrder', type: 'relationship', relationTo: 'purchase-orders',
      admin: { readOnly: true, description: 'PO created from the awarded quote.' } },
    { name: 'qualityAssessment', type: 'select', options: [
      { label: 'Excellent', value: 'excellent' },
      { label: 'Good', value: 'good' },
      { label: 'Acceptable', value: 'acceptable' },
      { label: 'Marginal', value: 'marginal' },
      { label: 'Unacceptable', value: 'unacceptable' },
    ]},
    statusField(
      [
        { label: 'Requested (RFQ sent)', value: 'requested' },
        { label: 'Received', value: 'received' },
        { label: 'Under Review', value: 'under_review' },
        { label: 'Awarded', value: 'awarded' },
        { label: 'Not Awarded (lost)', value: 'not_awarded' },
        { label: 'Expired', value: 'expired' },
        { label: 'Withdrawn (vendor pulled)', value: 'withdrawn' },
      ],
      'received',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitRfqReceived, emitRfqAwarded, auditTrailAfterChange('vendor-quotes')],
  },
  timestamps: true,
}

export default VendorQuotes
