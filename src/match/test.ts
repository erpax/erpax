import { describe, it, expect } from 'vitest'
import { embeddableText, matchFilter, scoreMatch, rankMatches, type TradePosition } from './index'

/**
 * match — the constraint half is what makes a shortlist trustworthy, so it is what
 * this proves. Pure functions: no bindings, no network, no clock.
 */

const offer = (over: Partial<TradePosition> = {}): TradePosition => ({
  side: 'offer',
  name: 'Organic wheat flour T500, 25kg sack',
  category: 'flour',
  gtin: '3800123456789',
  priceMinor: 1850,
  currency: 'EUR',
  minQuantity: 10,
  maxQuantity: 500,
  areaServed: ['BG', 'RO'],
  ...over,
})

const demand = (over: Partial<TradePosition> = {}): TradePosition => ({
  side: 'demand',
  name: 'Wanted: organic T500 wheat flour, sacks',
  category: 'flour',
  gtin: '3800123456789',
  priceMinor: 1900,
  currency: 'EUR',
  minQuantity: 50,
  maxQuantity: 200,
  areaServed: ['BG'],
  ...over,
})

describe('match — what is indexed', () => {
  it('embeds MEANING, never the constraints', () => {
    // Assert the exact composition — name · description · category · gtin · sku.
    // (Asserting "the text lacks 500" would be wrong: the NAME is "T500", a flour
    // grade. The invariant is which FIELDS compose the text, not which digits.)
    const p = offer({ name: 'Alpha', description: 'Beta', category: 'gamma', gtin: '111', sku: 'S1' })
    expect(embeddableText(p)).toBe('Alpha · Beta · gamma · 111 · S1')

    // price/currency/quantity/area are constraints — embedding them would teach the
    // index that "100 units" resembles "100 EUR".
    const priced = offer({ name: 'Alpha', description: undefined, category: undefined, gtin: undefined, sku: undefined })
    expect(embeddableText(priced)).toBe('Alpha')
  })

  it('is deterministic — an unchanged position re-embeds identically', () => {
    expect(embeddableText(offer())).toBe(embeddableText(offer()))
  })

  it('filters to the OPPOSITE side, staying in the category lane', () => {
    expect(matchFilter(offer())).toEqual({ side: 'demand', category: 'flour' })
    expect(matchFilter(demand())).toEqual({ side: 'offer', category: 'flour' })
    // no category declared ⇒ no category filter (never over-cut)
    expect(matchFilter(offer({ category: undefined }))).toEqual({ side: 'demand' })
  })
})

describe('match — the verdict', () => {
  it('a genuine pair is viable and scores on every declared dimension', () => {
    const v = scoreMatch(offer(), demand())
    expect(v.viable).toBe(true)
    expect(v.score).toBe(1)
    expect(v.reasons.map((r) => r.kind)).toContain('gtin-match')
    expect(v.reasons.map((r) => r.kind)).toContain('price-within-band')
    expect(v.reasons.map((r) => r.kind)).toContain('area-overlap')
  })

  it('is SYMMETRIC — trade does not care which side asked', () => {
    const a = scoreMatch(offer(), demand())
    const b = scoreMatch(demand(), offer())
    expect(b.viable).toBe(a.viable)
    expect(b.score).toBe(a.score)
  })

  it('two positions on the SAME side can never trade', () => {
    const v = scoreMatch(offer(), offer())
    expect(v.viable).toBe(false)
    expect(v.reasons[0]!.kind).toBe('same-side')
  })

  it.each([
    ['a different product', { gtin: '9999999999999' }, 'gtin-mismatch'],
    ['a bid under the ask', { priceMinor: 1000 }, 'price-below-floor'],
    ['a different currency', { currency: 'USD' }, 'currency-mismatch'],
    ['no shared delivery area', { areaServed: ['DE'] }, 'area-disjoint'],
    ['disjoint quantities', { minQuantity: 1, maxQuantity: 5 }, 'quantity-disjoint'],
  ])('REFUSES %s (fatal: %s)', (_label, over, kind) => {
    const v = scoreMatch(offer(), demand(over as Partial<TradePosition>))
    expect(v.viable).toBe(false)
    expect(v.score).toBe(0)
    expect(v.reasons.find((r) => r.kind === kind)?.fatal).toBe(true)
  })

  it('does not punish a sparse position for what it never claimed', () => {
    // only a name — nothing to contradict, nothing to evidence
    const sparse: TradePosition = { side: 'demand', name: 'flour wanted' }
    const v = scoreMatch(offer(), sparse)
    expect(v.viable).toBe(true)
    expect(v.score).toBe(0) // viable but unevidenced — similarity alone will rank it
  })

  it('viable ⟺ no fatal reason, and a non-viable pair always scores 0', () => {
    for (const over of [{}, { gtin: 'X' }, { priceMinor: 1 }, { areaServed: ['JP'] }]) {
      const v = scoreMatch(offer(), demand(over as Partial<TradePosition>))
      expect(v.viable).toBe(v.reasons.every((r) => !r.fatal))
      if (!v.viable) expect(v.score).toBe(0)
    }
  })
})

describe('match — ranking', () => {
  it('DROPS the non-viable however similar, and orders the rest', () => {
    const ranked = rankMatches(offer(), [
      { position: demand({ name: 'near-identical wording', gtin: '9999999999999' }), similarity: 0.99 },
      { position: demand(), similarity: 0.62 },
      { position: demand({ areaServed: ['BG'], minQuantity: 50, maxQuantity: 200 }), similarity: 0.81 },
    ])
    // the 0.99 candidate is a DIFFERENT product — it must not appear at all
    expect(ranked.every((m) => m.verdict.viable)).toBe(true)
    expect(ranked.some((m) => m.position.gtin === '9999999999999')).toBe(false)
    expect(ranked).toHaveLength(2)
    // higher similarity wins among equally-constrained pairs
    expect(ranked[0]!.similarity).toBe(0.81)
    // rank is non-increasing
    expect(ranked[0]!.rank).toBeGreaterThanOrEqual(ranked[1]!.rank)
  })

  it('an empty candidate set ranks to nothing (no throw)', () => {
    expect(rankMatches(offer(), [])).toEqual([])
  })
})
