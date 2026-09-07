---
name: "47"
description: Use when implementing or referencing BCP 47 — Language tags.
atomPath: "bcp/47"
coordinate: "bcp/47 · 4/weave · 21a7917f"
contentUuid: "5760da98-51b7-50bc-93bc-99519960d624"
diamondUuid: "32f0cd9c-4581-8f21-b271-66ac06d1e1a5"
uuid: "21a7917f-8a59-82e7-a13b-37a19da7c90f"
horo: 4
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
  computationUuid: "f296e60c-6513-8954-ab82-0b8869cce745"
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
      stageUuid: "55a3836b-7663-83b9-abc2-aaa002fbb477"
    - stage: seal
      stageUuid: "b9a63bbc-1867-8430-9ee7-e3dc57ed9b8d"
    - stage: uuid
      stageUuid: "7e688df0-d0dd-8904-ae2b-a7421fb458a7"
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
