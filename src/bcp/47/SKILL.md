---
name: "47"
description: Use when implementing or referencing BCP 47 — Language tags.
atomPath: "bcp/47"
coordinate: "bcp/47 · 2/share · 0edf649b"
contentUuid: "3e9a5a99-562c-52c9-9498-e70e4acf813a"
diamondUuid: "f8133c00-df94-8c6e-84fd-5928b2a777b7"
uuid: "0edf649b-5c14-8dec-acf1-bb90a99e6c07"
horo: 2
typography:
  partition: bcp
  bondDegree: 3
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "ECMA-402"
  - "Unicode-CLDR"
bindings: []
signatures:
  computationUuid: "4dc0ed7d-c622-8699-ab9f-a6ab58f38a6b"
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
      stageUuid: "16aae035-530f-87b5-982a-fcd4931e36d9"
    - stage: seal
      stageUuid: "b9a63bbc-1867-8430-9ee7-e3dc57ed9b8d"
    - stage: uuid
      stageUuid: "b3fe0571-8130-8132-8f48-8dd8593d425a"
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
