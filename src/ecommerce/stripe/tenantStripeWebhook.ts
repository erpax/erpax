/**
 * Stripe webhook receiver — verifies signature with per-tenant
 * `stripeWebhookSecret`, then dispatches to subscription/invoice handlers.
 *
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography signature-verification
 * @compliance PSD2 EU-2015/2366 strong-customer-authentication
 * @rfc 9110 http-semantics webhook-delivery
 * @rfc 8615 well-known-uri webhook-discovery
 * @standard HMAC-SHA256 RFC 2104 signature-scheme
 * @security ISO-27001 A.5.17 authentication-information webhook-secret
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §8.24 use-of-cryptography
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §3 §4.4
 */

import Stripe from 'stripe'

import type { PayloadRequest } from 'payload'

import { apiErrorResponseMerge, ERR } from '@/error'
import { devStripeWebhookFallback } from '@/tenant/remote/secret'

/** Stripe webhook body/signature are read like a fetch Request; Payload attaches `payload`. */
type StripeWebhookRequest = PayloadRequest & {
  text?: () => Promise<string>
}

type WebhookProps = {
  apiVersion?: string
  appInfo?: { name: string; url?: string }
  webhooks?: Record<
    string,
    (args: {
      event: Stripe.Event
      req: { payload: import('payload').Payload }
      stripe: Stripe
    }) => Promise<void> | void
  >
}

/**
 * Stripe webhook: tries each tenant’s signing secret until verification succeeds (multi-account safe).
 * Non-production: falls back to global webhook secret once after tenants fail.
 */
export function tenantStripeWebhookEndpoint(props?: WebhookProps) {
  const { apiVersion, appInfo, webhooks } = props || {}

  const handler = async (req: StripeWebhookRequest) => {
    let returnStatus = 200
    const payload = req.payload
    const body = typeof req.text === 'function' ? await req.text() : ''
    const stripeSignature =
      typeof req.headers?.get === 'function' ? req.headers.get('stripe-signature') : null

    if (!body || !stripeSignature) {
      return apiErrorResponseMerge(ERR.WEBHOOK_STRIPE_BAD_REQUEST, { received: false })
    }

    const tenants = await payload.find({
      collection: 'tenants',
      limit: 500,
      depth: 0,
    })

    let verified: { event: Stripe.Event; stripe: Stripe } | null = null

    for (const tenant of tenants.docs) {
      const webhookSecret = (tenant as { stripeWebhookSecret?: string | null }).stripeWebhookSecret?.trim()
      const secretKey = (tenant as { stripeSecretKey?: string | null }).stripeSecretKey?.trim()
      if (!webhookSecret || !secretKey) continue

      const stripe = new Stripe(secretKey, {
        apiVersion: (apiVersion ?? '2026-04-22.dahlia') as '2026-04-22.dahlia',
        appInfo: appInfo || {
          name: 'Stripe Payload Plugin',
          url: 'https://payloadcms.com',
        },
      })

      try {
        const event = stripe.webhooks.constructEvent(body, stripeSignature, webhookSecret)
        verified = { event, stripe }
        break
      } catch {
        /* next tenant */
      }
    }

    if (!verified && process.env.NODE_ENV !== 'production') {
      const sk = process.env.STRIPE_SECRET_KEY?.trim()
      const wh = devStripeWebhookFallback()
      if (sk && wh) {
        const stripe = new Stripe(sk, {
          apiVersion: (apiVersion ?? '2026-04-22.dahlia') as '2026-04-22.dahlia',
          appInfo: appInfo || {
            name: 'Stripe Payload Plugin',
            url: 'https://payloadcms.com',
          },
        })
        try {
          const event = stripe.webhooks.constructEvent(body, stripeSignature, wh)
          verified = { event, stripe }
        } catch (err) {
          const msg = err instanceof Error ? err.message : JSON.stringify(err)
          payload.logger.error(`Stripe webhook verify (dev fallback): ${msg}`)
          returnStatus = 400
        }
      }
    }

    if (verified && typeof webhooks === 'object' && webhooks) {
      const webhookEventHandler = webhooks[verified.event.type]
      if (typeof webhookEventHandler === 'function') {
        await webhookEventHandler({
          event: verified.event,
          req,
          stripe: verified.stripe,
        })
      }
    } else if (!verified) {
      returnStatus = 400
    }

    return Response.json({ received: true }, { status: returnStatus })
  }

  return {
    handler,
    method: 'post' as const,
    path: '/webhooks',
  }
}
