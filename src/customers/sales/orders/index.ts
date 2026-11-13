/**
 * Sales Orders — customer-side order register (distinct from purchase-orders
 * which is the vendor-side counterpart).
 *
 * Slice XXXXXXXX-c (2026-05-11) — closes the second-highest orphan-
 * reference gap surfaced by `src/aura/find-gaps.ts`:
 * Quotes.convertedToOrder, Returns.order, Shipments.order, Refunds.order
 * all declared `relationTo: 'orders'` but no collection ever owned that
 * slug. Without this row, the Quote → Order → Shipment → Invoice
 * lifecycle (IFRS-15 §31 transfer-of-control) cannot persist; the
 * picker silently fails at runtime and the order header has nowhere to
 * land.
 *
 * Distinct from `purchase-orders`: that one is P2P (vendor → us).
 * This one is O2C (customer → us). UN-EDIFACT keeps them separate
 * (ORDERS d96a = customer order; ORDRSP / ORDCHG / ORDRSP are the
 * acknowledgement / change / response messages). Peppol BIS-3.0 has
 * `Order` (UBL-2.1 Order schema) for the same reason.
 *
 * Lifecycle: draft → [pending approval → sent → accepted | rejected | expired] →
 * submitted → confirmed → fulfilled → invoiced → closed (or cancelled). The
 * bracketed stages are the QUOTE: a quote is a sales order the customer has
 * not yet accepted, so it is this document in an earlier stage rather than a
 * second collection. The status drives which downstream effects are permitted
 * (e.g. shipments only against confirmed; invoicing only against fulfilled).
 *
 * @standard UBL-2.1 Order document-schema
 * @standard UN-EDIFACT ORDERS d96a customer-order
 * @standard UN-EDIFACT ORDRSP d96a order-response
 * @standard Peppol-BIS-3.0 Order ordering-process
 * @standard EN-16931:2017 §BG-13 delivery-information (downstream of the order)
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IFRS-15 §10 contract-with-customer (order = contract or modification)
 * @accounting IFRS IFRS-15 §31 transfer-of-control
 * @accounting US-GAAP ASC-606 revenue-from-contracts
 * @compliance EU-VAT-Directive 2006/112/EC supply-of-goods-or-services
 * @audit ISO-19011:2018 audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Quotes.ts ./Contracts.ts ./Shipments.ts ./Returns.ts ./Refunds.ts
 * @see ../factories/collection-factory.ts
 */

import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'
import { createAccountingCollection } from '@/factory'
import { referenceField, unitOfMeasureField } from '@/base/accounting/field'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { enforceSegregationOfDuties } from '@/enforce/segregation/of/duty'
import { preset, type Preset } from '@/preset'

/** The stages in which the document is still a quote: offered, not yet an order. */
export const quoteStages = (): string[] => ['pending_approval', 'sent', 'accepted', 'rejected', 'expired']

/** The stages in which it is an order the customer has placed. */
export const orderStages = (): string[] => ['submitted', 'confirmed', 'partially_fulfilled', 'fulfilled', 'invoiced', 'closed', 'cancelled', 'on_hold']

/** The two lists that stand where two collections stood. */
export function orderPresets(): Preset[] {
  return [
    preset('Quotes', 'sales-orders', { status: { in: quoteStages() } }, ['orderNumber', 'customer', 'totalAmount', 'status', 'expiresAt']),
    preset('Orders', 'sales-orders', { status: { in: orderStages() } }, ['orderNumber', 'customer', 'orderDate', 'totalAmount', 'currency', 'status']),
  ]
}

/** One line's net: quantity × unit price, less its discount. */
export const lineNetOf = (line: { quantity?: unknown; unitPrice?: unknown; discount?: unknown }): number =>
  (Number(line.quantity) || 0) * (Number(line.unitPrice) || 0) - (Number(line.discount) || 0)

/** The totals follow from the lines — computed, so a quote and its order can never disagree with their own lines. */
export const totalsFromLines: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.lines && Array.isArray(data.lines)) {
    let net = 0
    for (const line of data.lines as Array<{ quantity?: number; unitPrice?: number; discount?: number; lineNet?: number }>) {
      line.lineNet = lineNetOf(line)
      net += line.lineNet
    }
    data.subTotalAmount = net
    data.totalAmount = net + (Number(data.taxAmount) || 0)
  }
  return data
}

const base = createAccountingCollection({
  slug: 'sales-orders',
  labels: { singular: 'Sales Order', plural: 'Sales Orders' },
  useAsTitle: 'orderNumber',
  defaultColumns: ['orderNumber', 'customer', 'orderDate', 'totalAmount', 'currency', 'status'],
  description:
    'Customer-side order register (O2C). Distinct from purchase-orders (P2P). UN-EDIFACT ORDERS d96a + UBL-2.1 Order + Peppol BIS-3.0 Order. IFRS-15 §10 contract-with-customer feed.',

  standards: [
    'UBL-2.1',
    'UN-EDIFACT-ORDERS-d96a',
    'Peppol-BIS-3.0',
    'EN-16931:2017',
    'IFRS-15',
    'ASC-606',
    'EU-Directive-2006/112/EC',
  ],
  feature: 'order-to-cash',
  // Slice AAAAAAAA (2026-05-11) — structured emits auto-wire afterChange.
  // 'order:created' fires once on insert; the others fire on the matching
  // status transitions (UN-EDIFACT ORDRSP lifecycle).
  emits: [
    { event: 'order:created',   onCreate: true,             aggregate: 'order' },
    { event: 'quote:accepted',  onStatus: 'accepted',       aggregate: 'order' },
    { event: 'order:confirmed', onStatus: 'confirmed',      aggregate: 'order' },
    { event: 'order:fulfilled', onStatus: 'fulfilled',      aggregate: 'order' },
    { event: 'order:cancelled', onStatus: 'cancelled',      aggregate: 'order' },
  ],

  injectStatusField: true,
  statusOptions: [
    { label: 'Draft', value: 'draft' },
    // The quote stages — the document offered, before the customer places it.
    { label: 'Quote — pending approval', value: 'pending_approval' },
    { label: 'Quote — sent', value: 'sent' },
    { label: 'Quote — accepted', value: 'accepted' },
    { label: 'Quote — rejected', value: 'rejected' },
    { label: 'Quote — expired', value: 'expired' },
    { label: 'Submitted (awaiting confirmation)', value: 'submitted' },
    { label: 'Confirmed (vendor accepted)', value: 'confirmed' },
    { label: 'Partially fulfilled', value: 'partially_fulfilled' },
    { label: 'Fulfilled (ready to invoice)', value: 'fulfilled' },
    { label: 'Invoiced', value: 'invoiced' },
    { label: 'Closed', value: 'closed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'On hold', value: 'on_hold' },
  ],
  statusDefault: 'draft',
  beforeChangeHooks: [
    // The quote's control: whoever drafts an offer does not also approve it.
    enforceSegregationOfDuties('approvedBy', 'createdBy'),
    autoSetTimestamp('sentAt', (d) => (d as { status?: string }).status === 'sent'),
    autoSetTimestamp('acceptedAt', (d) => (d as { status?: string }).status === 'accepted'),
  ],

  fields: () => [
    referenceField({
      name: 'orderNumber',
      description: 'Tenant-unique order number (e.g. SO-2026-001). Stable identifier for downstream documents.',
    }),
    { name: 'customer', type: 'relationship', relationTo: 'parties', required: true, index: true },
    { name: 'customerOrderReference', type: 'text',
      admin: { description: 'Buyer-side PO number / reference. EN-16931 §BT-13 / Peppol cbc:BuyerReference.' } },

    // Origin documents
    { name: 'contract', type: 'relationship', relationTo: 'contracts',
      admin: { description: 'Parent contract (when the order draws from a master contract — IFRS-15 §17 combined contracts).' } },

    // Quote stage — when the offer went out, when it lapses, when it was accepted.
    { name: 'sentAt', type: 'date', admin: { readOnly: true, description: 'When the quote was sent to the customer.' } },
    { name: 'expiresAt', type: 'date', admin: { description: 'Until when the quoted terms hold.' } },
    { name: 'acceptedAt', type: 'date', admin: { readOnly: true, description: 'When the customer accepted — IFRS-15 §10 contract inception.' } },

    // Dates
    { name: 'orderDate', type: 'date', required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { description: 'Buyer submission / acceptance date. Drives revenue-period determination.' } },
    { name: 'requestedDeliveryDate', type: 'date',
      admin: { description: 'Buyer-requested delivery date (single shipment) or first window. EN-16931 §BT-72.' } },
    { name: 'promisedDeliveryDate', type: 'date',
      admin: { description: 'Confirmed delivery date after vendor commits. Bound by status=confirmed transition.' } },

    // Addresses (now that addresses exists, point to it directly)
    { name: 'shippingAddress', type: 'relationship', relationTo: 'addresses',
      admin: { description: 'Deliver-to address — EN-16931 §BG-15 / UBL Delivery/DeliveryLocation.' } },
    { name: 'billingAddress', type: 'relationship', relationTo: 'addresses',
      admin: { description: 'Bill-to address (when distinct from buyer registered address). EN-16931 §BG-8.' } },

    // Money
    { name: 'currency', type: 'text', required: true, defaultValue: 'EUR',
      admin: { description: 'ISO 4217 alpha-3 code.' } },
    { name: 'subTotalAmount', type: 'number', defaultValue: 0,
      admin: { description: 'Net of tax. EN-16931 §BT-109.' } },
    { name: 'taxAmount', type: 'number', defaultValue: 0,
      admin: { description: 'Sum of tax-category lines. EN-16931 §BT-110.' } },
    { name: 'totalAmount', type: 'number', defaultValue: 0,
      admin: { description: 'subTotal + tax. EN-16931 §BT-112.' } },

    // Lines (kept inline — array field; line-level reporting via service if needed later)
    {
      name: 'lines',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'lineNumber', type: 'number', required: true,
          admin: { description: 'Position within the order. Stable for cross-document trace.' } },
        { name: 'item', type: 'relationship', relationTo: 'items',
          admin: { description: 'Catalogue item (when ordering from the item master).' } },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        unitOfMeasureField({ description: 'UN/CEFACT Rec 20 unit code (C62, KGM, LTR, …). EN-16931 §BT-130.' }),
        { name: 'unitPrice', type: 'number', required: true, min: 0 },
        { name: 'lineNet', type: 'number', defaultValue: 0,
          admin: { description: 'quantity × unitPrice net of tax. EN-16931 §BT-131.' } },
        { name: 'taxCategory', type: 'relationship', relationTo: 'tax-codes' },
        { name: 'discount', type: 'number', defaultValue: 0,
          admin: { description: 'Line-level discount amount (negative impact on lineNet).' } },
        { name: 'requestedDeliveryDate', type: 'date',
          admin: { description: 'Per-line delivery date (when distinct from order-header date).' } },
      ],
    },

    // Fulfillment progress (read-mostly — updated by Shipments hook when status → shipped)
    { name: 'fulfilledQuantity', type: 'number', defaultValue: 0,
      admin: { description: 'Aggregate fulfilled quantity across all shipments. Maintained by hook.' } },
    { name: 'invoicedAmount', type: 'number', defaultValue: 0,
      admin: { description: 'Aggregate invoiced amount across all invoices. Maintained by hook.' } },

    // Termination signals
    { name: 'cancellationDate', type: 'date' },
    { name: 'cancellationReason', type: 'text', localized: true },
  ],
})

const SalesOrders: CollectionConfig = {
  ...base,
  enableQueryPresets: true,
  hooks: { ...base.hooks, beforeValidate: [...(base.hooks?.beforeValidate ?? []), totalsFromLines] },
}

export default SalesOrders
