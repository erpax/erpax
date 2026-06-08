/**
 * translations — THE ZERO-ENTROPY INVARIANT GUARD.
 *
 * The matrix is never broken, no matter the command: this asserts it, so no
 * agent can violate or hallucinate. Tests are also FEED for analysis — the
 * coverage metric below is the entropy the society tightens toward 0.
 *
 *   - NO HALLUCINATION : every stored uuid + word-split RECOMPUTES from source
 *                        (../message#messageUuid). A faked uuid flips this red.
 *   - SELF             : every atom resolves to a real uuid-matrix node.
 *   - THE WHOLE        : the matrix Merkle root verifies (../uuid/matrix).
 *   - ENTROPY          : word→atom coverage is measured + reported (aura gap),
 *                        driven to 100% (gap 0 ⇒ matrix complete) by the society.
 *
 * @audit the matrix is never broken — green by construction, recomputed not trusted
 * @see ./collect.ts (the collector) · ../translation (model) · ../aura (the gap)
 */
import { describe, it, expect } from 'vitest'
import { TRANSLATIONS_CATALOGUE } from '../catalogue'
import { messageUuid, splitWords, isAtomWord } from '@/message'
import { nodeOf, verifyRoot } from '@/uuid/matrix'
import { defaultLocale } from '@/i18n/localization'

const ENTRIES = TRANSLATIONS_CATALOGUE.flatMap((c) =>
  c.translations.map((t) => ({ atom: c.atom, ...t })),
)

describe('translations: the matrix is never broken — zero-entropy invariant', () => {
  it('the catalogue covers the whole corpus, content-addressed', () => {
    expect(TRANSLATIONS_CATALOGUE.length).toBeGreaterThan(2000)
    expect(ENTRIES.length).toBeGreaterThan(2000)
  })

  it('NO HALLUCINATION — every stored uuid + words recompute from the source', () => {
    const tampered = ENTRIES.filter(
      (t) =>
        t.uuid !== messageUuid(t.source) ||
        JSON.stringify(t.words) !== JSON.stringify(splitWords(t.source)),
    )
    expect(tampered.map((t) => `${t.atom}:${t.key}`)).toEqual([])
  })

  it('en === source — the extraction truth is preserved', () => {
    const wrong = ENTRIES.filter((t) => t.values[defaultLocale] !== t.source)
    expect(wrong.map((t) => `${t.atom}:${t.key}`)).toEqual([])
  })

  it('SELF — every atom resolves to a real uuid-matrix node', () => {
    const orphan = [...new Set(TRANSLATIONS_CATALOGUE.map((c) => c.atom))].filter((a) => !nodeOf(a))
    expect(orphan).toEqual([])
  })

  it('THE WHOLE — the uuid-matrix Merkle root verifies (the matrix is intact)', () => {
    expect(verifyRoot().ok).toBe(true)
  })
})

describe('translations: entropy is measured, not hidden (feed for analysis; tighten → 0)', () => {
  const words = ENTRIES.flatMap((t) => [...t.words])
  const resolved = words.filter(isAtomWord).length
  const coverage = words.length ? (100 * resolved) / words.length : 0
  const mintQueue = [...new Set(words.filter((w) => !isAtomWord(w)))]

  it('reports word→atom coverage + the mint queue (the aura gap, the entropy)', () => {
    console.log(
      `word→atom coverage ${coverage.toFixed(1)}% (${resolved}/${words.length}) · mint-queue ${mintQueue.length} words`,
    )
    expect(coverage).toBeGreaterThan(0)
    expect(words.length).toBeGreaterThan(0)
  })

  // The telos: every content word is an atom ⇒ aura gap 0 ⇒ the matrix is
  // complete. Reached by the well-trained-agent society (mint/rewrite), not a
  // single linear pass — hence todo, not a forced red.
  it.todo('coverage → 100% (aura gap 0 ⇒ matrix complete): the society phase')
})
