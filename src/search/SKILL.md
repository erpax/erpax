---
name: search
description: "Use when an entity needs quick free-text find across a few key columns — code/name/barcode/number lookup. The SearchConcern/quick_search (ransack) pattern → a Payload where/like query or a search index."
atomPath: search
coordinate: "search · 1/base · 855c95ce"
contentUuid: "4987475c-9e9f-581e-b04b-ae96645ee48c"
diamondUuid: "21a76e40-baf1-8756-953e-e52457a43f9c"
uuid: "855c95ce-dac8-8786-8731-2a322181ce09"
horo: 1
typography:
  partition: search
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "1befadf7-3f41-8eae-bbf7-0aa3ba5e0784"
  stages:
    - stage: path
      stageUuid: "580e84d5-399c-893b-abbe-4f8aeec17b5b"
    - stage: trinity
      stageUuid: "96887817-1ef5-8880-af27-baaeb828613a"
    - stage: boundary
      stageUuid: "63ac835d-ca56-8aa3-a008-161c7c479d17"
    - stage: links
      stageUuid: "26ef1193-4848-8f60-9010-01895b96251f"
    - stage: horo
      stageUuid: "3433de31-57e2-8ca7-aaf7-00efbb05b181"
    - stage: seal
      stageUuid: "0800a8c6-e681-8ebf-975b-b8867f2be387"
    - stage: uuid
      stageUuid: "11832097-f09a-80ee-ac33-ad267684d31b"
version: 2
---
# search — typed find vs. free-text find

`search` is the lookup atom (Rails `SearchConcern`: `ransacker :search`, `quick_search` across `code/name/barcode/number`). Two duals: **identification** (the query matches a documented identifier → a definite resolve by id/uuid/code/number — see [[identity]]) and **free-text search** (no identifier match → a `where`/`like` over the searchable columns, [[queries]]). Declare the searchable fields (`listSearchableFields`, [[admin]]); for large corpora push to a real index (Vectorize/Analytics, [[bindings]]) rather than `like`-scanning. On D1 normalize at write — don't rely on SQL `LOWER` (no ICU).

Composes: [[queries]] (`like`/`where`), [[identity]] (identifier resolve), [[admin]] (searchable fields), [[bindings]] (index).

## Common mistakes
- `like`-scanning a huge table instead of an index.
- Relying on `LOWER()` matching on D1 — normalize at write.
