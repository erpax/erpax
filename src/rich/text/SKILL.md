---
name: text
description: "Use when reasoning about text — Lexical's serialized state becomes a React tree here. Most of that is the library's own default converters; what this atom decides is the small part the library cannot know."
atomPath: "rich/text"
coordinate: "rich/text · 7/descent · 126bfc60"
contentUuid: "64b2e926-66af-5c75-ae08-9369c14ced5b"
diamondUuid: "bec3babb-d17c-8a19-ad06-fe1fd790928e"
uuid: "126bfc60-454a-8499-a3db-ca1adc732bfb"
horo: 7
typography:
  partition: rich
  bondDegree: 69
standards:
  - "CommonMark 0.31 markdown-fallback"
  - "W3C HTML5 Living Standard rich-text-output"
  - "WCAG-2.1 §1.3.1 info-and-relationships"
  - "WCAG-2.1 §1.4.10 reflow"
  - schema.org HTMLRichText
bindings: []
signatures:
  computationUuid: "e224ec0e-1cd9-85ae-ab37-6d281af114b8"
  stages:
    - stage: path
      stageUuid: "aa5c74f2-fbbc-832b-a0d1-67870ec0d87d"
    - stage: trinity
      stageUuid: "089d2e65-53af-8cef-9ec8-ddcb6e427c17"
    - stage: boundary
      stageUuid: "f47c8b56-e04f-8f48-8c48-47c9277addad"
    - stage: links
      stageUuid: "3f7af5c3-ce25-8b68-86f6-6d10c3a66a8a"
    - stage: horo
      stageUuid: "3c751226-ee52-8d7d-a04d-f3f5805c251b"
    - stage: seal
      stageUuid: "f5c48d9a-e85a-82a1-a5cc-53e32a497726"
    - stage: uuid
      stageUuid: "6d31a0b2-e868-8a11-9606-198cf18a20e1"
version: 2
---
# rich/text — an internal link is a route, never a stored URL

Lexical's serialized state becomes a React tree here. Most of that is the library's own default
converters; what this atom decides is the small part the library cannot know.

**Internal links.** An editor linking to another document stores a *relation*, not a URL — and that
is the right storage, because a slug can change and every stored copy of it would rot
([[rules]]/reference is the same law over file paths). So the href is derived at render:
`posts` become `/posts/<slug>`, everything else `/<slug>`.

The unresolved case is a **refusal**, not a guess. If the relation was not populated, the value is an
id rather than a document, and no slug exists — so it raises `INTERNAL_RICHTEXT_VALUE` instead of
emitting `/undefined` or an empty href. A link to nowhere renders as a real link and is discovered by
a reader; a raised error is discovered by whoever ships it.

**Blocks.** Banner, call-to-action, media and code blocks are erpax's own, so their converters are
registered here — the point at which editorial content and the component library meet.

**Honest boundary.** This proves the href derivation and the refusal. It does not verify the target
document exists — that is the relation's integrity, owned by the database — and it makes no claim
about the default converters, which belong to the editor package.

**Law — [[law]]: a link between documents is stored as a relation and resolved at render. Storing the
URL freezes a slug that is free to change, and an unresolvable relation must refuse rather than emit
a link that goes nowhere.**

## Standards

- **W3C HTML5** — rich-text output.
- **WCAG 2.2 §1.3.1 · §1.4.10** — info and relationships; reflow.

Composes: `rich` · [[error]] · `blocks` · [[law]].
