---
name: chart
description: "Use when specifying a chart as pure data — a numeric series with its range and a deterministic normalizer to [0,1]; rendering is the quantum facet (colour per value via the analog aura)."
atomPath: chart
coordinate: "chart · 4/weave · ba49b987"
contentUuid: "5596c633-1e64-5dc5-bf95-e2d26447b3f0"
diamondUuid: "4b25159c-2057-8aa2-b5ff-57dcd18569a2"
uuid: "ba49b987-b470-83b1-b059-63a7c370fb50"
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
  computationUuid: "2ac348fe-de45-848b-84c3-7786eff27ef6"
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
      stageUuid: "750c92ea-cede-8d26-86cc-36bf7c743914"
    - stage: seal
      stageUuid: "7bfac704-3c0e-873d-92f1-b386506acc3b"
    - stage: uuid
      stageUuid: "681b1cb0-c984-8426-9e6e-f3bcc79b499b"
version: 2
---
# chart — a chart as pure data

A pure chart spec: a numeric [[series]] with its range and a deterministic **normalizer** to [0,1] (the [[scale]]). No rendering — just the spec as [[data]], so it is testable and content-addressable. The [[quantum]]/chart facet renders it through the analog aura (a colour per value from the [[color]] spectrum). Composes [[series]] · [[data]] · [[scale]].

Matter-twin: `src/chart/index.ts` (`Chart` · `chart` · `normalize`). Composes [[series]] · [[data]] · [[scale]] · [[quantum]].

**Law — [[law]]: a chart is pure data — a numeric [[series]] with its range and a deterministic normalizer to [0,1], testable and content-addressable; rendering is the [[quantum]] facet, never the spec.**
