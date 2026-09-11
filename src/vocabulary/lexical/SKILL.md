---
name: lexical
description: "Use when reasoning about lexical — is erpax's **rich-text** substrate: the Payload Lexical editor (config ), a structured JSON **node-tree** — not an opaque string. Two consequences make it central:"
atomPath: "vocabulary/lexical"
coordinate: "vocabulary/lexical · 7/descent · b2ec73d5"
contentUuid: "4342e67b-0abc-55df-935c-5d12204b65ef"
diamondUuid: "f731594d-31a2-893d-b9e8-46a0f1d6641b"
uuid: "b2ec73d5-61c6-891f-a84b-3735fb841b3c"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "5bac4220-b725-8fec-be9b-3d4bec4ba0f6"
  stages:
    - stage: path
      stageUuid: "22b1078e-1c05-8601-bfc9-09c5fcc830d8"
    - stage: trinity
      stageUuid: "8092588f-a3c8-8142-9842-341f3e3042a0"
    - stage: boundary
      stageUuid: "e2190099-c303-867c-bb02-ebef928b5f76"
    - stage: links
      stageUuid: "923670ea-c116-80cc-ad48-bf6fef04f3f8"
    - stage: horo
      stageUuid: "adbfc5b9-7d79-8690-a2ab-0b1c90c39fee"
    - stage: seal
      stageUuid: "59c250bb-ab85-8d31-8bf2-7a735102cd1c"
    - stage: uuid
      stageUuid: "15b411ad-f48a-8380-ae22-48bf7ecc143d"
version: 2
---
# lexical — rich text as the densest content surface

`lexical` is erpax's **rich-text** substrate: the Payload Lexical editor ([[config]] `editor: lexicalEditor()`), a structured JSON **node-tree** — not an opaque string. Two consequences make it central:

1. **Collapse sink.** Every prose / description / document / body field reduces to Lexical content blocks ([[collapse]]): one editor, one serialization, no bespoke rich-text shapes — a document is a [[whole]] of node [[part]]s.
2. **Densest tamper fuel.** A Lexical field is many nodes; **localized** ([[localize]]) it is a whole tree *per locale*. So one localized Lexical field contributes `locales × nodes` independent content-addresses to the [[tamper/cost]] surface — the richest increment of coverage of any field type. Localizing Lexical is the cheapest way to push the crack-cost toward ∞.

Each node is hashable, so the tree is a [[fractal]] Merkle surface and the whole field rolls into the row's content-[[uuid]] ([[identity]]). Matter-twin: the root config `editor` + the shared Lexical block set. Composes: [[config]] (editor) · [[localize]] · [[tamper/cost]] · [[collapse]] · [[field]] · [[whole]] · [[part]] · [[fractal]] · [[uuid]].

**Law — [[law]]: lexical is the one rich-text node-tree every prose field collapses to ([[collapse]]) and the densest tamper surface — `locales × nodes` independent content-addresses per localized field, so [[localize|localizing]] Lexical is the cheapest push of crack-[[cost]] toward ∞.**

## Common mistakes
- Storing rich text as an HTML/markdown string — use the Lexical node-tree so it is structured, hashable, and localizable.
- A bespoke per-collection rich-text shape — everything collapses to the one editor + shared blocks ([[collapse]]).
