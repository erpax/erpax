/**
 * Per-tenant remote-secret resolution — Stripe API keys, webhook secrets,
 * Resend API keys, etc. pulled from the tenant row at request time.
 *
 * @standard NIST SP-800-108 key-derivation-function (sibling: `getPreviewSecret`)
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-keys
 * @security ISO-27001 A.5.17 authentication-information secret-management
 * @security ISO-27002 §5.17 secret-management
 * @security ISO-27002 §8.24 use-of-cryptography
 * @compliance PCI-DSS-4.0 §3.2 tokenized-payment-method
 * @compliance GDPR Art.32 security-of-processing
 */

import type { Payload } from 'payload'

import type { Cart, Tenant, User } from '@/types'

/** Non-production fallback for local DX — remote APIs should be configured on each Tenant in production. */
export function devStripeSecretFallback(): string {
  if (process.env.NODE_ENV === 'production') return ''
  return process.env.STRIPE_SECRET_KEY?.trim() || ''
}

/**
 * Resend API key when no tenant-specific key applies (e.g. first admin user before any tenant
 * exists, or verification email before `Users.tenants` is populated). Uses `RESEND_API_KEY`
 * in **all** environments — unlike Stripe/tenant secrets we intentionally allow a platform key.
 */
export function globalResendApiKeyFallback(): string {
  return process.env.RESEND_API_KEY?.trim() || ''
}

export function devStripeWebhookFallback(): string {
  if (process.env.NODE_ENV === 'production') return ''
  return (
    process.env.STRIPE_WEBHOOK_SECRET?.trim() || ''
  )
}

export async function getTenantById(
  payload: Payload,
  id: string | undefined | null,
): Promise<Tenant | null> {
  if (id == null) return null
  try {
    return await payload.findByID({ collection: 'tenants', id, depth: 0 })
  } catch {
    return null
  }
}

export function tenantIdFromRelation(
  tenant: Cart['tenant'] | Tenant | null | undefined,
): string | null {
  if (tenant == null) return null
  return typeof tenant === 'object' ? tenant.id : tenant
}

export async function resolveStripeSecretForCart(
  payload: Payload,
  cart: Cart | null | undefined,
): Promise<string> {
  const tenantId = tenantIdFromRelation(cart?.tenant)
  const tenant = await getTenantById(payload, tenantId)
  const key = tenant?.stripeSecretKey?.trim()
  if (key) return key
  return devStripeSecretFallback()
}

export async function resolveStripeSecretForTransaction(
  payload: Payload,
  transaction: { tenant?: Cart['tenant'] } | null | undefined,
): Promise<string> {
  const tenantId = tenantIdFromRelation(transaction?.tenant)
  const tenant = await getTenantById(payload, tenantId)
  const key = tenant?.stripeSecretKey?.trim()
  if (key) return key
  return devStripeSecretFallback()
}

/**
 * Per-tenant credential for a commercial trading API (see `src/trading/api/`).
 * Permissive by design — different providers need different fields (key, secret,
 * OAuth client pair, Basic user/pass, a per-merchant base-URL override like Adyen's
 * `{PREFIX}` or a self-hosted store host). All optional; the client reads what its
 * `auth` model requires.
 */
export interface TradingApiCredential {
  readonly apiKey?: string
  readonly secret?: string
  readonly clientId?: string
  readonly clientSecret?: string
  readonly username?: string
  readonly password?: string
  readonly token?: string
  /** Per-tenant base-URL override (Adyen {PREFIX}, self-hosted store, Checkout.com subdomain). */
  readonly baseUrl?: string
  readonly [key: string]: unknown
}

/**
 * Resolve a tenant's stored credential for a trading-API provider from the
 * per-tenant config sandbox (`tenant.integrationSettings.tradingApis[provider]`).
 * Returns null when the tenant has no credential configured for that provider —
 * the caller then degrades (catalogue-only) rather than calling unauthenticated.
 * The trading-APIs registry itself holds NO secrets; they live only here.
 */
export async function resolveTradingApiCredential(
  payload: Payload,
  tenantRef: Tenant | string | null | undefined,
  provider: string,
): Promise<TradingApiCredential | null> {
  const tenantId = typeof tenantRef === 'string' ? tenantRef : tenantIdFromRelation(tenantRef)
  const tenant = await getTenantById(payload, tenantId)
  const settings = (tenant?.integrationSettings ?? null) as
    | { tradingApis?: Record<string, TradingApiCredential> }
    | null
  const cred = settings?.tradingApis?.[provider]
  return cred && typeof cred === 'object' ? cred : null
}

function normalizeToEmails(to: unknown): string[] {
  if (!to) return []
  if (typeof to === 'string') return [to.toLowerCase()]
  if (Array.isArray(to)) {
    return to
      .map((x) => (typeof x === 'string' ? x : (x as { address?: string }).address || ''))
      .filter(Boolean)
      .map((e) => e.toLowerCase())
  }
  if (typeof to === 'object' && 'address' in (to as object)) {
    return [(to as { address: string }).address.toLowerCase()]
  }
  return []
}

/**
 * Resolve Resend API key: first tenant (via Users.tenants) matching `to` addresses that has `resendApiKey`,
 * else development `RESEND_API_KEY`.
 */
export async function resolveResendApiKeyForMessage(
  payload: Payload,
  message: { to?: unknown },
): Promise<string> {
  const emails = normalizeToEmails(message.to)
  for (const email of emails) {
    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      depth: 1,
      limit: 1,
    })
    const user = users.docs[0] as User | undefined
    const tenantLinks = user?.tenants
    if (!tenantLinks?.length) continue
    for (const row of tenantLinks) {
      const tid = tenantIdFromRelation(row.tenant)
      const tenant = await getTenantById(payload, tid)
      const key = tenant?.resendApiKey?.trim()
      if (key) return key
    }
  }
  return globalResendApiKeyFallback()
}

export async function resolveResendDefaultsForMessage(
  payload: Payload,
  message: { to?: unknown },
): Promise<{ address: string; name: string }> {
  const emails = normalizeToEmails(message.to)
  for (const email of emails) {
    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      depth: 1,
      limit: 1,
    })
    const user = users.docs[0] as User | undefined
    const tenantLinks = user?.tenants
    if (!tenantLinks?.length) continue
    for (const row of tenantLinks) {
      const tid = tenantIdFromRelation(row.tenant)
      const tenant = await getTenantById(payload, tid)
      if (tenant?.emailDefaultFromAddress?.trim()) {
        return {
          address: tenant.emailDefaultFromAddress.trim(),
          name: tenant.emailDefaultFromName?.trim() || 'site',
        }
      }
    }
  }
  return {
    address: process.env.EMAIL_DEFAULT_FROM_ADDRESS || 'onboarding@resend.dev',
    name: process.env.EMAIL_DEFAULT_FROM_NAME || 'site',
  }
}
