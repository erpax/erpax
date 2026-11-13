---
name: archive
description: "Use when reasoning about archive — The archive lays post cards in a responsive grid. Visually it is columns; structurally it is an **ItemList** — a set of sibling entries with a defined order — and that structure…"
atomPath: "collection/archive"
coordinate: "collection/archive · 8/crest · b6a40dc7"
contentUuid: "f1e77db1-bdce-53bc-a51b-d43a684d1828"
diamondUuid: "de3e57d5-e0d3-8a20-b42a-135dcca812c6"
uuid: "b6a40dc7-f234-8082-89e7-81f382b65f68"
horo: 8
typography:
  partition: collection
  bondDegree: 15
standards:
  - "W3C HTML5 section-element"
  - "W3C-HTML5"
  - "WCAG-2.1 §2.4.1 bypass-blocks"
  - schema.org CollectionPage
  - schema.org ItemList
bindings: []
signatures:
  computationUuid: "4f1addda-11f0-82f7-a108-b5f3b82d5492"
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
      stageUuid: "c6ab0723-99a3-8cd4-8f69-fe0cf84b5836"
    - stage: seal
      stageUuid: "0ec410ef-77fc-8988-9acc-a6a059e4b46b"
    - stage: uuid
      stageUuid: "0093c19d-36f2-8488-841b-3fb369ebea40"
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
