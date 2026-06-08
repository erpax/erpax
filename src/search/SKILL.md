---
name: search
description: "Use when an entity needs quick free-text find across a few key columns — code/name/barcode/number lookup. The SearchConcern/quick_search (ransack) pattern → a Payload where/like query or a search index."
atomPath: search
coordinate: search · 8/crest · cbb5e13f
contentUuid: "60761e31-e9d9-5377-b656-59f408a223a6"
diamondUuid: "db65d7ee-446d-87ed-862f-4d8fa9d67c3f"
uuid: "cbb5e13f-f5cd-87d0-92c9-5fa0b702e053"
horo: 8
bonds:
  in:
    - admin
    - bindings
    - engine
    - identity
    - link
    - optimization
    - organization
    - page
    - pwa
    - queries
    - redirects
    - rescue
    - results
    - typography
  out:
    - admin
    - bindings
    - engine
    - identity
    - link
    - optimization
    - organization
    - page
    - pwa
    - queries
    - redirects
    - rescue
    - results
    - typography
typography:
  partition: search
  bondDegree: 45
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - admin
    - bindings
    - identity
    - queries
  matrix:
    - admin
    - bindings
    - engine
    - identity
    - link
    - optimization
    - organization
    - page
    - pwa
    - queries
    - redirects
    - rescue
    - results
    - typography
  backlinks:
    - admin
    - bindings
    - engine
    - identity
    - link
    - optimization
    - organization
    - page
    - pwa
    - queries
    - redirects
    - rescue
    - results
    - typography
signatures:
  computationUuid: "4a4b72b6-bce4-8945-9f27-b1d299dd44df"
  stages:
    - stage: path
      stageUuid: "580e84d5-399c-893b-abbe-4f8aeec17b5b"
    - stage: trinity
      stageUuid: "96887817-1ef5-8880-af27-baaeb828613a"
    - stage: boundary
      stageUuid: "b7777888-2848-867c-a4bd-4ae7a0e6b9fa"
    - stage: links
      stageUuid: "26ef1193-4848-8f60-9010-01895b96251f"
    - stage: horo
      stageUuid: "0f323a15-acae-8b15-aeb6-d7f9e5bc40cd"
    - stage: seal
      stageUuid: "d36b2234-8c5f-84a0-9118-5b0f159308ee"
    - stage: uuid
      stageUuid: "2eba84a7-5894-85c0-8457-83f4a3cc6827"
version: 2
---
# search — typed find vs. free-text find

`search` is the lookup atom (Rails `SearchConcern`: `ransacker :search`, `quick_search` across `code/name/barcode/number`). Two duals: **identification** (the query matches a documented identifier → a definite resolve by id/uuid/code/number — see [[identity]]) and **free-text search** (no identifier match → a `where`/`like` over the searchable columns, [[queries]]). Declare the searchable fields (`listSearchableFields`, [[admin]]); for large corpora push to a real index (Vectorize/Analytics, [[bindings]]) rather than `like`-scanning. On D1 normalize at write — don't rely on SQL `LOWER` (no ICU).

Composes: [[queries]] (`like`/`where`), [[identity]] (identifier resolve), [[admin]] (searchable fields), [[bindings]] (index).

## Common mistakes
- `like`-scanning a huge table instead of an index.
- Relying on `LOWER()` matching on D1 — normalize at write.
