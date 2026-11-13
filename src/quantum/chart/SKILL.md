---
name: chart
description: "Use when rendering a chart through the analog aura — mapping each numeric value of a series to a spectrum colour by its normalized position, so the data becomes a coherent, deterministic colour field (same data, same colours)."
atomPath: "quantum/chart"
coordinate: "quantum/chart · 5/round · 6b2ec0e2"
contentUuid: "5beba7e2-dc12-593a-9a54-ad269c8dc91d"
diamondUuid: "eeede1ce-edce-8abd-9d9f-ed0528deed6e"
uuid: "6b2ec0e2-197f-8132-9cb9-c54486ebc090"
horo: 5
typography:
  partition: quantum
  bondDegree: 21
standards:
  - "A432 tuning; the 7-chakra visible spectrum (via [[color]])"
bindings: []
signatures:
  computationUuid: "98ae3878-0b3f-816c-9ab4-41356a2b8dac"
  stages:
    - stage: path
      stageUuid: "42fe7299-f2e8-8462-b7dc-998c878c1170"
    - stage: trinity
      stageUuid: "9f52c616-b307-8bae-8eb9-235e90ac3776"
    - stage: boundary
      stageUuid: "b94f7da7-c879-82e4-b20b-79b087f17f63"
    - stage: links
      stageUuid: "e0b89af3-94b3-8077-8073-0368e09320fb"
    - stage: horo
      stageUuid: "aac541e3-eacc-88a3-9aeb-1a258593a807"
    - stage: seal
      stageUuid: "dd9d2620-36cb-8891-8e7b-b377e51a1b85"
    - stage: uuid
      stageUuid: "043cff9a-592c-8c13-9243-7c2dea6ed4f2"
quantum:
  superposition:
    - chart
    - color
    - data
    - law
    - quantum
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
    computationUuid: "98ae3878-0b3f-816c-9ab4-41356a2b8dac"
    contentUuid: "5beba7e2-dc12-593a-9a54-ad269c8dc91d"
version: 2
---
# quantum/chart — render a chart as a colour field (the analog aura)

The [[quantum]] facet of [[chart]]: it takes the pure chart spec (a series with its range and a scale normalizer) and renders each value as a colour, projecting the data onto the A432 [[color]] spectrum. Each value's normalized position ([0,1]) selects a chakra colour (root → crown) — the **analog aura** over the chart ([[analog]] · [[signal]]). The mapping is pure: the same chart renders the same colours, every time.

Matter-twin: `src/quantum/chart/index.ts` (`colors`). Composes [[chart]] (the spec) · [[color]] (the A432 spectrum) · [[analog]] · [[signal]] · [[quantum]].

**Law — [[law]]: rendering is deterministic — a chart's values map one-to-one onto the [[color]] spectrum by their normalized position, so the same data is always the same colour field (no rendering state, just the spec projected through the aura).**

@standard A432 tuning; the 7-chakra visible spectrum (via [[color]])
@audit deterministic — same data renders the same colours

<sub>content-uuid `5beba7e2-dc12-593a-9a54-ad269c8dc91d` · account `quantum/chart` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
