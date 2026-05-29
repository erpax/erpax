/**
 * skill-router — the ONE catch-all, the fallback of all.
 *
 * Appended LAST to `config.endpoints` (via a plugin registered last), so it is
 * the fallback: Payload matches collection/global routes by slug, then its
 * earlier endpoints (first-match-wins over `config.endpoints`), and only a
 * routeless `/api/...` path falls through to here. No named route — the single
 * universal path `/:path*` catches everything left.
 *
 * It parses the routeless path, resolves it against the skill corpus (the
 * deterministic content-addressed gate — exact-path → leaf-word → semantic),
 * and serves the requested `.format` (md/json/svg-QR/html). A command IS a URL
 * IS a query IS a skill-invocation; resolving the path IS executing it.
 *
 * Access: the skill corpus is the open, public-read antimatter layer. Any
 * extension that serves tenant DATA through this gate MUST add a `req.user`/
 * tenant check before serialization (respecting access).
 */

import type { Config, Endpoint, PayloadRequest } from 'payload'
import { SKILL_INDEX } from './skills.index'
import { parseRequest, resolveSkill } from './resolve'
import { serializeSkill } from './serialize'

const SITE = (process.env.ERPAX_SITE_URL ?? '').replace(/\/$/, '')

// Reserved namespaces the catch-all must NOT swallow — the Payload analogue of
// ceccec/erpax's route constraint `exclude %w[rails system admin]`. These have
// their own handlers; even though Payload matches them earlier (last-position
// fallback), guard explicitly so the gate never tries to resolve them as skills.
const RESERVED = new Set(['graphql', 'graphql-playground', 'access', 'admin', '_next', 'payload-preferences'])

/** The routeless path: everything after the `/api` mount, slashes trimmed. */
function commandPath(req: PayloadRequest): string {
  const raw = typeof req.url === 'string' ? req.url : ''
  let pathname = raw
  try {
    pathname = new URL(raw, 'http://localhost').pathname
  } catch {
    /* req.url was already a bare path */
  }
  return pathname.replace(/^\/+/, '').replace(/^api\/?/, '').replace(/^\/+/, '')
}

const catchAll: Endpoint = {
  path: '/:path*',
  method: 'get',
  handler: (req: PayloadRequest) => {
    const cmd = commandPath(req)
    const firstSegment = cmd.split('/')[0]?.toLowerCase()
    // constraint (mirrors ceccec/erpax): never swallow a reserved namespace.
    if (!firstSegment || RESERVED.has(firstSegment)) {
      return Response.json({ error: 'not a skill path' }, { status: 404 })
    }
    const parsed = parseRequest(cmd)
    if (parsed.segments.length === 0) {
      return Response.json({ error: 'empty path' }, { status: 404 })
    }

    const { matched, candidates } = resolveSkill(parsed, SKILL_INDEX)
    if (!matched) {
      return Response.json(
        {
          error: 'no skill resolves this path',
          query: { verb: parsed.verb, segments: parsed.segments, format: parsed.format },
          nearest: candidates.map((c) => c.name),
        },
        { status: 404 },
      )
    }

    const served = serializeSkill(matched, parsed.format, SITE)
    if (served.kind === 'redirect') {
      return new Response(null, { status: 302, headers: { Location: served.location } })
    }
    return new Response(served.body, {
      status: 200,
      headers: { 'Content-Type': served.contentType, 'Cache-Control': 'public, max-age=300' },
    })
  },
}

/**
 * Register the catch-all. MUST be the LAST plugin in `config.plugins` so its
 * endpoint is appended after every other endpoint — the fallback of all.
 */
export const skillRouterPlugin =
  () =>
  (config: Config): Config => ({
    ...config,
    endpoints: [...(config.endpoints ?? []), catchAll],
  })
