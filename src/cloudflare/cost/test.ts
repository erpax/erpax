import { exactAbs, exactCeil, exactFloor, exactMax, exactMaxOf, exactMin, exactMinOf, exactRound, exactTrunc } from '@/algebra'
import { describe, it, expect } from 'vitest'
import {
  cloudflareCost,
  cloudEfficiency,
  revealBackend,
  DEFAULT_CF_PRICING,
  THEORETICAL_FLOOR,
  LEVERS,
  staleLevers,
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

  // The first version pinned the top lever as `80MB skills.index` — and that file is 269 BYTES, a CI
  // stub, folded out of the Worker besides. The test was holding the stale claim in place. A lever
  // now READS the tree, and one that no longer applies is reported rather than left ranked.
  it('every lever checks the tree instead of remembering it', () => {
    for (const l of LEVERS) {
      expect(typeof l.holds).toBe('function')
      expect(l.observed(process.cwd()).length).toBeGreaterThan(0)
      expect(l.dimension.length).toBeGreaterThan(0)
    }
    const dims = new Set(LEVERS.map((l) => l.dimension))
    expect(dims.has('ai.neurons')).toBe(true)
    expect(dims.has('r2.egressGb')).toBe(true)
    expect(dims.has('workers.cpuMs')).toBe(true)
  })

  it('reports the ISR lever as TAKEN, because open-next.config.ts now sets an incrementalCache', () => {
    const isr = LEVERS.find((l) => l.dimension === 'workers.cpuMs')!
    expect(isr.holds(process.cwd())).toBe(false)
    expect(isr.observed(process.cwd())).toMatch(/incrementalCache/)
    expect(staleLevers(process.cwd()).some((x) => x.lever === isr.lever)).toBe(true)
  })

  // The DO lever was REMOVED, not rewritten. Its premise was that no class implements the declared
  // namespaces — false: all five live in src/ai/durable-objects.ts as plain classes, which is the
  // valid pre-DurableObject-base style, and worker.ts exports every one. My detector asked
  // `extends DurableObject` and read the absence of that phrase as the absence of the class.
  // The real requirement — a NAMED EXPORT of the worker entry — is gated in cloudflare/binding.
  it('carries no lever about Durable Object classes, because that premise was false', () => {
    expect(LEVERS.some((l) => /durable/i.test(l.lever))).toBe(false)
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
