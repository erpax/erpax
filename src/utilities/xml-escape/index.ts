/**
 * Escape the five XML predefined entities (`& < > " '`). Required on any text
 * node value or attribute value before embedding it in generated XML.
 *
 * The single shared escaper for every XML export serializer (Peppol UBL,
 * ISO-20022 pain.00x, OECD SAF-T) — one definition, not three.
 *
 * @standard XML-1.0 §2.4 predefined-entities
 */
export const escapeXml = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
