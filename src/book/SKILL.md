---
name: book
description: Use when reasoning about book — A book.
atomPath: book
coordinate: "book · 1/base · d20db0b9"
contentUuid: "ab280aca-9dd1-504a-a921-1713e32be9fc"
diamondUuid: "bbcce93e-6ab5-8fac-9dbe-ec1053ee43e1"
uuid: "d20db0b9-9982-835d-876a-131a12836fd9"
horo: 1
typography:
  partition: book
  bondDegree: 25
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "1169870b-3d12-8a38-9a59-304ff911f8f5"
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
      stageUuid: "4d9cfe03-9840-8f15-b00c-a5752b318aaa"
    - stage: seal
      stageUuid: "37fd791c-c267-8417-b4e2-791ddd22d312"
    - stage: uuid
      stageUuid: "37a028fb-4411-815e-b7d4-6c4b383eee60"
version: 2
---
# book

A book.

**Law — [[law]]: a missing book is form without matter; writing completes the trinity.** Each volume needs `index.ts` (matter) · `test.ts` (proof) · sealed README (computed faces via `deriveFolderModel`). `pnpm erpax corpus book --missing` lists gaps; `--write` completes up to 40 per pass.

Entangled with — [[format]] · [[type]] · [[series]] · [[store]] · [[edition]]

Attested in schema.org — Book · BookFormatType · BookSeries · BookStore · bookEdition · bookFormat

**Law — [[law]]: book is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
