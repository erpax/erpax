---
name: chrome
description: "Use when reasoning about chrome — The per-locale shell: message provider, , admin bar, header, children, footer. Its substance is that **one locale value reaches every part at once**, and the mechanism is the ."
atomPath: "intl/chrome"
coordinate: "intl/chrome · 8/crest · 6ce18b6d"
contentUuid: "78d14138-b68f-5ed3-b5e6-deaa0e9d7c81"
diamondUuid: "4b316e7d-8645-8ea7-8115-101def24c66b"
uuid: "6ce18b6d-035d-8964-895a-9d4be79d4575"
horo: 8
typography:
  partition: intl
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "525c318b-190f-89c3-809f-0684a7746ee4"
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
      stageUuid: "2b1de3cd-fc9f-8e23-866b-6ea2a4eba085"
    - stage: seal
      stageUuid: "6bc1ba92-0d8f-834a-8d72-957c967743e4"
    - stage: uuid
      stageUuid: "37a98410-de2d-8fcc-9198-027ce482256f"
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
