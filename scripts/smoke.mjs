#!/usr/bin/env node
/**
 * smoke — the routes a deploy must answer, checked the same way before and after it.
 *
 * CI's Worker job runs it against the Worker it built (OpenNext, served by `wrangler dev --local` on a D1
 * migrated from the baseline). The Deployed workflow runs it against production once Cloudflare has
 * built the same commit. A route that answers 5xx or not at all fails, and the MCP gateway must refuse
 * a caller without a key (401): an open gateway is as broken as a crashed one.
 *
 *   node scripts/smoke.mjs <origin>          e.g. http://127.0.0.1:8787
 *   node scripts/smoke.mjs --production      the origin in .mcp.json (the erpax connector's default)
 */
import { readFileSync } from 'node:fs'

/** The production origin, read from the connector's default URL so it is written down once. */
const productionOrigin = () => {
  const url = JSON.parse(readFileSync(new URL('../.mcp.json', import.meta.url), 'utf8')).mcpServers.erpax.url
  return new URL(/:-([^}]+)\}/.exec(url)?.[1] ?? url).origin
}

const origin = (process.argv[2] === '--production' ? productionOrigin() : process.argv[2])?.replace(/\/$/, '')
if (!origin) {
  console.error('usage: node scripts/smoke.mjs <origin> | --production')
  process.exit(2)
}

const initialize = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'smoke', version: '0' } },
})

/** Each route and the answer it must give. */
const ROUTES = [
  { path: '/', ok: (s) => s < 500 },
  { path: '/admin', ok: (s) => s < 500 },
  { path: '/api/users/me', ok: (s) => s < 500 },
  {
    path: '/api/mcp',
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: initialize,
    ok: (s) => s === 401,
    expect: '401 without a key',
  },
]

const attempt = async (route) => {
  const response = await fetch(origin + route.path, {
    method: route.method ?? 'GET',
    headers: route.headers,
    body: route.body,
    redirect: 'manual',
    signal: AbortSignal.timeout(30_000),
  })
  return response.status
}

let failed = 0
for (const route of ROUTES) {
  let status = 0
  // A fresh deploy can take a few seconds to reach every edge: three tries, five seconds apart.
  for (let i = 0; i < 3; i++) {
    status = await attempt(route).catch(() => 0)
    if (route.ok(status)) break
    await new Promise((resolve) => setTimeout(resolve, 5_000))
  }
  const pass = route.ok(status)
  if (!pass) failed++
  console.log(`${pass ? '✓' : '✖'} ${route.method ?? 'GET'} ${route.path} → ${status || 'no answer'}${pass ? '' : ` (expected ${route.expect ?? 'below 500'})`}`)
}
if (failed) {
  console.error(`\n✖ ${failed} route(s) on ${origin} did not answer as a deploy must`)
  process.exit(1)
}
console.log(`\n✓ ${origin} answers every smoke route`)
