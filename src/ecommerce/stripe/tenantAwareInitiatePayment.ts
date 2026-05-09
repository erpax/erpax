/**
 * Stripe initiate-payment — resolves the per-tenant Stripe secret from the
 * cart's tenant context, then delegates to the plugin's stripe adapter.
 *
 * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 * @compliance PSD2 EU-2015/2366 strong-customer-authentication
 * @standard ISO-4217:2015 currency-codes
 * @security ISO-27001 A.5.17 authentication-information secret-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @rfc 9110 http-semantics
 * @see docs/STANDARDS.md §3 §4.4
 */

import type Stripe from 'stripe'
import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'
import type { PayloadRequest } from 'payload'

import { apiErr, ERR } from '@/utilities/errors'
import { resolveStripeSecretForCart } from '@/utilities/tenantRemoteSecrets'

type InitiateArgs = {
  data: { cart?: unknown }
  req: PayloadRequest
}

export function tenantAwareInitiatePayment(
  props?: {
    apiVersion?: string
    appInfo?: { name: string; url?: string }
  },
) {
  return async (args: InitiateArgs) => {
    const { req, data } = args
    const secretKey = await resolveStripeSecretForCart(req.payload, data.cart)
    if (!secretKey) {
      req.payload.logger.warn({ msg: 'Tenant initiate payment: no Stripe secret' })
      throw apiErr(ERR.PAY_INIT_STRIPE_SECRET_MISSING)
    }
    const apiVersion = (props?.apiVersion ?? '2025-03-31.basil') as Stripe.StripeConfig['apiVersion']
    const adapter = stripeAdapter({
      apiVersion,
      appInfo: props?.appInfo,
      secretKey,
      publishableKey: '',
      webhookSecret: '',
    })
    const run = adapter.initiatePayment
    if (!run) {
      throw apiErr(ERR.PAY_INIT_NOT_CONFIGURED)
    }
    return run(args)
  }
}
