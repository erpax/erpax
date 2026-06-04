/**
 * i18n stub-filler — apply an audit report to a Bundles map by adding
 * every missing key with EN content and `[en] …` placeholder for the
 * other locales, so a translator can grep for the marker.
 *
 * Slice CCCCC-cut2-i18n (2026-05-11). Pure transformation; the caller
 * is responsible for serialising the bundles back to disk.
 *
 * @standard ISO/IEC 25023:2016 §8 functional-completeness
 * @standard BCP-47 language-tag
 * @rfc 8259 json
 */

import type { Bundles, I18nAuditReport } from '@/spec/generator/i18n-audit'
import type { GeneratedTranslations } from '@/spec/generator/translation-generator'
import { STUB_PREFIX } from '@/spec/generator/i18n-keys'

export interface StubFillResult {
  readonly bundles: Bundles
  /** keys → number of locales actually filled (post-dedupe). */
  readonly filledKeys: number
  readonly filledRows: number
  /** keys whose default-EN value came from spec generator (vs. fallback). */
  readonly specSourcedKeys: number
}

/**
 * Apply the audit to the bundles, filling missing rows with stubs.
 *
 * When `generated.defaults` carries a value for a missing key it WINS
 * over the audit's slug-derived `defaultEnglish` — that's the path that
 * makes translations spec-derived (same way tests are spec-derived).
 * The `defaultEnglish` from the audit is the legacy fallback for keys
 * the generator didn't supply (e.g. when the corpus is partial).
 */
export function fillStubs(args: {
  bundles: Bundles
  report: I18nAuditReport
  generated?: GeneratedTranslations
  defaultLocale?: string
}): StubFillResult {
  const defaultLocale = args.defaultLocale ?? 'en'
  // Deep-clone the bundles to avoid mutating the caller's copy.
  const next: Bundles = {}
  for (const [loc, kv] of Object.entries(args.bundles)) next[loc] = { ...kv }

  let filledKeys = 0
  let filledRows = 0
  let specSourcedKeys = 0

  for (const m of args.report.missing) {
    const generatedValue = args.generated?.defaults.get(m.key)
    const englishContent = generatedValue ?? m.defaultEnglish
    if (generatedValue !== undefined) specSourcedKeys += 1

    let touchedThisKey = false
    for (const loc of m.missingFromLocales) {
      if (!next[loc]) next[loc] = {}
      const value = loc === defaultLocale ? englishContent : `${STUB_PREFIX}${englishContent}`
      next[loc][m.key] = value
      filledRows += 1
      touchedThisKey = true
    }
    if (touchedThisKey) filledKeys += 1
  }

  return { bundles: next, filledKeys, filledRows, specSourcedKeys }
}
