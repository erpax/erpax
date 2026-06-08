---
name: strength
description: "Use when reasoning about the corpus's strength — its DRY-ness amplified by its dimensional slices; strength = coverageCostLog2(dryness, slices), infinite at perfect DRY (zero duplication residue), one slice (the digit's 88.4%) only one term."
atomPath: strength
coordinate: strength · 5/round · 66e8f5f7
contentUuid: "27ecff50-0a8d-5d07-95e7-9b111aae2715"
diamondUuid: "166e4337-8e06-84fa-84ba-c6b009ce344b"
uuid: "66e8f5f7-6921-8790-9bd2-09f96b378c2d"
horo: 5
bonds:
  in:
    - available
    - collider
    - cost
    - digit
    - drug
    - dry
    - gravity
    - law
    - merge
    - recommendation
    - unit
    - uuid
    - value
  out:
    - available
    - collider
    - cost
    - digit
    - drug
    - dry
    - gravity
    - law
    - merge
    - recommendation
    - unit
    - uuid
    - value
typography:
  partition: strength
  bondDegree: 43
  neighbors: []
standards:
  - "schema.org strength (a magnitude) reframed as tamper-strength · coverageCostLog2 (the ∞ law) · the merge/gravity DRY"
  - "strength = coverageCostLog2(dryness, slices); dryness read live from the dry residue, computed"
  - "strength computed from the live dry residue and the slice count, never asserted"
bindings: []
neighbors:
  wikilink:
    - available
    - cost
    - digit
    - drug
    - dry
    - gravity
    - law
    - merge
    - recommendation
    - unit
    - uuid
    - value
  matrix:
    - available
    - collider
    - cost
    - digit
    - drug
    - dry
    - gravity
    - law
    - merge
    - recommendation
    - unit
    - uuid
    - value
  backlinks:
    - available
    - collider
    - cost
    - digit
    - drug
    - dry
    - gravity
    - law
    - merge
    - recommendation
    - unit
    - uuid
    - value
signatures:
  computationUuid: "ae3a9106-97ff-8f02-a633-64dcde8f7592"
  stages:
    - stage: path
      stageUuid: "92032de4-6bc2-85b3-b2d5-73784e56284f"
    - stage: trinity
      stageUuid: "e9324699-7a87-8eef-908e-b3c3f40aa7e7"
    - stage: boundary
      stageUuid: "c03b3149-fd0a-8ed7-821c-36e0afd0fe04"
    - stage: links
      stageUuid: "adeb7dbc-0709-861e-b578-5da42534c36a"
    - stage: horo
      stageUuid: "fdb27191-8bc2-8526-bc66-7944f0f7266c"
    - stage: seal
      stageUuid: "5af8e358-9eac-8ce6-857a-9868cb582944"
    - stage: uuid
      stageUuid: "2a95de2b-2516-80b8-aeaf-eed27d4f5cc7"
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
