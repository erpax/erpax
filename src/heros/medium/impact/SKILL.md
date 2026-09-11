---
name: impact
description: "Use when reasoning about impact — The mid-weight hero: rich text, an optional set of links, and an optional image below."
atomPath: "heros/medium/impact"
coordinate: "heros/medium/impact · 5/round · 4b889720"
contentUuid: "2266dd6d-f2da-50f1-ba3a-d9961cbd5c7b"
diamondUuid: "34154e00-5487-8ba8-ac86-35e59ac96e46"
uuid: "4b889720-3f32-80d4-8d69-3587db31ee4e"
horo: 5
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "395e45fb-581e-8bf3-8ecc-4e4f7260e7cd"
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
      stageUuid: "7ee70a87-1a47-8cd6-b40c-2fd1aa0654a3"
    - stage: seal
      stageUuid: "d19119c6-96ff-84b3-972d-2a92be622e02"
    - stage: uuid
      stageUuid: "58f23f12-40db-8f4f-baae-8ff9bce6f635"
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
