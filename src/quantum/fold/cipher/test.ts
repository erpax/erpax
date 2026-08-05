/**
 * quantum/fold/cipher.test — verify receipts contain only ciphertext-derived data.
 *
 * LAW: No plaintext UUID or identifier shall appear in receipts.
 * Every field must derive from ciphertext only.
 */

import { describe, it, expect } from 'vitest'
import { generateReceipt, verifyReceipt, chainReceipts } from './index'

describe('quantum/fold cipher receipts', () => {
  it('generates receipt with ciphertextUuid only', () => {
    const ciphertext = new TextEncoder().encode('encrypted data')
    const receipt = generateReceipt(ciphertext)

    expect(receipt.ciphertextUuid).toBeDefined()
    expect(receipt.ciphertextUuid).toMatch(/^[0-9a-f-]+$/)
    expect(receipt.sealed).toBe(true)
    expect(receipt.timestamp).toBeDefined()
    expect(receipt.hash).toBeDefined()
    expect(receipt.hash).toMatch(/^[0-9a-f]{64}$/) // SHA-256 hex
  })

  it('receipt uuid is deterministic from ciphertext', () => {
    const ciphertext = new TextEncoder().encode('same data')

    const receipt1 = generateReceipt(ciphertext)
    const receipt2 = generateReceipt(ciphertext)

    expect(receipt1.ciphertextUuid).toBe(receipt2.ciphertextUuid)
    expect(receipt1.hash).toBe(receipt2.hash)
  })

  it('different ciphertexts produce different uuids', () => {
    const cipher1 = new TextEncoder().encode('first')
    const cipher2 = new TextEncoder().encode('second')

    const receipt1 = generateReceipt(cipher1)
    const receipt2 = generateReceipt(cipher2)

    expect(receipt1.ciphertextUuid).not.toBe(receipt2.ciphertextUuid)
    expect(receipt1.hash).not.toBe(receipt2.hash)
  })

  it('verifies receipt integrity against ciphertext', () => {
    const ciphertext = new TextEncoder().encode('verify me')
    const receipt = generateReceipt(ciphertext)

    const isValid = verifyReceipt(receipt, ciphertext)
    expect(isValid).toBe(true)
  })

  it('rejects tampered receipt', () => {
    const ciphertext = new TextEncoder().encode('original')
    const receipt = generateReceipt(ciphertext)

    const tampered = new TextEncoder().encode('different')
    const isValid = verifyReceipt(receipt, tampered)

    expect(isValid).toBe(false)
  })

  it('rejects receipt with wrong sealed flag', () => {
    const ciphertext = new TextEncoder().encode('test')
    const receipt = generateReceipt(ciphertext)

    const unsealed = {
      ...receipt,
      sealed: false as const,
    }
    const isValid = verifyReceipt(unsealed as any, ciphertext)
    expect(isValid).toBe(false)
  })

  it('chains multiple receipts by ciphertextUuid', () => {
    const c1 = new TextEncoder().encode('first')
    const c2 = new TextEncoder().encode('second')
    const c3 = new TextEncoder().encode('third')

    const r1 = generateReceipt(c1)
    const r2 = generateReceipt(c2)
    const r3 = generateReceipt(c3)

    const chain = chainReceipts([r1, r2, r3])

    expect(chain.head).toBe(r1.ciphertextUuid)
    expect(chain.tail).toBe(r3.ciphertextUuid)
    expect(chain.length).toBe(3)
    expect(chain.sealed).toBe(true)
  })

  it('receipt contains no plaintext field', () => {
    const ciphertext = new TextEncoder().encode('hidden')
    const receipt = generateReceipt(ciphertext)

    // INVARIANT: plaintextUuid MUST NOT exist
    expect('plaintextUuid' in receipt).toBe(false)

    // INVARIANT: no plaintext at all
    const keys = Object.keys(receipt)
    expect(keys).toEqual([
      'ciphertextUuid',
      'timestamp',
      'sealed',
      'hash',
    ])
  })

  it('rejects empty receipt chain', () => {
    expect(() => chainReceipts([])).toThrow('Cannot chain empty receipt array')
  })

  it('single receipt chain has head === tail', () => {
    const c = new TextEncoder().encode('solo')
    const r = generateReceipt(c)
    const chain = chainReceipts([r])

    expect(chain.head).toBe(chain.tail)
    expect(chain.length).toBe(1)
  })
})
