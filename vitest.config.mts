import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { needsPayload } from './src/test/index'

/**
 * Vitest Configuration — pure/payload PROJECT SPLIT.
 *
 * WHY the split (the magnitudes fix the single-project config's own comment named): only ~80 of the
 * ~1478 co-located suites actually boot Payload (a collection, a service, `req.payload`, getPayload).
 * The other ~1400 are PURE atom tests — content-uuid math, folds, ratchet counts, string ops — that
 * need no DB. Running all 1478 under one `payload-integration` project with `isolate:true` +
 * `fileParallelism:false` made every pure test pay the isolation/boot overhead, the heap accumulated
 * across the roster, the grind thrashed / OOMed, and a stray integration watcher could hang the batch.
 *
 * The split routes each suite by CONTENT (computed at load, never a hand-list): a suite that references
 * the Payload runtime runs in `payload-integration` (globalSetup boots once, isolate:true, serial for
 * D1 safety); everything else runs in `unit` (no boot, no setup, isolate:false, parallel — fast).
 *
 * The vitest config is NOT part of a suite's receipt closure (gate/receipt hashes file + imports +
 * schema, not this file), so this split does not invalidate a single sealed receipt.
 *
 * @see https://payloadcms.com/docs/test/overview · src/gate/receipt (the closure hash)
 */

// ── Classify suites by whether they touch the Payload runtime ────────────────
const ROOT = process.cwd()
const TEST_RE = /(^|[/\\])(test|.*\.test)\.tsx?$/
const walk = (dir: string, acc: string[] = []): string[] => {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return acc
  }
  for (const e of entries) {
    if (e === 'node_modules' || e === 'skills' || e.startsWith('.')) continue
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, acc)
    else if (TEST_RE.test(e)) acc.push(relative(ROOT, p).split(sep).join('/'))
  }
  return acc
}
// `packages` carries the release-pipeline suite (packages/test.ts — the content-addressed
// version manifest + build reproducibility). A suite outside the runner's globs is a check
// that cannot fire ([[rules]]/unraised), so the release gate is discovered here too.
const allSuites = [...walk(join(ROOT, 'src')), ...walk(join(ROOT, 'packages'))]
// Which suites touch the Payload runtime is decided by `needsPayload` in src/test — the same answer
// `erpax test waves` groups its batches by, so the routing here and the grouping there cannot drift.
const integration: string[] = []
const unit: string[] = []
for (const s of allSuites) (needsPayload(s, ROOT) ? integration : unit).push(s)

const shared = {
  environment: 'node' as const,
  globals: false,
  clearMocks: true,
  restoreMocks: true,
  // Realtime OFF by default in tests: an enabled watch opens persistent subscribe() connections that
  // keep Node's event loop alive, so a suite that starts one (e.g. the monitor/violations loop) hangs
  // vitest teardown ("something prevents the main process from exiting"). Poll-only fallback is unref'd.
  // A test that needs the enabled path sets process.env.ERPAX_REALTIME in-test.
  env: {
    ERPAX_REALTIME: 'off',
    // Unit suites that transitively import payload.config (e.g. blocks barrel → archive Component)
    // need a sealed secret; CI sets this on the job, local/waves inherit here.
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ?? 'test-secret-not-for-production-32-characters',
  },
  // CSS is a diamond facet (@/css/load-hook) — stub .css when Payload UI is pulled into unit suites.
  // Vitest 4: execArgv is top-level (poolOptions removed).
  pool: 'forks' as const,
  execArgv: ['--import', './src/css/load-hook.mjs'],
  // next-intl is INLINED so Vite resolves its imports; `next` ships no `exports` map, so a
  // bare `import 'next/navigation'` is unresolvable under Node's ESM loader (no extension search)
  // and every suite that reaches a next-intl navigation helper died on ERR_MODULE_NOT_FOUND —
  // in the app the bundler resolves it, so the break is visible only here.
  server: {
    deps: {
      external: [/[/\\]skills\.index(?:\.ts)?$/],
      inline: [/[/\\]next-intl[/\\]/],
    },
  },
  exclude: [...configDefaults.exclude, 'src/skills/**'],
}

export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  // skills.index.ts is ~80MB of inline JSON — Vite/SWC transform blows up; load it via native ESM.
  ssr: { external: [/[/\\]skills\.index(?:\.ts)?$/] },
  test: {
    projects: [
      {
        plugins: [react()],
        resolve: { tsconfigPaths: true },
        test: {
          ...shared,
          name: 'unit',
          include: unit.length ? unit : ['src/**/__no_pure_suites__.test.ts'],
          // `**/*.test.tsx` never matches a file NAMED `test.tsx`, which is what this corpus's
          // trinity law requires — so every React atom's proof was falling through to the node
          // environment and relying on a `@vitest-environment` docblock to rescue it.
          environmentMatchGlobs: [
            ['**/*.test.tsx', 'jsdom'],
            ['**/test.tsx', 'jsdom'],
          ],
          // A named origin, so anything reading location.origin sees a stable one. NOTE it does
          // NOT provide localStorage: Node 26 ships its own `localStorage` global that shadows
          // jsdom's and is inert without --localstorage-file, so a proof about persistence must
          // supply its own Storage. Written down because the symptom (window.localStorage
          // undefined under jsdom) reads as a jsdom/origin problem and is not one.
          environmentOptions: { jsdom: { url: 'https://erpax.test/' } },
          // Pure atoms: NO Payload boot, no setup — that is the whole speedup (a suite finishes in ~0.2s
          // instead of paying the ~35s boot / per-file integration overhead). Kept isolated + serial
          // (the config's own warning: isolate:false shared the heap AND the process env across suites,
          // so a suite reading process.env or a module singleton contaminated its neighbour). Fresh
          // context per file, one at a time — same execution semantics as before, minus the boot.
          isolate: true,
          fileParallelism: false,
          maxConcurrency: 1,
          teardownTimeout: 10_000,
          testTimeout: 30_000,
          hookTimeout: 30_000,
        },
      },
      {
        plugins: [react()],
        resolve: { tsconfigPaths: true },
        test: {
          ...shared,
          name: 'payload-integration',
          include: integration.length ? integration : ['src/**/__no_integration_suites__.test.ts'],
          environmentMatchGlobs: [['**/tests/int/components/**', 'jsdom']],
          setupFiles: ['./vitest.setup.ts'],
          globalSetup: ['./vitest.globalsetup.ts'],
          // A real Payload + D1 store: serial (D1 lock safety), isolated (no cross-suite state bleed),
          // long timeouts for the cold boot (~35s) and the 120s beforeAll graph builds.
          isolate: true,
          fileParallelism: false,
          maxConcurrency: 1,
          teardownTimeout: 10_000,
          testTimeout: 60_000,
          hookTimeout: 120_000,
        },
      },
    ],
  },
})
