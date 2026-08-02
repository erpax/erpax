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
    // Aligned to payloadcms/website: `@use '@scss/common.scss'` resolves to the ported css/ system. Staged
    // migration from Tailwind — the two coexist until every component is on SCSS modules.
    resolveAlias: {
      '@scss': path.resolve(projectRoot, 'src/app/(frontend)/css/'),
    },
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
  // `sass` is a BUILD-TIME SCSS compiler — .scss is already compiled to CSS during the build, so the
  // 5MB `sass.dart.js` in the RUNTIME server bundle is pure dead weight (no runtime code imports it).
  // Externalize it (with jose/pg/sharp) so it never ships in the Worker.
  // `typescript` is NOT listed here — listing it as external would leave
  // `require('typescript')` for OpenNext/esbuild to re-resolve into the real
  // 8.6 MiB package. The webpack fold below swaps it for stubs/typescript.js.
  serverExternalPackages: ['jose', 'pg-cloudflare', 'sharp', 'sass'],
  // …and externalising is only HALF the job, which the artifact proved. `serverExternalPackages`
  // stops webpack INLINING a package into a chunk; it does not stop Next's file tracing from
  // COPYING it into the server function's node_modules. Measured on the built Worker:
  // `server-functions/default/node_modules/.pnpm/sass@1.77.4/…/sass.dart.js` — 4.7 MB, shipped,
  // while the comment above said it "never ships in the Worker". The claim was true of the
  // bundler and false of the artifact, and nothing checked the artifact.
  //
  // Tracing is the second door. sass is not in dependencies OR devDependencies — it arrives
  // transitively for .scss compilation at build time, and no runtime code imports it.
  outputFileTracingExcludes: {
    '**/*': [
      '**/node_modules/sass/**',
      '**/node_modules/.pnpm/sass@*/**',
    ],
  },
  // Next's post-compile type-check re-runs tsc over the whole type graph and stack-overflows
  // ("Maximum call stack size exceeded") on this corpus. Types are already gated by `pnpm check`
  // (tsx src/cli gate) and `payload generate:types`; skip the redundant, fragile in-build pass.
  typescript: { ignoreBuildErrors: true },
  webpack: (webpackConfig: any, { isServer, webpack }: { isServer: boolean; webpack: any }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // QUANTUM FOLD — the deployed Worker must ship the standards-computable ERP core, never the
    // dev/meta corpus. These heavy data leaves are reachable from the collection/admin graph
    // through the rules/cycle SCC (many edges), but none is read on an ERP request path. Rather
    // than gate every edge (linear), swap each leaf for an empty stub in PRODUCTION — one mechanism
    // cuts the bytes regardless of which edge reaches them. Dev, tests (vitest never loads
    // next.config) and `payload generate:types` all use the real modules, so the corpus stays whole
    // everywhere except the shipped bundle.
    //
    // CRITICAL: apply on CLIENT too. Admin field components (MatrixBondField → @/uuid/matrix)
    // otherwise pull the full ~4 MiB matrix.generated.ts + seal/diamond createRequire into the
    // browser — measured 14 MiB of /admin HTML-referenced assets, TTFB multi-second. FTL:
    // reuse(precomputed stub address) ≠ search(full matrix) — see src/quantum/ftl/admin/index.ts.
    if (process.env.NODE_ENV === 'production') {
      const stub = (rel: string) => path.resolve(projectRoot, rel)
      const swap = (pattern: RegExp, rel: string) =>
        webpackConfig.plugins.push(new webpack.NormalModuleReplacementPlugin(pattern, stub(rel)))
      swap(/uuid[\\/]matrix[\\/]matrix\.generated(\.ts)?$/, 'stubs/matrix.generated.js')
      swap(/[\\/]translations[\\/]catalogue(\.ts)?$/, 'stubs/translations-catalogue.js')
      swap(/agents[\\/]mcp[\\/]tool-defs(\.ts)?$/, 'stubs/tool-defs.js')
      swap(/agents[\\/]mcp[\\/]atom-catalogue\.generated(\.ts)?$/, 'stubs/atom-catalogue.js')
      // Alias beats NormalModuleReplacement for package-name externals — Next was leaving
      // `require("typescript")` unresolved so OpenNext/esbuild re-pulled the real 8.6 MiB package.
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias ?? {}),
        typescript$: stub('stubs/typescript.js'),
        typescript: stub('stubs/typescript.js'),
        'next/og$': stub('stubs/next-og.js'),
        'next/og': stub('stubs/next-og.js'),
        'next/dist/compiled/@vercel/og/index.edge.js': stub('stubs/next-og.js'),
      }
      swap(/^typescript$/, 'stubs/typescript.js')
      swap(/[\\/]next[\\/]og([\\/]index)?$/, 'stubs/next-og.js')
      swap(/[\\/]@vercel[\\/]og([\\/]index\.edge)?$/, 'stubs/next-og.js')
      swap(/next[\\/]dist[\\/]compiled[\\/]@vercel[\\/]og[\\/]index\.edge\.js$/, 'stubs/next-og.js')
      // Client seal leak: seal/diamond use createRequire(node:module) — never execute in browser.
      // Anchor on src/ so skill/router/upgrade/seal etc. are not swapped.
      if (!isServer) {
        swap(/[\\/]src[\\/]seal[\\/]index(\.ts)?$/, 'stubs/seal-client.js')
        swap(/[\\/]src[\\/]diamond[\\/]index(\.ts)?$/, 'stubs/diamond-client.js')
        swap(/[\\/]src[\\/]css[\\/]index(\.ts)?$/, 'stubs/css-index-client.js')
        swap(/[\\/]src[\\/]skill[\\/]router[\\/]skills\.index(\.ts)?$/, 'stubs/skills-index.js')
      }
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
