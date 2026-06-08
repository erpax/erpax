---
name: chart
description: "Use when rendering a chart through the analog aura — mapping each numeric value of a series to a spectrum colour by its normalized position, so the data becomes a coherent, deterministic colour field (same data, same colours)."
atomPath: quantum/chart
coordinate: quantum/chart · 4/weave · 2dcb6dd1
contentUuid: "9ed4e84e-6dc8-5fc2-b817-37a858bd9c9d"
diamondUuid: "4fa34026-4518-8c7b-b006-8a7c3b21d827"
uuid: "2dcb6dd1-54ec-863b-9b16-9c45ad105b17"
horo: 4
bonds:
  in:
    - chart
    - color
    - data
    - law
    - quantum
    - scale
    - series
  out:
    - chart
    - color
    - data
    - law
    - quantum
    - scale
    - series
typography:
  partition: quantum
  bondDegree: 29
  neighbors: []
standards:
  - "A432 tuning; the 7-chakra visible spectrum (via [[color]])"
bindings: []
neighbors:
  wikilink:
    - analog
    - chart
    - color
    - law
    - quantum
    - scale
    - series
    - signal
  matrix:
    - chart
    - color
    - data
    - law
    - quantum
    - scale
    - series
  backlinks:
    - chart
    - color
    - data
    - law
    - quantum
    - scale
    - series
signatures:
  computationUuid: "0f165823-1801-8675-be53-287119c25cba"
  stages:
    - stage: path
      stageUuid: "42fe7299-f2e8-8462-b7dc-998c878c1170"
    - stage: trinity
      stageUuid: "9f52c616-b307-8bae-8eb9-235e90ac3776"
    - stage: boundary
      stageUuid: "8e26ce81-5c60-87c5-8a8f-b1e7a6fecbf4"
    - stage: links
      stageUuid: "180bf40f-cb68-8e48-ae66-5b3b81f6f281"
    - stage: horo
      stageUuid: "4e7d523a-2d27-84ac-bc1c-87bfaa22a5e5"
    - stage: seal
      stageUuid: "dd9d2620-36cb-8891-8e7b-b377e51a1b85"
    - stage: uuid
      stageUuid: "9a6f1d54-fffc-81e6-8e20-d3b40c20a64b"
quantum:
  superposition:
    - chart
    - color
    - data
    - law
    - quantum
    - scale
    - series
    - superposition
  collapse:
    - "A432 tuning; the 7-chakra visible spectrum (via [[color]])"
    - "Use when rendering a chart through the analog aura — mapping each numeric value of a series to a spectrum colour by its normalized position, so the data becomes a coherent, deterministic colour field (same data, same colours)."
    - deterministic — same data renders the same colours
    - "matter-twin:src/quantum/chart/index.ts"
    - "rendering is deterministic — a chart's values map one-to-one onto the [[color]] spectrum by their normalized position, so the same data is always the same colour field (no rendering state, just the spec projected through the aura)."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "0f165823-1801-8675-be53-287119c25cba"
    contentUuid: "9ed4e84e-6dc8-5fc2-b817-37a858bd9c9d"
version: 2
---
# quantum/chart — render a chart as a colour field (the analog aura)

The [[quantum]] facet of [[chart]]: it takes the pure chart spec (a [[series]] with its range and a [[scale]] normalizer) and renders each value as a colour, projecting the data onto the A432 [[color]] spectrum. Each value's normalized position ([0,1]) selects a chakra colour (root → crown) — the **analog aura** over the chart ([[analog]] · [[signal]]). The mapping is pure: the same chart renders the same colours, every time.

Matter-twin: `src/quantum/chart/index.ts` (`colors`). Composes [[chart]] (the spec) · [[color]] (the A432 spectrum) · [[analog]] · [[signal]] · [[quantum]].

**Law — [[law]]: rendering is deterministic — a chart's values map one-to-one onto the [[color]] spectrum by their normalized position, so the same data is always the same colour field (no rendering state, just the spec projected through the aura).**

@standard A432 tuning; the 7-chakra visible spectrum (via [[color]])
@audit deterministic — same data renders the same colours

<sub>content-uuid `9ed4e84e-6dc8-5fc2-b817-37a858bd9c9d` · account `quantum/chart` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
