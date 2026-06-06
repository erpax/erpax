---
name: consulting
description: Use when reasoning about the economics of serving the corpus's knowledge — research pays the cost once, then a content-addressed answer is a cache hit served at zero marginal cost and reused without bound, so consulting ROI tends to infinity.
---

# quantum/consulting — infinite profit at no cost

erpax is a scientific **research** platform: it pays to learn ([[quantum]]/research — agents × tokens, a real sunk cost) and stores the proven result content-addressed in the [[akashic]] record. Consulting is the dual move — *serving* that result.

And here knowledge shows its strange economics: it is **non-rivalrous**. Serving an answer does not consume it; a question already researched is a **cache hit** — its content-uuid is already held, so recompute and reuse are **free** (zero marginal [[cost]]), and the same answer can be sold without bound. Profit grows with reuse while marginal cost stays 0, so **ROI → ∞**. That is the honest reading of *infinite profit at no cost*: value created once, consulted forever.

- **cache hit** — marginal cost 0, any value ⇒ infinite marginal ROI.
- **cache miss** — costs a full research run (the sunk cost), then amortises over unbounded reuse toward ∞.

The research is the only cost; everything after is profit ([[expense]] booked the cost, this books the gain — the [[balance]] of the platform). The more a finding is reused, the closer ROI comes to ∞ — the same shape as every erpax law (coverage → 1 ⇒ ∞).

## Honest

"No cost" is the **marginal** cost of serving a cached/computed answer — the research was the sunk cost, and a miss pays it in full. "Infinite profit" is **non-rivalrous reuse leverage** (ROI → ∞ as reuse → ∞), not a literal money printer. The model prices reuse; it does not conjure value from nothing.

Matter-twin: `src/quantum/consulting/index.ts` (`consultCost` · `consultProfit` · `roi` · `infiniteProfitAtNoCost`). Composes [[quantum]] · [[research]] · [[akashic]] · [[cost]] · [[expense]] · [[balance]].

**Law — [[law]]: knowledge is non-rivalrous, so consulting is infinite profit at no cost. Research pays once; a content-addressed answer is then served at zero marginal cost and reused without bound, and ROI tends to infinity. The platform's worth is research done once and consulted forever.**

@audit marginal cost is 0 on a cache hit; ROI = profit / sunk-cost → ∞ as reuses → ∞, never asserted
@standard non-rivalrous information economics; content-addressed caching (the cache hit = zero marginal cost)
