# heros/post/hero — the date is machine-readable, and the byline is absent when there is none

A post's header: categories, the title as the page's `<h1>`, the byline, the publication date, and
the cover image.

Three decisions are load-bearing.

**The date is a `<time dateTime=…>`.** The visible text is formatted for a human in their locale;
the attribute carries ISO 8601. Without it a crawler, a feed reader and an assistive technology each
get "4 September 2026" as an opaque string in a language they may not parse. Two representations, one
value — and the machine-readable one is the attribute, not the text.

**A byline appears only when there is an author.** The check is not merely `length > 0`: authors can
be populated and still format to an empty string, and the failure that guards against is a heading
that reads "Author" followed by nothing.

**A missing category title falls back to a translated word**, never to blank or to `undefined`. A
category chip with no text is a piece of furniture the reader cannot interpret.

**Honest boundary.** The proof asserts these three and the `<h1>`. It does not check heading order in
the page as a whole — this hero is a fragment, and §1.3.1 outline validity is a page-level property.
Image handling belongs to `media`.

**Law — [[law]]: a value shown to a person and a value read by a machine are two representations of
one fact, and both are emitted. A formatted date with no `dateTime` is legible to exactly one of its
two audiences.**

## Standards

- **ISO 8601** — the `dateTime` attribute's value.
- **W3C HTML5** — the `time` element; one `h1` per document fragment.
- **WCAG 2.2 §1.3.1** — info and relationships.

Composes: `heros` · `format/author` · `iso/8601` · [[law]].
