#!/usr/bin/env tsx
/**
 * run/dev backend smoke — boots Payload via the Local API against the local
 * Miniflare D1 (getPlatformProxy) and exercises read ops. NO HTTP server needed.
 *
 * This is the handle for the layer most erpax PRs touch: services, collections,
 * hooks, double-entry GL. Copy the boot block below to call any service fn or
 * run any payload.find/create/update against the real local DB.
 *
 * Run from the repo root (tsx resolves @payload-config + @/* from tsconfig paths):
 *   pnpm exec tsx .claude/skills/run/dev/smoke.ts
 *
 * Do NOT run while `pnpm dev` is up — both open the same local D1 sqlite and
 * fight over the lock (SQLITE_BUSY). Stop the dev server first.
 *
 * NOTE on import order: everything is a *dynamic* import on purpose. Static
 * `import` statements hoist above top-level code, so any `process.env.X = ...`
 * (and dotenv) would run too late — `@payload-config` reads env at module-eval
 * time. Dynamic imports run in source order, so env is set first.
 */
// 0) tsx runs this as pure ESM, but a boot-time architecture invariant
// (src/services/agents/mcp/dry-clean.ts) lazily calls `require('node:crypto')`.
// `require` is undefined in ESM, and payload.config.ts's onInit re-throws it,
// crashing the boot. Give the ESM realm a Node require so that lazy call works.
const { createRequire } = await import('node:module')
;(globalThis as { require?: unknown }).require ??= createRequire(import.meta.url)

// 1) Load .env so PAYLOAD_SECRET is present (tsx does NOT auto-load .env).
const { config: loadEnv } = await import('dotenv')
loadEnv()

// 2) Headless boot tuning — must be set BEFORE the config module evaluates.
process.env.PAYLOAD_DISABLE_ADMIN = 'true' // skip the admin React bundle
process.env.PAYLOAD_ENABLE_GRAPHQL ??= 'false' // skip GraphQL schema build
process.env.PAYLOAD_DEV_PUSH ??= 'false' // schema already applied; don't reconcile/prompt

// 3) Now import Payload + the config.
const { getPayload } = await import('payload')
const configPromise = (await import('@payload-config')).default

const payload = await getPayload({ config: await configPromise })

const slugs = Object.keys(payload.collections)
console.log(`[smoke] Payload booted. ${slugs.length} collections registered.`)

// Prove the DB is queryable. overrideAccess so we read past row-level access.
for (const slug of ['tenants', 'users', 'pages', 'posts'] as const) {
  try {
    const { totalDocs } = await payload.count({ collection: slug, overrideAccess: true })
    console.log(`[smoke] count(${slug}) = ${totalDocs}`)
  } catch (e) {
    console.log(`[smoke] count(${slug}) FAILED: ${(e as Error).message}`)
  }
}

// Show the seeded admin user so an agent can confirm credentials exist.
const users = await payload.find({ collection: 'users', limit: 3, overrideAccess: true })
console.log('[smoke] users:', users.docs.map((u) => (u as { email?: string }).email))

console.log('[smoke] OK')
process.exit(0)
