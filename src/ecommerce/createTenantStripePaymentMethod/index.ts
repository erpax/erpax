/**
 * Tenant-aware Stripe payment method factory — secrets pulled per-tenant.
 *
 * Each tenant supplies its own `stripeSecretKey` and `stripeWebhookSecret`
 * (encrypted at rest in Tenants). Non-production may fall back to `STRIPE_*`
 * env vars for local development only.
 *
 * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
 * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
 * @compliance PSD2 EU-2015/2366 strong-customer-authentication
 * @standard ISO-4217:2015 currency-codes
 * @security ISO-27001 A.5.17 authentication-information secret-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §8.24 use-of-cryptography
 * @see docs/STANDARDS.md §3 §4.4
 */

import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'

import { tenantAwareInitiatePayment } from '../stripe/tenantAwareInitiatePayment'
import { tenantConfirmOrder } from '../stripe/tenantConfirmOrder'
import { tenantStripeWebhookEndpoint } from '../stripe/tenantStripeWebhook'

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
