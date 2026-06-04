import { CollectionConfig } from 'payload'
// Slice PPP: arAgingHook + cogsHook removed — they delegated to services
// that don't exist in `src/services/` (silent no-ops). Aging is now a
// service-generated DTO via `financialReportingService`; COGS will fold
// into `gl-posting.service.ts`'s invoice handler when built.
import { invoiceAccountingHook } from '@/invoices/hooks'
import { validateNotLocked } from '@/utility/period-lock'
import { adminOnly, multiTenantRead } from '@/auth'
import { authenticated } from '@/authenticated'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { VAT_CATEGORY_OPTIONS } from '@/un/cefact/5305'
import { unpField, fiscalDeviceNumberField, operatorCodeField, fiscalQrField, saleStatusOptions } from '@/fields'
import { isIso4217 } from '@/iso/4217/validate'

/**
 * Invoices — header for AR/AP billing with GL posting + period locking.
 *
 * Slice YYYY (2026-05-10): `status` promoted from `typeStatus.status` to
 * a top-level convenience field — every consumer (chain seeds, hooks,
 * GL handlers, dunning) needs a flat `status` lookup, and the prior
 * grouped-only form was the silent-bug source surfaced by the
 * seed-vs-schema invariant. `typeStatus.invoiceType + .invoiceTypeCode +
 * .confirmed` remain inside the canonical group.
 *
 * The canonical types live in `@/standards/en-16931`:
 *   InvoiceHeader (BG-1 subset)  — invoice envelope
 *   DocumentTotals (BG-22)       — BT-106..BT-115 totals chain
 *   VatBreakdown   (BG-23)       — per-category × rate VAT detail
 *
 * Field projection:
 *   canonical.InvoiceHeader.invoiceNumber (BT-1) → doc.number
 *   canonical.InvoiceHeader.issueDate     (BT-2) → doc.dates.issuedAt
 *   canonical.InvoiceHeader.typeCode      (BT-3) → doc.invoiceTypeCode
 *   canonical.InvoiceHeader.currencyCode  (BT-5) → doc.currencyCode
 *   canonical.InvoiceHeader.dueDate       (BT-9) → doc.dates.dueAt
 *   canonical.DocumentTotals.lineNetTotal       (BT-106) → doc.amounts.itemTotal
 *   canonical.DocumentTotals.allowancesTotal    (BT-107) → doc.amounts.allowancesTotal
 *   canonical.DocumentTotals.chargesTotal       (BT-108) → doc.amounts.chargesTotal
 *   canonical.DocumentTotals.taxExclusiveTotal  (BT-109) → doc.amounts.netTotal
 *   canonical.DocumentTotals.vatTotal           (BT-110) → doc.amounts.taxTotal
 *   canonical.DocumentTotals.taxInclusiveTotal  (BT-112) → doc.amounts.totalAmount
 *   canonical.DocumentTotals.prepaidAmount      (BT-113) → doc.amounts.prepaidAmount
 *   canonical.DocumentTotals.roundingAmount     (BT-114) → doc.amounts.roundingAmount
 *   canonical.DocumentTotals.amountDue          (BT-115) → doc.amounts.totalDue
 *   canonical.VatBreakdown[]                    (BG-23)  → doc.vatBreakdown[]
 *
 * @standard EN-16931:2017 semantic-data-model-electronic-invoice
 * @standard EN-16931:2017 §BG-22 document-totals
 * @standard EN-16931:2017 §BG-23 vat-breakdown
 * @standard EN-16931:2017 BT-3 invoice-type-code
 * @standard EN-16931:2017 BT-5 invoice-currency-code
 * @standard Peppol-BIS-3.0 billing electronic-invoicing
 * @standard UN-EDIFACT INVOIC d96a
 * @standard UN-CEFACT 1001 document-name-code
 * @standard UN-CEFACT 5305 duty-tax-fee-category-code
 * @standard UBL-2.1 universal-business-language
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time invoice-date due-date
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @compliance SOX §404 internal-controls
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/en-16931/types.ts
 * @see docs/STANDARDS.md §3
 */
export const Invoices: CollectionConfig = {
  slug: 'invoices',
  admin: {
    useAsTitle: 'number',
    defaultColumns: ['number', 'typeStatus.invoiceType', 'parties.seller', 'parties.buyer', 'dates.date', 'status', 'amounts.totalAmount'],
    group: 'Billing',
  },
  // Slice MMM (DRY): inline predicates replaced with canonical helpers.
  // The prior `req.user.address` seller/buyer filter referenced a
  // non-existent field on the User schema (User has
  // `addresses: { docs: [...] }`, not singular `address`). Switched
  // to tenant-scoped read via shared `multiTenantRead`.
  access: {
    read: multiTenantRead,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [validateNotLocked],
    // AAAAA-cont (2026-05-11): wired the canonical audit-trail emission
    // alongside the GL-posting hook. The auditTrailAfterChange call
    // makes every invoice mutation queryable from the auditor's console
    // (ISO 19011 §6.4.6 evidence) — was missing despite the JSDoc
    // banner declaring `@audit ISO-19011:2018 audit-trail`.
    afterChange: [invoiceAccountingHook, auditTrailAfterChange('invoices')],
  },
  timestamps: true,
  fields: [
    {
      type: 'group',
      name: 'typeStatus',
      label: 'Type & Status',
      fields: [
        {
          name: 'invoiceType',
          type: 'select',
          required: true,
          index: true,
          options: [
            { label: 'Cart', value: 'cart' },
            { label: 'Request', value: 'request' },
            { label: 'Quotation', value: 'quotation' },
            { label: 'Purchase Order', value: 'purchase_order' },
            { label: 'Proforma Invoice', value: 'proforma_invoice' },
            { label: 'Invoice', value: 'invoice' },
            { label: 'Bill', value: 'bill' },
            { label: 'Credit Note', value: 'credit_note' },
            { label: 'Debit Note', value: 'debit_note' },
            { label: 'Protocol', value: 'protocol' },
            { label: 'Subscription', value: 'subscription' },
            { label: 'Lease', value: 'lease' },
            { label: 'Transfer', value: 'transfer' },
          ],
          admin: {
            description:
              'Internal document type. For EN-16931 export, see invoiceTypeCode (BT-3) — the canonical UN/CEFACT 1001 code (commercial invoice = 380, credit note = 381, etc.).',
          },
        },
        {
          name: 'invoiceTypeCode',
          type: 'select',
          options: [
            { label: '326 — Partial invoice', value: '326' },
            { label: '380 — Commercial invoice', value: '380' },
            { label: '381 — Credit note', value: '381' },
            { label: '384 — Corrected invoice', value: '384' },
            { label: '386 — Prepayment invoice', value: '386' },
            { label: '388 — Tax invoice', value: '388' },
            { label: '389 — Self-billed invoice', value: '389' },
            { label: '393 — Factored invoice', value: '393' },
            { label: '395 — Consignment invoice', value: '395' },
            { label: '751 — Information for accounting', value: '751' },
          ],
          admin: {
            description:
              'BT-3 — UN/CEFACT 1001 document name code. Required for EN-16931 / Peppol BIS export. Maps to canonical InvoiceHeader.typeCode.',
          },
        },
        {
          name: 'confirmed',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Confirmed by parties' },
        },
      ],
    },
    // Slice YYYY: `status` promoted to top-level. Every consumer (chain
    // seeds, hooks, GL handlers, dunning, peppol-export) reads
    // `invoice.status` directly — keeping it inside the `typeStatus`
    // group meant `invoice.status === undefined` everywhere.
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Issued', value: 'issued' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Open', value: 'open' },
        { label: 'Active', value: 'active' },
        { label: 'Past Due', value: 'past_due' },
        { label: 'Grace Period', value: 'grace_period' },
        { label: 'Paid', value: 'paid' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Complete', value: 'complete' },
      ],
      admin: { description: 'Current status (top-level for consumer access).' },
    },
    {
      name: 'number',
      type: 'text',
      unique: true,
      index: true,
      admin: { description: 'Document number' },
    },
    {
      name: 'protocolNumber',
      type: 'text',
      unique: true,
      admin: { description: 'Protocol number' },
    },
    {
      name: 'purchaseOrder',
      type: 'text',
      admin: { description: 'PO reference' },
    },
    {
      name: 'salesOrder',
      type: 'text',
      admin: { description: 'SO reference' },
    },
    {
      type: 'group',
      name: 'parties',
      label: 'Parties',
      fields: [
        {
          name: 'seller',
          type: 'relationship',
          relationTo: 'addresses',
          required: true,
          index: true,
          admin: { description: 'Selling party' },
        },
        {
          name: 'sellerAgent',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Seller agent' },
        },
        {
          name: 'buyer',
          type: 'relationship',
          relationTo: 'addresses',
          required: true,
          index: true,
          admin: { description: 'Buying party' },
        },
        {
          name: 'buyerAgent',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Buyer agent' },
        },
        {
          name: 'supplier',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Supplier' },
        },
        {
          name: 'consignee',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Delivery recipient' },
        },
      ],
    },
    {
      type: 'group',
      name: 'dates',
      label: 'Dates',
      fields: [
        {
          name: 'date',
          type: 'date',
          index: true,
          admin: { description: 'Document date' },
        },
        {
          name: 'issuedAt',
          type: 'date',
          admin: { description: 'Issue date' },
        },
        {
          name: 'orderDate',
          type: 'date',
          admin: { description: 'Order date' },
        },
        {
          name: 'proformaDate',
          type: 'date',
          admin: { description: 'Proforma date' },
        },
        {
          name: 'protocolDate',
          type: 'date',
          admin: { description: 'Protocol date' },
        },
        {
          name: 'paymentDate',
          type: 'date',
          admin: { description: 'Payment date' },
        },
        {
          name: 'paidAt',
          type: 'date',
          admin: { description: 'Full payment date' },
        },
        {
          name: 'deliveredAt',
          type: 'date',
          admin: { description: 'Delivery date' },
        },
        {
          name: 'cancelledAt',
          type: 'date',
          admin: { description: 'Cancellation date' },
        },
        {
          name: 'dueAt',
          type: 'date',
          index: true,
          admin: { description: 'Due-by date used by the dunning cycle' },
        },
        {
          name: 'pastDueSinceAt',
          type: 'date',
          index: true,
          admin: { description: 'Set when the dunning cycle first marks the invoice past-due' },
        },
        {
          name: 'gracePeriodEndsAt',
          type: 'date',
          admin: { description: 'Computed: pastDueSinceAt + grace window' },
        },
        {
          name: 'suspensionScheduledFor',
          type: 'date',
          admin: { description: 'Computed: when the related subscription is scheduled for suspension' },
        },
      ],
    },
    {
      type: 'group',
      name: 'amounts',
      label: 'Amounts — BG-22 totals chain (cents)',
      fields: [
        {
          name: 'itemTotal',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-106 — Sum of invoice line net amounts. Maps to canonical DocumentTotals.lineNetTotal.',
            step: 0.01,
          },
        },
        {
          name: 'discountTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'Total discounts applied. Includes line-level + document-level allowances; for the canonical breakdown see allowancesTotal (BT-107) below.',
            step: 0.01,
          },
        },
        {
          name: 'allowancesTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-107 — Sum of document-level allowances (BG-20). Maps to canonical DocumentTotals.allowancesTotal.',
            step: 0.01,
          },
        },
        {
          name: 'chargesTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-108 — Sum of document-level charges (BG-21). Maps to canonical DocumentTotals.chargesTotal.',
            step: 0.01,
          },
        },
        {
          name: 'netTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-109 — Invoice total amount without VAT (= itemTotal − allowancesTotal + chargesTotal). Maps to canonical DocumentTotals.taxExclusiveTotal.',
            step: 0.01,
          },
        },
        {
          name: 'taxTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-110 — Invoice total VAT amount (sum of BG-23 BT-117). Maps to canonical DocumentTotals.vatTotal.',
            step: 0.01,
          },
        },
        {
          name: 'totalAmount',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-112 — Invoice total amount with VAT. Maps to canonical DocumentTotals.taxInclusiveTotal.',
            step: 0.01,
          },
        },
        {
          name: 'prepaidAmount',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-113 — Paid amount (prepayment). Maps to canonical DocumentTotals.prepaidAmount.',
            step: 0.01,
          },
        },
        {
          name: 'roundingAmount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description:
              'BT-114 — Rounding amount (small-amount rounding to legal-tender minimum). Can be negative. Maps to canonical DocumentTotals.roundingAmount.',
            step: 0.01,
          },
        },
        {
          name: 'totalPaid',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Amount paid (running ledger of receipts).', step: 0.01 },
        },
        {
          name: 'totalDue',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-115 — Amount due for payment (= taxInclusiveTotal − prepaidAmount + roundingAmount). Maps to canonical DocumentTotals.amountDue.',
            step: 0.01,
          },
        },
      ],
    },
    {
      name: 'vatBreakdown',
      type: 'array',
      label: 'VAT breakdown (BG-23)',
      labels: { singular: 'VAT category', plural: 'VAT categories' },
      admin: {
        description:
          'EN 16931 §BG-23 — one row per VAT category × rate. Required for EN-16931 / Peppol BIS export. Maps to canonical VatBreakdown[].',
      },
      fields: [
        {
          // Canonical 9-code list lives in `src/standards/un-cefact-5305/`.
          name: 'categoryCode',
          type: 'select',
          required: true,
          options: [...VAT_CATEGORY_OPTIONS],
          admin: { description: 'BT-118 — VAT category code (UN/CEFACT 5305).' },
        },
        {
          name: 'rate',
          type: 'number',
          min: 0,
          max: 100,
          admin: { description: 'BT-119 — VAT category rate (percent).' },
        },
        {
          name: 'taxableAmount',
          type: 'number',
          required: true,
          min: 0,
          admin: { description: 'BT-116 — VAT category taxable amount (cents).' },
        },
        {
          name: 'taxAmount',
          type: 'number',
          required: true,
          min: 0,
          admin: { description: 'BT-117 — VAT category tax amount (cents).' },
        },
        {
          name: 'exemptionReasonCode',
          type: 'text',
          admin: {
            description:
              'BT-121 — Exemption reason code (required when categoryCode is E / AE / K / G / O).',
          },
        },
        {
          name: 'exemptionReason',
          type: 'text',
          admin: { description: 'BT-120 — Exemption reason free text.' },
        },
      ],
    },
    {
      type: 'group',
      name: 'billingTax',
      label: 'Billing & Tax',
      fields: [
        {
          name: 'currencyCode',
          type: 'text',
          required: true,
          defaultValue: 'EUR',
          validate: (v: unknown) => (typeof v === 'string' ? isIso4217(v) || 'Invalid ISO-4217 currency code' : true),
          admin: { description: 'ISO 4217 currency' },
        },
        {
          name: 'exchangeRate',
          type: 'number',
          admin: { description: 'Exchange rate', step: 0.00001 },
        },
        {
          name: 'taxType',
          type: 'select',
          options: [
            { label: 'VAT', value: 'vat' },
            { label: 'GST', value: 'gst' },
          ],
          admin: { description: 'Tax regime' },
        },
        {
          name: 'taxesIncluded',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Price includes tax' },
        },
        {
          name: 'taxNote',
          type: 'textarea',
          admin: { description: 'Tax notes' },
        },
      ],
    },
    {
      type: 'group',
      name: 'recurring',
      label: 'Recurring',
      fields: [
        {
          name: 'billingPeriod',
          type: 'select',
          options: [
            { label: 'Second', value: 'second' },
            { label: 'Minute', value: 'minute' },
            { label: 'Hour', value: 'hour' },
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
          ],
          admin: { description: 'Billing frequency' },
        },
        {
          name: 'nextBillingDate',
          type: 'date',
          index: true,
          admin: { description: 'Next billing date' },
        },
        {
          name: 'periodStart',
          type: 'date',
          admin: { description: 'Period start' },
        },
        {
          name: 'periodEnd',
          type: 'date',
          admin: { description: 'Period end' },
        },
        {
          name: 'subscription',
          type: 'relationship',
          relationTo: 'subscriptions',
          index: true,
          admin: { description: 'Owning subscription (used by dunning cycle)' },
        },
        {
          name: 'stripeInvoiceId',
          type: 'text',
          index: true,
          admin: { description: 'Stripe invoice id — links this invoice to the Stripe billing multiverse.' },
        },
        {
          name: 'stripePaymentIntentId',
          type: 'text',
          admin: { description: 'Stripe PaymentIntent id for the paying charge.' },
        },
        {
          name: 'attemptCount',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Dunning: count of failed payment attempts.' },
        },
        {
          name: 'lastAttemptAt',
          type: 'date',
          admin: { description: 'Dunning: timestamp of the last payment attempt.' },
        },
        {
          name: 'lastAttemptError',
          type: 'text',
          admin: { description: 'Dunning: last payment-attempt error message.' },
        },
      ],
    },
    {
      type: 'group',
      name: 'ledger',
      label: 'Ledger',
      fields: [
        {
          name: 'debitAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          admin: { description: 'Debit account' },
        },
        {
          name: 'creditAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          admin: { description: 'Credit account' },
        },
      ],
    },
    {
      type: 'group',
      name: 'notes',
      label: 'Notes',
      fields: [
        {
          name: 'note',
          type: 'textarea',
          admin: { description: 'General notes' },
        },
        {
          name: 'invoiceNote',
          type: 'textarea',
          admin: { description: 'Invoice notes' },
        },
        {
          name: 'deliveryNote',
          type: 'textarea',
          admin: { description: 'Delivery notes' },
        },
        {
          name: 'deliveryTerms',
          type: 'text',
          admin: { description: 'Delivery terms' },
        },
        {
          name: 'paymentTerms',
          type: 'text',
          admin: { description: 'Payment terms' },
        },
        {
          name: 'paymentMethods',
          type: 'json',
          admin: { description: 'Accepted payment methods' },
        },
      ],
    },
    {
      type: 'group',
      name: 'relationships',
      label: 'Relationships',
      fields: [
        {
          name: 'parent',
          type: 'relationship',
          relationTo: 'invoices',
          admin: { description: 'Parent invoice' },
        },
        {
          name: 'order',
          type: 'relationship',
          relationTo: 'invoices',
          admin: { description: 'Related order' },
        },
        {
          name: 'domain',
          type: 'relationship',
          relationTo: 'tenants',
          admin: { description: 'Domain context' },
        },
      ],
    },
    {
      // Наредба Н-18 / СУПТО fiscalization — the invoice IS the sale document
      // (the source `daily_sales_view` is a read-only projection over invoices).
      // Assigned when the invoice is paid in scope (cash/card — чл. 3 ал. 1) by
      // the single money-in trigger; absent on unfiscalized / exempt invoices.
      // Exact regulatory terms: УНП, ФУ, оператор, касов бон, сторно.
      name: 'fiscal',
      type: 'group',
      label: 'Fiscal (Наредба Н-18 / СУПТО)',
      admin: { description: 'СУПТО фискализация — касов бон / УНП, издаден при плащане в обхват.' },
      fields: [
        unpField(), // УНП — уникален номер на продажба
        { name: 'unpSequence', type: 'number', admin: { readOnly: true, hidden: true } },
        { name: 'fiscalDevice', type: 'relationship', relationTo: 'fiscal-devices', admin: { description: 'Фискално устройство (ФУ).' } },
        fiscalDeviceNumberField(false), // 8-digit ФУ number — first УНП segment
        operatorCodeField(), // 4-digit оператор code — second УНП segment
        { name: 'terminal', type: 'relationship', relationTo: 'terminals', admin: { description: 'Виртуален ПОС терминал (алтернативен режим).' } },
        { name: 'receiptNumber', type: 'text', admin: { description: 'Касов бон номер.' } },
        { name: 'receipt', type: 'relationship', relationTo: 'receipts', admin: { description: 'Издаден касов бон.' } },
        fiscalQrField(), // НАП fiscal-QR payload
        {
          name: 'status',
          type: 'select',
          defaultValue: 'open',
          options: [...saleStatusOptions],
          admin: { description: 'Фискален статус (open → closed → reversed). Closed сторно само (Наредба Н-18).' },
        },
        { name: 'reversalOf', type: 'relationship', relationTo: 'invoices', admin: { description: 'Сторно на (оригинална фактура).' } },
        { name: 'reversedBy', type: 'relationship', relationTo: 'invoices', admin: { description: 'Сторнирана с (кредитно известие).' } },
      ],
    },
    {
      name: 'test',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Test invoice' },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: { description: 'Additional metadata' },
    },
  ],
}
