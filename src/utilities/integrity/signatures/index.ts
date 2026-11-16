/**
 * Signed content uuid: an ML-DSA signature (FIPS 204, through the crypto door) over a record's content
 * uuid, with the key id that made it, and its JWS compact form (RFC 7515) for the wire. A signature
 * binds the uuid it signs; Cost.lean (`the_uuid_address_collides_below_category_one`) states what a
 * bare uuid is worth, so a signature here is holder-binding of an address, not a stronger seal.
 *
 * @standard FIPS 204 ML-DSA
 * @standard RFC 7515 JSON Web Signature compact serialization
 * @standard eIDAS (EU) 910/2014 advanced electronic signature
 */
import { SIGNATURE, sign, verify } from '@/utilities/crypto'
import type { ContentUuid } from '@/utilities/integrity/content'
import { b64urlDecode, b64urlEncode } from '@/utilities/integrity/base64url'

export type SignatureAlg = typeof SIGNATURE

export interface SignedUuid<T> {
  readonly uuid: ContentUuid<T>
  readonly alg: SignatureAlg
  readonly kid: string
  readonly sig: string
  readonly signedAt: string
}

/** Sign a content uuid with the tenant's private key. */
export const signContentUuid = async <T>({ uuid, privateKey, kid, signedAt }: { uuid: ContentUuid<T>; privateKey: CryptoKey; kid: string; signedAt?: string }): Promise<SignedUuid<T>> => ({
  uuid,
  alg: SIGNATURE,
  kid,
  sig: b64urlEncode(await sign(privateKey, uuid)),
  signedAt: signedAt ?? new Date().toISOString(),
})

/** Whether a signed uuid verifies under the public key; another algorithm or a malformed signature is false. */
export const verifyContentUuidSignature = async <T>({ signed, publicKey }: { signed: SignedUuid<T>; publicKey: CryptoKey }): Promise<boolean> =>
  signed.alg === SIGNATURE && verify(publicKey, b64urlDecode(signed.sig), signed.uuid)

/** The JWS compact form: header (alg, kid, iat, typ), the uuid as payload, the signature. */
export const toJws = <T>(signed: SignedUuid<T>): string => {
  const header = { alg: signed.alg, kid: signed.kid, iat: signed.signedAt, typ: 'erpax-uuid' }
  const headerEnc = b64urlEncode(new TextEncoder().encode(JSON.stringify(header)))
  const payloadEnc = b64urlEncode(new TextEncoder().encode(signed.uuid))
  return `${headerEnc}.${payloadEnc}.${signed.sig}`
}

/** A signed uuid back from its JWS compact form; throws on a malformed token. */
export const fromJws = <T>(jws: string): SignedUuid<T> => {
  const parts = jws.split('.')
  if (parts.length !== 3) throw new Error('fromJws: expected 3 segments')
  const [h, p, s] = parts as [string, string, string]
  const header = JSON.parse(new TextDecoder().decode(b64urlDecode(h))) as { alg?: SignatureAlg; kid?: string; iat?: string }
  if (!header.alg || !header.kid) throw new Error('fromJws: missing alg/kid')
  return {
    uuid: new TextDecoder().decode(b64urlDecode(p)) as ContentUuid<T>,
    alg: header.alg,
    kid: header.kid,
    sig: s,
    signedAt: header.iat ?? new Date(0).toISOString(),
  }
}
