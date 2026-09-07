---
name: lexical
description: "Use when reasoning about lexical — is erpax's **rich-text** substrate: the Payload Lexical editor (config ), a structured JSON **node-tree** — not an opaque string. Two consequences make it central:"
atomPath: "vocabulary/lexical"
coordinate: "vocabulary/lexical · 5/round · 0d80c7f4"
contentUuid: "908e1e74-eeb4-5fa0-a7b2-551475813144"
diamondUuid: "f0f63baf-7be1-812f-b837-6048c7241ea9"
uuid: "0d80c7f4-0024-853a-961f-e5650e3659da"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "98f1d205-70b2-8f6b-8853-761d4c5b9f8b"
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
      stageUuid: "6de0d313-7db1-813b-b524-2def28f8eb86"
    - stage: seal
      stageUuid: "59c250bb-ab85-8d31-8bf2-7a735102cd1c"
    - stage: uuid
      stageUuid: "4a25958a-ec5b-8961-86c5-137f0f523647"
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
