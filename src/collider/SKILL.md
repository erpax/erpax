---
name: collider
description: "Use when collapsing the corpus's conventions into one tamper-cost verdict — pure math, no default; joint coverage is the product of each convention-check's computed coverage, and the tamper-cost is coverageCostLog2 of it, infinite only when every convention is computed clean (zero entropy)."
atomPath: collider
coordinate: "collider · 4/weave · 2bc4ea46"
contentUuid: "42d01048-8a90-5533-b436-a40e3cb3fb8c"
diamondUuid: "5b0a30ca-cf73-8484-9936-c7368158cbc6"
uuid: "2bc4ea46-b53a-8b97-9e04-7db6b341d50e"
horo: 4
typography:
  partition: collider
  bondDegree: 31
standards:
  - "coverageCostLog2 (the ∞ law) · the product of independent convention coverages · computed-not-hardcoded"
bindings: []
signatures:
  computationUuid: "f1f9f864-7571-8c1f-88f9-07d1d1fcc3ab"
  stages:
    - stage: path
      stageUuid: "7e176474-89a3-8875-8b92-9243e294b0b5"
    - stage: trinity
      stageUuid: "452f7733-4bac-813e-b1d8-79f4277dddc7"
    - stage: boundary
      stageUuid: "c26e8783-dfd6-810c-a2e0-66ff93b188bc"
    - stage: links
      stageUuid: "af170a11-c9e6-82b9-afc4-c629d4d38c00"
    - stage: horo
      stageUuid: "02a30027-3f42-80bc-a51b-847a50dec420"
    - stage: seal
      stageUuid: "682ee176-b3f9-8b44-86a1-627702e3470d"
    - stage: uuid
      stageUuid: "9b4d7618-bea8-8b67-aabb-ef9a3a053ee6"
version: 2
---
# collider — the conventions collided, pure math, no default

The collider answers one question with **only math**: how hard is the corpus to forge? It runs each convention-check — import-from-index purity ([[tamper]]), [[dry]]-ness, … — as a live computation that returns a coverage in [0,1] (each convention is a [[law]]), then **collides** them: the joint coverage is the **product** (every convention must hold at once), and the tamper-cost is `coverageCostLog2(joint, n)`.

It has **no default**. It does not assume pass; it does not assume fail; there is no clamp and no fallback. The verdict is the product of the computed coverages — nothing else. Zero entropy — every convention computed clean (coverage 1) — is **∞** by the arithmetic, not by a stance. Any violation drops a coverage below 1 and the product is finite — again by the arithmetic. This is why the [[default]] is by architecture: the coverages are bounded [0,1] by construction and the atom count is positive by architecture, so no default is ever defined.

The gates that let `aura/scan.mjs`'s duplicated `norm` and the config's relative import slip past were missing checks — the collider is where every convention-check composes into one number, so a gap is a missing factor in the product, not a missing opinion. Add a check and the product tightens; the limit is ∞.

Matter-twin: `src/collider/index.ts` (`Check` · `collide` · `corpusChecks` · `corpusCollider`). Composes [[cost]] · [[tamper]] · [[dry]] · [[strength]] · [[default]].

**Law — [[law]]: the collider has no default — it computes the corpus's tamper-cost purely from the convention-checks' coverages. Joint coverage is the product (every convention holds at once); tamper-cost is coverageCostLog2(joint, n). Zero entropy — every check computed clean — is ∞ by the math, not by assumption. No default-pass, no default-fail, no clamp, no fallback: only math.**

@audit every check is a live computation; coverages bounded by construction, atom count positive by architecture; the verdict is never assumed
@standard coverageCostLog2 (the ∞ law) · the product of independent convention coverages · computed-not-hardcoded
