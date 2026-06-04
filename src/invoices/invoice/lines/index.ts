import { CollectionConfig } from 'payload'
import { adminOnly, multiTenantRead } from '@/auth'
import { authenticated } from '@/authenticated'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { VAT_CATEGORY_OPTIONS } from '@/un/cefact/5305'
import { invoiceLinesBeforeValidate } from '@/invoices/invoice/lines/hooks/beforeValidate'
import { invoiceLineTotals } from '@/invoices/invoice/lines/hooks/recomputeInvoiceTotals'
import { itemInventory } from '@/invoices/invoice/lines/hooks/recomputeItemInventory'

/**
 * Invoice Lines — line items (BG-25) for an invoice header.
 *
 * The canonical type lives in `@/standards/en-16931` (InvoiceLine).
 * This collection's field set is the Payload projection of that type:
 *
 *   canonical.id (BT-126)            → doc.code
 *   canonical.note (BT-127)          → doc.lineNote
 *   canonical.objectIdentifier (BT-128) → doc.objectIdentifier (under details)
 *   canonical.quantity (BT-129)      → doc.quantity.quantity
 *   canonical.unitCode (BT-130)      → doc.quantity.unit
 *   canonical.netAmount (BT-131)     → doc.taxation.netTotal
 *   canonical.description (BG-31 BT-153) → doc.description
 *   canonical.priceDetails (BG-29):
 *     BT-146 itemNetPrice            → doc.pricing.unitPrice
 *     BT-147 itemPriceDiscount       → doc.discounting.discountTotal
 *   canonical.vat (BG-30):
 *     BT-151 categoryCode            → doc.taxation.vatCategoryCode
 *     BT-152 rate                    → doc.taxation.taxRate
 *     BT-120 exemptionReason         → doc.taxation.vatExemptionReason
 *     BT-121 exemptionReasonCode     → doc.taxation.vatExemptionReasonCode
 *   canonical.allowances (BG-27)     → doc.discounting.discountTotal (single)
 *   canonical.itemId                 → doc.items.sellerItem
 *
 * @standard EN-16931:2017 §BG-25 invoice-line
 * @standard EN-16931:2017 §BG-29 price-details
 * @standard EN-16931:2017 §BG-30 line-vat-information
 * @standard EN-16931:2017 §BG-27 invoice-line-allowances
 * @standard EN-16931:2017 §BG-28 invoice-line-charges
 * @standard EN-16931:2017 BT-126 invoice-line-identifier
 * @standard EN-16931:2017 BT-131 invoice-line-net-amount
 * @standard EN-16931:2017 BT-151 vat-category-code
 * @standard Peppol-BIS-3.0 billing line-detail
 * @standard UN-EDIFACT INVOIC §LIN line-segment
 * @standard ISO-4217:2015 currency-codes
 * @standard UN-CEFACT-5305 tax-category-codes
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @see src/standards/en-16931/types.ts InvoiceLine
 * @see docs/STANDARDS.md §3
 */
export const InvoiceLines: CollectionConfig = {
  slug: 'invoice-lines',
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'invoice', 'description', 'quantity.quantity', 'pricing.unitPrice', 'totals.totalAmount'],
    group: 'Billing',
  },
  // Slice MMM (DRY): inline predicates replaced with canonical helpers.
  // Read uses `multiTenantRead` for tenant scoping (lines inherit the
  // parent invoice's tenant; explicit filter prevents cross-tenant leak).
  access: {
    read: multiTenantRead,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [autoPopulateTenant, ...invoiceLinesBeforeValidate],
    afterChange: [
      auditTrailAfterChange('invoiceLines'),
      invoiceLineTotals.afterChange,
      itemInventory.afterChange,
    ],
    afterDelete: [invoiceLineTotals.afterDelete, itemInventory.afterDelete],
  },
  timestamps: true,
  fields: [
    {
      name: 'invoice',
      type: 'relationship',
      relationTo: 'invoices',
      required: true,
      index: true,
      admin: { description: 'Parent invoice' },
    },
    {
      name: 'code',
      type: 'text',
      index: true,
      admin: { description: 'Line item code' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Item description (BG-31 BT-153 item name).' },
    },
    {
      name: 'lineNote',
      type: 'textarea',
      admin: {
        description:
          'BT-127 — Free-text note attached to the invoice line. Maps to canonical InvoiceLine.note.',
      },
    },
    {
      name: 'objectIdentifier',
      type: 'text',
      admin: {
        description:
          'BT-128 — Cross-reference to the buyer\'s or seller\'s document (e.g. PO line, GTIN, SKU). Maps to canonical InvoiceLine.objectIdentifier.',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Returned', value: 'returned' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: { description: 'Line status' },
    },
    {
      type: 'group',
      name: 'items',
      label: 'Items',
      fields: [
        {
          name: 'buyerItem',
          type: 'relationship',
          relationTo: 'items',
          admin: { description: 'Buyer item reference' },
        },
        {
          name: 'sellerItem',
          type: 'relationship',
          relationTo: 'items',
          admin: { description: 'Seller item reference' },
        },
        {
          name: 'source',
          type: 'relationship',
          relationTo: 'items',
          admin: { description: 'Source item/inventory' },
        },
        {
          name: 'destination',
          type: 'relationship',
          relationTo: 'addresses',
          admin: { description: 'Destination' },
        },
      ],
    },
    {
      type: 'group',
      name: 'quantity',
      label: 'Quantity & Unit',
      fields: [
        {
          name: 'quantity',
          type: 'number',
          required: true,
          defaultValue: 1,
          min: 0,
          admin: { description: 'Quantity', step: 0.001 },
        },
        {
          name: 'unit',
          type: 'text',
          admin: { description: 'Unit of measure (kg, pcs, etc.)' },
        },
        {
          name: 'grams',
          type: 'number',
          min: 0,
          admin: { description: 'Weight in grams' },
        },
      ],
    },
    {
      type: 'group',
      name: 'pricing',
      label: 'Pricing',
      fields: [
        {
          name: 'unitPrice',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: { description: 'Price per unit', step: 0.00001 },
        },
        {
          name: 'itemTotal',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: { description: 'Items subtotal (cents)', step: 0.01 },
        },
        {
          name: 'exchangeRate',
          type: 'number',
          admin: { description: 'Exchange rate', step: 0.00001 },
        },
      ],
    },
    {
      type: 'group',
      name: 'discounting',
      label: 'Discounting',
      fields: [
        {
          name: 'discountRate',
          type: 'number',
          min: 0,
          max: 100,
          admin: { description: 'Discount %', step: 0.01 },
        },
        {
          name: 'discountTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Total discount (cents)', step: 0.01 },
        },
      ],
    },
    {
      type: 'group',
      name: 'taxation',
      label: 'Taxation (BG-30 line VAT info)',
      fields: [
        {
          name: 'taxable',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Apply tax to this line' },
        },
        {
          // Slice RRR: promoted from optional → required per EN-16931
          // BT-151 mandatory cardinality. Was de-facto-required for
          // every Peppol BIS export but the schema was permissive.
          // Default 'S' (standard rate) keeps backward-compat for existing
          // rows during migration; tenants doing zero-rated / exempt /
          // reverse-charge sales must explicitly set the right code.
          //
          // @standard EN-16931:2017 §BT-151 invoiced-item-vat-category-code
          // @standard UN/CEFACT 5305 duty-tax-fee-category-coded
          name: 'vatCategoryCode',
          type: 'select',
          required: true,
          defaultValue: 'S',
          // Canonical 9-code list lives in `src/standards/un-cefact-5305/`.
          // Spread here preserves the EN-16931 BT-151 leading comment.
          options: [...VAT_CATEGORY_OPTIONS],
          admin: {
            description:
              'BT-151 — VAT category code (UN/CEFACT 5305 EU subset). Required for EN-16931 / Peppol BIS export.',
          },
        },
        {
          name: 'taxRate',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description:
              'BT-152 — VAT rate (percent, e.g. 20 for 20%). Maps to canonical LineVatInformation.rate.',
            step: 0.01,
          },
        },
        {
          name: 'vatExemptionReasonCode',
          type: 'text',
          admin: {
            description:
              'BT-121 — VAT exemption reason code (when categoryCode is E / AE / K / G / O). Required for EN-16931 export when applicable.',
          },
        },
        {
          name: 'vatExemptionReason',
          type: 'text',
          admin: {
            description:
              'BT-120 — VAT exemption reason free text.',
          },
        },
        {
          name: 'priceIncludesTax',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Unit price includes tax' },
        },
        {
          name: 'netTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: {
            description:
              'BT-131 — Invoice line net amount (cents). Canonical key.',
            step: 0.01,
          },
        },
        {
          name: 'taxTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Total tax for this line (cents)', step: 0.01 },
        },
      ],
    },
    {
      type: 'group',
      name: 'totals',
      label: 'Totals',
      fields: [
        {
          name: 'totalAmount',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: { description: 'Total (cents)', step: 0.01 },
        },
        {
          name: 'totalPaid',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Amount paid (cents)', step: 0.01 },
        },
        {
          name: 'totalDue',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Amount due (cents)', step: 0.01 },
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
        {
          name: 'taxDebitAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          admin: { description: 'Tax debit account' },
        },
        {
          name: 'taxCreditAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          admin: { description: 'Tax credit account' },
        },
      ],
    },
    {
      type: 'group',
      name: 'dates',
      label: 'Dates',
      fields: [
        {
          name: 'contractStart',
          type: 'date',
          admin: { description: 'Contract start date' },
        },
        {
          name: 'contractEnd',
          type: 'date',
          admin: { description: 'Contract end date' },
        },
        {
          name: 'periodStart',
          type: 'date',
          admin: { description: 'Billing period start' },
        },
        {
          name: 'periodEnd',
          type: 'date',
          admin: { description: 'Billing period end' },
        },
        {
          name: 'deliveredAt',
          type: 'date',
          admin: { description: 'Delivery date' },
        },
        {
          name: 'returnedAt',
          type: 'date',
          admin: { description: 'Return date' },
        },
      ],
    },
    {
      type: 'group',
      name: 'details',
      label: 'Additional Details',
      fields: [
        {
          name: 'currencyCode',
          type: 'text',
          admin: { description: 'Currency' },
        },
        {
          name: 'sku',
          type: 'text',
          admin: { description: 'SKU' },
        },
        {
          name: 'hsCode',
          type: 'text',
          admin: { description: 'HS Code' },
        },
        {
          name: 'serialNumber',
          type: 'text',
          admin: { description: 'Serial number' },
        },
        {
          name: 'lot',
          type: 'text',
          admin: { description: 'Lot number' },
        },
        {
          name: 'variant',
          type: 'text',
          admin: { description: 'Variant' },
        },
        {
          name: 'variation',
          type: 'text',
          admin: { description: 'Variation' },
        },
        {
          name: 'option',
          type: 'text',
          admin: { description: 'Option' },
        },
        {
          name: 'period',
          type: 'text',
          admin: { description: 'Period (e.g., monthly)' },
        },
        {
          name: 'giftCard',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Is gift card' },
        },
      ],
    },
    {
      name: 'metadata',
      type: 'json',
      admin: { description: 'Additional metadata' },
    },
  ],
}
