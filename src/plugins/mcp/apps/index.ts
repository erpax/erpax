/**
 * plugins/mcp/apps — one MCP server per app, at `<app>.<domain>/mcp`.
 *
 * `<app>.erpax.com/mcp` is a different aspect of erpax from `erpax.com/<app>`: the second is the
 * app's pages, the first is the app as a machine-readable server. The host says which app, so there
 * is still ONE endpoint, `/api/mcp`, and it answers by host: on `<app>.<domain>` it serves that app's
 * collections and nothing else; on any other host it is the gateway, unchanged. (The middleware
 * rewrites `/mcp` on an app host to `/api/mcp`.)
 *
 * The gateway serves a seed of collections because the whole barrel in one isolate overruns a Worker.
 * An app is a bounded slice of the barrel, so its server can carry ALL of its own collections.
 *
 * It is the official `@payloadcms/plugin-mcp`, not a copy: the plugin is run once per app against a
 * scratch config and the handlers it registers are lifted out. So the auth (the same
 * `payload-mcp-api-keys`), the tools and the access gating — every call runs under the key owner's
 * request — are the plugin's own. This adds handlers only: no collection, no field, no migration.
 * Put it AFTER the main `mcpPlugin` and the app plugins, so the final collection list exists.
 *
 * @standard ISO/IEC 27001 §A.9.4.1 information access restriction — a server reaches only its app
 * @see node_modules/@payloadcms/plugin-mcp/dist/index.js (the handlers this lifts)
 * @see src/packages/engine/index.ts (`partition`: which collection belongs to which app · `appOfHost`)
 */
import type { CollectionSlug, Config, Endpoint, Plugin } from 'payload'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { appOfHost, partition, type App } from '@/packages/engine'
import type { Iso27002ControlId } from '@/utilities/iso/27002'

/**
 * Canonical ISO 27002:2022 controls this module exercises:
 *   5.15 — Access control (an app's host reaches only that app's collections)
 *   5.23 — Cloud services (per-app, per-tenant separation of the machine interface)
 *   8.3  — Information access restriction (the plugin's own gating runs under the key owner)
 */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = ['5.15', '5.23', '8.3'] as const

/** The collections of each app, by the same computation that places them in its plugin. */
export const appSlugs = (collections: ReadonlyArray<{ readonly slug: string }>, apps: readonly App[]): Map<string, string[]> => {
  const owner = partition(collections as Parameters<typeof partition>[0], apps)
  const bySlug = new Map<string, string[]>(apps.map((app) => [app.slug, []]))
  for (const { slug } of collections) bySlug.get(owner.get(slug) ?? '')?.push(slug)
  return bySlug
}

/** The plugin's own `/mcp` endpoints for ONE app's collections, by method. */
const handlersFor = (config: Config, slugs: readonly string[]): Map<string, Endpoint['handler']> => {
  const scratch = { ...config, collections: [], endpoints: [], plugins: [] } as Config
  const run = mcpPlugin({
    collections: Object.fromEntries(slugs.map((slug) => [slug, { enabled: true }])) as Partial<Record<CollectionSlug, { enabled: true }>>,
  })
  const lifted = (run(scratch) as Config).endpoints ?? []
  return new Map(lifted.filter((e) => e.path === '/mcp').map((e) => [e.method, e.handler]))
}

/** The host a request was made to, behind a proxy or not. */
const hostOf = (req: { headers: Headers }): string => req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? ''

/**
 * The MCP transport matches the request's own path against `<api>/mcp`. The middleware rewrites
 * `<app>.<domain>/mcp` to `/api/mcp`, but the handler still sees `/mcp`; give it the canonical path.
 */
const canonical = <R extends { url?: string }>(req: R): R => {
  if (!req.url) return req
  const url = new URL(req.url)
  if (url.pathname.startsWith('/api/')) return req
  url.pathname = '/api/mcp'
  Object.defineProperty(req, 'url', { value: url.toString(), configurable: true })
  return req
}

/** Answer `/mcp` by host: an app's host gets that app's server, any other host the gateway. */
export const appMcp = (apps: readonly App[]): Plugin => Object.assign(dispatch(apps), { order: AFTER_GATEWAY })

/** Payload runs plugins in ascending `order` (default 0); `mcpPlugin` is 10 and adds the `/mcp` this wraps. */
const AFTER_GATEWAY = 20

const dispatch =
  (apps: readonly App[]): Plugin =>
  (config) => {
    const slugs = appSlugs(config.collections ?? [], apps)
    const servers = new Map(
      apps.flatMap((app) => {
        const own = slugs.get(app.slug) ?? []
        return own.length === 0 ? [] : ([[app.slug, handlersFor(config, own)]] as const)
      }),
    )
    const endpoints = (config.endpoints ?? []).map((endpoint): Endpoint => {
      if (endpoint.path !== '/mcp') return endpoint
      const gateway = endpoint.handler
      return {
        ...endpoint,
        handler: (req) => {
          const app = appOfHost(hostOf(req), apps)
          const handler = app ? servers.get(app.slug)?.get(endpoint.method) : undefined
          return (handler ?? gateway)(canonical(req))
        },
      }
    })
    return { ...config, endpoints }
  }
