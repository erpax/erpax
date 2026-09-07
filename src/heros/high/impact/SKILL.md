---
name: impact
description: "Use when reasoning about impact — The full-bleed hero. It also **darkens the header on mount** — the hero paints white text over its own dark field, and the header sits on top of it, so a header left in its light…"
atomPath: "heros/high/impact"
coordinate: "heros/high/impact · 4/weave · b7ee6947"
contentUuid: "d899a2b1-6fc6-5be6-80e9-621e3348b431"
diamondUuid: "ab2f6900-fd17-8252-a075-42a92528d6be"
uuid: "b7ee6947-fd88-88e2-bb55-4aa671d0f86f"
horo: 4
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "6b964f61-13ee-8ff9-8b80-78b85710e0c2"
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
      stageUuid: "aad15d69-16be-8230-906d-9a87b5155a77"
    - stage: seal
      stageUuid: "eaf792de-f497-8292-b52e-922c0e72fbbe"
    - stage: uuid
      stageUuid: "db225904-710c-8f91-be32-6e3e21e2ff28"
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
