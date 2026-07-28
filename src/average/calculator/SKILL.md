---
name: calculator
description: "Use when taking the arithmetic mean of a number array anywhere in the corpus — the zero-guarded collapse of the repeated `sum/length` reduce across receivables, payables, and multi-currency analytics, where an empty array yields 0 (never NaN)."
atomPath: "average/calculator"
coordinate: "average/calculator · 1/base · 1939ef13"
contentUuid: "a7f6a125-a1d5-5036-860d-b946ba13ee2c"
diamondUuid: "f245b180-2ee8-8aab-a6d7-454f47742525"
uuid: "1939ef13-0887-83dd-8e0e-1e21342da0b7"
horo: 1
bonds:
  in:
    - calculator
    - dry
    - law
    - medical
  out:
    - calculator
    - dry
    - law
    - medical
typography:
  partition: average
  bondDegree: 30
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - dry
    - law
  matrix:
    - calculator
    - dry
    - law
    - medical
  backlinks:
    - calculator
    - dry
    - law
    - medical
signatures:
  computationUuid: "f7f052fb-229f-8a5c-996c-e7fb8f6f6def"
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
      stageUuid: "e3d92602-d0fc-82c8-9194-9b76b16f72b5"
    - stage: seal
      stageUuid: "05c242be-bee4-83f0-960f-5baba74b3e04"
    - stage: uuid
      stageUuid: "52b71243-ffc6-8f85-81a7-45794a5281e0"
version: 2
---
# average/calculator — the arithmetic-mean collapse

The one place the `values.reduce(sum) / length` reduce lives. Every receivables / payables / multi-currency analytics service that needs a mean folds onto this atom instead of re-deriving the divide, so the **empty-array guard** (⇒ 0, never NaN) is decided once. `calculateAverageRounded` is the same mean passed through `Math.round`.

Matter-twin: `src/average/calculator/index.ts` (`calculateAverage` · `calculateAverageRounded`).

**Law — [[law]]: the arithmetic mean is computed in exactly one place and is zero-guarded — an empty input is the additive identity 0, never NaN; every mean path collapses here ([[dry]]).**
