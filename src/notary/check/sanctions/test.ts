import { describe, it, expect } from 'vitest'
import { resolveNamesUrl, normalize, screen, fetchSanctionsNames, sanctionsAdapter, SANCTIONS_INDEX } from './index'
import type { Fetcher } from './index'

/** A deterministic fetcher over a route table — tests never touch the network. */
const fakeFetcher = (routes: Record<string, string>): Fetcher => async (url: string) => ({
  ok: routes[url] !== undefined,
  status: routes[url] !== undefined ? 200 : 404,
  async text() {
    return routes[url] ?? ''
  },
})

describe('notary/check/sanctions — real EU consolidated sanctions screening', () => {
  it('resolves the current names.txt url from the dataset index (no hardcoded timestamp)', () => {
    const idx = {
      version: '20260715',
      resources: [
        { name: 'source.xml', url: 'x' },
        { name: 'names.txt', url: 'https://data.opensanctions.org/artifacts/eu_fsf/T/names.txt' },
      ],
    }
    expect(resolveNamesUrl(idx)).toBe('https://data.opensanctions.org/artifacts/eu_fsf/T/names.txt')
    expect(resolveNamesUrl({ resources: [] })).toBeNull()
  })

  it('normalises names — diacritics, case, and punctuation fold to one comparable form', () => {
    expect(normalize('Kadýrov, Ramzán!')).toBe('kadyrov ramzan')
    expect(normalize('  AL-QAIDA ')).toBe('al qaida')
  })

  it('screens a subject — a listed name (any case/diacritic variant) HITS; a clean name does not', () => {
    const names = ['Ramzan Kadyrov', 'Yevgeny Prigozhin', 'AL-QAIDA']
    expect(screen('ramzán kadýrov', names).hit).toBe(true) // diacritic + case variant still matches
    expect(screen('Jane Ordinary', names).hit).toBe(false)
    expect(screen('', names).hit).toBe(false) // empty subject never matches
  })

  it('fetchSanctionsNames follows the index → names.txt (injected fetch, no network)', async () => {
    const namesUrl = 'https://data.opensanctions.org/artifacts/eu_fsf/T/names.txt'
    const f = fakeFetcher({
      [SANCTIONS_INDEX]: JSON.stringify({ resources: [{ name: 'names.txt', url: namesUrl }] }),
      [namesUrl]: 'Ramzan Kadyrov\nYevgeny Prigozhin\n',
    })
    expect(await fetchSanctionsNames(f)).toEqual(['Ramzan Kadyrov', 'Yevgeny Prigozhin'])
  })

  it('throws (never fabricates) when the list is unreachable', async () => {
    await expect(fetchSanctionsNames(fakeFetcher({}))).rejects.toThrow(/unreachable/)
  })

  it('the adapter answers the sanctions check — clear vs escalate — and refuses other checks', async () => {
    const adapter = sanctionsAdapter({ names: ['Ramzan Kadyrov'] })
    const clear = await adapter.run('sanctions', 'Jane Ordinary')
    expect(clear.ok).toBe(true)
    const hit = await adapter.run('sanctions', 'ramzan kadyrov')
    expect(hit.ok).toBe(false)
    expect(hit.detail).toMatch(/escalate/)
    await expect(adapter.run('identity', 'x')).rejects.toThrow(/does not answer/)
  })
})
