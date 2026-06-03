#!/usr/bin/env tsx
/**
 * run/dev genesis-seed — SEQUENCE step 0: mint the genesis user through the erpax
 * Local API (no HTTP). It assigns NO role: the platform-owner super-admin COMPUTES
 * ITSELF via the Users `firstUserSuperAdmin` hook (the empty-case identity — "all
 * is defined even when nothing is defined"). This script only triggers the create;
 * the computation lives in the collection, not here.
 *
 * Respects the no-bypass law: the computed role is real, and the multi-tenant
 * plugin's `userHasAccessToAllTenants = isSuperAdmin` then grants the genesis
 * tenant through the plugin. The tenant identity is COMPUTED from the email domain
 * by the follow-on genesis.ts (computed-not-hardcoded).
 *
 *   GENESIS_EMAIL=ceci@psg.bg pnpm exec tsx src/run/dev/genesis-seed.ts
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

const email = process.env.GENESIS_EMAIL || 'ceci@psg.bg'
const existing = (await payload.find({ collection: 'users', limit: 1, overrideAccess: true })).docs[0] as
  | { email?: string; roles?: string[] }
  | undefined
if (existing?.email) {
  console.log('[genesis-seed] genesis user exists:', existing.email, '— roles:', existing.roles, '— nothing to do')
  process.exit(0)
}

// NO roles assigned — the firstUserSuperAdmin hook computes super-admin from the
// empty-case identity. overrideAccess only because no user exists yet to authorize.
const created = await payload.create({ collection: 'users', data: { email, password: email }, overrideAccess: true })
console.log('[genesis-seed] genesis user minted; super-admin COMPUTED by the first-user hook:', {
  email: (created as { email?: string }).email,
  roles: (created as { roles?: unknown }).roles,
  id: created.id,
})
process.exit(0)
