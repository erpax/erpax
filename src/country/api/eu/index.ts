import type { CountryApi } from '@/country/api'
/**
 * country/api/eu — the pan-EU shared authorities (VIES · EU sanctions · Peppol ·
 * ECB rates) and the EU member-state registry slice. The consts are referenced
 * ONLY by the EU countries, so they live here beside them ([[rules]]/concentration).
 * The parent merges this + world into COUNTRY_APIS. Type-only import back — no cycle.
 */

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

export const EU_COUNTRY_APIS: Readonly<Record<string, ReadonlyArray<CountryApi>>> = {
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
      // Generic mTLS dispatcher in `src/country/client/bg-nap-mtls.ts`
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
      // `submitBgSaft()` in `src/country/client/bg-nap-mtls.ts`.
      clientImplemented: true,
    },
    {
      // `statistics` kind covers central-bank FX rate publishers per the
      // CountryApiKind comment ("sometimes used for FX"). BNB's daily
      // fixing is the BG anchor for IAS-21 revaluation + invoice fx.
      // Client lives in `src/country/api/client/index.ts` (`lookupBnbExchangeRate`).
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
    {
      // UniCredit Bulbank PSD2 XS2A — Berlin Group NextGenPSD2. AIS
      // (accounts/balances/transactions → BankTransactions/BankStatements
      // for reconciliation) + PIS (payment initiation). The country bank
      // API in the cascade: country (UniCredit BG) → regional (Berlin
      // Group EU) → universal. Credentials (PSD2 client id/secret + eIDAS
      // QWAC/QSeal) are DB-stored per tenant, post-quantum/uuid-encrypted
      // (services/beyond/pqc), resolved via tenantRemoteSecrets — only
      // PAYLOAD_SECRET is env. Client lands in a follow-on batch.
      kind: 'open_banking',
      name: 'UniCredit Bulbank PSD2 XS2A',
      authority: 'UniCredit Bulbank (Berlin Group NextGenPSD2)',
      endpoint: 'https://developer.xs2a.unicreditbank.lu',
      auth: 'mtls',
      format: 'json',
      documentation: 'https://developer.xs2a.unicreditbank.lu/get-started',
      description:
        'PSD2 XS2A (Berlin Group): AIS accounts/balances/transactions + PIS payment initiation; per-tenant base + eIDAS creds resolved from DB.',
      clientImplemented: false,
    },
    VIES,
    PEPPOL_DIRECTORY,
    EU_SANCTIONS,
    ECB_RATES,
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
      // No client module ships for this rail — `clientImplemented` means
      // "src/country/api/client/ ships a working module", and none fetches this
      // endpoint. It was `true`, which counted the rail as a promise erpax had
      // not made: catalogue-only is the honest state ([[outward]]/coverage).
      clientImplemented: false,
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
      // No client module ships for this rail — `clientImplemented` means
      // "src/country/api/client/ ships a working module", and none fetches this
      // endpoint. It was `true`, which counted the rail as a promise erpax had
      // not made: catalogue-only is the honest state ([[outward]]/coverage).
      clientImplemented: false,
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
    VIES, PEPPOL_DIRECTORY, EU_SANCTIONS, ECB_RATES,
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
}

/** @index-cross.foldback child=country/api/eu parent=country/api — this cross folds back into its parent. */
