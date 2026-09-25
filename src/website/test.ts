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

describe('seedFromSpec — the page SET is a formula over sealed state, not a scrape', () => {
  it('exactly one collection page per collection Payload actually booted', async () => {
    const { shapesOf } = await import('@/rules/collapse')
    const { seedFromSpec } = await import('./index')
    const booted = shapesOf(process.cwd())
    const pages = await seedFromSpec({ tenantId: 'erpax-platform', include: ['collection'] })
    expect(booted.length).toBeGreaterThan(200)
    expect(pages).toHaveLength(booted.length)
    expect(new Set(pages.map((p) => p.slug)).size).toBe(pages.length)
  })

  it('the garbage the old scrape produced is gone', async () => {
    // extractCorpus returned FOUR entries: `test`, `index`, `dunningJob`, `salesAuditFileJob`.
    // None is a collection; they are parse artefacts, and they were the site's collection pages.
    const { seedFromSpec } = await import('./index')
    const slugs = new Set((await seedFromSpec({ tenantId: 't', include: ['collection'] })).map((p) => p.slug))
    for (const g of ['test', 'index', 'dunningJob', 'salesAuditFileJob']) {
      expect(slugs.has(`spec-collection-${g}`)).toBe(false)
    }
    expect(slugs.has('spec-collection-invoices')).toBe(true)
  })

  it('every page carries its content-uuid, in the metadata AND in the body', async () => {
    const { seedFromSpec } = await import('./index')
    const pages = await seedFromSpec({ tenantId: 't', include: ['collection'] })
    for (const p of pages.slice(0, 40)) {
      const uuid = String(p.metadata?.['contentUuid'] ?? '')
      expect(uuid).toMatch(/^[0-9a-f]{8}-/)
      expect(p.bodyHtml).toContain(uuid)
      expect(p.bodyHtml).toContain(String(p.metadata?.['slug'] ?? ''))
    }
  })

  it('the title is a formula over the slug, so it cannot drift from it', async () => {
    const { seedFromSpec } = await import('./index')
    const pages = await seedFromSpec({ tenantId: 't', include: ['collection'] })
    const p = pages.find((x) => x.slug === 'spec-collection-account-reconciliations')
    expect(p?.title).toBe('Account Reconciliations')
  })
})
