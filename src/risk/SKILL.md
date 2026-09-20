---
name: risk
description: "Use when reasoning about risk — Nothing here predicts a default. Credit risk is a **forecast**, and a function returning one would be a number a bank could point at with nothing behind it — the same refusal kyc…"
atomPath: risk
coordinate: "risk · 8/crest · fbd9eb2e"
contentUuid: "46ce5adc-a923-58f4-a38f-86b5b4718cfe"
diamondUuid: "53128a62-5126-8c55-8110-3b655c7cfd8b"
uuid: "fbd9eb2e-831d-88ff-bdef-d0cd4f893583"
horo: 8
typography:
  partition: risk
  bondDegree: 67
standards:
  - "EU 575/2013 (CRR) Art. 392 — definition of a large exposure"
  - "EU 575/2013 (CRR) Art. 395 — limits to large exposures"
  - "EU 575/2013 (CRR) Art. 4(1)(39) — group of connected clients"
bindings: []
signatures:
  computationUuid: "40f7fd66-2d0a-8c98-8e97-7a9cb53620a3"
  stages:
    - stage: path
      stageUuid: "5c07745a-1a0a-8b95-b142-94fb7960898c"
    - stage: trinity
      stageUuid: "de672872-dc36-8941-963e-cb161ca9604e"
    - stage: boundary
      stageUuid: "4bf852dd-532f-8b48-9c6d-4e88e417787d"
    - stage: links
      stageUuid: "8574b340-4aac-8581-8a71-ffff67ffca59"
    - stage: horo
      stageUuid: "455a235e-3377-8c3b-83a0-b11cb78245d1"
    - stage: seal
      stageUuid: "c39f455c-d760-8792-9f54-72bc110ce582"
    - stage: uuid
      stageUuid: "e015326f-e676-830a-a0e6-26537f172048"
version: 2
---
# risk — the one risk question with a decidable answer

Nothing here predicts a default. Credit risk is a **forecast**, and a function returning one would
be a number a bank could point at with nothing behind it — the same refusal [[kyc]] and [[aml]]
make, for the same reason.

What the CRR makes decidable is a **ratio**: an exposure against Tier 1 capital, and two thresholds
written into the regulation.

| | share of Tier 1 | obligation |
| --- | --- | --- |
| **large exposure** (Art. 392) | **at or above 10%** | must be **reported** (Art. 394) |
| **limit** (Art. 395) | **above 25%** | must be **cured** (Art. 396) |

Both edges are exact and both are pinned: large fires **at** the share, a breach only **above** the
limit — the limit itself is permitted, and an off-by-one there turns a compliant book into a
reported breach or the reverse.

## The same shape as structuring, one regulation over

A single borrower split across a **group of connected clients** (Art. 4(1)(39)) sits under the
limit while the real exposure sits over it. That is precisely what [[aml]] measures as structuring
— value divided to stay under a line — and it is why exposures are **aggregated before they are
tested**, never after.

The pinned case is the argument: three names at €12m, €9m and €8m against €100m of Tier 1 are each
comfortably under 25%. Grouped, they are **29% — a breach**. A gate that tests ungrouped exposures
reports that book as clean.

## Large and breach are separate lists, never one severity field

They are **different obligations**: one is reported, the other is cured. A single field would let a
reader take one for the other, and the one that gets taken for the lesser is always the one that
matters.

**Honest boundary.** This computes a ratio against declared thresholds. It does **not** apply the
CRR's exemptions — intragroup, covered bonds, sovereign and institution exposures each have their
own treatment (Art. 390 and 400), and none of it is here, so a raw verdict will over-report a book
that legitimately claims them. It does not value the exposure, apply credit conversion factors to
off-balance-sheet items, or net collateral. And **grouping is an input**: this aggregates by the
`group` someone assigned, and a connected client nobody connected is invisible to it — which is the
failure mode, and it is a human judgement no arithmetic reaches.

**Law — [[law]]: aggregate before you test. A limit applied to the names on the exposures rather
than to the party behind them measures the filing system, not the risk — and the split that defeats
it is the same move structuring makes against a reporting threshold.**

## Standards

- **EU 575/2013 (CRR) Art. 392** — definition of a large exposure.
- **EU 575/2013 (CRR) Art. 395** — limits to large exposures.
- **EU 575/2013 (CRR) Art. 4(1)(39)** — group of connected clients.

Composes: [[aml]] · [[kyc]] · [[rules]]/refutable · [[law]].
