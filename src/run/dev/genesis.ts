#!/usr/bin/env tsx
/**
 * run/dev genesis — boot Payload (Local API, local Miniflare D1), log in as the
 * FIRST user (password == email, the genesis credential), and create the FIRST
 * tenant with access ENFORCED (`overrideAccess:false`) — access at each step.
 *
 * The genesis chicken-and-egg (creating the first tenant seems to require a
 * super-admin that does not exist yet) is meant to be solved by MATH: the
 * content-uuid cross computes access from the identity element — "all is
 * defined even when nothing is defined" — so the first user is genesis-admin by
 * the cross, never by a bootstrap hack. This script is the experiment that shows
 * whether the live access is that computational cross or still the incomplete
 * name-based graft (`isSuperAdminAccess`). The tenant identity is COMPUTED from
 * the first user's email domain, never hardcoded (computed-not-hardcoded).
 *
 *   pnpm exec tsx src/run/dev/genesis.ts
 */
const { createRequire } = await import('node:module')
;(globalThis as { require?: unknown }).require ??= createRequire(import.meta.url)
const { config: loadEnv } = await import('dotenv')
loadEnv()
process.env.PAYLOAD_DISABLE_ADMIN = 'true'
process.env.PAYLOAD_ENABLE_GRAPHQL ??= 'false'
process.env.PAYLOAD_DEV_PUSH ??= 'false'
const { getPayload } = await import('payload')
const payload = await getPayload({ config: await (await import('@payload-config')).default })

const first = (await payload.find({ collection: 'users', limit: 1, overrideAccess: true })).docs[0] as
  | { email?: string }
  | undefined
const email = first?.email
if (!email) {
  console.log('[genesis] no first user — nothing to do')
  process.exit(0)
}
const { user } = await payload.login({ collection: 'users', data: { email, password: email } })
if (!user) {
  console.log('[genesis] login returned no user — nothing to do')
  process.exit(1)
}
console.log('[genesis] first user:', user.email, '— roles:', (user as { roles?: string[] }).roles)

// Compute the genesis tenant identity from the first user's email domain.
const dom = email.split('@')[1] ?? 'erpax'
const slug = (dom.split('.')[0] ?? 'erpax').toLowerCase()
const country = (dom.split('.').pop() ?? 'zz').toUpperCase()
const name = slug.toUpperCase()

try {
  const tenant = await payload.create({
    collection: 'tenants',
    data: { name, slug, domain: dom, config: { identity: { country } } },
    user,
    overrideAccess: false, // access at each step — the cross/math decides the genesis
  })
  console.log('[genesis] FIRST TENANT created under ENFORCED access (math solved the genesis):', {
    id: tenant.id,
    name,
    slug,
    domain: dom,
    country,
  })
  const updated = await payload.update({
    collection: 'users',
    id: user.id,
    data: { tenants: [{ tenant: tenant.id, roles: ['admin'] }] },
    user,
    overrideAccess: false,
  })
  console.log('[genesis] first user joined the first tenant as admin:', (updated as { tenants?: unknown }).tenants)
} catch (e) {
  console.log('[genesis] tenant create DENIED under enforced access — the multi-tenant incompleteness, name-based not computational:', (e as Error).message)
}
process.exit(0)
