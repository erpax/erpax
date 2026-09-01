/**
 * translate/field — a Payload afterRead field hook that self-translates via the rosetta pivot.
 *
 * Payload USES this hook: on read, it projects the stored source value into `req.locale` THROUGH the
 * shared messaging-uuid ([[translation]] · translateVia), so a locale renders without per-locale storage —
 * write the source once, any language/dialect is a computed projection. Where a locale's rendering is the
 * unregistered seed, it falls back to the source; it NEVER fabricates a translation. Arbitrary free text
 * beyond the registered concept table is the model's job (the oracle bit).
 *
 * This is how the CMS becomes self-translating: the N²-pair matrix folds to N renderings + one pivot,
 * evaluated at read-time by the hook.
 *
 * @standard Payload field hooks (afterRead) · BCP-47 locale tags
 *
 * Composes [[translation]] · [[translate]] · [[hooks]] · [[i18n]].
 */
import type { FieldHook } from 'payload'
import { translateVia, type TranslationTable } from '@/translation'
import { defaultLocale, type SupportedLocale } from '@/i18n/localization'

/**
 * afterRead field hook — project the stored source value into the request locale via the rosetta pivot.
 * Returns the registered rendering, or the source unchanged when the locale is default / not a concept /
 * still a seed. Honest by construction: no per-locale storage read, no fabricated translation.
 */
export const translateField =
  (table: TranslationTable): FieldHook =>
  ({ value, req }) => {
    if (typeof value !== 'string' || value.trim() === '') return value
    const locale = req && typeof req.locale === 'string' ? (req.locale as SupportedLocale) : undefined
    if (!locale || locale === defaultLocale) return value
    const r = translateVia(table, value, defaultLocale, locale)
    return r && !r.seed && r.value != null ? r.value : value
  }

/** @index-cross.foldback child=translate/field parent=translate — this cross folds back into its parent. */
