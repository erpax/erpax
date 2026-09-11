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

// RFC 4648 §10's published vectors, unpadded per §5 — the standard's answers, never this module's own.
const RFC4648_VECTORS: readonly (readonly [string, string])[] = [
  ['', ''],
  ['f', 'Zg'],
  ['fo', 'Zm8'],
  ['foo', 'Zm9v'],
  ['foob', 'Zm9vYg'],
  ['fooba', 'Zm9vYmE'],
  ['foobar', 'Zm9vYmFy'],
]

/**
 * Fails closed unless both directions match RFC 4648 — §10's vectors, plus one per URL-safe
 * character (§5 table: 62 → `-`, 63 → `_`; bytes fb ff encode to `-_8`). A round-trip alone
 * passes a swapped alphabet; a published answer does not.
 */
export function assertRfc4648Vectors(): void {
  const cases: (readonly [Uint8Array, string])[] = [
    ...RFC4648_VECTORS.map(([text, expected]) => [new TextEncoder().encode(text), expected] as const),
    [new Uint8Array([0xfb, 0xff]), '-_8'],
  ]
  for (const [input, expected] of cases) {
    const got = b64urlEncode(input)
    if (got !== expected) throw new Error(`✖ RFC 4648 §5 — ${JSON.stringify([...input])} encoded as ${got}, expected ${expected}`)
    const back = b64urlDecode(expected)
    if (back.length !== input.length || back.some((b, i) => b !== input[i])) {
      throw new Error(`✖ RFC 4648 §5 — ${expected} did not decode back to ${JSON.stringify([...input])}`)
    }
  }
}
