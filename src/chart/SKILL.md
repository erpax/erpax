---
name: chart
description: "Use when specifying a chart as pure data — a numeric series with its range and a deterministic normalizer to [0,1]; rendering is the quantum facet (colour per value via the analog aura)."
atomPath: chart
coordinate: "chart · 8/crest · 1b355d4d"
contentUuid: "c3449efe-9401-5425-8f2e-2f2e97c80c89"
diamondUuid: "fbd2183a-0628-8d63-a8e9-3336eed62a06"
uuid: "1b355d4d-329f-8006-a549-93b642b2ba4b"
horo: 8
typography:
  partition: chart
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "4fbef509-cadd-8ad3-a6cb-57f556c2f46b"
  stages:
    - stage: path
      stageUuid: "af0fc2b8-6ff3-8ac5-ae16-776f26b2ce2d"
    - stage: trinity
      stageUuid: "b3fc08fc-87dd-8372-bc6c-89167f806dfb"
    - stage: boundary
      stageUuid: "36b54da5-326e-848a-814a-19953ce0872c"
    - stage: links
      stageUuid: "608d86a5-38fa-8a1f-a223-e85a84390ded"
    - stage: horo
      stageUuid: "db3baa5c-bdce-896b-9d53-df380896d408"
    - stage: seal
      stageUuid: "7bfac704-3c0e-873d-92f1-b386506acc3b"
    - stage: uuid
      stageUuid: "d042af78-3b61-8553-8631-80b0fdd724ec"
version: 2
---
# chart — a chart as pure data

A pure chart spec: a numeric series with its range and a deterministic **normalizer** to [0,1] (the scale). No rendering — just the spec as [[data]], so it is testable and content-addressable. The [[quantum]]/chart facet renders it through the analog aura (a colour per value from the [[color]] spectrum). Composes series · [[data]] · scale.

Matter-twin: `src/chart/index.ts` (`Chart` · `chart` · `normalize`). Composes series · [[data]] · scale · [[quantum]].

**Law — [[law]]: a chart is pure data — a numeric series with its range and a deterministic normalizer to [0,1], testable and content-addressable; rendering is the [[quantum]] facet, never the spec.**
