---
name: search
description: "Use when an entity needs quick free-text find across a few key columns — code/name/barcode/number lookup. The SearchConcern/quick_search (ransack) pattern → a Payload where/like query or a search index."
atomPath: search
coordinate: "search · 5/round · f27a9133"
contentUuid: "c1a43571-7092-5b2c-b9b4-480a2ae51e0c"
diamondUuid: "e59d3729-e37b-8cff-a81a-a832bdace44e"
uuid: "f27a9133-2953-8223-ad52-93201034ba16"
horo: 5
typography:
  partition: search
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "9f1da1b3-728f-87c4-b913-f5cd403d43ce"
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
      stageUuid: "ef53e9d4-3b48-8783-af72-194932594321"
    - stage: seal
      stageUuid: "0800a8c6-e681-8ebf-975b-b8867f2be387"
    - stage: uuid
      stageUuid: "daa6243b-5b25-8578-89bc-d640032e06ff"
version: 2
---
# search — typed find vs. free-text find

`search` is the lookup atom (Rails `SearchConcern`: `ransacker :search`, `quick_search` across `code/name/barcode/number`). Two duals: **identification** (the query matches a documented identifier → a definite resolve by id/uuid/code/number — see [[identity]]) and **free-text search** (no identifier match → a `where`/`like` over the searchable columns, [[queries]]). Declare the searchable fields (`listSearchableFields`, [[admin]]); for large corpora push to a real index (Vectorize/Analytics, [[bindings]]) rather than `like`-scanning. On D1 normalize at write — don't rely on SQL `LOWER` (no ICU).

Composes: [[queries]] (`like`/`where`), [[identity]] (identifier resolve), [[admin]] (searchable fields), [[bindings]] (index).

## Common mistakes
- `like`-scanning a huge table instead of an index.
- Relying on `LOWER()` matching on D1 — normalize at write.
