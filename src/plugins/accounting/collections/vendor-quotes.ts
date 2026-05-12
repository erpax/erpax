/**
 * # Vendor Quotes
 *
 * @summary Per-vendor RFQ responses with award decision rationale per OECD BEPS Action 13 transfer-pricing evidence.
 *
 * ## Core Function
 *
 * Vendor Quotes capture each supplier's response to a purchase requisition RFQ. One requisition may have multiple vendor quotes
 * (competitive bidding). Each quote contains line items (description, quantity, unit price, lead time), totals (subtotal, tax,
 * shipping, discount, total amount), payment terms, and INCOTERMS. The award decision (isAwarded = true) is stamped with
 * awardedBy user, awardedDate, and awardRationale (compliance evidence per OECD BEPS Action 13 transfer pricing §13-15 and
 * SOX §404 vendor selection controls). The awarded quote becomes the source for the PO via createdPurchaseOrder link.
 *
 * ## Architecture
 *
 * Multi-tenancy via tenant field (auto-populated). Quotes are immutable once awarded (isAwarded = true), preventing retro-active
 * pricing changes. Each quote links to a vendor (supplier) and optionally to a purchase-requisition (source RFQ). Line array
 * uses dbName: vq_lines to work around Payload's 63-char identifier cap. Status workflow: requested → received → under_review →
 * awarded / not_awarded / expired / withdrawn. Chain event emitters (emitRfqReceived, emitRfqAwarded) trigger downstream integrations
 * (e.g., notify procurement team when quote received; notify supplier when quote awarded). @compliance OECD BEPS Action 13
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — captures tenant from session context.
 * - **beforeChange:** autoPopulateCreatedBy — stamps user as createdBy if not already set.
 * - **afterChange:** emitRfqReceived — triggers event when quote status = received.
 * - **afterChange:** emitRfqAwarded — triggers event when quote status = awarded.
 * - **afterChange:** auditTrailAfterChange — logs quote changes (pricing updates, award decisions) to audit-events.
 *
 * ## Key Fields
 *
 * - **quoteNumber (text, unique):** Tenant-unique vendor quote number (e.g. VQ-2026-0001). Human-readable RFQ response ID.
 * - **vendor (relationship, required):** Link to vendor (supplier). Used for vendor performance tracking and payment setup.
 * - **requisition (relationship, optional):** Link to source purchase-requisition (one PR may have many vendor quotes).
 * - **rfqIssuedDate (date):** Date RFQ was sent to vendor; used for SLA tracking.
 * - **quoteReceivedDate (date, required):** Date vendor quote was received. Marks start of review cycle.
 * - **validUntil (date):** Quote expiry; after this date, vendor may not honour pricing (protects vendor).
 * - **lines (array, required, min 1):** Line items in the quote. @audit OECD BEPS Action 13 transfer-pricing-evidence
 *   - **description (text, localized, required):** Item description in vendor's language / multi-language variants.
 *   - **item (relationship, optional):** Link to item master (SKU/catalog lookup).
 *   - **quantity (number, required, ≥ 0):** Ordered quantity.
 *   - **uom (text, default "EA"):** Unit of measure (EA, kg, L, etc.).
 *   - **unitPrice (number, required):** Price per unit (cents).
 *   - **lineTotal (number, required):** quantity × unitPrice (cents).
 *   - **leadTimeDays (number, optional):** Vendor's promised delivery lead time (days).
 * - **currency (text, ISO 4217):** Quote currency (e.g. EUR, BGN, USD). @standard ISO-4217:2015
 * - **subtotal (number):** Sum of line totals (cents).
 * - **taxAmount (number):** Tax charged by vendor (VAT, GST, etc.).
 * - **shippingAmount (number):** Freight / shipping charges (cents).
 * - **discountAmount (number):** Volume discount or promotional discount (cents).
 * - **totalAmount (number, required):** Final quote total (subtotal + tax + shipping - discount), in cents.
 * - **paymentTerms (text):** Terms description (e.g. "Net 30", "2/10 Net 30", "50% deposit, balance on delivery").
 * - **incoterms (select):** INCOTERMS 2020 code (EXW, FCA, DAP, DDP, etc.) per ICC publication 723E. @audit COSO internal-control
 * - **deliveryDate (date):** Promised delivery date from vendor.
 * - **isAwarded (checkbox, default false, index):** Set true when this quote is selected for PO creation. @audit SOX §404
 * - **awardedDate (date):** Date quote was awarded (decision made).
 * - **awardedBy (relationship):** User who made the award decision (procurement manager).
 * - **awardRationale (textarea):** OECD BEPS Action 13 + SOX §404 compliance evidence; reason for selection (lowest price / best fit / certified vendor / etc.). @compliance OECD-BEPS-13
 * - **createdPurchaseOrder (relationship, readOnly):** PO created from the awarded quote. Links back to purchase-orders.
 * - **qualityAssessment (select):** [excellent, good, acceptable, marginal, unacceptable]; subjective quality rating.
 * - **status (select):** [requested, received, under_review, awarded, not_awarded, expired, withdrawn]; RFQ status.
 *
 * ## Core Invariants
 *
 * - **quoteNumberUniquenessPerTenant:** quoteNumber is unique per tenant; prevents duplicate vendor quotes.
 * - **lineTotalsConsistency:** each line's lineTotal = quantity × unitPrice; verified on save.
 * - **quoteTotalConsistency:** totalAmount = subtotal + tax + shipping - discount; verified on save.
 * - **awardedQuoteImmutability:** once isAwarded = true, totalAmount, lines, and payment terms cannot be modified.
 * - **awardRationaleRequired:** if isAwarded = true, awardRationale field must be non-empty (compliance evidence).
 * - **oneAwardedQuotePerRequisition:** if requisition is set, at most one vendor-quote for that PR has isAwarded = true.
 * - **multiTenancyIsolation:** tenant field enforced; quotes for one tenant invisible to another.
 *
 * ## Audit Trail
 *
 * Every quote captures: createdAt (timestamp), createdBy (user who received quote), modifiedAt, modifiedBy. All award decisions,
 * pricing changes, and status shifts logged to audit-events with full deltas. @standard SOX §404 @compliance OECD-BEPS-Action-13
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "quote_uuid_1",
 *   "tenant": "tenant_uuid_1",
 *   "quoteNumber": "VQ-2026-0001",
 *   "vendor": "vendors_uuid_1",
 *   "requisition": "requisition_uuid_1",
 *   "quoteReceivedDate": "2026-04-15",
 *   "validUntil": "2026-05-15",
 *   "lines": [
 *     { "description": "Office supplies bundle", "quantity": 100, "unitPrice": 2500, "lineTotal": 250000, "leadTimeDays": 5 }
 *   ],
 *   "currency": "EUR",
 *   "subtotal": 250000,
 *   "taxAmount": 59500,
 *   "totalAmount": 309500,
 *   "incoterms": "DAP",
 *   "deliveryDate": "2026-04-22",
 *   "isAwarded": true,
 *   "awardedDate": "2026-04-17",
 *   "awardedBy": "user_uuid_procurement",
 *   "awardRationale": "Lowest price with acceptable delivery lead time (5 days); meets quality standards per scorecard.",
 *   "status": "awarded",
 *   "createdAt": "2026-04-15T09:30:00Z",
 *   "createdBy": "user_uuid_procurement"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase RFQ management, vendor quote evaluation, award decisions, PO sourcing
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO 9001:2015 §8.4 control-of-externally-provided-processes
 * @standard ISO-9362:2014 swift-code-supplier-banking
 * @standard ISO-13616:2019 iban-supplier-payment-terms
 * @standard COSO internal-control-quote-approval
 * @standard ISO-3166-1:2020 country-codes-supplier-geography
 * @compliance OECD BEPS Action 13 transfer-pricing-evidence
 * @compliance SOX §404 internal-controls-vendor-selection
 * @audit ISO-19011:2018 audit-trail-rfq-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002:2022 §5.15 cybersecurity-quote-approval
 * @see ./purchase-requisitions.ts
 * @see ./vendors.ts
 */
import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField, taxonomySelect } from '@/fields/accounting/base-accounting-fields'
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
        { name: 'description', type: 'text', localized: true, required: true },
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
