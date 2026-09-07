---
name: engine
description: "Use when querying the corpus — the search engine that resolves a query to matching atoms, ranked by closeness; a pure read over the live matrix node set."
atomPath: "search/engine"
coordinate: "search/engine · 2/share · b7a62d9d"
contentUuid: "6b5d42e8-2ae8-5047-8e82-aed0e5f760af"
diamondUuid: "efaa77da-a6bd-86ff-b9f6-14187ef10404"
uuid: "b7a62d9d-a759-89cd-ac01-77290acbf0ca"
horo: 2
typography:
  partition: search
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "73dbdf6d-aa80-8577-98eb-57e5fd4cf678"
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
      stageUuid: "78f449a0-3686-8ea7-8359-508f46593ae9"
    - stage: seal
      stageUuid: "d8aab1ae-d677-8012-9b4e-d5d9fb607eb5"
    - stage: uuid
      stageUuid: "28f1650b-aafa-802b-9034-cb8e68e1c0de"
version: 2
---
# search/engine — query the corpus, ranked

The **search engine** over the corpus: a query resolves to the matching atoms, ranked by closeness. A pure read over the live [[matrix]] node names — the [[search]] act made an engine ([[find]] · [[query]] · [[rank]]).

`search(query)` returns every atom whose name contains the query (case-insensitive); `rank(query)` orders them by earliest match position, then shortest atom (the closest first). Optimizing content so the engine ranks it well is the child atom `search/engine/optimization` (SEO).

Matter-twin: `src/search/engine/index.ts` (`search` · `rank`). Composes [[search]] · [[matrix]] · [[find]] · [[query]] · [[rank]].

@audit pure over the live matrix node set; never hand-asserted
