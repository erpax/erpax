---
name: diversity
description: "Use when reasoning about diversity as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus."
atomPath: diversity
coordinate: "diversity · 5/round · 5089a329"
contentUuid: "e03e7981-d069-524c-8fd8-031ca0cd9fb1"
diamondUuid: "58da91f7-ad62-8f32-b655-6cca99ddee6e"
uuid: "5089a329-7bd0-8a4f-b5c9-7b9f3fcf9f55"
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
  computationUuid: "ad6ca285-f207-8011-a9cc-ba54d422a4d2"
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
      stageUuid: "8ebdb819-efad-87d0-ad8d-7659148be5b0"
    - stage: seal
      stageUuid: "870a460c-1ed6-8b78-8c5d-da478cabb81a"
    - stage: uuid
      stageUuid: "558bfd9b-2480-81db-9ff7-9848a5bd3d31"
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
