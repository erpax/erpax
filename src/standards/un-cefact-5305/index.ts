/**
 * UN/CEFACT 5305 — Duty / Tax / Fee Category Code.
 *
 * Lifted out of `src/standards/en-16931/types.ts` (`VatCategoryCode`)
 * into its own module since the same code list is used by:
 *   - `invoice-lines.taxation.vatCategoryCode` (EN-16931 BT-151)
 *   - `tax-codes.categoryCode` (TaxCodes master)
 *   - `ai-tax-classification` handler (AI suggester)
 *   - `tax-calculations.categoryBreakdown[].categoryCode`
 *   - SAF-T `<MasterFiles><TaxTable>` rows
 *
 * Re-exported from `en-16931` for source-compat.
 *
 * @standard UN/CEFACT Trade Data Element 5305 duty-tax-fee-category-code
 * @standard EN-16931:2017 BT-151 vat-category-code (subset that EN-16931 admits)
 */

/** Canonical UN/CEFACT 5305 codes used in the EN-16931 / EU VAT context. */
export const VAT_CATEGORY_CODES = ['S', 'Z', 'E', 'AE', 'K', 'G', 'O', 'L', 'M'] as const
export type VatCategoryCode = (typeof VAT_CATEGORY_CODES)[number]

export const VAT_CATEGORY_LABEL: Readonly<Record<VatCategoryCode, string>> = {
  S:  'S — Standard rate',
  Z:  'Z — Zero rated goods',
  E:  'E — Exempt from VAT',
  AE: 'AE — Reverse charge (recipient liable)',
  K:  'K — Intra-community supply (Art.138 VAT Directive)',
  G:  'G — Export outside the EU (Art.146 VAT Directive)',
  O:  'O — Out of scope of VAT',
  L:  'L — Canary Islands IGIC tax',
  M:  'M — Ceuta and Melilla tax (IPSI)',
}

export const VAT_CATEGORY_OPTIONS: ReadonlyArray<{ label: string; value: VatCategoryCode }> =
  VAT_CATEGORY_CODES.map((value) => ({ label: VAT_CATEGORY_LABEL[value], value }))

/** Predicate — true when the code requires a positive VAT rate. */
export const requiresVatRate = (code: VatCategoryCode): boolean =>
  code === 'S' || code === 'L' || code === 'M'

/** Predicate — true when the code requires an exemption-reason text/code. */
export const requiresExemptionReason = (code: VatCategoryCode): boolean =>
  code === 'E' || code === 'AE' || code === 'K' || code === 'G' || code === 'O'

export const isVatCategoryCode = (value: unknown): value is VatCategoryCode =>
  typeof value === 'string' && (VAT_CATEGORY_CODES as ReadonlyArray<string>).includes(value)
