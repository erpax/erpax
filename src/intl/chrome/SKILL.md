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
