/**
 * @deprecated Tax automation must run against Payload collections, not in-memory `Map<>`.
 *
 * This service kept tax rates, jurisdictions, calculations, liabilities, and
 * payments in 6 in-memory `Map<>` instances — wiped on every Cloudflare
 * Workers cold start. It also had **zero importers** anywhere in the codebase.
 *
 * The canonical replacement is to query the Payload collections directly:
 *   • `tax-codes`          — see `src/plugins/accounting/collections/TaxCodes.ts`
 *   • `tax-jurisdictions`  — see `src/plugins/accounting/collections/TaxJurisdictions.ts`
 *
 * ...via `req.payload.find({ collection: 'tax-codes', where: {...} })`.
 *
 * Safe to `git rm src/services/tax-automation.service.ts` and
 * `git rm src/types/tax.ts` once verified — see `docs/MIGRATION_WORKLIST.md` Slice F.
 *
 * @standard EN-16931:2017 §BG-23 vat-breakdown
 * @standard ISO-3166-1:2020 country-codes jurisdiction
 * @standard ISO-3166-2:2020 subdivision-codes jurisdiction
 * @accounting OECD SAF-T tax-table
 * @see docs/STANDARDS.md §4.1
 */
export {}
