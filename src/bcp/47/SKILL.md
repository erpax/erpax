---
name: "47"
description: Use when implementing or referencing BCP 47 — Language tags.
atomPath: "bcp/47"
coordinate: "bcp/47 · 2/share · 7ccd950b"
contentUuid: "e7a1fe48-fa44-5463-a024-2d4e92be2abe"
diamondUuid: "5c400a03-38f8-8ef8-ac56-da552587f4cb"
uuid: "7ccd950b-4688-803f-80b8-50e848deee47"
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
  computationUuid: "307a3ddb-9c92-8a60-9f6b-46d5e928ae98"
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
      stageUuid: "47187556-ddf0-89d7-9597-75bfa3f7d00d"
    - stage: seal
      stageUuid: "b9a63bbc-1867-8430-9ee7-e3dc57ed9b8d"
    - stage: uuid
      stageUuid: "9f60acaf-bc34-8162-8845-fb79dab16867"
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
