# i18n/routing — the locale is always in the path, never inferred

`localePrefix: 'always'` is the whole claim. Every URL carries its locale — `/en/…`, `/de/…` — so
the language a page renders in is a fact of the address, not a negotiation between a cookie, an
`Accept-Language` header and a pathname that omits the default.

next-intl's `as-needed` policy drops the prefix for the default locale, and that is where its edge
cases live: the same path means two things depending on state the URL does not carry, and switching
locale has to reconcile them. Under `always`, `/en/posts` and `/de/posts` are different addresses
with different content, which is the only arrangement a cache, a crawler and a shared link all read
the same way.

`routing` is the single source: its `locales` come from [[i18n]]/localization rather than a second
list, so a locale added there cannot be missing here. `Link`, `redirect`, `usePathname` and
`useRouter` are the navigation primitives bound to that routing — importing Next's own instead is
how a link loses its prefix.

**Honest boundary.** This decides where the locale lives in the URL. It does not decide what a
visitor with no locale in their path gets — that is the middleware's redirect — and it does not
make a translation exist: a locale with no messages renders English copy, which [[i18n]] owns.

**Law — [[law]]: the locale is a segment of the path, always present and always explicit. A URL
that omits it is a URL whose meaning depends on hidden state.**

Composes: [[i18n]] · [[i18n]]/localization · [[law]].
