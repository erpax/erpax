---
name: chrome
description: "Use when reasoning about chrome — The per-locale shell: message provider, , admin bar, header, children, footer. Its substance is that **one locale value reaches every part at once**, and the mechanism is the ."
atomPath: "intl/chrome"
coordinate: "intl/chrome · 4/weave · 2f326510"
contentUuid: "1c27fbf1-d01f-5a01-b525-6b1767d503d7"
diamondUuid: "42415362-618e-8354-9d10-05d0d8155820"
uuid: "2f326510-289d-800d-b8be-db6377e35399"
horo: 4
typography:
  partition: intl
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "03edcbab-63ba-87de-8b06-557ef5b9e3ef"
  stages:
    - stage: path
      stageUuid: "99166479-94db-80b7-9fd3-405104014b44"
    - stage: trinity
      stageUuid: "71eaf70b-881b-8eea-9a46-19b44af1c126"
    - stage: boundary
      stageUuid: "bf5703e0-67f6-8e99-80a1-4a32f851513a"
    - stage: links
      stageUuid: "0c0922a8-9089-83f5-9972-cb2ab2cab252"
    - stage: horo
      stageUuid: "def33b74-0a0b-8f42-8f6f-4c6feb529a79"
    - stage: seal
      stageUuid: "6bc1ba92-0d8f-834a-8d72-957c967743e4"
    - stage: uuid
      stageUuid: "5303e7d6-4fcf-8b12-9557-903dd9d2a6a7"
version: 2
---
# intl/chrome — one locale, keyed through every part of the frame

The per-locale shell: message provider, `<html lang>`, admin bar, header, children, footer. Its
substance is that **one locale value reaches every part at once**, and the mechanism is the `key`.

React reuses a component instance when its position and type are unchanged. Switching locale changes
neither, so a header holding locale-derived state would keep the old language while the page around
it changed — a half-translated frame that looks like a caching bug and is not one. `key={locale}`
forces a fresh instance, which is why it appears on the provider, the header and the footer alike.

`noStore()` is the other half. This frame depends on the request — the locale and the draft-mode
cookie — so caching it across requests would serve one visitor's language and preview state to
another. Opting out is a correctness requirement, not a performance trade.

**Honest boundary.** The proof asserts the composition, the keying and the locale threading, by
awaiting the element this async component returns and reading the tree — no DOM is involved. It does
not verify that the messages themselves are complete for a locale, and it does not test draft mode's
own behaviour.

**Law — [[law]]: a value that changes the whole frame is keyed, and a frame that depends on the
request is not cached. React reuses what looks unchanged, so a locale switch without a key leaves
parts of the page in the previous language.**

## Standards

- **BCP 47** — language tags.
- **WCAG 2.2 §3.1.1** — language of page, set by `document/html/lang`.

Composes: `document/html/lang` · `header` · `footer` · [[law]].
