---
name: engine
description: "Use when querying the corpus — the search engine that resolves a query to matching atoms, ranked by closeness; a pure read over the live matrix node set."
atomPath: "search/engine"
coordinate: "search/engine · 8/crest · f5f5baab"
contentUuid: "a6555490-9f64-5d4d-a50c-bd5bb62c1fae"
diamondUuid: "6e4a244f-10a0-868f-a8fb-74f5f0188d5c"
uuid: "f5f5baab-dcaa-84e9-a4eb-fc9000c3d5b4"
horo: 8
typography:
  partition: search
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "28c688a4-a950-8c19-9853-b701f18d14a3"
  stages:
    - stage: path
      stageUuid: "2de9ae2c-9dd8-8d0f-a8ed-ad73b6e37434"
    - stage: trinity
      stageUuid: "01166759-7632-8125-a649-bac03b306202"
    - stage: boundary
      stageUuid: "65fd2066-261e-84ec-acd1-e84105aa2a01"
    - stage: links
      stageUuid: "d94683f9-3c95-8be4-aa39-cddb6b46504c"
    - stage: horo
      stageUuid: "7f26eed5-ae9d-8d92-804c-7061f6b9f763"
    - stage: seal
      stageUuid: "d8aab1ae-d677-8012-9b4e-d5d9fb607eb5"
    - stage: uuid
      stageUuid: "6f34ad44-219a-8734-a2f5-a9215957713a"
version: 2
---
# search/engine — query the corpus, ranked

The **search engine** over the corpus: a query resolves to the matching atoms, ranked by closeness. A pure read over the live [[matrix]] node names — the [[search]] act made an engine ([[find]] · [[query]] · [[rank]]).

`search(query)` returns every atom whose name contains the query (case-insensitive); `rank(query)` orders them by earliest match position, then shortest atom (the closest first). Optimizing content so the engine ranks it well is the child atom `search/engine/optimization` (SEO).

Matter-twin: `src/search/engine/index.ts` (`search` · `rank`). Composes [[search]] · [[matrix]] · [[find]] · [[query]] · [[rank]].

@audit pure over the live matrix node set; never hand-asserted
