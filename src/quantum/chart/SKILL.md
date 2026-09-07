---
name: chart
description: "Use when rendering a chart through the analog aura — mapping each numeric value of a series to a spectrum colour by its normalized position, so the data becomes a coherent, deterministic colour field (same data, same colours)."
atomPath: "quantum/chart"
coordinate: "quantum/chart · 2/share · 673e9295"
contentUuid: "e0eef5ce-d477-5a92-b7f1-9bdf05017f3c"
diamondUuid: "fbd8a747-6ce4-8689-839d-eecfdb1d0f06"
uuid: "673e9295-700e-88af-9d7e-d1a8070c1524"
horo: 2
typography:
  partition: quantum
  bondDegree: 29
standards:
  - "A432 tuning; the 7-chakra visible spectrum (via [[color]])"
bindings: []
signatures:
  computationUuid: "ec122a6c-6598-89d4-945b-a082f410b456"
  stages:
    - stage: path
      stageUuid: "42fe7299-f2e8-8462-b7dc-998c878c1170"
    - stage: trinity
      stageUuid: "9f52c616-b307-8bae-8eb9-235e90ac3776"
    - stage: boundary
      stageUuid: "b94f7da7-c879-82e4-b20b-79b087f17f63"
    - stage: links
      stageUuid: "1c16c50f-5699-86a4-8119-77ca8bf3cccd"
    - stage: horo
      stageUuid: "6299b801-51b3-8f86-99e8-e0773884dd91"
    - stage: seal
      stageUuid: "dd9d2620-36cb-8891-8e7b-b377e51a1b85"
    - stage: uuid
      stageUuid: "7caa3dc1-9fb2-8c21-813c-6ce8b2fb0403"
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
    computationUuid: "ec122a6c-6598-89d4-945b-a082f410b456"
    contentUuid: "e0eef5ce-d477-5a92-b7f1-9bdf05017f3c"
version: 2
---
# quantum/chart — render a chart as a colour field (the analog aura)

The [[quantum]] facet of [[chart]]: it takes the pure chart spec (a [[series]] with its range and a [[scale]] normalizer) and renders each value as a colour, projecting the data onto the A432 [[color]] spectrum. Each value's normalized position ([0,1]) selects a chakra colour (root → crown) — the **analog aura** over the chart ([[analog]] · [[signal]]). The mapping is pure: the same chart renders the same colours, every time.

Matter-twin: `src/quantum/chart/index.ts` (`colors`). Composes [[chart]] (the spec) · [[color]] (the A432 spectrum) · [[analog]] · [[signal]] · [[quantum]].

**Law — [[law]]: rendering is deterministic — a chart's values map one-to-one onto the [[color]] spectrum by their normalized position, so the same data is always the same colour field (no rendering state, just the spec projected through the aura).**

@standard A432 tuning; the 7-chakra visible spectrum (via [[color]])
@audit deterministic — same data renders the same colours

<sub>content-uuid `e0eef5ce-d477-5a92-b7f1-9bdf05017f3c` · account `quantum/chart` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
