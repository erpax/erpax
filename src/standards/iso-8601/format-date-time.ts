/**
 * ISO 8601 — legacy en-US display formatter (`MM/DD/YYYY`).
 *
 * NOTE: For locale-aware output use `Intl.DateTimeFormat` (ECMA-402)
 * directly. Storage and transport stays in canonical ISO 8601-1 form via
 * `validate.ts` / `coerce.ts` in this folder.
 *
 * @standard ISO-8601-1:2019 date-time input-canonical-form
 * @standard ECMA-262 Date.prototype
 * @standard ECMA-402 internationalization-api Intl.DateTimeFormat
 * @see ./validate.ts
 * @see ./coerce.ts
 */

export const formatDateTime = (timestamp: string): string => {
  const now = new Date()
  let date = now
  if (timestamp) date = new Date(timestamp)
  const months = date.getMonth()
  const days = date.getDate()

  const MM = months + 1 < 10 ? `0${months + 1}` : months + 1
  const DD = days < 10 ? `0${days}` : days
  const YYYY = date.getFullYear()

  return `${MM}/${DD}/${YYYY}`
}
