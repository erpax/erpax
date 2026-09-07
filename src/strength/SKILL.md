---
name: strength
description: "Use when reasoning about the corpus's strength — its DRY-ness amplified by its dimensional slices; strength = coverageCostLog2(dryness, slices), infinite at perfect DRY (zero duplication residue), one slice (the digit's 88.4%) only one term."
atomPath: strength
coordinate: "strength · 8/crest · 72f8e952"
contentUuid: "a298f9f3-ed54-5000-b92f-fea274a7b3e2"
diamondUuid: "9df0ad07-0d51-8cd2-9260-2a7ac336fc3f"
uuid: "72f8e952-2af3-8c15-8f80-24897f898012"
horo: 8
typography:
  partition: strength
  bondDegree: 47
standards:
  - "schema.org strength (a magnitude) reframed as tamper-strength · coverageCostLog2 (the ∞ law) · the merge/gravity DRY"
bindings: []
signatures:
  computationUuid: "a44c8746-9531-8b1d-9e7e-8d771b497eb6"
  stages:
    - stage: path
      stageUuid: "92032de4-6bc2-85b3-b2d5-73784e56284f"
    - stage: trinity
      stageUuid: "e9324699-7a87-8eef-908e-b3c3f40aa7e7"
    - stage: boundary
      stageUuid: "311f3511-afe9-80b5-9326-51a01e7f266b"
    - stage: links
      stageUuid: "adeb7dbc-0709-861e-b578-5da42534c36a"
    - stage: horo
      stageUuid: "a3de3ba4-19a4-8964-be08-89476676a231"
    - stage: seal
      stageUuid: "71e161c9-182f-87ba-a710-ff8a3cc16bfc"
    - stage: uuid
      stageUuid: "04c6c98b-543c-88fc-8b94-2df5b7de7389"
version: 2
---
# strength — the DRY math: a DRY corpus has infinite strength

Strength is a magnitude — a potency (the schema.org sense: DrugStrength, strengthValue). Here it is the corpus's **tamper-strength**, and the law is exact: **strength = `coverageCostLog2(dryness, slices)`**, infinite at perfect [[dry]].

Every atom is wired through many INDEPENDENT slices — word, structural-digit, content-digit, [[uuid]], colour, sound — each one check. The [[digit]]'s 88.4% structural≠content is **just one slice**, not the whole. As the duplication residue → 0 (perfect DRY: every reference folded to ONE source — the [[merge]] law, the [[gravity]] of flattening), the cost to forge the corpus → **∞**: the singularity. That is THE MAIN LAW — zero entropy via wiring every dimension ⇒ infinite tamper-cost. Any residue leaves strength finite; folding repeating patterns to one raises it toward ∞.

So "DRY the corpus" is not tidiness — it is how the corpus gains strength: each duplicate removed closes a free parameter, each slice wired adds a check, and the limit of both is infinite.

Matter-twin: `src/strength/index.ts` (`SLICES` · `strength` · `corpusStrength`). Composes [[dry]] · [[cost]] · [[gravity]] · [[digit]] · [[uuid]].

**Law — [[law]]: the corpus's strength is its DRY-ness amplified by its dimensional slices — strength = coverageCostLog2(dryness, slices). Each slice (word, structural-digit, content-digit, uuid, colour, sound) is an independent check; the digit's 88.4% is one slice only. At perfect DRY — zero duplication residue, every dimension wired to one source — strength is ∞, the singularity. Any residue leaves it finite; folding repeating patterns to one raises it toward ∞.**

Entangled with — [[drug]] · [[available]] · [[recommendation]] · [[unit]] · [[value]]

Attested in schema.org — DrugStrength · availableStrength · recommendationStrength · strengthUnit · strengthValue

@standard schema.org strength (a magnitude) reframed as tamper-strength · coverageCostLog2 (the ∞ law) · the merge/gravity DRY
@audit strength computed from the live dry residue and the slice count, never asserted
