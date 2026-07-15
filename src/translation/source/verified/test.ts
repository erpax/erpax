import { describe, it, expect } from 'vitest'
import { VERIFIED_RENDERINGS, VERIFIED_PROVENANCE } from './index'
import { renderIn, trainingCoverage } from '@/translation'
import { messageUuid, splitWords } from '@/message'
import { supportedLocales, defaultLocale } from '@/i18n/localization'

// Deterministic — the network harvest already ran; this guards the SNAPSHOT it produced.
// No fetch here: the sense gate + the live run are proven in translation/source/test.ts and the run log.
describe('translation/source/verified — the sense-verified Wikidata snapshot (CC0, no fabrication)', () => {
  it('every rendering is provenanced to exactly one CC0 Wikidata Qid', () => {
    const byConcept = new Map(VERIFIED_PROVENANCE.map((p) => [p.concept, p]))
    const missing = VERIFIED_RENDERINGS.filter((t) => !byConcept.has(t.key))
    expect(missing.map((t) => t.key)).toEqual([])
    for (const p of VERIFIED_PROVENANCE) expect(p.qid).toMatch(/^Q\d+$/)
  })

  it('the KNOWN-correct senses are the ones registered (not the wrong-sense homonyms)', () => {
    const q = (c: string): string => VERIFIED_PROVENANCE.find((p) => p.concept === c)!.qid
    expect(q('heart')).toBe('Q1072') // the organ, NOT a surname
    expect(q('water')).toBe('Q283') // the compound
    expect(q('star')).toBe('Q523') // the astronomical object, NOT a celebrity
    expect(q('blood')).toBe('Q7873') // the body fluid, NOT the family name the top-1 search returns
  })

  it('NO HALLUCINATION — every uuid + word-split recomputes from the source (green by construction)', () => {
    const tampered = VERIFIED_RENDERINGS.filter(
      (t) => t.uuid !== messageUuid(t.source) || JSON.stringify(t.words) !== JSON.stringify(splitWords(t.source)),
    )
    expect(tampered.map((t) => t.key)).toEqual([])
  })

  it('en === source — the atom word stays the source; harvested labels never overwrite it', () => {
    const wrong = VERIFIED_RENDERINGS.filter((t) => renderIn(t, defaultLocale) !== t.source)
    expect(wrong.map((t) => t.key)).toEqual([])
  })

  it('trained the intelligence far above the en-only seed — coverage ≫ 1/30', () => {
    const c = trainingCoverage(VERIFIED_RENDERINGS, supportedLocales)
    expect(c.ratio).toBeGreaterThan(0.9) // ~0.97: 762 verified renderings vs the 1/30 en-only source
    expect(c.byLocale.bg).toBe(VERIFIED_RENDERINGS.length) // every concept rendered in Bulgarian
    expect(c.byLocale.de).toBe(VERIFIED_RENDERINGS.length)
    expect(c.byLocale.ja).toBe(VERIFIED_RENDERINGS.length)
  })
})
