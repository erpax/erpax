---
name: tag
description: "Use when reasoning about tag — Every locale tag the corpus writes must be a **well-formed and already-canonical BCP 47 tag**: every entry in , and every or property with a string literal value."
atomPath: "i18n/tag"
coordinate: "i18n/tag · 4/weave · 1b10328f"
contentUuid: "2b125046-0cf9-52f2-8f4f-92c4e2b391d6"
diamondUuid: "97554416-6fe4-88a6-a1f6-10b62e0b0fb8"
uuid: "1b10328f-5cdb-87ec-b221-80ab5f4e5ce5"
horo: 4
typography:
  partition: i18n
  bondDegree: 35
standards:
  - BCP 47 (RFC 5646) §2.2.9 — classes of conformance
  - BCP 47 (RFC 5646) — tags for identifying languages
  - "RFC-5646"
bindings: []
signatures:
  computationUuid: "5cb3f69e-8e78-8597-8e79-31900221666f"
  stages:
    - stage: path
      stageUuid: "035d0baa-7809-805a-9742-642f9e32e869"
    - stage: trinity
      stageUuid: "f30c4ec1-e9e2-8a3a-8244-859428039d97"
    - stage: boundary
      stageUuid: "0ba4e332-787a-8d60-bd6c-5f4cb206a532"
    - stage: links
      stageUuid: "e5fe87cb-4a09-89b4-af4e-b3d2039e3495"
    - stage: horo
      stageUuid: "5c84f275-2032-8651-bd49-a43a9ad97998"
    - stage: seal
      stageUuid: "36b4661d-5c49-8885-a923-6d42cdaafc89"
    - stage: uuid
      stageUuid: "13a67d78-096e-82ab-a085-fac19a2465d5"
version: 2
---
# i18n/tag — a tag no registry can parse selects no language

Every locale tag the corpus writes must be a **well-formed and already-canonical BCP 47 tag**: every
entry in `supportedLocales`, and every `locale:` or `defaultLocale:` property with a string literal
value. `assertTagsWellFormed` fails closed and the live count is **0** — a theorem, because a tag no
registry can parse selects no language, and the fallback that hides it is silent.

## The runtime is the registry

`Intl.getCanonicalLocales` is the registry's own implementation, shipped with the engine. Nothing
here restates a subtag list, so nothing here rots when IANA adds a subtag.

## Canonical, not merely well-formed

`en-us` parses fine and names the same locale as `en-US`. Accepting both lets one locale exist at
two spellings — the split [[proof]]/register paid for with `ISO/IEC 27001` and `ISO 27001`, where a
gate citing one could not discharge an atom citing the other.

## Why this is its own atom

It **scans**, through [[syntax]]/cache and `node:fs`, and `@/i18n` is in every client bundle — the
gate there broke the production build outright. A corpus-scanning gate never sits in a barrel the
app imports.

**Honest boundary.** This proves a tag is **parseable and canonical**, never that the language is
**translated**: presence in `supportedLocales` says the system will route and format it, which is
the boundary [[i18n]]/localization already draws. A tag assembled at runtime is invisible to a
lexical scan.

**Law — [[law]]: a locale is a canonical tag or it is a string. Ask the registry the runtime already
ships, and refuse a second spelling of a language the corpus already speaks.**

## Standards

- **BCP 47** (RFC 5646) — tags for identifying languages.
- **ECMA-402** — `Intl.getCanonicalLocales`, the canonicalisation this gate asks.

Composes: [[i18n]] · [[i18n]]/localization · [[syntax]] · [[law]].
