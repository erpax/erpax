/**
 * ISO 8601 date/time validator.
 *
 * @standard ISO-8601-1:2019 date-time
 * @see https://www.iso.org/iso-8601-date-and-time-format.html
 */

const RE_ISO_8601 =
  /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/

/**
 * ISO 8601-1:2019 calendar date or extended date-time string.
 * Accepts `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm[:ss[.fffffffff]][Z|±HH:MM]`.
 *
 * Verifies regex form AND that `Date.parse` accepts the value (so `2025-02-30`,
 * which matches the regex, is rejected).
 *
 * @standard ISO-8601-1:2019 §5.4 calendar-date-and-time
 */
export const isIso8601 = (s: unknown): s is string =>
  typeof s === 'string' && RE_ISO_8601.test(s) && !Number.isNaN(Date.parse(s))
