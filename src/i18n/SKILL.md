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
