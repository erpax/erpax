import { describe, it, expect } from 'vitest'
import {
  resolveBgTrustedListUrl,
  parseQualifiedServices,
  fetchQualifiedServices,
  requiredServiceType,
  verifyQualified,
  qtspAdapter,
  EU_LOTL,
  SVC_QC,
  SVC_QTST,
  SVC_GRANTED,
} from './index'
import type { Fetcher, QualifiedService } from './index'

/** A deterministic fetcher over a route table — tests never touch the network. */
const fakeFetcher = (routes: Record<string, string>): Fetcher => async (url: string) => ({
  ok: routes[url] !== undefined,
  status: routes[url] !== undefined ? 200 : 404,
  async text() {
    return routes[url] ?? ''
  },
})

/** A minimal LOTL fixture with two BG pointers (pdf + xml) — the resolver must pick the machine-readable xml. */
const LOTL_FIXTURE = `
<OtherTSLPointer><TSLLocation>https://crc.bg/files/_en/TSL_BG.pdf</TSLLocation>
  <SchemeTerritory>BG</SchemeTerritory></OtherTSLPointer>
<OtherTSLPointer><TSLLocation>https://crc.bg/files/_en/TSL_BG.xml</TSLLocation>
  <SchemeTerritory>BG</SchemeTerritory></OtherTSLPointer>
<OtherTSLPointer><TSLLocation>https://de.example/TSL_DE.xml</TSLLocation>
  <SchemeTerritory>DE</SchemeTerritory></OtherTSLPointer>`

/** A minimal BG Trusted List fixture: BORICA has a granted QTST + granted CA/QC; a withdrawn QC must not count. */
const TSL_FIXTURE = `
<TrustServiceProvider>
  <TSPInformation><TSPName><Name xml:lang="en">BORICA AD</Name></TSPName></TSPInformation>
  <TSPServices>
    <TSPService><ServiceInformation>
      <ServiceTypeIdentifier>${SVC_QTST}</ServiceTypeIdentifier>
      <ServiceName><Name xml:lang="en">B-Trust Qualified Time Stamp Authority</Name></ServiceName>
      <ServiceStatus>${SVC_GRANTED}</ServiceStatus>
    </ServiceInformation></TSPService>
    <TSPService><ServiceInformation>
      <ServiceTypeIdentifier>${SVC_QC}</ServiceTypeIdentifier>
      <ServiceName><Name xml:lang="en">B-Trust Operational CA QES</Name></ServiceName>
      <ServiceStatus>${SVC_GRANTED}</ServiceStatus>
    </ServiceInformation></TSPService>
  </TSPServices>
</TrustServiceProvider>
<TrustServiceProvider>
  <TSPInformation><TSPName><Name xml:lang="en">Legacy CA</Name></TSPName></TSPInformation>
  <TSPServices>
    <TSPService><ServiceInformation>
      <ServiceTypeIdentifier>${SVC_QC}</ServiceTypeIdentifier>
      <ServiceName><Name xml:lang="en">Old QES CA</Name></ServiceName>
      <ServiceStatus>http://uri.etsi.org/TrstSvc/TrustedList/Svcstatus/withdrawn</ServiceStatus>
    </ServiceInformation></TSPService>
  </TSPServices>
</TrustServiceProvider>`

describe('notary/check/qtsp — real eIDAS qualified-trust verification', () => {
  it('resolves the BG trusted-list url from the LOTL — the machine-readable .xml pointer, not the .pdf', () => {
    expect(resolveBgTrustedListUrl(LOTL_FIXTURE)).toBe('https://crc.bg/files/_en/TSL_BG.xml')
    expect(resolveBgTrustedListUrl('<OtherTSLPointer><SchemeTerritory>FR</SchemeTerritory></OtherTSLPointer>')).toBeNull()
  })

  it('parses qualified services per-TSP with type and status (each service keeps its provider name)', () => {
    const svcs = parseQualifiedServices(TSL_FIXTURE)
    expect(svcs).toContainEqual({
      tsp: 'BORICA AD',
      type: SVC_QTST,
      status: SVC_GRANTED,
      name: 'B-Trust Qualified Time Stamp Authority',
    })
    expect(svcs.filter((s) => s.tsp === 'BORICA AD')).toHaveLength(2)
    expect(svcs.find((s) => s.tsp === 'Legacy CA')?.status).toMatch(/withdrawn/)
  })

  it('maps the notary check to its ETSI service type — and refuses non-signature/timestamp checks', () => {
    expect(requiredServiceType('signature')).toBe(SVC_QC)
    expect(requiredServiceType('timestamp')).toBe(SVC_QTST)
    expect(() => requiredServiceType('title')).toThrow(/does not answer/)
  })

  it('verifies a GRANTED qualified service — withdrawn does not count, and a QTSP name scopes the check', () => {
    const svcs = parseQualifiedServices(TSL_FIXTURE)
    expect(verifyQualified('timestamp', '', svcs).ok).toBe(true) // a granted QTST exists
    expect(verifyQualified('signature', 'BORICA', svcs).ok).toBe(true) // BORICA holds a granted CA/QC
    expect(verifyQualified('signature', 'Legacy CA', svcs).ok).toBe(false) // its QC is withdrawn ⇒ not granted
    expect(verifyQualified('signature', 'NoSuchQTSP', svcs).ok).toBe(false) // unknown provider ⇒ no service
  })

  it('fetchQualifiedServices follows LOTL → BG TL → parse (injected fetch, no network)', async () => {
    const f = fakeFetcher({ [EU_LOTL]: LOTL_FIXTURE, 'https://crc.bg/files/_en/TSL_BG.xml': TSL_FIXTURE })
    const svcs = await fetchQualifiedServices(f)
    expect(svcs.some((s) => s.type === SVC_QTST && s.status === SVC_GRANTED)).toBe(true)
  })

  it('throws (never fabricates) when the LOTL or the BG trusted list is unreachable', async () => {
    await expect(fetchQualifiedServices(fakeFetcher({}))).rejects.toThrow(/LOTL unreachable/)
    await expect(fetchQualifiedServices(fakeFetcher({ [EU_LOTL]: LOTL_FIXTURE }))).rejects.toThrow(/unreachable/)
  })

  it('the adapter answers signature & timestamp — available vs not — and refuses other checks', async () => {
    const services: QualifiedService[] = parseQualifiedServices(TSL_FIXTURE)
    const adapter = qtspAdapter({ services })
    const sig = await adapter.run('signature', 'BORICA')
    expect(sig.ok).toBe(true)
    expect(sig.detail).toMatch(/Trusted List/)
    const ts = await adapter.run('timestamp', '')
    expect(ts.ok).toBe(true)
    await expect(adapter.run('title', 'x')).rejects.toThrow(/does not answer/)
  })
})
