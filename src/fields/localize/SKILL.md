---
name: localize
description: Use when an attribute needs per-locale values — localized name/description, BCP-47 locales, i18n fallback. The LocalizeConcern/LocalizedAttributeConcern pattern; a blank locale routes to its identity element (und).
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# localize — per-locale attribute values

`localize` is the i18n field atom (Rails `LocalizeConcern`/`LocalizedAttributeConcern`: `setup_localized_attribute` — getter/setter + JSON `->>` ransacker). In Payload this is **native field localization** (`localized: true` on the field), NOT a hand-rolled metadata-JSON map — Payload stores per-locale values and resolves by `req.locale` (see [[config]] localization, [[fields]]). A blank/missing locale routes to its identity element **`und`** ([[identity]] categorical locale — never an ad-hoc default-locale literal). Position **1** ([[fields]]); the locale is also a tag-context for cross-locale views ([[tags]]).

Composes: [[fields]] (`localized`), [[config]] (locales), [[identity]] (`und`), [[queries]] (locale-scoped reads).

## Standards

Applying this skill *is* the implementation of these standards — the answer-path holds their current form.

- **BCP-47 language tags** — `@standard BCP-47` (no edition/version; permanently "BCP 47", a two-RFC IETF subseries updated by reassigning member RFCs). A locale identifier must be a well-formed, valid BCP-47 tag: hyphen-separated subtags in canonical order (`language[-extlang][-script][-region][-variant][-extension][-privateuse]`), each registered in the live IANA Language Subtag Registry (the registry, not any RFC text, is the source of truth for which subtag values are valid). The umbrella `@standard BCP-47` tag is correct as-is.
  - **Tag formation** — `@rfc 5646` (RFC 5646, Sept 2009, "Tags for Identifying Languages"; obsoletes RFC 4646/3066/1766; current as of 2026). Governs the *structure* of a tag — how subtags compose into a canonical identifier. This is the correct and only citation needed for emitting/accepting tag shape.
  - **Tag matching/selection** — `@rfc 4647` (RFC 4647, Sept 2006, "Matching of Language Tags"; current as of 2026). Governs *resolution* — `fallbackLocale` in `config.localization`, hreflang variant selection, and the locale cascade in `locale-utils.ts` must follow RFC 4647's lookup/filtering algorithms, not naive string equality. Cite `@rfc 4647` alongside `@rfc 5646` wherever this skill does matching (it covers the behavior RFC 5646 does not).

## Common mistakes
- Hand-rolling a `metadata.{locale: value}` JSON map — use Payload's `localized: true`.
- A magic default locale (`?? 'en'`) — blanks route to `und`.
- Resolving locales by string equality — use RFC 4647 lookup/filtering for fallback, hreflang, and the locale cascade.
- Hardcoding a locale allow-list as if the RFC defined the values — subtag validity is anchored to the live IANA Language Subtag Registry.
