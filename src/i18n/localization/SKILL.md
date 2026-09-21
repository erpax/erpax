---
name: localization
description: "Use when reasoning about localization — The corpus ships 24 EU official languages plus , , , , and . That list is DECLARED here in the open — no theorem derives which languages a business serves — and everything else…"
atomPath: "i18n/localization"
coordinate: "i18n/localization · 2/share · 9bf0e368"
contentUuid: "4d318ebf-38e3-507e-92d1-940ec54f9ba0"
diamondUuid: "5370ce78-7d66-8959-a0db-77bc49c0a30d"
uuid: "9bf0e368-d691-863e-9707-a256bf03dce4"
horo: 2
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
  computationUuid: "1e073dc1-284a-8b05-8b00-189727686542"
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
      stageUuid: "1aa938ba-e0c5-8d9e-8b4e-130596173f7f"
    - stage: seal
      stageUuid: "fa8e2f17-1c91-8e1d-bd90-916cf92e6442"
    - stage: uuid
      stageUuid: "d77e5c3a-3ba8-8487-be48-ebec8aab7a79"
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
