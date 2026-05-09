/**
 * Parties plugin (shared base) — A/R and A/P share workflow + aging primitives.
 *
 * `payables` (Bills/Vendors) and `receivables` (Invoices/Customers) are
 * mirror-image plugins. The shared algorithms live here; the per-side
 * plugins layer their domain types and naming on top.
 *
 * Master citation index for `aging`, `types`, `workflow`. Inner files
 * inherit these standards.
 *
 * @standard ISO-17442-1:2020 lei legal-entity-identifier
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard EN-16931:2017 §BG-4 seller
 * @standard EN-16931:2017 §BG-7 buyer
 * @accounting IFRS IFRS-9 financial-instruments
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting US-GAAP ASC-310 receivables
 * @accounting US-GAAP ASC-405 liabilities
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §5
 */

export {
  type PaymentTerm,
  type AgingBucket,
  type BucketDefinition,
  DEFAULT_AGING_BUCKETS,
  type PartyDocument,
  type TransitionTable,
} from './types'

export {
  daysBetween,
  computeAgingBuckets,
  filterOpenDocuments,
} from './aging'

export {
  canTransition,
  transitionOrThrow,
  reachableStates,
  terminalStates,
} from './workflow'
