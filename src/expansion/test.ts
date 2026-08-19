import { describe, it, expect } from 'vitest'
import { expandKeySync, expandKey, deriveQuantumFoldCipherKey, keysEqual } from './index'

describe('expansion', () => {
  it('HKDF produces deterministic output', () => {
    const ikm = Buffer.from('test-ikm')
    const salt = Buffer.from('test-salt')
    const info = Buffer.from('test-info')
    const key1 = expandKeySync(ikm, salt, info, 32)
    const key2 = expandKeySync(ikm, salt, info, 32)
    expect(key1).toEqual(key2)
  })

  it('Different inputs produce different keys', () => {
    const key1 = expandKeySync(Buffer.from('ikm1'))
    const key2 = expandKeySync(Buffer.from('ikm2'))
    expect(key1).not.toEqual(key2)
  })

  it('Output length is respected', () => {
    const ikm = Buffer.from('test')
    expect(expandKeySync(ikm, undefined, undefined, 16)).toHaveLength(16)
    expect(expandKeySync(ikm, undefined, undefined, 64)).toHaveLength(64)
  })

  it('Async expand key works', async () => {
    const ikm = Buffer.from('test')
    const key = await expandKey(ikm)
    expect(key).toHaveLength(32)
  })

  it('Derived quantum-fold key has correct structure', () => {
    const cipherKey = deriveQuantumFoldCipherKey('test-uuid')
    expect(cipherKey.salt).toHaveLength(32)
    expect(cipherKey.derivedKey).toHaveLength(32)
    expect(cipherKey.info.toString('utf8')).toBe('test-uuid')
  })

  it('keysEqual detects identical keys', () => {
    const key = Buffer.from('test-key-32-bytes-12345678901')
    expect(keysEqual(key, key)).toBe(true)
  })

  it('keysEqual detects different keys', () => {
    const key1 = Buffer.from('key1-test-32-bytes-1234567890')
    const key2 = Buffer.from('key2-test-32-bytes-1234567890')
    expect(keysEqual(key1, key2)).toBe(false)
  })
})
