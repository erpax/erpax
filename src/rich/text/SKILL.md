---
name: text
description: "Use when reasoning about text — Lexical's serialized state becomes a React tree here. Most of that is the library's own default converters; what this atom decides is the small part the library cannot know."
atomPath: "rich/text"
coordinate: "rich/text · 1/base · 960c0e5a"
contentUuid: "22c67cdb-9f3c-584f-8e45-2097292c7d1f"
diamondUuid: "6c3c88e4-d29c-8673-a8b3-61c7f4723d95"
uuid: "960c0e5a-1940-8346-9e52-5fd6b6ddb1a9"
horo: 1
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
  computationUuid: "3b0be7f7-7169-8305-a878-3aa45d5b040a"
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
      stageUuid: "224833e6-eb2e-86d7-9855-1ca428374f2a"
    - stage: seal
      stageUuid: "f5c48d9a-e85a-82a1-a5cc-53e32a497726"
    - stage: uuid
      stageUuid: "d2521529-4ed0-8bc7-94d0-d71f09dd7310"
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
