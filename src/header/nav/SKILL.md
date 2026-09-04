# header/nav — the icon link has a name, because an icon has none

A magnifying glass is a picture. To a screen reader, a link containing only a picture has an
accessible name of *the empty string* — announced as "link", with nothing to say where it goes. WCAG
2.2 §2.4.4 asks that a link's purpose be determinable from the link itself, and an icon-only link is
the single most common way to fail it.

The `sr-only` span is the fix, and it is the fragile part: it is invisible, so nothing on screen
changes if it is deleted, reworded into nonsense, or left untranslated. The proof beside this asks
for the link **by its accessible name**, which is the only way that regression is visible.

The rest is a `<nav>` landmark holding CMS-authored links, and a locale switcher.

**Honest boundary.** This proves the search link is nameable and that the navigation is a landmark. It
does not check the CMS links themselves — [[link]]/component owns those — and it does not verify the
translation is *correct* in any locale, only that a name exists where an icon would otherwise leave
none.

**Law — [[law]]: a link whose content is an icon carries its name in text a screen reader can read.
Deleting that text changes nothing visible and leaves an unnamed link — so the proof asks for the
link by name, never by position.**

## Standards

- **WCAG 2.2 §2.4.4** — link purpose in context.
- **WCAG 2.2 §1.3.1** — the `<nav>` landmark.

Composes: [[header]] · [[link]]/component · [[law]].
