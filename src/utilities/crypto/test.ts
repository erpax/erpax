import { createVerify, generateKeyPairSync, pbkdf2Sync } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { cross, formatUuid, hkdf, hmacSha256, isSealed, open, PBKDF2_ROUND_CAP, roundSalt, rsaSha256Sign, seal, sha256, sha256Hex, SIGNATURE, sign, signingKeys, stretch, uuidBytes, uuidV8, verify } from '@/utilities/crypto'

// Golden values computed by the implementations this module replaced (integrity/content nameUuid and
// nameDigest, uuid/matrix toUuid and merge, nist/sp/800/108 deriveSecretFrom), before they were routed
// here: a stored content uuid must not change by a single bit.
const NS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'

describe('crypto — one implementation per primitive, byte-identical to what it replaced', () => {
  it('derives the content uuids it derived before', () => {
    expect(cross(uuidBytes(NS), 'tenant:acme')).toBe('c381a429-2893-857d-b474-4a1a1d5f2b4b')
    expect(sha256Hex(uuidBytes(NS), 'invoice:42')).toBe('e2efe6c6ea9a9b38ca54249f7f07dea06d84980dbe3fda6f7fbd69a1336977ee')
    expect(cross(Buffer.from('hello', 'utf8'))).toBe('2cf24dba-5fb0-830e-a6e8-3b2ac5b9e29e')
    expect(cross(uuidBytes(NS), uuidBytes('00000000-0000-8000-8000-000000000000'))).toBe('c70a7ed3-a137-8706-8871-cfe8e811bc09')
  })

  it('derives the internal secrets it derived before', () => {
    expect(hmacSha256('master-secret', 'erpax:derived:v1:preview').toString('hex')).toBe('ce0be4002be664d733481e6a030f596a9db48fc71eecc180a97b382ca312d86b')
  })

  it('hashes parts as their concatenation, and stamps v8 and variant 10', () => {
    expect(sha256('ab', 'c').equals(sha256('abc'))).toBe(true)
    const u = uuidV8(sha256('x'))
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(formatUuid(uuidBytes(u))).toBe(u)
  })
})

describe('crypto — stretch: PBKDF2 past the Workers cap, in capped rounds', () => {
  const salt = 'ab'.repeat(32)

  it('is one plain PBKDF2 call at or below the cap', async () => {
    const key = await stretch({ iterations: 1000, keyLength: 32, password: 'pw', salt })
    expect(key.equals(pbkdf2Sync('pw', salt, 1000, 32, 'sha256'))).toBe(true)
  })

  it('above the cap, chains rounds of at most the cap, each salted by the uuid cross of salt and round', async () => {
    // a small count shows the construction: 2.5 rounds' worth, rounds of the cap or less
    const iterations = PBKDF2_ROUND_CAP * 2 + 7
    const r0 = pbkdf2Sync('pw', roundSalt(salt, 0), PBKDF2_ROUND_CAP, 32, 'sha256')
    const r1 = pbkdf2Sync(r0, roundSalt(salt, 1), PBKDF2_ROUND_CAP, 32, 'sha256')
    const r2 = pbkdf2Sync(r1, roundSalt(salt, 2), 7, 32, 'sha256')
    expect((await stretch({ iterations, keyLength: 32, password: 'pw', salt })).equals(r2)).toBe(true)
    expect(roundSalt(salt, 1)).toBe(cross(`${salt}:1`))
  })

  it('keeps the per-user salt in every round: another salt, another key', async () => {
    const a = await stretch({ iterations: PBKDF2_ROUND_CAP + 1, keyLength: 32, password: 'pw', salt })
    const b = await stretch({ iterations: PBKDF2_ROUND_CAP + 1, keyLength: 32, password: 'pw', salt: 'cd'.repeat(32) })
    expect(a.equals(b)).toBe(false)
  })
})

describe('crypto — key derivation, sealing and signatures', () => {
  it('derives HKDF-SHA256 as RFC 5869 test case 1 says', () => {
    const okm = hkdf({
      key: Buffer.from('0b'.repeat(22), 'hex'),
      salt: Buffer.from('000102030405060708090a0b0c', 'hex'),
      info: Buffer.from('f0f1f2f3f4f5f6f7f8f9', 'hex'),
      length: 42,
    })
    expect(okm.toString('hex')).toBe('3cb25f25faacd57a90434f64d0362f2a2d2d0a90cf1a5a4c5db02d56ecc4c5bf34007208d5b887185865')
  })

  it('seals with AES-256-GCM under a 32-byte key, bound to its additional data', () => {
    const key = hkdf({ key: 'k', salt: 's', info: 'test' })
    const token = seal(key, 'a value', 'field')
    expect(isSealed(token)).toBe(true)
    expect(open(key, token, 'field').toString()).toBe('a value')
    expect(seal(key, 'a value', 'field')).not.toBe(token)
    expect(() => open(key, token, 'another field')).toThrow()
    expect(() => open(hkdf({ key: 'other', salt: 's', info: 'test' }), token, 'field')).toThrow()
    expect(() => seal(Buffer.alloc(16), 'x')).toThrow(/32 bytes/)
    expect(() => open(key, 'not a token')).toThrow()
  })

  it('signs with ML-DSA, the set Cost.lean decides, and verifies under the matching key only', async () => {
    const lean = readFileSync(join(import.meta.dirname, '..', 'verify', 'lean', 'Cost.lean'), 'utf8')
    expect(lean).toContain('theorem the_signature_is_ml_dsa_44 : cheapest (collision 256) mlDsa = 44')
    expect(SIGNATURE).toBe('ML-DSA-44')
    const mine = await signingKeys()
    const theirs = await signingKeys()
    const signature = await sign(mine.privateKey, 'part one', ' part two')
    expect(await verify(mine.publicKey, signature, 'part one part two')).toBe(true)
    expect(await verify(theirs.publicKey, signature, 'part one part two')).toBe(false)
    expect(await verify(mine.publicKey, signature, 'part one, altered')).toBe(false)
    expect(await verify(mine.publicKey, Buffer.from('short'), 'part one part two')).toBe(false)
  })

  it('signs RSA-SHA256 for a PKI that requires it, verifiable by any standard verifier', () => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048, privateKeyEncoding: { type: 'pkcs8', format: 'pem' }, publicKeyEncoding: { type: 'spki', format: 'pem' } })
    const signature = rsaSha256Sign(privateKey, 'pdf bytes')
    expect(createVerify('RSA-SHA256').update('pdf bytes').verify(publicKey, signature)).toBe(true)
  })
})
