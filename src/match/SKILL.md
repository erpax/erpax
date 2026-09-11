---
name: match
description: "Use when pairing supply with demand — a schema.org Offer seeking a Demand (or the reverse) across the corpus and harvested pages. Vectorize proposes K candidates by meaning; pure constraints (GTIN identity, quantity overlap, price floor, currency, delivery area) dispose, and every rejection names its reason. Feeds ai/embed-document + ai/semantic-search; scoring itself is pure."
atomPath: match
coordinate: "match · 7/descent · 9493067b"
contentUuid: "a9cbf9b6-b404-5088-b34e-c622de07897b"
diamondUuid: "e9f62bc8-09da-89ff-91b5-3bc835c7de64"
uuid: "9493067b-d710-8d9e-8d62-7a245078bf68"
horo: 7
typography:
  partition: match
  bondDegree: 24
standards:
  - GS1 GTIN — product identity when both sides declare it
  - "GS1-GTIN"
  - "schema.org Offer / Demand / PriceSpecification / QuantitativeValue"
bindings: []
signatures:
  computationUuid: "7dc351e0-d9ee-8670-b154-0b5a929c9ed2"
  stages:
    - stage: path
      stageUuid: "56a63e8c-962c-8ebc-b681-3669a5540868"
    - stage: trinity
      stageUuid: "0d7ce3d2-ea6b-854c-8e27-bbdf48bd0f62"
    - stage: boundary
      stageUuid: "62f51820-0e17-87a5-94b5-f55f2c187b96"
    - stage: links
      stageUuid: "6930d975-3476-8300-858d-541f35f82f00"
    - stage: horo
      stageUuid: "9f0f81ec-69a6-8338-8a8d-dc518393107c"
    - stage: seal
      stageUuid: "2a0c9c7a-54ae-8240-83aa-f63a43143af8"
    - stage: uuid
      stageUuid: "38f027c3-2d58-8f38-aafd-aaaf9fc34e5a"
version: 2
---
# match — Vectorize proposes, the constraints dispose

A document looking for its counterparty asks two questions, and **only one of them is
semantic**. "Which of these three million positions is *about* the same thing?" is a
similarity question — the one thing a vector index answers well. "Can these two
actually trade?" is not: cosine distance cannot see that the GTINs differ, the
quantity ranges are disjoint, the bid is under the ask, the currencies differ, or the
seller does not ship to the buyer's country.

Rank on similarity alone and you get **confident nonsense** — plausible-reading pairs
that die at the contract. So this atom is the corpus's own law applied to trade
([[rules]]/collapse: *proven by shape, decided by meaning*):

| stage | organ | answers |
| --- | --- | --- |
| narrow | `VECTORIZE_DOCS` via [[ai]]/semantic-search | which K of millions are *about* this? |
| decide | `scoreMatch` — pure predicates | can these two actually transact? |
| order | `rankMatches` | of the viable, which is best on both axes? |

**A non-viable candidate is DROPPED, never down-weighted.** Leaving an illegal pair in
the list at rank 0.4 is how a matcher starts proposing trades that fail at signing.

## What is indexed vs what decides

`embeddableText` puts **meaning** in the vector — name, description, category,
identity — and deliberately leaves price and quantity out: those are *constraints*,
not semantics, and embedding them teaches the index that "100 units" resembles
"100 EUR". `matchFilter` cuts only the cheap, safe lane (opposite side, category),
because over-filtering hides pairs the constraint pass would have accepted.

## Every rejection is an argument

`MatchVerdict.reasons` names each dimension — `gtin-mismatch` (fatal),
`price-below-floor` (fatal), `area-overlap` (supporting) — so a match is something a
human can read and contest, not a number nobody can question. The score is the
fraction of dimensions **both sides declared**, so a sparse position is not punished
for what it never claimed, and cannot score high on nothing either.

**Honest boundary.** This proves two positions *may* transact on the dimensions they
declare — never that either is real, solvent, or in stock, and never that the
harvested side is who it claims to be. It is a shortlist for a human or a
confirm-gated flow ([[confirm]]), never an auto-close. Currency mismatch is fatal by
design rather than silently converted: an FX rate at match time is a decision with a
date, and it belongs to [[currency]], not here.

**Law — [[law]]: similarity proposes, constraints dispose. A pair that cannot legally
transact is not a weak match — it is not a match, and it leaves the list.**

Composes: [[ai]] · [[commerce]] · [[party]] · [[currency]] · [[rules]].
