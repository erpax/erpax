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
 * side adds delivery terms, the GL account and received quantity per line, and the
 * goods-receipt join. Events and the saved lists are split by side: a purchase order "sent to
 * vendor" is not a sales quote, and cancelling one must not post a sales reversal.
 *
 * THE DOCUMENT TYPE. The procurement documents that lead to a purchase order are the same family:
 * a purchase REQUISITION (the internal request, with its approval chain) and a vendor QUOTE (the
 * supplier's answer to an RFQ, with the award). `documentType` says which one a document is; it
 * defaults to order. A status is read per document type and party: "received" on a vendor quote
 * means the quote arrived, on a purchase order it means the goods did, and each fires its own
 * event — `onDocument` guards every hook by the type and side it belongs to, so no status value
 * had to be renamed.
 *
 * THE COUNTERPARTY is ONE polymorphic relationship, `party`: the other side of the document,
 * whoever that is — a trading partner (`parties`), an address-book entry (`addresses`, which is
 * what a purchase order's vendor was), or another tenant on this platform (`tenants`). The
 * standards name two roles and the document's `side` says which one the party plays:
 *
 *   side      the tenant is                  `party` is
 *   sale      Seller  (EN 16931 BG-4 · UBL SellerSupplierParty)   Buyer  (BG-7 · UBL BuyerCustomerParty)
 *   purchase  Buyer   (EN 16931 BG-7 · UBL BuyerCustomerParty)    Seller (BG-4 · UBL SellerSupplierParty)
 *
 * So every standard field keeps its source: BT-27..BT-43 (seller) and BT-44..BT-58 (buyer) are
 * read from the tenant or the party according to `side`; nothing a standard requires was dropped
 * by the fold. Dates stay ISO 8601, currency ISO 4217, units UN/CEFACT Rec 20, delivery terms
 * Incoterms 2020. (`customer` remains the plugin's own field: the user who checked out.)
 *
 * THE PARTIES ARE ROLES. Beyond the counterparty field, anyone can be made a party to an order by
 * holding a role on it — seller, buyer, supplier, consignee, forwarder (`@/utilities/party/roles`) — and
 * reads it because of that role. etrima's five party columns on `orders` are those five roles.
 *
 * THE TENANT'S CHAIR. `side`, `documentType` and `status` are the OWNING tenant's reading of the
 * document: what it means to that tenant's users. The same order is a purchase to the buyer and a
 * sale to the seller, and "sent" for one is "received" for the other. A document belongs to one
 * tenant here, so one reading is stored; nothing in this module assumes a status means the same
 * thing to the counterparty.
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
 * @standard EN-16931:2017 §BG-4 seller · §BG-7 buyer (the tenant and `party`, by `side`)
 * @standard EN-16931:2017 §BG-13 delivery-information (downstream of the order)
 * @standard ISO-8601-1:2019 date-time · ISO-4217:2015 currency · ISO-3166-1:2020 country
 * @standard UN/CEFACT Rec20 units-of-measure · ICC Incoterms-2020 delivery-terms
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
import { emitOnCreate, emitOnStatusTransition, emitPoCreated, emitPrApproved, emitPrSubmitted, emitRfqAwarded, emitRfqReceived } from '@/utilities/chain/event/emitter'
import { taxonomySelect } from '@/fields/select/taxonomySelect'
import { INCOTERM_OPTIONS } from '@/utilities/incoterms/2020'
import { either } from '@/access/collections/shared/either'
import { partyAccess } from '@/access/collections/shared/partyAccess'
import { assignBuyerParty } from '@/hooks/collections/orders/assignBuyerParty'
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

export type DocumentType = 'order' | 'quote' | 'requisition'

/** Which document this is. Absent means order: the plugin creates a web order with no type. */
export const typeOf = (doc: unknown): DocumentType => {
  const type = (doc as { documentType?: unknown } | null | undefined)?.documentType
  return type === 'quote' || type === 'requisition' ? type : 'order'
}

/** The stages of a vendor quote (it shares received · expired with other documents, meaning something else there). */
export const vendorQuoteStages = (): string[] => ['requested', 'received', 'under_review', 'awarded', 'not_awarded', 'expired', 'withdrawn']

/** The stages of a purchase requisition. */
export const requisitionStages = (): string[] => ['draft', 'submitted', 'in_approval', 'approved', 'rejected', 'returned', 'po_created', 'cancelled']

const saleSide = { side: { not_equals: 'purchase' } }
const anOrder = { documentType: { not_in: ['quote', 'requisition'] } }

/** The five lists that stand where five collections stood. */
export function orderPresets(): Preset[] {
  return [
    preset('Quotes', 'orders', { and: [saleSide, { status: { in: quoteStages() } }] }, ['orderNumber', 'party', 'totalAmount', 'status', 'expiresAt']),
    preset('Orders', 'orders', { and: [saleSide, { status: { in: orderStages() } }] }, ['orderNumber', 'party', 'orderDate', 'totalAmount', 'currency', 'status']),
    preset('Purchase orders', 'orders', { and: [{ side: { equals: 'purchase' } }, anOrder] }, ['orderNumber', 'party', 'orderDate', 'totalAmount', 'status']),
    preset('Vendor quotes', 'orders', { documentType: { equals: 'quote' } }, ['orderNumber', 'party', 'requisition', 'totalAmount', 'expiresAt', 'isAwarded', 'status']),
    preset('Purchase requisitions', 'orders', { documentType: { equals: 'requisition' } }, ['orderNumber', 'requisitioner', 'orderDate', 'totalAmount', 'priority', 'status']),
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

/** Run an event hook only for ORDERS on one side; the other side, and quotes and requisitions, pass through untouched. */
export const onSide = (side: OrderSide, hook: CollectionAfterChangeHook): CollectionAfterChangeHook => (args) =>
  typeOf(args.doc) === 'order' && sideOf(args.doc) === side ? hook(args) : args.doc

/** Run an event hook only for one document type — a status means what its document type says it means. */
export const onDocument = (type: DocumentType, hook: CollectionAfterChangeHook): CollectionAfterChangeHook => (args) =>
  typeOf(args.doc) === type ? hook(args) : args.doc

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
  // The purchase side. (On a vendor quote "received" means the quote arrived; on a requisition "approved" means ready for a PO.)
  { label: 'Approved', value: 'approved' },
  { label: 'Partially received', value: 'partial' },
  { label: 'Received', value: 'received' },
  // Vendor quotes.
  { label: 'Quote — requested (RFQ sent)', value: 'requested' },
  { label: 'Quote — under review', value: 'under_review' },
  { label: 'Quote — awarded', value: 'awarded' },
  { label: 'Quote — not awarded', value: 'not_awarded' },
  { label: 'Quote — withdrawn', value: 'withdrawn' },
  // Purchase requisitions.
  { label: 'Requisition — in approval chain', value: 'in_approval' },
  { label: 'Requisition — returned for clarification', value: 'returned' },
  { label: 'Requisition — PO created', value: 'po_created' },
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
  { name: 'documentType', type: 'select', defaultValue: 'order', index: true,
    options: [
      { label: 'Order', value: 'order' },
      { label: 'Vendor quote (RFQ response)', value: 'quote' },
      { label: 'Purchase requisition', value: 'requisition' },
    ],
    admin: { description: 'Which document this is. Its status is read in the terms of this type.' } },
  // Not required: the plugin creates an order at checkout with no number. (`referenceField` is
  // required by default, which would have refused every web order.)
  referenceField({
    name: 'orderNumber',
    required: false,
    description: 'Tenant-unique order number (e.g. SO-2026-001). Stable identifier for downstream documents. Empty on a web checkout.',
  }),
  { name: 'party', type: 'relationship', relationTo: ['parties', 'addresses', 'tenants'], index: true,
    admin: { description: 'The counterparty: the buyer on a sale, the seller (vendor) on a purchase — a trading partner, an address-book entry, or another tenant. (`customer` is the user who checked out.)' } },
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
      { name: 'leadTimeDays', type: 'number', admin: { description: 'Vendor quote: lead time offered for this line.' } },
      { name: 'preferredVendor', type: 'relationship', relationTo: 'parties',
        admin: { description: 'Requisition: the vendor the requester would prefer for this line.' } },
    ],
  },

  // ── The purchase side (formerly the purchase-orders collection). The vendor is `party`. ──
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
  // ── Vendor quote (formerly the vendor-quotes collection). The vendor is `party`; validity is `expiresAt`. ──
  { name: 'requisition', type: 'relationship', relationTo: 'orders', index: true,
    admin: { description: 'Vendor quote: the requisition it answers (one requisition may have many quotes).' } },
  { name: 'rfqIssuedDate', type: 'date' },
  { name: 'quoteReceivedDate', type: 'date' },
  { name: 'shippingAmount', type: 'number' },
  { name: 'discountAmount', type: 'number' },
  { name: 'paymentTerms', type: 'text', admin: { description: 'e.g. "Net 30", "2/10 Net 30", "50% deposit, balance on delivery".' } },
  taxonomySelect('incoterms', INCOTERM_OPTIONS, { description: 'INCOTERMS 2020 code (e.g. EXW / FCA / DAP / DDP) per ICC publication 723E.' }),
  { name: 'isAwarded', type: 'checkbox', defaultValue: false, index: true, admin: { description: 'Vendor quote: set true when this is the winning quote.' } },
  { name: 'awardedDate', type: 'date' },
  { name: 'awardedBy', type: 'relationship', relationTo: 'users' },
  { name: 'awardRationale', type: 'textarea',
    admin: { description: 'OECD BEPS Action 13 + SOX §404 — reason for selection (lowest price / best fit / certified vendor / etc.).' } },
  { name: 'qualityAssessment', type: 'select', options: [
    { label: 'Excellent', value: 'excellent' },
    { label: 'Good', value: 'good' },
    { label: 'Acceptable', value: 'acceptable' },
    { label: 'Marginal', value: 'marginal' },
    { label: 'Unacceptable', value: 'unacceptable' },
  ] },
  { name: 'createdPurchaseOrder', type: 'relationship', relationTo: 'orders',
    admin: { readOnly: true, description: 'The purchase order created from this awarded quote or approved requisition.' } },

  // ── Purchase requisition (formerly the purchase-requisitions collection). Its dates are `orderDate` / `requestedDeliveryDate`. ──
  { name: 'requisitioner', type: 'relationship', relationTo: 'users' },
  { name: 'department', type: 'text' },
  { name: 'costCenter', type: 'relationship', relationTo: 'cost-centers' },
  { name: 'businessJustification', type: 'textarea',
    admin: { description: 'Reason for the spend (drives approver decision + audit-trail evidence).' } },
  { name: 'priority', type: 'select',
    options: [
      { label: 'Critical (urgent / production blocking)', value: 'critical' },
      { label: 'High', value: 'high' },
      { label: 'Normal', value: 'normal' },
      { label: 'Low', value: 'low' },
    ] },
  { name: 'requiresQuotes', type: 'checkbox', defaultValue: false,
    admin: { description: 'When true, must collect ≥ 3 vendor quotes before PO (typical for spend > €10k).' } },
  { name: 'minimumQuotesRequired', type: 'number', defaultValue: 0 },
  { name: 'approvalChain', type: 'array', labels: { singular: 'Approval Step', plural: 'Approval Steps' },
    fields: [
      { name: 'step', type: 'number', required: true },
      { name: 'approver', type: 'relationship', relationTo: 'users', required: true },
      { name: 'role', type: 'text', admin: { description: 'e.g. Department Head, CFO, CEO.' } },
      { name: 'decision', type: 'select', defaultValue: 'pending',
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'approved' },
          { label: 'Rejected', value: 'rejected' },
          { label: 'Returned for Clarification', value: 'returned' },
        ] },
      { name: 'decidedAt', type: 'date' },
      { name: 'comment', type: 'text', localized: true },
    ] },
  { name: 'awardedQuote', type: 'relationship', relationTo: 'orders',
    admin: { description: 'Requisition: the vendor quote that led to the award.' } },
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

  const pluginRead = defaultCollection.access?.read
  return {
    ...defaultCollection,
    // The plugin's own rule OR a party role held on the document: a seller, buyer, consignee … reads
    // the orders it is a party to (the role engine, @/utilities/party/roles). Only read is widened.
    access: { ...defaultCollection.access, ...(pluginRead ? { read: either(pluginRead, partyAccess('orders')) } : {}) },
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
        // The same status word, read per document type: "received" / "awarded" on a vendor quote, "submitted" / "approved" on a requisition.
        onDocument('quote', emitRfqReceived),
        onDocument('quote', emitRfqAwarded),
        onDocument('requisition', emitPrSubmitted),
        onDocument('requisition', emitPrApproved),
        // The checkout customer becomes the buyer party on their order (parties are roles on the document).
        assignBuyerParty,
        auditTrailAfterChange('orders'),
      ],
    },
  }
}
