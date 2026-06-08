/**
 * Public surface of the BCP 47 standards module.
 *
 * @standard BCP-47 language-tag
 */
export { isBcp47 } from './language-tag'
export {
  ensureValidLocale,
  getSafeLocale,
  getSupportedLocales,
  isDefaultLocale,
  isValidLocale,
  resolveLocale,
  type LocaleInput,
} from './locale-utils'
