/**
 * auth/context — who is acting, read from the request and nothing else.
 *
 * A LEAF: it imports types only, so anything may depend on it without depending on the access
 * predicates in `@/auth`. That is the whole reason it exists — `@/auth` lazily imported
 * `@/subscription/gate` for its feature guard, and the gate imported `@/auth` for `getUserContext`,
 * which is a two-file import tangle ([[rules]]/cycle). The identity readers were the only thing the
 * gate needed, and they never needed the predicates.
 *
 * @see ./SKILL.md
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { PayloadRequest } from 'payload'
import type { UserContext, UserRole } from '@/types/auth'
import type { User } from '@/types'

/**
 * Narrow `req.user` (the `User | PayloadMcpApiKey` auth union) to the app `User`. Machine identities
 * (MCP API keys) carry no `roles` and resolve to `null`. The single canonical touch-point for
 * `req.user`: access predicates, hooks and services compose with this instead of poking the union.
 */
export function getUser(req: PayloadRequest): User | null {
  const u = req.user
  if (!u || !('roles' in u)) return null
  return u as User
}

/**
 * The acting user's context. `tenant` is derived from the canonical `User.tenants[]` array
 * (multi-tenant plugin convention) — the first membership; users with several switch the active
 * tenant via the payload-tenant cookie, which `getTenantFromRequest` in `@/auth` reads.
 */
export function getUserContext(req: PayloadRequest): UserContext | null {
  const user = getUser(req)
  if (!user) return null
  const firstTenantRef = user.tenants?.[0]?.tenant
  const tenant =
    typeof firstTenantRef === 'number' || typeof firstTenantRef === 'string' ? String(firstTenantRef) : ''
  return {
    id: String(user.id),
    tenant,
    roles: (user.roles as UserRole[]) ?? [],
  }
}
