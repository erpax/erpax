---
name: engine
description: "Use when querying the corpus — the search engine that resolves a query to matching atoms, ranked by closeness; a pure read over the live matrix node set."
atomPath: "search/engine"
coordinate: "search/engine · 4/weave · 6506f321"
contentUuid: "88d28ea3-69a9-5f82-9c88-fe0eb0ccbc6f"
diamondUuid: "40ffe38c-a577-881f-83d2-6c00480dede2"
uuid: "6506f321-2827-82ff-ad6c-7398e7f738b3"
horo: 4
typography:
  partition: search
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "f55598fb-8acf-86a1-a278-840d01accfc0"
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
      stageUuid: "b4e587ee-c34f-8050-84e1-6742436e6833"
    - stage: seal
      stageUuid: "d8aab1ae-d677-8012-9b4e-d5d9fb607eb5"
    - stage: uuid
      stageUuid: "55023dff-324f-8096-b2fd-f2c12e8457a9"
version: 2
---
# search/engine — query the corpus, ranked

The **search engine** over the corpus: a query resolves to the matching atoms, ranked by closeness. A pure read over the live [[matrix]] node names — the [[search]] act made an engine ([[find]] · [[query]] · [[rank]]).

`search(query)` returns every atom whose name contains the query (case-insensitive); `rank(query)` orders them by earliest match position, then shortest atom (the closest first). Optimizing content so the engine ranks it well is the child atom `search/engine/optimization` (SEO).

Matter-twin: `src/search/engine/index.ts` (`search` · `rank`). Composes [[search]] · [[matrix]] · [[find]] · [[query]] · [[rank]].

@audit pure over the live matrix node set; never hand-asserted
