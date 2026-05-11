/**
 * Per-country official API registry — tax authorities, business
 * registries, e-invoicing portals, VAT/VIES validation, payroll, and
 * statistics agencies.
 *
 * **What this is:** a structured catalogue of the public endpoints each
 * country's authorities expose, with auth model, format, documentation
 * URL, and a one-line description. Consumed by:
 *   - the country-API client services (`src/services/country-api-clients/`)
 *     for the public/no-auth endpoints we ship working clients for;
 *   - the admin UI to surface "this country has an e-invoicing portal,
 *     here's the link" rather than silently no-op-ing;
 *   - documentation generators that need to cite the authority a given
 *     filing format originates from.
 *
 * **What this is not:** credentials. API keys, OAuth client IDs, mTLS
 * certificates and equivalent secrets live in the per-tenant config
 * sandbox (`tenant.config.countryApis[code].auth.*`) and never in this
 * file.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-20022 financial-messages cross-references
 * @compliance EU 2014/55 b2g-e-invoicing portals
 * @compliance AMLD-5 ubo-registry-access
 * @see ./country-specifics.ts for the per-country regulatory context
 * @see src/services/country-api-clients/ for the working client modules
 */

export type CountryApiKind =
  | 'business_registry' // company-name / id lookup, UBO register
  | 'tax_authority' // tax filing portal (returns, payments)
  | 'e_invoicing' // e-invoicing exchange / clearance platform
  | 'vat_validation' // VAT-ID validity check
  | 'bank_directory' // BIC / sort-code / IBAN-bank lookup
  | 'address_validation' // postal-code / address validation
  | 'open_banking' // PSD2 / CDR / equivalent
  | 'sanctions' // OFAC / EU consolidated list / UK HMT
  | 'statistics' // national statistics office (sometimes used for FX)
  | 'payroll' // payroll / social-security reporting

export type CountryApiAuth =
  | 'none' // open public endpoint
  | 'api_key' // simple key in header / query
  | 'oauth2' // standard OAuth 2.0 (authorization code or client credentials)
  | 'oauth2_pkce' // OAuth 2.0 with PKCE (Public clients)
  | 'mtls' // mutual TLS (qualified seal certificates, SDI, ZATCA)
  | 'pec' // certified email (FatturaPA legacy fallback)
  | 'soap_wsse' // SOAP with WS-Security headers (VIES, some legacy)
  | 'jwt_signed' // signed JWT bearer (e.g. KSeF token, Hometax)

export interface CountryApi {
  readonly kind: CountryApiKind
  readonly name: string
  readonly authority: string // human-readable: "HMRC", "AEAT", "ANAF", …
  readonly endpoint: string // base URL (sandbox + prod resolved per env)
  readonly sandboxEndpoint?: string
  readonly auth: CountryApiAuth
  readonly format: 'json' | 'xml' | 'soap' | 'csv' | 'edi' | 'mixed'
  readonly documentation: string
  /** Brief one-line summary of what the API does. */
  readonly description: string
  /**
   * Marks the registry entries for which `src/services/country-api-clients/`
   * ships a working module. `false` = catalogue-only (still useful for the
   * admin UI / docs).
   */
  readonly clientImplemented: boolean
}

// ─── Pan-EU APIs (apply to every EU member state) ────────────────────────

/**
 * VIES — VAT Information Exchange System. SOAP, no auth, free public
 * endpoint operated by DG TAXUD. Used to validate a counterparty's
 * EU VAT registration status before zero-rating an intra-community supply
 * (Council Directive 2006/112/EC Art.138 + 2010/45 EU).
 */
export const VIES: CountryApi = {
  kind: 'vat_validation',
  name: 'VIES VAT Number Validation',
  authority: 'European Commission DG TAXUD',
  endpoint: 'https://ec.europa.eu/taxation_customs/vies/services/checkVatService',
  auth: 'none',
  format: 'soap',
  documentation: 'https://ec.europa.eu/taxation_customs/vies/',
  description: 'Validate an EU VAT number across all 27 member states (SOAP).',
  clientImplemented: true,
}

/**
 * EU consolidated sanctions list (CFSP). Public XML feed updated daily;
 * required by AMLD-5 / SDN-equivalent screening before onboarding a
 * customer or vendor.
 */
export const EU_SANCTIONS: CountryApi = {
  kind: 'sanctions',
  name: 'EU Consolidated Sanctions List',
  authority: 'European External Action Service',
  endpoint: 'https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content',
  auth: 'none',
  format: 'xml',
  documentation: 'https://www.sanctionsmap.eu/',
  description: 'Daily-refreshed XML of EU-listed designated persons and entities.',
  clientImplemented: true,
}

/**
 * Peppol participant directory — discover whether a counterparty is
 * registered to receive an e-invoice over the Peppol network and on
 * which Peppol document types they accept.
 */
export const PEPPOL_DIRECTORY: CountryApi = {
  kind: 'e_invoicing',
  name: 'Peppol Directory',
  authority: 'OpenPeppol',
  endpoint: 'https://directory.peppol.eu/search/1.0/json',
  auth: 'none',
  format: 'json',
  documentation: 'https://docs.peppol.eu/edelivery/sml/',
  description: 'Lookup of Peppol-registered receivers and supported document types.',
  clientImplemented: true,
}

/**
 * European Central Bank — daily reference exchange rates (SDMX XML).
 *
 * The pan-EU fallback for FX rates when a national central bank's
 * publisher is unreachable (or doesn't publish a given pair). Every EU
 * country bundle should include this entry via spread so
 * `lookupEuFallbackRate(currency)` has a working second-tier resolver.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard SDMX 2.1 statistical-data-and-metadata-exchange
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 */
export const ECB_RATES: CountryApi = {
  kind: 'statistics',
  name: 'ECB Reference Exchange Rates',
  authority: 'European Central Bank',
  endpoint: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
  auth: 'none',
  format: 'xml',
  documentation: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html',
  description:
    'ECB euro reference daily fixing — pan-EU fallback when a national central bank rate is unavailable.',
  clientImplemented: true,
}

// ─── Per-country registry ────────────────────────────────────────────────

export const COUNTRY_APIS: Readonly<Record<string, ReadonlyArray<CountryApi>>> = {
  AU: [
    {
      kind: 'business_registry',
      name: 'ABN Lookup',
      authority: 'Australian Business Register',
      endpoint: 'https://abr.business.gov.au/json',
      auth: 'api_key',
      format: 'json',
      documentation: 'https://abr.business.gov.au/Tools/WebServices',
      description: 'Lookup a registered ABN/ACN and trading name.',
      clientImplemented: true,
    },
    {
      kind: 'tax_authority',
      name: 'ATO Online Services',
      authority: 'Australian Taxation Office',
      endpoint: 'https://api.ato.gov.au',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://softwaredevelopers.ato.gov.au/',
      description: 'BAS lodgement, STP payroll, super reporting (M2M auth via SBR).',
      clientImplemented: false,
    },
  ],
  BG: [
    {
      kind: 'business_registry',
      name: 'Търговски Регистър (TR)',
      authority: 'Агенция по вписванията',
      endpoint: 'https://portal.registryagency.bg/api/public',
      auth: 'none',
      format: 'json',
      documentation: 'https://portal.registryagency.bg/',
      description: 'Bulgarian commercial register lookup by EIK/Bulstat.',
      clientImplemented: true,
    },
    {
      kind: 'tax_authority',
      name: 'НАП Електронни Услуги',
      authority: 'Национална агенция за приходите',
      endpoint: 'https://inetdec.nra.bg',
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://nra.bg/wps/portal/nra/uslugi-eus',
      description: 'VAT returns, VIES filings, intrastat — qualified e-signature mTLS.',
      // Generic mTLS dispatcher in `src/services/country-clients/bg-nap-mtls.ts`
      // services every НАП endpoint (per-tenant qualified seal cert required).
      clientImplemented: true,
    },
    {
      kind: 'e_invoicing',
      name: 'НАП SAF-T submission portal',
      authority: 'Национална агенция за приходите',
      endpoint: 'https://inetdec.nra.bg/saf-t',
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://nra.bg/saf-t',
      description: 'OECD SAF-T 2.0 submission for BG (audit-file format BG-SAF-T).',
      // `submitBgSaft()` in `src/services/country-clients/bg-nap-mtls.ts`.
      clientImplemented: true,
    },
    {
      // `statistics` kind covers central-bank FX rate publishers per the
      // CountryApiKind comment ("sometimes used for FX"). BNB's daily
      // fixing is the BG anchor for IAS-21 revaluation + invoice fx.
      // Client lives in `src/services/country-api-clients.ts` (`lookupBnbExchangeRate`).
      kind: 'statistics',
      name: 'БНБ — Daily Exchange Rates',
      authority: 'Българска народна банка',
      endpoint: 'https://www.bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/index.htm',
      auth: 'none',
      format: 'xml',
      documentation: 'https://www.bnb.bg/AboutUs/AUFAQ/Contr_Exchange_Rates/index.htm',
      description: 'BNB daily currency fixing rates against BGN — IAS-21 revaluation anchor.',
      clientImplemented: true,
    },
    VIES,
    PEPPOL_DIRECTORY,
    EU_SANCTIONS,
    ECB_RATES,
  ],
  BR: [
    {
      kind: 'business_registry',
      name: 'CNPJ Receita Federal',
      authority: 'Receita Federal do Brasil',
      endpoint: 'https://www.receitaws.com.br/v1/cnpj',
      auth: 'none',
      format: 'json',
      documentation: 'https://receitaws.com.br/',
      description: 'CNPJ lookup (community proxy over RF data).',
      clientImplemented: true,
    },
    {
      kind: 'e_invoicing',
      name: 'NFe / NFSe SEFAZ',
      authority: 'Secretarias da Fazenda Estaduais',
      endpoint: 'https://www.sefaz.rs.gov.br/NFE/NFE-COM.aspx', // varies per state
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://www.nfe.fazenda.gov.br/portal/principal.aspx',
      description: 'Per-state NFe issuance + SEFAZ clearance (mTLS A1/A3 cert).',
      clientImplemented: false,
    },
  ],
  CA: [
    {
      kind: 'business_registry',
      name: 'CRA Business Number Validation',
      authority: 'Canada Revenue Agency',
      endpoint: 'https://api.canada.ca/businesses/v1/businesses',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://www.canada.ca/en/revenue-agency.html',
      description: 'Validate a CRA Business Number / GST/HST registration.',
      clientImplemented: false,
    },
  ],
  CN: [
    {
      kind: 'tax_authority',
      name: '电子税务局',
      authority: 'State Taxation Administration (STA)',
      endpoint: 'https://etax.chinatax.gov.cn',
      auth: 'jwt_signed',
      format: 'json',
      documentation: 'https://www.chinatax.gov.cn/',
      description: 'STA electronic tax bureau, fully-electronic invoice submission.',
      clientImplemented: false,
    },
  ],
  DE: [
    {
      kind: 'business_registry',
      name: 'Handelsregister',
      authority: 'Bundesnotarkammer / Justizportale der Länder',
      endpoint: 'https://www.handelsregister.de/rp_web/normalesuche.xhtml',
      auth: 'none',
      format: 'mixed',
      documentation: 'https://www.handelsregister.de/',
      description: 'German trade-register search. Free for basic lookup, paid downloads.',
      clientImplemented: false,
    },
    {
      kind: 'tax_authority',
      name: 'ELSTER',
      authority: 'Bundesfinanzministerium',
      endpoint: 'https://www.elster.de/eportal',
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://www.elster.de/elsterweb/start',
      description: 'German tax filing portal — UStVA, ZM, Bilanz uploads (ERiC client).',
      clientImplemented: false,
    },
    {
      kind: 'e_invoicing',
      name: 'XRechnung Validator',
      authority: 'KoSIT (Koordinierungsstelle für IT-Standards)',
      endpoint: 'https://kosit.org/api/validate',
      auth: 'none',
      format: 'xml',
      documentation: 'https://xeinkauf.de/xrechnung/',
      description: 'Validate XRechnung XML against the federal CIUS schematron.',
      clientImplemented: true,
    },
    VIES,
    PEPPOL_DIRECTORY,
    EU_SANCTIONS,
    ECB_RATES,
  ],
  ES: [
    {
      kind: 'business_registry',
      name: 'Registro Mercantil',
      authority: 'Colegio de Registradores',
      endpoint: 'https://www.registradores.org',
      auth: 'api_key',
      format: 'mixed',
      documentation: 'https://www.registradores.org/',
      description: 'Spanish commercial-registry search (paid bulk).',
      clientImplemented: false,
    },
    {
      kind: 'tax_authority',
      name: 'AEAT Sede Electrónica',
      authority: 'Agencia Estatal de Administración Tributaria',
      endpoint: 'https://www2.agenciatributaria.gob.es',
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://sede.agenciatributaria.gob.es',
      description: 'SII real-time invoice register, Modelo 303/390, TicketBAI.',
      clientImplemented: false,
    },
    VIES, PEPPOL_DIRECTORY, EU_SANCTIONS, ECB_RATES,
  ],
  FR: [
    {
      kind: 'business_registry',
      name: 'INSEE SIRENE',
      authority: 'Institut national de la statistique',
      endpoint: 'https://api.insee.fr/entreprises/sirene/V3.11',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://api.insee.fr/catalogue/site/themes/wso2/subthemes/insee/pages/item-info.jag?name=Sirene&version=V3.11&provider=insee',
      description: 'SIREN/SIRET lookup, NAF code, legal-entity status.',
      clientImplemented: true,
    },
    {
      kind: 'e_invoicing',
      name: 'Chorus Pro',
      authority: 'AIFE / DGFiP',
      endpoint: 'https://chorus-pro.gouv.fr/api',
      auth: 'oauth2',
      format: 'mixed',
      documentation: 'https://communaute.chorus-pro.gouv.fr/',
      description: 'B2G + (from 2026) B2B e-invoicing exchange platform (PPF).',
      clientImplemented: false,
    },
    VIES, PEPPOL_DIRECTORY, EU_SANCTIONS, ECB_RATES,
  ],
  GB: [
    {
      kind: 'business_registry',
      name: 'Companies House',
      authority: 'Companies House',
      endpoint: 'https://api.company-information.service.gov.uk',
      auth: 'api_key',
      format: 'json',
      documentation: 'https://developer.company-information.service.gov.uk/',
      description: 'UK company search, officers, filings — free key-based REST API.',
      clientImplemented: true,
    },
    {
      kind: 'tax_authority',
      name: 'HMRC MTD',
      authority: 'HM Revenue & Customs',
      endpoint: 'https://api.service.hmrc.gov.uk',
      sandboxEndpoint: 'https://test-api.service.hmrc.gov.uk',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.service.hmrc.gov.uk/api-documentation',
      description: 'Making Tax Digital VAT, ITSA, corporation tax APIs.',
      clientImplemented: false,
    },
  ],
  HK: [
    {
      kind: 'business_registry',
      name: 'Cyber Search Centre',
      authority: 'HK Companies Registry',
      endpoint: 'https://www.icris.cr.gov.hk/csci/',
      auth: 'api_key',
      format: 'mixed',
      documentation: 'https://www.cr.gov.hk/',
      description: 'Hong Kong CR Cyber Search (paid per query, account-based).',
      clientImplemented: false,
    },
  ],
  IN: [
    {
      kind: 'business_registry',
      name: 'MCA21',
      authority: 'Ministry of Corporate Affairs',
      endpoint: 'https://www.mca.gov.in',
      auth: 'api_key',
      format: 'mixed',
      documentation: 'https://www.mca.gov.in/MinistryV2/companyllpmasterdata.html',
      description: 'CIN / LLPIN master data lookup.',
      clientImplemented: false,
    },
    {
      kind: 'e_invoicing',
      name: 'GST e-Invoice IRP',
      authority: 'Goods and Services Tax Network',
      endpoint: 'https://einvoice1.gst.gov.in/api',
      sandboxEndpoint: 'https://einv-apisandbox.nic.in',
      auth: 'jwt_signed',
      format: 'json',
      documentation: 'https://einv-apisandbox.nic.in/',
      description: 'IRN generation + e-invoice clearance (mandatory ≥ INR 5cr turnover).',
      clientImplemented: false,
    },
  ],
  IT: [
    {
      kind: 'e_invoicing',
      name: 'Sistema di Interscambio (SDI)',
      authority: 'Agenzia delle Entrate',
      endpoint: 'https://servizi.fatturapa.gov.it/wcf/SdIRiceviFile',
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://www.fatturapa.gov.it',
      description: 'FatturaPA XML clearance — mandatory all B2B/B2G invoices.',
      clientImplemented: false,
    },
    {
      kind: 'business_registry',
      name: 'Telemaco InfoCamere',
      authority: 'Camere di Commercio',
      endpoint: 'https://telemaco.infocamere.it',
      auth: 'api_key',
      format: 'mixed',
      documentation: 'https://www.registroimprese.it/',
      description: 'Registro Imprese visure (paid per visura).',
      clientImplemented: false,
    },
    VIES, PEPPOL_DIRECTORY, EU_SANCTIONS, ECB_RATES,
  ],
  JP: [
    {
      kind: 'business_registry',
      name: '法人番号公表サイト',
      authority: 'National Tax Agency',
      endpoint: 'https://api.houjin-bangou.nta.go.jp/4',
      auth: 'api_key',
      format: 'mixed',
      documentation: 'https://www.houjin-bangou.nta.go.jp/webapi/',
      description: 'NTA corporate-number public API (free key registration).',
      clientImplemented: true,
    },
    {
      kind: 'tax_authority',
      name: 'e-Tax',
      authority: 'National Tax Agency',
      endpoint: 'https://www.e-tax.nta.go.jp',
      auth: 'jwt_signed',
      format: 'xml',
      documentation: 'https://www.nta.go.jp/taxes/tetsuzuki/shinsei/annai/hojin/annai/13_01.htm',
      description: 'e-Tax filing for corp tax, consumption tax, withholding.',
      clientImplemented: false,
    },
  ],
  MX: [
    {
      kind: 'e_invoicing',
      name: 'CFDI 4.0 PAC',
      authority: 'Servicio de Administración Tributaria',
      endpoint: 'https://cfdi.sat.gob.mx',
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://www.sat.gob.mx',
      description: 'CFDI issuance through Authorised Certification Providers (PACs).',
      clientImplemented: false,
    },
    {
      kind: 'business_registry',
      name: 'RFC Constancia',
      authority: 'SAT',
      endpoint: 'https://siat.sat.gob.mx/PTSC/IdcSiat',
      auth: 'mtls',
      format: 'mixed',
      documentation: 'https://www.sat.gob.mx',
      description: 'RFC validity + Constancia de Situación Fiscal.',
      clientImplemented: false,
    },
  ],
  NL: [
    {
      kind: 'business_registry',
      name: 'KvK Handelsregister',
      authority: 'Kamer van Koophandel',
      endpoint: 'https://api.kvk.nl/api/v1',
      auth: 'api_key',
      format: 'json',
      documentation: 'https://developers.kvk.nl/',
      description: 'KvK number lookup, basic company profile, addresses.',
      clientImplemented: true,
    },
    VIES, PEPPOL_DIRECTORY, EU_SANCTIONS, ECB_RATES,
  ],
  NO: [
    {
      kind: 'business_registry',
      name: 'Brønnøysundregistrene (Brreg)',
      authority: 'Brønnøysundregistrene',
      endpoint: 'https://data.brreg.no/enhetsregisteret/api',
      auth: 'none',
      format: 'json',
      documentation: 'https://data.brreg.no/enhetsregisteret/api/dokumentasjon/no/index.html',
      description: 'Free open API for Norwegian Central Coordinating Register.',
      clientImplemented: true,
    },
  ],
  NZ: [
    {
      kind: 'business_registry',
      name: 'NZBN',
      authority: 'Companies Office',
      endpoint: 'https://api.business.govt.nz/services/v5/nzbn',
      auth: 'api_key',
      format: 'json',
      documentation: 'https://api.business.govt.nz/',
      description: 'Lookup by NZBN; addresses, classification, status.',
      clientImplemented: true,
    },
  ],
  PL: [
    {
      kind: 'business_registry',
      name: 'KRS Open API',
      authority: 'Ministerstwo Sprawiedliwości',
      endpoint: 'https://api-krs.ms.gov.pl',
      auth: 'none',
      format: 'json',
      documentation: 'https://api-krs.ms.gov.pl/api',
      description: 'Free open API of the National Court Register (KRS).',
      clientImplemented: true,
    },
    {
      kind: 'e_invoicing',
      name: 'KSeF',
      authority: 'Ministerstwo Finansów',
      endpoint: 'https://ksef.mf.gov.pl',
      sandboxEndpoint: 'https://ksef-test.mf.gov.pl',
      auth: 'jwt_signed',
      format: 'json',
      documentation: 'https://ksef.podatki.gov.pl/api/',
      description: 'Krajowy System e-Faktur — mandatory B2B from 2026-02-01.',
      clientImplemented: false,
    },
  ],
  PT: [
    {
      kind: 'tax_authority',
      name: 'Portal das Finanças',
      authority: 'Autoridade Tributária e Aduaneira',
      endpoint: 'https://www.portaldasfinancas.gov.pt',
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://www.portaldasfinancas.gov.pt',
      description: 'SAF-T PT submission, e-fatura, ATCUD assignment.',
      clientImplemented: false,
    },
    VIES, PEPPOL_DIRECTORY, EU_SANCTIONS, ECB_RATES,
  ],
  RO: [
    {
      kind: 'e_invoicing',
      name: 'ANAF e-Factura',
      authority: 'Agenția Națională de Administrare Fiscală',
      endpoint: 'https://api.anaf.ro/prod/FCTEL/rest',
      sandboxEndpoint: 'https://api.anaf.ro/test/FCTEL/rest',
      auth: 'oauth2',
      format: 'xml',
      documentation: 'https://www.anaf.ro/anaf/internet/ANAF/servicii_online',
      description: 'B2B e-invoice clearance (RO-CIUS / EN 16931).',
      clientImplemented: false,
    },
    {
      kind: 'business_registry',
      name: 'ONRC',
      authority: 'Oficiul Național al Registrului Comerțului',
      endpoint: 'https://portal.onrc.ro',
      auth: 'api_key',
      format: 'mixed',
      documentation: 'https://portal.onrc.ro/',
      description: 'Romanian trade register, Recom Online.',
      clientImplemented: false,
    },
    VIES, PEPPOL_DIRECTORY, EU_SANCTIONS, ECB_RATES,
  ],
  SG: [
    {
      kind: 'business_registry',
      name: 'ACRA Bizfile',
      authority: 'Accounting and Corporate Regulatory Authority',
      endpoint: 'https://www.acra.gov.sg/api',
      auth: 'api_key',
      format: 'json',
      documentation: 'https://www.acra.gov.sg/services/api',
      description: 'UEN / business profile lookup (paid per profile).',
      clientImplemented: false,
    },
    {
      kind: 'e_invoicing',
      name: 'InvoiceNow Peppol',
      authority: 'IMDA',
      endpoint: 'https://www.imda.gov.sg/InvoiceNow',
      auth: 'oauth2',
      format: 'xml',
      documentation: 'https://www.peppol.org/who-is-who/peppol-authorities',
      description: 'Singapore Peppol authority — InvoiceNow B2G + voluntary B2B.',
      clientImplemented: false,
    },
  ],
  US: [
    {
      kind: 'sanctions',
      name: 'OFAC SDN List',
      authority: 'US Treasury OFAC',
      endpoint: 'https://www.treasury.gov/ofac/downloads/sdn.xml',
      auth: 'none',
      format: 'xml',
      documentation: 'https://ofac.treasury.gov/',
      description: 'Specially Designated Nationals list (daily refresh).',
      clientImplemented: true,
    },
    {
      kind: 'business_registry',
      name: 'SEC EDGAR',
      authority: 'Securities and Exchange Commission',
      endpoint: 'https://data.sec.gov',
      auth: 'none',
      format: 'json',
      documentation: 'https://www.sec.gov/edgar/sec-api-documentation',
      description: 'Public-company filings, financial-statement facts (XBRL).',
      clientImplemented: true,
    },
    {
      kind: 'tax_authority',
      name: 'IRS MeF',
      authority: 'Internal Revenue Service',
      endpoint: 'https://la.www4.irs.gov/a2a/mef/api',
      auth: 'mtls',
      format: 'xml',
      documentation: 'https://www.irs.gov/e-file-providers/modernized-e-file-mef-internet-filing',
      description: 'IRS Modernized e-File for 1120/1065/941/990 series.',
      clientImplemented: false,
    },
  ],
}

// ─── Open Banking / PSD2 / banking-rails APIs ────────────────────────────

/**
 * Cross-border banking-data APIs, registered separately from the per-country
 * registry above so they can be unioned in by `getCountryApis` based on a
 * tenant's bank account country, not just the company-of-record country.
 */
export const BANK_APIS: Readonly<Record<string, ReadonlyArray<CountryApi>>> = {
  // EU PSD2 — per-bank ASPSP endpoints discovered via the EBA register
  EU: [
    {
      kind: 'open_banking',
      name: 'EBA Register of Payment Institutions',
      authority: 'European Banking Authority',
      endpoint: 'https://euclid.eba.europa.eu/register/pir/disclaimer',
      auth: 'none',
      format: 'json',
      documentation: 'https://www.eba.europa.eu/regulation-and-policy/passporting-and-supervision-of-branches/eba-register-payment-and-electronic-money-institutions-under-psd2',
      description: 'Discover authorised ASPSPs for PSD2 AISP/PISP onboarding.',
      clientImplemented: false,
    },
  ],
  GB: [
    {
      kind: 'open_banking',
      name: 'OBIE Directory',
      authority: 'Open Banking Implementation Entity',
      endpoint: 'https://directory.openbanking.org.uk',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://standards.openbanking.org.uk/api-specifications/',
      description: 'CMA9 + voluntary ASPSP registry, AISP/PISP/CBPII roles.',
      clientImplemented: false,
    },
  ],
  AU: [
    {
      kind: 'open_banking',
      name: 'CDR Register',
      authority: 'ACCC / Treasury',
      endpoint: 'https://api.cdr.gov.au',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://consumerdatastandards.gov.au/',
      description: 'Consumer Data Right register — banking phase 1 + energy.',
      clientImplemented: false,
    },
  ],
  BR: [
    {
      kind: 'open_banking',
      name: 'Open Finance Brasil',
      authority: 'Banco Central do Brasil',
      endpoint: 'https://openbankingbrasil.org.br',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://openbanking-brasil.github.io/',
      description: 'Open Finance phases 1-4 (accounts, payments, products, insurance).',
      clientImplemented: false,
    },
  ],
  IN: [
    {
      kind: 'open_banking',
      name: 'Account Aggregator (RBI)',
      authority: 'Reserve Bank of India',
      endpoint: 'https://sahamati.org.in/aa-register',
      auth: 'jwt_signed',
      format: 'json',
      documentation: 'https://sahamati.org.in/',
      description: 'NBFC-AA framework for consented financial-data sharing.',
      clientImplemented: false,
    },
    {
      kind: 'open_banking',
      name: 'UPI (NPCI)',
      authority: 'National Payments Corporation of India',
      endpoint: 'https://www.npci.org.in/what-we-do/upi/product-overview',
      auth: 'mtls',
      format: 'json',
      documentation: 'https://www.npci.org.in/what-we-do/upi/product-overview',
      description: 'Unified Payments Interface — peer-to-peer + merchant rails.',
      clientImplemented: false,
    },
  ],
  BG: [
    // BNB (the regulator) is the discovery anchor — every BG ASPSP must
    // publish PSD2 endpoints discoverable through BNB's register, and
    // most use the Berlin Group NextGenPSD2 spec.
    {
      kind: 'bank_directory',
      name: 'БНБ Регистър на платежните институции',
      authority: 'Българска народна банка',
      endpoint: 'https://www.bnb.bg/RegistersAndServices/RSReportRegisters/index.htm',
      auth: 'none',
      format: 'mixed',
      documentation: 'https://www.bnb.bg/RegistersAndServices/index.htm',
      description: 'BNB register of authorised BG ASPSPs (PSD2 + e-money institutions).',
      clientImplemented: true,
    },
    // Major BG banks — top 10 by deposits, all PSD2-licensed AISPs/PISPs.
    // Endpoints follow the Berlin Group NextGenPSD2 v1.3 contract; per-bank
    // sandbox URLs vary, the production paths converge on /v1/accounts etc.
    {
      kind: 'open_banking',
      name: 'UniCredit Bulbank — PSD2 API',
      authority: 'UniCredit Bulbank AD',
      endpoint: 'https://api.unicreditbulbank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.unicreditbulbank.bg',
      description: 'BG market leader by assets — Berlin Group NextGenPSD2 v1.3.',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'DSK Bank — PSD2 API',
      authority: 'Банка ДСК АД',
      endpoint: 'https://api.dskbank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.dskbank.bg',
      description: 'Largest retail bank by branches — OTP Group subsidiary.',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'Postbank — PSD2 API',
      authority: 'Юробанк България АД (Postbank)',
      endpoint: 'https://api.postbank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.postbank.bg',
      description: 'Eurobank subsidiary — Berlin Group NextGenPSD2.',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'Fibank — PSD2 API',
      authority: 'Първа инвестиционна банка АД',
      endpoint: 'https://api.fibank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.fibank.bg',
      description: 'First Investment Bank — domestic, PSD2 compliant.',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'KBC Bank Bulgaria — PSD2 API',
      authority: 'KBC Bank Bulgaria EAD',
      endpoint: 'https://api.kbcbank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.kbcbank.bg',
      description: 'KBC Group subsidiary (former Raiffeisenbank Bulgaria + UBB merger).',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'ProCredit Bank Bulgaria — PSD2 API',
      authority: 'ProCredit Bank (Bulgaria) EAD',
      endpoint: 'https://api.procreditbank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.procreditbank.bg',
      description: 'SME-focused bank, ProCredit Holding subsidiary.',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'Allianz Bank Bulgaria — PSD2 API',
      authority: 'Allianz Bank Bulgaria AD',
      endpoint: 'https://api.allianzbank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.allianzbank.bg',
      description: 'Allianz Group subsidiary, retail + private banking.',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'Investbank — PSD2 API',
      authority: 'Инвестбанк АД',
      endpoint: 'https://api.investbank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.investbank.bg',
      description: 'Domestic universal bank, Berlin Group NextGenPSD2.',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'Central Cooperative Bank — PSD2 API',
      authority: 'Централна кооперативна банка АД',
      endpoint: 'https://api.ccbank.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.ccbank.bg',
      description: 'CCB — cooperative-origin universal bank.',
      clientImplemented: true,
    },
    {
      kind: 'open_banking',
      name: 'BACB — PSD2 API',
      authority: 'Българо-американска кредитна банка АД',
      endpoint: 'https://api.bacb.bg/psd2',
      auth: 'oauth2',
      format: 'json',
      documentation: 'https://developer.bacb.bg',
      description: 'Bulgarian-American Credit Bank — Berlin Group NextGenPSD2.',
      clientImplemented: true,
    },
  ],
  US: [
    {
      kind: 'bank_directory',
      name: 'FRB Routing Number Lookup',
      authority: 'Federal Reserve Banks',
      endpoint: 'https://www.frbservices.org/EPaymentsDirectory/search.html',
      auth: 'none',
      format: 'mixed',
      documentation: 'https://www.frbservices.org/resources/routing-number-directory/index.html',
      description: 'Validate ABA routing number + ACH/Fedwire participants.',
      clientImplemented: false,
    },
  ],
  // Global SWIFT / BIC directory
  GLOBAL: [
    {
      kind: 'bank_directory',
      name: 'SWIFT BIC Search',
      authority: 'SWIFT',
      endpoint: 'https://www2.swift.com/bsl/',
      auth: 'api_key',
      format: 'json',
      documentation: 'https://www.swift.com/standards/data-standards/bic',
      description: 'Authoritative ISO 9362 BIC directory (paid).',
      clientImplemented: false,
    },
  ],
}

/**
 * Returns the curated official-API list for a country, or empty array if
 * the country isn't in the cohort. Always includes pan-EU APIs (VIES,
 * PEPPOL_DIRECTORY, EU_SANCTIONS) for EU member states.
 */
export function getCountryApis(country?: string | null): ReadonlyArray<CountryApi> {
  if (!country) return []
  const list = COUNTRY_APIS[country.toUpperCase()]
  return list ?? []
}

/**
 * Returns only the APIs of a given kind for a country.
 */
export function getCountryApisByKind(country: string, kind: CountryApiKind): ReadonlyArray<CountryApi> {
  return getCountryApis(country).filter((a) => a.kind === kind)
}

/**
 * Returns whether the country has a binding e-invoicing mandate (b2b, b2g, or both)
 * with at least one official portal registered.
 */
export function hasEInvoicingPortal(country: string): boolean {
  return getCountryApisByKind(country, 'e_invoicing').length > 0
}
