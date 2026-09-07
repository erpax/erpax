---
name: diversity
description: "Use when reasoning about diversity as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus."
atomPath: diversity
coordinate: "diversity · 1/base · 4b463567"
contentUuid: "ec09ab08-4e31-5ca1-ac0f-4079982fce71"
diamondUuid: "bc5318e5-132e-85f3-a8bb-605a18e4fae6"
uuid: "4b463567-329a-869b-8ab8-d53895cad3d5"
horo: 1
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
  computationUuid: "40a43c66-f7de-85dd-96d4-6373cc8bf75f"
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
      stageUuid: "b4e21375-eaea-80a7-b1db-fa9a06638d8d"
    - stage: seal
      stageUuid: "870a460c-1ed6-8b78-8c5d-da478cabb81a"
    - stage: uuid
      stageUuid: "218e2c06-ad09-81e8-ae29-91d4564dfc92"
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
