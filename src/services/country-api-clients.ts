/**
 * Country API Clients — working integrations with the public, no-auth and
 * api-key official APIs catalogued in `src/config/country-apis.ts`.
 *
 * One file per *auth pattern*, not per country: the catalogue is broad,
 * but the realised auth surface is narrow (no-auth JSON, key-in-query,
 * SOAP). Heavy mTLS / OAuth integrations (HMRC MTD, ELSTER, SDI, ANAF,
 * KSeF, CFDI, NFe, SAT, IRS MeF) live in tenant-config-driven adapters
 * that need real secrets — out of scope for the public-facing core.
 *
 * Every client returns `{ ok, data?, error?, source }` so the caller can
 * branch on success without exception flow. `source` is the API name from
 * the catalogue, for audit-trail attribution.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 * @see ../config/country-apis.ts
 */

import { COUNTRY_APIS, BANK_APIS } from '@/config/country-apis'

export interface ApiResult<T> {
  readonly ok: boolean
  readonly data?: T
  readonly error?: string
  readonly source: string
}

const ok = <T,>(source: string, data: T): ApiResult<T> => ({ ok: true, data, source })
const err = (source: string, error: string): ApiResult<never> => ({ ok: false, error, source })

// ─── 1. EU VIES — VAT validation (SOAP, public) ──────────────────────────

export interface ViesResult {
  countryCode: string
  vatNumber: string
  valid: boolean
  name?: string
  address?: string
  requestDate?: string
}

/**
 * Validate an EU VAT number via the DG TAXUD VIES SOAP service.
 * SOAP body kept inline — no SOAP client dependency needed for a one-op call.
 */
export async function checkVies(country: string, vatNumber: string): Promise<ApiResult<ViesResult>> {
  const cc = country.toUpperCase()
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ` +
    `xmlns:tns="urn:ec.europa.eu:taxud:vies:services:checkVat:types">` +
    `<soap:Body><tns:checkVat>` +
    `<tns:countryCode>${cc}</tns:countryCode>` +
    `<tns:vatNumber>${vatNumber.replace(/\D/g, '')}</tns:vatNumber>` +
    `</tns:checkVat></soap:Body></soap:Envelope>`
  try {
    const r = await fetch('https://ec.europa.eu/taxation_customs/vies/services/checkVatService', {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: '' },
      body,
    })
    const text = await r.text()
    const valid = /<valid>true<\/valid>/i.test(text)
    const name = /<name>([\s\S]*?)<\/name>/i.exec(text)?.[1]?.trim()
    const address = /<address>([\s\S]*?)<\/address>/i.exec(text)?.[1]?.trim()
    return ok('VIES', { countryCode: cc, vatNumber, valid, name, address })
  } catch (e) {
    return err('VIES', String(e))
  }
}

// ─── 2. Companies House — UK, free key-based JSON ────────────────────────

export interface CompaniesHouseProfile {
  companyNumber: string
  companyName?: string
  status?: string
  jurisdiction?: string
  incorporationDate?: string
}

export async function lookupCompaniesHouse(
  companyNumber: string,
  apiKey: string,
): Promise<ApiResult<CompaniesHouseProfile>> {
  if (!apiKey) return err('Companies House', 'API key required')
  try {
    const r = await fetch(`https://api.company-information.service.gov.uk/company/${encodeURIComponent(companyNumber)}`, {
      headers: { Authorization: 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64') },
    })
    if (!r.ok) return err('Companies House', `HTTP ${r.status}`)
    const j = (await r.json()) as Record<string, unknown>
    return ok('Companies House', {
      companyNumber,
      companyName: j.company_name as string | undefined,
      status: j.company_status as string | undefined,
      jurisdiction: j.jurisdiction as string | undefined,
      incorporationDate: j.date_of_creation as string | undefined,
    })
  } catch (e) {
    return err('Companies House', String(e))
  }
}

// ─── 3. KvK Handelsregister — NL, key-based JSON ─────────────────────────

export interface KvkProfile {
  kvkNumber: string
  name?: string
  type?: string
}

export async function lookupKvk(kvkNumber: string, apiKey: string): Promise<ApiResult<KvkProfile>> {
  if (!apiKey) return err('KvK', 'API key required')
  try {
    const r = await fetch(`https://api.kvk.nl/api/v1/basisprofielen/${encodeURIComponent(kvkNumber)}`, {
      headers: { apikey: apiKey },
    })
    if (!r.ok) return err('KvK', `HTTP ${r.status}`)
    const j = (await r.json()) as Record<string, unknown>
    return ok('KvK', { kvkNumber, name: j.naam as string | undefined, type: j.type as string | undefined })
  } catch (e) {
    return err('KvK', String(e))
  }
}

// ─── 4. Brønnøysundregistrene — NO, free open JSON ───────────────────────

export interface BrregProfile {
  organisasjonsnummer: string
  navn?: string
  organisasjonsform?: string
  registrertIMvaregisteret?: boolean
}

export async function lookupBrreg(orgNr: string): Promise<ApiResult<BrregProfile>> {
  try {
    const r = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${encodeURIComponent(orgNr)}`)
    if (!r.ok) return err('Brreg', `HTTP ${r.status}`)
    const j = (await r.json()) as Record<string, unknown>
    return ok('Brreg', {
      organisasjonsnummer: orgNr,
      navn: j.navn as string | undefined,
      organisasjonsform: ((j.organisasjonsform as Record<string, unknown> | undefined)?.kode as string | undefined),
      registrertIMvaregisteret: j.registrertIMvaregisteret as boolean | undefined,
    })
  } catch (e) {
    return err('Brreg', String(e))
  }
}

// ─── 5. INSEE SIRENE — FR, OAuth2 client-credentials ────────────────────

export interface InseeProfile {
  siren: string
  denomination?: string
  naf?: string
  etat?: string
}

export async function lookupInseeSirene(siren: string, bearer: string): Promise<ApiResult<InseeProfile>> {
  if (!bearer) return err('INSEE SIRENE', 'OAuth bearer required')
  try {
    const r = await fetch(`https://api.insee.fr/entreprises/sirene/V3.11/siren/${encodeURIComponent(siren)}`, {
      headers: { Authorization: `Bearer ${bearer}`, Accept: 'application/json' },
    })
    if (!r.ok) return err('INSEE SIRENE', `HTTP ${r.status}`)
    const j = (await r.json()) as Record<string, unknown>
    const u = (j.uniteLegale as Record<string, unknown> | undefined) ?? {}
    return ok('INSEE SIRENE', {
      siren,
      denomination: u.denominationUniteLegale as string | undefined,
      naf: u.activitePrincipaleUniteLegale as string | undefined,
      etat: u.etatAdministratifUniteLegale as string | undefined,
    })
  } catch (e) {
    return err('INSEE SIRENE', String(e))
  }
}

// ─── 6. Bulgarian Търговски Регистър — public no-auth JSON ──────────────

export interface BgTrProfile {
  eik: string
  name?: string
  status?: string
}

export async function lookupBgTradeRegister(eik: string): Promise<ApiResult<BgTrProfile>> {
  try {
    const r = await fetch(`https://portal.registryagency.bg/api/public/companies/${encodeURIComponent(eik)}`)
    if (!r.ok) return err('BG TR', `HTTP ${r.status}`)
    const j = (await r.json()) as Record<string, unknown>
    return ok('BG TR', {
      eik,
      name: j.name as string | undefined,
      status: j.status as string | undefined,
    })
  } catch (e) {
    return err('BG TR', String(e))
  }
}

// ─── 7. Peppol Directory — pan-EU, JSON public ───────────────────────────

export interface PeppolParticipant {
  participantId: string
  registered: boolean
  name?: string
  documentTypes?: string[]
}

export async function lookupPeppolParticipant(participantId: string): Promise<ApiResult<PeppolParticipant>> {
  try {
    const r = await fetch(
      `https://directory.peppol.eu/search/1.0/json?q=${encodeURIComponent(participantId)}`,
    )
    if (!r.ok) return err('Peppol Directory', `HTTP ${r.status}`)
    const j = (await r.json()) as { matches?: Array<Record<string, unknown>> }
    const m = j.matches?.[0]
    if (!m) return ok('Peppol Directory', { participantId, registered: false })
    return ok('Peppol Directory', {
      participantId,
      registered: true,
      name: ((m.entities as Array<Record<string, unknown>> | undefined)?.[0]?.name as string | undefined),
      documentTypes: (m.docTypes as Array<{ scheme: string; value: string }> | undefined)?.map(
        (d) => `${d.scheme}::${d.value}`,
      ),
    })
  } catch (e) {
    return err('Peppol Directory', String(e))
  }
}

// ─── 8. EU Sanctions — daily XML ─────────────────────────────────────────

export async function fetchEuSanctionsXml(): Promise<ApiResult<string>> {
  try {
    const r = await fetch(
      'https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content',
    )
    if (!r.ok) return err('EU Sanctions', `HTTP ${r.status}`)
    return ok('EU Sanctions', await r.text())
  } catch (e) {
    return err('EU Sanctions', String(e))
  }
}

// ─── 9. OFAC SDN — daily XML ─────────────────────────────────────────────

export async function fetchOfacSdnXml(): Promise<ApiResult<string>> {
  try {
    const r = await fetch('https://www.treasury.gov/ofac/downloads/sdn.xml')
    if (!r.ok) return err('OFAC SDN', `HTTP ${r.status}`)
    return ok('OFAC SDN', await r.text())
  } catch (e) {
    return err('OFAC SDN', String(e))
  }
}

// ─── 10. NTA Japan — corporate-number lookup, key-based JSON ─────────────

export interface JpHoujinProfile {
  corporateNumber: string
  name?: string
  prefectureName?: string
}

export async function lookupJpHoujinBangou(
  corporateNumber: string,
  apiKey: string,
): Promise<ApiResult<JpHoujinProfile>> {
  if (!apiKey) return err('NTA Houjin Bangou', 'API key required')
  try {
    const r = await fetch(
      `https://api.houjin-bangou.nta.go.jp/4/num?id=${encodeURIComponent(apiKey)}&number=${encodeURIComponent(corporateNumber)}&type=02`,
    )
    if (!r.ok) return err('NTA Houjin Bangou', `HTTP ${r.status}`)
    const t = await r.text()
    // CSV/XML/JSON mode (type=02 returns CSV) — extract the name as a quick parse
    const fields = t.split(/[,\n]/).map((s) => s.replace(/^"|"$/g, ''))
    return ok('NTA Houjin Bangou', {
      corporateNumber,
      name: fields[6],
      prefectureName: fields[9],
    })
  } catch (e) {
    return err('NTA Houjin Bangou', String(e))
  }
}

// ─── 11. SEC EDGAR — US public-company facts ─────────────────────────────

export async function lookupSecEdgar(cik: string): Promise<ApiResult<Record<string, unknown>>> {
  try {
    const padded = cik.padStart(10, '0')
    const r = await fetch(`https://data.sec.gov/submissions/CIK${padded}.json`, {
      headers: { 'User-Agent': 'erpax-country-context-client (compliance@erpax.dev)' },
    })
    if (!r.ok) return err('SEC EDGAR', `HTTP ${r.status}`)
    return ok('SEC EDGAR', (await r.json()) as Record<string, unknown>)
  } catch (e) {
    return err('SEC EDGAR', String(e))
  }
}

// ─── Catalogue dispatcher ────────────────────────────────────────────────

/**
 * Returns the union of business-end + banking APIs catalogued for a
 * country, including the pan-EU set when applicable. Mirrors the
 * `country-context.service` surface.
 */
export function listAllCountryApis(country: string) {
  const cc = country.toUpperCase()
  return [
    ...(COUNTRY_APIS[cc] ?? []),
    ...(BANK_APIS[cc] ?? []),
    ...(BANK_APIS.GLOBAL ?? []),
  ]
}
