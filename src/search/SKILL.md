---
name: search
description: "Use when an entity needs quick free-text find across a few key columns — code/name/barcode/number lookup. The SearchConcern/quick_search (ransack) pattern → a Payload where/like query or a search index."
atomPath: search
coordinate: "search · 2/share · 399f54bd"
contentUuid: "d803595b-d0ce-5a5b-b7fb-5d4a1630c4d0"
diamondUuid: "e2844baf-f3a1-8b2d-85f1-52ff3cc7b533"
uuid: "399f54bd-1c05-84cf-bff2-3e18ec0dbdd3"
horo: 2
typography:
  partition: search
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "64e39caf-e345-8efb-a030-e1ff4636d22c"
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
      stageUuid: "3b25441a-b221-83dd-88b5-3bc8f108cff2"
    - stage: seal
      stageUuid: "0800a8c6-e681-8ebf-975b-b8867f2be387"
    - stage: uuid
      stageUuid: "467d1b05-7b3f-82c3-b04a-c6f997db324b"
version: 2
---
# search — typed find vs. free-text find

`search` is the lookup atom (Rails `SearchConcern`: `ransacker :search`, `quick_search` across `code/name/barcode/number`). Two duals: **identification** (the query matches a documented identifier → a definite resolve by id/uuid/code/number — see [[identity]]) and **free-text search** (no identifier match → a `where`/`like` over the searchable columns, [[queries]]). Declare the searchable fields (`listSearchableFields`, [[admin]]); for large corpora push to a real index (Vectorize/Analytics, [[bindings]]) rather than `like`-scanning. On D1 normalize at write — don't rely on SQL `LOWER` (no ICU).

Composes: [[queries]] (`like`/`where`), [[identity]] (identifier resolve), [[admin]] (searchable fields), [[bindings]] (index).

## Common mistakes
- `like`-scanning a huge table instead of an index.
- Relying on `LOWER()` matching on D1 — normalize at write.
