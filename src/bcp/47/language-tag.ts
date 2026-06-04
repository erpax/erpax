/**
 * BCP 47 language-tag validator.
 *
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @rfc 4647 matching-of-language-tags
 * @see https://www.rfc-editor.org/info/bcp47
 */

const RE_BCP47 =
  /^[a-z]{2,3}(?:-[A-Z]{2}|-\d{3})?(?:-[A-Za-z]{4})?(?:-[A-Z]{2})?(?:-[A-Za-z0-9-]+)?$/

/**
 * BCP 47 (RFC 5646) common-form language tag (e.g. `en`, `en-US`, `de-DE`,
 * `zh-Hans-CN`). Does not validate against the IANA subtag registry — that's
 * runtime data; we cover only the structural form.
 *
 * @rfc 5646 §2.1 syntax
 */
export const isBcp47 = (s: unknown): s is string =>
  typeof s === 'string' && RE_BCP47.test(s)
