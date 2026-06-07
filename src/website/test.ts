import { describe, it, expect } from 'vitest'
import { exportMediaBundle, importMediaBundle, seedFromE2e, type PageSeed } from '@/website'

// website — the record made perceptible. Law: nothing is authored, every Page is
// DERIVED from the live corpus; because each seed is content-addressed the same
// Page from two instances is ONE Page (merge → round-trip is lossless).
describe('website — derived, content-addressed page seeds', () => {
  const seed: PageSeed = {
    slug: 'walkthrough-order-to-cash-en',
    title: 'Order to Cash',
    locale: 'en',
    heroSection: 'data-block="hero"',
    bodyHtml: '<h1>Order to Cash</h1>',
    seedSource: 'e2e-multimedia',
    metadata: { workflow: 'order-to-cash', locale: 'en' },
  }

  it('exportMediaBundle is an .ndjson — one JSON object per line', () => {
    const ndjson = exportMediaBundle([seed, { ...seed, slug: 'b' }])
    const lines = ndjson.split('\n')
    expect(lines).toHaveLength(2)
    for (const line of lines) expect(() => JSON.parse(line) as unknown).not.toThrow()
  })

  it('export ∘ import is the identity (federation round-trip is lossless)', () => {
    const back = importMediaBundle(exportMediaBundle([seed]))
    expect(back).toHaveLength(1)
    expect(back[0]).toEqual(seed)
  })

  it('importMediaBundle tolerates a trailing newline / blank lines', () => {
    const bundle = exportMediaBundle([seed]) + '\n'
    expect(importMediaBundle(bundle)).toHaveLength(1)
  })

  it('an empty seed list round-trips to an empty bundle', () => {
    expect(exportMediaBundle([])).toBe('')
    expect(importMediaBundle('')).toEqual([])
  })

  it('seedFromE2e returns [] when no marketing/ dir exists (nothing authored)', () => {
    const seeds = seedFromE2e({ repoRoot: '/nonexistent-erpax-root-xyz' })
    expect(seeds).toEqual([])
  })

  it('every e2e seed (if any) is tagged e2e-multimedia with a walkthrough slug', () => {
    const seeds = seedFromE2e({})
    for (const s of seeds) {
      expect(s.seedSource).toBe('e2e-multimedia')
      expect(s.slug.startsWith('walkthrough-')).toBe(true)
      expect(s.locale).toMatch(/^[a-z]{2}$/)
    }
  })
})
