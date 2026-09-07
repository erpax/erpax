---
name: chart
description: "Use when rendering a chart through the analog aura — mapping each numeric value of a series to a spectrum colour by its normalized position, so the data becomes a coherent, deterministic colour field (same data, same colours)."
atomPath: "quantum/chart"
coordinate: "quantum/chart · 1/base · 3287ddb4"
contentUuid: "8b2689be-0c73-591d-af81-d47a39981cf3"
diamondUuid: "08de0af4-e098-8b79-bcb4-deedc4f0e715"
uuid: "3287ddb4-c993-86cf-aa44-0aa2cc09ecda"
horo: 1
typography:
  partition: quantum
  bondDegree: 29
standards:
  - "A432 tuning; the 7-chakra visible spectrum (via [[color]])"
bindings: []
signatures:
  computationUuid: "d02a67bc-3e88-8aec-8053-8f13a7705ba7"
  stages:
    - stage: path
      stageUuid: "42fe7299-f2e8-8462-b7dc-998c878c1170"
    - stage: trinity
      stageUuid: "9f52c616-b307-8bae-8eb9-235e90ac3776"
    - stage: boundary
      stageUuid: "b94f7da7-c879-82e4-b20b-79b087f17f63"
    - stage: links
      stageUuid: "d6365a41-0543-8396-8918-89964a426050"
    - stage: horo
      stageUuid: "f4a76c64-ecbf-84f7-a163-d745d08b91e5"
    - stage: seal
      stageUuid: "dd9d2620-36cb-8891-8e7b-b377e51a1b85"
    - stage: uuid
      stageUuid: "9a8b65a2-4e6c-89c3-8d49-698edcfa4d58"
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
    computationUuid: "d02a67bc-3e88-8aec-8053-8f13a7705ba7"
    contentUuid: "8b2689be-0c73-591d-af81-d47a39981cf3"
version: 2
---
# quantum/chart — render a chart as a colour field (the analog aura)

The [[quantum]] facet of [[chart]]: it takes the pure chart spec (a [[series]] with its range and a [[scale]] normalizer) and renders each value as a colour, projecting the data onto the A432 [[color]] spectrum. Each value's normalized position ([0,1]) selects a chakra colour (root → crown) — the **analog aura** over the chart ([[analog]] · [[signal]]). The mapping is pure: the same chart renders the same colours, every time.

Matter-twin: `src/quantum/chart/index.ts` (`colors`). Composes [[chart]] (the spec) · [[color]] (the A432 spectrum) · [[analog]] · [[signal]] · [[quantum]].

**Law — [[law]]: rendering is deterministic — a chart's values map one-to-one onto the [[color]] spectrum by their normalized position, so the same data is always the same colour field (no rendering state, just the spec projected through the aura).**

@standard A432 tuning; the 7-chakra visible spectrum (via [[color]])
@audit deterministic — same data renders the same colours

<sub>content-uuid `8b2689be-0c73-591d-af81-d47a39981cf3` · account `quantum/chart` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
