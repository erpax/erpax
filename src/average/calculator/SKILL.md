---
name: calculator
description: "Use when taking the arithmetic mean of a number array anywhere in the corpus — the zero-guarded collapse of the repeated `sum/length` reduce across receivables, payables, and multi-currency analytics, where an empty array yields 0 (never NaN)."
atomPath: average/calculator
coordinate: average/calculator · 1/base · 91991514
contentUuid: "5e8598e7-15bd-5577-8f06-782a2f8fdcba"
diamondUuid: "51863ff0-3d44-8348-944a-e90a1fabf76b"
uuid: "91991514-606f-84e3-9876-45341ab64553"
horo: 1
bonds:
  in:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - risk
    - sti
  out:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - risk
    - sti
typography:
  partition: average
  bondDegree: 29
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - dry
    - law
  matrix:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - risk
    - sti
  backlinks:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - risk
    - sti
signatures:
  computationUuid: "4e8073af-e59c-8e8f-8aec-2f7791743e71"
  stages:
    - stage: path
      stageUuid: "9186c0ad-5e86-86aa-92c7-2d2e72b9a879"
    - stage: trinity
      stageUuid: "fae422a3-8b7f-822f-bb5b-0929a64d15db"
    - stage: boundary
      stageUuid: "81330a45-aafa-84a2-be52-418a6fcb16ee"
    - stage: links
      stageUuid: "0d7c30cc-2fc0-8ab4-86d7-9b35068a8015"
    - stage: horo
      stageUuid: "7a65c59b-60d3-841a-8650-94c1624a0798"
    - stage: seal
      stageUuid: "05c242be-bee4-83f0-960f-5baba74b3e04"
    - stage: uuid
      stageUuid: "386c9a3b-8c3a-8e6a-b03d-a8fff4230909"
version: 2
---
# average/calculator — the arithmetic-mean collapse

The one place the `values.reduce(sum) / length` reduce lives. Every receivables / payables / multi-currency analytics service that needs a mean folds onto this atom instead of re-deriving the divide, so the **empty-array guard** (⇒ 0, never NaN) is decided once. `calculateAverageRounded` is the same mean passed through `Math.round`.

Matter-twin: `src/average/calculator/index.ts` (`calculateAverage` · `calculateAverageRounded`).

**Law — [[law]]: the arithmetic mean is computed in exactly one place and is zero-guarded — an empty input is the additive identity 0, never NaN; every mean path collapses here ([[dry]]).**
