---
name: diversity
description: "Use when reasoning about diversity as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus."
atomPath: diversity
coordinate: "diversity · 5/round · 2726499e"
contentUuid: "0ec7a990-3627-5514-b3b0-eef850607fad"
diamondUuid: "fd7713e0-fb73-86c3-8b53-3a805f54d6f2"
uuid: "2726499e-2b8d-873d-b8da-e2a4d359ec9b"
horo: 5
typography:
  partition: diversity
  bondDegree: 38
standards:
  - Pielou (1966) The Measurement of Diversity in Different Types of Biological Collections
  - Shannon (1948) A Mathematical Theory of Communication — information entropy
  - "Simpson (1949) Measurement of Diversity — Nature 163:688"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "d9fcee43-97b5-89d7-ae3e-14c06591664d"
  stages:
    - stage: path
      stageUuid: "9f49f81e-351f-86a2-b999-4c9d3cd3b5c0"
    - stage: trinity
      stageUuid: "e03f5338-a717-823b-baf7-b2175dda4ef9"
    - stage: boundary
      stageUuid: "156323d3-3f6b-87b5-a01f-542b5eed2a4b"
    - stage: links
      stageUuid: "c67e6e1d-a34c-8373-b542-220a083d4917"
    - stage: horo
      stageUuid: "a76ea031-e2d9-8eea-84d7-d872351e8e5f"
    - stage: seal
      stageUuid: "870a460c-1ed6-8b78-8c5d-da478cabb81a"
    - stage: uuid
      stageUuid: "212852fd-d4ff-8da8-9338-5062a1d92d7e"
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
