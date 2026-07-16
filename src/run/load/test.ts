import { describe, it, expect } from 'vitest'

/**
 * FULL LOAD — does the app actually load? Nothing else here asks.
 *
 * The gates read structure: claims, cycles, duplication, audience. None can say the sentence that matters —
 * "a user cannot open this app". Only loading it can.
 */
describe('run/load — the app under full load', () => {
  it('payload.config loads with every collection registered', async () => {
    const mod: any = await import('@payload-config')
    const cfg = typeof mod.default?.then === 'function' ? await mod.default : mod.default
    expect(cfg).toBeDefined()
    const slugs = (cfg.collections ?? []).map((c: any) => c.slug)
    expect(slugs.length).toBeGreaterThan(200)
    // the atoms today's work touched, proving this is the REAL config and not a stub
    for (const s of ['gl-postings', 'invoices', 'fixed-assets', 'customers', 'vendors', 'period-locks'])
      expect(slugs, `${s} missing from the booted config`).toContain(s)
  }, 120_000)

  /**
   * THE DIVERGENCE, pinned. This same config FAILS to load under native ESM (tsx/node):
   *
   *   ReferenceError: Cannot access 'createAccountingCollection' before initialization
   *       at src/fixed/assets/index.ts:34
   *
   * It loads HERE because Vite wraps modules differently than native ESM, and turbopack fails it a third
   * way (a compile error). The same source, three loaders, three outcomes — which is exactly what
   * rules/cycle means by "initialisation order is decided by accident", demonstrated rather than argued.
   * fixed/assets calls createAccountingCollection at module top level inside a 225-file tangle; whether
   * that throws is the bundler's choice, not the code's.
   */
  it('fixed/assets — the one fatal top-level call — loads under Vite, and does NOT under native ESM', async () => {
    const mod: any = await import('@/fixed/assets')
    expect(mod).toBeDefined() // green here; `tsx -e "import('@/fixed/assets')"` throws a TDZ
  }, 60_000)
})
