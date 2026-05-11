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

// ─── BG: BNB daily exchange rates ────────────────────────────────────────

/**
 * One row of the BNB daily fixing — currency code + value in BGN per
 * `n` units of the foreign currency (BNB publishes rates as "1 USD = X BGN"
 * or "100 JPY = X BGN" depending on the currency's typical magnitude).
 */
export interface BnbRate {
  /** ISO-4217 currency code. */
  readonly currency: string
  /** Number of foreign-currency units the rate is quoted for (1 / 100 / etc.). */
  readonly units: number
  /** Rate in BGN per `units` of the foreign currency. */
  readonly rate: number
  /** Date the rate is valid for, ISO-8601 `YYYY-MM-DD`. */
  readonly date: string
}

/**
 * Fetch a single foreign-currency rate from БНБ's daily fixing publisher.
 * No auth required — the BNB endpoint is a public XML feed used as the
 * IAS-21 revaluation anchor for BG-resident entities.
 *
 * BG joined the eurozone effective 2026-01-01 (per the official Council
 * decision); legacy historical rates remain published at the BNB endpoint
 * for back-dated revaluation.
 *
 * @param currency  ISO-4217 code (e.g. `'USD'`, `'GBP'`, `'JPY'`)
 * @param date      Optional ISO-8601 `YYYY-MM-DD`. Defaults to today.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 */
export async function lookupBnbExchangeRate(
  currency: string,
  date?: string,
): Promise<ApiResult<BnbRate>> {
  const cur = currency.toUpperCase()
  const day = (date ?? new Date().toISOString().slice(0, 10)).replace(/-/g, '')
  // BNB publishes a download endpoint for one currency, one day:
  //   /Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/StERFCDownload.aspx
  //   ?download=xml&group1=second&periodStartDays=DD&periodStartMonths=MM&periodStartYear=YYYY
  //   &periodEndDays=DD&periodEndMonths=MM&periodEndYear=YYYY&valutes=USD&search=true
  const yyyy = day.slice(0, 4)
  const mm = day.slice(4, 6)
  const dd = day.slice(6, 8)
  const url =
    'https://www.bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/' +
    `StERFCDownload.aspx?download=xml&group1=second&periodStartDays=${dd}&periodStartMonths=${mm}` +
    `&periodStartYear=${yyyy}&periodEndDays=${dd}&periodEndMonths=${mm}&periodEndYear=${yyyy}` +
    `&valutes=${cur}&search=true`
  try {
    const r = await fetch(url, { headers: { Accept: 'application/xml' } })
    if (!r.ok) return err('БНБ', `HTTP ${r.status}`)
    const text = await r.text()
    // BNB XML shape: <ROW><CODE>USD</CODE><RATIO>1</RATIO><RATE>1.83456</RATE>...</ROW>
    const code = /<CODE>([\s\S]*?)<\/CODE>/i.exec(text)?.[1]?.trim()
    const ratio = /<RATIO>([\s\S]*?)<\/RATIO>/i.exec(text)?.[1]?.trim()
    const rate = /<RATE>([\s\S]*?)<\/RATE>/i.exec(text)?.[1]?.trim()
    if (!code || !rate) return err('БНБ', `No fixing for ${cur} on ${yyyy}-${mm}-${dd}`)
    const parsedRate = Number(rate.replace(',', '.'))
    if (!Number.isFinite(parsedRate)) return err('БНБ', `Unparseable rate "${rate}"`)
    return ok('БНБ', {
      currency: code,
      units: ratio ? Number(ratio) : 1,
      rate: parsedRate,
      date: `${yyyy}-${mm}-${dd}`,
    })
  } catch (e) {
    return err('БНБ', String(e))
  }
}

// ─── EU: ECB reference daily exchange rates ──────────────────────────────

/**
 * One row of the ECB reference fixing — currency code + rate against EUR.
 * Mirrors the {@link BnbRate} shape so EU-fallback consumers can branch on
 * the source label without reshaping the data.
 */
export interface EcbRate {
  /** ISO-4217 currency code. */
  readonly currency: string
  /** Always 1 — ECB always quotes "1 unit foreign = X EUR". */
  readonly units: number
  /** Rate quoted as foreign-currency-per-EUR (ECB SDMX convention). */
  readonly rate: number
  /** Date the rate is valid for, ISO-8601 `YYYY-MM-DD`. */
  readonly date: string
}

/**
 * Fetch a foreign-currency rate from the ECB euro reference daily fixing.
 * No auth, public XML SDMX feed. Used as the EU pan-fallback when a
 * national central bank's publisher returns no fixing for the requested
 * (currency, date).
 *
 * The ECB endpoint always serves *the latest* fixing — historical dates
 * use the 90-day-history feed (`eurofxref-hist-90d.xml`) which this
 * client falls back to when a non-current date is requested.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard SDMX 2.1 statistical-data-and-metadata-exchange
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 */
export async function lookupEcbExchangeRate(
  currency: string,
  date?: string,
): Promise<ApiResult<EcbRate>> {
  const cur = currency.toUpperCase()
  const today = new Date().toISOString().slice(0, 10)
  const target = date ?? today
  const url =
    target === today
      ? 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'
      : 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml'
  try {
    const r = await fetch(url, { headers: { Accept: 'application/xml' } })
    if (!r.ok) return err('ECB', `HTTP ${r.status}`)
    const xml = await r.text()
    // ECB SDMX shape: `<Cube time="YYYY-MM-DD"><Cube currency="USD" rate="1.08" />…`.
    // For the daily feed there's a single `<Cube time>`; the 90d history has many.
    const day = target
    const dayBlockRe = new RegExp(`<Cube time="${day}">([\\s\\S]*?)</Cube>`)
    const dayBlock =
      dayBlockRe.exec(xml)?.[1] ??
      // Fallback: take the latest `<Cube time>` block.
      /<Cube time="[\d-]+">([\s\S]*?)<\/Cube>/.exec(xml)?.[1]
    if (!dayBlock) return err('ECB', `No ECB fixing block for ${day}`)
    const rateRe = new RegExp(`<Cube currency="${cur}" rate="([\\d.]+)"`)
    const rateMatch = rateRe.exec(dayBlock)
    if (!rateMatch) return err('ECB', `No ECB fixing for ${cur} on ${day}`)
    const rate = Number(rateMatch[1])
    if (!Number.isFinite(rate)) return err('ECB', `Unparseable ECB rate "${rateMatch[1]}"`)
    return ok('ECB', { currency: cur, units: 1, rate, date: day })
  } catch (e) {
    return err('ECB', String(e))
  }
}

// ─── EU fallback chain (national → ECB) ─────────────────────────────────

/**
 * Per-country FX-rate resolvers. The fallback chain tries each in order
 * until one returns a successful result. Adding a new EU country = add
 * its national resolver to this map.
 */
type CurrencyRateResolver = (
  currency: string,
  date?: string,
) => Promise<ApiResult<{ currency: string; units: number; rate: number; date: string }>>

const NATIONAL_RATE_RESOLVERS: Readonly<Record<string, CurrencyRateResolver>> = {
  BG: lookupBnbExchangeRate,
}

/**
 * EU-fallback rate resolver — tries the country-specific publisher
 * (BNB / Banque de France / Banca d'Italia / etc.), falls back to ECB
 * when the national one returns no fixing, returns the first success.
 *
 * Result `source` field carries `'БНБ'` / `'ECB'` / etc. so callers can
 * audit-trail which publisher answered.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 */
export async function lookupEuFallbackRate(
  country: string,
  currency: string,
  date?: string,
): Promise<ApiResult<{ currency: string; units: number; rate: number; date: string }>> {
  const national = NATIONAL_RATE_RESOLVERS[country.toUpperCase()]
  if (national) {
    const result = await national(currency, date)
    if (result.ok && result.data) return result
  }
  // Fallback to ECB (pan-EU).
  return lookupEcbExchangeRate(currency, date)
}

// ─── EU fallback chain — VAT validation (national → VIES) ───────────────

/**
 * Per-country VAT-validation resolvers. Empty by default — most EU
 * national VAT registers don't expose a public API (BG НАП, IT
 * Agenzia delle Entrate, ES AEAT all sit behind mTLS). Tenants with
 * provisioned national-register access plug a resolver in via the
 * standard `(country, vatNumber) → ApiResult<ViesResult>` shape.
 */
type VatValidationResolver = (vatNumber: string) => Promise<ApiResult<ViesResult>>
const NATIONAL_VAT_RESOLVERS: Readonly<Record<string, VatValidationResolver>> = {
  // BG: НАП VAT register requires mTLS — adapter plugs in here.
  // DE: Bundeszentralamt für Steuern — qualified mTLS.
  // IT: Agenzia delle Entrate ricerca PIVA — public web, throttled.
}

/**
 * EU-fallback VAT-validation resolver — tries the country-specific
 * register first, falls back to VIES (pan-EU SOAP). Returns the first
 * success.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @compliance EU 2006/112/EC vat-system-directive Art.214
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 */
export async function lookupVatValidationFallback(
  country: string,
  vatNumber: string,
): Promise<ApiResult<ViesResult>> {
  const cc = country.toUpperCase()
  const national = NATIONAL_VAT_RESOLVERS[cc]
  if (national) {
    const result = await national(vatNumber)
    if (result.ok && result.data) return result
  }
  return checkVies(cc, vatNumber)
}

// ─── EU fallback chain — sanctions screening ────────────────────────────

/**
 * Per-country sanctions resolvers. Empty by default — the EU
 * consolidated CFSP list already supersedes most national lists for
 * EU member states. Add a national resolver only when the country
 * maintains a strictly broader screen (e.g. UK HMT post-Brexit).
 */
type SanctionsResolver = () => Promise<ApiResult<string>>
const NATIONAL_SANCTIONS_RESOLVERS: Readonly<Record<string, SanctionsResolver>> = {}

/**
 * EU-fallback sanctions resolver — returns the consolidated list when
 * no national broader-screen resolver is registered. Result `data` is
 * the raw XML the caller parses.
 *
 * @compliance AMLD-5 ubo-screening
 * @compliance EU 2580/2001 cfsp-restrictive-measures
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 */
export async function lookupSanctionsFallback(
  country: string,
): Promise<ApiResult<string>> {
  const national = NATIONAL_SANCTIONS_RESOLVERS[country.toUpperCase()]
  if (national) {
    const result = await national()
    if (result.ok && result.data) return result
  }
  return fetchEuSanctionsXml()
}

// ─── EU fallback chain — e-invoicing participant discovery ──────────────

/**
 * Per-country e-invoicing-discovery resolvers. National e-invoicing
 * portals (IT SDI, FR Chorus Pro, PL KSeF) maintain their own receiver
 * directories; the PEPPOL Directory is the pan-EU baseline.
 */
type EInvoicingDiscoveryResolver = (
  participantId: string,
) => Promise<ApiResult<PeppolParticipant>>
const NATIONAL_EINVOICING_RESOLVERS: Readonly<Record<string, EInvoicingDiscoveryResolver>> = {}

/**
 * EU-fallback e-invoicing discovery — tries the national directory
 * first, falls back to the PEPPOL Directory.
 *
 * @standard EN-16931:2017 §B2G semantic-model
 * @standard Peppol-BIS-3.0 billing
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 */
export async function lookupEInvoicingParticipantFallback(
  country: string,
  participantId: string,
): Promise<ApiResult<PeppolParticipant>> {
  const national = NATIONAL_EINVOICING_RESOLVERS[country.toUpperCase()]
  if (national) {
    const result = await national(participantId)
    if (result.ok && result.data) return result
  }
  return lookupPeppolParticipant(participantId)
}

// ─── BG: syntactic validators (no API call needed) ───────────────────────

/**
 * Validate a BG VAT identifier syntactically. Format: `BG` prefix +
 * 9 or 10 digits (per `COUNTRY_SPECIFICS.BG.taxIdFormats[2].pattern`).
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard EN-16931:2017 §BT-31 seller-vat-identifier
 */
export function validateBgVatId(value: unknown): boolean {
  return typeof value === 'string' && /^BG\d{9,10}$/.test(value.trim().toUpperCase())
}

/**
 * Validate a Bulgarian EIK / Bulstat number syntactically. Format:
 * 9 digits (legal entity) or 13 digits (sole-proprietor / branch).
 * EGN (10 digits) is a personal identifier, not a business id.
 *
 * Does not perform the full check-digit computation (BG spec calls it the
 * "tens-of-digit checksum"); for a deeper validation use the trade-register
 * client (`lookupBgTradeRegister`) which actually resolves the number.
 *
 * @standard ISO-3166-1:2020 BG country-code
 */
export function validateBgEik(value: unknown): boolean {
  return typeof value === 'string' && /^\d{9}(\d{4})?$/.test(value.trim())
}

// ─── BG: ASPSP discovery (PSD2 / Berlin Group NextGenPSD2) ───────────────

/**
 * Discover authorised BG ASPSPs catalogued in `BANK_APIS.BG`. Returns the
 * subset with `kind === 'open_banking'` (skips the BNB register entry,
 * which is `kind === 'bank_directory'`). Used by the tenant-onboarding
 * flow to populate the bank-account creation form's ASPSP dropdown.
 *
 * @standard PSD2 EU 2015/2366 ais-pis
 * @standard Berlin Group NextGenPSD2 v1.3
 */
export function discoverBgAspsps(): ReadonlyArray<{ name: string; endpoint: string; authority: string }> {
  const all = BANK_APIS['BG'] ?? []
  return all
    .filter((api) => api.kind === 'open_banking')
    .map((api) => ({ name: api.name, endpoint: api.endpoint, authority: api.authority }))
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
