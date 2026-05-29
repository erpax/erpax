---
name: localize
description: Use when an attribute needs per-locale values — localized name/description, BCP-47 locales, i18n fallback. The LocalizeConcern/LocalizedAttributeConcern pattern; a blank locale routes to its identity element (und).
---

# localize — per-locale attribute values

`localize` is the i18n field atom (Rails `LocalizeConcern`/`LocalizedAttributeConcern`: `setup_localized_attribute` — getter/setter + JSON `->>` ransacker). In Payload this is **native field localization** (`localized: true` on the field), NOT a hand-rolled metadata-JSON map — Payload stores per-locale values and resolves by `req.locale` (see [[config]] localization, [[fields]]). A blank/missing locale routes to its identity element **`und`** ([[identity]] categorical locale — never an ad-hoc default-locale literal). Position **1** ([[fields]]); the locale is also a tag-context for cross-locale views ([[tags]]).

Composes: [[fields]] (`localized`), [[config]] (locales), [[identity]] (`und`), [[queries]] (locale-scoped reads).

## Common mistakes
- Hand-rolling a `metadata.{locale: value}` JSON map — use Payload's `localized: true`.
- A magic default locale (`?? 'en'`) — blanks route to `und`.
