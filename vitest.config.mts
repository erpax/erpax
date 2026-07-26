import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

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
/** A suite needs the Payload boot if it references the runtime (broad — err toward integration so a
 *  real integration suite is never starved of its DB; a pure suite mis-flagged only runs slower). */
const NEEDS_PAYLOAD =
  /getPayload|req\.payload|from ['"]payload['"]|@\/payload\b|createLocalReq|loginAsTestUser|@\/collections\b|initTestPayload|initPayload|\.db\(\)|payloadInstance|getTestPayload|bootTestPayload/
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
const allSuites = walk(join(ROOT, 'src'))
const integration: string[] = []
const unit: string[] = []
for (const s of allSuites) {
  try {
    ;(NEEDS_PAYLOAD.test(readFileSync(join(ROOT, s), 'utf8')) ? integration : unit).push(s)
  } catch {
    integration.push(s) // unreadable → run in the safe (booted) project
  }
}

const shared = {
  environment: 'node' as const,
  globals: false,
  clearMocks: true,
  restoreMocks: true,
  server: { deps: { external: [/[/\\]skills\.index(?:\.ts)?$/] } },
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
          environmentMatchGlobs: [['**/*.test.tsx', 'jsdom']],
          // Pure atoms: no Payload boot, no setup. Isolation is unnecessary (no shared DB/heap
          // state) so run parallel and non-isolated — the ~1400 pure suites finish in seconds.
          isolate: false,
          fileParallelism: true,
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
