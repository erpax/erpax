/**
 * Expected Payload admin login email field label per locale (e2e fixture).
 *
 * Aligned with `src/payload.config.ts` `i18n.supportedLanguages`. Finnish,
 * Greek, Irish, Maltese reuse the English UI pack (`payloadUiFallback`).
 *
 * @standard ISO/IEC-29119:2022 software-testing test-fixture
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @standard ECMA-402 internationalization-api
 * @see docs/STANDARDS.md §6 §7
 */
import { ar } from '@payloadcms/translations/languages/ar'
import { bg } from '@payloadcms/translations/languages/bg'
import { cs } from '@payloadcms/translations/languages/cs'
import { da } from '@payloadcms/translations/languages/da'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { et } from '@payloadcms/translations/languages/et'
import { fr } from '@payloadcms/translations/languages/fr'
import { hr } from '@payloadcms/translations/languages/hr'
import { hu } from '@payloadcms/translations/languages/hu'
import { is } from '@payloadcms/translations/languages/is'
import { it } from '@payloadcms/translations/languages/it'
import { ja } from '@payloadcms/translations/languages/ja'
import { lt } from '@payloadcms/translations/languages/lt'
import { lv } from '@payloadcms/translations/languages/lv'
import { nb } from '@payloadcms/translations/languages/nb'
import { nl } from '@payloadcms/translations/languages/nl'
import { pl } from '@payloadcms/translations/languages/pl'
import { pt } from '@payloadcms/translations/languages/pt'
import { ro } from '@payloadcms/translations/languages/ro'
import { ru } from '@payloadcms/translations/languages/ru'
import { sk } from '@payloadcms/translations/languages/sk'
import { sl } from '@payloadcms/translations/languages/sl'
import { sv } from '@payloadcms/translations/languages/sv'
import { uk } from '@payloadcms/translations/languages/uk'

import type { SupportedLocale } from '@/i18n/localization'

export const expectedAdminEmailLabel = {
  en: en.translations.general.email,
  ar: ar.translations.general.email,
  bg: bg.translations.general.email,
  cs: cs.translations.general.email,
  da: da.translations.general.email,
  de: de.translations.general.email,
  el: en.translations.general.email,
  es: es.translations.general.email,
  et: et.translations.general.email,
  fi: en.translations.general.email,
  fr: fr.translations.general.email,
  ga: en.translations.general.email,
  hr: hr.translations.general.email,
  hu: hu.translations.general.email,
  is: is.translations.general.email,
  it: it.translations.general.email,
  ja: ja.translations.general.email,
  lt: lt.translations.general.email,
  lv: lv.translations.general.email,
  mt: en.translations.general.email,
  nb: nb.translations.general.email,
  nl: nl.translations.general.email,
  pl: pl.translations.general.email,
  pt: pt.translations.general.email,
  ro: ro.translations.general.email,
  ru: ru.translations.general.email,
  sk: sk.translations.general.email,
  sl: sl.translations.general.email,
  sv: sv.translations.general.email,
  uk: uk.translations.general.email,
} as const satisfies Record<SupportedLocale, string>
