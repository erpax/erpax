import { builtinModules } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

import { redirects } from './redirects'

const withNextIntl = createNextIntlPlugin('./src/i18n/request/index.ts')

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/**
 * Every Node built-in, stubbed `false` for the client bundle. The browser admin reaches the server
 * `payload` package (via @payloadcms/ui's `shared` export → VersionPillLabel) but never executes its
 * server paths, so no Node built-in can legitimately run there. Computed from Node — not hand-listed —
 * so new server leaves (dns, worker_threads, readline, net, tls…) need no further config edits.
 */
const clientNodeBuiltinFallback = Object.fromEntries(builtinModules.map((m) => [m, false]))

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

    // Payload admin client components transitively import the server `payload` package (via
    // @payloadcms/ui's `shared` export → VersionPillLabel), dragging server-only leaves into the
    // browser bundle: node:-scheme built-ins (os/console/buffer/module/worker_threads/readline…) +
    // undici (logger/pino-pretty, migration prompts) and file-type's fs-based `fileTypeFromFile`
    // (upload paths). The client never executes those server paths, so strip the node: scheme and
    // stub each server-only leaf out of the client bundle.
    if (!isServer) {
      webpackConfig.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (r: any) => {
          r.request = r.request.replace(/^node:/, '')
        }),
      )
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias ?? {}),
        undici: false,
        // file-type@21's browser entry (core.js) omits the fs-based `fileTypeFromFile`; redirect to
        // a shim that keeps the browser-safe core and stubs that one server-only export. `$` = exact
        // match so the shim's own `file-type/core` import still resolves to the real package.
        'file-type$': path.join(projectRoot, 'file-type.browser-shim.mjs'),
      }
      webpackConfig.resolve.fallback = {
        ...(webpackConfig.resolve.fallback ?? {}),
        ...clientNodeBuiltinFallback,
      }
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
