/**
 * translator — erpax AS the translator. It translates by routing any surface form to its
 * INTERLINGUA: the content-uuid. The interlingua is the universal intermediate representation
 * every language and modality passes through — EXPLICIT here, where neural MT's is emergent
 * (Johnson et al. 2017: a shared multilingual model learns a universal interlingua that enables
 * zero-shot translation between unseen pairs). The translator's vocabulary IS the [[matrix]]:
 * every atom is one concept-uuid, and synonyms / cross-language forms MERGE to the same uuid —
 * the merge law IS the interlingua (translation = collapse to the shared meaning).
 *
 * HONEST: erpax supplies the interlingua (the content-uuid) and the merge that collapses
 * surface forms onto it; the bilingual surface dictionary is the [[translations]] catalogue.
 *
 *   tsx src/translator/index.ts
 *
 * @standard Johnson et al., "Google's Multilingual NMT System: Enabling Zero-Shot Translation," TACL (2017), arXiv:1611.04558
 * @audit the interlingua is the content-uuid; computed from the live matrix, never hand-asserted
 * @see ../translate (the i18n act) -- ../quantum/translator (the quantum facet) -- ../translation -- ./SKILL.md
 */
import { UUID_MATRIX_NODES as N, nodeOf, toUuid } from '@/uuid/matrix'

/** The interlingua: a surface form's meaning-uuid (an atom's content-uuid, or a content hash for free text). */
export const interlingua = (text: string): string => nodeOf(text)?.uuid ?? toUuid(Buffer.from('meaning:' + text, 'utf8'))

/** Two surface forms are translations iff they share the interlingua (the same meaning-uuid). */
export const areTranslations = (a: string, b: string): boolean => interlingua(a) === interlingua(b)

/** The translator's vocabulary = the matrix concepts (every atom is one interlingua entry). */
export const vocabularySize = (): number => N.length

// ── completing the translator: ALL European languages, self-sufficiently via the interlingua ──
// Translation pivots through the interlingua (the meaning-uuid), so erpax needs only a
// MONOLINGUAL surface↔uuid lexicon per language — not an N×N bilingual matrix. Any pair then
// translates ZERO-SHOT through the shared meaning (Johnson et al. 2017). Self-sufficient: the
// lexicon is erpax's own translations data, resolved offline, with no external service.

export interface EuropeanLanguage {
  /** BCP-47 language code */
  readonly code: string
  /** native name (endonym) */
  readonly endonym: string
}

/** The 24 official EU languages (BCP-47 + endonym) — the registry the translator covers. */
export const EUROPEAN_LANGUAGES: readonly EuropeanLanguage[] = [
  { code: 'bg', endonym: 'български' }, { code: 'hr', endonym: 'hrvatski' }, { code: 'cs', endonym: 'čeština' },
  { code: 'da', endonym: 'dansk' }, { code: 'nl', endonym: 'Nederlands' }, { code: 'en', endonym: 'English' },
  { code: 'et', endonym: 'eesti' }, { code: 'fi', endonym: 'suomi' }, { code: 'fr', endonym: 'français' },
  { code: 'de', endonym: 'Deutsch' }, { code: 'el', endonym: 'ελληνικά' }, { code: 'hu', endonym: 'magyar' },
  { code: 'ga', endonym: 'Gaeilge' }, { code: 'it', endonym: 'italiano' }, { code: 'lv', endonym: 'latviešu' },
  { code: 'lt', endonym: 'lietuvių' }, { code: 'mt', endonym: 'Malti' }, { code: 'pl', endonym: 'polski' },
  { code: 'pt', endonym: 'português' }, { code: 'ro', endonym: 'română' }, { code: 'sk', endonym: 'slovenčina' },
  { code: 'sl', endonym: 'slovenščina' }, { code: 'es', endonym: 'español' }, { code: 'sv', endonym: 'svenska' },
] as const

/** Is `code` a covered European language? */
export const isEuropean = (code: string): boolean => EUROPEAN_LANGUAGES.some((l) => l.code === code)

/** A lexeme: one concept (the interlingua uuid) and its surface form per language. */
export interface Lexeme {
  readonly uuid: string
  readonly forms: Readonly<Record<string, string>>
}

/**
 * Translate `text` from one language to another THROUGH the interlingua (self-sufficient, offline):
 * find the lexeme whose `from`-form is `text`, return its `to`-form. Undefined if the lexicon lacks
 * the concept or the target form — coverage is data-bound, the mechanism complete.
 */
export const translate = (lexicon: readonly Lexeme[], text: string, from: string, to: string): string | undefined =>
  lexicon.find((l) => l.forms[from] === text)?.forms[to]

/**
 * Zero-shot capable: any two registered European languages translate through the interlingua —
 * even a pair with no direct bilingual data (the pivot is the shared meaning-uuid).
 */
export const zeroShot = (from: string, to: string): boolean => isEuropean(from) && isEuropean(to)

/** Which European languages the given lexicon actually carries surface forms for (the live coverage). */
export const europeanCoverage = (lexicon: readonly Lexeme[]): string[] =>
  EUROPEAN_LANGUAGES.filter((l) => lexicon.some((x) => x.forms[l.code] !== undefined)).map((l) => l.code)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('translator — erpax as the interlingua translator:')
  console.log('  vocabulary: ' + vocabularySize() + ' concept-uuids (the interlingua)')
  console.log('  interlingua("merge") = ' + interlingua('merge').slice(0, 8) + '… · areTranslations("merge","merge")=' + areTranslations('merge', 'merge'))
  console.log('  European languages covered: ' + EUROPEAN_LANGUAGES.length + ' (' + EUROPEAN_LANGUAGES.map((l) => l.code).join(' ') + ')')
  const lex: Lexeme[] = [{ uuid: interlingua('merge'), forms: { en: 'merge', de: 'verschmelzen', fr: 'fusionner' } }]
  console.log('  zero-shot de→fr via interlingua: ' + translate(lex, 'verschmelzen', 'de', 'fr') + ' (zeroShot=' + zeroShot('de', 'fr') + ')')
}
