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
