/**
 * edge — the twin of src/utilities/verify/lean/Edge.lean: which request the Worker refuses before the
 * app runs, and which it only counts.
 *
 * worker.ts calls this first, before OpenNext and Payload start, so a refused request costs almost
 * nothing. RATE_LIMITER_API counts the limited classes per client (100 per 60 s, wrangler.jsonc), and
 * ANALYTICS_API receives one data point per request. Reads and pages are counted but never limited:
 * one admin page view issues dozens of reads, and the abuse worth refusing early is in sign-in, writes
 * and agents. The Lean file proves the table over every shape; test.ts checks the same laws here.
 *
 * This module has no imports: worker.ts bundles it directly.
 *
 * @standard RFC 6585 §4 429-too-many-requests
 * @standard RFC 9110 §10.2.3 retry-after
 */

export const METHODS = ['get', 'head', 'post', 'put', 'patch', 'delete', 'options'] as const
export type Method = (typeof METHODS)[number]

/** What the decision reads from a request. */
export interface Shape {
  readonly api: boolean
  readonly mcp: boolean
  readonly auth: boolean
  readonly method: Method
}

export const CLASSES = ['page', 'read', 'write', 'auth', 'agent'] as const
export type Cls = (typeof CLASSES)[number]

/** Payload's sign-in operations, the third segment of /api/<collection>/<operation>. */
const SIGN_IN = new Set(['login', 'first-register', 'forgot-password', 'reset-password', 'refresh-token', 'unlock', 'verify'])

/** A request's shape. A method outside the seven is treated as a write (POST), so it is limited. */
export const shapeOf = (pathname: string, method: string): Shape => {
  const segments = pathname.split('/').filter(Boolean)
  const api = segments[0] === 'api'
  const oauth = api && segments[1] === 'mcp' && segments[2] === 'oauth'
  const mcp = !oauth && ((segments.length === 1 && segments[0] === 'mcp') || (api && segments[1] === 'mcp'))
  const auth = oauth || (api && segments.length >= 3 && SIGN_IN.has(segments[2]!))
  const m = method.toLowerCase()
  return { api, mcp, auth, method: (METHODS as readonly string[]).includes(m) ? (m as Method) : 'post' }
}

/** GET and HEAD read; every other method writes. */
export const reads = (method: Method): boolean => method === 'get' || method === 'head'

/** The class of a request (Edge.lean `classify`). */
export const classify = (s: Shape): Cls => (s.auth ? 'auth' : s.mcp ? 'agent' : !s.api ? 'page' : reads(s.method) ? 'read' : 'write')

/** Whether the class is counted against a budget (Edge.lean `limited`). */
export const limited = (cls: Cls): boolean => cls === 'write' || cls === 'auth' || cls === 'agent'

/** A budget's key: the class and the client, so classes never share a budget. */
export const keyOf = (cls: Cls, client: string): string => `${cls}:${client}`

interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>
}
interface AnalyticsDataset {
  writeDataPoint(point: { blobs?: string[]; doubles?: number[]; indexes?: string[] }): void
}

/** The bindings the edge uses; both are optional, so local runs without them pass everything through. */
export interface EdgeEnv {
  RATE_LIMITER_API?: RateLimit
  ANALYTICS_API?: AnalyticsDataset
}

/** The client a budget belongs to: the address Cloudflare saw. */
export const clientOf = (request: Request): string => request.headers.get('cf-connecting-ip') ?? 'unknown'

/** The request's class, and a 429 when it is limited and its client is past the budget (null to pass). */
export const refuse = async (request: Request, env: EdgeEnv): Promise<{ cls: Cls; response: Response | null }> => {
  const cls = classify(shapeOf(new URL(request.url).pathname, request.method))
  if (!limited(cls) || !env.RATE_LIMITER_API) return { cls, response: null }
  const { success } = await env.RATE_LIMITER_API.limit({ key: keyOf(cls, clientOf(request)) })
  if (success) return { cls, response: null }
  return {
    cls,
    response: Response.json({ errors: [{ message: 'Too many requests. Try again in a minute.' }] }, { status: 429, headers: { 'retry-after': '60' } }),
  }
}

/** One data point per request: its class, method and status. */
export const meter = (env: EdgeEnv, cls: Cls, method: string, status: number): void => {
  env.ANALYTICS_API?.writeDataPoint({ blobs: [cls, method.toUpperCase(), String(status)], doubles: [1], indexes: [cls] })
}
