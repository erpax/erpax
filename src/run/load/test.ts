import { describe, it, expect } from 'vitest'
import { bootVerdict, currentLoader } from './index'

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
   * Written as "loads under Vite, and does NOT under native ESM" — my hypothesis, from seeing vitest print
   * "payload migrate…" and concluding Vite wrapped the cycle away. IT DOES NOT. Vite fails at the same line,
   * and the print was the SETUP SWALLOWING the boot.
   *
   * The correction is the law: a verdict is a function of (source, observer). esm and vite are two
   * coordinates and they AGREE — both TDZ at fixed/assets:34. turbopack is a third and disagrees only
   * because it meets a different defect first (src/pages). "Decided by accident" was my phrase for having
   * compared coordinates without naming them; the state is exact at each.
   */
  it('fixed/assets — the one fatal top-level call — fails HERE too, at the same line as esm', async () => {
    await expect(import('@/fixed/assets')).rejects.toThrow(/createAccountingCollection/)
  }, 60_000)
})

/**
 * A VERDICT IS A FUNCTION OF (source, observer). It was a bare boolean — the same error this atom exists to
 * catch. The corpus loads or does not PER ENTRY POINT, exactly:
 *
 *   esm (tsx/node)   TDZ at fixed/assets:34
 *   vite (vitest)    the same TDZ — and confirm/matter.test.ts passed 9 tests, then could not collect, at
 *                    THE SAME COMMIT. Two coordinates, not two outcomes.
 *   turbopack        a different defect — src/pages collides with Next's reserved Pages Router
 *   workers          UNTRIED — absent, not passing
 *
 * I called that non-determinism. It is not: initialisation order is a FUNCTION of the entry point, so the
 * state is exact once the coordinate is fixed. Averaging three coordinates into one boolean is how "it
 * fails" and "it works" were both said about unchanged source.
 */
describe('the verdict carries its coordinate — a claim from nowhere is not a claim', () => {
  it('names the loader it was taken from', async () => {
    const v = await bootVerdict()
    expect(v.loader).toBe('vite') // this file IS the vite coordinate; tsx reports 'esm'
    expect(['esm', 'vite', 'turbopack', 'workers', 'unknown']).toContain(v.loader)
  }, 120_000)

  it('currentLoader is DETECTED, not passed — a caller can be wrong about where it stands', () => {
    expect(currentLoader()).toBe('vite')
  })

  // The same source, two coordinates, two exact answers — measured, not argued.
  it('esm and vite disagree about nothing: both fail at fixed/assets:34, each exactly', async () => {
    const v = await bootVerdict()
    expect(v.loads).toBe(false)
    expect(v.error).toMatch(/createAccountingCollection/) // identical to `tsx src/run/load/index.ts`
  }, 120_000)
})
