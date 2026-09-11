---
name: hero
description: "Use when reasoning about hero — A post's header: categories, the title as the page's , the byline, the publication date, and the cover image."
atomPath: "heros/post/hero"
coordinate: "heros/post/hero · 5/round · f12cae36"
contentUuid: "50bf64e0-7c80-5a0a-9e0c-fb0f4aed86c6"
diamondUuid: "c46f77a5-7569-89f2-93b3-62ab9ed9b144"
uuid: "f12cae36-a358-892a-97ed-94dff9551a73"
horo: 5
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "5535d172-4922-8c9f-bbe9-94c653b2d78e"
  stages:
    - stage: path
      stageUuid: "0a689572-6b14-82e6-a8f0-769efb5a14de"
    - stage: trinity
      stageUuid: "e275eba1-6896-896c-985e-3d847aa5e4b4"
    - stage: boundary
      stageUuid: "1cefeead-9467-8864-a83d-32893a8c72d4"
    - stage: links
      stageUuid: "5c5c9b35-73f2-8151-940d-78f35e2e6453"
    - stage: horo
      stageUuid: "7e1fcb47-aa2b-8ee7-b81b-867cfa2148ed"
    - stage: seal
      stageUuid: "6e2fefee-a8a9-8bd9-991f-6ef15bd283af"
    - stage: uuid
      stageUuid: "875f9e26-319c-8011-ab9c-20297582b933"
version: 2
---
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
