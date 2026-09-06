/**
 * base64url (RFC 4648 §5) — the unpadded, URL-safe alphabet JWS and every eIDAS-aligned
 * signature container uses. See ./SKILL.md.
 *
 * @standard RFC 4648 §5 base64url — URL and filename safe alphabet
 */

/** Bytes → unpadded base64url. `+` → `-`, `/` → `_`, trailing `=` removed. */
export function b64urlEncode(bytes: Uint8Array): string {
  const b64 = Buffer.from(bytes).toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

/** Unpadded base64url → bytes. Padding is restored before decoding, so an unpadded input round-trips. */
export function b64urlDecode(s: string): Uint8Array<ArrayBuffer> {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  const b64 = (s + pad).replace(/-/g, '+').replace(/_/g, '/')
  return new Uint8Array(Buffer.from(b64, 'base64'))
}
