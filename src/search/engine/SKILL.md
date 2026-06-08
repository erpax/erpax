---
name: engine
description: "Use when querying the corpus — the search engine that resolves a query to matching atoms, ranked by closeness; a pure read over the live matrix node set."
atomPath: search/engine
coordinate: search/engine · 4/weave · 4cf91a0b
contentUuid: "191adf79-ff18-5fff-8cc8-5b2ca85a7a4f"
diamondUuid: "5eb74ac2-1ebc-86d6-96d8-bbbdd16d7bba"
uuid: "4cf91a0b-3085-848f-b1f8-8b72c4830483"
horo: 4
bonds:
  in:
    - displacement
    - find
    - matrix
    - query
    - rank
    - search
    - specification
    - vehicle
  out:
    - displacement
    - find
    - matrix
    - query
    - rank
    - search
    - specification
    - vehicle
typography:
  partition: search
  bondDegree: 35
  neighbors:
    - aura
standards:
  - "pure over the live matrix node set; never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - find
    - matrix
    - query
    - rank
    - search
  matrix:
    - displacement
    - find
    - matrix
    - query
    - rank
    - search
    - specification
    - vehicle
  backlinks:
    - displacement
    - find
    - matrix
    - query
    - rank
    - search
    - specification
    - vehicle
signatures:
  computationUuid: "3e7b7196-16c2-8b2e-8b0f-4d5bd7636c29"
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
      stageUuid: "74a0d5a1-fa7b-897a-a083-e56db4d02665"
    - stage: seal
      stageUuid: "3eb02201-a8bc-8fe9-a9aa-140321351c7f"
    - stage: uuid
      stageUuid: "cd9050d2-b2b0-8d19-98d1-4d66c569b3f5"
version: 2
---
# search/engine — query the corpus, ranked

The **search engine** over the corpus: a query resolves to the matching atoms, ranked by closeness. A pure read over the live [[matrix]] node names — the [[search]] act made an engine ([[find]] · [[query]] · [[rank]]).

`search(query)` returns every atom whose name contains the query (case-insensitive); `rank(query)` orders them by earliest match position, then shortest atom (the closest first). Optimizing content so the engine ranks it well is the child atom `search/engine/optimization` (SEO).

Matter-twin: `src/search/engine/index.ts` (`search` · `rank`). Composes [[search]] · [[matrix]] · [[find]] · [[query]] · [[rank]].

@audit pure over the live matrix node set; never hand-asserted
