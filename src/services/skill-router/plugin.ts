/**
 * skill-router plugin — the catch-all GATE as a Payload custom endpoint
 * ("within the limits of Payload": a `(config) => config` plugin appending to
 * `config.endpoints`, not a bespoke Next route).
 *
 * GET `/api/find/<any/path/segments>.<format>` → parse the path, resolve it
 * against the bundled skill index (the expert pool), and serve in the requested
 * format. A command IS a URL IS a query IS a skill-invocation (see `sequence`):
 * resolving the path against the corpus IS executing it.
 *
 * Access: the skill corpus is the OPEN, public-read antimatter layer, so reads
 * are unguarded here. Any extension that serves tenant DATA through this gate
 * MUST add a `req.user`/tenant check before serialization (respecting access).
 */

import type { Config, Endpoint, PayloadRequest } from 'payload'
import { SKILL_INDEX } from './skills.index'
import { parseRequest, resolveSkill } from './resolve'
import { serializeSkill } from './serialize'

const SITE = (process.env.ERPAX_SITE_URL ?? '').replace(/\/$/, '')

/** Strip everything up to and including `/find/` to get the command path. */
function commandPath(req: PayloadRequest): string {
  const raw = typeof req.url === 'string' ? req.url : ''
  let pathname = raw
  try {
    pathname = new URL(raw, 'http://localhost').pathname
  } catch {
    /* req.url was already a bare path */
  }
  const i = pathname.indexOf('/find/')
  return i >= 0 ? pathname.slice(i + '/find/'.length) : ''
}

const findEndpoint: Endpoint = {
  path: '/find/:path*',
  method: 'get',
  handler: (req: PayloadRequest) => {
    const parsed = parseRequest(commandPath(req))
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

/** Payload plugin: append the catch-all skill-router endpoint to the config. */
export const skillRouterPlugin =
  () =>
  (config: Config): Config => ({
    ...config,
    endpoints: [...(config.endpoints ?? []), findEndpoint],
  })
