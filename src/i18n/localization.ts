export const supportedLocales = ['en', 'bg', 'es', 'de', 'ja', 'ar'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

const localeMetadata: Record<SupportedLocale, { label: string; rtl?: true }> = {
  en: { label: 'English (English)' },
  bg: { label: 'Bulgarian (Български)' },
  // Regarding the label, we are using the syntax "{lang. in English} - ({lang. in native})".
  // The consensus is that it's a good idea to have languages listed in their own languages:
  // https://ux.stackexchange.com/q/37017/144485
  // Although others have made good points about why it is good to have them in English:
  // such as the user type, and the order of languages. See https://ux.stackexchange.com/q/3592/144485
  es: { label: 'Spanish (Español)' },
  de: { label: 'German (Deutsch)' },
  ja: { label: 'Japanese (日本語)' },
  ar: { label: 'Arabic (العربية)', rtl: true },
}
const defaultLocale: SupportedLocale = 'en'

const localization = {
  defaultLocale,
  fallback: true,
  locales: supportedLocales.map((code) => ({ code, ...localeMetadata[code] })),
}

export default localization
