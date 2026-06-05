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
