---
name: impact
description: "Use when reasoning about impact — The quiet hero: a narrow column holding either rendered children or CMS rich text."
atomPath: "heros/low/impact"
coordinate: "heros/low/impact · 8/crest · 3311ea78"
contentUuid: "99399fd4-9869-5779-a6b0-c5adada252e3"
diamondUuid: "6ff75dab-82e9-837d-a783-a1f0017ceca6"
uuid: "3311ea78-c8f9-8aa6-b7e6-e7ef44defaa5"
horo: 8
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "55872b44-456f-8e88-89c9-0aeb95a4260f"
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
      stageUuid: "12b441d8-ec8b-8cc2-9aa8-ce8395a72bf4"
    - stage: seal
      stageUuid: "b220c57c-11ce-8a8f-9936-3021e6655d19"
    - stage: uuid
      stageUuid: "048b6e23-5d20-8961-b159-abd3e7636070"
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
