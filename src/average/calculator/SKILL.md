---
name: calculator
description: "Use when taking the arithmetic mean of a number array anywhere in the corpus — the zero-guarded collapse of the repeated `sum/length` reduce across receivables, payables, and multi-currency analytics, where an empty array yields 0 (never NaN)."
atomPath: "average/calculator"
coordinate: "average/calculator · 5/round · e1d1b566"
contentUuid: "c1393514-f697-5fb0-86f6-25990aea0410"
diamondUuid: "ee15ef2c-1c14-8f4a-bca8-7575ef90ea5c"
uuid: "e1d1b566-eb32-89f7-9056-e8baf32c0a32"
horo: 5
typography:
  partition: average
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "1c3aef61-b521-859e-b427-42c4eabb82fe"
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
      stageUuid: "28ee7067-8d3d-84b3-a997-94ece1c33ae5"
    - stage: seal
      stageUuid: "05c242be-bee4-83f0-960f-5baba74b3e04"
    - stage: uuid
      stageUuid: "694fdd99-dcb1-8d26-8f62-7375244fa148"
version: 2
---
# average/calculator — the arithmetic-mean collapse

The one place the `values.reduce(sum) / length` reduce lives. Every receivables / payables / multi-currency analytics service that needs a mean folds onto this atom instead of re-deriving the divide, so the **empty-array guard** (⇒ 0, never NaN) is decided once. `calculateAverageRounded` is the same mean passed through `Math.round`.

Matter-twin: `src/average/calculator/index.ts` (`calculateAverage` · `calculateAverageRounded`).

**Law — [[law]]: the arithmetic mean is computed in exactly one place and is zero-guarded — an empty input is the additive identity 0, never NaN; every mean path collapses here ([[dry]]).**
