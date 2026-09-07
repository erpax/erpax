---
name: "47"
description: Use when implementing or referencing BCP 47 — Language tags.
atomPath: "bcp/47"
coordinate: "bcp/47 · 2/share · f7e8e52a"
contentUuid: "3a9d3239-d33e-51da-9403-40ca5daed444"
diamondUuid: "38a84fc4-f690-8bec-b288-f1f02a7a42c4"
uuid: "f7e8e52a-ad7f-8305-bdb9-1b1044bb83fa"
horo: 2
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
  computationUuid: "e4c38a42-6c39-8e6b-be37-898ee3243e91"
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
      stageUuid: "a91537c4-8654-8d70-a353-e6ae3e2355f9"
    - stage: seal
      stageUuid: "b9a63bbc-1867-8430-9ee7-e3dc57ed9b8d"
    - stage: uuid
      stageUuid: "c77ec40e-5d9e-8d82-9bc9-eb85dac1b295"
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
