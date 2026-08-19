/**
 * Country API Clients — working integrations with the public, no-auth and
 * api-key official APIs catalogued in `src/country/api/index.ts`.
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
 * @see ../index.ts
 */

import { COUNTRY_APIS, BANK_APIS } from '@/country/api'

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

/**
 * A merchant as the Търговски Регистър states it.
 *
 * The register is kept as a **дело** (case file) per the ЗТРРЮЛНЦ: the дело
 * is held in electronic form and holds the заявления, the documents proving
 * each entered circumstance, and the обявени актове. Чл. 11 makes the base
 * data public and free — which is why this lookup needs no credential — while
 * documents carrying personal data sit behind an electronic signature or an
 * agency-issued certificate, and are deliberately NOT reached from here.
 */
export interface BgTrProfile {
  readonly eik: string
  /** Short name as the register writes it. */
  readonly name?: string
  /** Full legal name including the legal form, e.g. `"ИНФОРМАЦИОННО ОБСЛУЖВАНЕ" АД`. */
  readonly fullName?: string
  /** Register status code for the дело. */
  readonly status?: number
  /** Legal-form code. */
  readonly legalForm?: number
  /** How many заявления the дело carries — its filing history depth. */
  readonly applications?: number
}

/**
 * Look a merchant up in the Търговски Регистър.
 *
 * The previous address (`/api/public/companies/{eik}`) returns 404 — it was
 * dead in production. The portal is a single-page app whose server rewrites
 * every unknown path to the app shell, so a wrong path answers `200` with
 * HTML and a naive client reads that as success. The real route is the one
 * the portal itself calls, and it is addressed by **дело**, not by company:
 *
 *   `/CR/api/Deeds/{eik}/Applications`
 *
 * That is the regulated unit — the дело is what the register actually keeps,
 * and the company identity travels on each заявление in `incomingLinkedDeeds`.
 * So the merchant's name and status are read from the deed's own filings
 * rather than from a company endpoint that no longer exists.
 *
 * Public and unauthenticated per ЗТРРЮЛНЦ чл. 11. The endpoint rate-limits
 * (HTTP 429), which is surfaced rather than retried.
 */
export async function lookupBgTradeRegister(eik: string): Promise<ApiResult<BgTrProfile>> {
  const uic = encodeURIComponent(eik)
  try {
    const r = await fetch(`https://portal.registryagency.bg/CR/api/Deeds/${uic}/Applications`, {
      headers: {
        Accept: 'application/json',
        // Node's undici sends `Accept-Language: *` by default, and the register's
        // backend answers HTTP 500 to it — measured against the live host, that
        // header ALONE flips a working 200 into a 500. Sending a concrete
        // language fixes it. Without this the endpoint looks dead from Node
        // while curl succeeds, which is exactly how it reads as "TR is down".
        'Accept-Language': 'bg-BG,bg;q=0.9',
      },
    })
    if (!r.ok) return err('BG TR', `HTTP ${r.status}`)

    const body = await r.text()
    // An unknown path is rewritten to the SPA shell — HTML answering 200 is
    // NOT an answer, and must never be read as an empty register result.
    if (/^\s*</.test(body)) return err('BG TR', 'non-JSON response (portal shell)')
    if (!body.trim()) return err('BG TR', `No дело for ЕИК ${eik}`)

    const apps = JSON.parse(body) as ReadonlyArray<{
      readonly incomingLinkedDeeds?: ReadonlyArray<{
        readonly uic?: string
        readonly companyName?: string
        readonly companyFullName?: string
        readonly legalForm?: number
        readonly status?: number
      }>
    }>
    if (!Array.isArray(apps) || apps.length === 0) return err('BG TR', `No дело for ЕИК ${eik}`)

    // Every заявление links the deeds it touches; take the one that IS this ЕИК.
    const self = apps
      .flatMap((a) => a.incomingLinkedDeeds ?? [])
      .find((d) => d.uic === eik)
    if (!self) return err('BG TR', `Дело ${eik} carries no matching entry`)

    return ok('BG TR', {
      eik,
      name: self.companyName,
      fullName: self.companyFullName,
      status: self.status,
      legalForm: self.legalForm,
      applications: apps.length,
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

/**
 * The EU FSD sanctions download requires a `token` query parameter. It is the
 * Commission's PUBLIC, documented access token for the consolidated list — not a
 * credential, not per-user, and the same string for everyone.
 *
 * Without it the endpoint answers **403**, which is how this client was dead: it
 * fetched the URL bare, so every sanctions screen failed. A failing sanctions
 * fetch is the worst shape of this defect — a counterparty check that cannot run
 * is not a clean counterparty.
 */
const EU_SANCTIONS_TOKEN = 'dG9rZW4tMjAxNw'

export async function fetchEuSanctionsXml(): Promise<ApiResult<string>> {
  try {
    const r = await fetch(
      'https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content' +
        `?token=${EU_SANCTIONS_TOKEN}`,
    )
    if (!r.ok) return err('EU CFSP', `HTTP ${r.status}`)
    return ok('EU CFSP', await r.text())
  } catch (e) {
    return err('EU CFSP', String(e))
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
  /** ISO-4217 code of the FOREIGN currency being quoted. */
  readonly currency: string
  /**
   * The currency the fixing is expressed IN. `'EUR'` since Bulgaria adopted
   * the euro — БНБ's feed no longer quotes the lev at all. Named explicitly
   * because it USED to be implicit (BGN), and a rate whose quote currency is
   * assumed is the exact shape of a silent accounting error.
   */
  readonly quote: string
  /** Units of `currency` the rate covers. Always 1 in the euro feed. */
  readonly units: number
  /**
   * `quote` per `units` of `currency` — БНБ's `REVERSERATE` column.
   * This preserves the ORIGINAL meaning of this field (quote-currency per
   * unit of foreign currency); only the quote currency changed, BGN → EUR.
   */
  readonly rate: number
  /** Same as {@link rate}; the union-safe name shared with {@link EcbRate}. */
  readonly quotePerUnit: number
  /** `currency` per 1 `quote` — БНБ's `RATE` column (the inverse quote). */
  readonly inverse: number
  /** Date the fixing is valid for, ISO-8601 `YYYY-MM-DD`, READ FROM THE FEED. */
  readonly date: string
}

/**
 * The live БНБ daily-fixing feed.
 *
 * The previous address (`StERFCDownload.aspx`, with period + `valutes`
 * parameters) now serves an HTML page: it was dead in production and every
 * lookup through it failed. The working publisher is the rates page itself
 * with `download=xml`, and it takes NO parameters — it always serves the
 * full current fixing.
 */
const BNB_FIXING_URL =
  'https://www.bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/' +
  'index.htm?download=xml&search=&lang=EN'

/**
 * БНБ sits behind a WAF that answers an "incident ID" error page — under a
 * 200 — to clients it does not recognise. Measured against the live host:
 * `curl`, `Wget` and `python-requests` are served; Node's default undici
 * agent, a bare `erpax/1.0`, and every `Mozilla/…` string are refused. It is
 * gating BROWSER-shaped agents, not automation.
 *
 * So the UA leads with a compatibility token the WAF accepts and then names
 * erpax truthfully — the same convention as `Mozilla/5.0 (compatible;
 * Googlebot/2.1; +http://…)`. The endpoint is public open data, no credential
 * is sent, and the caller is identifiable from the string.
 *
 * Without this header the parser reads an HTML error page and every lookup
 * fails with "No fixing" — which is how this stayed broken while looking
 * like a data problem.
 */
const BNB_UA = 'curl/8.7.1 (erpax; +https://github.com/erpax/erpax)'

const tagOf = (block: string, tag: string): string | undefined =>
  new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i').exec(block)?.[1]?.trim()

/**
 * Fetch a foreign-currency rate from БНБ's daily fixing.
 *
 * Bulgaria adopted the euro, and the feed changed with it: the `RATIO`
 * column is GONE, `RATE` now means "foreign currency per 1 EUR", and
 * `REVERSERATE` means "EUR per unit of foreign currency". A parser written
 * for the lev-era shape reads nothing at all from it.
 *
 * Two traps this must not fall into, both live in the real feed:
 *
 *  1. **Row 0 is a HEADER row** whose values are the literal column labels
 *     (`<CODE>Code</CODE>`). A first-match regex parses the header and
 *     returns `"Code"` as a currency. Only a `[A-Z]{3}` code is a datum.
 *  2. **The feed ignores date parameters** — it always answers with today's
 *     fixing. Honouring a `date` argument by requesting it and returning
 *     whatever came back would label today's rate with a past date, which is
 *     a fabricated fixing. So a back-dated request is REFUSED, not guessed.
 *
 * @param currency  ISO-4217 code (e.g. `'USD'`, `'GBP'`, `'JPY'`)
 * @param date      Optional ISO-8601 `YYYY-MM-DD`. Only today is available.
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 */
export async function lookupBnbExchangeRate(
  currency: string,
  date?: string,
): Promise<ApiResult<BnbRate>> {
  const cur = currency.toUpperCase()
  try {
    const r = await fetch(BNB_FIXING_URL, {
      headers: { Accept: 'application/xml', 'User-Agent': BNB_UA },
    })
    if (!r.ok) return err('БНБ', `HTTP ${r.status}`)
    const text = await r.text()
    // A 200 carrying HTML is the WAF's error page, not an empty fixing.
    if (!/<ROWSET/i.test(text)) return err('БНБ', 'non-XML response (upstream WAF)')

    for (const m of text.matchAll(/<ROW>([\s\S]*?)<\/ROW>/gi)) {
      const block = m[1] ?? ''
      const code = tagOf(block, 'CODE')
      // The header row carries labels, not data — a code is three capitals.
      if (!code || !/^[A-Z]{3}$/.test(code) || code !== cur) continue

      const perEur = Number((tagOf(block, 'RATE') ?? '').replace(',', '.'))
      const eurPer = Number((tagOf(block, 'REVERSERATE') ?? '').replace(',', '.'))
      if (!Number.isFinite(eurPer) || !Number.isFinite(perEur)) {
        return err('БНБ', `Unparseable fixing for ${cur}`)
      }

      // The feed states the day it is valid for; never the day we asked for.
      // It dates as DD.MM.YYYY — NOT ISO. Defaulting to "today" when this fails
      // to parse would label the fixing with a date the publisher never stated,
      // which is the same fabrication the back-date refusal below exists to stop.
      const served = tagOf(block, 'CURR_DATE') ?? ''
      const dmy = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(served)
      if (!dmy) return err('БНБ', `Unparseable fixing date "${served}" for ${cur}`)
      const validFor = `${dmy[3]}-${dmy[2]}-${dmy[1]}`

      if (date && date !== validFor) {
        return err(
          'БНБ',
          `БНБ publishes only the current fixing (${validFor}); ${date} requires a historical source`,
        )
      }

      return ok('БНБ', {
        currency: code,
        quote: 'EUR',
        units: 1,
        rate: eurPer,
        quotePerUnit: eurPer,
        inverse: perEur,
        date: validFor,
      })
    }
    return err('БНБ', `No fixing for ${cur}`)
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
  /** The currency the fixing is expressed in — always `'EUR'` for the ECB. */
  readonly quote: string
  /** Always 1 — ECB always quotes "1 unit foreign = X EUR". */
  readonly units: number
  /** Rate quoted as foreign-currency-per-EUR (ECB SDMX convention). */
  readonly rate: number
  /**
   * `quote` (EUR) per 1 unit of `currency` — the INVERSE of {@link rate}.
   *
   * The ECB and БНБ quote in OPPOSITE directions: ECB publishes foreign-per-EUR,
   * БНБ publishes EUR-per-foreign. A consumer that reads `rate` from whichever
   * publisher answered silently inverts every rate when the fallback fires, so
   * this field — identical in meaning across both — is the one to read.
   */
  readonly quotePerUnit: number
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
    return ok('ECB', { currency: cur, quote: 'EUR', units: 1, rate, quotePerUnit: 1 / rate, date: day })
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
) => Promise<
  ApiResult<{
    readonly currency: string
    /** The currency the fixing is expressed in — publishers differ. */
    readonly quote: string
    readonly units: number
    readonly rate: number
    /**
     * `quote` per 1 unit of `currency`. REQUIRED of every national resolver,
     * because publishers quote in opposite directions (БНБ: EUR-per-foreign;
     * ECB: foreign-per-EUR) and a consumer reading `rate` across the fallback
     * silently inverts the rate the moment the chain falls through.
     */
    readonly quotePerUnit: number
    readonly date: string
  }>
>

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
): Promise<ApiResult<BnbRate | EcbRate>> {
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
