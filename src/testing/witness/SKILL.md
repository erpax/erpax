---
name: witness
description: "Use when a test derives over the whole corpus and hangs — the bounded-witness helper: sample a large domain (bounded-witness) or take the whole when it is small (finite-complete), replacing every ad-hoc slice."
atomPath: "testing/witness"
coordinate: "testing/witness · 5/round · 7739b6b5"
contentUuid: "7ee3e357-d08e-5fb0-bcb9-fafafb1350d6"
diamondUuid: "aa386b04-c415-81e7-bc2c-31bb8555cb2a"
uuid: "7739b6b5-b371-84cc-bdc3-64447435ec53"
horo: 5
typography:
  partition: testing
  bondDegree: 9
standards:
  - "ISO/IEC 25010:2023 §5.5 testability — a bounded witness is exhaustively checkable"
bindings: []
signatures:
  computationUuid: "4088c685-84d3-89a0-ad3c-e91771febd0c"
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
      stageUuid: "adcae352-52a1-8470-8030-0cae6e4af667"
    - stage: seal
      stageUuid: "f23abff2-61cb-8963-91a2-1b3091ff3eb8"
    - stage: uuid
      stageUuid: "1f6c2a32-345a-82b6-94dc-b1b9ba50d51b"
version: 2
---
# testing/witness — the bounded witness

The session's most-repeated fix, named by ceccec.psg.bg's proof taxonomy and made one tool. A unit test that maps a corpus-scale derivation over EVERY atom runs for minutes; the law it broke is **bounded-witness** — verify a representative SAMPLE when the domain is large. Its sibling **finite-complete** exhausts the whole domain when it is small (a 4-rung ladder, a 7-position ring). `boundedWitness(domain, n)` returns the sample — or the whole, when the domain is already ≤ n (then it IS finite-complete, `isFiniteComplete`). `spreadWitness` touches the whole range when a prefix would miss the tail.

This replaces the scattered `.slice(0, 12)` in balance, the fixture-cwd in educate/intelligence, the sample in skill-context — one helper both proof classes reach for.

**Honest boundary.** A bounded witness proves the aggregation's SHAPE, never a corpus-wide value — a whole-corpus fact is the audit lane's job, not a unit test's. The witness is representative by content-order, not by adversarial coverage; `spreadWitness` mitigates but does not guarantee.

**Law — [[law]]: a test over a large domain verifies a bounded witness; over a small one, the finite-complete whole — never the whole of a large domain in a unit test.**

Composes: [[testing]] · [[theorem]] · [[law]].
