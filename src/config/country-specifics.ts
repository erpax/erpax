/**
 * Per-country specifics — fiscal year, tax-id formats, currency precision,
 * statutory chart-of-accounts family, bank-account format, e-invoicing
 * mandate, default VAT/GST rate, VAT registration threshold.
 *
 * **Companion table** to {@link COUNTRY_PROFILES} in `regional-defaults.ts`.
 * Where `COUNTRY_PROFILES` answers "currency / locale / accounting framework",
 * this file answers "fiscal-year start / tax-id regex / e-invoicing mandate
 * / statutory CoA / bank format / decimal precision / default rates".
 *
 * Anything outside the curated table still works at runtime — callers must
 * tolerate `undefined` and fall back to the per-deployment defaults.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 §3 currency-fraction-units (minor-unit decimals)
 * @standard ISO-13616-1:2020 iban
 * @standard EN-16931:2017 §BG-1 invoice-content e-invoicing-mandates
 * @accounting IFRS IAS-1 §51 fiscal-period
 * @accounting US-GAAP ASC-270 interim-reporting fiscal-year
 * @compliance EU 2014/55 b2g-e-invoicing
 * @see ./country-apis.ts for endpoint URLs of each authority
 */

// ─── 1. Currency-precision overlay (ISO 4217 §3) ─────────────────────────

/**
 * ISO 4217 §3 minor-unit decimals per currency. Default is 2; this map
 * carries only the *non-2* exceptions (the silent majority of currencies
 * use 2 decimals — cents, pence, centimes, kopecks, …).
 *
 * Affects every Money formatter, invoice-line rounding, and bank-line
 * normalisation. Mistakenly using 2 decimals on JPY produces 100x errors.
 */
export const CURRENCY_DECIMALS: Readonly<Record<string, number>> = {
  // Zero-decimal currencies
  BIF: 0, CLP: 0, DJF: 0, GNF: 0, ISK: 0, JPY: 0, KMF: 0, KRW: 0,
  PYG: 0, RWF: 0, UGX: 0, UYI: 0, VND: 0, VUV: 0, XAF: 0, XOF: 0, XPF: 0,
  // Three-decimal currencies (Gulf states + Tunisia)
  BHD: 3, IQD: 3, JOD: 3, KWD: 3, LYD: 3, OMR: 3, TND: 3,
  // Four-decimal (rare — funds / non-cash)
  CLF: 4, UYW: 4,
  // Slice LLLLLLLLL (2026-05-11) — ISO 4217 §6.5 'No currency'. The
  // identity element: no fractional units because there are no units.
  // Formatters output the amount without a currency symbol; rounding
  // is to integer. Anywhere a missing/null currency would have thrown,
  // resolveCurrency() routes to XXX and the math degenerates cleanly.
  XXX: 0,
}

/**
 * Returns the ISO 4217 §3 minor-unit decimal count for a currency code.
 * Defaults to 2 for everything not enumerated above.
 */
export function getCurrencyDecimals(code: string | null | undefined): number {
  if (!code) return 2
  const v = CURRENCY_DECIMALS[code.toUpperCase()]
  return typeof v === 'number' ? v : 2
}

// ─── 2. Per-country specifics table ──────────────────────────────────────

export type EInvoicingScope = 'none' | 'b2g' | 'b2b' | 'both'
export type BankAccountFormat =
  | 'iban' // EU + many African / Middle-East countries
  | 'us-routing-account' // US ABA routing + account
  | 'au-bsb-account' // AU 6-digit BSB + account
  | 'nz-account' // NZ 16-digit (bank-branch-account-suffix)
  | 'ca-transit-account' // CA 5-digit transit + 3-digit institution + account
  | 'gb-sortcode-account' // GB pre-IBAN domestic sortcode + account
  | 'in-ifsc-account' // IN 11-char IFSC + account
  | 'br-banco-agencia-conta' // BR 3-digit bank + agência + conta
  | 'jp-zengin' // JP zengin (bank+branch+account)
  | 'cn-cnaps-account' // CN CNAPS + account
  | 'mx-clabe' // MX 18-digit CLABE
  | 'sg-bank-account' // SG bank-code + account
  | 'hk-bank-branch-account' // HK 3-digit bank + branch + account

export interface CountrySpecifics {
  /** First month of the statutory fiscal year (1-12). */
  readonly fiscalYearStartMonth: number
  /** Statutory chart-of-accounts family. `'free'` = no national mandate. */
  readonly statutoryChartOfAccounts:
    | 'free'
    | 'BG-NSS' // Bulgaria — national chart for non-financial enterprises
    | 'DE-SKR03'
    | 'DE-SKR04'
    | 'FR-PCG' // Plan Comptable Général
    | 'ES-PGC' // Plan General Contable
    | 'IT-OIC' // OIC plan
    | 'PT-SNC' // Sistema de Normalização Contabilística
    | 'PL-KSR'
    | 'CZ-CAS'
    | 'JP-COA' // JGAAP COA
    | 'CN-ASBE-2006'
    | 'IN-Schedule-III'
    | 'MX-Codigo-Agrupador'
    | 'BR-Plano-Referencial'
    | 'AU-CoA-AASB'
    | 'NZ-NZ-IFRS'
    | 'GB-FRS-102'
    | 'US-GAAP-Common'
  /** Tax-ID formats accepted in this country (label + regex). */
  readonly taxIdFormats: ReadonlyArray<{ label: string; pattern: string }>
  /** Bank-account ID format used domestically. */
  readonly bankAccountFormat: BankAccountFormat
  /** Whether the country supports IBAN at all (some non-EU adopted it). */
  readonly supportsIban: boolean
  /** E-invoicing mandate scope + the canonical document standard. */
  readonly eInvoicingMandate: {
    scope: EInvoicingScope
    standard?:
      | 'EN-16931' // pan-EU semantic model
      | 'Peppol-BIS-3' // Peppol Business Interoperability Specification 3.0
      | 'FatturaPA-1.2.2' // IT
      | 'Factur-X / ZUGFeRD' // FR / DE hybrid PDF/A-3
      | 'XRechnung-3' // DE B2G
      | 'KSeF-FA(2)' // PL
      | 'NAV-3.0' // HU Online Számla
      | 'ANAF-e-Factura' // RO
      | 'CFDI-4.0' // MX
      | 'NFe-4.0' // BR
      | 'DTE' // CL
      | 'GST-IRN' // IN
      | 'Hometax' // KR
      | 'qualified-invoice' // JP 2023
      | 'InvoiceNow' // SG (Peppol)
      | 'STP-Phase-2' // AU payroll-adjacent
      | 'Fatoora-Phase-2' // SA (ZATCA)
      | 'TicketBAI' // ES (Basque)
    /** Effective date (ISO-8601) of the mandate, if rolling-out. */
    effectiveFrom?: string
    /** Threshold below which mandate doesn't apply (in local currency major units). */
    thresholdBelow?: number
  }
  /** Standard / headline VAT or sales-tax rate (%). `null` for sales-tax federations. */
  readonly defaultVatRate: number | null
  /** Reduced VAT rates in this jurisdiction (%). */
  readonly reducedVatRates: ReadonlyArray<number>
  /** VAT/GST registration threshold in local-currency *minor* units (e.g. cents). */
  readonly vatRegistrationThresholdMinor: number | null
  /** VAT-ID prefix (EU member-state letter pair, e.g. BG / DE / FR). */
  readonly vatIdPrefix?: string
  /** Withholding-tax requirement on cross-border services. */
  readonly hasWithholdingTax: boolean
  /** ISO 8601 cutoff date format the authority expects on filings. */
  readonly filingDateFormat: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD.MM.YYYY' | 'YYYY/MM/DD'
}

/**
 * Per-country specifics. Curated cohort — outside this table the resolver
 * returns `undefined` and callers fall back to deployment defaults.
 *
 * Keep alpha-sorted by ISO 3166-1 alpha-2 code for diff-readability.
 */
export const COUNTRY_SPECIFICS: Readonly<Record<string, CountrySpecifics>> = {
  AU: {
    fiscalYearStartMonth: 7,
    statutoryChartOfAccounts: 'AU-CoA-AASB',
    taxIdFormats: [
      { label: 'ABN', pattern: '^\\d{11}$' },
      { label: 'ACN', pattern: '^\\d{9}$' },
      { label: 'TFN', pattern: '^\\d{8,9}$' },
    ],
    bankAccountFormat: 'au-bsb-account',
    supportsIban: false,
    eInvoicingMandate: { scope: 'b2g', standard: 'Peppol-BIS-3' },
    defaultVatRate: 10, // GST
    reducedVatRates: [],
    vatRegistrationThresholdMinor: 7_500_000, // AUD 75,000
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  BG: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'BG-NSS',
    taxIdFormats: [
      { label: 'EIK / Bulstat', pattern: '^\\d{9}(\\d{4})?$' },
      { label: 'EGN (personal)', pattern: '^\\d{10}$' },
      { label: 'VAT (BG)', pattern: '^BG\\d{9,10}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: { scope: 'b2g', standard: 'EN-16931', effectiveFrom: '2019-04-18' },
    defaultVatRate: 20,
    reducedVatRates: [9, 0],
    vatRegistrationThresholdMinor: 10_000_000, // BGN 100,000 (in stotinki)
    vatIdPrefix: 'BG',
    hasWithholdingTax: true,
    filingDateFormat: 'DD.MM.YYYY',
  },
  BR: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'BR-Plano-Referencial',
    taxIdFormats: [
      { label: 'CNPJ', pattern: '^\\d{2}\\.?\\d{3}\\.?\\d{3}/?\\d{4}-?\\d{2}$' },
      { label: 'CPF', pattern: '^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$' },
      { label: 'IE (state)', pattern: '^\\d{8,14}$' },
    ],
    bankAccountFormat: 'br-banco-agencia-conta',
    supportsIban: false,
    eInvoicingMandate: { scope: 'both', standard: 'NFe-4.0' },
    defaultVatRate: null, // ICMS varies state-by-state
    reducedVatRates: [],
    vatRegistrationThresholdMinor: null,
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  CA: {
    fiscalYearStartMonth: 1, // most corps; some use other year-ends
    statutoryChartOfAccounts: 'free',
    taxIdFormats: [
      { label: 'BN (CRA)', pattern: '^\\d{9}([A-Z]{2}\\d{4})?$' },
      { label: 'GST/HST', pattern: '^\\d{9}RT\\d{4}$' },
      { label: 'SIN', pattern: '^\\d{3}-?\\d{3}-?\\d{3}$' },
    ],
    bankAccountFormat: 'ca-transit-account',
    supportsIban: false,
    eInvoicingMandate: { scope: 'none' },
    defaultVatRate: 5, // GST federal; provinces add HST/PST/QST
    reducedVatRates: [0],
    vatRegistrationThresholdMinor: 3_000_000, // CAD 30,000
    hasWithholdingTax: true,
    filingDateFormat: 'YYYY-MM-DD',
  },
  CH: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'free', // KMU-Kontenrahmen common but not mandated
    taxIdFormats: [
      { label: 'UID', pattern: '^CHE-?\\d{3}\\.?\\d{3}\\.?\\d{3}( MWST| TVA| IVA)?$' },
      { label: 'AHV (personal)', pattern: '^756\\.?\\d{4}\\.?\\d{4}\\.?\\d{2}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: { scope: 'b2g' },
    defaultVatRate: 8.1,
    reducedVatRates: [3.8, 2.6, 0],
    vatRegistrationThresholdMinor: 10_000_000, // CHF 100,000
    hasWithholdingTax: true,
    filingDateFormat: 'DD.MM.YYYY',
  },
  CN: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'CN-ASBE-2006',
    taxIdFormats: [
      { label: 'USCC (统一社会信用代码)', pattern: '^[0-9A-HJ-NPQRTUWXY]{18}$' },
    ],
    bankAccountFormat: 'cn-cnaps-account',
    supportsIban: false,
    eInvoicingMandate: { scope: 'both' }, // 全电发票 fully electronic invoice rolling out
    defaultVatRate: 13,
    reducedVatRates: [9, 6, 3, 0],
    vatRegistrationThresholdMinor: null,
    hasWithholdingTax: true,
    filingDateFormat: 'YYYY-MM-DD',
  },
  DE: {
    fiscalYearStartMonth: 1, // most; some Wirtschaftsjahre differ
    statutoryChartOfAccounts: 'DE-SKR04', // SKR03 also widespread
    taxIdFormats: [
      { label: 'USt-IdNr', pattern: '^DE\\d{9}$' },
      { label: 'Steuernummer', pattern: '^\\d{2,3}/\\d{3,4}/\\d{4,5}$' },
      { label: 'Wirtschafts-ID', pattern: '^DE\\d{9}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: {
      scope: 'b2b',
      standard: 'XRechnung-3',
      effectiveFrom: '2025-01-01', // B2B receive obligation; full B2B issue 2027/2028
    },
    defaultVatRate: 19,
    reducedVatRates: [7, 0],
    vatRegistrationThresholdMinor: 2_500_000, // EUR 25,000 (Kleinunternehmer 2025)
    vatIdPrefix: 'DE',
    hasWithholdingTax: true,
    filingDateFormat: 'DD.MM.YYYY',
  },
  ES: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'ES-PGC',
    taxIdFormats: [
      { label: 'NIF / CIF', pattern: '^[A-Z0-9]\\d{7}[A-Z0-9]$' },
      { label: 'NIE', pattern: '^[XYZ]\\d{7}[A-Z]$' },
      { label: 'VAT (ES)', pattern: '^ES[A-Z0-9]\\d{7}[A-Z0-9]$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: {
      scope: 'b2b',
      standard: 'EN-16931',
      effectiveFrom: '2026-07-01', // Crea y Crece
    },
    defaultVatRate: 21,
    reducedVatRates: [10, 4, 0],
    vatRegistrationThresholdMinor: 0, // no threshold for non-residents
    vatIdPrefix: 'ES',
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  FR: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'FR-PCG',
    taxIdFormats: [
      { label: 'SIREN', pattern: '^\\d{9}$' },
      { label: 'SIRET', pattern: '^\\d{14}$' },
      { label: 'TVA intracommunautaire', pattern: '^FR[A-HJ-NP-Z0-9]{2}\\d{9}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: {
      scope: 'b2b',
      standard: 'Factur-X / ZUGFeRD',
      effectiveFrom: '2026-09-01',
    },
    defaultVatRate: 20,
    reducedVatRates: [10, 5.5, 2.1, 0],
    vatRegistrationThresholdMinor: 8_500_000, // EUR 85,000 (services 37,500)
    vatIdPrefix: 'FR',
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  GB: {
    fiscalYearStartMonth: 4, // 6 April for income tax; 1 April for corp tax
    statutoryChartOfAccounts: 'GB-FRS-102',
    taxIdFormats: [
      { label: 'Company Number', pattern: '^[A-Z0-9]{8}$' },
      { label: 'UTR', pattern: '^\\d{10}$' },
      { label: 'VAT GB', pattern: '^GB(\\d{9}|\\d{12}|GD\\d{3}|HA\\d{3})$' },
    ],
    bankAccountFormat: 'gb-sortcode-account',
    supportsIban: true,
    eInvoicingMandate: { scope: 'b2g', standard: 'Peppol-BIS-3' },
    defaultVatRate: 20,
    reducedVatRates: [5, 0],
    vatRegistrationThresholdMinor: 9_000_000, // GBP 90,000
    vatIdPrefix: 'GB',
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  HK: {
    fiscalYearStartMonth: 4,
    statutoryChartOfAccounts: 'free', // HKFRS aligned with IFRS
    taxIdFormats: [
      { label: 'BR (HK)', pattern: '^\\d{8}-\\d{3}-\\d{2}-\\d{2}-\\d{1}$' },
      { label: 'CR (HK)', pattern: '^\\d{7,8}$' },
    ],
    bankAccountFormat: 'hk-bank-branch-account',
    supportsIban: false,
    eInvoicingMandate: { scope: 'none' },
    defaultVatRate: null, // HK has no VAT/GST
    reducedVatRates: [],
    vatRegistrationThresholdMinor: null,
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  IN: {
    fiscalYearStartMonth: 4,
    statutoryChartOfAccounts: 'IN-Schedule-III',
    taxIdFormats: [
      { label: 'PAN', pattern: '^[A-Z]{5}\\d{4}[A-Z]$' },
      { label: 'GSTIN', pattern: '^\\d{2}[A-Z]{5}\\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$' },
      { label: 'TAN', pattern: '^[A-Z]{4}\\d{5}[A-Z]$' },
    ],
    bankAccountFormat: 'in-ifsc-account',
    supportsIban: false,
    eInvoicingMandate: {
      scope: 'b2b',
      standard: 'GST-IRN',
      effectiveFrom: '2020-10-01',
      thresholdBelow: 50_000_000, // INR 5 crore turnover
    },
    defaultVatRate: 18, // GST default slab
    reducedVatRates: [12, 5, 0, 28],
    vatRegistrationThresholdMinor: 4_000_000_00, // INR 40 lakh goods (20 lakh services)
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  IT: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'IT-OIC',
    taxIdFormats: [
      { label: 'Partita IVA', pattern: '^\\d{11}$' },
      { label: 'Codice Fiscale', pattern: '^[A-Z]{6}\\d{2}[A-EHLMPRST]\\d{2}[A-Z]\\d{3}[A-Z]$' },
      { label: 'VAT (IT)', pattern: '^IT\\d{11}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: {
      scope: 'both',
      standard: 'FatturaPA-1.2.2',
      effectiveFrom: '2019-01-01',
    },
    defaultVatRate: 22,
    reducedVatRates: [10, 5, 4, 0],
    vatRegistrationThresholdMinor: 8_500_000, // EUR 85,000 forfait
    vatIdPrefix: 'IT',
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  JP: {
    fiscalYearStartMonth: 4,
    statutoryChartOfAccounts: 'JP-COA',
    taxIdFormats: [
      { label: '法人番号 (Corporate Number)', pattern: '^\\d{13}$' },
      { label: 'My Number (個人)', pattern: '^\\d{12}$' },
    ],
    bankAccountFormat: 'jp-zengin',
    supportsIban: false,
    eInvoicingMandate: {
      scope: 'b2b',
      standard: 'qualified-invoice',
      effectiveFrom: '2023-10-01',
    },
    defaultVatRate: 10,
    reducedVatRates: [8, 0],
    vatRegistrationThresholdMinor: 1_000_000_000, // JPY 10,000,000
    hasWithholdingTax: true,
    filingDateFormat: 'YYYY/MM/DD',
  },
  MX: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'MX-Codigo-Agrupador',
    taxIdFormats: [
      { label: 'RFC (moral)', pattern: '^[A-Z&Ñ]{3}\\d{6}[A-Z0-9]{3}$' },
      { label: 'RFC (física)', pattern: '^[A-Z&Ñ]{4}\\d{6}[A-Z0-9]{3}$' },
      { label: 'CURP', pattern: '^[A-Z]{4}\\d{6}[HM][A-Z]{5}[A-Z0-9]\\d$' },
    ],
    bankAccountFormat: 'mx-clabe',
    supportsIban: false,
    eInvoicingMandate: {
      scope: 'both',
      standard: 'CFDI-4.0',
      effectiveFrom: '2014-01-01',
    },
    defaultVatRate: 16,
    reducedVatRates: [8, 0],
    vatRegistrationThresholdMinor: 0,
    hasWithholdingTax: true,
    filingDateFormat: 'YYYY-MM-DD',
  },
  NL: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'free', // RGS framework non-mandatory
    taxIdFormats: [
      { label: 'KvK', pattern: '^\\d{8}$' },
      { label: 'BTW (VAT NL)', pattern: '^NL\\d{9}B\\d{2}$' },
      { label: 'BSN', pattern: '^\\d{9}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: { scope: 'b2g', standard: 'Peppol-BIS-3' },
    defaultVatRate: 21,
    reducedVatRates: [9, 0],
    vatRegistrationThresholdMinor: 2_000_000, // EUR 20,000 KOR
    vatIdPrefix: 'NL',
    hasWithholdingTax: true,
    filingDateFormat: 'DD-MM-YYYY' as 'DD/MM/YYYY', // close-enough
  },
  NZ: {
    fiscalYearStartMonth: 4,
    statutoryChartOfAccounts: 'NZ-NZ-IFRS',
    taxIdFormats: [
      { label: 'NZBN', pattern: '^\\d{13}$' },
      { label: 'IRD', pattern: '^\\d{8,9}$' },
    ],
    bankAccountFormat: 'nz-account',
    supportsIban: false,
    eInvoicingMandate: { scope: 'b2g', standard: 'Peppol-BIS-3' },
    defaultVatRate: 15, // GST
    reducedVatRates: [0],
    vatRegistrationThresholdMinor: 6_000_000, // NZD 60,000
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  PL: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'PL-KSR',
    taxIdFormats: [
      { label: 'NIP', pattern: '^\\d{10}$' },
      { label: 'REGON', pattern: '^\\d{9}(\\d{5})?$' },
      { label: 'VAT (PL)', pattern: '^PL\\d{10}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: {
      scope: 'b2b',
      standard: 'KSeF-FA(2)',
      effectiveFrom: '2026-02-01',
    },
    defaultVatRate: 23,
    reducedVatRates: [8, 5, 0],
    vatRegistrationThresholdMinor: 20_000_000, // PLN 200,000
    vatIdPrefix: 'PL',
    hasWithholdingTax: true,
    filingDateFormat: 'YYYY-MM-DD',
  },
  PT: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'PT-SNC',
    taxIdFormats: [
      { label: 'NIPC / NIF', pattern: '^\\d{9}$' },
      { label: 'VAT (PT)', pattern: '^PT\\d{9}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: { scope: 'both', standard: 'EN-16931' }, // SAF-T PT mandatory
    defaultVatRate: 23,
    reducedVatRates: [13, 6, 0],
    vatRegistrationThresholdMinor: 1_500_000, // EUR 15,000
    vatIdPrefix: 'PT',
    hasWithholdingTax: true,
    filingDateFormat: 'DD-MM-YYYY' as 'DD/MM/YYYY',
  },
  RO: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'free',
    taxIdFormats: [
      { label: 'CUI / CIF', pattern: '^\\d{2,10}$' },
      { label: 'VAT (RO)', pattern: '^RO\\d{2,10}$' },
    ],
    bankAccountFormat: 'iban',
    supportsIban: true,
    eInvoicingMandate: {
      scope: 'b2b',
      standard: 'ANAF-e-Factura',
      effectiveFrom: '2024-07-01',
    },
    defaultVatRate: 19,
    reducedVatRates: [9, 5, 0],
    vatRegistrationThresholdMinor: 30_000_000, // RON 300,000
    vatIdPrefix: 'RO',
    hasWithholdingTax: true,
    filingDateFormat: 'DD.MM.YYYY',
  },
  SG: {
    fiscalYearStartMonth: 1,
    statutoryChartOfAccounts: 'free',
    taxIdFormats: [
      { label: 'UEN', pattern: '^(\\d{8,9}|\\d{4}\\d{5}[A-Z]|[A-Z]\\d{9}[A-Z]|S\\d{2}[A-Z]{2}\\d{4}[A-Z]|T\\d{2}[A-Z]{2}\\d{4}[A-Z])$' },
      { label: 'GST', pattern: '^M[0-9A-Z]{9,11}$' },
    ],
    bankAccountFormat: 'sg-bank-account',
    supportsIban: false,
    eInvoicingMandate: { scope: 'b2g', standard: 'InvoiceNow' },
    defaultVatRate: 9, // GST 2024+
    reducedVatRates: [0],
    vatRegistrationThresholdMinor: 100_000_000, // SGD 1,000,000
    hasWithholdingTax: true,
    filingDateFormat: 'DD/MM/YYYY',
  },
  US: {
    fiscalYearStartMonth: 10, // federal; corp Section 441 default 1
    statutoryChartOfAccounts: 'US-GAAP-Common',
    taxIdFormats: [
      { label: 'EIN', pattern: '^\\d{2}-\\d{7}$' },
      { label: 'SSN', pattern: '^\\d{3}-\\d{2}-\\d{4}$' },
      { label: 'ITIN', pattern: '^9\\d{2}-\\d{2}-\\d{4}$' },
    ],
    bankAccountFormat: 'us-routing-account',
    supportsIban: false,
    eInvoicingMandate: { scope: 'none' },
    defaultVatRate: null, // sales tax varies by state — handled per TaxJurisdiction
    reducedVatRates: [],
    vatRegistrationThresholdMinor: null,
    hasWithholdingTax: true,
    filingDateFormat: 'MM/DD/YYYY',
  },
}

/**
 * Returns the country specifics row for a given alpha-2 code, or
 * `undefined` if the country isn't in the curated cohort.
 */
export function getCountrySpecifics(country?: string | null): CountrySpecifics | undefined {
  if (!country) return undefined
  return COUNTRY_SPECIFICS[country.toUpperCase()]
}

/**
 * Returns the fiscal-year start month for a country, defaulting to 1 (Jan)
 * for any country outside the curated table. Used by FiscalPeriods seed
 * + period-lock validators when the tenant hasn't overridden it.
 */
export function getFiscalYearStartMonth(country?: string | null): number {
  return getCountrySpecifics(country)?.fiscalYearStartMonth ?? 1
}

/**
 * Validate a tax ID against any of the country's accepted formats.
 * Returns the matching label (e.g. `"VAT (BG)"`) or `null`.
 */
export function classifyTaxId(country: string, value: string): string | null {
  const spec = getCountrySpecifics(country)
  if (!spec) return null
  for (const f of spec.taxIdFormats) {
    if (new RegExp(f.pattern).test(value)) return f.label
  }
  return null
}
