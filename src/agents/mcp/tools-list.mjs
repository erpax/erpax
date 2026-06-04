#!/usr/bin/env node
/**
 * Smoke-test Payload MCP: POST tools/list using PAYLOAD_MCP_API_KEY.
 * Loads env from `.env` then `.env.local` (local overrides). You can also `export PAYLOAD_MCP_API_KEY=...`.
 *
 * Uses `@payloadcms/sdk` (`sdk.request`) instead of raw fetch ([Payload SDK](https://github.com/payloadcms/payload/tree/main/packages/sdk)).
 *
 * Usage: `pnpm mcp:test` (with `pnpm dev` running on the target port).
 */
import { PayloadSDK } from '@payloadcms/sdk'
import dotenv from 'dotenv'
import { resolve } from 'node:path'

const root = process.cwd()
dotenv.config({ path: resolve(root, '.env'), quiet: true })
dotenv.config({ path: resolve(root, '.env.local'), override: true, quiet: true })

const key = process.env.PAYLOAD_MCP_API_KEY
const url = process.env.PAYLOAD_MCP_URL || 'http://127.0.0.1:3000/api/mcp'

if (!key) {
  console.error(`Missing PAYLOAD_MCP_API_KEY.
Add it to .env.local (gitignored), e.g.:

  PAYLOAD_MCP_API_KEY=<your-key-from-admin-mcp-api-keys>

Or export it in your shell:

  export PAYLOAD_MCP_API_KEY=<key>

Tried loading: ${resolve(root, '.env')}, ${resolve(root, '.env.local')}`)
  process.exit(1)
}

const body = {
  jsonrpc: '2.0',
  id: '1',
  method: 'tools/list',
  params: {},
}

/** Fail fast if nothing is listening (default fetch can hang a long time). */
function fetchWithTimeout(ms, href, init) {
  return fetch(href, {
    ...init,
    signal: AbortSignal.timeout(ms),
  })
}

try {
  const mcpUrl = new URL(url)
  const baseURL = `${mcpUrl.origin}/api`
  const path = mcpUrl.pathname.replace(/^\/api/, '') || '/'

  const sdk = new PayloadSDK({
    baseURL,
    fetch: (href, init) => fetchWithTimeout(15_000, href, init),
  })

  const res = await sdk.request({
    init: {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: 'application/json, text/event-stream',
      },
    },
    json: body,
    method: 'POST',
    path,
  })

  const text = await res.text()
  console.log('HTTP', res.status)
  console.log(text.slice(0, 8000))
} catch (err) {
  const code = err?.cause?.code || err?.code
  const refused = code === 'ECONNREFUSED'
  const fetchFailed =
    err instanceof TypeError &&
    (String(err.message).includes('fetch') ||
      String(err.cause?.message ?? '').includes('fetch'))

  if (refused || fetchFailed) {
    console.error(`Cannot reach MCP at ${url}
(${refused ? 'ECONNREFUSED' : err.message}).
Start the app first, e.g.:

  pnpm dev

If Next uses another port, set PAYLOAD_MCP_URL, e.g.:

  PAYLOAD_MCP_URL=http://127.0.0.1:3001/api/mcp pnpm mcp:test`)
    process.exit(1)
  }
  throw err
}
