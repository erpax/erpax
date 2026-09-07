---
name: consulting
description: "Use when reasoning about the economics of serving the corpus's knowledge — research pays the cost once, then a content-addressed answer is a cache hit served at zero marginal cost and reused without bound, so consulting ROI tends to infinity."
atomPath: "quantum/consulting"
coordinate: "quantum/consulting · 5/round · e0a43f04"
contentUuid: "cbf9b33e-da2d-55ab-a594-df5b02567f59"
diamondUuid: "d0915947-2d3f-84f0-adfc-01c3a6ac1a72"
uuid: "e0a43f04-79a0-85dd-80ce-acda8de61666"
horo: 5
typography:
  partition: quantum
  bondDegree: 21
standards:
  - "non-rivalrous information economics; content-addressed caching (the cache hit = zero marginal cost)"
bindings: []
signatures:
  computationUuid: "f3955df5-741f-833e-b1a6-0cf712793c02"
  stages:
    - stage: path
      stageUuid: "36f41275-7d20-8376-b6de-86e3c7cc2015"
    - stage: trinity
      stageUuid: "da1bc5ad-8ba5-8661-8e4f-f17484f4e3e1"
    - stage: boundary
      stageUuid: "f5888f48-ac56-801a-bfb6-3a027575da9c"
    - stage: links
      stageUuid: "fed51b18-1f84-8e45-a931-381c3ac1ef56"
    - stage: horo
      stageUuid: "b38c1fcf-65fa-841e-b292-11bd6d0702ea"
    - stage: seal
      stageUuid: "0770ea38-ef98-84e8-b068-f43482d2cb98"
    - stage: uuid
      stageUuid: "500a766b-ffc0-8b44-bead-d6a6ee9890bb"
quantum:
  superposition:
    - akashic
    - balance
    - cost
    - expense
    - law
    - quantum
    - research
    - superposition
  collapse:
    - "Use when reasoning about the economics of serving the corpus's knowledge — research pays the cost once, then a content-addressed answer is a cache hit served at zero marginal cost and reused without bound, so consulting ROI tends to infinity."
    - "knowledge is non-rivalrous, so consulting is infinite profit at no cost. Research pays once; a content-addressed answer is then served at zero marginal cost and reused without bound, and ROI tends to infinity. The platform's worth is research done once and consulted forever."
    - "marginal cost is 0 on a cache hit; ROI = profit / sunk-cost → ∞ as reuses → ∞, never asserted"
    - "matter-twin:src/quantum/consulting/index.ts"
    - "non-rivalrous information economics; content-addressed caching (the cache hit = zero marginal cost)"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "f3955df5-741f-833e-b1a6-0cf712793c02"
    contentUuid: "cbf9b33e-da2d-55ab-a594-df5b02567f59"
version: 2
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

<sub>content-uuid `cbf9b33e-da2d-55ab-a594-df5b02567f59` · account `quantum/consulting` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
