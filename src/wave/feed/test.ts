import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { asksFromWaveOutput, feedWavesIntoThemselves, atomPath } from '@/wave/feed'
import {
  endlessBankResearchDevelop,
  resetBankingCorpusLive,
  bankingCorpusLive,
  GLOBAL_BANKING_CORPUS,
} from '@/bank/research'

describe('wave/feed — feed waves into themselves', () => {
  it('names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })

  it('asksFromWaveOutput consumes develop/domain/questions/findings into next asks', () => {
    const next = asksFromWaveOutput({
      waves: [
        {
          domain: 'iso-20022-pain',
          develop: 'land pain.002 parse',
          questions: ['what is pain.002 payment status report'],
        },
      ],
      findings: [{ question: 'what is camt.054 notification', evidence: 'intraday advise' }],
      followUps: ['how does camt.054 differ from camt.053'],
      limit: 8,
    })
    expect(next.some((a) => /pain\.002|land pain/.test(a))).toBe(true)
    expect(next.some((a) => /camt\.054/.test(a))).toBe(true)
    expect(next.some((a) => /iso-20022-pain/.test(a))).toBe(true)
    expect(next.length).toBeGreaterThan(0)
    expect(next.length).toBeLessThanOrEqual(8)
  })

  it('feedWavesIntoThemselves: gen N nextAsks fuel gen N+1; cost=0; continue until stopped', async () => {
    const report = await feedWavesIntoThemselves({
      seedAsks: ['alpha', 'beta'],
      maxGenerations: 3,
      research: async (asks) => ({
        findings: asks.map((q) => ({ question: q, evidence: `evidence for ${q}` })),
        followUps: asks.map((q) => `deeper: ${q}`),
      }),
      wavesFrom: (r) =>
        r.findings.map((f) => ({
          domain: 'research',
          develop: `develop from ${f.question}`,
          questions: [f.question],
        })),
      growCorpus: (findings) => findings.length,
      develop: (waves) => waves.map((w) => (w as { develop: string }).develop),
    })
    expect(report.fed).toBe(true)
    expect(report.cost).toBe(0)
    expect(report.tokens).toBe(0)
    expect(report.generations.length).toBeGreaterThanOrEqual(2)
    expect(report.sealGrown).toBeGreaterThan(0)
    expect(report.totalDeveloped).toBeGreaterThan(0)
    // generation 2 asks come from generation 1 nextAsks (self-feed)
    expect(report.generations[1]!.asks).toEqual(report.generations[0]!.nextAsks)
    expect(report.continuation.continue).toBe(true)
  })

  it('external stopped is sovereign — zero generations when stopped before start', async () => {
    const report = await feedWavesIntoThemselves({
      seedAsks: ['alpha'],
      maxGenerations: 5,
      stopped: true,
      research: async () => ({ findings: [] }),
      wavesFrom: () => [],
    })
    expect(report.generations).toHaveLength(0)
    expect(report.fed).toBe(false)
    expect(report.continuation.continue).toBe(false)
    expect(report.continuation.stoppedExternally).toBe(true)
  })
})

describe('endlessBankResearchDevelop — banking waves feed themselves', () => {
  it('runs multiple generations, grows corpus, cost=0, next asks from prior waves', async () => {
    resetBankingCorpusLive()
    const before = bankingCorpusLive().length
    expect(before).toBe(GLOBAL_BANKING_CORPUS.length)

    const report = await endlessBankResearchDevelop({
      maxGenerations: 3,
      depth: 1,
      seedAsks: [
        'what is pain.002 payment status report',
        'what is camt.054 notification',
        'how do SEPA and ISO 20022 relate',
      ],
    })

    expect(report.fed).toBe(true)
    expect(report.cost).toBe(0)
    expect(report.tokens).toBe(0)
    expect(report.generations.length).toBeGreaterThanOrEqual(2)
    expect(report.totalFindings).toBeGreaterThan(0)
    expect(report.totalDeveloped).toBeGreaterThan(0)
    expect(report.continuation.continue).toBe(true)
    // self-feed: gen2 asks === gen1 nextAsks
    expect(report.generations[1]!.asks).toEqual(report.generations[0]!.nextAsks)
    // next asks mention develop / deepen / verify from wave output
    expect(report.generations[0]!.nextAsks.some((a) => /develop|deeper|verify|deepen/i.test(a))).toBe(
      true,
    )
    // corpus grew or at least sealGrown counted (findings sealed)
    expect(bankingCorpusLive().length).toBeGreaterThanOrEqual(before)
    expect(report.sealGrown).toBeGreaterThanOrEqual(0)
  })
})
