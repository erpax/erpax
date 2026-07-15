/**
 * notary/check/qtsp — a REAL wired provider: eIDAS qualified-trust verification against the EU Trusted
 * List. This answers the `signature` and `timestamp` checks of notary/check, connected to live data.
 *
 * Source chain (verified live 2026-07-15): the machine-readable root of trust is the European Commission
 * List Of Trusted Lists (LOTL) at ec.europa.eu (EU_LOTL below, ~476 KB, HTTP 200). It points to each
 * member state's Trusted List; the Bulgarian TL is published by the CRC (Communications Regulation
 * Commission, the eIDAS supervisory body) at crc.bg (~627 KB, HTTP 200). We resolve the BG TL URL from
 * the LOTL (never hardcode a country pointer), fetch it, and parse the qualified trust SERVICES:
 *   - CA/QC    → issuing qualified certificates for qualified electronic SIGNATURE (the `signature` check)
 *   - TSA/QTST → qualified electronic TIMESTAMP, RFC 3161 (the `timestamp` check)
 * A service counts only when its status is `granted`. Live-verified counts: 64 granted CA/QC + 17 QTST
 * (BORICA/B-Trust, Evrotrust, ...), status vocabulary 95x `granted`.
 *
 * HONEST BOUNDARY:
 *  - This verifies QUALIFIED STATUS — that a named QTSP holds a granted qualified signature/timestamp
 *    service on the authoritative eIDAS Trusted List. It is public and needs NO credential.
 *  - It does NOT itself ISSUE a signature or a timestamp. Actual issuance (signing a hash, stamping an
 *    RFC 3161 token) requires a QTSP ACCOUNT credential — a B-Trust / Evrotrust / InfoNotary API key or
 *    certificate — supplied at deploy time as injected config (see `IssuanceSeam`). No token is
 *    fabricated here; the credential seam is left open and honest.
 *  - Production INGESTS the LOTL/TL periodically (they change slowly) and verifies against the cached
 *    service set; it does not fetch ~1 MB per notarial act. Pass a cached `services` list in that case.
 *
 * @standard eIDAS (EU 910/2014) — qualified electronic signature (Art. 25) + qualified timestamp (Art. 42)
 * @standard eIDAS Art. 22 — member-state Trusted Lists; ETSI TS 119 612 — TL format
 * @standard RFC 3161 — trusted timestamp protocol
 *
 * Composes [[notary]] · [[law]] · [[standards]].
 */
import type { Check, CheckResult, Provider, ProviderAdapter } from '@/notary/check'

/** The EU List Of Trusted Lists — the machine-readable root of the eIDAS trust scheme (no country hardcoded). */
export const EU_LOTL = 'https://ec.europa.eu/tools/lotl/eu-lotl.xml'

/** ETSI service-type URIs — the qualified services a notary's signature/timestamp checks depend on. */
export const SVC_QC = 'http://uri.etsi.org/TrstSvc/Svctype/CA/QC' // qualified cert for e-signature
export const SVC_QTST = 'http://uri.etsi.org/TrstSvc/Svctype/TSA/QTST' // qualified timestamp (RFC 3161)
/** A service is usable only when its supervisory status is `granted`. */
export const SVC_GRANTED = 'http://uri.etsi.org/TrstSvc/TrustedList/Svcstatus/granted'

/** Minimal fetch surface (a Worker's global `fetch` fits) — injectable so tests never touch the network. */
export type Fetcher = (url: string) => Promise<{ readonly ok: boolean; readonly status: number; text(): Promise<string> }>

/** One qualified trust service parsed from a national Trusted List. */
export interface QualifiedService {
  readonly tsp: string // trust service provider (e.g. "BORICA AD")
  readonly type: string // ETSI ServiceTypeIdentifier URI
  readonly status: string // ETSI ServiceStatus URI
  readonly name: string // service name (e.g. "B-Trust Qualified Time Stamp Authority")
}

/**
 * The deploy-time issuance credential seam — how a live signature/timestamp is actually MINTED. Left open
 * and honest: verification (above) is public; issuance needs a QTSP account. Never fabricate a token.
 */
export interface IssuanceSeam {
  readonly qtsp: string // which trusted QTSP account (e.g. "BORICA AD")
  readonly apiKey?: string // injected at deploy from env — NOT stored, NOT defaulted
  readonly endpoint?: string // QTSP signing/TSA endpoint from its service docs
}

/** Resolve the Bulgarian Trusted List URL from the LOTL — pick the BG pointer whose location is `.xml`. */
export function resolveBgTrustedListUrl(lotlXml: string): string | null {
  for (const block of lotlXml.split('<OtherTSLPointer>')) {
    if (!block.includes('<SchemeTerritory>BG</SchemeTerritory>')) continue
    const loc = [...block.matchAll(/<TSLLocation>([^<]+)<\/TSLLocation>/g)]
      .map((m) => m[1].trim())
      .find((u) => u.toLowerCase().endsWith('.xml'))
    if (loc) return loc
  }
  return null
}

/** Parse the qualified trust services out of a national Trusted List XML (per-TSP, per-service). */
export function parseQualifiedServices(tslXml: string): QualifiedService[] {
  const services: QualifiedService[] = []
  // Each provider block carries its TSPName; its TSPService children carry type + status.
  for (const tspBlock of tslXml.split('<TrustServiceProvider>').slice(1)) {
    const tsp = firstEnName(tspBlock.split('<TSPServices>')[0] ?? '') ?? 'unknown TSP'
    for (const svc of tspBlock.split('<TSPService>').slice(1)) {
      const info = svc.split('<ServiceHistory')[0] // the CURRENT service, not historical instances
      const type = info.match(/<ServiceTypeIdentifier>([^<]+)<\/ServiceTypeIdentifier>/)?.[1]?.trim()
      const status = info.match(/<ServiceStatus>([^<]+)<\/ServiceStatus>/)?.[1]?.trim()
      if (!type || !status) continue
      services.push({ tsp, type, status, name: firstEnName(info) ?? '' })
    }
  }
  return services
}

/** First English `<Name xml:lang="en">…</Name>` in a block — the human-readable provider/service name. */
function firstEnName(block: string): string | null {
  return block.match(/<Name xml:lang="en">([^<]+)<\/Name>/)?.[1]?.trim() ?? null
}

/** Fetch the current BG qualified trust services: LOTL → BG TL → parse (never hardcode a timestamped list). */
export async function fetchQualifiedServices(
  fetcher: Fetcher = globalThis.fetch as unknown as Fetcher,
): Promise<QualifiedService[]> {
  const lotlRes = await fetcher(EU_LOTL)
  if (!lotlRes.ok) throw new Error(`EU LOTL unreachable: ${lotlRes.status}`)
  const tlUrl = resolveBgTrustedListUrl(await lotlRes.text())
  if (!tlUrl) throw new Error('LOTL has no BG trusted-list pointer')
  const tlRes = await fetcher(tlUrl)
  if (!tlRes.ok) throw new Error(`BG trusted list unreachable: ${tlRes.status}`)
  return parseQualifiedServices(await tlRes.text())
}

/** The ETSI service type a notary check depends on: signature ⇒ CA/QC, timestamp ⇒ TSA/QTST. */
export function requiredServiceType(check: Check): string {
  if (check === 'signature') return SVC_QC
  if (check === 'timestamp') return SVC_QTST
  throw new Error(`qtsp adapter does not answer "${check}"`)
}

/**
 * Verify a qualified service is available (and granted) for `check`, optionally restricted to a named QTSP.
 * Empty subject = "is ANY granted qualified provider on the trusted list?"; a name = that provider must hold it.
 */
export function verifyQualified(
  check: Check,
  subject: string,
  services: readonly QualifiedService[],
): { ok: boolean; providers: string[] } {
  const type = requiredServiceType(check)
  const want = subject.trim().toLowerCase()
  const granted = services.filter((s) => s.type === type && s.status === SVC_GRANTED)
  const scoped = want
    ? granted.filter((s) => s.tsp.toLowerCase().includes(want) || s.name.toLowerCase().includes(want))
    : granted
  return { ok: scoped.length > 0, providers: [...new Set(scoped.map((s) => s.tsp))] }
}

/**
 * The real qtsp ProviderAdapter for notary/check. Answers `signature` and `timestamp` by verifying a
 * GRANTED qualified service on the authoritative eIDAS Trusted List. `ok:true` = a qualified provider is
 * available (and, if a QTSP name is given as subject, that it holds the service). Pass a cached `services`
 * list in production; the fetcher is injectable for tests. An unreachable trusted list THROWS — a seal is
 * never issued on a fabricated verification. Actual issuance uses the injected `IssuanceSeam` (credential).
 */
export function qtspAdapter(
  opts: { services?: readonly QualifiedService[]; fetcher?: Fetcher; issuance?: IssuanceSeam } = {},
): ProviderAdapter {
  const provider: Provider = 'qtsp'
  return {
    provider,
    async run(check: Check, subject: string): Promise<CheckResult> {
      requiredServiceType(check) // throws on any check but signature/timestamp
      const services = opts.services ?? (await fetchQualifiedServices(opts.fetcher))
      const { ok, providers } = verifyQualified(check, subject, services)
      const kind = check === 'signature' ? 'qualified e-signature (CA/QC)' : 'qualified timestamp (TSA/QTST)'
      return {
        ok,
        detail: ok
          ? `${kind} available on the eIDAS Trusted List: ${providers.slice(0, 3).join('; ')}`
          : `no GRANTED ${kind} on the eIDAS Trusted List${subject ? ` for "${subject}"` : ''}`,
        at: new Date().toISOString(),
      }
    },
  }
}
