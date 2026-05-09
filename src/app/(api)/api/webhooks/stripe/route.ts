/**
 * POST /api/webhooks/stripe — receive Stripe webhook + dispatch to handlers.
 *
 * @rfc 8615 well-known-uri webhook-discovery
 * @rfc 9110 http-semantics
 * @rfc 2104 hmac signature-verification
 * @standard HMAC-SHA256 stripe-signature-scheme
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 * @compliance PSD2 EU-2015/2366 strong-customer-authentication
 * @security ISO-27001 A.5.17 authentication-information webhook-secret
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO-19011:2018 audit-trail
 * @see src/app/README.md
 */

import { headers } from 'next/headers'
import Stripe from 'stripe'
import { getPayloadHMC } from '@payloadcms/next/utilities'
import {
  handleSubscriptionSync,
  handleInvoiceSync,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
} from '@/utilities/billing/stripeWebhookHandlers'

/**
 * Stripe webhook handler - processes all billing events
 * DRY pattern: Uses shared handlers to avoid duplication
 */

const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET

const webhookEventHandlers: Record<string, (context: any, event: any) => Promise<void>> = {
  'customer.subscription.created': handleSubscriptionSync,
  'customer.subscription.updated': handleSubscriptionSync,
  'invoice.created': handleInvoiceSync,
  'invoice.updated': handleInvoiceSync,
  'invoice.paid': handleInvoicePaid,
  'invoice.payment_failed': handleInvoicePaymentFailed,
}

export async function POST(request: Request) {
  try {
    if (!stripeSecret) {
      return Response.json(
        { error: 'Stripe webhook secret not configured' },
        { status: 500 },
      )
    }

    // Get Stripe signature from headers
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return Response.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 },
      )
    }

    // Get request body
    const body = await request.text()

    // Verify and parse Stripe webhook
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-03-31.basil',
    })

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeSecret)
    } catch (err) {
      return Response.json(
        { error: `Webhook Error: ${(err as Error).message}` },
        { status: 400 },
      )
    }

    // Get Payload CMS instance
    const { payload } = await getPayloadHMC()

    // Route event to appropriate handler
    const handler = webhookEventHandlers[event.type]

    if (handler) {
      const eventData = event.data.object as any

      try {
        await handler(
          { event, payload },
          eventData,
        )
      } catch (handlerError) {
        payload.logger.error(`Error handling webhook ${event.type}:`, handlerError)
        return Response.json(
          { error: `Handler error: ${(handlerError as Error).message}` },
          { status: 500 },
        )
      }
    } else {
      payload.logger.debug(`Unhandled webhook event type: ${event.type}`)
    }

    return Response.json({ received: true })
  } catch (error) {
    return Response.json(
      { error: `Server error: ${(error as Error).message}` },
      { status: 500 },
    )
  }
}
