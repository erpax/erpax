#!/usr/bin/env node
/**
 * smoke — CI and the deploy check, as a thin MCP client of the Worker under test.
 *
 * erpax is reached the way an agent reaches it: Payload's MCP gateway (`/api/mcp`, the official
 * @payloadcms/plugin-mcp) with a user's API key, through the official MCP client. The client holds no
 * erpax logic: it asks, and Payload — its auth, access control, hooks and data — answers. What it
 * checks is what an agent needs: the gateway refuses a caller without a key, serves the generic tools
 * to one with a key, and turns a failed call into an `emerging_gap` memory with its `chat` broadcast.
 *
 *   node scripts/smoke.mjs <origin>       CI: a Worker on an empty D1. The client becomes its first user
 *                                         (Payload's first-register), enables its API key, and talks MCP —
 *                                         including the failed call whose gap the afterToolCall hook records.
 *   node scripts/smoke.mjs --production   After a deploy: the pages answer and the gateway is closed to a caller
 *                                         without a key. Signed in (pnpm erpax login) or with ERPAX_API_KEY, the
 *                                         read-only conversation too (production writes nothing).
 */
import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'

import { authorizationFor } from './erpax.mjs'

/** The production origin, read from the connector's default URL so it is written down once. */
const productionOrigin = () => {
  const url = JSON.parse(readFileSync(new URL('../.mcp.json', import.meta.url), 'utf8')).mcpServers.erpax.url
  return new URL(/:-([^}]+)\}/.exec(url)?.[1] ?? url).origin
}

const production = process.argv[2] === '--production'
const origin = (production ? productionOrigin() : process.argv[2])?.replace(/\/$/, '')
if (!origin) {
  console.error('usage: node scripts/smoke.mjs <origin> | --production')
  process.exit(2)
}

/** The tools every agent's work rests on (payloadcms.com/docs/plugins/mcp). */
const GENERIC_TOOLS = ['getConfigInfo', 'getCollectionSchema', 'findDocuments', 'countDocuments', 'createDocuments', 'updateDocument', 'deleteDocuments']

const failures = []
const check = (ok, label, detail = '') => {
  console.log(`${ok ? '✓' : '✖'} ${label}${detail ? ` — ${detail}` : ''}`)
  if (!ok) failures.push(label)
  return ok
}

/** A fresh deploy can take a few seconds to reach every edge: three tries, five seconds apart. */
const answer = async (path, init, ok) => {
  let status = 0
  for (let i = 0; i < 3; i++) {
    status = await fetch(origin + path, { redirect: 'manual', signal: AbortSignal.timeout(30_000), ...init })
      .then((r) => r.status)
      .catch(() => 0)
    if (ok(status)) break
    await new Promise((resolve) => setTimeout(resolve, 5_000))
  }
  return status
}

// The Worker renders: a page that throws is a 5xx here, whatever MCP says.
for (const path of ['/', '/admin']) {
  const status = await answer(path, {}, (s) => s > 0 && s < 500)
  check(status > 0 && status < 500, `GET ${path} → ${status || 'no answer'}`)
}

// The gateway is closed to a caller without a key: an open gateway is as broken as a crashed one.
const initialize = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'erpax-ci', version: '0' } },
})
const anonymous = await answer(
  '/api/mcp',
  { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' }, body: initialize },
  (s) => s === 401,
)
check(anonymous === 401, `POST /api/mcp without a key → ${anonymous || 'no answer'}`, anonymous === 401 ? '' : 'expected 401')

// Sign-in (pnpm erpax login, or any MCP client's OAuth) starts at the 401's metadata, which must name this
// origin: a Worker that sees another host sends every client to sign in somewhere else.
const metadata = await fetch(`${origin}/api/mcp/oauth-protected-resource`, { signal: AbortSignal.timeout(30_000) })
  .then((r) => r.json())
  .catch(() => ({}))
check(metadata.resource === `${origin}/api/mcp`, 'OAuth metadata names this origin', metadata.resource ?? 'no metadata')

/**
 * How the client signs in. A sign-in kept by `pnpm erpax login` for this origin, else an agent's
 * ERPAX_API_KEY (scripts/erpax.mjs). On CI's empty database there is neither, so it becomes the first
 * user — Payload's own first-register, then the API key Payload's `useAPIKey` auth adds to `users` — and no
 * seed, script or SQL stands between CI and the app.
 */
const keyOf = async () => {
  const authorization = await authorizationFor(origin)
  if (authorization) return { authorization }
  if (production) return undefined
  const json = { 'content-type': 'application/json' }
  const registered = await fetch(`${origin}/api/users/first-register`, {
    method: 'POST',
    headers: json,
    body: JSON.stringify({ email: 'ci@erpax.invalid', password: randomUUID() }),
  })
  const { token, user } = await registered.json().catch(() => ({}))
  if (!check(registered.ok && Boolean(token), `first-register → ${registered.status}`, 'the client is the first user')) return undefined
  const apiKey = randomUUID()
  const enabled = await fetch(`${origin}/api/users/${user.id}`, {
    method: 'PATCH',
    headers: { ...json, authorization: `JWT ${token}` },
    body: JSON.stringify({ enableAPIKey: true, apiKey }),
  })
  return check(enabled.ok, `API key enabled → ${enabled.status}`) ? { authorization: `users API-Key ${apiKey}`, registered: user.id } : undefined
}

const { authorization, registered } =
  (await keyOf().catch((error) => {
    check(false, 'the client takes a key', error instanceof Error ? error.message : String(error))
  })) ?? {}
if (authorization) {
  const { Client, StreamableHTTPClientTransport } = await import('@modelcontextprotocol/client')
  const client = new Client({ name: 'erpax-ci', version: '1.0.0' })
  const transport = new StreamableHTTPClientTransport(new URL(`${origin}/api/mcp`), {
    requestInit: { headers: { authorization } },
  })
  /** A tool's text answer, its structured result, and whether the server flagged it as an error. */
  const call = async (name, args = {}) => {
    const result = await client.callTool({ name, arguments: args })
    return {
      isError: Boolean(result.isError),
      text: (result.content ?? []).map((part) => part.text ?? '').join('\n'),
      data: result.structuredContent,
    }
  }
  /** `countDocuments` answers "Collection "x" contains N matching documents." */
  const count = async (slug, where) => Number(/contains (\d+) matching/.exec((await call('countDocuments', { slug, where })).text)?.[1] ?? -1)
  try {
    await client.connect(transport)
    check(true, 'MCP initialize, signed in', client.getServerVersion()?.name ?? '')
    const { tools } = await client.listTools()
    const names = new Set(tools.map((t) => t.name))
    const missing = GENERIC_TOOLS.filter((t) => !names.has(t))
    check(missing.length === 0, `tools/list → ${tools.length} tools`, missing.length ? `missing ${missing.join(', ')}` : '')
    const config = await call('getConfigInfo')
    check(!config.isError && config.text.includes('memories'), 'getConfigInfo serves the collections', config.isError ? config.text.slice(0, 200) : '')
    if (registered) {
      // An agent acts within a tenant (its memories, its chat room). The first user has none, so it
      // onboards as any agent does, through the gateway: a tenant, then membership in it.
      const created = await call('createDocuments', { slug: 'tenants', documents: [{ data: { name: 'CI', slug: 'ci' } }] })
      const tenant = created.data?.docs?.[0]?.id
      check(Boolean(tenant), 'createDocuments → the agent’s tenant', tenant ? '' : created.text.slice(0, 200))
      const joined = await call('updateDocument', { slug: 'users', id: registered, data: { tenants: [{ tenant, roles: ['admin'] }] } })
      check(!joined.isError, 'updateDocument → the agent joins it', joined.isError ? joined.text.slice(0, 200) : '')
    }
    if (!production) {
      // A call the API cannot serve: the afterToolCall hook must turn it into a memory and a broadcast.
      const before = await count('memories', { kind: { equals: 'emerging_gap' }, key: { equals: 'countDocuments' } })
      const failed = await call('countDocuments', { slug: 'memories', where: { noSuchField: { equals: 1 } } })
      check(failed.isError, 'a failed call answers as an error', failed.text.slice(0, 120))
      const after = await count('memories', { kind: { equals: 'emerging_gap' }, key: { equals: 'countDocuments' } })
      check(after === before + 1, `the failed call is an emerging_gap memory (${before} → ${after})`)
      const broadcast = await count('chat', { event: { equals: 'gap:recorded' } })
      check(broadcast >= 1, `the gap is broadcast to chat (${broadcast})`)
    }
  } catch (error) {
    check(false, 'MCP conversation', error instanceof Error ? error.message : String(error))
  } finally {
    await client.close().catch(() => {})
  }
} else {
  console.log('· not signed in: the MCP conversation is skipped (pnpm erpax login, or ERPAX_API_KEY)')
}

if (failures.length) {
  console.error(`\n✖ ${failures.length} check(s) on ${origin} failed: ${failures.join('; ')}`)
  process.exit(1)
}
console.log(`\n✓ ${origin} answers as an agent needs it to`)
