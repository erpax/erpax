import Stripe from 'stripe'

import { devStripeWebhookFallback } from '@/utilities/tenantRemoteSecrets'

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

  const handler = async (req: any) => {
    let returnStatus = 200
    const payload = req.payload
    const body = typeof req.text === 'function' ? await req.text() : ''
    const stripeSignature =
      typeof req.headers?.get === 'function' ? req.headers.get('stripe-signature') : null

    if (!body || !stripeSignature) {
      return Response.json({ received: false }, { status: 400 })
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error apiVersion
        apiVersion: apiVersion || '2025-03-31.basil',
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error apiVersion
          apiVersion: apiVersion || '2025-03-31.basil',
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
