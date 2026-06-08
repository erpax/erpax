---
name: replay
description: "Use when an auditor demands \\\"show me how this number was computed and reproduce it\\\" — deterministic replay re-runs a chain step and proves byte-identical output by hashing the AgentEffect sequence (timestamps stripped) and matching it against the leaf's recorded outputHash."
atomPath: beyond/replay
coordinate: beyond/replay · 2/share · 639ac650
contentUuid: "800f7e44-6dd8-5218-9525-1eb668f69920"
diamondUuid: "00a00d3c-9663-8368-a507-a54a741f57c1"
uuid: "639ac650-edb5-8f63-b068-9ef15dda177d"
horo: 2
bonds:
  in:
    - audit
    - beyond
    - integrity
    - law
    - trinity
  out:
    - audit
    - beyond
    - integrity
    - law
    - trinity
typography:
  partition: beyond
  bondDegree: 15
  neighbors: []
standards:
  - "ISO/IEC 25010:2023 testability + reusability"
  - "ISO/IEC 25010:2023 §5.5 testability + §5.7 reusability"
  - "ISRS 4400 agreed-upon-procedures (replay verification)"
bindings: []
neighbors:
  wikilink:
    - audit
    - beyond
    - integrity
    - law
    - trinity
  matrix:
    - audit
    - beyond
    - integrity
    - law
    - trinity
  backlinks:
    - audit
    - beyond
    - integrity
    - law
    - trinity
signatures:
  computationUuid: "61b82564-2af8-8ce1-8c19-fc54b2234f7c"
  stages:
    - stage: path
      stageUuid: "0e8f4b83-e98b-86c0-9791-fd654ffb1f6a"
    - stage: trinity
      stageUuid: "f6036cae-56f3-8d3c-8e15-dd670397bd9d"
    - stage: boundary
      stageUuid: "215b30d2-ec2a-8267-a744-1202cab30d42"
    - stage: links
      stageUuid: "9c02f772-ec16-8c68-9ebe-a5864966711a"
    - stage: horo
      stageUuid: "f804c58b-2668-8f93-8325-579e3307c591"
    - stage: seal
      stageUuid: "ffcd2413-5fcd-866f-a960-b3d70a9c7114"
    - stage: uuid
      stageUuid: "dc207c14-dd18-8899-9dad-5ef39a6cfe8f"
version: 2
---
# beyond/replay — deterministic replay (byte-identical re-computation)

Law 12 of the [[beyond]] horizon: given an [[audit]] leaf and a tenant snapshot, the chain step can be re-run and proven to produce the exact same output. `effectsHash` canonicalizes an `AgentEffect` sequence (stripping non-deterministic `emittedAt` timestamps from emit events) into a content-uuid via the [[integrity]] substrate, so the same inputs always hash to the same value. `replayLeaf` invokes the caller's re-run and returns `ok:true` only when the recomputed hash matches the expected one. `isReplayStable` checks a sequence is JCS-serializable and carries no missing timestamps.

Matter-twin: src/beyond/replay/index.ts (`effectsHash` · `replayLeaf` · `isReplayStable`) — `ReplayRequest` / `ReplayResult` typed in src/beyond/types.

**Law — [[law]]: the same inputs always recompute to the same [[integrity]] hash; a replay counts only when the recomputed effects-hash is byte-identical to the [[audit]] leaf's recorded output — the [[trinity]] proof holds the determinism invariant.**

@standard ISRS 4400 agreed-upon-procedures (replay verification)
@standard ISO/IEC 25010:2023 testability + reusability
