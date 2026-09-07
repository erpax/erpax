---
name: calculator
description: "Use when taking the arithmetic mean of a number array anywhere in the corpus — the zero-guarded collapse of the repeated `sum/length` reduce across receivables, payables, and multi-currency analytics, where an empty array yields 0 (never NaN)."
atomPath: "average/calculator"
coordinate: "average/calculator · 8/crest · f90a8174"
contentUuid: "58b366b8-9a1c-5809-abd9-ba4e8dc6f8e1"
diamondUuid: "aadbc1f4-6699-860d-b932-c5ba0ebc2080"
uuid: "f90a8174-ccf1-8a31-8dd9-dd744f4daed4"
horo: 8
typography:
  partition: average
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "655fa490-f5a8-876b-9e33-c4f8660ecfc1"
  stages:
    - stage: path
      stageUuid: "9186c0ad-5e86-86aa-92c7-2d2e72b9a879"
    - stage: trinity
      stageUuid: "fae422a3-8b7f-822f-bb5b-0929a64d15db"
    - stage: boundary
      stageUuid: "54d87ad5-c1a0-8695-8769-9e41606007a3"
    - stage: links
      stageUuid: "0d7c30cc-2fc0-8ab4-86d7-9b35068a8015"
    - stage: horo
      stageUuid: "e1639d45-b654-8eec-ac2f-fda391826741"
    - stage: seal
      stageUuid: "05c242be-bee4-83f0-960f-5baba74b3e04"
    - stage: uuid
      stageUuid: "51b5158f-16f4-8b60-88dd-0ea81b0d0fe9"
version: 2
---
# average/calculator — the arithmetic-mean collapse

The one place the `values.reduce(sum) / length` reduce lives. Every receivables / payables / multi-currency analytics service that needs a mean folds onto this atom instead of re-deriving the divide, so the **empty-array guard** (⇒ 0, never NaN) is decided once. `calculateAverageRounded` is the same mean passed through `Math.round`.

Matter-twin: `src/average/calculator/index.ts` (`calculateAverage` · `calculateAverageRounded`).

**Law — [[law]]: the arithmetic mean is computed in exactly one place and is zero-guarded — an empty input is the additive identity 0, never NaN; every mean path collapses here ([[dry]]).**
