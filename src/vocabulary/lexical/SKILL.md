---
name: lexical
description: "Use when reasoning about lexical — is erpax's **rich-text** substrate: the Payload Lexical editor (config ), a structured JSON **node-tree** — not an opaque string. Two consequences make it central:"
atomPath: "vocabulary/lexical"
coordinate: "vocabulary/lexical · 7/descent · 8bfc0b0c"
contentUuid: "aa350f1a-df0d-5717-9c54-6891099e0155"
diamondUuid: "68adfd5a-73a4-8010-b6da-3a71521c1649"
uuid: "8bfc0b0c-82d8-84c6-8ebe-4c083c3f1726"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 48
standards: []
bindings: []
signatures:
  computationUuid: "255e3871-787f-8ec0-943e-976ea8648638"
  stages:
    - stage: path
      stageUuid: "22b1078e-1c05-8601-bfc9-09c5fcc830d8"
    - stage: trinity
      stageUuid: "8092588f-a3c8-8142-9842-341f3e3042a0"
    - stage: boundary
      stageUuid: "9fceba03-8c74-8a3e-bb08-11115a97ea3c"
    - stage: links
      stageUuid: "99342651-2276-85b8-8769-cc8a831101f3"
    - stage: horo
      stageUuid: "91f10cf6-52bc-80da-86a7-ea0a59d4ac61"
    - stage: seal
      stageUuid: "6af51122-c277-8f86-b16a-1dd81b31cae6"
    - stage: uuid
      stageUuid: "a0a29afe-800a-884b-80e3-1e1373e05df4"
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
