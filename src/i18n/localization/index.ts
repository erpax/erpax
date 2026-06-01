/**
 * Localization config — supported locales + Payload localization shape.
 *
 * 24 EU official languages plus European Norwegian (`nb`), Icelandic (`is`),
 * Ukrainian (`uk`), Russian (`ru`), and international `ja`, `ar`. Content
 * strings start from English (`en.json` copies) until translated.
 *
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @standard ECMA-402 internationalization-api
 * @standard Unicode-CLDR locale-data
 * @standard EU 1958/1 official-languages-of-the-european-union
 * @see docs/STANDARDS.md §6
 */
export const supportedLocales = [
  'en',
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'es',
  'et',
  'fi',
  'fr',
  'ga',
  'hr',
  'hu',
  'is',
  'it',
  'ja',
  'lt',
  'lv',
  'mt',
  'nb',
  'nl',
  'pl',
  'pt',
  'ro',
  'ru',
  'sk',
  'sl',
  'sv',
  'uk',
  'ar',
] as const
export type SupportedLocale = (typeof supportedLocales)[number]

const localeMetadata: Record<SupportedLocale, { label: string; rtl?: true }> = {
  en: { label: 'English (English)' },
  ar: { label: 'Arabic (العربية)', rtl: true },
  bg: { label: 'Bulgarian (Български)' },
  cs: { label: 'Czech (Čeština)' },
  da: { label: 'Danish (Dansk)' },
  de: { label: 'German (Deutsch)' },
  el: { label: 'Greek (Ελληνικά)' },
  es: { label: 'Spanish (Español)' },
  et: { label: 'Estonian (Eesti)' },
  fi: { label: 'Finnish (Suomi)' },
  fr: { label: 'French (Français)' },
  ga: { label: 'Irish (Gaeilge)' },
  hr: { label: 'Croatian (Hrvatski)' },
  hu: { label: 'Hungarian (Magyar)' },
  is: { label: 'Icelandic (Íslenska)' },
  it: { label: 'Italian (Italiano)' },
  ja: { label: 'Japanese (日本語)' },
  lt: { label: 'Lithuanian (Lietuvių)' },
  lv: { label: 'Latvian (Latviešu)' },
  mt: { label: 'Maltese (Malti)' },
  nb: { label: 'Norwegian Bokmål (Norsk bokmål)' },
  nl: { label: 'Dutch (Nederlands)' },
  pl: { label: 'Polish (Polski)' },
  pt: { label: 'Portuguese (Português)' },
  ro: { label: 'Romanian (Română)' },
  ru: { label: 'Russian (Русский)' },
  sk: { label: 'Slovak (Slovenčina)' },
  sl: { label: 'Slovenian (Slovenščina)' },
  sv: { label: 'Swedish (Svenska)' },
  uk: { label: 'Ukrainian (Українська)' },
}

/** Default site / Payload locale (must stay aligned with `localization.defaultLocale`). */
export const defaultLocale: SupportedLocale = 'en'

const localization = {
  defaultLocale,
  fallback: true,
  locales: supportedLocales.map((code) => ({ code, ...localeMetadata[code] })),
}

export default localization
