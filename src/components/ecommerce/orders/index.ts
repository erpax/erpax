/**
 * Orders — ONE order document: the e-commerce plugin's `orders`, carrying the sales-order register.
 *
 * There were two unconnected orders: the plugin's `orders` (web checkout — product/variant lines,
 * a paid amount) and a custom `sales-orders` collection (the O2C register — quote stages, item
 * lines with tax, delivery dates). The custom collection is folded into the plugin's through its
 * `ordersCollectionOverride`: the plugin owns the collection, this module adds the register's
 * fields, stages and hooks. A web checkout and a negotiated order are now the same document.
 *
 * THE PURCHASE SIDE. A purchase order is the same document seen from the buyer's chair — a number,
 * a counterparty, dates, lines, totals — so the custom `purchase-orders` collection is folded in
 * as well: `side` says which it is (sale by default, so a web checkout is a sale). The purchase
 * side adds the vendor, delivery terms, the GL account and received quantity per line, and the
 * goods-receipt join. Events and the saved lists are split by side: a purchase order "sent to
 * vendor" is not a sales quote, and cancelling one must not post a sales reversal.
 *
 * What the fold decided where the two shapes collided:
 *  - `status` is ONE lifecycle: the plugin's values (processing · completed · cancelled · refunded)
 *    and the register's stages (draft · the quote stages · submitted … on_hold) in one select.
 *  - `customer` stays the plugin's (a user — who checked out). The register's customer is `party`
 *    (the trading partner invoiced). Optional: a guest checkout has no party.
 *  - `shippingAddress` stays the plugin's embedded address. The register's address RECORDS are
 *    `shipTo` / `billTo`.
 *  - `currency` is the plugin's. `amount` is what was charged; `totalAmount` is what the lines say.
 *  - `items` (plugin: product × variant × quantity) and `lines` (register: item, price, tax) both
 *    stand. An item points at its product/variant (see `@/collections/items`), which is how the
 *    two line shapes are matched.
 *
 * @standard UBL-2.1 Order (OASIS) §Order
 * @standard UN-EDIFACT ORDERS d96a purchase-order-message
 * @standard Peppol-BIS-3.0 Order ordering-process
 * @standard EN-16931:2017 §BG-13 delivery-information (downstream of the order)
 * @accounting IFRS IFRS-15 §10 contract-with-customer (order = contract or modification)
 * @accounting IFRS IFRS-15 §31 transfer-of-control
 * @accounting US-GAAP ASC-606 revenue-from-contracts
 * @compliance EU-VAT-Directive 2006/112/EC supply-of-goods-or-services
 * @audit ISO-19011:2018 audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionAfterChangeHook, CollectionBeforeValidateHook, Field, Option } from 'payload'
import type { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'

import { auditFields } from '@/fields/relationship/auditFields'
import { referenceField } from '@/fields/text/referenceField'
import { notesField } from '@/fields/textarea/notesField'
import { unitOfMeasureField } from '@/fields/text/unitOfMeasureField'
import { auditTrailAfterChange } from '@/hooks/collections/shared/auditTrailAfterChange'
import { autoPopulateCreatedBy } from '@/hooks/collections/shared/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/collections/shared/autoSetTimestamp'
import { enforceSegregationOfDuties } from '@/hooks/collections/shared/enforceSegregationOfDuties'
import { emitOrderLifecycleEvents } from '@/hooks/collections/users/emitOrderLifecycleEvents'
import { emitOnCreate, emitOnStatusTransition, emitPoCreated } from '@/utilities/chain/event/emitter'
import { preset, type Preset } from '@/utilities/preset'

/** The stages in which the document is still a quote: offered, not yet an order. */
export const quoteStages = (): string[] => ['pending_approval', 'sent', 'accepted', 'rejected', 'expired']

/** The stages in which it is an order the customer has placed — the register's and the plugin's own. */
export const orderStages = (): string[] => [
  'submitted', 'confirmed', 'partially_fulfilled', 'fulfilled', 'invoiced', 'closed', 'cancelled', 'on_hold',
  'processing', 'completed', 'refunded',
]

/** The purchase side's own stages (it shares draft · submitted · sent · closed · cancelled with the sale side). */
export const purchaseStages = (): string[] => ['approved', 'partial', 'received']

export type OrderSide = 'sale' | 'purchase'

/** Which side an order is on. Absent means sale: the plugin creates a web order with no side. */
export const sideOf = (doc: unknown): OrderSide => ((doc as { side?: unknown } | null | undefined)?.side === 'purchase' ? 'purchase' : 'sale')

const saleSide = { side: { not_equals: 'purchase' } }

/** The three lists that stand where three collections stood. */
export function orderPresets(): Preset[] {
  return [
    preset('Quotes', 'orders', { and: [saleSide, { status: { in: quoteStages() } }] }, ['orderNumber', 'party', 'totalAmount', 'status', 'expiresAt']),
    preset('Orders', 'orders', { and: [saleSide, { status: { in: orderStages() } }] }, ['orderNumber', 'party', 'orderDate', 'totalAmount', 'currency', 'status']),
    preset('Purchase orders', 'orders', { side: { equals: 'purchase' } }, ['orderNumber', 'vendor', 'orderDate', 'totalAmount', 'status']),
  ]
}

/** Delivery terms and their named place go together: one without the other says nothing about where risk passes. */
export const incotermsPair: CollectionBeforeValidateHook = ({ data }) => {
  const terms = data?.deliveryTerms as string | undefined
  const place = data?.incotermsLocation as string | undefined
  if (terms && !place) throw new Error('incotermsLocation is required when deliveryTerms is specified. Example: "CIF Burgas Central Warehouse".')
  if (place && !terms) throw new Error('deliveryTerms is required when incotermsLocation is specified.')
  return data
}

/** Run an event hook only for orders on one side; the other side passes through untouched. */
export const onSide = (side: OrderSide, hook: CollectionAfterChangeHook): CollectionAfterChangeHook => (args) =>
  sideOf(args.doc) === side ? hook(args) : args.doc

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

/** The register's stages, added to the plugin's own status values. */
const REGISTER_STAGES: readonly { label: string; value: string }[] = [
  { label: 'Draft', value: 'draft' },
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
  // The purchase side.
  { label: 'Purchase — approved', value: 'approved' },
  { label: 'Purchase — partially received', value: 'partial' },
  { label: 'Purchase — received', value: 'received' },
]

const valueOf = (option: Option): string => (typeof option === 'string' ? option : option.value)

/** One lifecycle: the plugin's options first (its values and labels win), then every register stage it lacks. */
export const orderStatusOptions = (pluginOptions: readonly Option[]): Option[] => {
  const have = new Set(pluginOptions.map(valueOf))
  return [...pluginOptions, ...REGISTER_STAGES.filter((stage) => !have.has(stage.value))]
}

/** The sales-order register's fields, as they sit on the plugin's order. */
export const orderFields = (): Field[] => [
  { name: 'side', type: 'select', defaultValue: 'sale', index: true,
    options: [
      { label: 'Sale (order-to-cash)', value: 'sale' },
      { label: 'Purchase (procure-to-pay)', value: 'purchase' },
    ],
    admin: { description: 'Whether this is an order from a customer or an order to a vendor. A web checkout is a sale.' } },
  // Not required: the plugin creates an order at checkout with no number. (`referenceField` is
  // required by default, which would have refused every web order.)
  referenceField({
    name: 'orderNumber',
    required: false,
    description: 'Tenant-unique order number (e.g. SO-2026-001). Stable identifier for downstream documents. Empty on a web checkout.',
  }),
  { name: 'party', type: 'relationship', relationTo: 'parties', index: true,
    admin: { description: 'The trading partner the order is with and invoiced to. (`customer` is the user who checked out.)' } },
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
  { name: 'orderDate', type: 'date',
    defaultValue: () => new Date().toISOString(),
    admin: { description: 'Buyer submission / acceptance date. Drives revenue-period determination.' } },
  { name: 'requestedDeliveryDate', type: 'date',
    admin: { description: 'Buyer-requested delivery date (single shipment) or first window. EN-16931 §BT-72.' } },
  { name: 'promisedDeliveryDate', type: 'date',
    admin: { description: 'Confirmed delivery date after vendor commits. Bound by status=confirmed transition.' } },

  // Address records (the plugin's `shippingAddress` is the embedded copy taken at checkout)
  { name: 'shipTo', type: 'relationship', relationTo: 'addresses',
    admin: { description: 'Deliver-to address record — EN-16931 §BG-15 / UBL Delivery/DeliveryLocation.' } },
  { name: 'billTo', type: 'relationship', relationTo: 'addresses',
    admin: { description: 'Bill-to address record (when distinct from the buyer registered address). EN-16931 §BG-8.' } },

  // Money (the plugin's `amount` is what was charged; these follow from the lines)
  { name: 'subTotalAmount', type: 'number', defaultValue: 0,
    admin: { description: 'Net of tax. EN-16931 §BT-109.' } },
  { name: 'taxAmount', type: 'number', defaultValue: 0,
    admin: { description: 'Sum of tax-category lines. EN-16931 §BT-110.' } },
  { name: 'totalAmount', type: 'number', defaultValue: 0,
    admin: { description: 'subTotal + tax. EN-16931 §BT-112.' } },

  // Lines (the plugin's `items` are product × variant × quantity; these carry price, unit and tax)
  {
    name: 'lines',
    type: 'array',
    fields: [
      { name: 'lineNumber', type: 'number', required: true,
        admin: { description: 'Position within the order. Stable for cross-document trace.' } },
      { name: 'item', type: 'relationship', relationTo: 'products',
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
      { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts',
        admin: { description: 'Purchase side: expense / asset account to debit on receipt.' } },
      { name: 'quantityReceived', type: 'number', defaultValue: 0,
        admin: { readOnly: true, description: 'Purchase side: cumulative quantity received via goods-receipts.' } },
    ],
  },

  // ── The purchase side (formerly the purchase-orders collection) ──
  { name: 'vendor', type: 'relationship', relationTo: 'addresses', index: true,
    admin: { description: 'Purchase side: the vendor receiving the order.' } },
  { name: 'project', type: 'relationship', relationTo: 'projects', index: true,
    admin: { description: 'The project this belongs to. Costs book to the project; the project carries the award.' } },
  { name: 'deliveryTerms', type: 'select',
    options: [
      { label: 'FOB (Free On Board)', value: 'FOB' },
      { label: 'CIF (Cost, Insurance, Freight)', value: 'CIF' },
      { label: 'DDP (Delivered Duty Paid)', value: 'DDP' },
      { label: 'EXW (Ex Works)', value: 'EXW' },
    ],
    admin: { description: 'Incoterms 2020 term determining freight responsibility, risk transfer, and GL posting timing per IFRS-15 §38-42.' } },
  { name: 'incotermsLocation', type: 'text',
    admin: { description: 'Named place where the delivery term applies (e.g. "CIF Burgas Port"). Required with deliveryTerms.' } },
  { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
  { name: 'closedAt', type: 'date', admin: { readOnly: true } },
  { name: 'receipts', type: 'join', collection: 'goods-receipts', on: 'purchaseOrder',
    admin: { description: 'Partial / full goods-receipts against this purchase order.' } },
  { name: 'invoice', type: 'relationship', relationTo: 'invoices',
    admin: { description: 'Matched vendor bill (three-way-match anchor).' } },
  notesField(),

  // Fulfillment progress (read-mostly — updated by Shipments hook when status → shipped)
  { name: 'fulfilledQuantity', type: 'number', defaultValue: 0,
    admin: { description: 'Aggregate fulfilled quantity across all shipments. Maintained by hook.' } },
  { name: 'invoicedAmount', type: 'number', defaultValue: 0,
    admin: { description: 'Aggregate invoiced amount across all invoices. Maintained by hook.' } },

  // Termination signals
  { name: 'cancellationDate', type: 'date' },
  { name: 'cancellationReason', type: 'text', localized: true },

  ...auditFields({ readOnly: true }),
]

/** The guest-order lookup token the storefront already used. */
const accessTokenField: Field = {
  name: 'accessToken',
  type: 'text',
  unique: true,
  index: true,
  admin: { position: 'sidebar', readOnly: true },
  hooks: {
    beforeValidate: [({ value, operation }) => (operation === 'create' || !value ? crypto.randomUUID() : value)],
  },
}

/**
 * The plugin's orders collection with the register folded in. Throws at config time if the
 * plugin's `status` select is not where this expects it — a plugin upgrade must not silently
 * leave the register without its stages.
 */
export const ordersOverride: CollectionOverride = ({ defaultCollection }) => {
  let widened = false
  const fields = defaultCollection.fields.map((field): Field => {
    if ('name' in field && field.name === 'status' && field.type === 'select') {
      widened = true
      return { ...field, options: orderStatusOptions(field.options) }
    }
    return field
  })
  if (!widened) throw new Error('orders: the e-commerce plugin no longer has a top-level `status` select to carry the order stages')

  return {
    ...defaultCollection,
    enableQueryPresets: true,
    fields: [...fields, accessTokenField, ...orderFields()],
    hooks: {
      ...defaultCollection.hooks,
      beforeValidate: [...(defaultCollection.hooks?.beforeValidate ?? []), totalsFromLines, incotermsPair],
      beforeChange: [
        ...(defaultCollection.hooks?.beforeChange ?? []),
        autoPopulateCreatedBy,
        // The quote's control: whoever drafts an offer does not also approve it.
        enforceSegregationOfDuties('approvedBy', 'createdBy'),
        autoSetTimestamp('sentAt', (d) => (d as { status?: string }).status === 'sent'),
        autoSetTimestamp('acceptedAt', (d) => (d as { status?: string }).status === 'accepted'),
        autoSetTimestamp('submittedAt', (d) => (d as { status?: string }).status === 'submitted'),
        autoSetTimestamp('closedAt', (d) => ['closed', 'cancelled'].includes(String((d as { status?: string }).status))),
      ],
      afterChange: [
        ...(defaultCollection.hooks?.afterChange ?? []),
        // Every status transition emits the matching domain event so the GL can post the
        // IFRS 15 / ASC 606 revenue-recognition + COGS entries.
        // Sale side only: a purchase order must not post revenue, nor a sales reversal when cancelled.
        onSide('sale', emitOrderLifecycleEvents),
        // The register's chain events (UN-EDIFACT ORDRSP lifecycle), each on its own side.
        onSide('sale', emitOnCreate('order:created', 'order')),
        onSide('sale', emitOnStatusTransition('accepted', 'quote:accepted', 'order')),
        onSide('sale', emitOnStatusTransition('confirmed', 'order:confirmed', 'order')),
        onSide('sale', emitOnStatusTransition('fulfilled', 'order:fulfilled', 'order')),
        onSide('sale', emitOnStatusTransition('cancelled', 'order:cancelled', 'order')),
        onSide('purchase', emitPoCreated),
        auditTrailAfterChange('orders'),
      ],
    },
  }
}
