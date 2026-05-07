import Stripe from 'stripe'

import type { PayloadRequest } from 'payload'

import {
  resolveStripeSecretForTransaction,
  tenantIdFromRelation,
} from '@/utilities/tenantRemoteSecrets'

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
      throw new Error('PaymentIntent ID is required')
    }

    const transactionsResults = await payload.find({
      collection: transactionsSlug as any,
      req,
      depth: 1,
      where: {
        'stripe.paymentIntentID': {
          equals: paymentIntentID,
        },
      },
      limit: 1,
    })

    const transaction = transactionsResults.docs[0]
    if (!transactionsResults.totalDocs || !transaction) {
      throw new Error('No transaction found for the provided PaymentIntent ID')
    }

    const secretKey = await resolveStripeSecretForTransaction(payload, transaction)
    if (!secretKey) {
      throw new Error('Stripe secret key is required for this tenant (set on Tenants or STRIPE_SECRET_KEY in development).')
    }

    const stripe = new Stripe(secretKey, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error Stripe apiVersion typing
      apiVersion: apiVersion || '2025-03-31.basil',
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
        throw new Error(`Payment not completed.`)
      }
      const cartID = paymentIntent.metadata.cartID
      const cartItemsSnapshot = paymentIntent.metadata.cartItemsSnapshot
        ? JSON.parse(paymentIntent.metadata.cartItemsSnapshot)
        : undefined
      const shippingAddress = paymentIntent.metadata.shippingAddress
        ? JSON.parse(paymentIntent.metadata.shippingAddress)
        : undefined
      if (!cartID) {
        throw new Error('Cart ID not found in the PaymentIntent metadata')
      }
      if (!cartItemsSnapshot || !Array.isArray(cartItemsSnapshot)) {
        throw new Error('Cart items snapshot not found or invalid in the PaymentIntent metadata')
      }

      const tenantField = tenantIdFromRelation(transaction.tenant)

      const order = await payload.create({
        collection: ordersSlug as any,
        data: {
          amount: paymentIntent.amount,
          currency: paymentIntent.currency.toUpperCase(),
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
      })

      const timestamp = new Date().toISOString()
      await payload.update({
        id: cartID,
        collection: cartsSlug as any,
        data: {
          purchasedAt: timestamp,
        },
        req,
      })
      await payload.update({
        id: transaction.id,
        collection: transactionsSlug as any,
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
      payload.logger.error({
        err: error,
        msg: 'Error confirming order with Stripe',
      })
      throw new Error(error instanceof Error ? error.message : 'Unknown error initiating payment')
    }
  }
}
