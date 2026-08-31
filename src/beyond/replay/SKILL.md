---
name: replay
description: "Use when an auditor demands \"show me how this number was computed and reproduce it\" — deterministic replay re-runs a chain step and proves byte-identical output by hashing the AgentEffect sequence (timestamps stripped) and matching it against the leaf's recorded outputHash."
atomPath: "beyond/replay"
coordinate: "beyond/replay · 2/share · c3989a49"
contentUuid: "262b12f5-3336-5b63-b6c1-1b00e7eebe37"
diamondUuid: "cb89f103-0858-85d8-9e3e-f29016b2cc58"
uuid: "c3989a49-e7f8-8f43-b247-bef8535d124d"
horo: 2
typography:
  partition: beyond
  bondDegree: 15
standards:
  - "ISO/IEC 25010:2023 testability + reusability"
  - "ISO/IEC 25010:2023 §5.5 testability + §5.7 reusability"
  - "ISRS 4400 agreed-upon-procedures (replay verification)"
bindings: []
signatures:
  computationUuid: "e3651b5d-0197-8331-9a86-fc049cd6e560"
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
      stageUuid: "3a365334-724b-841a-a53c-da412042f377"
    - stage: seal
      stageUuid: "ffcd2413-5fcd-866f-a960-b3d70a9c7114"
    - stage: uuid
      stageUuid: "f88f27c3-65e1-8bdc-8f08-b4abbc5ce5af"
version: 2
---
# beyond/replay — deterministic replay (byte-identical re-computation)

Law 12 of the [[beyond]] horizon: given an [[audit]] leaf and a tenant snapshot, the chain step can be re-run and proven to produce the exact same output. `effectsHash` canonicalizes an `AgentEffect` sequence (stripping non-deterministic `emittedAt` timestamps from emit events) into a content-uuid via the [[integrity]] substrate, so the same inputs always hash to the same value. `replayLeaf` invokes the caller's re-run and returns `ok:true` only when the recomputed hash matches the expected one. `isReplayStable` checks a sequence is JCS-serializable and carries no missing timestamps.

Matter-twin: src/beyond/replay/index.ts (`effectsHash` · `replayLeaf` · `isReplayStable`) — `ReplayRequest` / `ReplayResult` typed in src/beyond/types.

**Law — [[law]]: the same inputs always recompute to the same [[integrity]] hash; a replay counts only when the recomputed effects-hash is byte-identical to the [[audit]] leaf's recorded output — the [[trinity]] proof holds the determinism invariant.**

@standard ISRS 4400 agreed-upon-procedures (replay verification)
@standard ISO/IEC 25010:2023 testability + reusability
