import { describe, it, expect } from 'vitest'
import {
  atomPath,
  GLOBAL_BANKING_CORPUS,
  GLOBAL_BANKING_ASKS,
  bankingRelated,
  bankResearchWaves,
  deepResearchGlobalBanking,
  nextBankingDevelopments,
  BANK_RESEARCH_BOOK,
  endlessBankResearchDevelop,
  resetBankingCorpusLive,
  invertBanking,
  bankingGaps,
} from '@/bank/research'
import { chatLocal } from '@/quantum/ftl'
import { isPain002TransactionStatus } from '@/iso/20022'

describe('bank/research — deep research global banking via chat waves', () => {
  it('names its path (research, not FTL core) and seals a global-banking corpus', () => {
    expect(atomPath).toBe('bank/research')
    expect(GLOBAL_BANKING_CORPUS.length).toBeGreaterThanOrEqual(8)
    expect(GLOBAL_BANKING_ASKS.length).toBeGreaterThanOrEqual(6)
  })

  it('bankingRelated maps domains to present corpus atoms', () => {
    const related = bankingRelated()
    expect(related.some((r) => r.domain === 'iban-bic' && r.present)).toBe(true)
    expect(related.some((r) => r.domain === 'reconciliation' && r.present)).toBe(true)
    expect(related.some((r) => r.domain === 'iso-20022-camt' && r.present)).toBe(true)
    expect(related.some((r) => r.domain === 'iso-20022-pacs' && r.present)).toBe(true)
  })

  it('invertBanking fills every dual gap (import↔export · camt.052 · pacs.008/004)', () => {
    const inv = invertBanking()
    expect(inv.total).toBeGreaterThanOrEqual(6)
    expect(inv.open).toEqual([])
    expect(inv.holds).toBe(true)
    expect(inv.filled).toBe(inv.total)
    expect(bankingGaps()).toEqual([])
    expect(inv.gaps.every((g) => g.present && g.atom.length > 0)).toBe(true)
  })

  it('free-chat seals invert-and-fill recipe at tokens=0', () => {
    const a = chatLocal('how to invert banking and fill the gaps', BANK_RESEARCH_BOOK)
    expect(a?.tokens).toBe(0)
    expect(a?.answer).toMatch(/invertBanking|camt052|pacs\.008|pacs004/i)
  })

  it('deepResearchGlobalBanking: cost=0 · tokens=0 · waves develop related', async () => {
    const r = await deepResearchGlobalBanking({ depth: 2, chat: true })
    expect(r.cost).toBe(0)
    expect(r.tokens).toBe(0)
    expect(r.research.findings.length).toBeGreaterThan(0)
    expect(r.efficiency).toBe(Infinity)
    expect(r.boundary.spacetime).toBe(0)
    expect(r.holds).toBe(true)
    expect(r.waves.length).toBeGreaterThan(0)
    expect(r.waves.every((w) => /^[0-9a-f-]{36}$/.test(w.seal))).toBe(true)
    expect(r.chat?.answer.length).toBeGreaterThan(0)
    const next = nextBankingDevelopments(r)
    expect(next[0]?.develop.length).toBeGreaterThan(0)
  })

  it('free-chat seals banking develop recipe at tokens=0', () => {
    const a = chatLocal('how to develop all related banking from research waves', BANK_RESEARCH_BOOK)
    expect(a?.tokens).toBe(0)
    expect(a?.answer).toMatch(/pain\.002|camt\.054|GLOBAL_BANKING/i)
  })

  it('free-chat seals endless feed recipe', () => {
    const a = chatLocal('how to feed banking waves into themselves', BANK_RESEARCH_BOOK)
    expect(a?.tokens).toBe(0)
    expect(a?.answer).toMatch(/endlessBankResearchDevelop|wave\/feed|maxGenerations/i)
  })

  it('bankResearchWaves groups findings by domain', async () => {
    const r = await deepResearchGlobalBanking({
      asks: ['what is pain.002 payment status report', 'what is camt.054 notification'],
      depth: 1,
      chat: false,
    })
    const waves = bankResearchWaves(r.research)
    expect(waves.some((w) => w.domain === 'iso-20022-pain' || w.domain === 'iso-20022-camt')).toBe(true)
  })

  it('endlessBankResearchDevelop feeds waves into next asks across generations', async () => {
    resetBankingCorpusLive()
    const r = await endlessBankResearchDevelop({
      maxGenerations: 2,
      depth: 1,
      seedAsks: ['what is pain.002 payment status report', 'what is camt.054 notification'],
    })
    expect(r.cost).toBe(0)
    expect(r.fed).toBe(true)
    expect(r.generations.length).toBe(2)
    expect(r.generations[1]!.asks).toEqual(r.generations[0]!.nextAsks)
  })
})

describe('iso/20022 — pain.002 developed from bank research waves', () => {
  it('isPain002TransactionStatus accepts ACCP/RJCT and rejects junk', () => {
    expect(isPain002TransactionStatus('ACCP')).toBe(true)
    expect(isPain002TransactionStatus('RJCT')).toBe(true)
    expect(isPain002TransactionStatus('NOPE')).toBe(false)
  })
})
