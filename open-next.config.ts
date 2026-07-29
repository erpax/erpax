// OpenNext → Cloudflare Workers. FTL: reuse committed types/importmap (CI verifies);
// never re-derive generate:types on the deploy critical path.
import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'

const cloudflare = defineCloudflareConfig({})

// The server Worker never renders UI components, so @payloadcms/ui's .scss/.svg imports are
// pure dead weight. Webpack's server-side compilation should exclude them, but esbuild still
// tries to load them. We suppress these specific errors and let esbuild continue.
const suppressUIAssetErrors = (error) => {
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
  buildCommand: 'pnpm build:next && node scripts/stub-bundle-leaves.mjs',
}
