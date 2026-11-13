---
name: search
description: "Use when an entity needs quick free-text find across a few key columns — code/name/barcode/number lookup. The SearchConcern/quick_search (ransack) pattern → a Payload where/like query or a search index."
atomPath: search
coordinate: "search · 2/share · 85618f30"
contentUuid: "d8034e36-a66a-55f5-a57f-dbfaedf24acc"
diamondUuid: "5c2990f0-fb14-801d-bede-1aee7355634e"
uuid: "85618f30-9f75-8d39-b0de-3c1abd416d41"
horo: 2
typography:
  partition: search
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "2df041c3-179b-8a05-b98b-4364e2126aa4"
  stages:
    - stage: path
      stageUuid: "580e84d5-399c-893b-abbe-4f8aeec17b5b"
    - stage: trinity
      stageUuid: "96887817-1ef5-8880-af27-baaeb828613a"
    - stage: boundary
      stageUuid: "63ac835d-ca56-8aa3-a008-161c7c479d17"
    - stage: links
      stageUuid: "e59d3915-1e53-8d3c-9268-fc8a99f4c430"
    - stage: horo
      stageUuid: "85473d1c-db65-8b72-be30-f9fd7b43a224"
    - stage: seal
      stageUuid: "0800a8c6-e681-8ebf-975b-b8867f2be387"
    - stage: uuid
      stageUuid: "b4e98568-7d5a-83e8-a94c-3a4837c12898"
version: 2
---
# search — typed find vs. free-text find

`search` is the lookup atom (Rails `SearchConcern`: `ransacker :search`, `quick_search` across `code/name/barcode/number`). Two duals: **identification** (the query matches a documented identifier → a definite resolve by id/uuid/code/number — see [[identity]]) and **free-text search** (no identifier match → a `where`/`like` over the searchable columns, queries). Declare the searchable fields (`listSearchableFields`, [[admin]]); for large corpora push to a real index (Vectorize/Analytics, [[bindings]]) rather than `like`-scanning. On D1 normalize at write — don't rely on SQL `LOWER` (no ICU).

Composes: queries (`like`/`where`), [[identity]] (identifier resolve), [[admin]] (searchable fields), [[bindings]] (index).

## Common mistakes
- `like`-scanning a huge table instead of an index.
- Relying on `LOWER()` matching on D1 — normalize at write.
