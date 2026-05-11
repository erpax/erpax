/**
 * OECD Transfer Pricing Guidelines — method taxonomy + BEPS Action 13
 * documentation classes.
 *
 * @standard OECD TPG 2022 transfer-pricing-guidelines
 * @standard OECD BEPS Action 13 master-file-local-file-cbcr
 * @standard EU DAC-4 country-by-country-reporting
 * @standard OECD Pillar Two GloBE 15% global minimum tax (companion)
 */

/** OECD TPG Chapter II methods. */
export const OECD_TP_METHODS = ['cup', 'resale_price', 'cost_plus', 'tnmm', 'profit_split', 'other'] as const
export type OecdTpMethod = (typeof OECD_TP_METHODS)[number]
export const OECD_TP_METHOD_LABEL: Readonly<Record<OecdTpMethod, string>> = {
  cup:          'CUP (Comparable Uncontrolled Price)',
  resale_price: 'Resale Price',
  cost_plus:    'Cost Plus',
  tnmm:         'TNMM (Transactional Net Margin)',
  profit_split: 'Profit Split',
  other:        'Other (justified)',
}
export const OECD_TP_METHOD_OPTIONS: ReadonlyArray<{ label: string; value: OecdTpMethod }> =
  OECD_TP_METHODS.map((value) => ({ label: OECD_TP_METHOD_LABEL[value], value }))

/** BEPS Action 13 documentation file types. */
export const BEPS_TP_FILE_TYPES = ['master_file', 'local_file', 'cbcr', 'benchmark', 'apa', 'tp_adjustment'] as const
export type BepsTpFileType = (typeof BEPS_TP_FILE_TYPES)[number]
export const BEPS_TP_FILE_TYPE_LABEL: Readonly<Record<BepsTpFileType, string>> = {
  master_file:   'Master File (group-level)',
  local_file:    'Local File (entity-level)',
  cbcr:          'Country-by-Country Report (CbCR)',
  benchmark:     'Benchmarking Study',
  apa:           'Advance Pricing Agreement (APA)',
  tp_adjustment: 'TP Adjustment Decision',
}
export const BEPS_TP_FILE_TYPE_OPTIONS: ReadonlyArray<{ label: string; value: BepsTpFileType }> =
  BEPS_TP_FILE_TYPES.map((value) => ({ label: BEPS_TP_FILE_TYPE_LABEL[value], value }))

/** CbCR threshold (consolidated revenue) in EUR. */
export const CBCR_REVENUE_THRESHOLD_EUR = 750_000_000

/** Pillar Two threshold (same EUR amount; applies for ≥ 2 of last 4 years). */
export const PILLAR_TWO_REVENUE_THRESHOLD_EUR = 750_000_000
