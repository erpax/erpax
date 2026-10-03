/**
 * Escape the five XML predefined entities (`& < > " '`). Required on any text
 * node value or attribute value before embedding it in generated XML.
 *
 * The single shared escaper for every XML export serializer (Peppol UBL,
 * ISO-20022 pain.00x, OECD SAF-T) — one definition, not three.
 *
 * @standard XML-1.0 §2.4 predefined-entities
 */
/**
 * Remove every `<…>` tag from a text, to a FIXPOINT. One pass of `/<[^>]+>/g` leaves `<scr<x>ipt>`
 * as `<script>` — CodeQL `incomplete-multi-character-sanitization`, flagged at five sites that each
 * carried the one-pass form. This is extraction, not HTML sanitisation: it gives the text content of
 * an XML amount, a WebVTT cue or a README cell, and a caller that needs a safe HTML string escapes
 * with escapeXml afterwards.
 */
export const stripTags = (value: string): string => {
  let s = value
  for (;;) {
    const next = s.replace(/<[^>]*>/g, '')
    if (next === s) return s
    s = next
  }
}

export const escapeXml = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
