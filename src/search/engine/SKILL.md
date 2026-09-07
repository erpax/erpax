---
name: engine
description: "Use when querying the corpus — the search engine that resolves a query to matching atoms, ranked by closeness; a pure read over the live matrix node set."
atomPath: "search/engine"
coordinate: "search/engine · 5/round · 20f58c94"
contentUuid: "02fea072-d866-5306-853a-91b8c30e563c"
diamondUuid: "dc01ff80-1faa-861b-aebc-f62f3a2a7d83"
uuid: "20f58c94-1565-853f-a39d-cd1898961f5e"
horo: 5
typography:
  partition: search
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "cc416d60-45bb-8f56-9017-4c0e478f841c"
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
      stageUuid: "1703e367-385f-8cfe-9407-c3a6f275f00e"
    - stage: seal
      stageUuid: "d8aab1ae-d677-8012-9b4e-d5d9fb607eb5"
    - stage: uuid
      stageUuid: "9831081c-4687-800a-aecd-a9a401cf8f99"
version: 2
---
# search/engine — query the corpus, ranked

The **search engine** over the corpus: a query resolves to the matching atoms, ranked by closeness. A pure read over the live [[matrix]] node names — the [[search]] act made an engine ([[find]] · [[query]] · [[rank]]).

`search(query)` returns every atom whose name contains the query (case-insensitive); `rank(query)` orders them by earliest match position, then shortest atom (the closest first). Optimizing content so the engine ranks it well is the child atom `search/engine/optimization` (SEO).

Matter-twin: `src/search/engine/index.ts` (`search` · `rank`). Composes [[search]] · [[matrix]] · [[find]] · [[query]] · [[rank]].

@audit pure over the live matrix node set; never hand-asserted
