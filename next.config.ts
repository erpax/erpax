import { builtinModules, createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

import { redirects } from './redirects'
import { PRODUCTION_FOLDS } from './src/deploy/fold'

const withNextIntl = createNextIntlPlugin('./src/i18n/request/index.ts')

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/**
 * The real browser core of `file-type`, resolved THROUGH the package that depends on it.
 *
 * `file-type` is transitive, so there is no root `node_modules/file-type` to name and no
 * absolute path worth committing (pnpm's directory carries a version hash). Resolving it at
 * config load keeps the answer computed rather than declared — and the shim imports it under
 * `@erpax-shim/file-type-core` so the browser alias on `file-type` cannot swallow it.
 */
const fileTypeCoreAbs = createRequire(
  createRequire(import.meta.url).resolve('payload'),
).resolve('file-type/core')
/** Turbopack resolves an alias value relative to the project root; webpack takes the absolute. */
const fileTypeCore = './' + path.relative(projectRoot, fileTypeCoreAbs)

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
    /*
     * The webpack fold below, ported — because webpack is 172s and the only lever left on the
     * deploy budget is not running it.
     *
     * webpack says `resolve.fallback[builtin] = false`; Turbopack has no `false`, so absence has
     * to be a module (.stubs/empty.js), and `{ browser: … }` expresses the condition webpack
     * wrote as `if (!isServer)`. Both spellings are aliased — `fs` and `node:fs` — which is the
     * job NormalModuleReplacementPlugin(/^node:/) did by rewriting the request. Computed from
     * Node's own builtinModules, never hand-listed, so a new server leaf needs no edit here.
     */
    resolveAlias: {
      ...Object.fromEntries(
        builtinModules.flatMap((m) => [
          [m, { browser: './.stubs/empty.cjs' }],
          ['node:' + m, { browser: './.stubs/empty.cjs' }],
        ]),
      ),
      undici: { browser: './.stubs/empty.cjs' },
      /*
       * The heavy packages the webpack fold already stubs, ported — and here they buy more than
       * bytes. Turbopack names an EXTERNAL by a hash (`typescript-83612171b3bf79b8`), which is
       * what OpenNext's esbuild pass cannot resolve and the whole reason `--webpack` was pinned.
       * A package that is ALIASED to a stub is not an external: it is bundled, it is 200 bytes,
       * and there is no hashed name for esbuild to fail on.
       */
      typescript: './.stubs/typescript.js',
      'next/og': './.stubs/next-og.js',
      // drizzle-kit is the MIGRATION toolchain — payload reaches `drizzle-kit/api` behind a lazy
      // require for `migrate:create`, which a Worker never runs. Under webpack it stayed an
      // unresolved require nobody called; under Turbopack it becomes another hashed external and
      // esbuild stops on it. Stubbed, it is neither.
      'drizzle-kit/api': './.stubs/empty.cjs',
      'drizzle-kit': './.stubs/empty.cjs',
      /*
       * The shim adds ONE export the browser build of file-type omits (`fileTypeFromFile`, an
       * fs path payload names and the browser never runs) and re-exports the rest of the real
       * core. That re-export is the whole difficulty: Turbopack matches an alias by PREFIX, so
       * aliasing `file-type` also captures `file-type/core` and the shim resolves to itself.
       * webpack's `$` exact-match suffix does not apply here.
       *
       * So the shim imports the core under a name of its own, resolved at config load: file-type
       * is a TRANSITIVE dependency (no `node_modules/file-type` at the root), so the path is
       * found through the package that depends on it rather than written down.
       */
      '@erpax-shim/file-type-core': fileTypeCore,
      'file-type': { browser: './file-type.browser-shim.mjs' },
    },
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
  //
  // TURBOPACK, since 2026-09-02. `--webpack` was pinned in May because Turbopack emits hashed
  // externals (`typescript-83612171b3bf79b8`, `drizzle-kit-8c53b399dac79e94/api`) that esbuild in
  // opennextjs-cloudflare cannot resolve. That is true, and it is not a property of Turbopack —
  // it is what happens to a package left EXTERNAL. Each one is now aliased to a stub in the
  // turbopack block above, so it is bundled at ~200 bytes and has no hashed name to fail on.
  //
  //   next build --webpack    172s   +  OpenNext pack
  //   next build --turbopack   99s   +  OpenNext pack 22s   =  121s end to end
  // `sass` is a BUILD-TIME SCSS compiler — .scss is already compiled to CSS during the build, so the
  // 5MB `sass.dart.js` in the RUNTIME server bundle is pure dead weight (no runtime code imports it).
  // Externalize it (with jose/pg/sharp) so it never ships in the Worker.
  // `typescript` is NOT listed here — listing it as external would leave
  // `require('typescript')` for OpenNext/esbuild to re-resolve into the real
  // 8.6 MiB package. The webpack fold below swaps it for .stubs/typescript.js.
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
      // Every src-path fold lives in src/deploy/fold, beside a test that re-derives each
      // pattern against the tree. A pattern is a CLAIM about a path, and the path moves:
      // `matrix.generated.ts` became `matrix/generated.ts` in the 49-rename scalpel pass and
      // the pattern kept naming the old one — so the fold silently stopped folding and ~4 MiB
      // of corpus matrix shipped until Cloudflare refused the upload.
      for (const fold of PRODUCTION_FOLDS) {
        if (fold.side === 'client' && isServer) continue
        swap(fold.pattern, fold.stub)
      }
      // Alias beats NormalModuleReplacement for package-name externals — Next was leaving
      // `require("typescript")` unresolved so OpenNext/esbuild re-pulled the real 8.6 MiB package.
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias ?? {}),
        typescript$: stub('.stubs/typescript.js'),
        typescript: stub('.stubs/typescript.js'),
        'next/og$': stub('.stubs/next-og.js'),
        'next/og': stub('.stubs/next-og.js'),
        'next/dist/compiled/@vercel/og/index.edge.js': stub('.stubs/next-og.js'),
      }
      swap(/^typescript$/, '.stubs/typescript.js')
      swap(/[\\/]next[\\/]og([\\/]index)?$/, '.stubs/next-og.js')
      swap(/[\\/]@vercel[\\/]og([\\/]index\.edge)?$/, '.stubs/next-og.js')
      swap(/next[\\/]dist[\\/]compiled[\\/]@vercel[\\/]og[\\/]index\.edge\.js$/, '.stubs/next-og.js')
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
        // The shim imports the real core under this name so the TURBOPACK alias on `file-type`
        // (prefix-matched) cannot swallow it. webpack reaches the same shim, so it needs the
        // same name — one shim, both compilers.
        '@erpax-shim/file-type-core': fileTypeCoreAbs,
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
