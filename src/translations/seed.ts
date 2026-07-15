import type { Payload } from 'payload'
import type { Translation as TranslationDoc } from '@/types'
import { verifiedRenderings } from '@/translation/source/verified'
import { supportedLocales, defaultLocale } from '@/i18n/localization'

/**
 * Seed for `translations` — register the sense-VERIFIED Wikidata renderings (CC0) as the opening
 * multilingual data. Every row is one concept from [[verified]]: `en` is the atom word (the source),
 * the other locales are Wikidata's community labels for the sense-matched Qid. NONE are fabricated —
 * a rendering exists only because a candidate concept's description sense-matched the atom's meaning
 * (../translation/source#harvestVerified). Concepts whose sense was ambiguous were left as gaps, not
 * seeded. Idempotent on `translationKey`; localized `value` written per locale.
 *
 * @standard Wikidata (CC0) · BCP-47 language tags · RFC 9562 §5.8 content-uuid
 * @see ./index.ts (the collection) · ../translation/source/verified (the snapshot)
 */
export async function seedTranslations(payload: Payload): Promise<void> {
  // The renderings are COMPUTED from the sense-verified Qid seed (sealed content-addressed cache) —
  // only the concept→Qid judgment is stored in src; the labels are a projection, never hardcoded.
  const { table } = await verifiedRenderings()
  for (const t of table) {
    const key = `concept:${t.key}`
    const translationKey = `other:${key}`

    const existing = await payload.find({
      collection: 'translations',
      where: { translationKey: { equals: translationKey } },
      limit: 1,
      overrideAccess: true,
    })

    const base = {
      translationKey,
      scope: 'other',
      key,
      value: t.source, // en source — the atom word
      contentUuid: t.uuid, // the messaging-uuid (fold of the word-atom uuids)
    } as Partial<TranslationDoc>

    const id =
      existing.docs.length > 0
        ? (await payload.update({ collection: 'translations', id: existing.docs[0]!.id, data: base, locale: defaultLocale, overrideAccess: true })).id
        : (await payload.create({ collection: 'translations', data: base as TranslationDoc, locale: defaultLocale, overrideAccess: true })).id

    // Write each sense-verified locale rendering onto the localized `value` field.
    for (const loc of supportedLocales) {
      if (loc === defaultLocale) continue
      const rendering = t.values[loc]
      if (!rendering) continue // honest seed-gap: this locale was not covered
      await payload.update({ collection: 'translations', id, data: { value: rendering } as Partial<TranslationDoc>, locale: loc, overrideAccess: true })
    }
  }
}
