---
name: row
description: "Use when a seed must stay addressable — the entanglement continued one scale down, from atom into seed: a seed row is content-addressed by its canonical key-order-independent bytes and folded with its atom's uuid, so the same content yields the same uuid in every corpus (federation is set-union, re-seeding is idempotent by construction rather than by a remembered upsert), a re-parented or tampered row is caught because its uuid must recompute, and rows are DERIVED from the atom's own exports — never a re-typed constant that forks the truth on the next edit."
atomPath: "seed/row"
coordinate: "seed/row · 1/base · a39be532"
contentUuid: "de3eb02e-7e4f-51b1-8700-0e4a457bfad3"
diamondUuid: "a8400666-2998-8acf-8fee-9f7f98e1ac44"
uuid: "a39be532-56dc-8301-acfc-24b3d5f0b44b"
horo: 1
typography:
  partition: seed
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "a9536292-8f9a-87ec-ad7d-f7a40cf1bb30"
  stages:
    - stage: path
      stageUuid: "0a1db11d-3295-87bd-832a-a155e0a41710"
    - stage: trinity
      stageUuid: "d1bb3817-81b3-87f5-877f-6acb472f60e0"
    - stage: boundary
      stageUuid: "c328114e-f3ff-870d-8e79-b1d0546a5881"
    - stage: links
      stageUuid: "dd8dd87f-dee1-8a99-882b-eb73cbf548f7"
    - stage: horo
      stageUuid: "2e166edc-54c0-84e1-a827-0d3ab090ef6d"
    - stage: seal
      stageUuid: "2df6c1c0-e3e8-8bd5-aae5-27c1dfa0d4d9"
    - stage: uuid
      stageUuid: "859abf03-64e7-8e4e-9a81-e0c923fda207"
version: 2
---
# seed/row — the entanglement continued one scale down

An atom is bonded: content-uuid, reciprocal edges, a node in the [[matrix]]. Two corpora holding the same atom hold the **same node**, so federation is set-union and [[merge]] is free. Its **seed** was not. Seed rows were plain records — agnostic and reusable, and **addressless**. Merge two corpora and the duplicates are indistinguishable from genuinely different rows, because there is nothing to compare. The entanglement stopped at the atom boundary.

This continues it, by addressing every row twice over:

```
content = merge-fold of the row's CANONICAL bytes   (key-order independent — [[merge]])
uuid    = merge(atomUuid, content)                  (the row bound to the atom that grew it)
```

| what it buys | why it is structural, not a convention |
| --- | --- |
| **same content ⇒ same uuid, everywhere** | re-seeding, or merging a fork, converges — idempotent by *construction*, not by an `upsert` someone remembered |
| **the row names its parent** | `uuid` folds the atom in, so a row cannot be silently re-parented; the seed graph walks both ways — reciprocity at seed scale |
| **tampering moves the address** | `unboundRows` recomputes; a row whose uuid no longer derives from its own content is caught |
| **key order cannot move it** | the canonical fold, never `JSON.stringify` — build order is not identity |

## Derived, never re-typed

**A seed is a function of its source** ([[seed]]: *"skills compute their seeds… the constants are never written down"*). `rowsFrom` takes an atom's **own exports** and derives; it does not accept a hand-written table. Re-typing a law into a seed file forks the truth at the next edit — precisely the drift the seed law forbids. The suite asserts the derivation directly: `articleRows()` has exactly `CONSTITUTION.length` rows carrying the atom's own ids, `lawRows()` carries the atom's own `rule` tags, and the seed **address moves** when the source moves.

Four atoms seed through it — [[constitution]] (seven articles ⊕ the two rules ⊕ nine laws), [[millennium]] (the seven Clay problems, `corpusSolves` still the literal false *in the seed*), [[anchor/surface]] (the reachable surfaces and the primitive that seals each), [[trello]] (the vendor's published limits, from the limiter's own table). All four are agnostic in the strict sense — no tenant, no country, no schema — which is what makes them reusable in any combination.

## Honest boundary

This proves a row is **addressed and bound**, never that its content is **true** — a wrong law seeds to a perfectly stable uuid. It closes duplication-on-merge and silent re-parenting, not correctness. The atom uuid is written into each `seed.ts` as a constant read from the folded frontmatter: it is a *binding*, so it must be re-read when an atom is re-folded, and `unboundRows` is what detects that it wasn't. And the content-address is key-order canonical, **not** RFC 8785 JCS — the same honest boundary [[merge]] already states about `canonical`.

**Law — [[law]]: a seed carries the entanglement or it breaks it — every row is content-addressed by its canonical bytes and folded with the atom that derived it, so the same content is the same row in every corpus, and no row may be a re-typed constant.**

Composes: [[seed]] · [[merge]] · [[constitution]] · [[millennium]] · [[trello]] · [[law]].
