---
name: calculator
description: "Use when taking the arithmetic mean of a number array anywhere in the corpus — the zero-guarded collapse of the repeated `sum/length` reduce across receivables, payables, and multi-currency analytics, where an empty array yields 0 (never NaN)."
atomPath: "average/calculator"
coordinate: "average/calculator · 4/weave · 42c2fd01"
contentUuid: "d57bf158-e5d0-5db8-8607-acda63a4afb0"
diamondUuid: "ca8802c2-13c3-89f7-9741-2adb1d1e3293"
uuid: "42c2fd01-f438-857a-8750-637d94898e71"
horo: 4
typography:
  partition: average
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "f5ea74f9-5e78-8458-a00c-f6587c38b7d7"
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
      stageUuid: "aed3faa9-7dd6-8899-8d02-c59f42010b68"
    - stage: seal
      stageUuid: "05c242be-bee4-83f0-960f-5baba74b3e04"
    - stage: uuid
      stageUuid: "37df15ce-6e4e-8e9f-8dd0-8f781fbf706e"
version: 2
---
# average/calculator — the arithmetic-mean collapse

The one place the `values.reduce(sum) / length` reduce lives. Every receivables / payables / multi-currency analytics service that needs a mean folds onto this atom instead of re-deriving the divide, so the **empty-array guard** (⇒ 0, never NaN) is decided once. `calculateAverageRounded` is the same mean passed through `Math.round`.

Matter-twin: `src/average/calculator/index.ts` (`calculateAverage` · `calculateAverageRounded`).

**Law — [[law]]: the arithmetic mean is computed in exactly one place and is zero-guarded — an empty input is the additive identity 0, never NaN; every mean path collapses here ([[dry]]).**
