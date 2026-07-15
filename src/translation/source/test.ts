import { describe, it, expect } from 'vitest'
import { fetchLabels, toValues, type Fetcher, type Labels } from './index'

/** A deterministic fetcher over the two Wikidata calls — tests never touch the network. */
const fakeWikidata = (qid: string, description: string, labels: Record<string, string>): Fetcher => async (url) => ({
  ok: true,
  status: 200,
  async json() {
    if (url.includes('wbsearchentities')) return { search: [{ id: qid, description }] }
    return { entities: { [qid]: { labels: Object.fromEntries(Object.entries(labels).map(([l, v]) => [l, { value: v }])) } } }
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
