---
name: book
description: Use when reasoning about book — A book.
atomPath: book
coordinate: "book · 5/round · e080170b"
contentUuid: "2f68ad3a-0446-57d6-bee3-1fb502efc447"
diamondUuid: "e0b41dd7-25c5-8d38-a7f6-242a948cf95f"
uuid: "e080170b-9106-85d5-8e11-99e80f229209"
horo: 5
typography:
  partition: book
  bondDegree: 25
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "57beddec-9f29-899b-9297-640f02bbbf93"
  stages:
    - stage: path
      stageUuid: "ae27e4e6-79cc-8222-a2f3-42fa9b1e6fb3"
    - stage: trinity
      stageUuid: "a166fd83-1d7b-8197-96e8-a8fb7745448f"
    - stage: boundary
      stageUuid: "9cdf5222-ae9a-8335-a5e8-9e8352bd780d"
    - stage: links
      stageUuid: "2a1a4bdf-1b6c-8da5-990b-ff69aa5ef53e"
    - stage: horo
      stageUuid: "c175aa67-1db5-846a-b363-dcb0d14b9c74"
    - stage: seal
      stageUuid: "37fd791c-c267-8417-b4e2-791ddd22d312"
    - stage: uuid
      stageUuid: "79c20ea0-b1db-8109-9cc7-c88f15b7ea3d"
version: 2
---
# book

A book.

**Law — [[law]]: a missing book is form without matter; writing completes the trinity.** Each volume needs `index.ts` (matter) · `test.ts` (proof) · sealed README (computed faces via `deriveFolderModel`). `pnpm erpax corpus book --missing` lists gaps; `--write` completes up to 40 per pass.

Entangled with — [[format]] · [[type]] · [[series]] · [[store]] · [[edition]]

Attested in schema.org — Book · BookFormatType · BookSeries · BookStore · bookEdition · bookFormat

**Law — [[law]]: book is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
