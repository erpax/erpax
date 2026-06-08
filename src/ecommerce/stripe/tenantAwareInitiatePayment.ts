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

import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'

import type { Cart } from '@/types'
import { apiErr, ERR } from '@/error'
import { resolveStripeSecretForCart } from '@/tenant/remote/secret'

// The exact args the plugin adapter's initiatePayment expects — derived so the
// pass-through `run(args)` stays in lock-step with the upstream plugin contract.
type InitiateArgs = Parameters<
  NonNullable<ReturnType<typeof stripeAdapter>['initiatePayment']>
>[0]

export function tenantAwareInitiatePayment(
  props?: {
    apiVersion?: string
    appInfo?: { name: string; url?: string }
  },
) {
  return async (args: InitiateArgs) => {
    const { req, data } = args
    // The plugin's DefaultCartType is the erpax Cart at runtime (it carries the
    // tenant relation the secret resolver reads).
    const secretKey = await resolveStripeSecretForCart(req.payload, data.cart as Cart)
    if (!secretKey) {
      req.payload.logger.warn({ msg: 'Tenant initiate payment: no Stripe secret' })
      throw apiErr(ERR.PAY_INIT_STRIPE_SECRET_MISSING)
    }
    const apiVersion = (props?.apiVersion ?? '2026-05-27.dahlia') as '2026-05-27.dahlia'
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
