/**
 * EU CSRD ESRS 1/2/E/S/G — sustainability-reporting topic taxonomy.
 *
 * Corporate Sustainability Reporting Directive (EU) 2022/2464, implemented
 * via the European Sustainability Reporting Standards (ESRS). Each
 * `CsrdDisclosures` row tags itself with one of these topics; the report
 * roll-up groups by category.
 *
 * @standard EU CSRD Directive 2022/2464
 * @standard EU ESRS 1 General Requirements
 * @standard EU ESRS 2 General Disclosures
 * @standard EU ESRS E1 Climate Change (companion to GHG Protocol)
 * @standard IFRS S1 General Sustainability Disclosures
 * @standard IFRS S2 Climate-Related Disclosures
 * @standard EU EFRAG ESRS-XBRL taxonomy
 */

/** Top-level ESRS categories. */
export const ESRS_CATEGORIES = ['cross_cutting', 'environmental', 'social', 'governance'] as const
export type EsrsCategory = (typeof ESRS_CATEGORIES)[number]

export const ESRS_CATEGORY_LABEL: Readonly<Record<EsrsCategory, string>> = {
  cross_cutting: 'Cross-cutting (ESRS 1 + ESRS 2)',
  environmental: 'Environmental (ESRS E)',
  social:        'Social (ESRS S)',
  governance:    'Governance (ESRS G)',
}

export const ESRS_CATEGORY_OPTIONS: ReadonlyArray<{ label: string; value: EsrsCategory }> =
  ESRS_CATEGORIES.map((value) => ({ label: ESRS_CATEGORY_LABEL[value], value }))

/** ESRS topic codes — the 12 in-scope standards as of FY2024. */
export const ESRS_TOPICS = [
  'esrs_1', 'esrs_2',
  'esrs_e1', 'esrs_e2', 'esrs_e3', 'esrs_e4', 'esrs_e5',
  'esrs_s1', 'esrs_s2', 'esrs_s3', 'esrs_s4',
  'esrs_g1',
] as const
export type EsrsTopic = (typeof ESRS_TOPICS)[number]

export const ESRS_TOPIC_LABEL: Readonly<Record<EsrsTopic, string>> = {
  esrs_1:  'ESRS 1 — General requirements',
  esrs_2:  'ESRS 2 — General disclosures',
  esrs_e1: 'ESRS E1 — Climate change',
  esrs_e2: 'ESRS E2 — Pollution',
  esrs_e3: 'ESRS E3 — Water and marine resources',
  esrs_e4: 'ESRS E4 — Biodiversity and ecosystems',
  esrs_e5: 'ESRS E5 — Resource use and circular economy',
  esrs_s1: 'ESRS S1 — Own workforce',
  esrs_s2: 'ESRS S2 — Workers in the value chain',
  esrs_s3: 'ESRS S3 — Affected communities',
  esrs_s4: 'ESRS S4 — Consumers and end-users',
  esrs_g1: 'ESRS G1 — Business conduct',
}

export const ESRS_TOPIC_OPTIONS: ReadonlyArray<{ label: string; value: EsrsTopic }> =
  ESRS_TOPICS.map((value) => ({ label: ESRS_TOPIC_LABEL[value], value }))

/** Maps a topic to its parent category — drives roll-up reporting. */
export const ESRS_TOPIC_TO_CATEGORY: Readonly<Record<EsrsTopic, EsrsCategory>> = {
  esrs_1:  'cross_cutting', esrs_2: 'cross_cutting',
  esrs_e1: 'environmental', esrs_e2: 'environmental', esrs_e3: 'environmental',
  esrs_e4: 'environmental', esrs_e5: 'environmental',
  esrs_s1: 'social', esrs_s2: 'social', esrs_s3: 'social', esrs_s4: 'social',
  esrs_g1: 'governance',
}

/** Materiality classes per ESRS 1 §3 double-materiality. */
export const ESRS_MATERIALITY = ['double_material', 'impact_material', 'financial_material', 'not_material'] as const
export type EsrsMateriality = (typeof ESRS_MATERIALITY)[number]
export const ESRS_MATERIALITY_LABEL: Readonly<Record<EsrsMateriality, string>> = {
  double_material:    'Double Material (impact + financial)',
  impact_material:    'Impact Material Only',
  financial_material: 'Financial Material Only',
  not_material:       'Not Material (excluded with rationale)',
}
export const ESRS_MATERIALITY_OPTIONS: ReadonlyArray<{ label: string; value: EsrsMateriality }> =
  ESRS_MATERIALITY.map((value) => ({ label: ESRS_MATERIALITY_LABEL[value], value }))

/** Assurance levels per CSRD Art.34a. */
export const ESRS_ASSURANCE_LEVELS = ['not_assured', 'limited_assurance', 'reasonable_assurance', 'self_declared'] as const
export type EsrsAssuranceLevel = (typeof ESRS_ASSURANCE_LEVELS)[number]
export const ESRS_ASSURANCE_LABEL: Readonly<Record<EsrsAssuranceLevel, string>> = {
  not_assured:          'Not Assured',
  limited_assurance:    'Limited Assurance (ISAE 3000)',
  reasonable_assurance: 'Reasonable Assurance',
  self_declared:        'Self-Declared',
}
export const ESRS_ASSURANCE_OPTIONS: ReadonlyArray<{ label: string; value: EsrsAssuranceLevel }> =
  ESRS_ASSURANCE_LEVELS.map((value) => ({ label: ESRS_ASSURANCE_LABEL[value], value }))
