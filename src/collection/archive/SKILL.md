---
name: archive
description: "Use when reasoning about archive — The archive lays post cards in a responsive grid. Visually it is columns; structurally it is an **ItemList** — a set of sibling entries with a defined order — and that structure…"
atomPath: "collection/archive"
coordinate: "collection/archive · 5/round · bd5e10fa"
contentUuid: "4a859730-c6b7-5e3c-9f59-c08021405c64"
diamondUuid: "24b0efdf-0613-8830-8c7b-a6a998418180"
uuid: "bd5e10fa-a2b7-8c42-8318-cb71b139b04c"
horo: 5
typography:
  partition: collection
  bondDegree: 29
standards:
  - "W3C HTML5 section-element"
  - "W3C-HTML5"
  - "WCAG-2.1 §2.4.1 bypass-blocks"
  - schema.org CollectionPage
  - schema.org ItemList
bindings: []
signatures:
  computationUuid: "1030bb36-cd25-8c94-bcfa-51ad785db65e"
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
      stageUuid: "4241a668-c219-8e88-8b6d-818310871d37"
    - stage: seal
      stageUuid: "0ec410ef-77fc-8988-9acc-a6a059e4b46b"
    - stage: uuid
      stageUuid: "43e43b20-5436-88cc-914d-05ffb5358550"
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
