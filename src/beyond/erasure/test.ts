import { describe, it, expect } from 'vitest'
import { seal, open, shred } from '@/beyond/erasure'
import type { Cipher, KeyVault } from '@/beyond/erasure'

/**
 * Reference cipher for PROTOCOL testing only — a key-dependent reversible
 * transform (NOT cryptographically strong; production injects AES-256-GCM).
 * It is key-dependent so that identical plaintext under different keys yields
 * different ciphertext — the property that closes the dedup-oracle leak.
 */
const xorCipher: Cipher = {
  encrypt: (plaintext, key) =>
    [...plaintext].map((ch, i) => String.fromCharCode(ch.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join(''),
  decrypt: (ciphertext, key) =>
    [...ciphertext].map((ch, i) => String.fromCharCode(ch.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join(''),
}

/** A deterministic content-uuid over the CIPHERTEXT (a tiny FNV-1a hash, hex). */
const uuidOf = (s: string): string => {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}

describe('erasure — crypto-shred: forgetting and confidentiality by key-death', () => {
  it('round-trips: a sealed record opens to its plaintext while the key lives', () => {
    const vault: KeyVault = new Map([['k1', 'secret-key']])
    const rec = seal('налог: 1240 BGN', 'k1', 'secret-key', xorCipher, uuidOf)
    expect(open(rec, vault, xorCipher)).toEqual({ recovered: true, plaintext: 'налог: 1240 BGN' })
  })

  it('TRUE erasure: after the key is shredded the content is irrecoverable', () => {
    const vault: KeyVault = new Map([['k1', 'secret-key']])
    const rec = seal('ЕГН 7501020018', 'k1', 'secret-key', xorCipher, uuidOf)
    expect(shred('k1', vault)).toEqual({ erased: true })
    expect(open(rec, vault, xorCipher)).toEqual({ recovered: false }) // gone everywhere at once
  })

  it('integrity survives erasure: the ciphertext-uuid is unchanged by shredding', () => {
    const vault: KeyVault = new Map([['k1', 'secret-key']])
    const rec = seal('audit-line', 'k1', 'secret-key', xorCipher, uuidOf)
    const uuidBefore = rec.contentUuid
    shred('k1', vault)
    // the record (ciphertext + its uuid) still exists for the audit chain; only the door is gone
    expect(rec.contentUuid).toBe(uuidBefore)
    expect(uuidOf(rec.ciphertext)).toBe(uuidBefore)
  })

  it('confidentiality: identical plaintext under different keys does NOT collide (no dedup-oracle leak)', () => {
    const a = seal('YES', 'ka', 'alpha', xorCipher, uuidOf)
    const b = seal('YES', 'kb', 'bravo', xorCipher, uuidOf)
    expect(a.ciphertext).not.toBe(b.ciphertext)
    expect(a.contentUuid).not.toBe(b.contentUuid) // the hash reveals nothing about the plaintext
  })

  it('shred is idempotent: the first shred erases, a second is a no-op, the data stays gone', () => {
    const vault: KeyVault = new Map([['k1', 'secret-key']])
    const rec = seal('one-time', 'k1', 'secret-key', xorCipher, uuidOf)
    expect(shred('k1', vault)).toEqual({ erased: true })
    expect(open(rec, vault, xorCipher)).toEqual({ recovered: false }) // gone after the first shred
    expect(shred('k1', vault)).toEqual({ erased: false }) // already gone — idempotent, no error
    expect(open(rec, vault, xorCipher)).toEqual({ recovered: false }) // still gone
  })
})
