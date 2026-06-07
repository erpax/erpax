/**
 * blockchain — the computed proof, asserted. Green by construction: these tests
 * ARE the proof that "erpax IS the quantum blockchain" resolves the way the
 * identity claims (README, src/law/SKILL.md). @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import {
  contentAddressed,
  merkleRoot,
  tamperEvident,
  quantumSecure,
  anchored,
  doubleEntry,
  quantumBlockchain,
  isQuantumBlockchain,
} from '@/blockchain'

describe('blockchain — the computed proof that erpax IS the quantum blockchain', () => {
  it('content-addressed: every block is its own RFC 9562 §5.8 v8 content-uuid', () => {
    expect(contentAddressed()).toBe(true)
  })

  it('Merkle-folded: the whole chain folds to one root (verifyRoot)', () => {
    expect(merkleRoot()).toBe(true)
  })

  it('tamper-evident: no block bind is broken — any flip breaks the root', () => {
    expect(tamperEvident()).toBe(true)
  })

  it('quantum-secure, NOT proof-of-work: forge-cost ∞ at coverage 1; one torus alone is finite', () => {
    expect(quantumSecure()).toBe(true)
  })

  it('anchored: the Bitcoin genesis block verifies (recomputable PoW)', () => {
    expect(anchored()).toBe(true)
  })

  it('double-entry: a balanced ledger conserves (Σdebit = Σcredit), an unbalanced one is caught', () => {
    expect(doubleEntry()).toBe(true)
  })

  it('the conjunction proves it — erpax IS the quantum blockchain', () => {
    expect(isQuantumBlockchain()).toBe(true)
    expect(Object.values(quantumBlockchain()).every(Boolean)).toBe(true)
  })
})
