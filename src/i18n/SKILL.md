---
name: i18n
description: "Use when reasoning about i18n — A message bundle per locale is the easy half. The half that rots is the **tag**: , , , are four spellings a human will type and one thing BCP-47 means."
atomPath: i18n
coordinate: "i18n · 7/descent · f7892520"
contentUuid: "f8e86fbb-10b4-5433-9fd7-50ad3c5c3d08"
diamondUuid: "829ebfda-6ea2-84b0-aa2a-f88b5e26a0e1"
uuid: "f7892520-6f5a-8536-9188-f03126f61a11"
horo: 7
typography:
  partition: i18n
  bondDegree: 21
standards:
  - "4647 matching-of-language-tags"
  - "5646 tags-for-identifying-languages"
  - "8259 json"
  - "BCP-47 language-tag"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - "EU-1958"
  - "RFC-3986"
  - "RFC-5646"
  - "RFC-7231"
  - "RFC-8259"
  - "Unicode-CLDR"
  - "Unicode-CLDR locale-data"
  - "W3C Internationalization-Best-Practices"
bindings: []
signatures:
  computationUuid: "7c6742be-1a0d-84bb-b3c8-e1c73cbbf508"
  stages:
    - stage: path
      stageUuid: "c9d27647-6c4b-80d0-8b9a-a06fd2688259"
    - stage: trinity
      stageUuid: "f88e7559-dab2-8ba9-9c12-1863b1aa274c"
    - stage: boundary
      stageUuid: "f06db577-f2c1-8c3a-8533-6a3fb3de7cfa"
    - stage: links
      stageUuid: "652f2978-9c42-871f-a152-04eb5c88b5a7"
    - stage: horo
      stageUuid: "7194fc01-8a03-89a7-8b6e-9c43f670fcdb"
    - stage: seal
      stageUuid: "7369c3fb-6c15-8048-9330-941bc61ffedb"
    - stage: uuid
      stageUuid: "e37860ee-c855-86a1-be59-c4e7496780ce"
version: 2
---
# i18n — 35 locales are one bundle, and the locale tag is a standard, not a string

A message bundle per locale is the easy half. The half that rots is the **tag**: `bg`, `bg-BG`,
`BG`, `bg_BG` are four spellings a human will type and one thing BCP-47 means. A lookup keyed on a
spelling fails OPEN — it returns the default bundle and the user reads English, which looks like a
missing translation rather than a broken matcher.

So the barrel holds the closed set: the bundles are imported statically (one `.json` per locale,
RFC 8259), the supported tags are the keys of that record, and matching is RFC 4647 — never a
string comparison someone wrote by hand.

| leg | what it is |
| --- | --- |
| [[i18n]]/messages | the bundles — one file per supported locale |
| [[i18n]]/routing | which locale a request resolves to |
| [[i18n]]/request | the per-request locale, read once |
| [[i18n]]/localization | the CMS side: which fields are localized |
| [[i18n]]/harvest | the strings the corpus has, and the ones no bundle covers |

**Honest boundary.** This proves a tag **resolves to a bundle**, never that the bundle's text is a
correct translation — that is a human judgement no gate makes. Runtime formatting (dates, numbers,
currency) is ECMA-402 `Intl` and is the platform's answer, not this atom's.

**Law — [[law]]: a locale is a BCP-47 tag matched by RFC 4647, never a string compared by hand. A
matcher that falls back silently turns a missing translation into a correct-looking default.**

## Standards

- **BCP-47** — tags for identifying languages.
- **RFC 4647** — matching of language tags.
- **RFC 8259** — JSON, the bundle format.
- **ECMA-402** — the internationalization API.

Composes: [[i18n]]/messages · [[i18n]]/routing · [[i18n]]/request · [[translate]] · [[law]].
