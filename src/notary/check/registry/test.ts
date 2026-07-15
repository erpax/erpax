import { describe, it, expect } from 'vitest'
import { normalizeVat, viesUrl, fetchCompany, registryAdapter, VIES_REST } from './index'
import type { Fetcher } from './index'

/** A deterministic fetcher over a route table — tests never touch the network. */
const fakeFetcher = (routes: Record<string, string>): Fetcher => async (url: string) => ({
  ok: routes[url] !== undefined,
  status: routes[url] !== undefined ? 200 : 404,
  async text() {
    return routes[url] ?? ''
  },
})

/** A real-shaped VIES response for BORICA AD (the live 2026-07-15 fetch), and an invalid one. */
const BORICA = JSON.stringify({ isValid: true, name: 'БОРИКА - АД', address: 'бул. Цар Борис III №41, гр.СОФИЯ', vatNumber: '201230426' })
const INVALID = JSON.stringify({ isValid: false, name: '', address: '', vatNumber: '000000000' })

describe('notary/check/registry — real company verification via VIES over the national register', () => {
  it('normalises an EIK/VAT — strips the BG prefix and non-digits, defaults country to BG', () => {
    expect(normalizeVat('BG201230426')).toEqual({ country: 'BG', number: '201230426' })
    expect(normalizeVat(' 201230426 ')).toEqual({ country: 'BG', number: '201230426' })
    expect(normalizeVat('BG 2012 3042 6')).toEqual({ country: 'BG', number: '201230426' })
  })

  it('builds the VIES REST url for the country + number', () => {
    expect(viesUrl('BG', '201230426')).toBe(`${VIES_REST}/BG/vat/201230426`)
  })

  it('fetchCompany parses the registered identity — name + address behind the VAT/EIK', async () => {
    const f = fakeFetcher({ [viesUrl('BG', '201230426')]: BORICA })
    const c = await fetchCompany('BG201230426', f)
    expect(c.exists).toBe(true)
    expect(c.name).toBe('БОРИКА - АД')
    expect(c.address).toMatch(/СОФИЯ/)
  })

  it('a non-registered number resolves to exists:false (never a fabricated company)', async () => {
    const f = fakeFetcher({ [viesUrl('BG', '000000000')]: INVALID })
    expect((await fetchCompany('000000000', f)).exists).toBe(false)
  })

  it('throws on empty input and on an unreachable VIES — never fabricates existence', async () => {
    await expect(fetchCompany('', fakeFetcher({}))).rejects.toThrow(/empty/)
    await expect(fetchCompany('201230426', fakeFetcher({}))).rejects.toThrow(/unreachable/)
  })

  it('the adapter answers company — exists vs not — and REFUSES title/encumbrance (credentialed Property Register)', async () => {
    const f = fakeFetcher({ [viesUrl('BG', '201230426')]: BORICA })
    const adapter = registryAdapter({ fetcher: f })
    const hit = await adapter.run('company', 'BG201230426')
    expect(hit.ok).toBe(true)
    expect(hit.detail).toMatch(/БОРИКА/)
    await expect(adapter.run('title', 'parcel-1')).rejects.toThrow(/Property Register/)
    await expect(adapter.run('encumbrance', 'parcel-1')).rejects.toThrow(/Property Register/)
    await expect(adapter.run('identity', 'x')).rejects.toThrow(/does not answer/)
  })
})
