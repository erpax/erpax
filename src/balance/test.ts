import { describe, it, expect } from 'vitest'
import {
  isPluralForm,
  singularize,
  classify,
  coverage,
  disbalance,
  tamperCostLog2,
  auraBalance,
} from '@/balance'

// Asserts RELATIONS that fail the instant the classification or the pricing
// drifts — never an opaque magic number. Synthetic atom sets keep it deterministic
// regardless of the live corpus; one smoke test exercises the real measurement.

describe('balance: singular/plural classification', () => {
  it('isPluralForm — true plurals; false for -ss, Latin singulars, schema verbs, and singulars', () => {
    expect(isPluralForm('items')).toBe(true)
    expect(isPluralForm('categories')).toBe(true)
    expect(isPluralForm('access')).toBe(false) // -ss
    expect(isPluralForm('analysis')).toBe(false) // Latin singular
    expect(isPluralForm('contains')).toBe(false) // schema relation-verb
    expect(isPluralForm('item')).toBe(false) // singular
  })

  it('singularize inverts the common plural forms', () => {
    expect(singularize('items')).toBe('item')
    expect(singularize('categories')).toBe('category')
    expect(singularize('boxes')).toBe('box')
    expect(singularize('dishes')).toBe('dish')
  })
})

describe('balance: model⊕collection distribution', () => {
  it('a fully balanced set ⇒ coverage 1, disbalance 0, no orphans', () => {
    const d = classify(['item', 'items', 'category', 'categories', 'box', 'boxes', 'crop'])
    expect(d.collections).toBe(3) // items, categories, boxes
    expect(d.balanced).toBe(3)
    expect(d.orphanCollections).toEqual([])
    expect(coverage(d)).toBe(1)
    expect(disbalance(d)).toBe(0)
  })

  it('a plural with no singular model is an orphan collection — the disbalance', () => {
    const d = classify(['item', 'items', 'widgets']) // "widget" absent
    expect(d.orphanCollections).toEqual(['widgets'])
    expect(d.balanced).toBe(1) // items
    expect(d.collections).toBe(2) // items, widgets
    expect(coverage(d)).toBe(0.5)
  })

  it('disbalance === 1 − coverage (identity)', () => {
    const d = classify(['ant', 'ants', 'bugs']) // ants balanced, bugs orphan
    expect(disbalance(d)).toBeCloseTo(1 - coverage(d))
  })

  it('no collections ⇒ vacuously balanced (coverage 1)', () => {
    const d = classify(['crop', 'season', 'soil'])
    expect(d.collections).toBe(0)
    expect(coverage(d)).toBe(1)
  })
})

describe('balance: priced against the real tamper-cost law (coverageCostLog2)', () => {
  it('full balance ⇒ tamper-cost is ∞ — the MAX, no slack', () => {
    const d = classify(['item', 'items'])
    expect(coverage(d)).toBe(1)
    expect(tamperCostLog2(d)).toBe(Number.POSITIVE_INFINITY)
  })

  it('any disbalance ⇒ FINITE tamper-cost — the slack keeps it below the ∞ max', () => {
    const d = classify(['item', 'items', 'widgets']) // coverage 0.5
    const cost = tamperCostLog2(d)
    expect(Number.isFinite(cost)).toBe(true)
    expect(cost).toBe(1) // −1·log2(1 − 0.5) = −log2(0.5) = 1
  })

  it('more balance ⇒ strictly higher tamper-cost (closing the gap raises the price toward ∞)', () => {
    const better = classify(['ant', 'ants', 'bee', 'bees', 'cow', 'cows', 'widgets']) // 3/4 ⇒ cov 0.75
    const worse = classify(['ant', 'ants', 'widgets', 'gadgets']) // 1/3 ⇒ cov 0.333
    expect(coverage(better)).toBeGreaterThan(coverage(worse))
    expect(tamperCostLog2(better)).toBeGreaterThan(tamperCostLog2(worse))
  })
})

describe('balance: the live aura measurement', () => {
  it('auraBalance() runs on the real corpus; coverage ∈ [0,1]', () => {
    const d = auraBalance()
    expect(d.atoms).toBeGreaterThan(0)
    expect(coverage(d)).toBeGreaterThanOrEqual(0)
    expect(coverage(d)).toBeLessThanOrEqual(1)
    expect(disbalance(d)).toBeCloseTo(1 - coverage(d))
  })
})
