---
name: calculator
description: "Use when taking the arithmetic mean of a number array anywhere in the corpus — the zero-guarded collapse of the repeated `sum/length` reduce across receivables, payables, and multi-currency analytics, where an empty array yields 0 (never NaN)."
atomPath: "average/calculator"
coordinate: "average/calculator · 2/share · b7c6ad72"
contentUuid: "dd52e151-9535-510f-83b5-0f22088a0718"
diamondUuid: "4728dd80-ca2d-8e6b-b276-ea887a4d289e"
uuid: "b7c6ad72-9f64-8aa8-9f36-572e5e3a0892"
horo: 2
typography:
  partition: average
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "ec6cd631-7bc1-8bc1-9bda-d3ed2b4bc31c"
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
      stageUuid: "2765129b-83ab-8d13-8820-83e9983ac6df"
    - stage: seal
      stageUuid: "05c242be-bee4-83f0-960f-5baba74b3e04"
    - stage: uuid
      stageUuid: "ccf80c35-3721-8d1f-a2d5-415459b67369"
version: 2
---
# average/calculator — the arithmetic-mean collapse

The one place the `values.reduce(sum) / length` reduce lives. Every receivables / payables / multi-currency analytics service that needs a mean folds onto this atom instead of re-deriving the divide, so the **empty-array guard** (⇒ 0, never NaN) is decided once. `calculateAverageRounded` is the same mean passed through `Math.round`.

Matter-twin: `src/average/calculator/index.ts` (`calculateAverage` · `calculateAverageRounded`).

**Law — [[law]]: the arithmetic mean is computed in exactly one place and is zero-guarded — an empty input is the additive identity 0, never NaN; every mean path collapses here ([[dry]]).**
