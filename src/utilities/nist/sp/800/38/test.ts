/**
 * Field encryption: AES-256-GCM through the crypto door, bound to the field's name.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard NIST SP-800-38D aes-gcm authenticated-encryption
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { decryptField, decryptFields, encryptField, encryptFields, isEncrypted } from '@/utilities/nist/sp/800/38'

describe('nist/sp/800/38 — field encryption at rest', () => {
  const prior = process.env.PAYLOAD_SECRET
  beforeAll(() => {
    process.env.PAYLOAD_SECRET = 'unit-test-master-secret'
  })
  afterAll(() => {
    if (prior === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    else process.env.PAYLOAD_SECRET = prior
  })

  it('round-trips a value, the empty string included, and leaves null and undefined alone', () => {
    expect(decryptField(encryptField('BG1234567890', 'vat'), 'vat')).toBe('BG1234567890')
    expect(decryptField(encryptField('', 'vat'), 'vat')).toBe('')
    expect(encryptField(null)).toBeNull()
    expect(encryptField(undefined)).toBeNull()
    expect(decryptField(null)).toBeNull()
  })

  it('draws a fresh IV for every value', () => {
    expect(encryptField('same', 'f')).not.toBe(encryptField('same', 'f'))
  })

  it('refuses a value moved to another field, or altered by one character', () => {
    const token = encryptField('cus_123', 'stripeCustomerId') as string
    expect(() => decryptField(token, 'stripeSubscriptionId')).toThrow()
    const [iv, body, tag] = token.split('.') as [string, string, string]
    const flipped = `${iv}.${body.slice(0, -1)}${body.endsWith('A') ? 'B' : 'A'}.${tag}`
    expect(() => decryptField(flipped, 'stripeCustomerId')).toThrow()
  })

  it('knows a sealed value from plain text', () => {
    expect(isEncrypted(encryptField('x', 'f'))).toBe(true)
    expect(isEncrypted('plain text')).toBe(false)
    expect(isEncrypted('a:b:c')).toBe(false)
    expect(isEncrypted(42)).toBe(false)
  })

  it('seals the listed fields once, each bound to its name, and opens them again', () => {
    const doc = { stripeCustomerId: 'cus_1', stripeSubscriptionId: 'sub_1', plan: 'pro', empty: '' }
    const sealed = encryptFields(doc, ['stripeCustomerId', 'stripeSubscriptionId', 'empty'])
    expect(isEncrypted(sealed.stripeCustomerId)).toBe(true)
    expect(sealed.plan).toBe('pro')
    expect(sealed.empty).toBe('')
    expect(encryptFields(sealed, ['stripeCustomerId']).stripeCustomerId).toBe(sealed.stripeCustomerId)
    expect(decryptFields(sealed, ['stripeCustomerId', 'stripeSubscriptionId', 'plan'])).toEqual(doc)
  })

  it('needs the master secret', () => {
    const secret = process.env.PAYLOAD_SECRET
    Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    try {
      expect(() => encryptField('x', 'f')).toThrow(/PAYLOAD_SECRET/)
    } finally {
      process.env.PAYLOAD_SECRET = secret
    }
  })
})
