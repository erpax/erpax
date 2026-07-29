// OpenNext → Cloudflare Workers. FTL: reuse committed types/importmap (CI verifies);
// never re-derive generate:types on the deploy critical path.
import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'

const cloudflare = defineCloudflareConfig({})

export default {
  ...cloudflare,
  // `pnpm build` re-runs wrangler types + payload generate:types + importmap + sitemap.
  // Those artefacts are committed; CI `payload verify-types` is the freshness gate.
  // Deploy wall-clock is dominated by Next + Worker pack — keep only that here.
  buildCommand: 'pnpm build:next',
}
