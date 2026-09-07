---
name: text
description: "Use when reasoning about text — Lexical's serialized state becomes a React tree here. Most of that is the library's own default converters; what this atom decides is the small part the library cannot know."
atomPath: "rich/text"
coordinate: "rich/text · 8/crest · 60af13fd"
contentUuid: "4c3f6d16-7e47-5dc0-be5c-5765c6c5f94d"
diamondUuid: "3a29e966-d20f-8278-bb4a-3300b39ce5de"
uuid: "60af13fd-c263-84d5-aa48-0a17e05514f0"
horo: 8
typography:
  partition: rich
  bondDegree: 75
standards:
  - "CommonMark 0.31 markdown-fallback"
  - "W3C HTML5 Living Standard rich-text-output"
  - "WCAG-2.1 §1.3.1 info-and-relationships"
  - "WCAG-2.1 §1.4.10 reflow"
  - schema.org HTMLRichText
bindings: []
signatures:
  computationUuid: "a0399894-da04-80be-bd68-27010f1509ac"
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
      stageUuid: "4cf851c9-47e2-8e9e-8253-6091abcbd2d9"
    - stage: seal
      stageUuid: "f5c48d9a-e85a-82a1-a5cc-53e32a497726"
    - stage: uuid
      stageUuid: "0ae9f525-bb69-8640-9a52-cebad0a4bf9f"
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
