import { describe, it, expect } from 'vitest'
import { isValidCadastralRef, parcelQueryUrl, fetchParcel, cadastreAdapter, CADASTRE_PARCEL_QUERY } from './index'
import type { Fetcher } from './index'

/** A deterministic fetcher over a route table — tests never touch the network. */
const fakeFetcher = (routes: Record<string, string>): Fetcher => async (url: string) => ({
  ok: routes[url] !== undefined,
  status: routes[url] !== undefined ? 200 : 404,
  async text() {
    return routes[url] ?? ''
  },
})

/** A real-shaped ArcGIS response for parcel 15285.14.122 (the live 2026-07-15 fetch), and an empty one. */
const PARCEL = JSON.stringify({
  features: [{ attributes: { nationalcadastralref: '15285.14.122', areavalue: 1471.0, areavalue_uom: 'm2', admunit: 905, id_namespace: 'BG.CP' } }],
})
const EMPTY = JSON.stringify({ features: [] })

describe('notary/check/cadastre — real parcel identity via the АГКК INSPIRE service', () => {
  it('validates the national cadastral reference — digits and dots only (no injection)', () => {
    expect(isValidCadastralRef('15285.14.122')).toBe(true)
    expect(isValidCadastralRef("15285.14.122' OR '1'='1")).toBe(false)
    expect(isValidCadastralRef('abc')).toBe(false)
  })

  it('builds the ArcGIS query url and REFUSES an invalid reference before it reaches the where clause', () => {
    expect(parcelQueryUrl('15285.14.122')).toContain(CADASTRE_PARCEL_QUERY)
    expect(parcelQueryUrl('15285.14.122')).toMatch(/nationalcadastralref/)
    expect(() => parcelQueryUrl("x'; DROP")).toThrow(/invalid cadastral reference/)
  })

  it('fetchParcel parses the INSPIRE identity — existence + area + admin unit', async () => {
    const f = fakeFetcher({ [parcelQueryUrl('15285.14.122')]: PARCEL })
    const p = await fetchParcel('15285.14.122', f)
    expect(p.exists).toBe(true)
    expect(p.areaM2).toBe(1471)
    expect(p.namespace).toBe('BG.CP')
    expect(p.adminUnit).toBe(905)
  })

  it('an unknown reference resolves to exists:false (never a fabricated parcel)', async () => {
    const f = fakeFetcher({ [parcelQueryUrl('99999.99.999')]: EMPTY })
    expect((await fetchParcel('99999.99.999', f)).exists).toBe(false)
  })

  it('throws on an unreachable cadastre service — never fabricates existence', async () => {
    await expect(fetchParcel('15285.14.122', fakeFetcher({}))).rejects.toThrow(/unreachable/)
  })

  it('the adapter answers cadastre — parcel found vs not — and refuses other checks', async () => {
    const f = fakeFetcher({ [parcelQueryUrl('15285.14.122')]: PARCEL })
    const adapter = cadastreAdapter({ fetcher: f })
    const hit = await adapter.run('cadastre', '15285.14.122')
    expect(hit.ok).toBe(true)
    expect(hit.detail).toMatch(/1471 m²/)
    await expect(adapter.run('title', '15285.14.122')).rejects.toThrow(/does not answer/)
  })
})
