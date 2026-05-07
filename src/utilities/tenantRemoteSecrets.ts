import type { Payload } from 'payload'

import type { Cart, Tenant, User } from '@/payload-types'

/** Non-production fallback for local DX — remote APIs should be configured on each Tenant in production. */
export function devStripeSecretFallback(): string {
  if (process.env.NODE_ENV === 'production') return ''
  return process.env.STRIPE_SECRET_KEY?.trim() || ''
}

export function devResendKeyFallback(): string {
  if (process.env.NODE_ENV === 'production') return ''
  return process.env.RESEND_API_KEY?.trim() || ''
}

export function devStripeWebhookFallback(): string {
  if (process.env.NODE_ENV === 'production') return ''
  return (
    process.env.STRIPE_WEBHOOK_SECRET?.trim() || process.env.STRIPE_WEBHOOKS_SIGNING_SECRET?.trim() || ''
  )
}

export async function getTenantById(
  payload: Payload,
  id: number | undefined | null,
): Promise<Tenant | null> {
  if (id == null) return null
  try {
    return await payload.findByID({ collection: 'tenants', id, depth: 0 })
  } catch {
    return null
  }
}

export function tenantIdFromRelation(
  tenant: Cart['tenant'] | Tenant | number | null | undefined,
): number | null {
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
  return devResendKeyFallback()
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
