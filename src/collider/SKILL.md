---
name: collider
description: "Use when collapsing the corpus's conventions into one tamper-cost verdict — pure math, no default; joint coverage is the product of each convention-check's computed coverage, and the tamper-cost is coverageCostLog2 of it, infinite only when every convention is computed clean (zero entropy)."
atomPath: collider
coordinate: "collider · 2/share · f85ec62c"
contentUuid: "758008a8-b448-5406-8105-61aee070ce45"
diamondUuid: "e8bfb162-156e-864f-9acc-a07fbd503a79"
uuid: "f85ec62c-77f7-8cf0-b41e-d92de49ba719"
horo: 2
typography:
  partition: collider
  bondDegree: 31
standards:
  - "coverageCostLog2 (the ∞ law) · the product of independent convention coverages · computed-not-hardcoded"
bindings: []
signatures:
  computationUuid: "6ffcc408-12f6-8bfa-8cbf-4955392bcd4e"
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
      stageUuid: "18424ae5-8b5c-8663-8844-d03278d5ad5e"
    - stage: seal
      stageUuid: "682ee176-b3f9-8b44-86a1-627702e3470d"
    - stage: uuid
      stageUuid: "f69c00ed-09cd-86a2-a97a-f60dd16ded79"
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
