---
name: engine
description: "Use when querying the corpus — the search engine that resolves a query to matching atoms, ranked by closeness; a pure read over the live matrix node set."
atomPath: "search/engine"
coordinate: "search/engine · 1/base · e7c87828"
contentUuid: "5ccec547-2e5f-5356-8525-04d82faf59e7"
diamondUuid: "3763b3f4-2162-8913-bf08-27aa349dfe47"
uuid: "e7c87828-3f3f-8cf0-991b-21f900ec6461"
horo: 1
typography:
  partition: search
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "e72dfdf3-0fe1-82ee-9ab5-40eed84a7093"
  stages:
    - stage: path
      stageUuid: "2de9ae2c-9dd8-8d0f-a8ed-ad73b6e37434"
    - stage: trinity
      stageUuid: "01166759-7632-8125-a649-bac03b306202"
    - stage: boundary
      stageUuid: "f010744c-5eff-88d2-b419-0a65941ffcaa"
    - stage: links
      stageUuid: "2c2a3637-a740-8138-80ea-f13f76476ec1"
    - stage: horo
      stageUuid: "46f59335-4e1d-8467-bed7-5da02924d9a0"
    - stage: seal
      stageUuid: "d8aab1ae-d677-8012-9b4e-d5d9fb607eb5"
    - stage: uuid
      stageUuid: "1dbd221d-becb-812a-ac60-0a4d4335d7c3"
version: 2
---
# search/engine — query the corpus, ranked

The **search engine** over the corpus: a query resolves to the matching atoms, ranked by closeness. A pure read over the live [[matrix]] node names — the [[search]] act made an engine (find · [[query]] · rank).

`search(query)` returns every atom whose name contains the query (case-insensitive); `rank(query)` orders them by earliest match position, then shortest atom (the closest first). Optimizing content so the engine ranks it well is the child atom `search/engine/optimization` (SEO).

Matter-twin: `src/search/engine/index.ts` (`search` · `rank`). Composes [[search]] · [[matrix]] · find · [[query]] · rank.

@audit pure over the live matrix node set; never hand-asserted
