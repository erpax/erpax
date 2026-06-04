/**
 * Signed content-uuid round-trip tests.
 *
 * Slice HHHHHHHHH-cut1 (2026-05-11). Pins:
 *
 *   - Ed25519 sign → verify round-trip succeeds.
 *   - A signature does NOT verify against a different public key.
 *   - A signature over uuidA does NOT verify when the payload is mutated
 *     to uuidB (the tamper case).
 *   - JWS export/import is structural-roundtrip lossless.
 *
 * Uses `globalThis.crypto.subtle.generateKey` so tests run in Node ≥18
 * and Cloudflare Workers without keymat fixtures.
 *
 * @standard RFC 8032 EdDSA / Ed25519
 * @standard RFC 7515 JWS compact serialization
 */
import { describe, it, expect } from 'vitest'
import type { ContentUuid } from '@/integrity/content-uuid'
import {
  signContentUuid,
  verifyContentUuidSignature,
  toJws,
  fromJws,
} from '@/integrity/signatures'

interface Invoice { id: string; amount: number }

async function generateEd25519Pair(): Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }> {
  const pair = await globalThis.crypto.subtle.generateKey(
    { name: 'Ed25519' },
    /* extractable */ true,
    ['sign', 'verify'],
  ) as CryptoKeyPair
  return { publicKey: pair.publicKey, privateKey: pair.privateKey }
}

const UUID_A = '00000000-0000-5000-8000-000000000001' as ContentUuid<Invoice>
const UUID_B = '00000000-0000-5000-8000-000000000002' as ContentUuid<Invoice>

describe('signContentUuid / verifyContentUuidSignature', () => {
  it('round-trips: a signature verifies under the matching public key', async () => {
    const { publicKey, privateKey } = await generateEd25519Pair()
    const signed = await signContentUuid({
      uuid: UUID_A,
      privateKey,
      alg: 'EdDSA',
      kid: 'tenant-1/signing/2026-05-11',
    })
    expect(signed.uuid).toBe(UUID_A)
    expect(signed.alg).toBe('EdDSA')
    expect(signed.kid).toBe('tenant-1/signing/2026-05-11')
    expect(signed.sig.length).toBeGreaterThan(0)
    expect(typeof signed.signedAt).toBe('string')
    expect(await verifyContentUuidSignature({ signed, publicKey })).toBe(true)
  })

  it('rejects when verified under a different key', async () => {
    const a = await generateEd25519Pair()
    const b = await generateEd25519Pair()
    const signed = await signContentUuid({
      uuid: UUID_A, privateKey: a.privateKey, alg: 'EdDSA', kid: 'a',
    })
    expect(await verifyContentUuidSignature({ signed, publicKey: b.publicKey })).toBe(false)
  })

  it('rejects when the uuid was tampered (signature bound to uuidA, payload mutated to uuidB)', async () => {
    const { publicKey, privateKey } = await generateEd25519Pair()
    const signed = await signContentUuid({
      uuid: UUID_A, privateKey, alg: 'EdDSA', kid: 'k',
    })
    // The wire envelope is mutated to claim uuidB — but the signature
    // was over uuidA. Verification must fail; this is the tamper case.
    const tampered = { ...signed, uuid: UUID_B }
    expect(await verifyContentUuidSignature({ signed: tampered, publicKey })).toBe(false)
  })

  it('rejects when the signature bytes are corrupted', async () => {
    const { publicKey, privateKey } = await generateEd25519Pair()
    const signed = await signContentUuid({
      uuid: UUID_A, privateKey, alg: 'EdDSA', kid: 'k',
    })
    // Flip the first base64url char — bytes still decode but the
    // signature is garbage.
    const flipped = signed.sig[0] === 'A' ? `B${signed.sig.slice(1)}` : `A${signed.sig.slice(1)}`
    const tampered = { ...signed, sig: flipped }
    expect(await verifyContentUuidSignature({ signed: tampered, publicKey })).toBe(false)
  })
})

describe('toJws / fromJws', () => {
  it('round-trips a SignedUuid through the JWS compact format', async () => {
    const { privateKey } = await generateEd25519Pair()
    const signed = await signContentUuid({
      uuid: UUID_A, privateKey, alg: 'EdDSA', kid: 'tenant-1/k/2026',
      signedAt: '2026-05-11T08:00:00.000Z',
    })
    const jws = toJws(signed)
    // RFC 7515 compact form has exactly 3 base64url segments separated by '.'.
    expect(jws.split('.')).toHaveLength(3)
    const recovered = fromJws<Invoice>(jws)
    expect(recovered.uuid).toBe(signed.uuid)
    expect(recovered.alg).toBe(signed.alg)
    expect(recovered.kid).toBe(signed.kid)
    expect(recovered.sig).toBe(signed.sig)
    expect(recovered.signedAt).toBe(signed.signedAt)
  })

  it('fromJws throws on malformed input', () => {
    expect(() => fromJws('not-a-jws')).toThrow(/3 segments/)
    expect(() => fromJws('a.b.c.d')).toThrow(/3 segments/)
  })

  it('fromJws throws when header is missing alg/kid', () => {
    // A 3-segment but semantically-empty JWS.
    const emptyHeader = Buffer.from('{}').toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
    const payload = Buffer.from(UUID_A).toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
    expect(() => fromJws(`${emptyHeader}.${payload}.signature`)).toThrow(/missing alg/)
  })
})
