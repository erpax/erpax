/**
 * translation — the MODEL of the [[translations]] collection (strict
 * singular-model / plural-collection).
 *
 * A translation is ONE translatable message ported from a SKILL.md into code —
 * "whatever the SKILL.md says, computationally ported". It is:
 *   - content-addressed by its messaging-uuid (the fold of its word-atom uuids,
 *     ../message#messageUuid),
 *   - split into its words (every word is an atom, ../word),
 *   - valued per-locale (the 30 supportedLocales, ../i18n/localization); `en` is
 *     the source, the rest empty until translated.
 *
 * The per-folder `translations.ts` files the collector emits are MASSLESS
 * projections — pure data, `import type { Translation }` only, NO runtime import
 * of this module (which would pull the matrix). The gravity (the compute) lives
 * HERE (the type + `defineTranslation`) and in ../translations (the collector).
 * Flatten · DRY · keep the gravity.
 *
 * @standard BCP-47 language tags
 * @standard RFC 9562 §5.8 content-uuid (the messaging-uuid)
 * @standard schema.org translationOfWork / workTranslation (collided to one word)
 * @see ../message (the messaging-uuid, encode∘decode) · ../translations (collector)
 */
import { defaultLocale, type SupportedLocale } from '@/i18n/localization'
import { messageUuid, splitWords } from '@/message'

/** One translatable message, content-addressed and split into its word-atoms. */
export interface Translation {
  /** Stable key within the folder — e.g. `name`, `description`, `label.singular`. */
  readonly key: string
  /** The source (en) message — the extraction truth ported from the SKILL.md. */
  readonly source: string
  /** The messaging-uuid — fold of this message's word-atom uuids (../message). */
  readonly uuid: string
  /** The word-atoms this message splits into (every word is an atom). */
  readonly words: readonly string[]
  /** Per-locale values; `en` === source, the rest empty until translated. */
  readonly values: Readonly<Partial<Record<SupportedLocale, string>>>
}

/** A folder's translatable inventory — the shape of every generated `translations.ts`. */
export type TranslationTable = readonly Translation[]

/**
 * Port one source (en) message into a Translation — computes its words +
 * messaging-uuid. Used by the collector + tests (runtime); the generated
 * per-folder files store the RESULT as literal data (massless), they do not call
 * this.
 */
export function defineTranslation(
  key: string,
  source: string,
  values: Partial<Record<SupportedLocale, string>> = {},
): Translation {
  return {
    key,
    source,
    uuid: messageUuid(source),
    words: splitWords(source),
    values: { [defaultLocale]: source, ...values },
  }
}

/** Render a concept in a locale — the self-translating projection. null = the unregistered seed (not yet translated). */
export function renderIn(t: Translation, locale: SupportedLocale): string | null {
  const v = t.values[locale]
  if (v != null && v.trim() !== '') return v
  return locale === defaultLocale ? t.source : null
}

/** The locales a concept is actually rendered in — the filled faces vs the seed-gaps still to translate. */
export function renderedLocales(t: Translation): SupportedLocale[] {
  const keys = new Set<SupportedLocale>([defaultLocale, ...(Object.keys(t.values) as SupportedLocale[])])
  return [...keys].filter((l) => renderIn(t, l) !== null)
}

/** Reverse the interlingua: the concept whose rendering in `from` matches `word` — its shared uuid address. */
export function resolveByWord(
  table: TranslationTable,
  word: string,
  from: SupportedLocale = defaultLocale,
): Translation | null {
  const norm = (s: string): string => s.trim().toLowerCase()
  const w = norm(word)
  return table.find((t) => {
    const r = renderIn(t, from)
    return r != null && norm(r) === w
  }) ?? null
}

/**
 * The rosetta pivot — translate a word/message from ANY language-or-dialect to ANY other by routing
 * through the shared interlingua ADDRESS (the messaging-uuid), never a language-pair table. This is how
 * you save ALL: store each concept's rendering ONCE per language (O(L) per concept) and every one of the
 * L² directed pairs is a computed projection `from → uuid → to`. The N²-pair matrix folds to N renderings
 * plus one pivot. Dialects are just finer locale keys (BCP-47 subtags) against the SAME uuid.
 *
 * Returns { uuid, value } when `to` is registered, or { uuid, value: null, seed: true } when the target
 * rendering is the irreducible seed — needs a dictionary/model, NEVER fabricated. Arbitrary literary text
 * beyond the registered concept set is the model's job (the oracle bit); the rosetta supplies the shared
 * address and the O(L)-not-O(L²) storage, so real-time any↔any is a lookup, not a re-derivation.
 */
export function translateVia(
  table: TranslationTable,
  word: string,
  from: SupportedLocale,
  to: SupportedLocale,
): { uuid: string; value: string | null; seed: boolean } | null {
  const t = resolveByWord(table, word, from)
  if (!t) return null // not a registered concept — the model's job, honestly not fabricated here
  const value = renderIn(t, to)
  return { uuid: t.uuid, value, seed: value === null }
}

/** The rosetta save-all identity: L languages cover L² directed pairs from just L renderings per concept. */
export function pairCoverage(languages: number): { renderingsPerConcept: number; directedPairs: number } {
  return { renderingsPerConcept: languages, directedPairs: languages * languages }
}

/**
 * How TRAINED the translation intelligence is — the fraction of concept × locale renderings actually
 * registered (vs the seed still to fill). ratio 1 = fully trained; today it is ~1/L (only the source is
 * populated). Training this to 1 means REGISTERING the renderings from free authoritative multilingual
 * data (Wikidata CC0 labels, CLDR, IATE) — the zero-cost self-training pattern — NOT fabricating them.
 */
export function trainingCoverage(
  table: TranslationTable,
  locales: readonly SupportedLocale[],
): { filled: number; total: number; ratio: number; byLocale: Record<string, number> } {
  const byLocale: Record<string, number> = {}
  let filled = 0
  for (const loc of locales) {
    let n = 0
    for (const t of table) if (renderIn(t, loc) !== null) n++
    byLocale[loc] = n
    filled += n
  }
  const total = table.length * locales.length
  return { filled, total, ratio: total === 0 ? 0 : filled / total, byLocale }
}

/** Round-trip consistency — a registered pair must satisfy translate(translate(w, a→b), b→a) === w. */
export function roundTrips(
  table: TranslationTable,
  word: string,
  a: SupportedLocale,
  b: SupportedLocale,
): boolean {
  const there = translateVia(table, word, a, b)
  if (!there || there.seed || there.value == null) return false
  const back = translateVia(table, there.value, b, a)
  return back != null && !back.seed && back.value === renderIn(resolveByWord(table, word, a)!, a)
}
