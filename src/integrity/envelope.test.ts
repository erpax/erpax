/**
 * Envelope encryption round-trip tests.
 *
 * Slice HHHHHHHHH-cut1 (2026-05-11). Pins:
 *
 *   - encryptEnvelope → decryptEnvelope yields the same plaintext.
 *   - Two encryptions of the same plaintext under the same KEK produce
 *     DIFFERENT ciphertexts (random IVs) but BOTH decrypt cleanly.
 *   - Tampering ciphertext / authTag / iv produces a decryption error
 *     (AES-GCM AEAD authentication failure).
 *   - Same plaintext under DIFFERENT KEKs produces DIFFERENT DEKs and
 *     ciphertexts are not interchangeable.
 *
 * Uses HKDF-imported raw key material so the test runs in Node ≥18 and
 * Cloudflare Workers without fixtures on disk.
 *
 * @standard NIST SP 800-38D AES-GCM (AEAD authentication failure case)
 * @standard RFC 5869 HKDF (the key derivation step)
 */
import { describe, it, expect } from 'vitest'
import type { ContentUuid } from '@/integrity/content-uuid'
import { encryptEnvelope, decryptEnvelope } from '@/integrity/envelope'

interface Invoice { id: string; amount: number; iban: string }

async function importKek(rawBytes: Uint8Array): Promise<CryptoKey> {
  return globalThis.crypto.subtle.importKey(
    'raw', rawBytes,
    { name: 'HKDF' },
    /* extractable */ false,
    ['deriveKey'],
  )
}

function randomKekMaterial(): Uint8Array {
  return globalThis.crypto.getRandomValues(new Uint8Array(32))
}

const UUID = '00000000-0000-5000-8000-00000000aaaa' as ContentUuid<Invoice>
const PLAINTEXT: Invoice = { id: 'INV-1', amount: 1234.56, iban: 'BG80BNBG96611020345678' }

describe('encryptEnvelope / decryptEnvelope', () => {
  it('round-trips: ciphertext decrypts back to the original plaintext', async () => {
    const kek = await importKek(randomKekMaterial())
    const envelope = await encryptEnvelope({
      plaintext: PLAINTEXT, uuid: UUID, kek, kid: 'tenant-1/kek/2026-05-11',
    })
    expect(envelope.uuid).toBe(UUID)
    expect(envelope.alg).toBe('AES-GCM-256')
    expect(envelope.iv.length).toBeGreaterThan(0)
    expect(envelope.authTag.length).toBeGreaterThan(0)
    expect(envelope.kid).toBe('tenant-1/kek/2026-05-11')
    const plain = await decryptEnvelope({ envelope, kek })
    expect(plain).toEqual(PLAINTEXT)
  })

  it('produces different ciphertexts for two encryptions of the same plaintext (random IV)', async () => {
    const kek = await importKek(randomKekMaterial())
    const e1 = await encryptEnvelope({ plaintext: PLAINTEXT, uuid: UUID, kek, kid: 'k' })
    const e2 = await encryptEnvelope({ plaintext: PLAINTEXT, uuid: UUID, kek, kid: 'k' })
    expect(e1.iv).not.toBe(e2.iv)
    expect(e1.ciphertext).not.toBe(e2.ciphertext)
    expect(e1.authTag).not.toBe(e2.authTag)
    // Yet both decrypt to the same plaintext.
    expect(await decryptEnvelope({ envelope: e1, kek })).toEqual(PLAINTEXT)
    expect(await decryptEnvelope({ envelope: e2, kek })).toEqual(PLAINTEXT)
  })

  it('fails decryption when the ciphertext is tampered (AES-GCM authTag mismatch)', async () => {
    const kek = await importKek(randomKekMaterial())
    const envelope = await encryptEnvelope({ plaintext: PLAINTEXT, uuid: UUID, kek, kid: 'k' })
    const tampered = {
      ...envelope,
      // Flip first base64url char of ciphertext.
      ciphertext: envelope.ciphertext[0] === 'A'
        ? `B${envelope.ciphertext.slice(1)}`
        : `A${envelope.ciphertext.slice(1)}`,
    }
    await expect(decryptEnvelope({ envelope: tampered, kek })).rejects.toThrow(/authentication failed/)
  })

  it('fails decryption when the authTag is tampered', async () => {
    const kek = await importKek(randomKekMaterial())
    const envelope = await encryptEnvelope({ plaintext: PLAINTEXT, uuid: UUID, kek, kid: 'k' })
    const tampered = {
      ...envelope,
      authTag: envelope.authTag[0] === 'A'
        ? `B${envelope.authTag.slice(1)}`
        : `A${envelope.authTag.slice(1)}`,
    }
    await expect(decryptEnvelope({ envelope: tampered, kek })).rejects.toThrow(/authentication failed/)
  })

  it('fails decryption when the IV is replaced (DEK derives the same, but AEAD fails)', async () => {
    const kek = await importKek(randomKekMaterial())
    const envelope = await encryptEnvelope({ plaintext: PLAINTEXT, uuid: UUID, kek, kid: 'k' })
    const fakeIv = Buffer.from(globalThis.crypto.getRandomValues(new Uint8Array(12))).toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
    const tampered = { ...envelope, iv: fakeIv }
    await expect(decryptEnvelope({ envelope: tampered, kek })).rejects.toThrow(/authentication failed/)
  })

  it('a ciphertext encrypted under KEK-A does not decrypt under KEK-B', async () => {
    const kekA = await importKek(randomKekMaterial())
    const kekB = await importKek(randomKekMaterial())
    const envelope = await encryptEnvelope({ plaintext: PLAINTEXT, uuid: UUID, kek: kekA, kid: 'kA' })
    // The DEK derived from KEK-B is different → AEAD fails.
    await expect(decryptEnvelope({ envelope, kek: kekB })).rejects.toThrow(/authentication failed/)
  })
})
