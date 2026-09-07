---
name: calculator
description: "Use when taking the arithmetic mean of a number array anywhere in the corpus — the zero-guarded collapse of the repeated `sum/length` reduce across receivables, payables, and multi-currency analytics, where an empty array yields 0 (never NaN)."
atomPath: "average/calculator"
coordinate: "average/calculator · 5/round · 5760cbd3"
contentUuid: "87f368f2-60a7-58d4-8cf0-5d62a37174d2"
diamondUuid: "c1c2114e-1a9b-801e-aace-7e7eadbfe447"
uuid: "5760cbd3-2771-8349-bd12-95c8477e47b2"
horo: 5
typography:
  partition: average
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "cbef68eb-cf2f-889d-bf92-bc6f35a0d0c4"
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
      stageUuid: "fe34598d-537d-8f72-b994-b93c275cdf51"
    - stage: seal
      stageUuid: "05c242be-bee4-83f0-960f-5baba74b3e04"
    - stage: uuid
      stageUuid: "60c63a82-b4d5-84d4-b615-3dcd3817459d"
version: 2
---
# average/calculator — the arithmetic-mean collapse

The one place the `values.reduce(sum) / length` reduce lives. Every receivables / payables / multi-currency analytics service that needs a mean folds onto this atom instead of re-deriving the divide, so the **empty-array guard** (⇒ 0, never NaN) is decided once. `calculateAverageRounded` is the same mean passed through `Math.round`.

Matter-twin: `src/average/calculator/index.ts` (`calculateAverage` · `calculateAverageRounded`).

**Law — [[law]]: the arithmetic mean is computed in exactly one place and is zero-guarded — an empty input is the additive identity 0, never NaN; every mean path collapses here ([[dry]]).**
