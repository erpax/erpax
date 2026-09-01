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
 * Three-step validation:
 *   1. Regex shape (cheap reject for free-form strings).
 *   2. `Date.parse` accepts the value (catches malformed offsets).
 *   3. The parsed `Date` round-trips to the same `YYYY-MM-DD` we got in —
 *      `Date.parse('2026-02-30')` silently rolls over to `2026-03-02`, so
 *      regex+parse alone aren't enough to reject calendar-invalid dates.
 *
 * @standard ISO-8601-1:2019 §5.4 calendar-date-and-time
 */
export const isIso8601 = (s: unknown): s is string => {
  if (typeof s !== 'string' || !RE_ISO_8601.test(s)) return false
  const parsed = Date.parse(s)
  if (Number.isNaN(parsed)) return false
  // Compare the input's calendar prefix (YYYY-MM-DD) against the Date's UTC
  // calendar fields. Rolled-over dates differ on at least one field.
  const datePrefix = s.slice(0, 10)
  const d = new Date(parsed)
  const yyyy = String(d.getUTCFullYear()).padStart(4, '0')
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}` === datePrefix
}
