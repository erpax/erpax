---
name: collider
description: "Use when collapsing the corpus's conventions into one tamper-cost verdict — pure math, no default; joint coverage is the product of each convention-check's computed coverage, and the tamper-cost is coverageCostLog2 of it, infinite only when every convention is computed clean (zero entropy)."
atomPath: collider
coordinate: collider · 2/share · 35baa33a
contentUuid: "695937c0-f5ad-505a-a980-e33e6e99cdcb"
diamondUuid: "290ae99f-7abc-8b7b-85e9-f5e73ce430fc"
uuid: "35baa33a-2646-880f-a884-4a24ff0ba834"
horo: 2
bonds:
  in:
    - convention
    - cost
    - default
    - dry
    - exported
    - law
    - sealed
    - strength
    - tamper
  out:
    - convention
    - cost
    - default
    - dry
    - exported
    - law
    - sealed
    - strength
    - tamper
typography:
  partition: collider
  bondDegree: 28
  neighbors: []
standards:
  - "coverageCostLog2 (the ∞ law) · the product of independent convention coverages · computed-not-hardcoded"
  - "each check is a live computation in @/convention; the verdict is coverageCostLog2 of the product, never assumed"
  - "every check is a live computation; coverages bounded by construction, atom count positive by architecture; the verdict is never assumed"
bindings: []
neighbors:
  wikilink:
    - cost
    - default
    - dry
    - law
    - strength
    - tamper
  matrix:
    - convention
    - cost
    - default
    - dry
    - exported
    - law
    - sealed
    - strength
    - tamper
  backlinks:
    - convention
    - cost
    - default
    - dry
    - exported
    - law
    - sealed
    - strength
    - tamper
signatures:
  computationUuid: "b0b06ddd-655d-8d7e-9bf7-b1c92e510fe0"
  stages:
    - stage: path
      stageUuid: "7e176474-89a3-8875-8b92-9243e294b0b5"
    - stage: trinity
      stageUuid: "452f7733-4bac-813e-b1d8-79f4277dddc7"
    - stage: boundary
      stageUuid: "c0120bc7-1752-8de9-8b73-f410a7f36b4e"
    - stage: links
      stageUuid: "af170a11-c9e6-82b9-afc4-c629d4d38c00"
    - stage: horo
      stageUuid: "32091403-389b-8963-a976-1248509b199f"
    - stage: seal
      stageUuid: "1c1de4f2-7837-8f64-8574-e3d16bf795d2"
    - stage: uuid
      stageUuid: "e6a636a6-34bc-8d28-8c6b-f7ef554fc050"
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
