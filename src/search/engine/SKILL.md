---
name: engine
description: "Use when querying the corpus — the search engine that resolves a query to matching atoms, ranked by closeness; a pure read over the live matrix node set."
atomPath: "search/engine"
coordinate: "search/engine · 1/base · ed213699"
contentUuid: "d52fcddb-94aa-5c14-8e71-8fe020fa2b6b"
diamondUuid: "cf80c2da-d8a9-80ae-9ecf-ac4c49a2b442"
uuid: "ed213699-c6db-8f37-a28c-13889479ddd9"
horo: 1
typography:
  partition: search
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "97568aa7-47b6-8a99-9c30-83e39477fa51"
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
      stageUuid: "fdbedadb-ab94-8efa-a701-86eb4fdf2783"
    - stage: seal
      stageUuid: "d8aab1ae-d677-8012-9b4e-d5d9fb607eb5"
    - stage: uuid
      stageUuid: "e56b994a-6544-84d2-b1a5-914af68644a8"
version: 2
---
# search/engine — query the corpus, ranked

The **search engine** over the corpus: a query resolves to the matching atoms, ranked by closeness. A pure read over the live [[matrix]] node names — the [[search]] act made an engine ([[find]] · [[query]] · [[rank]]).

`search(query)` returns every atom whose name contains the query (case-insensitive); `rank(query)` orders them by earliest match position, then shortest atom (the closest first). Optimizing content so the engine ranks it well is the child atom `search/engine/optimization` (SEO).

Matter-twin: `src/search/engine/index.ts` (`search` · `rank`). Composes [[search]] · [[matrix]] · [[find]] · [[query]] · [[rank]].

@audit pure over the live matrix node set; never hand-asserted
