---
name: chart
description: "Use when specifying a chart as pure data — a numeric series with its range and a deterministic normalizer to [0,1]; rendering is the quantum facet (colour per value via the analog aura)."
atomPath: chart
coordinate: chart · 1/base · 9d5b59d3
contentUuid: "3c6800aa-f69a-59a4-baee-a10d1cbb3231"
diamondUuid: "0b961737-2714-89b0-9fb1-ac91c18ef39b"
uuid: "9d5b59d3-87c4-8006-bcf6-3c78a439e424"
horo: 1
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
  partition: chart
  bondDegree: 29
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - color
    - data
    - law
    - quantum
    - scale
    - series
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
  computationUuid: "5fd35e7b-33cf-8aff-b42f-3df6880d6ff9"
  stages:
    - stage: path
      stageUuid: "af0fc2b8-6ff3-8ac5-ae16-776f26b2ce2d"
    - stage: trinity
      stageUuid: "b3fc08fc-87dd-8372-bc6c-89167f806dfb"
    - stage: boundary
      stageUuid: "8b6ab462-970a-80dd-99c0-f1b3c52aea78"
    - stage: links
      stageUuid: "57ce59fb-211e-869c-8a4f-88fdc39648a7"
    - stage: horo
      stageUuid: "b182ef74-9b68-8439-b8f4-e80171647bd3"
    - stage: seal
      stageUuid: "ef1c1b2d-5592-873c-95c7-a7fb4e84a791"
    - stage: uuid
      stageUuid: "3d447f6b-5cb3-8da0-b1b5-72fbeea09237"
version: 2
---
# chart — a chart as pure data

A pure chart spec: a numeric [[series]] with its range and a deterministic **normalizer** to [0,1] (the [[scale]]). No rendering — just the spec as [[data]], so it is testable and content-addressable. The [[quantum]]/chart facet renders it through the analog aura (a colour per value from the [[color]] spectrum). Composes [[series]] · [[data]] · [[scale]].

Matter-twin: `src/chart/index.ts` (`Chart` · `chart` · `normalize`). Composes [[series]] · [[data]] · [[scale]] · [[quantum]].

**Law — [[law]]: a chart is pure data — a numeric [[series]] with its range and a deterministic normalizer to [0,1], testable and content-addressable; rendering is the [[quantum]] facet, never the spec.**
