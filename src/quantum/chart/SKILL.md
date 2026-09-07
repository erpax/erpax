---
name: chart
description: "Use when rendering a chart through the analog aura — mapping each numeric value of a series to a spectrum colour by its normalized position, so the data becomes a coherent, deterministic colour field (same data, same colours)."
atomPath: "quantum/chart"
coordinate: "quantum/chart · 4/weave · b8d59bcf"
contentUuid: "085f9495-1f7e-55ad-be84-f4c207dee021"
diamondUuid: "44587f4b-5828-8d68-88c3-47e7d0437644"
uuid: "b8d59bcf-8c4d-857d-8757-8ed858bce517"
horo: 4
typography:
  partition: quantum
  bondDegree: 29
standards:
  - "A432 tuning; the 7-chakra visible spectrum (via [[color]])"
bindings: []
signatures:
  computationUuid: "cc33cd42-ddfc-8f85-8543-6596fe232236"
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
      stageUuid: "57ef9e83-bc78-8db2-8df7-d9376cba8732"
    - stage: seal
      stageUuid: "dd9d2620-36cb-8891-8e7b-b377e51a1b85"
    - stage: uuid
      stageUuid: "84137d6c-225e-8207-8dcb-f755431ff974"
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
    computationUuid: "cc33cd42-ddfc-8f85-8543-6596fe232236"
    contentUuid: "085f9495-1f7e-55ad-be84-f4c207dee021"
version: 2
---
# quantum/chart — render a chart as a colour field (the analog aura)

The [[quantum]] facet of [[chart]]: it takes the pure chart spec (a [[series]] with its range and a [[scale]] normalizer) and renders each value as a colour, projecting the data onto the A432 [[color]] spectrum. Each value's normalized position ([0,1]) selects a chakra colour (root → crown) — the **analog aura** over the chart ([[analog]] · [[signal]]). The mapping is pure: the same chart renders the same colours, every time.

Matter-twin: `src/quantum/chart/index.ts` (`colors`). Composes [[chart]] (the spec) · [[color]] (the A432 spectrum) · [[analog]] · [[signal]] · [[quantum]].

**Law — [[law]]: rendering is deterministic — a chart's values map one-to-one onto the [[color]] spectrum by their normalized position, so the same data is always the same colour field (no rendering state, just the spec projected through the aura).**

@standard A432 tuning; the 7-chakra visible spectrum (via [[color]])
@audit deterministic — same data renders the same colours

<sub>content-uuid `085f9495-1f7e-55ad-be84-f4c207dee021` · account `quantum/chart` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
