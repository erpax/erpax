---
name: localization
description: "Use when reasoning about localization — The corpus ships 24 EU official languages plus , , , , and . That list is DECLARED here in the open — no theorem derives which languages a business serves — and everything else…"
atomPath: "i18n/localization"
coordinate: "i18n/localization · 7/descent · 43199832"
contentUuid: "4c7ad39e-2486-52bf-b53f-5dd0c1e54e63"
diamondUuid: "91c916a5-618a-8d66-b818-56b0f965c2ae"
uuid: "43199832-0346-869e-98fc-56e83e6ca37e"
horo: 7
typography:
  partition: i18n
  bondDegree: 6
standards:
  - "5646 tags-for-identifying-languages"
  - "BCP-47 language-tag"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - "EU 1958/1 official-languages-of-the-european-union"
  - "EU-1958"
  - "RFC-5646"
  - "Unicode-CLDR"
  - "Unicode-CLDR locale-data"
bindings: []
signatures:
  computationUuid: "7dfb4c90-373d-84f0-964a-02527d67fdd3"
  stages:
    - stage: path
      stageUuid: "6d15eb7d-8d5c-8545-a81e-fd5318a4c926"
    - stage: trinity
      stageUuid: "2224146f-064f-868c-8c1c-fd7b389878bc"
    - stage: boundary
      stageUuid: "2e8acb2c-515d-8c4e-8e73-6dc49f3b1a55"
    - stage: links
      stageUuid: "28471bc2-ad8e-8604-8db5-0a559fb54c8a"
    - stage: horo
      stageUuid: "57fcc6f8-cf17-8cdc-8a1e-9b115282e96f"
    - stage: seal
      stageUuid: "fa8e2f17-1c91-8e1d-bd90-916cf92e6442"
    - stage: uuid
      stageUuid: "63d32fd8-3a2b-87d7-88f6-4d68cc5d7f9c"
version: 2
---
# i18n/localization — one declared list of locales, and English until a translation exists

The corpus ships 24 EU official languages plus `nb`, `is`, `uk`, `ru`, `ja` and `ar`. That list is
DECLARED here in the open — no theorem derives which languages a business serves — and everything
else reads it: [[i18n]]/routing takes its `locales` from `supportedLocales`, so the router cannot
drift from the config, and Payload's localization shape is built from the same array rather than a
second copy of it.

`defaultLocale` is `en`, and the honest part is what that means for content: a string with no
translation yet renders the English copy instead of an empty field or a key. A visible sentence in
the wrong language is a defect a reader can see and report; a blank field is one they cannot.

**Honest boundary.** A locale in this list is SUPPORTED, never COMPLETE — presence here says the
system will route, format and store that language, not that a human has translated the corpus into
it. Whether a given field is really translated is a content question, and no gate here answers it.

**Law — [[law]]: the set of locales is declared once and read everywhere. A second list is a second
source of truth, and the two drift the moment a language is added to one of them.**

## The tag gate

`assertTagsWellFormed` lives here because it judges the list declared here: every tag in
`supportedLocales`, and every `locale:` property with a string literal value in the corpus, must be
a **well-formed and already-canonical** BCP 47 tag. `Intl.getCanonicalLocales` is the registry's own
implementation, so nothing here restates a subtag list that would rot.

Canonical, not merely well-formed: `en-us` parses and names the same locale as `en-US`, and
accepting both lets one locale exist at two spellings. Zero is a theorem — a tag no registry can
parse selects no language, and the fallback that hides it is silent.

## Standards

- **BCP 47** (RFC 5646) — tags for identifying languages.
- **ECMA-402** — `Intl.getCanonicalLocales`, the canonicalisation this gate asks.

Composes: [[i18n]] · [[law]].
