import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'

import { resolveStripeSecretForCart } from '@/utilities/tenantRemoteSecrets'

export function tenantAwareInitiatePayment(
  props?: {
    apiVersion?: string
    appInfo?: { name: string; url?: string }
  },
) {
  return async (args: any) => {
    const { req, data } = args
    const secretKey = await resolveStripeSecretForCart(req.payload, data.cart)
    if (!secretKey) {
      throw new Error(
        'Stripe secret key is required for this tenant (Tenants → Stripe secret, or STRIPE_SECRET_KEY in development).',
      )
    }
    const adapter = stripeAdapter({
      apiVersion: props?.apiVersion as any,
      appInfo: props?.appInfo,
      secretKey,
      publishableKey: '',
      webhookSecret: '',
    })
    const run = adapter.initiatePayment
    if (!run) throw new Error('Stripe initiatePayment is not configured')
    return run(args)
  }
}
