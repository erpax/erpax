---
name: lexical
description: "Use when reasoning about lexical — is erpax's **rich-text** substrate: the Payload Lexical editor (config ), a structured JSON **node-tree** — not an opaque string. Two consequences make it central:"
atomPath: lexical
coordinate: lexical · 5/round · 31ba2e95
contentUuid: "31f4526e-e14b-5ba7-8bdd-93fed9563996"
diamondUuid: "56c98ae3-dd71-86e0-a433-cc820f7deef8"
uuid: "31ba2e95-2bdf-82f8-a75f-5a8f91b41d4a"
horo: 5
bonds:
  in:
    - begin
    - chat
    - collapse
    - components
    - config
    - cost
    - fields
    - fractal
    - identity
    - law
    - localize
    - media
    - part
    - uuid
    - whole
  out:
    - begin
    - chat
    - collapse
    - components
    - config
    - cost
    - fields
    - fractal
    - identity
    - law
    - localize
    - media
    - part
    - uuid
    - whole
typography:
  partition: lexical
  bondDegree: 48
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - collapse
    - config
    - cost
    - fields
    - fractal
    - identity
    - law
    - localize
    - part
    - uuid
    - whole
  matrix:
    - begin
    - chat
    - collapse
    - components
    - config
    - cost
    - fields
    - fractal
    - identity
    - law
    - localize
    - media
    - part
    - uuid
    - whole
  backlinks:
    - begin
    - chat
    - collapse
    - components
    - config
    - cost
    - fields
    - fractal
    - identity
    - law
    - localize
    - media
    - part
    - uuid
    - whole
signatures:
  computationUuid: "d1a4d903-18fb-8b74-95d4-7e798f09f52f"
  stages:
    - stage: path
      stageUuid: "f38f818f-ce64-838a-b256-4942ed7b12d0"
    - stage: trinity
      stageUuid: "da868dc3-57fa-8835-90cb-f8833335ab54"
    - stage: boundary
      stageUuid: "238aa7c5-e33a-862d-b7ac-536c353e8b6d"
    - stage: links
      stageUuid: "30f246e8-8b39-8add-a5d1-859efb35b219"
    - stage: horo
      stageUuid: "94441453-9daa-8a51-9345-7a4bb8e6888b"
    - stage: seal
      stageUuid: "9e072fa7-9cca-8aa9-8614-b70d08853ab1"
    - stage: uuid
      stageUuid: "63a652ad-ab89-8e96-8489-1ad876088f34"
version: 2
---
# lexical — rich text as the densest content surface

`lexical` is erpax's **rich-text** substrate: the Payload Lexical editor ([[config]] `editor: lexicalEditor()`), a structured JSON **node-tree** — not an opaque string. Two consequences make it central:

1. **Collapse sink.** Every prose / description / document / body field reduces to Lexical content blocks ([[collapse]]): one editor, one serialization, no bespoke rich-text shapes — a document is a [[whole]] of node [[part]]s.
2. **Densest tamper fuel.** A Lexical field is many nodes; **localized** ([[localize]]) it is a whole tree *per locale*. So one localized Lexical field contributes `locales × nodes` independent content-addresses to the [[tamper/cost]] surface — the richest increment of coverage of any field type. Localizing Lexical is the cheapest way to push the crack-cost toward ∞.

Each node is hashable, so the tree is a [[fractal]] Merkle surface and the whole field rolls into the row's content-[[uuid]] ([[identity]]). Matter-twin: the root config `editor` + the shared Lexical block set. Composes: [[config]] (editor) · [[localize]] · [[tamper/cost]] · [[collapse]] · [[fields]] · [[whole]] · [[part]] · [[fractal]] · [[uuid]].

**Law — [[law]]: lexical is the one rich-text node-tree every prose field collapses to ([[collapse]]) and the densest tamper surface — `locales × nodes` independent content-addresses per localized field, so [[localize|localizing]] Lexical is the cheapest push of crack-[[cost]] toward ∞.**

## Common mistakes
- Storing rich text as an HTML/markdown string — use the Lexical node-tree so it is structured, hashable, and localizable.
- A bespoke per-collection rich-text shape — everything collapses to the one editor + shared blocks ([[collapse]]).
