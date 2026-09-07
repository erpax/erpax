---
name: impact
description: "Use when reasoning about impact — The full-bleed hero. It also **darkens the header on mount** — the hero paints white text over its own dark field, and the header sits on top of it, so a header left in its light…"
atomPath: "heros/high/impact"
coordinate: "heros/high/impact · 5/round · 536bc111"
contentUuid: "ba50684f-aac9-53bd-a77d-95e282abaa66"
diamondUuid: "24a66b96-9b6e-8df7-b860-1db2533f72c8"
uuid: "536bc111-43ab-83a0-bad2-4d4b3c983977"
horo: 5
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "7f008d6a-8509-8328-87a3-e874d2e00687"
  stages:
    - stage: path
      stageUuid: "b6d027c5-93f3-8ca7-bc9a-4f0467a0f760"
    - stage: trinity
      stageUuid: "678e94c7-ef16-8dca-a289-7cc4d5dcc5dd"
    - stage: boundary
      stageUuid: "649bc525-19cb-8dc2-9f7c-7024344aa0c6"
    - stage: links
      stageUuid: "f97d0d84-45aa-8a75-a402-014fcf6d7164"
    - stage: horo
      stageUuid: "45527bff-8b7a-815c-81d3-045c2215e18a"
    - stage: seal
      stageUuid: "eaf792de-f497-8292-b52e-922c0e72fbbe"
    - stage: uuid
      stageUuid: "59707a4f-23eb-8881-9d31-8b122b6536a6"
version: 2
---
# heros/high/impact — a set of links is a LIST, and an empty set is no list at all

The full-bleed hero. It also **darkens the header on mount** — the hero paints white text over
its own dark field, and the header sits on top of it, so a header left in its light theme puts white
links on white. That is a side effect, which is why it is asserted rather than assumed.

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
