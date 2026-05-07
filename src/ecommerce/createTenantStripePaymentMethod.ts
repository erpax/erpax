import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'

import { tenantAwareInitiatePayment } from './stripe/tenantAwareInitiatePayment'
import { tenantConfirmOrder } from './stripe/tenantConfirmOrder'
import { tenantStripeWebhookEndpoint } from './stripe/tenantStripeWebhook'

/**
 * Stripe payment method: secrets come from `Tenants` (see `stripeSecretKey`, `stripeWebhookSecret`).
 * Non-production: may fall back to `STRIPE_*` env vars for local development.
 */
export function createTenantStripePaymentMethod() {
  const stub = stripeAdapter({
    secretKey: 'sk_placeholder_not_used',
    webhookSecret: 'whsec_placeholder_not_used',
    publishableKey: '',
  })

  return {
    ...stub,
    initiatePayment: tenantAwareInitiatePayment({}),
    confirmOrder: tenantConfirmOrder({}),
    endpoints: [tenantStripeWebhookEndpoint({})],
  }
}
