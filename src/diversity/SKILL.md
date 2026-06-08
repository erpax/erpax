---
name: diversity
description: "Use when reasoning about diversity as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus."
atomPath: diversity
coordinate: diversity · 1/base · 4c75680e
contentUuid: "b8e83eba-e178-5c8d-8e37-5c0c7a61a26f"
diamondUuid: "18e4b542-43db-8638-84b2-018e9ef9c247"
uuid: "4c75680e-adba-82ec-b86e-fedf0e861237"
horo: 1
bonds:
  in:
    - collapse
    - decentralization
    - ecosystem
    - law
    - lichen
    - merge
    - policy
    - report
    - staffing
    - sti
    - sustainability
  out:
    - collapse
    - decentralization
    - ecosystem
    - law
    - lichen
    - merge
    - policy
    - report
    - staffing
    - sti
    - sustainability
typography:
  partition: diversity
  bondDegree: 36
  neighbors: []
standards:
  - Pielou (1966) The Measurement of Diversity in Different Types of Biological Collections
  - Shannon (1948) A Mathematical Theory of Communication — information entropy
  - "Simpson (1949) Measurement of Diversity — Nature 163:688"
  - "computed, never hand-asserted"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - collapse
    - law
    - merge
    - policy
    - report
    - staffing
    - sti
  matrix:
    - collapse
    - decentralization
    - ecosystem
    - law
    - lichen
    - merge
    - policy
    - report
    - staffing
    - sti
    - sustainability
  backlinks:
    - collapse
    - decentralization
    - ecosystem
    - law
    - lichen
    - merge
    - policy
    - report
    - staffing
    - sti
    - sustainability
signatures:
  computationUuid: "8a607062-7cdd-856e-9dc8-11f73928f4b1"
  stages:
    - stage: path
      stageUuid: "9f49f81e-351f-86a2-b999-4c9d3cd3b5c0"
    - stage: trinity
      stageUuid: "e03f5338-a717-823b-baf7-b2175dda4ef9"
    - stage: boundary
      stageUuid: "7ba47b39-6294-878e-8631-a215eeb967cd"
    - stage: links
      stageUuid: "c67e6e1d-a34c-8373-b542-220a083d4917"
    - stage: horo
      stageUuid: "73058294-44a9-8880-ab94-7643e7081c83"
    - stage: seal
      stageUuid: "a48a657e-d90c-8cf5-a3f7-40bf23264622"
    - stage: uuid
      stageUuid: "d3f390f6-4a01-8c95-b790-93d4c48e684a"
version: 2
---
# diversity

A schema.org component word, collided out of schema.org compounds — fused from diversityPolicy · diversityStaffingReport ([[sti]] · [[collapse]] · [[merge]]).

Entangled with — [[policy]] · [[staffing]] · [[report]]

Attested in schema.org — diversityPolicy · diversityStaffingReport

**Law — [[law]]: diversity is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words

## The math (matter-twin)

Four pure functions over an abundance vector (counts of each class present):

- `richness(abundances)` — count of classes with abundance > 0.
- `shannon(abundances)` — Shannon entropy H = −Σ pᵢ·ln(pᵢ) over the nonzero proportions (natural log; a single class gives 0). Standard: Shannon (1948).
- `simpson(abundances)` — Simpson diversity = 1 − Σ pᵢ². Standard: Simpson (1949).
- `evenness(abundances)` — Pielou's J = H / ln(S) where S is richness; returns 1 when S ≤ 1. Standard: Pielou (1966).

The `simpson = 1 − herfindahl` duality: Σ pᵢ² is exactly the Herfindahl–Hirschman concentration index. So `simpson` and `herfindahl` (from the decentralization atom) are the same quantity seen from opposite poles — diversity and concentration are one phenomenon, split by the double-entry sign.
