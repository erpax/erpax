// OpenNext → Cloudflare Workers. FTL: reuse committed types/importmap (CI verifies);
// never re-derive generate:types on the deploy critical path.
import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache'

/**
 * The incremental cache was UNSET — `defineCloudflareConfig({})` — so nothing persisted a rendered
 * page and every ISR/SSG hit re-rendered inside the Worker. CPU-ms is the Workers cost driver, and
 * re-rendering a page that had not changed is the purest form of paying for it twice.
 *
 * R2 holds the entries (egress is the one dimension Cloudflare prices at 0) and `withRegionalCache`
 * puts the Cache API in front of it, so a repeat hit in the same region costs neither an R2 class-B
 * operation nor a re-render. `long-lived` re-uses an ISR entry until it is revalidated.
 *
 * The bindings for this already existed — R2 and WORKER_SELF_REFERENCE were both declared. Only the
 * config that uses them was missing, which is why the cost was invisible: nothing was broken, the
 * cheap path simply never ran.
 */
const cloudflare = defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: 'long-lived' }),
})

// The server Worker never renders UI components, so @payloadcms/ui's .scss/.svg imports are
// pure dead weight. Webpack's server-side compilation should exclude them, but esbuild still
// tries to load them. We suppress these specific errors and let esbuild continue.
const suppressUIAssetErrors = (error: { code?: string; message?: string }) => {
  if (error.code !== 'ENOENT' && error.message && error.message.includes('@payloadcms/ui')) {
    // Check if it's a missing asset file or unsupported loader issue
    if (/\.(scss|svg|png|jpg|gif)/.test(error.message)) {
      return true // Suppress the error
    }
  }
  return false
}

export default {
  ...cloudflare,
  // `pnpm build` re-runs wrangler types + payload generate:types + importmap + sitemap.
  // Those artefacts are committed; CI `payload verify-types` is the freshness gate.
  // Deploy wall-clock is dominated by Next + Worker pack — keep only that here.
  buildCommand:
    'node scripts/ensure-mcp-patch.mjs && node scripts/ensure-image-size-patch.mjs && pnpm build:next && node scripts/stub-bundle-leaves.mjs',
}
