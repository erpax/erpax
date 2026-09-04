import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import {
  atomPath,
  sealQuantumSecure,
  banksChat,
  developQuantumSecureBanking,
  QUANTUM_SECURE_BANKING_CORPUS,
  QUANTUM_SECURE_BANKING_BOOK,
  quantumSecureBankingRelated,
  type InterbankParticipant,
} from '@/bank/chat'
import { chatLocal } from '@/quantum/ftl'
import { isApprovedPqc } from '@/beyond/pqc'

const BANKS: readonly InterbankParticipant[] = [
  { bic: 'BNBGBGSF', name: 'Bank A', pqcFingerprint: 'fp-a' },
  { bic: 'COBADEFF', name: 'Bank B', pqcFingerprint: 'fp-b' },
  { bic: 'CHASUS33', name: 'Bank C', pqcFingerprint: 'fp-c' },
]

describe('bank/chat — banks chat · quantum-secure banking', () => {
  it('names its path and seals a quantum-secure corpus', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    expect(QUANTUM_SECURE_BANKING_CORPUS.length).toBeGreaterThanOrEqual(4)
  })

  it('sealQuantumSecure: approved ML-DSA · holds computed', () => {
    const env = sealQuantumSecure('pacs.008 body', {
      publicKeyFingerprint: 'fp-test',
      algorithm: 'ML-DSA-65',
    })
    expect(env.hybrid).toBe(true)
    expect(isApprovedPqc(env.algorithm)).toBe(true)
    expect(env.holds).toBe(true)
    expect(env.payloadUuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(env.classicalDigest).toMatch(/^[0-9a-f-]{36}$/)
    expect('physicalQkdClaim' in env).toBe(false)
    expect('qpu' in env).toBe(false)
  })

  it('sealQuantumSecure fails closed on unapproved algorithm label', () => {
    const env = sealQuantumSecure('x', {
      publicKeyFingerprint: 'fp',
      algorithm: 'RSA-2048' as never,
    })
    expect(env.holds).toBe(false)
  })

  it('banksChat: three BICs exchange sealed turns; consensus accepts develop', () => {
    const r = banksChat(BANKS, {
      proposals: [
        {
          text: 'develop: wrap pacs.008 in QuantumSecureEnvelope',
          votes: [true, true, true],
        },
      ],
    })
    expect(r.cost).toBe(0)
    expect(r.tokens).toBe(0)
    expect(r.turns.length).toBe(3)
    expect(r.turns.every((t) => t.envelope.holds)).toBe(true)
    expect(r.acceptedDevelopments).toContain('develop: wrap pacs.008 in QuantumSecureEnvelope')
    expect(r.sealed).toBe(true)
    expect(r.holds).toBe(true)
  })

  it('banksChat rejects develop without 2f+1 consensus', () => {
    const r = banksChat(BANKS, {
      turns: [{ fromBic: 'BNBGBGSF', text: 'hello' }],
      proposals: [{ text: 'bad proposal', votes: [true, false, false] }],
    })
    expect(r.acceptedDevelopments).toEqual([])
  })

  it('free-chat seals quantum-secure develop recipe at tokens=0', () => {
    const a = chatLocal('how to develop quantum secure banking', QUANTUM_SECURE_BANKING_BOOK)
    expect(a?.tokens).toBe(0)
    expect(a?.answer).toMatch(/QuantumSecureEnvelope|PQC|pacs/i)
  })

  it('developQuantumSecureBanking: banks chat · research cost=0 · holds', async () => {
    const r = await developQuantumSecureBanking({ banks: BANKS, depth: 1 })
    expect(r.cost).toBe(0)
    expect(r.tokens).toBe(0)
    expect(r.research.findings.length).toBeGreaterThan(0)
    expect(r.chat.banks).toHaveLength(3)
    expect(r.chat.acceptedDevelopments.length).toBeGreaterThan(0)
    expect(r.related.every((x) => x.present)).toBe(true)
    expect(quantumSecureBankingRelated().every((x) => x.present)).toBe(true)
    expect(r.holds).toBe(true)
    expect(r.recipe?.answer.length).toBeGreaterThan(0)
  })
})
