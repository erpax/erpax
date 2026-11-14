/**
 * Catalogue — ONE thing sold: the e-commerce plugin's `products` and `variants`, carrying the
 * item master.
 *
 * There were two unconnected catalogues: the plugin's `products` / `variants` (the storefront —
 * title, gallery, options, the checkout price and stock) and a custom `items` collection (the ERP
 * item master — code, SKU, barcode, cost and tax, GL accounts, weight and HS code), which 17
 * collections referenced. The item master is folded into the plugin's product through its
 * `productsCollectionOverride`; every document line that named an item now names a product.
 *
 * etrima kept one chain — product → product variant → item (the SKU): every one of its 167,562
 * items resolves to a variant and a product (`pnpm test:etrima`). Here the product is the plugin's
 * product, and the SKU level is the plugin's variant, which gains `sku` and `barcode`.
 *
 * What the fold decided where the two shapes collided:
 *  - `title` is the plugin's and is the name. The item's `name` is gone; `code` stays as the
 *    ERP identifier, now optional (a storefront-only product has none).
 *  - `inventory` is the plugin's number — the stock the checkout decrements. The item master's
 *    stock group is `stock` (`stock.inventoryQuantity` is recomputed from invoice lines). The two
 *    quantities are NOT reconciled: they have different writers and nothing ties them together.
 *  - `priceInEUR` is the plugin's checkout price; the item master's `pricing` group (price, cost,
 *    vendor price, minimum) stays beside it.
 *  - `address` (owner/seller) is optional now.
 *  - Access is the product's. The item master let any signed-in user create and edit an item.
 *
 * @standard UN-CEFACT UNSPSC product-classification
 * @standard GS1 GTIN global-trade-item-number
 * @standard ISO-4217:2015 currency-codes price-currency
 * @standard EN-16931:2017 §BG-31 item-information
 * @standard EU-1007/2011 textile-fibre-names + composition-labelling (the `contents` field)
 * @accounting IFRS IAS-2 inventories
 * @accounting US-GAAP ASC-330 inventory
 * @see docs/STANDARDS.md §3
 */
import type { Field } from 'payload'
import type { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'

import { localeRecord } from '@/i18n'

/** The SKU-level identifiers — on the product (a product without variants IS the SKU) and on each variant. */
export const skuFields = (): Field[] => [
  { name: 'sku', type: 'text', unique: true, index: true, admin: { description: 'SKU' } },
  { name: 'barcode', type: 'text', unique: true, index: true, admin: { description: 'Barcode (GS1 GTIN)' } },
]

/** The item master's fields, as they sit on the plugin's product. */
export const itemFields = (): Field[] => [
  { name: 'code', type: 'text', unique: true, index: true,
    admin: { description: 'Item code — the ERP identifier documents quote. Empty on a storefront-only product.' } },
  ...skuFields(),
  { name: 'address', type: 'relationship', relationTo: 'addresses', index: true,
    admin: { description: 'Owner/seller' } },
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
    name: 'stock',
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
        name: 'contents',
        type: 'textarea',
        admin: {
          description:
            'Material / fibre composition (e.g. "80% cotton, 20% polyester"). The garment-catalog field from the etrima products merge (93.7% populated) — feeds customs (the HS code) and fibre-content labelling.',
        },
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
]

/** The names the item master adds to a product — used to refuse a plugin upgrade that would shadow one. */
export const itemFieldNames = (): string[] => itemFields().flatMap((field) => ('name' in field ? [field.name] : []))

/**
 * Add the item master to the plugin's product fields. Throws at config time if the plugin now has
 * a field of the same name — a plugin upgrade must not silently change what an item's field means.
 */
export const withItemFields = (pluginFields: Field[]): Field[] => {
  const taken = new Set(pluginFields.flatMap((field) => ('name' in field ? [field.name] : [])))
  for (const name of itemFieldNames()) {
    if (taken.has(name)) throw new Error(`products: the e-commerce plugin now has its own \`${name}\` — the item master field would shadow it`)
  }
  return [...pluginFields, ...itemFields()]
}

/** The plugin's variant, in the e-commerce nav group, carrying the SKU-level identifiers. */
export const variantsOverride: CollectionOverride = ({ defaultCollection }) => {
  const taken = new Set(defaultCollection.fields.flatMap((field) => ('name' in field ? [field.name] : [])))
  for (const field of skuFields()) {
    if ('name' in field && taken.has(field.name)) throw new Error(`variants: the e-commerce plugin now has its own \`${field.name}\``)
  }
  return {
    ...defaultCollection,
    admin: { ...defaultCollection.admin, group: localeRecord('plugins.ecommerceGroup') },
    fields: [...defaultCollection.fields, ...skuFields()],
  }
}
