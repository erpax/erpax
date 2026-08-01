import { exactAbs, exactCeil, exactFloor, exactMax, exactMaxOf, exactMin, exactMinOf, exactRound, exactTrunc } from '@/algebra'
import { describe, it, expect } from 'vitest'
import {
  cloudflareCost,
  cloudEfficiency,
  revealBackend,
  DEFAULT_CF_PRICING,
  THEORETICAL_FLOOR,
  LEVERS,
  type CfProfile,
} from './index'
import { efficiency } from '@/cost'

// The prices are a verifiable INPUT and the magnitudes need real telemetry — so the proof is the ARITHMETIC and
// the STRUCTURE (free tiers, free R2 egress, one-law plug-in), never that any dollar figure is erpax's real
// spend. A cost model that asserted a magnitude it could not source would be the fabrication this corpus refuses.
describe('cloudflare/cost — the billable surface, priced honestly', () => {
  it('bills nothing below a dimension included tier — only the base plan shows', () => {
    const bill = cloudflareCost({ workersRequests: 1_000_000, workersCpuMs: 1_000_000 })
    expect(bill.lines.find((l) => l.dimension === 'workers.requests')!.usd).toBe(0)
    expect(bill.lines.find((l) => l.dimension === 'workers.cpuMs')!.usd).toBe(0)
    expect(bill.monthlyUsd).toBe(DEFAULT_CF_PRICING.workersBaseUsd) // just the $5 base
  })

  it('meters exactly above the tier — deterministic arithmetic a bill can refute', () => {
    // 20M requests → 10M billable → 10 × $0.30 = $3.00 ; 60M CPU-ms → 30M billable → 30 × $0.02 = $0.60
    const bill = cloudflareCost({ workersRequests: 20_000_000, workersCpuMs: 60_000_000 })
    expect(bill.lines.find((l) => l.dimension === 'workers.requests')!.usd).toBe(3)
    expect(bill.lines.find((l) => l.dimension === 'workers.cpuMs')!.usd).toBe(0.6)
    expect(bill.monthlyUsd).toBe(8.6) // 5 base + 3 + 0.6
  })

  it('R2 egress is FREE — the one dimension priced at 0, however many GB flow', () => {
    expect(DEFAULT_CF_PRICING.r2EgressGb.rate).toBe(0)
    const bill = cloudflareCost({ r2EgressGb: 100_000 })
    expect(bill.lines.find((l) => l.dimension === 'r2.egressGb')!.usd).toBe(0)
  })

  it('the total feeds the ONE efficiency law unchanged — output per dollar, kind money', () => {
    const output = { productivity: 86, creativity: 0 }
    const profile: CfProfile = { workersRequests: 20_000_000, workersCpuMs: 60_000_000 } // $8.60
    const e = cloudEfficiency(output, profile)
    expect(e).toBeCloseTo(86 / 8.6, 5) // 10 — same law as tokens, energy, labour
    expect(e).toBe(efficiency({ kind: 'money', output, cost: 8.6 }))
  })

  it('prices are a PLUGGABLE input — override the rate, the cost moves; the bill is the truth', () => {
    const cheaper = { ...DEFAULT_CF_PRICING, workersBaseUsd: 0 }
    expect(cloudflareCost({}, cheaper).monthlyUsd).toBe(0)
    expect(cloudflareCost({}).monthlyUsd).toBe(5) // default base still applies unchanged
  })

  it('the levers are DECLARED and grounded — the bundle is first, each aims at a real dimension', () => {
    expect(LEVERS[0]!.lever).toMatch(/80MB|skills\.index|bundle/)
    expect(LEVERS[0]!.dimension).toBe('workers.cpuMs')
    const dims = new Set(LEVERS.map((l) => l.dimension))
    expect(dims.has('ai.neurons')).toBe(true) // AI_CACHE hit-rate
    expect(dims.has('r2.egressGb')).toBe(true) // free egress
    for (const l of LEVERS) expect(l.evidence.length).toBeGreaterThan(0) // every lever cites an in-repo fact
  })

  // PRICES REPLACED WITH THEOREMS. The conjecture was "they almost perfectly match, revealing the backend."
  // Half true: the DIVERGENCE reveals the backend — but they do NOT almost-match, and that is the better answer.
  describe('reveal backend — price / economic floor', () => {
    it('they do NOT almost-perfectly match — the ratios span subsidy to heavy margin', () => {
      const r = revealBackend()
      const verdicts = new Set(r.map((d) => d.verdict))
      expect(verdicts.has('subsidy')).toBe(true) // egress, priced below floor
      expect(verdicts.has('margin')).toBe(true) // requests etc., priced well above floor
      const ratios = r.map((d) => d.ratio).filter((x) => Number.isFinite(x))
      expect(exactMaxOf(ratios) / exactMinOf(ratios.filter((x) => x > 0))).toBeGreaterThan(5) // spread, not a match
    })

    it('R2 egress is the SUBSIDY — priced below its transit floor, the dimension to exploit', () => {
      const egress = revealBackend().find((d) => d.dimension === 'r2.egressGb')!
      expect(egress.verdict).toBe('subsidy')
      expect(egress.priceUsdPerUnit).toBe(0) // $0 egress vs a real ~$0.008/GB floor
    })

    it('workers.requests carries the heaviest margin — where CF markup, and your savings, concentrate', () => {
      const reveal = revealBackend()
      const margins = reveal.filter((d) => d.verdict === 'margin').sort((a, b) => b.ratio - a.ratio)
      expect(margins[0]!.dimension).toBe('workers.requests') // ~15× the floor — prerender hits the fattest markup
    })

    it('every divergence names its economic basis — a lens on the gap, never a claim to know CF costs', () => {
      const r = revealBackend()
      expect(r.length).toBe(Object.keys(THEORETICAL_FLOOR).length)
      for (const d of r) expect(d.basis.length).toBeGreaterThan(0) // the floor is an estimate, and it says why
    })
  })
})
