---
name: impact
description: "Use when reasoning about impact — The quiet hero: a narrow column holding either rendered children or CMS rich text."
atomPath: "heros/low/impact"
coordinate: "heros/low/impact · 5/round · 09d4bea1"
contentUuid: "f369e46d-0204-549e-bce0-1b2fc000f1b6"
diamondUuid: "20021d21-32d1-82a4-a34f-08659c18bf77"
uuid: "09d4bea1-f2be-8789-b5bc-d70e67b4bf81"
horo: 5
typography:
  partition: heros
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "573ecce6-cdcf-89a0-b76c-c24331b8907c"
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
      stageUuid: "b0efeded-dc9a-8b34-a26c-ee6abf936623"
    - stage: seal
      stageUuid: "b220c57c-11ce-8a8f-9936-3021e6655d19"
    - stage: uuid
      stageUuid: "d89b8d6f-ee58-8858-8f5e-c5fea436e3a2"
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
