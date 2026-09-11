---
name: impact
description: "Use when reasoning about impact — The quiet hero: a narrow column holding either rendered children or CMS rich text."
atomPath: "heros/low/impact"
coordinate: "heros/low/impact · 8/crest · 27281c70"
contentUuid: "706ba75e-bf45-56fc-b90b-11c0a4dcb523"
diamondUuid: "a41edaa8-27e3-8f54-8533-17040b8648e5"
uuid: "27281c70-135b-89e6-813a-cf156b8ed6a9"
horo: 8
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "b88d6481-4c14-8ec0-98dd-ea8e83bbdf74"
  stages:
    - stage: path
      stageUuid: "e75caccc-864c-893b-840a-88e74ec7acee"
    - stage: trinity
      stageUuid: "730263d5-4d7b-8e65-980c-d79221991a34"
    - stage: boundary
      stageUuid: "65c72867-6175-82c2-97e5-0a9ca029fefb"
    - stage: links
      stageUuid: "a2396f3c-9962-848f-b23d-6e61035e5018"
    - stage: horo
      stageUuid: "4f60f5f2-8c34-8f7d-a7bd-e8bd2ac8898d"
    - stage: seal
      stageUuid: "b220c57c-11ce-8a8f-9936-3021e6655d19"
    - stage: uuid
      stageUuid: "32f64c86-2398-8661-b887-5585e3df7689"
version: 2
---
# heros/low/impact — children OR rich text, and the type says exactly one

The quiet hero: a narrow column holding either rendered children or CMS rich text. Its type is a
discriminated union — `{ children }` **or** `{ richText }`, each forbidding the other with `never` —
so the two can never legitimately arrive together.

The runtime honours that with `children || richText`, and the ordering is the decision: a caller that
passes children is composing explicitly, and an explicit composition outranks CMS content. The proof
pins the precedence, because it is the kind of thing a later refactor flips without noticing —
nothing type-checks differently, and the page simply starts showing the other one.

**Honest boundary.** This proves the precedence and that either source alone renders. It makes no
claim about the rich-text pipeline (`rich/text`) or about layout.

**Law — [[law]]: where a type permits exactly one of two inputs, the runtime states which wins anyway.
A union enforced only at compile time is silent at runtime, and the losing branch disappears without
an error.**

Composes: `heros` · `rich/text` · [[law]].
