import { describe, it, expect } from 'vitest'
import { size, addedEntropy, surface, growthBand, growth } from '@/expand'
import { entropy, orphans } from '@/entropy'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'
import { digitalRoot } from '@/horo'

// expand — the development exhale, computed on the live matrix (./index.ts). The
// assertions are RELATIONS between computed views and exact DELEGATIONS to the
// canonical atoms (entropy/horo) — never magic numbers. expand re-computes
// nothing, so each reading must AGREE with the atom it composes.
describe('expand — the development exhale: growth measured on the live uuid-matrix', () => {
  it('size() is the live grain count (UUID_MATRIX_NODES length) and is non-empty', () => {
    expect(size()).toBe(UUID_MATRIX_NODES.length)
    expect(size()).toBeGreaterThan(0)
  })

  it('addedEntropy() delegates EXACTLY to @/entropy — expand re-derives nothing', () => {
    expect(addedEntropy()).toBe(entropy())
  })

  it('addedEntropy() is borrowed-disorder slack in [0,1]', () => {
    const e = addedEntropy()
    expect(e).toBeGreaterThanOrEqual(0)
    expect(e).toBeLessThanOrEqual(1)
  })

  it('surface() is the orphan census — the unfused growth, agreeing with @/entropy orphans', () => {
    const s = surface()
    expect(s.count).toBe(orphans().length)
    expect(s.atoms).toEqual(orphans())
    expect(s.count).toBeGreaterThanOrEqual(0)
    expect(s.count).toBeLessThanOrEqual(size()) // surface cannot exceed the corpus
  })

  it('growthBand() is the horo digital-root of the size — a deterministic 1..9 projection', () => {
    expect(growthBand()).toBe(digitalRoot(size()))
    expect(growthBand()).toBeGreaterThanOrEqual(0)
    expect(growthBand()).toBeLessThanOrEqual(9)
  })

  it('growthBand() is pure — same size, same band on repeat reads', () => {
    expect(growthBand()).toBe(growthBand())
  })

  it('growth() aggregates the views self-consistently (size·entropy·surface·band agree)', () => {
    const g = growth()
    expect(g.size).toBe(size())
    expect(g.addedEntropy).toBe(addedEntropy())
    expect(g.surface).toBe(surface().count)
    expect(g.band).toBe(growthBand())
    expect(typeof g.fused).toBe('boolean')
  })

  it('fused ⇒ the surface is fully closed: no orphans AND zero added entropy (the exhale fused out)', () => {
    const g = growth()
    if (g.fused) {
      expect(g.surface).toBe(0)
      expect(g.addedEntropy).toBe(0) // full reciprocity ⇒ entropy = 1 − 1 = 0
    }
  })
})
