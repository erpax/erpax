---
name: routing
description: "Use when reasoning about routing — is the whole claim. Every URL carries its locale — , — so the language a page renders in is a fact of the address, not a negotiation between a cookie, an header and a pathname…"
atomPath: "i18n/routing"
coordinate: "i18n/routing · 4/weave · c997c791"
contentUuid: "3e26a5a9-8100-5b72-a0bd-232352e0df04"
diamondUuid: "fc83425f-88a4-87be-9c2f-58520e2a7453"
uuid: "c997c791-f8f2-8aec-bb3e-d8e79f9ea704"
horo: 4
typography:
  partition: i18n
  bondDegree: 31
standards:
  - "3986 uniform-resource-identifier locale-path-segment"
  - "9110 http-semantics"
  - "BCP-47 language-tag"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - "RFC-3986"
  - W3C URL Living Standard
bindings: []
signatures:
  computationUuid: "36b59f91-1514-86d5-a009-3ef0d156475b"
  stages:
    - stage: path
      stageUuid: "bf0235a1-7aaa-866e-8fb1-bcff2ea6730b"
    - stage: trinity
      stageUuid: "61b14aeb-3661-8be4-a5de-b54e5a48d9bb"
    - stage: boundary
      stageUuid: "33398dfa-fff1-8ba3-9bee-ac88013ba588"
    - stage: links
      stageUuid: "41e669e1-3755-8f68-a046-3369a2862f76"
    - stage: horo
      stageUuid: "86e4ae3d-a8c6-89c3-9ca6-0f5b4ca72e96"
    - stage: seal
      stageUuid: "c22806a5-d489-81b0-9c72-7d0b437060cb"
    - stage: uuid
      stageUuid: "dab7b4db-cbb6-8902-821a-45a18e1797f1"
version: 2
---
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
