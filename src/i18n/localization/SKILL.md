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

Composes: [[i18n]] · [[law]].
