/**
 * quantum/consulting — INFINITE PROFIT AT NO COST, honestly. A consultation answers a query from the
 * corpus. Knowledge is NON-RIVALROUS and content-addressed: once research ([[quantum]]/research) has
 * paid the one-time cost to produce an answer, serving it again is a cache HIT — zero MARGINAL cost
 * (the answer's content-uuid is already held in the [[akashic]] record; recompute and reuse are
 * free), and it is reusable without bound. So over reuse the profit grows while the marginal cost
 * stays 0, and ROI → ∞.
 *
 * erpax is a scientific RESEARCH platform: it pays the cost ONCE (research — agents × tokens, the
 * sunk cost) and consults the proven, content-addressed result FOREVER (no marginal cost). The
 * research is the only cost; the consulting is the unbounded profit — value created once, sold ∞ times.
 *
 * HONEST: "no cost" is the MARGINAL cost of serving a cached/computed answer (the research was the
 * sunk cost); "infinite profit" is non-rivalrous reuse leverage (ROI → ∞ as reuse → ∞), not a literal
 * money printer. A cache MISS costs a full research run.
 *
 *   tsx src/quantum/consulting/index.ts
 *
 * @audit marginal cost is 0 on a cache hit; ROI = profit / sunk-cost → ∞ as reuses → ∞
 * @see ../research -- ../../akashic -- ../../cost -- ../../expense -- ./SKILL.md
 */
import { researchCost, type ResearchRun } from '@/quantum/research'

/** The MARGINAL cost of one consultation: 0 on a cache HIT (the answer is already held); on a MISS, a full research run. */
export function consultCost(cached: boolean, miss?: ResearchRun): number {
  return cached ? 0 : miss ? researchCost(miss) : 0
}

/** The profit of a researched answer reused: value per reuse × reuses (non-rivalrous — each reuse is free). */
export const consultProfit = (valuePerReuse: number, reuses: number): number => valuePerReuse * reuses

/** ROI = profit / cost. Any profit at ZERO cost ⇒ ∞ (the cache-hit / non-rivalrous limit). */
export function roi(profit: number, cost: number): number {
  if (cost <= 0) return profit > 0 ? Number.POSITIVE_INFINITY : 0
  return profit / cost
}

/**
 * The headline, computed: a cache HIT (an already-researched answer) costs 0 to serve and yields
 * value — so its marginal ROI is ∞. Across a cache MISS amortised over reuse, ROI climbs toward ∞ as
 * the sunk research is spread over unbounded non-rivalrous reuse.
 */
export function infiniteProfitAtNoCost(valuePerReuse: number, sunk?: ResearchRun): {
  cacheHitCost: number
  cacheHitRoi: number
  roiAfterResearch: (reuses: number) => number
  limit: number
} {
  const sunkCost = sunk ? researchCost(sunk) : 0
  return {
    cacheHitCost: consultCost(true), // 0
    cacheHitRoi: roi(valuePerReuse, 0), // ∞ — value at no marginal cost
    roiAfterResearch: (reuses: number) => roi(consultProfit(valuePerReuse, reuses), sunkCost),
    limit: Number.POSITIVE_INFINITY,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const sunk: ResearchRun = { agent: 'agent:scouts', agents: 5, tokens: 1000, entropyReduced: 8000 }
  const c = infiniteProfitAtNoCost(100, sunk)
  console.log('quantum/consulting — infinite profit at no cost (the non-rivalrous limit):')
  console.log('  cache HIT: marginal cost ' + c.cacheHitCost + ' · ROI ' + (c.cacheHitRoi === Infinity ? '∞' : c.cacheHitRoi) + '  (value served at no marginal cost)')
  console.log('  after a 5000-token research, ROI at 50 reuses = ' + c.roiAfterResearch(50).toFixed(2) + ' · at 10^6 = ' + c.roiAfterResearch(1e6).toFixed(0) + ' · limit = ∞')
}
