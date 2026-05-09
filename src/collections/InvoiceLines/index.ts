import { CollectionConfig } from 'payload'
import { adminOnly, multiTenantRead } from '@/plugins/auth'
import { authenticated } from '@/access/authenticated'
import { invoiceLinesBeforeValidate } from './hooks/beforeValidate'

/**
 * Invoice Lines — line items (BG-25) for an invoice header.
 *
 * @standard EN-16931:2017 §BG-25 invoice-line
 * @standard Peppol-BIS-3.0 billing line-detail
 * @standard UN-EDIFACT INVOIC §LIN line-segment
 * @standard ISO-4217:2015 currency-codes
 * @standard UN-CEFACT-5305 tax-category-codes
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @see docs/STANDARDS.md §3
 */
export const InvoiceLines: CollectionConfig = {
  slug: 'invoiceLines',
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'invoice', 'description', 'quantity', 'unitPrice', 'totalAmount'],
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
    beforeValidate: invoiceLinesBeforeValidate,
  },
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
      admin: { description: 'Item description' },
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
      label: 'Taxation',
      fields: [
        {
          name: 'taxable',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Apply tax to this line' },
        },
        {
          name: 'taxRate',
          type: 'number',
          min: 0,
          max: 100,
          admin: { description: 'Tax rate %', step: 0.01 },
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
          admin: { description: 'Net total before tax (cents)', step: 0.01 },
        },
        {
          name: 'taxTotal',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Total tax (cents)', step: 0.01 },
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
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      index: true,
      hidden: true,
    },
  ],
}
