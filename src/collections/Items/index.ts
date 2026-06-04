import { CollectionConfig } from 'payload'
import { adminOnly, multiTenantRead } from '@/access/auth'
import { authenticated } from '@/access/authenticated'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { itemsBeforeValidate } from './hooks/beforeValidate'
import { itemsAfterChange } from './hooks/afterChange'

/**
 * Items — sellable / purchasable inventory rows with GL posting.
 *
 * @standard UN-CEFACT UNSPSC product-classification
 * @standard GS1 GTIN global-trade-item-number
 * @standard ISO-4217:2015 currency-codes price-currency
 * @standard EN-16931:2017 §BG-31 item-information
 * @accounting IFRS IAS-2 inventories
 * @accounting US-GAAP ASC-330 inventory
 * @see docs/STANDARDS.md §3
 */
export const Items: CollectionConfig = {
  slug: 'items',
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'address', 'pricing.price', 'taxation.taxRate', 'inventory.inventoryQuantity'],
    group: 'Inventory',
  },
  // Slice MMM (DRY): inline predicates replaced with canonical helpers.
  // multiTenantRead → tenant-scoped read; authenticated → bare auth gate;
  // adminOnly → admin-only delete.
  access: {
    read: multiTenantRead,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  hooks: {
    // AAAAA-cont (2026-05-11): canonical hook chain — autoPopulateTenant
    // first (so all subsequent hooks see ctx.tenant), then domain
    // beforeValidate, then auditTrailAfterChange composed with the
    // domain afterChange.
    beforeValidate: [autoPopulateTenant, ...itemsBeforeValidate],
    afterChange: [...itemsAfterChange, auditTrailAfterChange('items')],
  },
  timestamps: true,
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Item code' },
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
      index: true,
      admin: { description: 'SKU' },
    },
    {
      name: 'barcode',
      type: 'text',
      unique: true,
      index: true,
      admin: { description: 'Barcode' },
    },
    {
      name: 'address',
      type: 'relationship',
      relationTo: 'addresses',
      required: true,
      index: true,
      admin: { description: 'Owner/seller' },
    },
    {
      type: 'group',
      name: 'pricing',
      label: 'Pricing',
      fields: [
        {
          name: 'price',
          type: 'number',
          defaultValue: 0,
          min: 0,
          admin: { description: 'Selling price', step: 0.00001 },
        },
        {
          name: 'cost',
          type: 'number',
          min: 0,
          admin: { description: 'Cost price', step: 0.00001 },
        },
        {
          name: 'compareAtPrice',
          type: 'number',
          min: 0,
          admin: { description: 'Compare at price', step: 0.00001 },
        },
        {
          name: 'vendorPrice',
          type: 'number',
          min: 0,
          admin: { description: 'Vendor price', step: 0.00001 },
        },
        {
          name: 'minPrice',
          type: 'number',
          min: 0,
          admin: { description: 'Minimum price', step: 0.00001 },
        },
        {
          name: 'currencyCode',
          type: 'text',
          required: true,
          defaultValue: 'EUR',
          admin: { description: 'Currency' },
        },
        {
          name: 'priceIncludesTax',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Price includes tax' },
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
          admin: { description: 'Is taxable' },
        },
        {
          name: 'taxRate',
          type: 'number',
          min: 0,
          max: 100,
          admin: { description: 'Tax rate %', step: 0.01 },
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
      name: 'inventory',
      label: 'Inventory',
      fields: [
        {
          name: 'inventoryQuantity',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: { description: 'Current inventory', step: 0.001 },
        },
        {
          name: 'inventoryManagement',
          type: 'select',
          options: [
            { label: 'Shopify', value: 'shopify' },
            { label: 'Manual', value: 'manual' },
            { label: 'None', value: 'none' },
          ],
          admin: { description: 'Inventory management' },
        },
        {
          name: 'inventoryPolicy',
          type: 'select',
          options: [
            { label: 'Deny', value: 'deny' },
            { label: 'Continue', value: 'continue' },
          ],
          admin: { description: 'Out of stock policy' },
        },
      ],
    },
    {
      type: 'group',
      name: 'physical',
      label: 'Physical Attributes',
      fields: [
        {
          name: 'weight',
          type: 'number',
          min: 0,
          admin: { description: 'Weight', step: 0.001 },
        },
        {
          name: 'weightUnit',
          type: 'text',
          admin: { description: 'Weight unit (kg, lbs)' },
        },
        {
          name: 'grams',
          type: 'number',
          min: 0,
          admin: { description: 'Weight in grams' },
        },
        {
          name: 'hsCode',
          type: 'text',
          admin: { description: 'HS Code' },
        },
        {
          name: 'requiresShipping',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Requires shipping' },
        },
      ],
    },
    {
      type: 'group',
      name: 'discounts',
      label: 'Discounts & Limits',
      fields: [
        {
          name: 'maxDiscountRate',
          type: 'number',
          min: 0,
          max: 100,
          admin: { description: 'Max discount %', step: 0.01 },
        },
        {
          name: 'minProfitRate',
          type: 'number',
          min: 0,
          admin: { description: 'Min profit %', step: 0.01 },
        },
        {
          name: 'maxProfitRate',
          type: 'number',
          min: 0,
          admin: { description: 'Max profit %', step: 0.01 },
        },
      ],
    },
    {
      type: 'group',
      name: 'fulfillment',
      label: 'Fulfillment',
      fields: [
        {
          name: 'fulfillmentService',
          type: 'text',
          admin: { description: 'Fulfillment service' },
        },
        {
          name: 'period',
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
          admin: { description: 'Billing period (if recurring)' },
        },
      ],
    },
    {
      type: 'group',
      name: 'visibility',
      label: 'Visibility',
      fields: [
        {
          name: 'visibility',
          type: 'select',
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
            { label: 'Wholesale', value: 'wholesale' },
          ],
          admin: { description: 'Item visibility' },
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
