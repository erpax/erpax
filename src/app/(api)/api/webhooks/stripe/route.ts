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

import config from '@payload-config'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import {
  handleSubscriptionSync,
  handleInvoiceSync,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
  handleChargeRefunded,
  type StripeWebhookContext,
} from '@/utilities/billing/stripeWebhookHandlers'

/**
 * Stripe webhook handler - processes all billing events
 * DRY pattern: Uses shared handlers to avoid duplication
 */

const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET

// Each Stripe webhook handler accepts its own narrow event payload
// (Stripe.Subscription, Stripe.Invoice, etc.). The dictionary erases that
// to a runtime-validated dispatch table — Stripe's event.type discriminator
// guarantees the right handler receives the right shape, but TS can't see
// that across the dictionary boundary, hence the structural cast.
type WebhookHandler = (
  context: StripeWebhookContext,
  event: Stripe.Event.Data.Object,
) => Promise<void>

const webhookEventHandlers: Record<string, WebhookHandler> = {
  'customer.subscription.created': handleSubscriptionSync as WebhookHandler,
  'customer.subscription.updated': handleSubscriptionSync as WebhookHandler,
  'invoice.created': handleInvoiceSync as WebhookHandler,
  'invoice.updated': handleInvoiceSync as WebhookHandler,
  'invoice.paid': handleInvoicePaid as WebhookHandler,
  'invoice.payment_failed': handleInvoicePaymentFailed as WebhookHandler,
  // Slice SSS — closes the last LLL dead-handler gap. Stripe fires
  // `charge.refunded` for both full + partial refunds; the handler emits
  // `subscription:refunded` so glPostingService books the cash leg.
  'charge.refunded': handleChargeRefunded as WebhookHandler,
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
      apiVersion: '2025-03-31.basil' as Stripe.StripeConfig['apiVersion'],
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
    const payload = await getPayload({ config })

    // Route event to appropriate handler
    const handler = webhookEventHandlers[event.type]

    if (handler) {
      const eventData = event.data.object as Stripe.Event.Data.Object

      try {
        await handler(
          { payload },
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
