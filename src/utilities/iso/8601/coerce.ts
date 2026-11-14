/**
 * ISO 8601 coercer — bring date-ish input into canonical UTC string form.
 *
 * @standard ISO-8601-1:2019 date-time
 * @see https://www.iso.org/iso-8601-date-and-time-format.html
 */

/**
 * Coerce any date-ish input (`Date`, ISO string, epoch number) to canonical
 * ISO 8601-1 UTC timestamp via `Date#toISOString()`. Returns `null` for
 * unparseable / non-date input rather than throwing — appropriate for hook
 * normalization paths.
 *
 * @standard ISO-8601-1:2019 §5.4 calendar-date-and-time
 * @standard ECMA-262 Date.prototype.toISOString
 */
export function toIso8601(value: unknown): string | null {
  if (value == null) return null
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.toISOString()
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d.toISOString()
  }
  return null
}
