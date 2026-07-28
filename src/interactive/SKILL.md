---
name: interactive
description: "Use when reasoning about the collapse of collections into interactive trinities — a collection is a node, the trinity tells it three ways (matter, antimatter, backend) and renders it once; interactive adds the live fourth face (the render), so every collection is seen and acted on, not only read."
atomPath: interactive
coordinate: "interactive · 4/weave · 942887a9"
contentUuid: "8bbef085-a130-50a1-9f4d-95edc36591fc"
diamondUuid: "e20c2b83-83ee-88fb-b941-10ca06f165f2"
uuid: "942887a9-259c-8592-9caa-c65b8db9acdf"
horo: 4
bonds:
  in:
    - atom
    - collection
    - component
    - law
    - pixel
    - render
    - trinity
  out:
    - atom
    - collection
    - component
    - law
    - pixel
    - render
    - trinity
typography:
  partition: interactive
  bondDegree: 21
  neighbors: []
standards:
  - "the trinity (one node, three sources, one page) extended by the render (the fourth, live face)"
bindings: []
neighbors:
  wikilink:
    - atom
    - collection
    - component
    - law
    - pixel
    - render
    - trinity
  matrix:
    - atom
    - collection
    - component
    - law
    - pixel
    - render
    - trinity
  backlinks:
    - atom
    - collection
    - component
    - law
    - pixel
    - render
    - trinity
signatures:
  computationUuid: "951be9c5-7015-8e4a-a484-e6e91d5b1227"
  stages:
    - stage: path
      stageUuid: "9581d773-c763-85a2-a158-f500278b94a0"
    - stage: trinity
      stageUuid: "0376342e-cd97-8cec-98eb-e7bcb69bc096"
    - stage: boundary
      stageUuid: "a8badf54-fd42-8c3b-893a-9cdc0b0d4e78"
    - stage: links
      stageUuid: "34faae01-fe54-8752-872c-284dcf1e9683"
    - stage: horo
      stageUuid: "cfdb43a4-2251-8e64-b13a-7ef3267b059f"
    - stage: seal
      stageUuid: "16b2264d-ce46-87ea-a921-8e39b2dfde16"
    - stage: uuid
      stageUuid: "f7895050-7939-8db1-87a7-b72156023319"
version: 2
---
# interactive — the collections folded into interactive trinities

A [[collection]] is a node. The [[trinity]] already folds it: **matter** (`index.ts` — the config + banners), **antimatter** (`SKILL.md` — the skill/law), **backend** (the generated payload-type) — one node, told three ways, fused into one page. **Interactive** adds the live **fourth face**: the **render**. The UI agent's `renderAtom` turns the node's content-uuid into its [[pixel]] (colour), its sensory [[render]] (colour·sound·vibration), and its [[component]]/page — so the page is not a static read but a thing you **see and act on**.

So *fold the collections into interactive trinities* means: take every node, and beside its three told sources stand its rendered self — `foldCollection(atom)` returns the interactive trinity, and `folded()` shows that **every** collection folds, coverage total. The corpus stops being a set of schemas to query and becomes a set of **interactive nodes** — each its own little app, rendered from its identity.

Because the render reads the same content-uuid the three sources share, the fourth face cannot disagree with the other three (no hardcoded UI to drift): the interactive trinity is consistent by construction, the same DRY that holds the trinity holds its render.

Matter-twin: `src/interactive/index.ts` (`foldCollection` · `folded` · `InteractiveTrinity`). Composes [[trinity]] · [[collection]] · [[pixel]] · [[component]] · [[render]] · [[atom]].

**Law — [[law]]: every collection folds into an interactive trinity — its three sources (matter, antimatter, backend) made live by a fourth face, the render computed from the same content-uuid. One node, told three, rendered live; coverage is total — the whole corpus is interactive, not merely readable, and the render can never drift from the three it renders.**

@audit the interactive face is renderAtom over the node's content-uuid; coverage read live from the matrix, never asserted
@standard the trinity (one node, three sources, one page) extended by the render (the fourth, live face)
