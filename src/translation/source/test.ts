import { describe, it, expect } from 'vitest'
import { fetchLabels, harvestVerified, senseScore, toValues, type Fetcher, type Labels } from './index'

/** A deterministic fetcher over the two Wikidata calls — tests never touch the network. */
const fakeWikidata = (qid: string, description: string, labels: Record<string, string>): Fetcher => async (url) => ({
  ok: true,
  status: 200,
  async json() {
    if (url.includes('wbsearchentities')) return { search: [{ id: qid, description }] }
    return { entities: { [qid]: { labels: Object.fromEntries(Object.entries(labels).map(([l, v]) => [l, { value: v }])) } } }
  },
})

/** A fetcher over MANY candidates — the search returns them in order; getentities serves each Qid's labels. */
const fakeSearch = (
  candidates: ReadonlyArray<{ id: string; description: string }>,
  labelsByQid: Record<string, Record<string, string>>,
): Fetcher => async (url) => ({
  ok: true,
  status: 200,
  async json() {
    if (url.includes('wbsearchentities')) return { search: candidates }
    const qid = new URLSearchParams(url.split('?')[1]).get('ids')!
    return { entities: { [qid]: { labels: Object.fromEntries(Object.entries(labelsByQid[qid] ?? {}).map(([l, v]) => [l, { value: v }])) } } }
  },
})

describe('translation/source — real translations from Wikidata (CC0), no fabrication', () => {
  it('resolves a word to its concept and returns real multilingual labels', async () => {
    const f = fakeWikidata('Q1072', 'inner organ for the circulation of blood', {
      en: 'heart',
      bg: 'сърце',
      de: 'Herz',
      ja: '心臓',
    })
    const r = await fetchLabels('heart', f)
    expect(r?.qid).toBe('Q1072') // the sense — verifiable
    expect(r?.description).toMatch(/organ/)
    expect(r?.labels.bg).toBe('сърце')
    expect(r?.labels.ja).toBe('心臓')
  })

  it('returns null when no concept is found — never fabricates', async () => {
    const noHit: Fetcher = async () => ({ ok: true, status: 200, async json() { return { search: [] } } })
    expect(await fetchLabels('zxqwv-nonword', noHit)).toBeNull()
  })

  it('toValues filters to the locales you register (leaving un-covered ones as seed-gaps)', () => {
    const labels: Labels = { qid: 'Q1072', description: 'organ', labels: { bg: 'сърце', de: 'Herz', fr: 'cœur' } }
    expect(toValues(labels, ['bg', 'de', 'ja'])).toEqual({ bg: 'сърце', de: 'Herz' }) // ja not present → omitted
  })

  it('throws (never fabricates) when the source is unreachable', async () => {
    const down: Fetcher = async () => ({ ok: false, status: 503, async json() { return {} } })
    await expect(fetchLabels('heart', down)).rejects.toThrow(/unreachable/)
  })
})

describe('translation/source — the SENSE GATE: register the right sense, leave the wrong one a gap', () => {
  it('senseScore rewards matching senses and rejects wrong-sense homonyms', () => {
    const organ = senseScore('organ that pumps blood', 'inner organ for the circulation of blood')
    const surname = senseScore('organ that pumps blood', 'family name')
    const album = senseScore('state of equilibrium', '1995 studio album by Van Halen')
    expect(organ).toBeGreaterThan(surname)
    expect(surname).toBe(0)
    expect(album).toBe(0)
  })

  it('harvestVerified picks the sense-matching candidate, NOT the top-1 wrong sense', async () => {
    // Mirrors the live footgun: the top search hit for "gold" is a family name; the ELEMENT is deeper.
    const f = fakeSearch(
      [
        { id: 'Q_SURNAME', description: 'family name' },
        { id: 'Q897', description: 'chemical element with symbol Au and atomic number 79' },
      ],
      { Q897: { en: 'gold', bg: 'злато', de: 'Gold' } },
    )
    const v = await harvestVerified('gold', 'chemical element, a precious metal', f)
    expect(v?.qid).toBe('Q897') // the element — the surname was rejected by the sense gate
    expect(v?.labels.bg).toBe('злато')
  })

  it('leaves an honest GAP (null) when no candidate sense-matches — a wrong label is worse than a gap', async () => {
    const f = fakeSearch(
      [
        { id: 'Q1', description: 'family name' },
        { id: 'Q2', description: '1995 studio album by Van Halen' },
      ],
      { Q1: { en: 'balance' }, Q2: { en: 'balance' } },
    )
    expect(await harvestVerified('balance', 'state of equilibrium, equal weights at rest', f)).toBeNull()
  })
})
