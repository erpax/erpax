---
name: search
description: "Use when an entity needs quick free-text find across a few key columns — code/name/barcode/number lookup. The SearchConcern/quick_search (ransack) pattern → a Payload where/like query or a search index."
atomPath: search
coordinate: "search · 4/weave · 710a50e3"
contentUuid: "982d7cde-8f50-51f1-baeb-afcba5078949"
diamondUuid: "be553478-258e-84e6-988a-a67509b629c8"
uuid: "710a50e3-2c61-81c5-9df7-dbe79e9ecd7c"
horo: 4
typography:
  partition: search
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "da9b9623-1171-84ca-807e-ac90f4d39a42"
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
      stageUuid: "dc592225-8a78-81f2-92a3-b4de080b2977"
    - stage: seal
      stageUuid: "0800a8c6-e681-8ebf-975b-b8867f2be387"
    - stage: uuid
      stageUuid: "0e076a2b-fd34-868d-9aaa-a597c2dcd8e5"
version: 2
---
# search — typed find vs. free-text find

`search` is the lookup atom (Rails `SearchConcern`: `ransacker :search`, `quick_search` across `code/name/barcode/number`). Two duals: **identification** (the query matches a documented identifier → a definite resolve by id/uuid/code/number — see [[identity]]) and **free-text search** (no identifier match → a `where`/`like` over the searchable columns, [[queries]]). Declare the searchable fields (`listSearchableFields`, [[admin]]); for large corpora push to a real index (Vectorize/Analytics, [[bindings]]) rather than `like`-scanning. On D1 normalize at write — don't rely on SQL `LOWER` (no ICU).

Composes: [[queries]] (`like`/`where`), [[identity]] (identifier resolve), [[admin]] (searchable fields), [[bindings]] (index).

## Common mistakes
- `like`-scanning a huge table instead of an index.
- Relying on `LOWER()` matching on D1 — normalize at write.
