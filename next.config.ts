import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

import { redirects } from './redirects'

const withNextIntl = createNextIntlPlugin('./src/i18n/request/index.ts')

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /** Webpack otherwise defaults to ~CPU-count workers for page-data collection and overwhelms Miniflare D1. */
    cpus: 1,
    /** Local Wrangler/Miniflare D1 can SQLITE_BUSY when many workers hit the DB during prerender. */
    staticGenerationRetryCount: 5,
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 999,
    /**
     * Avoid reusing prefetched static segments across locale switches; otherwise
     * shared layouts can briefly show the previous locale until `staleTimes` elapses.
     * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/staleTimes
     */
    staleTimes: {
      dynamic: 0,
      /** Next.js 16 requires static staleTime ≥ 30 (see invalid-next-config warning). */
      static: 30,
    },
  },
  // Windows Turbopack + Payload UI SCSS (see Next.js issue #86431)
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    qualities: [100],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  // https://opennext.js.org/cloudflare/howtos/workerd
  // Use webpack for `next build` (see build script) so server chunks use resolvable package names; Turbopack can emit
  // hashed externals (sharp-*, drizzle-kit-*/api) that esbuild in `opennextjs-cloudflare` cannot resolve.
  serverExternalPackages: ['jose', 'pg-cloudflare', 'sharp'],
  webpack: (webpackConfig: any, { isServer, webpack }: { isServer: boolean; webpack: any }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Client field components from payload plugins (plugin-seo, plugin-import-export) transitively
    // import the server `payload` package, dragging node:-scheme built-ins (node:os/console/buffer/
    // module…) and undici into the browser bundle. The client never executes those server paths, so
    // strip the node: scheme and stub the server-only built-ins + undici out of the client bundle.
    if (!isServer) {
      webpackConfig.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (r: any) => {
          r.request = r.request.replace(/^node:/, '')
        }),
      )
      webpackConfig.resolve.alias = { ...(webpackConfig.resolve.alias ?? {}), undici: false }
      webpackConfig.resolve.fallback = {
        ...(webpackConfig.resolve.fallback ?? {}),
        os: false, fs: false, path: false, module: false, buffer: false,
        crypto: false, stream: false, util: false, console: false, async_hooks: false, child_process: false,
      }
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
