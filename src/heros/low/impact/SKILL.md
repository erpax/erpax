---
name: impact
description: "Use when reasoning about impact — The quiet hero: a narrow column holding either rendered children or CMS rich text."
atomPath: "heros/low/impact"
coordinate: "heros/low/impact · 4/weave · ce4c2171"
contentUuid: "a2acbe2f-f08a-510b-9e40-0212a41e62f4"
diamondUuid: "2716c948-62d6-8cf2-a14c-9ac80c6db5af"
uuid: "ce4c2171-553f-85a3-9827-253e7f1199eb"
horo: 4
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "4d91afb6-50af-8c0d-a0c0-2301923ebecc"
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
      stageUuid: "6ad4dc64-6adf-81fd-9dc0-a64b9dffaa5a"
    - stage: seal
      stageUuid: "b220c57c-11ce-8a8f-9936-3021e6655d19"
    - stage: uuid
      stageUuid: "aee5fde0-76a1-8758-bcc3-292c4466b08f"
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
