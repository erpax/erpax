---
name: "47"
description: Use when implementing or referencing BCP 47 — Language tags.
atomPath: "bcp/47"
coordinate: "bcp/47 · 1/base · a6ca40d6"
contentUuid: "b769e4e4-a1e3-5572-94ac-d7de608239ed"
diamondUuid: "1a04dac6-c342-8b5a-877c-9b68cb01a161"
uuid: "a6ca40d6-3653-83a5-bb2e-d0f52e35bcae"
horo: 1
typography:
  partition: bcp
  bondDegree: 3
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "ECMA-402"
  - "RFC-5646"
  - "Unicode-CLDR"
bindings: []
signatures:
  computationUuid: "62ccf06b-88fb-802e-81d0-fb3c8aa8029d"
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
      stageUuid: "f00ce7f5-ea0d-87d7-883e-655d128b675c"
    - stage: seal
      stageUuid: "b9a63bbc-1867-8430-9ee7-e3dc57ed9b8d"
    - stage: uuid
      stageUuid: "27a5e2d0-cf1c-816b-a686-bbf6394198e3"
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
