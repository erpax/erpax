---
name: archive
description: "Use when reasoning about archive — The archive lays post cards in a responsive grid. Visually it is columns; structurally it is an **ItemList** — a set of sibling entries with a defined order — and that structure…"
atomPath: "collection/archive"
coordinate: "collection/archive · 8/crest · b6a40dc7"
contentUuid: "52a11c3a-d5de-56ef-be36-bc004301506f"
diamondUuid: "ea21b554-3381-878a-b8fb-c3d5638022f4"
uuid: "b6a40dc7-f234-8082-89e7-81f382b65f68"
horo: 8
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
  computationUuid: "a3b3c429-d1ee-8f49-822d-9d4c776ce4ed"
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
      stageUuid: "0177170b-3235-8587-829f-b2476554e43f"
    - stage: seal
      stageUuid: "0ec410ef-77fc-8988-9acc-a6a059e4b46b"
    - stage: uuid
      stageUuid: "fe4833cb-ca14-8309-add7-de20e5414632"
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
