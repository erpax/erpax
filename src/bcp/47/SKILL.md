---
name: "47"
description: Use when implementing or referencing BCP 47 — Language tags.
atomPath: bcp/47
coordinate: bcp/47 · 4/weave · f0130edd
contentUuid: "6d6bfcc6-01b8-5811-ace7-1baa159a7256"
diamondUuid: "584d770c-7b6f-8533-9113-b617657eb6ae"
uuid: "f0130edd-829b-832f-bf4c-c9f4e3fcc335"
horo: 4
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: bcp
  bondDegree: 3
  neighbors: []
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "ECMA-402"
  - "Unicode-CLDR"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "b910f8a8-6778-88c0-8a33-38f09a25a8ab"
  stages:
    - stage: path
      stageUuid: "1f0e9428-09ae-8d94-9c4b-9f6d3aefac8c"
    - stage: trinity
      stageUuid: "b6300cd5-e4ad-8ed9-bb4a-7fb96d9fd9bf"
    - stage: boundary
      stageUuid: "fad6cb81-6ac4-879b-b25a-7af9ba7a8b6f"
    - stage: links
      stageUuid: "d77252c3-f8f4-8112-95d3-20697cf66d79"
    - stage: horo
      stageUuid: "673f9c92-b41e-8063-9f9d-3fa1a2f725e0"
    - stage: seal
      stageUuid: "b9a63bbc-1867-8430-9ee7-e3dc57ed9b8d"
    - stage: uuid
      stageUuid: "a1fc4938-0738-80d0-aa41-de960c9c6b85"
version: 2
---
# BCP 47 — Language tags

**Edition:** RFC 5646 + RFC 4647 (BCP 47).
**Publisher:** <https://www.rfc-editor.org/info/bcp47>
**Subtag registry:** <https://www.iana.org/assignments/language-subtag-registry>

## What's here

- `language-tag.ts` — `isBcp47(s)` regex check for the common subset
  (language[-script][-region][-variant]).

## Used by

`src/i18n/*`, every locale-bearing field, `Accept-Language` parsing.

**Law — [[law]]: a language tag is valid only if it matches the BCP 47 (RFC 5646 + RFC 4647) subtag structure — language[-script][-region][-variant].**
