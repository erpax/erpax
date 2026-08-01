---
name: book
description: Use when reasoning about book — A book.
atomPath: book
coordinate: "book · 5/round · 60ab2a95"
contentUuid: "c2b7f394-7b51-5219-bcb2-08aa4104ff3d"
diamondUuid: "abfdc78a-4d97-84ee-9f95-fd8814aab878"
uuid: "60ab2a95-604b-8fe6-a5e4-3bb4c1814e29"
horo: 5
typography:
  partition: book
  bondDegree: 0
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "e4b430f1-abf1-8f28-a448-5aac76845f8c"
  stages:
    - stage: path
      stageUuid: "ae27e4e6-79cc-8222-a2f3-42fa9b1e6fb3"
    - stage: trinity
      stageUuid: "a166fd83-1d7b-8197-96e8-a8fb7745448f"
    - stage: boundary
      stageUuid: "90f0fe57-89e8-83d3-a220-10c6dafb3f9d"
    - stage: links
      stageUuid: "2a1a4bdf-1b6c-8da5-990b-ff69aa5ef53e"
    - stage: horo
      stageUuid: "cdfe4791-a859-8600-8b65-70893bd65635"
    - stage: seal
      stageUuid: "2195f13d-9c03-8a7e-910c-9f8f35a96526"
    - stage: uuid
      stageUuid: "405e15ff-a20e-8c4b-9003-720c2fef379f"
version: 2
---
# book

A book.

**Law — [[law]]: a missing book is form without matter; writing completes the trinity.** Each volume needs `index.ts` (matter) · `test.ts` (proof) · sealed README (computed faces via `deriveFolderModel`). `pnpm erpax corpus book --missing` lists gaps; `--write` completes up to 40 per pass.

Entangled with — [[format]] · [[type]] · [[series]] · [[store]] · [[edition]]

Attested in schema.org — Book · BookFormatType · BookSeries · BookStore · bookEdition · bookFormat

**Law — [[law]]: book is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
