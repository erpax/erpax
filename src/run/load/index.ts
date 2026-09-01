/**
 * load — does the app run at all?
 *
 * Twelve gates read STRUCTURE. None can say the sentence that matters: a user cannot open this app. Only
 * loading it says that.
 *
 * IT NOW LOADS — `load — OK from esm · 229 collections`. What it cost is the record worth keeping:
 *
 *   tsx / node ESM        was ReferenceError: Cannot access 'createAccountingCollection' before initialization
 *   vitest / Vite         the same TDZ, same line
 *   next dev / turbopack  a different defect: the `pages` collection collided with Next's reserved Pages Router dir
 *
 * Both are closed — the `tool-defs → collections` edge was cut so initialisation order changed, and
 * the `pages` collection was renamed. The SCC is still ~225 files: entangled is not fatal ([[rules]]/cycle), which is
 * the finding, not a loose end. And the harness that swallowed the boot fails closed now: an unknown migrate
 * failure exits everywhere instead of continuing (`vitest.setup.ts`).
 *
 * **The workerd warnings this boot prints are NOT a defect.** Five lines of "A DurableObjectNamespace
 * in the config referenced the class X, but no such Durable Object class is exported from the worker"
 * appear on every local boot, one per binding, on a healthy tree. They come from `getPlatformProxy`,
 * which emulates BINDINGS and never loads `main` — so no worker class is ever exported to it, whatever
 * the code says. The question they raise is answered by bundling `main`:
 *
 *   wrangler deploy --dry-run --outdir=/tmp/x   →   export { AuditChain, BucketCachePurge, DOQueueHandler,
 *                                                    DOShardedTagCache, ErpaxStateDO, JobLock,
 *                                                    RateLimiter, TenantQuotaCounter, … as default }
 *
 * All five erpax classes plus OpenNext's three. This is written HERE, beside the warnings, because the
 * register that already held the answer ([[instrument]]) was not consulted at the moment of measuring —
 * twice. A table read after the fact is prose; the note has to sit where the confusing output is.
 *
 * The proof is test.ts, and it is GREEN because the app boots — not because the question stopped being
 * asked. This face exists so it is addressable and runnable on demand rather than only by the suite.
 *
 * Composes [[rules]]/cycle · [[law]].
 */

/** Canonical atom path. */
export const atomPath = 'load' as const

/** The entry points erpax is loaded from. A verdict without one of these is a claim from nowhere. */
export type Loader = 'esm' | 'vite' | 'turbopack' | 'workers' | 'unknown'

export interface LoadVerdict {
  /** WHERE the verdict was taken. A boot answer is a function of (source, observer) — never of source alone. */
  readonly loader: Loader
  readonly loads: boolean
  readonly collections: number
  readonly error?: string
}

/**
 * Which entry point is running THIS process — the coordinate the verdict belongs to.
 *
 * Detected, not passed: a caller that names its own loader can be wrong, and a wrong coordinate makes a
 * correct verdict a lie.
 */
export function currentLoader(): Loader {
  const g = globalThis as Record<string, unknown>
  if (typeof g.__vitest_worker__ !== 'undefined' || typeof g.__vite_ssr_import__ !== 'undefined') return 'vite'
  if (typeof process === 'undefined') return 'workers'
  if (process.env.NEXT_RUNTIME || process.env.TURBOPACK) return 'turbopack'
  if (process.versions?.node) return 'esm'
  return 'unknown'
}

/**
 * Boot payload.config for real, and report WHERE the answer was taken. No catch-and-continue: the failure IS
 * the answer.
 *
 * This returned a bare `loads: boolean` — and that was the same error it exists to catch. The corpus loads or
 * does not **per entry point**, exactly and reproducibly:
 *
 *   esm (tsx/node)   TDZ at fixed/assets:34
 *   vite (vitest)    the same TDZ — and confirm/matter.test.ts passed 9 tests, then could not collect, AT
 *                    THE SAME COMMIT: two coordinates, not two outcomes
 *   turbopack        a different defect entirely — the `pages` collection collided with Next's reserved Pages Router
 *   workers          UNTRIED (Cloudflare/OpenNext) — absent, not passing
 *
 * That is not non-determinism, which is what I called it. **Initialisation order is a function of the entry
 * point**, so the state is exact once the coordinate is fixed; averaging three coordinates into one boolean
 * is how "it fails" and "it works" were both said about unchanged source. Each observer is its own basis —
 * the same law [[rules]]/audience applies to READERS (the fabricated cash flow is false only from the
 * director's seat) applied here to LOADERS.
 *
 * @invariant a verdict carries its loader — a boot answer without a coordinate is a claim from nowhere
 */
export async function bootVerdict(): Promise<LoadVerdict> {
  const loader = currentLoader()
  try {
    // Declare the phase before the config reads it: this is a CONFIG PROBE, not a server.
    // The gate asks whether the config assembles and touches no secret with the answer,
    // so it must not require a production one — a gate that fails on a missing env var
    // reports the corpus broken when nothing about the corpus moved.
    process.env.ERPAX_CONFIG_PROBE = '1'
    const mod: Record<string, unknown> = await import('@payload-config')
    const d = mod.default as { then?: unknown } | undefined
    const cfg = (typeof d?.then === 'function' ? await d : d) as { collections?: unknown[] } | undefined
    return { loader, loads: true, collections: cfg?.collections?.length ?? 0 }
  } catch (e) {
    return { loader, loads: false, collections: 0, error: String((e as Error).message).split('\n')[0] }
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  bootVerdict().then((v) => {
    console.log(
      v.loads
        ? `load — OK from ${v.loader} · ${v.collections} collections`
        : `load — FAILED from ${v.loader} · ${v.error}`,
    )
    process.exit(v.loads ? 0 : 1)
  })
}
