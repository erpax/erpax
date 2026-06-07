import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  decryptField,
  decryptFields,
  encryptField,
  encryptFields,
  generateEncryptionKey,
  isEncrypted,
} from '@/nist/sp/800/38'

// NIST SP 800-38D — AES-256-GCM authenticated encryption (field-level).
// Wire format: <iv-hex>:<auth-tag-hex>:<ciphertext-hex>. The KEK is derived
// from PAYLOAD_SECRET via the SP 800-108 KDF, so a master secret is required.
describe('nist/sp/800/38 — AES-256-GCM authenticated field encryption', () => {
  const prior = process.env.PAYLOAD_SECRET

  beforeAll(() => {
    process.env.PAYLOAD_SECRET = 'unit-test-master-secret'
  })
  afterAll(() => {
    if (prior === undefined) delete process.env.PAYLOAD_SECRET
    else process.env.PAYLOAD_SECRET = prior
  })

  it('round-trips plaintext through encrypt/decrypt', () => {
    const plaintext = 'BG1234567890 sensitive VAT id'
    const ct = encryptField(plaintext)
    expect(ct).not.toBeNull()
    expect(ct).not.toBe(plaintext)
    expect(decryptField(ct)).toBe(plaintext)
  })

  it('round-trips the empty string (only null/undefined short-circuit)', () => {
    const ct = encryptField('')
    expect(ct).not.toBeNull()
    expect(decryptField(ct)).toBe('')
  })

  it('is non-deterministic — a fresh random IV per call (semantic security)', () => {
    const a = encryptField('same plaintext')
    const b = encryptField('same plaintext')
    expect(a).not.toBe(b)
    expect(decryptField(a)).toBe(decryptField(b))
  })

  it('null / undefined map to null on both directions', () => {
    expect(encryptField(null)).toBeNull()
    expect(encryptField(undefined)).toBeNull()
    expect(decryptField(null)).toBeNull()
    expect(decryptField(undefined)).toBeNull()
    expect(decryptField('')).toBeNull()
  })

  it('produces the three-segment iv:tag:ciphertext wire format', () => {
    const ct = encryptField('hello')
    expect(ct).not.toBeNull()
    const parts = (ct as string).split(':')
    expect(parts).toHaveLength(3)
    expect(parts[0]).toMatch(/^[0-9a-f]{32}$/) // 16-byte IV
    expect(parts[1]).toMatch(/^[0-9a-f]{32}$/) // 16-byte auth tag
    expect(parts[2]).toMatch(/^[0-9a-f]+$/)
    expect(isEncrypted(ct)).toBe(true)
  })

  it('isEncrypted strictly validates the format', () => {
    expect(isEncrypted(encryptField('x'))).toBe(true)
    expect(isEncrypted('plain text')).toBe(false)
    expect(isEncrypted('a:b:c')).toBe(false) // not hex / wrong lengths
    expect(isEncrypted('aa:bb')).toBe(false) // only two segments
    expect(isEncrypted(42)).toBe(false)
    expect(isEncrypted(null)).toBe(false)
    expect(isEncrypted(undefined)).toBe(false)
  })

  it('authenticated: a tampered auth tag fails decryption (GCM integrity)', () => {
    const ct = encryptField('integrity-protected') as string
    const [iv, tag, data] = ct.split(':')
    // Flip one hex nibble of the auth tag.
    const flipped = (tag[0] === '0' ? '1' : '0') + tag.slice(1)
    expect(() => decryptField(`${iv}:${flipped}:${data}`)).toThrow(/Decryption failed/)
  })

  it('authenticated: tampered ciphertext fails decryption', () => {
    const ct = encryptField('integrity-protected') as string
    const [iv, tag, data] = ct.split(':')
    const flipped = (data[0] === '0' ? '1' : '0') + data.slice(1)
    expect(() => decryptField(`${iv}:${tag}:${flipped}`)).toThrow(/Decryption failed/)
  })

  it('rejects malformed wire format (wrong segment count)', () => {
    expect(() => decryptField('only-one-segment')).toThrow(/Decryption failed/)
  })

  it('encryptFields encrypts only listed string fields, leaving others intact', () => {
    const row = { secret: 'top', keep: 'plain', count: 7 }
    const enc = encryptFields(row, ['secret'])
    expect(isEncrypted(enc.secret)).toBe(true)
    expect(enc.keep).toBe('plain')
    expect(enc.count).toBe(7)
  })

  it('encryptFields / decryptFields round-trip selected fields', () => {
    const row = { a: 'one', b: 'two', c: 'three' }
    const enc = encryptFields(row, ['a', 'c'])
    const dec = decryptFields(enc, ['a', 'c'])
    expect(dec.a).toBe('one')
    expect(dec.b).toBe('two')
    expect(dec.c).toBe('three')
  })

  it('generateEncryptionKey yields a 32-byte (256-bit) base64 key', () => {
    const key = generateEncryptionKey()
    const bytes = Buffer.from(key, 'base64')
    expect(bytes.length).toBe(32)
  })

  it('decryptField throws when no master secret is available', () => {
    const saved = process.env.PAYLOAD_SECRET
    const ct = encryptField('needs-key') as string
    delete process.env.PAYLOAD_SECRET
    try {
      expect(() => decryptField(ct)).toThrow(/PAYLOAD_SECRET/)
    } finally {
      process.env.PAYLOAD_SECRET = saved
    }
  })
})
