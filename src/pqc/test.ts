import { describe, it, expect } from 'vitest'
import {
  kyber768GenerateKeyPair,
  kyber768Encapsulate,
  kyber768Decapsulate,
  sphincsGenerateKeyPair,
  sphincsSign,
  sphincsVerify,
  generateHybridKeyPair,
  hybridSign,
  hybridVerify,
} from './index'

describe('pqc', () => {
  it('Kyber-768 generates correct key sizes', () => {
    const { publicKey, secretKey } = kyber768GenerateKeyPair()
    expect(publicKey).toHaveLength(1184)
    expect(secretKey).toHaveLength(2400)
  })

  it('SPHINCS+ generates correct key sizes', () => {
    const { publicKey, secretKey } = sphincsGenerateKeyPair()
    expect(publicKey).toHaveLength(32)
    expect(secretKey).toHaveLength(64)
  })

  it('Kyber-768 encapsulation validates public key', () => {
    const badKey = Buffer.alloc(1000)
    expect(() => kyber768Encapsulate(badKey)).toThrow()
  })

  it('Kyber-768 encapsulation produces correct sizes', () => {
    const { publicKey } = kyber768GenerateKeyPair()
    const { sharedSecret, ciphertext } = kyber768Encapsulate(publicKey)
    expect(sharedSecret).toHaveLength(32)
    expect(ciphertext).toHaveLength(1088)
  })

  it('Kyber-768 decapsulation validates key and ciphertext sizes', () => {
    const badSecret = Buffer.alloc(1000)
    const badCiphertext = Buffer.alloc(500)
    expect(() => kyber768Decapsulate(badSecret, Buffer.alloc(1088))).toThrow()
    expect(() => kyber768Decapsulate(Buffer.alloc(2400), badCiphertext)).toThrow()
  })

  it('SPHINCS+ sign validates secret key length', () => {
    const badSecret = Buffer.alloc(32)
    const message = Buffer.from('test message')
    expect(() => sphincsSign(badSecret, message)).toThrow()
  })

  it('SPHINCS+ sign produces correct signature length', () => {
    const { secretKey } = sphincsGenerateKeyPair()
    const message = Buffer.from('test message')
    const signature = sphincsSign(secretKey, message)
    expect(signature).toHaveLength(7856)
  })

  it('SPHINCS+ verify works with valid inputs', () => {
    const { publicKey, secretKey } = sphincsGenerateKeyPair()
    const message = Buffer.from('test message')
    const signature = sphincsSign(secretKey, message)
    const isValid = sphincsVerify(publicKey, message, signature)
    expect(isValid).toBe(true)
  })

  it('Hybrid key pair generation', () => {
    const hybrid = generateHybridKeyPair()
    expect(hybrid.sphincsPublic).toHaveLength(32)
    expect(hybrid.sphincsSecret).toHaveLength(64)
    expect(hybrid.ecdsaPublic).toHaveLength(65)
    expect(hybrid.ecdsaSecret).toHaveLength(32)
  })

  it('Hybrid sign with both algorithms', () => {
    const hybrid = generateHybridKeyPair()
    const message = Buffer.from('test message')
    const sig = hybridSign(hybrid.sphincsSecret, hybrid.ecdsaSecret, message)
    expect(sig.sphincsSignature).toHaveLength(7856)
    expect(sig.ecdsaSignature).toHaveLength(64)
  })

  it('Hybrid verify requires both when specified', () => {
    const hybrid = generateHybridKeyPair()
    const message = Buffer.from('test message')
    const sig = hybridSign(hybrid.sphincsSecret, hybrid.ecdsaSecret, message)
    const valid = hybridVerify(
      hybrid.sphincsPublic,
      hybrid.ecdsaPublic,
      message,
      sig.sphincsSignature,
      sig.ecdsaSignature,
      true,
    )
    expect(valid).toBe(true)
  })

  it('Hybrid verify allows fallback when requireBoth=false', () => {
    const hybrid = generateHybridKeyPair()
    const message = Buffer.from('test message')
    const sig = hybridSign(hybrid.sphincsSecret, hybrid.ecdsaSecret, message)
    const valid = hybridVerify(
      hybrid.sphincsPublic,
      hybrid.ecdsaPublic,
      message,
      sig.sphincsSignature,
      sig.ecdsaSignature,
      false,
    )
    expect(valid).toBe(true)
  })
})
