---
name: engine
description: "Use when querying the corpus — the search engine that resolves a query to matching atoms, ranked by closeness; a pure read over the live matrix node set."
atomPath: "search/engine"
coordinate: "search/engine · 8/crest · 8ccba622"
contentUuid: "ef1e589d-b32b-5aa1-92ac-7436a8fda852"
diamondUuid: "5140e405-b769-88f1-bdf1-08fa0aacf510"
uuid: "8ccba622-109d-8ed3-b732-32cc4da877f3"
horo: 8
typography:
  partition: search
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "bf013405-fd70-8bc3-9e9f-2c8aacf4bfa9"
  stages:
    - stage: path
      stageUuid: "2de9ae2c-9dd8-8d0f-a8ed-ad73b6e37434"
    - stage: trinity
      stageUuid: "01166759-7632-8125-a649-bac03b306202"
    - stage: boundary
      stageUuid: "f010744c-5eff-88d2-b419-0a65941ffcaa"
    - stage: links
      stageUuid: "d94683f9-3c95-8be4-aa39-cddb6b46504c"
    - stage: horo
      stageUuid: "9109ed36-7605-860b-bac1-1bedaebce3e2"
    - stage: seal
      stageUuid: "d8aab1ae-d677-8012-9b4e-d5d9fb607eb5"
    - stage: uuid
      stageUuid: "308efaf8-608e-844c-9ad9-ce3b750a3ac3"
version: 2
---
# search/engine — query the corpus, ranked

The **search engine** over the corpus: a query resolves to the matching atoms, ranked by closeness. A pure read over the live [[matrix]] node names — the [[search]] act made an engine (find · [[query]] · rank).

`search(query)` returns every atom whose name contains the query (case-insensitive); `rank(query)` orders them by earliest match position, then shortest atom (the closest first). Optimizing content so the engine ranks it well is the child atom `search/engine/optimization` (SEO).

Matter-twin: `src/search/engine/index.ts` (`search` · `rank`). Composes [[search]] · [[matrix]] · find · [[query]] · rank.

@audit pure over the live matrix node set; never hand-asserted
