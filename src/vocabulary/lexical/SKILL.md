---
name: lexical
description: "Use when reasoning about lexical — is erpax's **rich-text** substrate: the Payload Lexical editor (config ), a structured JSON **node-tree** — not an opaque string. Two consequences make it central:"
atomPath: "vocabulary/lexical"
coordinate: "vocabulary/lexical · 2/share · caf5ff35"
contentUuid: "9f58e7f7-9ee2-55ca-a7a0-7f6d971524ea"
diamondUuid: "a3a88d82-0e70-8ab9-b17e-b90e34446cfe"
uuid: "caf5ff35-34ed-843b-8672-ccfc4b3db915"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "d2f1d8e7-6934-8b94-8863-7957f0e70c2d"
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
      stageUuid: "c2a7b612-0b31-865c-b1a6-83da71cde48e"
    - stage: seal
      stageUuid: "59c250bb-ab85-8d31-8bf2-7a735102cd1c"
    - stage: uuid
      stageUuid: "2f394be9-d35f-8666-aec0-52dbebc1ff8c"
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
