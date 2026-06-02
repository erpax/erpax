/**
 * AES-256-GCM authenticated-encryption tests — round-trip + format validation.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard NIST SP-800-38D aes-gcm authenticated-encryption
 * @standard NIST FIPS-197 aes-256
 * @rfc 5116 authenticated-encryption-with-associated-data
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @security ISO-27002 §8.24 use-of-cryptography
 * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 * @see src/standards/nist-sp-800-38/aes-gcm.ts
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  encryptField,
  decryptField,
  encryptFields,
  decryptFields,
  isEncrypted,
  generateEncryptionKey,
} from '@/standards/nist-sp-800-38'

describe('encryption', () => {
  // Per the standards system (`src/standards/nist-sp-800-108/kdf.ts`), the
  // project enforces single-secret custodianship via `PAYLOAD_SECRET`. Field
  // encryption keys are derived per-purpose from it. Tests therefore manage
  // `PAYLOAD_SECRET`, not a separate `ENCRYPTION_KEY` env var.
  const testSecret = 'vitest-aes-gcm-secret-not-for-production-use-32b+'
  const originalSecret = process.env.PAYLOAD_SECRET

  beforeEach(() => {
    process.env.PAYLOAD_SECRET = testSecret
  })

  afterEach(() => {
    if (originalSecret) {
      process.env.PAYLOAD_SECRET = originalSecret
    } else {
      Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    }
  })

  describe('encryptField & decryptField', () => {
    it('should encrypt and decrypt a string', () => {
      const plaintext = 'sensitive-stripe-id-12345'

      const encrypted = encryptField(plaintext)
      expect(encrypted).toBeTruthy()
      expect(encrypted).not.toEqual(plaintext)

      const decrypted = decryptField(encrypted)
      expect(decrypted).toEqual(plaintext)
    })

    it('should produce different ciphertext for same plaintext (random IV)', () => {
      const plaintext = 'same-data'

      const encrypted1 = encryptField(plaintext)
      const encrypted2 = encryptField(plaintext)

      expect(encrypted1).not.toEqual(encrypted2)

      // But both decrypt to same plaintext
      expect(decryptField(encrypted1)).toEqual(plaintext)
      expect(decryptField(encrypted2)).toEqual(plaintext)
    })

    it('should handle null/undefined', () => {
      expect(encryptField(null)).toBeNull()
      expect(encryptField(undefined)).toBeNull()
      expect(decryptField(null)).toBeNull()
      expect(decryptField(undefined)).toBeNull()
    })

    it('should encrypt empty string', () => {
      const encrypted = encryptField('')
      expect(encrypted).toBeTruthy()

      const decrypted = decryptField(encrypted)
      expect(decrypted).toEqual('')
    })

    it('should throw on invalid encrypted data', () => {
      expect(() => decryptField('invalid:data:format')).toThrow()
      expect(() => decryptField('notencrypted')).toThrow()
    })

    it('should throw when PAYLOAD_SECRET not set', () => {
      Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')

      expect(() => encryptField('test')).toThrow('PAYLOAD_SECRET')
      expect(() => decryptField('test:data:here')).toThrow('PAYLOAD_SECRET')
    })

    it('should handle long strings', () => {
      const longString = 'x'.repeat(10000)

      const encrypted = encryptField(longString)
      const decrypted = decryptField(encrypted)

      expect(decrypted).toEqual(longString)
    })

    it('should handle special characters', () => {
      const specialString = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

      const encrypted = encryptField(specialString)
      const decrypted = decryptField(encrypted)

      expect(decrypted).toEqual(specialString)
    })

    it('should handle unicode characters', () => {
      const unicodeString = '你好世界 🚀 мир'

      const encrypted = encryptField(unicodeString)
      const decrypted = decryptField(encrypted)

      expect(decrypted).toEqual(unicodeString)
    })
  })

  describe('isEncrypted', () => {
    it('should detect encrypted data', () => {
      const plaintext = 'test-data'
      const encrypted = encryptField(plaintext)

      expect(isEncrypted(encrypted)).toBe(true)
    })

    it('should reject plaintext', () => {
      expect(isEncrypted('plaintext')).toBe(false)
      expect(isEncrypted('not-encrypted')).toBe(false)
    })

    it('should reject non-string values', () => {
      expect(isEncrypted(null)).toBe(false)
      expect(isEncrypted(undefined)).toBe(false)
      expect(isEncrypted(123)).toBe(false)
      expect(isEncrypted({})).toBe(false)
      expect(isEncrypted([])).toBe(false)
    })

    it('should reject invalid format', () => {
      expect(isEncrypted('a:b')).toBe(false)
      expect(isEncrypted('a:b:c:d')).toBe(false)
      expect(isEncrypted('invalid:invalid:invalid')).toBe(false)
    })
  })

  describe('encryptFields & decryptFields', () => {
    it('should encrypt multiple fields', () => {
      const obj = {
        id: 'payment-123',
        cardLast4: '4242',
        email: 'user@example.com',
      }

      const encrypted = encryptFields(obj, ['cardLast4'])

      expect(encrypted.id).toEqual(obj.id) // unchanged
      expect(encrypted.email).toEqual(obj.email) // unchanged
      expect(encrypted.cardLast4).not.toEqual(obj.cardLast4) // encrypted
      expect(isEncrypted(encrypted.cardLast4)).toBe(true)
    })

    it('should decrypt multiple fields', () => {
      const original = {
        id: 'payment-123',
        cardLast4: '4242',
        bankLast4: '6789',
      }

      const encrypted = encryptFields(original, ['cardLast4', 'bankLast4'])
      const decrypted = decryptFields(encrypted, ['cardLast4', 'bankLast4'])

      expect(decrypted).toEqual(original)
    })

    it('should skip missing fields', () => {
      const obj = { id: 'test' }

      const encrypted = encryptFields(obj, ['nonexistent', 'alsoMissing'])

      expect(encrypted).toEqual(obj)
    })

    it('should skip null/undefined values', () => {
      const obj = {
        id: 'test',
        cardLast4: null as string | null,
        bankLast4: undefined as string | undefined,
      }

      const encrypted = encryptFields(obj, ['cardLast4', 'bankLast4'])

      expect(encrypted.cardLast4).toBeNull()
      expect(encrypted.bankLast4).toBeUndefined()
    })

    it('should handle selective decryption', () => {
      const obj = {
        stripeId: 'sub_123',
        customerId: 'cus_456',
      }

      const encrypted = encryptFields(obj, ['stripeId', 'customerId'])
      // Only decrypt stripeId
      const partialDecrypted = decryptFields(encrypted, ['stripeId'])

      expect(partialDecrypted.stripeId).toEqual(obj.stripeId)
      expect(isEncrypted(partialDecrypted.customerId)).toBe(true)
    })
  })

  describe('encryption key generation', () => {
    it('should generate valid encryption key', () => {
      const key = generateEncryptionKey()

      expect(key).toBeTruthy()
      expect(typeof key).toBe('string')

      // Should be base64 encoded 32 bytes
      const buffer = Buffer.from(key, 'base64')
      expect(buffer.length).toBe(32)
    })

    it('should generate different keys', () => {
      const key1 = generateEncryptionKey()
      const key2 = generateEncryptionKey()

      expect(key1).not.toEqual(key2)
    })
  })

  describe('encryption in production scenarios', () => {
    it('should handle Stripe subscription ID encryption', () => {
      const stripeSubId = 'sub_1234567890abcdefghijklmn'

      const encrypted = encryptField(stripeSubId)
      expect(isEncrypted(encrypted)).toBe(true)

      const decrypted = decryptField(encrypted)
      expect(decrypted).toEqual(stripeSubId)
    })

    it('should handle payment method encryption', () => {
      const paymentData = {
        stripePaymentMethodId: 'pm_1234567890abcdefghijklmn',
        cardLast4: '4242',
        cardExpMonth: 12,
        cardExpYear: 2025,
      }

      const encrypted = encryptFields(paymentData, [
        'stripePaymentMethodId',
        'cardLast4',
      ])

      expect(isEncrypted(encrypted.stripePaymentMethodId)).toBe(true)
      expect(isEncrypted(encrypted.cardLast4)).toBe(true)
      expect(encrypted.cardExpMonth).toEqual(12) // not encrypted

      const decrypted = decryptFields(encrypted, [
        'stripePaymentMethodId',
        'cardLast4',
      ])

      expect(decrypted).toEqual(paymentData)
    })

    it('should handle invoice encryption', () => {
      const invoiceData = {
        stripeInvoiceId: 'in_1234567890abcdefghijklmn',
        stripePaymentIntentId: 'pi_1234567890abcdefghijklmn',
        amountDue: 2900,
        status: 'open',
      }

      const encrypted = encryptFields(invoiceData, [
        'stripeInvoiceId',
        'stripePaymentIntentId',
      ])

      expect(isEncrypted(encrypted.stripeInvoiceId)).toBe(true)
      expect(isEncrypted(encrypted.stripePaymentIntentId)).toBe(true)
      expect(encrypted.amountDue).toEqual(2900) // not encrypted

      const decrypted = decryptFields(encrypted, [
        'stripeInvoiceId',
        'stripePaymentIntentId',
      ])

      expect(decrypted).toEqual(invoiceData)
    })
  })
})
