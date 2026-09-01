/**
 * standards — every standard the manufacturing/HR seeds are harmonised with, each
 * pinned to its in-force version AND its related official API (the live endpoint that
 * validates or resolves it). A cited `@standard` is TRUE only when the answer-path
 * implements it (see [[standard]]); the API is how a tenant checks against the source
 * of truth instead of trusting a private copy — the "related apis" made concrete.
 *
 * The classification endpoints reuse the CountryApi shape ([[config]] country-apis):
 * ESCO/NACE are pan-EU `'classification'` services, exactly as VIES is the pan-EU
 * `'vat_validation'` service — one model, no parallel structure (the merge law).
 *
 * @standard ISCO-08 · ESCO v1.2 · НКПД-2011 · NACE Rev.2.1 · IEC 62264-1:2013 · UN/CEFACT Rec 20 · EN-16931 · SFIA 8
 * @audit catalogue-only clients (clientImplemented:false) — endpoints are real, modules pending
 */
import type { CountryApi } from '@/country/api'

/** ESCO — resolve an ISCO-08 occupation to its skills/competencies across 27 EU languages. */
export const ESCO_API: CountryApi = {
  kind: 'classification',
  name: 'ESCO — European Skills, Competences, Qualifications and Occupations',
  authority: 'European Commission DG EMPL',
  endpoint: 'https://ec.europa.eu/esco/api',
  auth: 'none',
  format: 'json',
  documentation: 'https://ec.europa.eu/esco/portal/api',
  description: 'Resolve an ISCO-08 occupation to ESCO skills/competencies, localized in 27 languages.',
  clientImplemented: false,
}

/** Eurostat SDMX — NACE Rev.2 economic-activity classification (⊃ Bulgarian NKID). */
export const NACE_RAMON: CountryApi = {
  kind: 'classification',
  name: 'Eurostat SDMX — NACE Rev.2 economic-activity classification',
  authority: 'Eurostat',
  endpoint: 'https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1',
  auth: 'none',
  format: 'xml',
  documentation: 'https://ec.europa.eu/eurostat/web/nace',
  description: 'Economic-activity codes (NACE Rev.2.1 ⊃ Bulgarian NKID); SDMX 2.1.',
  clientImplemented: false,
}

/** A standard + its live source-of-truth API (null = a paper/code-list standard with no live service). */
export interface StandardEntry {
  /** the citation code used in @standard banners (the reference key). */
  readonly code: string
  readonly title: string
  /** the in-force edition. */
  readonly version: string
  readonly authority: string
  readonly relatedApi: CountryApi | null
}

/** The standards registry the seeds cite — versions pinned, APIs wired. */
export const STANDARD_REGISTRY: readonly StandardEntry[] = [
  { code: 'ISCO-08', title: 'International Standard Classification of Occupations', version: '2008', authority: 'ILO', relatedApi: ESCO_API },
  { code: 'ESCO', title: 'European Skills/Competences/Occupations', version: 'v1.2.0', authority: 'EC DG EMPL', relatedApi: ESCO_API },
  { code: 'НКПД-2011', title: 'Bulgarian National Classification of Occupations', version: '2011', authority: 'BG МТСП / НСИ', relatedApi: ESCO_API },
  { code: 'NACE Rev.2.1', title: 'Statistical Classification of Economic Activities', version: 'Rev.2.1 (eff. 2025)', authority: 'Eurostat', relatedApi: NACE_RAMON },
  { code: 'IEC 62264-1:2013', title: 'ISA-95 enterprise-control system integration', version: 'Ed.2.0 (2013)', authority: 'IEC / ISA', relatedApi: null },
  { code: 'UN/CEFACT Rec 20', title: 'Codes for Units of Measure used in International Trade', version: 'Rev 20', authority: 'UNECE', relatedApi: null },
  { code: 'EN-16931', title: 'Electronic invoicing — semantic data model', version: '2017+A1:2019', authority: 'CEN', relatedApi: null },
  { code: 'SFIA 8', title: 'Skills Framework for the Information Age', version: 'v8 (2021)', authority: 'SFIA Foundation', relatedApi: null },
]

/** Look up a standard by its citation code. */
export const standardFor = (code: string): StandardEntry | undefined =>
  STANDARD_REGISTRY.find((s) => s.code === code)

/** The distinct live APIs across all registered standards (the related-API surface). */
export const standardApis = (): readonly CountryApi[] =>
  [...new Map(STANDARD_REGISTRY.map((s) => s.relatedApi).filter((a): a is CountryApi => a !== null).map((a) => [a.endpoint, a])).values()]
