---
name: archive
description: "Use when reasoning about archive — The archive lays post cards in a responsive grid. Visually it is columns; structurally it is an **ItemList** — a set of sibling entries with a defined order — and that structure…"
atomPath: "collection/archive"
coordinate: "collection/archive · 4/weave · e291d610"
contentUuid: "8229ad6c-7e32-5c32-ac1e-0f193f14f1d0"
diamondUuid: "238021ba-00d9-8ae5-8082-11545311cb4b"
uuid: "e291d610-8c27-86a7-8ea4-80c119bdccf0"
horo: 4
typography:
  partition: collection
  bondDegree: 27
standards:
  - "W3C HTML5 section-element"
  - "W3C-HTML5"
  - "WCAG-2.1 §2.4.1 bypass-blocks"
  - schema.org CollectionPage
  - schema.org ItemList
bindings: []
signatures:
  computationUuid: "cd64c2e3-35d7-8fa7-86df-8a16bf315061"
  stages:
    - stage: path
      stageUuid: "66aea96a-5b16-8d6b-81ed-eab39162d1da"
    - stage: trinity
      stageUuid: "a8281c38-0274-8ee2-a22c-7752378a758d"
    - stage: boundary
      stageUuid: "0a58eb9f-8458-8af7-bfc7-796457e9fbe4"
    - stage: links
      stageUuid: "e330e431-29eb-8116-bfa6-00a564d0f1de"
    - stage: horo
      stageUuid: "322c89e3-f5f9-8bbe-af5c-f67e233be490"
    - stage: seal
      stageUuid: "0ec410ef-77fc-8988-9acc-a6a059e4b46b"
    - stage: uuid
      stageUuid: "e9021451-31ac-82d4-9b42-dd1de88eb167"
version: 2
---
# collection/archive — a grid of posts is a list of items, whatever the CSS says

The archive lays post cards in a responsive grid. Visually it is columns; structurally it is an
**ItemList** — a set of sibling entries with a defined order — and that structure is what a screen
reader, a search crawler and schema.org all consume. CSS grid can rearrange the visual order without
touching the DOM order, which is precisely why the semantic layer must be stated rather than inferred
from the layout.

Each entry is a [[card]], which carries its own accessibility proof: the accessible name is the post
title, the whole card is the hit target, and a post without a title renders no link at all.

**Honest boundary.** This atom owns the container and the iteration. Every claim about an individual
entry — link naming, target size, the `<article>` element — belongs to [[card]] and is proven there.
Pagination state is the caller's.

**Law — [[law]]: visual arrangement is not structure. A grid of entries is marked up as a list of
items, because the relationship between them is information that CSS cannot carry.**

## Standards

- **schema.org ItemList · CollectionPage** — the collection and its ordered entries.
- **W3C HTML5** — the section element.
- **WCAG 2.2 §2.4.1** — bypass blocks.

Composes: [[card]] · [[collection]] · [[law]].
