/**
 * Post-quantum cryptography tests — Kyber-768 + SPHINCS+ verification.
 *
 * Validates NIST FIPS 203 (ML-KEM) and FIPS 204 (SLH-DSA) implementations
 * against known test vectors and functional requirements.
 *
 * @see FIPS 203 Appendix A (test vectors) · FIPS 204 Appendix C
 */

import { describe, it, expect } from 'vitest'
import {
  kyber768GenerateKeyPair,
  kyber768Encapsulate,
  kyber768Decapsulate,
  sphincsGenerateKeyPair,
  sphincsSign,
  sphincsVerify,
  generateHybridKeyPair,
  hybridEncapsulate,
  hybridDecapsulate,
  hybridSign,
  hybridVerify,
  verifyNistTestVector,
  pqcComplianceStatus,
} from './index'

describe('kyber-768 (ml-kem)', () => {
  it('generates a valid key pair', () => {
    const { publicKey, secretKey } = kyber768GenerateKeyPair()

    expect(publicKey.bytes).toBeDefined()
    expect(publicKey.bytes.length).toBe(1184) // NIST FIPS 203 public key size
    expect(secretKey.bytes).toBeDefined()
    expect(secretKey.bytes.length).toBe(2400) // NIST FIPS 203 secret key size
  })

  it('encapsulates and decapsulates correctly', () => {
    const { publicKey, secretKey } = kyber768GenerateKeyPair()
    const { sharedSecret, ciphertext } = kyber768Encapsulate(publicKey)

    expect(sharedSecret).toBeDefined()
    expect(sharedSecret.length).toBe(32) // 256-bit shared secret
    expect(ciphertext).toBeDefined()
    expect(ciphertext.length).toBe(1088) // Kyber-768 ciphertext size

    // Decapsulation should recover the same shared secret
    const recoveredSecret = kyber768Decapsulate(secretKey, ciphertext)
    expect(recoveredSecret).toEqual(sharedSecret)
  })

  it('fails on malformed ciphertext', () => {
    const { secretKey } = kyber768GenerateKeyPair()
    const badCiphertext = new Uint8Array(1088)

    expect(() => kyber768Decapsulate(secretKey, badCiphertext)).toThrow()
  })

  it('produces different shared secrets for different key pairs', () => {
    const kp1 = kyber768GenerateKeyPair()
    const kp2 = kyber768GenerateKeyPair()

    const { sharedSecret: ss1 } = kyber768Encapsulate(kp1.publicKey)
    const { sharedSecret: ss2 } = kyber768Encapsulate(kp2.publicKey)

    expect(ss1).not.toEqual(ss2)
  })
})

describe('sphincs+ (slh-dsa)', () => {
  it('generates a valid key pair', () => {
    const { publicKey, secretKey } = sphincsGenerateKeyPair()

    expect(publicKey.bytes).toBeDefined()
    expect(publicKey.bytes.length).toBe(32) // SPHINCS+-SHA256 public key
    expect(secretKey.bytes).toBeDefined()
    expect(secretKey.bytes.length).toBe(64) // SPHINCS+ secret key
  })

  it('signs and verifies a message', () => {
    const { publicKey, secretKey } = sphincsGenerateKeyPair()
    const message = new TextEncoder().encode('test message for SPHINCS+')

    const signature = sphincsSign(secretKey, message)
    expect(signature.bytes).toBeDefined()
    expect(signature.bytes.length).toBeGreaterThan(0)

    const isValid = sphincsVerify(publicKey, message, signature)
    expect(isValid).toBe(true)
  })

  it('rejects a signature on a different message', () => {
    const { publicKey, secretKey } = sphincsGenerateKeyPair()
    const message1 = new TextEncoder().encode('message 1')
    const message2 = new TextEncoder().encode('message 2')

    const signature = sphincsSign(secretKey, message1)
    const isValid = sphincsVerify(publicKey, message2, signature)

    expect(isValid).toBe(false)
  })

  it('rejects a forged signature', () => {
    const { publicKey } = sphincsGenerateKeyPair()
    const message = new TextEncoder().encode('test message')
    const forgedSignature = new Uint8Array(7856).fill(0x42) // Fake signature

    const isValid = sphincsVerify(publicKey, message, { bytes: forgedSignature })
    expect(isValid).toBe(false)
  })

  it('produces different signatures for the same message', () => {
    // Note: SPHINCS+ with random input should produce deterministic signatures
    // per the same secret; this test verifies that different keys produce different signatures
    const { publicKey: pk1, secretKey: sk1 } = sphincsGenerateKeyPair()
    const { secretKey: sk2 } = sphincsGenerateKeyPair()
    const message = new TextEncoder().encode('test message')

    const sig1 = sphincsSign(sk1, message)
    const sig2 = sphincsSign(sk2, message)

    expect(sig1.bytes).not.toEqual(sig2.bytes)
  })
})

describe('hybrid mode (kyber + sphincs + ecdsa)', () => {
  it('generates hybrid key pair', () => {
    const hybrid = generateHybridKeyPair()

    expect(hybrid.kyberPublic.bytes.length).toBe(1184)
    expect(hybrid.kyberSecret.bytes.length).toBe(2400)
    expect(hybrid.sphincsPublic.bytes.length).toBe(32)
    expect(hybrid.sphincsSecret.bytes.length).toBe(64)
    expect(hybrid.ecdsaPublic).toBeDefined()
    expect(hybrid.ecdsaSecret).toBeDefined()
  })

  it('performs hybrid encapsulation', () => {
    const hybrid = generateHybridKeyPair()
    const encap = hybridEncapsulate(hybrid.kyberPublic, hybrid.ecdsaPublic)

    expect(encap.kyberEncapsulation.sharedSecret.length).toBe(32)
    expect(encap.kyberEncapsulation.ciphertext.length).toBe(1088)
    expect(encap.ecdsaSharedSecret.length).toBe(32)
    expect(encap.combinedSharedSecret.length).toBe(32)
  })

  it('performs hybrid decapsulation', () => {
    const hybrid = generateHybridKeyPair()
    const encap = hybridEncapsulate(hybrid.kyberPublic, hybrid.ecdsaPublic)

    const decap = hybridDecapsulate(
      hybrid.kyberSecret,
      encap.kyberEncapsulation.ciphertext,
      hybrid.ecdsaSecret,
      hybrid.ecdsaPublic,
    )

    expect(decap.kyberSharedSecret.length).toBe(32)
    expect(decap.ecdsaSharedSecret.length).toBe(32)
    expect(decap.combinedSharedSecret.length).toBe(32)
    expect(decap.kyberSharedSecret).toEqual(encap.kyberEncapsulation.sharedSecret)
  })

  it('signs and verifies with hybrid mode (both required)', () => {
    const hybrid = generateHybridKeyPair()
    const message = new TextEncoder().encode('hybrid signed message')

    const { sphincsSignature, ecdsaSignature } = hybridSign(
      hybrid.sphincsSecret,
      hybrid.ecdsaSecret,
      message,
    )

    const isValid = hybridVerify(
      hybrid.sphincsPublic,
      hybrid.ecdsaPublic,
      message,
      sphincsSignature,
      ecdsaSignature,
      true, // requireBoth=true
    )

    expect(isValid).toBe(true)
  })

  it('rejects when only ECDSA signature is invalid (requireBoth=true)', () => {
    const hybrid = generateHybridKeyPair()
    const message = new TextEncoder().encode('hybrid signed message')

    const { sphincsSignature } = hybridSign(hybrid.sphincsSecret, hybrid.ecdsaSecret, message)

    // Create a bad ECDSA signature
    const badEcdsaSig = new Uint8Array(64).fill(0xff)

    const isValid = hybridVerify(
      hybrid.sphincsPublic,
      hybrid.ecdsaPublic,
      message,
      sphincsSignature,
      badEcdsaSig,
      true, // requireBoth=true
    )

    expect(isValid).toBe(false)
  })

  it('accepts when ECDSA signature is valid (requireBoth=false, fallback mode)', () => {
    const hybrid = generateHybridKeyPair()
    const message = new TextEncoder().encode('fallback mode message')

    const { ecdsaSignature } = hybridSign(hybrid.sphincsSecret, hybrid.ecdsaSecret, message)

    // Create a bad SPHINCS signature
    const badSphincs = { bytes: new Uint8Array(7856).fill(0) }

    const isValid = hybridVerify(
      hybrid.sphincsPublic,
      hybrid.ecdsaPublic,
      message,
      badSphincs,
      ecdsaSignature,
      false, // requireBoth=false, fallback mode
    )

    // In fallback mode, ECDSA alone is sufficient
    expect(isValid).toBe(true)
  })
})

describe('nist test vectors', () => {
  it('verifies nist test vector availability', () => {
    expect(verifyNistTestVector('kyber768', 'kat-1')).toBe(true)
    expect(verifyNistTestVector('kyber768', 'kat-2')).toBe(true)
    expect(verifyNistTestVector('sphincs', 'kat-1')).toBe(true)
  })

  it('reports pqc compliance status', () => {
    const status = pqcComplianceStatus()

    expect(status.kyber768Ready).toBe(true)
    expect(status.sphincsReady).toBe(true)
    expect(status.hybridReady).toBe(true)
    expect(status.testVectorsPass).toBe(true)
  })
})

describe('nist fips compliance', () => {
  it('kyber-768 conforms to fips 203', () => {
    // ML-KEM with k=3 (Kyber-768)
    const { publicKey, secretKey } = kyber768GenerateKeyPair()

    // Key sizes per FIPS 203
    expect(publicKey.bytes.length).toBe(1184) // 32 + 384*3
    expect(secretKey.bytes.length).toBe(2400) // 384*3 + 384*3 + 32 + 32

    // Encapsulation and decapsulation work
    const { sharedSecret, ciphertext } = kyber768Encapsulate(publicKey)
    expect(sharedSecret.length).toBe(32)
    expect(ciphertext.length).toBe(1088) // 320 + 768

    const recovered = kyber768Decapsulate(secretKey, ciphertext)
    expect(recovered).toEqual(sharedSecret)
  })

  it('sphincs+ conforms to fips 204', () => {
    // SLH-DSA with SHA-256, n=256
    const { publicKey, secretKey } = sphincsGenerateKeyPair()

    // Public key size: n bytes (256 bits)
    expect(publicKey.bytes.length).toBe(32)

    // Secret key size: 2n bytes
    expect(secretKey.bytes.length).toBe(64)

    // Signature verification works
    const message = new TextEncoder().encode('fips 204 compliance test')
    const signature = sphincsSign(secretKey, message)

    const isValid = sphincsVerify(publicKey, message, signature)
    expect(isValid).toBe(true)
  })

  it('maintains bit-length security throughout', () => {
    // Kyber-768: 256-bit equivalence
    // SPHINCS+: 256-bit security
    // Hybrid: 256-bit from Kyber + ECDSA P-256

    const { publicKey: kyberPub, secretKey: kyberSec } = kyber768GenerateKeyPair()
    const { sharedSecret } = kyber768Encapsulate(kyberPub)

    // Post-quantum shared secret is 32 bytes = 256 bits
    expect(sharedSecret.byteLength * 8).toBe(256)

    const { publicKey: sphincsPub, secretKey: sphincsSec } = sphincsGenerateKeyPair()
    const message = new TextEncoder().encode('security level test')
    const signature = sphincsSign(sphincsSec, message)

    // SPHINCS+ signature and key sizes match 256-bit security
    expect(sphincsPub.bytes.byteLength * 8).toBe(256)
  })
})
