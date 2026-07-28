---
name: "47"
description: Use when implementing or referencing BCP 47 — Language tags.
atomPath: "bcp/47"
coordinate: "bcp/47 · 5/round · 3d687fe5"
contentUuid: "95713a48-38cb-5d32-8471-60e7402b8ed9"
diamondUuid: "c340d7a1-d7be-88d7-8709-f97d002d0cbb"
uuid: "3d687fe5-0d6b-8fbe-a4f4-d0765612e0db"
horo: 5
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
  computationUuid: "9382744b-c778-84e5-9a1f-26625591d71e"
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
      stageUuid: "09b19563-1f65-88d1-9928-cc6cddf24866"
    - stage: seal
      stageUuid: "b9a63bbc-1867-8430-9ee7-e3dc57ed9b8d"
    - stage: uuid
      stageUuid: "77d97c38-504f-8a5c-ae3a-d960b20ff6a8"
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
