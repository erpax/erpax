/**
 * Crypto-shred — the GDPR-vs-content-addressing reconciliation, asserted.
 * Green by construction. @see ./index.ts, src/services/shred/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import { canTransition, isRecoverable, shredPreservesChain, erase } from './index'

describe('shred: the lifecycle is one-way (plaintext → encrypted → shredded)', () => {
  it('advances one step at a time, never reverses, never skips', () => {
    expect(canTransition('plaintext', 'encrypted')).toBe(true)
    expect(canTransition('encrypted', 'shredded')).toBe(true)
    expect(canTransition('plaintext', 'shredded')).toBe(false) // must encrypt first
    expect(canTransition('shredded', 'encrypted')).toBe(false) // irreversible
    expect(canTransition('encrypted', 'plaintext')).toBe(false)
  })
})

describe('shred: shredded is unrecoverable forever', () => {
  it('plaintext/encrypted recover; shredded does not', () => {
    expect(isRecoverable('plaintext')).toBe(true)
    expect(isRecoverable('encrypted')).toBe(true)
    expect(isRecoverable('shredded')).toBe(false)
  })
})

describe('shred: the load-bearing invariant — uuid over the envelope', () => {
  it('shred preserves the chain ONLY when the uuid is over the CipherEnvelope', () => {
    expect(shredPreservesChain(true)).toBe(true)
    expect(shredPreservesChain(false)).toBe(false)
  })
  it('erase destroys the key, keeps the row, leaves the chain intact', () => {
    expect(erase(true)).toEqual({
      rowDeleted: false,
      keyDestroyed: true,
      state: 'shredded',
      recoverable: false,
      chainIntact: true,
    })
  })
  it('erase REFUSES when the uuid hashes the plaintext (would break the chain)', () => {
    expect(() => erase(false)).toThrow(/CipherEnvelope/)
  })
})
