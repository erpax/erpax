import {
  ecommercePlugin,
  EUR,
  GBP,
  USD,
} from '@payloadcms/plugin-ecommerce'
import type { Plugin } from 'payload'
import type { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'

import { createTenantStripePaymentMethod } from '@/ecommerce/createTenantStripePaymentMethod'
import { ProductsCollection } from '@/collections/Products'
import { adminOnlyFieldAccess } from '@/ecommerce/access/adminOnlyFieldAccess'
import { adminOrPublishedStatus } from '@/ecommerce/access/adminOrPublishedStatus'
import { customerOnlyFieldAccess } from '@/ecommerce/access/customerOnlyFieldAccess'
import { isCustomer } from '@/ecommerce/access/isCustomer'
import { isAdmin } from '@/ecommerce/access/isAdmin'
import { isDocumentOwner } from '@/ecommerce/access/isDocumentOwner'
import { validateProductCheckout } from '@/ecommerce/productValidation'

/** Match Payload ecommerce template nav: variant helpers live under Ecommerce, not ungrouped (`group: false`). */
const ecommerceGroupOverride: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection.admin,
    group: 'Ecommerce',
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
      defaultCurrency: 'EUR',
      supportedCurrencies: [EUR, GBP, USD],
    },
    customers: {
      slug: 'users',
    },
    addresses: {
      /** Default plugin hides this collection from nav (`admin.hidden: true`); template lists it with Products/Carts. */
      addressesCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        admin: {
          ...defaultCollection.admin,
          hidden: false,
          group: 'Ecommerce',
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
