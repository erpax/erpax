#!/usr/bin/env tsx
/**
 * run/dev/fuse-mcp-key — fuse local ADMIN_API_KEY onto production super-admin MCP.
 *
 * Two paths (self-computable; prefer the one whose seeds are present):
 *
 * 1. **Remote login fuse** (no local PAYLOAD_SECRET):
 *    - Requires ADMIN_API_KEY in `.env`
 *    - Logs into ERPAX_FUSE_URL (default https://erpax.ceci.workers.dev) as
 *      ERPAX_FUSE_EMAIL / ERPAX_FUSE_PASSWORD (or GENESIS_EMAIL)
 *    - PATCHes the owner's `payload-mcp-api-keys` row so the Worker recomputes
 *      `api_key_index = HMAC-SHA256(PAYLOAD_SECRET, ADMIN_API_KEY)`
 *
 * 2. **Local secret fuse** (D1 SQL):
 *    - Requires ADMIN_API_KEY + PAYLOAD_SECRET (must match the Worker's secret)
 *    - Prints the exact `api_key_index` + wrangler UPDATE (does not print secrets)
 *    - Note: `wrangler secret list` shows PAYLOAD_SECRET exists on the Worker,
 *      but Cloudflare does not expose its value — copy it into local `.env` once.
 *
 * Super-admin is DERIVED: roles includes `admin` ∧ empty tenants — ensure the
 * key owner has `admin` in users.roles (not only a stored `super-admin` label).
 *
 * Bearer on `/api/users` → 403 is EXPECTED (MCP keys are not REST API keys).
 * Probe success is `/api/mcp` tools/list, not REST.
 *
 *   pnpm exec tsx src/run/dev/fuse-mcp-key.ts
 */
const { createRequire } = await import('node:module')
;(globalThis as { require?: unknown }).require ??= createRequire(import.meta.url)
const { config: loadEnv } = await import('dotenv')
const { createHmac } = await import('node:crypto')
loadEnv()

const ADMIN_API_KEY = process.env.ADMIN_API_KEY?.trim()
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET?.trim()
const BASE = (process.env.ERPAX_FUSE_URL || 'https://erpax.ceci.workers.dev').replace(/\/$/, '')
const email = process.env.ERPAX_FUSE_EMAIL || process.env.GENESIS_EMAIL || 'admin@erpax.com'
const password = process.env.ERPAX_FUSE_PASSWORD?.trim()

/** Cloudflare Browser Integrity (1010) blocks bare curl/python UAs. */
const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'

if (!ADMIN_API_KEY) {
  console.error('[fuse-mcp-key] missing ADMIN_API_KEY in .env')
  process.exit(2)
}

function indexOf(secret: string, key: string): string {
  return createHmac('sha256', secret).update(key).digest('hex')
}

async function fetchJson(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<{ status: number; json: unknown; text: string }> {
  const { timeoutMs = 90_000, headers, ...rest } = init
  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: 'application/json',
      'User-Agent': BROWSER_UA,
      ...(headers as Record<string, string> | undefined),
    },
    signal: AbortSignal.timeout(timeoutMs),
  })
  const text = await res.text()
  let json: unknown = null
  try {
    json = JSON.parse(text)
  } catch {
    /* non-JSON */
  }
  return { status: res.status, json, text }
}

if (PAYLOAD_SECRET) {
  const idx = indexOf(PAYLOAD_SECRET, ADMIN_API_KEY)
  console.log('[fuse-mcp-key] local HMAC path — api_key_index computed (value not printed)')
  console.log('[fuse-mcp-key] apply with wrangler (replace USER_ID):')
  console.log(
    `  npx wrangler d1 execute erpax --remote --command "UPDATE payload_mcp_api_keys SET api_key_index='${idx}', enable_a_p_i_key=1, label='ADMIN_API_KEY fuse' WHERE user_id='USER_ID';"`,
  )
  console.log('[fuse-mcp-key] index_prefix', idx.slice(0, 12))
}

if (!password) {
  if (!PAYLOAD_SECRET) {
    console.error(
      '[fuse-mcp-key] blocker: set ERPAX_FUSE_PASSWORD (login fuse) or PAYLOAD_SECRET (D1 HMAC fuse; must match Worker secret)',
    )
    console.error(
      '[fuse-mcp-key] Worker already has PAYLOAD_SECRET (wrangler secret list) but the value is not readable from here',
    )
    process.exit(3)
  }
  process.exit(0)
}

const login = await fetchJson(`${BASE}/api/users/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
const loginJson = login.json as {
  token?: string
  user?: { id?: string; email?: string; roles?: string[]; tenants?: unknown[] }
  errors?: unknown
}
if (login.status >= 400 || !loginJson.token || !loginJson.user?.id) {
  console.error('[fuse-mcp-key] login failed', login.status, loginJson.errors ?? loginJson)
  process.exit(4)
}

const roles = loginJson.user.roles ?? []
const tenantsLen = Array.isArray(loginJson.user.tenants) ? loginJson.user.tenants.length : 0
const derivedSuper = roles.includes('admin') && tenantsLen === 0
console.log('[fuse-mcp-key] logged in', loginJson.user.email, {
  roles,
  tenantsLen,
  derivedSuperAdmin: derivedSuper,
})
if (!derivedSuper) {
  console.warn(
    '[fuse-mcp-key] owner is not derived super-admin (need roles⊇admin ∧ empty tenants) — MCP may auth but seed/privileged ops will 403',
  )
}

const token = loginJson.token
const keys = await fetchJson(`${BASE}/api/payload-mcp-api-keys?limit=5&depth=0`, {
  headers: { Authorization: `JWT ${token}` },
})
const keysJson = keys.json as { docs?: Array<{ id: string }>; errors?: unknown }
const keyId = keysJson.docs?.[0]?.id
if (!keyId) {
  console.error('[fuse-mcp-key] no payload-mcp-api-keys row for owner — create one in admin first')
  process.exit(5)
}

const patch = await fetchJson(`${BASE}/api/payload-mcp-api-keys/${keyId}`, {
  method: 'PATCH',
  headers: {
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    enableAPIKey: true,
    apiKey: ADMIN_API_KEY,
    label: 'ADMIN_API_KEY fuse',
    description: 'Fused from local ADMIN_API_KEY',
    user: loginJson.user.id,
  }),
})
const patchJson = patch.json as { doc?: { id?: string }; errors?: unknown }
console.log('[fuse-mcp-key] patch', patch.status, patchJson.doc?.id ?? patchJson.errors)

// MCP probe — short timeout; full-barrel Workers hang (CF 1102) until seed+lean deploy.
const mcp = await fetchJson(`${BASE}/api/mcp`, {
  method: 'POST',
  timeoutMs: 25_000,
  headers: {
    Authorization: `Bearer ${ADMIN_API_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  },
  body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }),
}).catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err)
  console.error('[fuse-mcp-key] mcp tools/list timed out / failed:', msg)
  console.error(
    '[fuse-mcp-key] if auth is fused, deploy MCP seed surface (ERPAX_MCP_SEED lean) — full barrel hangs the isolate',
  )
  process.exit(6)
})
console.log('[fuse-mcp-key] mcp tools/list', mcp.status, mcp.text.slice(0, 240))
process.exit(mcp.status < 400 ? 0 : 6)
