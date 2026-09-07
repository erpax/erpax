---
name: impact
description: "Use when reasoning about impact — The mid-weight hero: rich text, an optional set of links, and an optional image below."
atomPath: "heros/medium/impact"
coordinate: "heros/medium/impact · 1/base · e50f8ce0"
contentUuid: "4a7a9233-b3c1-5361-9076-8b41162be8f9"
diamondUuid: "0f37d9f8-4fc0-8576-b037-8b8b974860e5"
uuid: "e50f8ce0-a27a-8ef7-a4c5-407ac42dfcc1"
horo: 1
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "88b05ff3-1c0b-8910-abb7-7c487181dc16"
  stages:
    - stage: path
      stageUuid: "5c09264c-0671-8472-b5aa-7d2a47d60c12"
    - stage: trinity
      stageUuid: "1e79cd07-0d07-8d66-bade-19e7ed9ced14"
    - stage: boundary
      stageUuid: "97f6572b-e5d6-850d-8c80-f749837bdcdb"
    - stage: links
      stageUuid: "1fcf61e4-655c-86ab-9f1c-d68632a3ed8f"
    - stage: horo
      stageUuid: "0c9936df-704a-824e-9ec7-7ee9061895f2"
    - stage: seal
      stageUuid: "d19119c6-96ff-84b3-972d-2a92be622e02"
    - stage: uuid
      stageUuid: "8c148d76-f68b-8334-a9cc-04100c70a3e0"
version: 2
---
# heros/medium/impact — a set of links is a LIST, and an empty set is no list at all

The mid-weight hero: rich text, an optional set of links, and an optional image below.

Two things here are structure, not styling. The call-to-action links render as `<ul><li>` because
they **are** a set of siblings: a screen reader announces "list, 3 items" and lets a user step
through them, which a row of bare anchors cannot offer (WCAG 2.2 §1.3.1). And the list is guarded —
`links.length > 0` — because an empty `<ul>` is announced as "list, 0 items", a piece of furniture
with nothing in it.

Every part is optional, because every part comes from a CMS: rich text, media and links may each be
absent on a draft, and each absence must render nothing rather than an empty shell.

**Honest boundary.** The proof asserts the list structure, the empty-set guard, and that each optional
part is genuinely optional. It does not check the rendered link targets ([[link]]/component owns
those) nor the image pipeline ([[media]]), and it makes no claim about the visual design.

**Law — [[law]]: sibling links are marked up as a list, and an empty collection renders no container.
The relationship between items is information, and an empty list is furniture announced as content.**

## Standards

- **WCAG 2.2 §1.3.1** — info and relationships: a set of items is a list.

Composes: `heros` · [[link]]/component · [[media]] · [[law]].
