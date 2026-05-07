/**
 * Locales: EU official languages (24) plus European Norwegian (`nb`), Icelandic
 * (`is`), Ukrainian (`uk`), Russian (`ru`), and international `ja`, `ar`.
 * Content strings start from English (`en.json` copies) until translated.
 */
export const supportedLocales = [
  'en',
  'ar',
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

const defaultLocale: SupportedLocale = 'en'

const localization = {
  defaultLocale,
  fallback: true,
  locales: supportedLocales.map((code) => ({ code, ...localeMetadata[code] })),
}

export default localization
