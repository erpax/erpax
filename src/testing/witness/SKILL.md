---
name: witness
description: "Use when a test derives over the whole corpus and hangs — the bounded-witness helper: sample a large domain (bounded-witness) or take the whole when it is small (finite-complete), replacing every ad-hoc slice."
atomPath: "testing/witness"
coordinate: "testing/witness · 2/share · ff1a9ee9"
contentUuid: "69f0b39a-5eaf-51e2-83e3-8802f38fabb9"
diamondUuid: "ba587279-892c-8f57-ad47-0f27af8b4f94"
uuid: "ff1a9ee9-6d10-8e3c-824f-bb0d54681774"
horo: 2
typography:
  partition: testing
  bondDegree: 9
standards:
  - "ISO/IEC 25010:2023 §5.5 testability — a bounded witness is exhaustively checkable"
bindings: []
signatures:
  computationUuid: "2bb765c3-270c-83be-a296-865c7a3b46e2"
  stages:
    - stage: path
      stageUuid: "77f7cfb0-fd54-86a0-993c-b5e6aaea19cb"
    - stage: trinity
      stageUuid: "ec585c44-1cc4-83db-ac59-5de585df50f2"
    - stage: boundary
      stageUuid: "a1348206-8ce0-8729-95d4-a61df1db3e5f"
    - stage: links
      stageUuid: "3980bfb8-e08c-85f4-b99c-51ad61fe17e9"
    - stage: horo
      stageUuid: "93b2b089-f7d4-83c6-8d68-6d1f88b2de8d"
    - stage: seal
      stageUuid: "f23abff2-61cb-8963-91a2-1b3091ff3eb8"
    - stage: uuid
      stageUuid: "8976e4ec-c1c7-8921-ad7a-9f9760a6eeee"
version: 2
---
# testing/witness — the bounded witness

The session's most-repeated fix, named by ceccec.psg.bg's proof taxonomy and made one tool. A unit test that maps a corpus-scale derivation over EVERY atom runs for minutes; the law it broke is **bounded-witness** — verify a representative SAMPLE when the domain is large. Its sibling **finite-complete** exhausts the whole domain when it is small (a 4-rung ladder, a 7-position ring). `boundedWitness(domain, n)` returns the sample — or the whole, when the domain is already ≤ n (then it IS finite-complete, `isFiniteComplete`). `spreadWitness` touches the whole range when a prefix would miss the tail.

This replaces the scattered `.slice(0, 12)` in balance, the fixture-cwd in educate/intelligence, the sample in skill-context — one helper both proof classes reach for.

**Honest boundary.** A bounded witness proves the aggregation's SHAPE, never a corpus-wide value — a whole-corpus fact is the audit lane's job, not a unit test's. The witness is representative by content-order, not by adversarial coverage; `spreadWitness` mitigates but does not guarantee.

**Law — [[law]]: a test over a large domain verifies a bounded witness; over a small one, the finite-complete whole — never the whole of a large domain in a unit test.**

Composes: [[testing]] · [[theorem]] · [[law]].
