---
name: i18n
description: "Use when reasoning about i18n — A message bundle per locale is the easy half. The half that rots is the **tag**: , , , are four spellings a human will type and one thing BCP-47 means."
atomPath: i18n
coordinate: "i18n · 7/descent · f7892520"
contentUuid: "bb59872b-ab16-5025-a921-d36ed8659322"
diamondUuid: "3dd6e3e7-8e44-8314-b1e3-fbd03be5b7a6"
uuid: "f7892520-6f5a-8536-9188-f03126f61a11"
horo: 7
typography:
  partition: i18n
  bondDegree: 18
standards:
  - "4647 matching-of-language-tags"
  - "5646 tags-for-identifying-languages"
  - "8259 json"
  - BCP 47 (RFC 5646) §2.2.9 — classes of conformance
  - BCP 47 (RFC 5646) — tags for identifying languages
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
  computationUuid: "27666097-45c5-8598-92cb-4b8a614ded92"
  stages:
    - stage: path
      stageUuid: "c9d27647-6c4b-80d0-8b9a-a06fd2688259"
    - stage: trinity
      stageUuid: "f88e7559-dab2-8ba9-9c12-1863b1aa274c"
    - stage: boundary
      stageUuid: "34d330a0-7170-8405-b043-42a8c9e59bda"
    - stage: links
      stageUuid: "652f2978-9c42-871f-a152-04eb5c88b5a7"
    - stage: horo
      stageUuid: "168421b1-ffcb-8afa-a8fc-e0261ab6c26b"
    - stage: seal
      stageUuid: "7369c3fb-6c15-8048-9330-941bc61ffedb"
    - stage: uuid
      stageUuid: "1a81897c-7565-87a2-9c0f-b477760778a2"
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
