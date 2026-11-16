/**
 * ISO 4217 currency codes: the list, the options a select offers, and the format check.
 *
 * The list is the currencies ICU/CLDR carries (read once from `Intl.supportedValuesOf('currency')` in
 * Node 26, ICU 78.3, CLDR 48) plus XXX, ISO 4217's "no currency". It is kept here as data rather than
 * read at runtime, because Node and workerd ship different ICU builds and the generated types must
 * not depend on the machine. Labels are read at runtime; they reach neither the schema nor the types.
 *
 * @standard ISO-4217:2015 currency-codes
 */
export { isIso4217 } from '@/utilities/iso/4217/validate'

/** Every ISO 4217 code a currency field accepts, 163 of them. */
export const CURRENCY_CODES = [
  'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN',
  'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF',
  'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN',
  'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL',
  'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS',
  'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD',
  'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD',
  'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR',
  'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS',
  'SRD', 'SSP', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD',
  'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XCG', 'XDR',
  'XOF', 'XPF', 'XSU', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWG', 'ZWL',
] as const

export type CurrencyCode = (typeof CURRENCY_CODES)[number]

const CURRENCY_SET: ReadonlySet<string> = new Set(CURRENCY_CODES)

/** Whether a value is one of the ISO 4217 codes a currency field accepts. */
export const isCurrencyCode = (value: unknown): value is CurrencyCode => typeof value === 'string' && CURRENCY_SET.has(value)

const names = (() => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'currency' })
  } catch {
    return null
  }
})()

/** The select options: each code, labelled with its English name where the runtime knows it. */
export const currencyOptions = CURRENCY_CODES.map((value) => ({ value, label: value === 'XXX' ? 'XXX — no currency' : `${value} — ${names?.of(value) ?? value}` }))
