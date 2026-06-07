import { describe, it, expect } from 'vitest'
import { collectGenome, computeGenomeUuid, checkCloneIntegrity } from '@/cloning'
import type { GenomeBundle } from '@/cloning'

const UUID_V8_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// A pre-extracted corpus keeps collectGenome off the source-tree walk —
// deterministic, no filesystem dependence at boot (spec §0d 'ERPax clones itself').
function fixtureBundle(): GenomeBundle {
  return collectGenome({
    tenantId: 'tenant-1',
    corpus: {
      collections: [
        {
          slug: 'invoices', title: 'Invoices',
          summaries: [{ text: 'Invoice rows' }],
          standards: [{ body: 'IFRS', id: 'IFRS-15' }, { body: 'IFRS', id: 'IFRS-15' }],
          chainSteps: [],
        } as never,
      ],
    },
  })
}

describe('cloning — genome bundle is a content-addressable artifact', () => {
  it('collectGenome maps collections + dedups standards by body/id', () => {
    const g = fixtureBundle()
    expect(g.genomeVersion).toBe('1.0')
    expect(g.collections.map((c) => c.slug)).toContain('invoices')
    const inv = g.collections.find((c) => c.slug === 'invoices')!
    expect(inv.summaryText).toBe('Invoice rows')
    expect(inv.standardsCount).toBe(2)
    // standards are dedup-unioned: two IFRS-15 entries collapse to one
    expect(g.standards.filter((s) => s.body === 'IFRS' && s.id === 'IFRS-15')).toHaveLength(1)
  })

  it('computeGenomeUuid ignores publishedAt — same structure ⇒ same uuid', () => {
    const a = fixtureBundle()
    const b = { ...fixtureBundle(), publishedAt: '1999-01-01T00:00:00.000Z' }
    const ua = computeGenomeUuid(a, 'tenant-1')
    expect(ua).toMatch(UUID_V8_RE)
    expect(ua).toBe(computeGenomeUuid(b, 'tenant-1'))
  })

  it('the genome uuid is per-tenant', () => {
    const g = fixtureBundle()
    expect(computeGenomeUuid(g, 'tenant-1')).not.toBe(computeGenomeUuid(g, 'tenant-2'))
  })
})

// Conservation Law 24: a clone is bit-identical iff its recomputed genome uuid
// equals the publication's bundleUuid.
describe('cloning — checkCloneIntegrity (Law 24)', () => {
  it('a faithful clone passes', () => {
    const bundle = fixtureBundle()
    const publication = { bundleUuid: computeGenomeUuid(bundle, 'tenant-1'), bundle }
    const res = checkCloneIntegrity({
      publication: publication as never,
      cloneBundle: bundle,
      cloneTenantId: 'tenant-1',
    })
    expect(res.ok).toBe(true)
  })

  it('a divergent section is named on failure', () => {
    const bundle = fixtureBundle()
    const publication = { bundleUuid: computeGenomeUuid(bundle, 'tenant-1'), bundle }
    const tampered: GenomeBundle = {
      ...bundle,
      collections: [...bundle.collections, { slug: 'extra', title: 'Extra', standardsCount: 0, chainStepsCount: 0 }],
    }
    const res = checkCloneIntegrity({
      publication: publication as never,
      cloneBundle: tampered,
      cloneTenantId: 'tenant-1',
    })
    expect(res.ok).toBe(false)
    if (!res.ok) {
      expect(res.divergentSections).toContain('collections')
      expect(res.expected).not.toBe(res.actual)
    }
  })

  it('same bundle under a different tenant: uuid differs, no section diverges', () => {
    const bundle = fixtureBundle()
    const publication = { bundleUuid: computeGenomeUuid(bundle, 'tenant-1'), bundle }
    const res = checkCloneIntegrity({
      publication: publication as never,
      cloneBundle: bundle,
      cloneTenantId: 'tenant-2',
    })
    expect(res.ok).toBe(false)
    if (!res.ok) {
      expect(res.divergentSections).toHaveLength(0)
      expect(res.reason).toMatch(/tenant namespace/)
    }
  })
})
