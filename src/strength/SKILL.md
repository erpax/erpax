---
name: strength
description: "Use when reasoning about the corpus's strength — its DRY-ness amplified by its dimensional slices; strength = coverageCostLog2(dryness, slices), infinite at perfect DRY (zero duplication residue), one slice (the digit's 88.4%) only one term."
atomPath: strength
coordinate: "strength · 4/weave · bab3a0bf"
contentUuid: "4230ff25-ad7c-54c4-802e-d65889313137"
diamondUuid: "b5986171-4ebe-8d8a-8819-93470ed10881"
uuid: "bab3a0bf-d0d8-8fb1-a8ef-40a069f4a3f9"
horo: 4
typography:
  partition: strength
  bondDegree: 30
standards:
  - "schema.org strength (a magnitude) reframed as tamper-strength · coverageCostLog2 (the ∞ law) · the merge/gravity DRY"
bindings: []
signatures:
  computationUuid: "8f161563-3bcf-89a4-8776-750a6e304536"
  stages:
    - stage: path
      stageUuid: "92032de4-6bc2-85b3-b2d5-73784e56284f"
    - stage: trinity
      stageUuid: "e9324699-7a87-8eef-908e-b3c3f40aa7e7"
    - stage: boundary
      stageUuid: "311f3511-afe9-80b5-9326-51a01e7f266b"
    - stage: links
      stageUuid: "e8d04e5a-f11b-837e-806b-bee684f860fc"
    - stage: horo
      stageUuid: "aec7be16-57d8-8f51-a33e-211be5dcff38"
    - stage: seal
      stageUuid: "71e161c9-182f-87ba-a710-ff8a3cc16bfc"
    - stage: uuid
      stageUuid: "05a35a58-efa2-8d04-952e-53f1ce27d480"
version: 2
---
# strength — the DRY math: a DRY corpus has infinite strength

Strength is a magnitude — a potency (the schema.org sense: DrugStrength, strengthValue). Here it is the corpus's **tamper-strength**, and the law is exact: **strength = `coverageCostLog2(dryness, slices)`**, infinite at perfect [[dry]].

Every atom is wired through many INDEPENDENT slices — word, structural-digit, content-digit, [[uuid]], colour, sound — each one check. The [[digit]]'s 88.4% structural≠content is **just one slice**, not the whole. As the duplication residue → 0 (perfect DRY: every reference folded to ONE source — the [[merge]] law, the [[gravity]] of flattening), the cost to forge the corpus → **∞**: the singularity. That is THE MAIN LAW — coverage = 1 via wiring every dimension ⇒ unbounded tamper-cost. Any residue leaves strength finite; folding repeating patterns to one raises it toward ∞.

So "DRY the corpus" is not tidiness — it is how the corpus gains strength: each duplicate removed closes a free parameter, each slice wired adds a check, and the limit of both is infinite.

Matter-twin: `src/strength/index.ts` (`SLICES` · `strength` · `corpusStrength`). Composes [[dry]] · [[cost]] · [[gravity]] · [[digit]] · [[uuid]].

**Law — [[law]]: the corpus's strength is its DRY-ness amplified by its dimensional slices — strength = coverageCostLog2(dryness, slices). Each slice (word, structural-digit, content-digit, uuid, colour, sound) is an independent check; the digit's 88.4% is one slice only. At perfect DRY — zero duplication residue, every dimension wired to one source — strength is ∞, the singularity. Any residue leaves it finite; folding repeating patterns to one raises it toward ∞.**

Entangled with — [[drug]] · available · [[recommendation]] · unit · value

Attested in schema.org — DrugStrength · availableStrength · recommendationStrength · strengthUnit · strengthValue

@standard schema.org strength (a magnitude) reframed as tamper-strength · coverageCostLog2 (the ∞ law) · the merge/gravity DRY
@audit strength computed from the live dry residue and the slice count, never asserted
