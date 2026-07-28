---
name: book
description: Use when reasoning about book — A book.
atomPath: book
coordinate: "book · 5/round · beec1de2"
contentUuid: "38630e8c-cbd2-501b-8f09-880e11a5bfad"
diamondUuid: "0b15441c-d664-878c-81c1-e4f5d1d04aee"
uuid: "beec1de2-1385-8d39-b9d3-79da8ca6b66d"
horo: 5
bonds:
  in:
    - edition
    - format
    - law
    - series
    - store
    - type
  out:
    - edition
    - format
    - law
    - series
    - store
    - type
typography:
  partition: book
  bondDegree: 0
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - edition
    - format
    - law
    - series
    - store
    - type
  matrix:
    - edition
    - format
    - law
    - series
    - store
    - type
  backlinks:
    - edition
    - format
    - law
    - series
    - store
    - type
signatures:
  computationUuid: "d239bf35-3e76-8dea-821d-d8226c3851cd"
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
      stageUuid: "faeff25a-35be-8cd7-bb53-f519f423d933"
    - stage: seal
      stageUuid: "2195f13d-9c03-8a7e-910c-9f8f35a96526"
    - stage: uuid
      stageUuid: "e7218f5a-85ea-8468-8bbb-9744efd05c5d"
version: 2
---
# book

A book.

**Law — [[law]]: a missing book is form without matter; writing completes the trinity.** Each volume needs `index.ts` (matter) · `test.ts` (proof) · sealed README (computed faces via `deriveFolderModel`). `pnpm erpax corpus book --missing` lists gaps; `--write` completes up to 40 per pass.

Entangled with — [[format]] · [[type]] · [[series]] · [[store]] · [[edition]]

Attested in schema.org — Book · BookFormatType · BookSeries · BookStore · bookEdition · bookFormat

**Law — [[law]]: book is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
