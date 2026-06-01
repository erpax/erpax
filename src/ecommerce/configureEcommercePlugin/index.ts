/**
 * Ecommerce plugin configuration — Stripe + multi-tenant payment routing.
 *
 * Master citation index for the ecommerce stack: per-tenant Stripe keys, PCI-DSS
 * scope minimization (we never see card data — Stripe tokenizes), product
 * validation, customer/admin access predicates.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-8601-1:2019 date-time
 * @rfc 9110 http-semantics
 * @rfc 8615 well-known-uri webhook-discovery
 * @compliance PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data tokenized
 * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 * @compliance PSD2 EU-2015/2366 strong-customer-authentication
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-stripe-keys
 * @security ISO-27002 §5.17 authentication-information secret-management
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §3 §4.4
 */

import {
  ecommercePlugin,
  EUR,
} from '@payloadcms/plugin-ecommerce'
import type { Plugin } from 'payload'
import type { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'

import { createTenantStripePaymentMethod } from '@/ecommerce/createTenantStripePaymentMethod'
import { ProductsCollection } from '@/collections/Media/Products'
import { adminOnlyFieldAccess } from '@/ecommerce/access/adminOnlyFieldAccess'
import { adminOrPublishedStatus } from '@/ecommerce/access/adminOrPublishedStatus'
import { customerOnlyFieldAccess } from '@/ecommerce/access/customerOnlyFieldAccess'
import { isCustomer } from '@/ecommerce/access/isCustomer'
import { isAdmin } from '@/ecommerce/access/isAdmin'
import { isDocumentOwner } from '@/ecommerce/access/isDocumentOwner'
import { validateProductCheckout } from '@/ecommerce/productValidation'
import { localeRecord } from '@/i18n'
import { DEFAULT_COUNTRY, DEFAULT_CURRENCY } from '@/config/regional-defaults'
import { validateAddressHook } from '@/hooks/validateAddress'
import { emitOrderLifecycleEvents } from '@/ecommerce/hooks/emitOrderLifecycleEvents'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'

/** Match Payload ecommerce template nav: variant helpers live under Ecommerce, not ungrouped (`group: false`). */
const ecommerceGroupOverride: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection.admin,
    group: localeRecord('plugins.ecommerceGroup'),
  },
})

export function createEcommercePlugin(): Plugin {
  return ecommercePlugin({
    access: {
      adminOnlyFieldAccess,
      adminOrPublishedStatus,
      customerOnlyFieldAccess,
      isCustomer,
      isAdmin,
      isDocumentOwner,
    },
    currencies: {
      // Slice WW: canonical single-currency configuration. EUR is the house
      // default per `@/config/regional-defaults`; the `priceInGBP` /
      // `priceInUSD` columns the plugin would otherwise generate are dropped
      // in favor of the standard `price` + `currencyCode` shape used by
      // Items / Invoices / InvoiceLines. Foreign-currency display is handled
      // at runtime via `multi-currency.service` (FX conversion), not via
      // additional priceInXXX columns.
      defaultCurrency: 'EUR',
      supportedCurrencies: [EUR],
    },
    customers: {
      slug: 'users',
    },
    addresses: {
      /**
       * Merge accounting master-data fields onto the plugin's `addresses` collection
       * (single canonical slug; same DRY override pattern used for `products`).
       * Plugin defaults: customer, title, firstName, lastName, company, addressLine1/2, city, state, postalCode, country, phone.
       * Appended below: identification (code/name/email), tax/financial, GL accounts, and misc.
       */
      addressesCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        admin: {
          ...defaultCollection.admin,
          hidden: false,
          group: localeRecord('plugins.ecommerceGroup'),
          useAsTitle: 'company',
          defaultColumns: ['code', 'company', 'email', 'country', 'taxType'],
        },
        fields: [
          ...defaultCollection.fields,
          {
            name: 'code',
            type: 'text',
            unique: true,
            index: true,
            admin: { description: 'Unique address code (e.g., ACME-NYC)' },
          },
          {
            name: 'name',
            type: 'text',
            admin: { description: 'Contact person name' },
          },
          {
            name: 'email',
            type: 'email',
            admin: { description: 'Email address' },
          },
          {
            name: 'taxType',
            type: 'select',
            options: [
              { label: 'VAT', value: 'vat' },
              { label: 'GST', value: 'gst' },
              { label: 'None', value: 'none' },
            ],
            admin: { description: 'Tax regime (VAT/GST/None)' },
          },
          {
            name: 'taxCode',
            type: 'text',
            index: true,
            admin: { description: 'Tax ID / VAT number' },
          },
          {
            name: 'taxRate',
            type: 'number',
            admin: { description: 'Default tax rate (%)', step: 0.01 },
          },
          {
            name: 'ninCode',
            type: 'text',
            index: true,
            admin: { description: 'National ID number' },
          },
          {
            name: 'currencyCode',
            type: 'text',
            defaultValue: DEFAULT_CURRENCY,
            admin: { description: 'ISO 4217 currency code — defaults to the canonical DEFAULT_CURRENCY (derived from DEFAULT_COUNTRY).' },
          },
          {
            name: 'debitAccount',
            type: 'relationship',
            relationTo: 'gl-accounts',
            admin: { description: 'Default debit account for transactions' },
          },
          {
            name: 'creditAccount',
            type: 'relationship',
            relationTo: 'gl-accounts',
            admin: { description: 'Default credit account for transactions' },
          },
          {
            name: 'cashAccount',
            type: 'relationship',
            relationTo: 'gl-accounts',
            admin: { description: 'Cash/bank account for payments' },
          },
          {
            name: 'note',
            type: 'textarea',
            admin: { description: 'Internal notes' },
          },
          {
            name: 'isDefault',
            type: 'checkbox',
            defaultValue: false,
            admin: { description: 'Use as default address' },
          },
          {
            name: 'metadata',
            type: 'json',
            admin: { description: 'Additional metadata' },
          },
        ],
        // Slice XX: address-format validation. Enforces per-country required
        // fields and postal-code patterns from `@/config/address-formats`.
        // Falls back to `DEFAULT_COUNTRY` (BG) when the address has no
        // explicit country — mirrors the regional-defaults cascade.
        hooks: {
          ...defaultCollection.hooks,
          beforeValidate: [
            ...(defaultCollection.hooks?.beforeValidate ?? []),
            validateAddressHook({ fallbackCountry: DEFAULT_COUNTRY }),
          ],
        },
      }),
    },
    carts: {
      allowGuestCarts: true,
    },
    inventory: true,
    orders: {
      ordersCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        fields: [
          ...defaultCollection.fields,
          {
            name: 'accessToken',
            type: 'text',
            unique: true,
            index: true,
            admin: {
              position: 'sidebar',
              readOnly: true,
            },
            hooks: {
              beforeValidate: [
                ({ value, operation }) => {
                  if (operation === 'create' || !value) {
                    return crypto.randomUUID()
                  }
                  return value
                },
              ],
            },
          },
        ],
        // Slice ZZ-3: every Order status transition emits the matching
        // domain event so `glPostingService` can post the IFRS 15 / ASC 606
        // revenue-recognition + COGS entries. Closes the "data is money"
        // gap between front-of-house ecommerce and the GL.
        hooks: {
          ...defaultCollection.hooks,
          afterChange: [
            ...(defaultCollection.hooks?.afterChange ?? []),
            emitOrderLifecycleEvents,
            auditTrailAfterChange('orders'),
          ],
        },
      }),
    },
    payments: {
      paymentMethods: [createTenantStripePaymentMethod()],
    },
    products: {
      productsCollectionOverride: ProductsCollection,
      validation: validateProductCheckout,
      variants: {
        variantOptionsCollectionOverride: ecommerceGroupOverride,
        variantTypesCollectionOverride: ecommerceGroupOverride,
        variantsCollectionOverride: ecommerceGroupOverride,
      },
    },
    transactions: true,
  })
}
