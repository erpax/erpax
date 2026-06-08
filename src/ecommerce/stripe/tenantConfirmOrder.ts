/**
 * Stripe order confirmation — finalize transaction with the per-tenant
 * Stripe secret; on success, mark order paid and trigger downstream hooks.
 *
 * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 * @compliance PSD2 EU-2015/2366 strong-customer-authentication
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time confirmed-at
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @security ISO-27001 A.5.17 authentication-information secret-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO-19011:2018 audit-trail
 * @rfc 9110 http-semantics
 * @see docs/STANDARDS.md §3 §4.4
 */

import Stripe from 'stripe'

import type { PayloadRequest } from 'payload'
import { APIError } from 'payload'

import type { Config, Order, Transaction } from '@/types'

import { apiErr, ERR } from '@/error'
import {
  resolveStripeSecretForTransaction,
  tenantIdFromRelation,
} from '@/tenant/remote/secret'

type CollectionSlug = keyof Config['collections']

type ConfirmArgs = {
  cartsSlug?: string
  data: { customerEmail?: string; paymentIntentID?: string }
  ordersSlug?: string
  req: PayloadRequest
  transactionsSlug?: string
}

/**
 * Same behavior as `@payloadcms/plugin-ecommerce` confirmOrder, but resolves the Stripe secret from the
 * transaction’s tenant **before** calling Stripe (required for per-tenant Stripe accounts).
 */
export function tenantConfirmOrder(props?: {
  apiVersion?: string
  appInfo?: { name: string; url?: string }
}) {
  const { apiVersion, appInfo } = props || {}

  return async ({
    cartsSlug = 'carts',
    data,
    ordersSlug = 'orders',
    req,
    transactionsSlug = 'transactions',
  }: ConfirmArgs) => {
    const payload = req.payload
    const customerEmail = data.customerEmail
    const paymentIntentID = data.paymentIntentID

    if (!paymentIntentID) {
      throw apiErr(ERR.PAY_PAYMENT_INTENT_REQUIRED)
    }

    const transactionsResults = await payload.find({
      collection: transactionsSlug as CollectionSlug,
      req,
      depth: 1,
      where: {
        'stripe.paymentIntentID': {
          equals: paymentIntentID,
        },
      },
      limit: 1,
    })

    const transaction = transactionsResults.docs[0] as Transaction | undefined
    if (!transactionsResults.totalDocs || !transaction) {
      throw apiErr(ERR.PAY_TRANSACTION_NOT_FOUND)
    }

    const secretKey = await resolveStripeSecretForTransaction(payload, transaction)
    if (!secretKey) {
      payload.logger.warn({ msg: 'confirmOrder: no Stripe secret for tenant' })
      throw apiErr(ERR.PAY_STRIPE_SECRET_MISSING)
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: (apiVersion ?? '2026-05-27.dahlia') as '2026-05-27.dahlia',
      appInfo: appInfo || {
        name: 'Stripe Payload Plugin',
        url: 'https://payloadcms.com',
      },
    })

    try {
      let customer = (
        await stripe.customers.list({
          email: customerEmail,
        })
      ).data[0]
      if (!customer?.id) {
        customer = await stripe.customers.create({
          email: customerEmail,
        })
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentID)
      if (paymentIntent.status !== 'succeeded') {
        throw apiErr(ERR.PAY_NOT_COMPLETED)
      }
      const cartID = paymentIntent.metadata.cartID
      const cartItemsSnapshot = paymentIntent.metadata.cartItemsSnapshot
        ? JSON.parse(paymentIntent.metadata.cartItemsSnapshot)
        : undefined
      const shippingAddress = paymentIntent.metadata.shippingAddress
        ? JSON.parse(paymentIntent.metadata.shippingAddress)
        : undefined
      if (!cartID) {
        throw apiErr(ERR.PAY_CART_METADATA_MISSING)
      }
      if (!cartItemsSnapshot || !Array.isArray(cartItemsSnapshot)) {
        throw apiErr(ERR.PAY_CART_SNAPSHOT_INVALID)
      }

      const tenantField = tenantIdFromRelation(transaction.tenant)

      const order = (await payload.create({
        collection: ordersSlug as CollectionSlug,
        data: {
          amount: paymentIntent.amount,
          // Stripe charges in the order's configured currency; the
          // generated Order.currency union is the authority for valid codes.
          currency: paymentIntent.currency.toUpperCase() as NonNullable<Order['currency']>,
          ...(req.user
            ? {
                customer: req.user.id,
              }
            : {
                customerEmail,
              }),
          items: cartItemsSnapshot,
          shippingAddress,
          status: 'processing',
          transactions: [transaction.id],
          ...(tenantField != null ? { tenant: tenantField } : {}),
        },
        req,
      })) as unknown as Order

      const timestamp = new Date().toISOString()
      await payload.update({
        id: cartID,
        collection: cartsSlug as CollectionSlug,
        data: {
          purchasedAt: timestamp,
        },
        req,
      })
      await payload.update({
        id: transaction.id,
        collection: transactionsSlug as CollectionSlug,
        data: {
          order: order.id,
          status: 'succeeded',
        },
        req,
      })
      return {
        message: 'Payment initiated successfully',
        orderID: order.id,
        transactionID: transaction.id,
        ...(order.accessToken ? { accessToken: order.accessToken } : {}),
      }
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      payload.logger.error({
        err: error,
        msg: 'Error confirming order with Stripe',
      })
      throw apiErr(ERR.PAY_CONFIRM_FAILED)
    }
  }
}
