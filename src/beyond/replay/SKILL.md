---
name: replay
description: "Use when an auditor demands \"show me how this number was computed and reproduce it\" — deterministic replay re-runs a chain step and proves byte-identical output by hashing the AgentEffect sequence (timestamps stripped) and matching it against the leaf's recorded outputHash."
atomPath: "beyond/replay"
coordinate: "beyond/replay · 4/weave · da6ffd8b"
contentUuid: "248cb6e0-af0b-5dde-8211-61df17aeeee7"
diamondUuid: "6b0a37b1-ef5a-82ea-9edb-a25c05d24e7a"
uuid: "da6ffd8b-b7b6-8d27-965d-06e1e67d1855"
horo: 4
typography:
  partition: beyond
  bondDegree: 15
standards:
  - "ISO/IEC 25010:2023 testability + reusability"
  - "ISO/IEC 25010:2023 §5.5 testability + §5.7 reusability"
  - "ISRS 4400 agreed-upon-procedures (replay verification)"
bindings: []
signatures:
  computationUuid: "cc26bc5d-2f38-82c9-b3a5-d2b311e17928"
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
      stageUuid: "091d5d7b-46ba-8372-9be6-dc9d22126134"
    - stage: seal
      stageUuid: "ba68b3a6-541c-8315-ad69-11f6f6119425"
    - stage: uuid
      stageUuid: "2d457001-4ac6-8fb8-a73d-b8d0a5d5095f"
version: 2
---
# beyond/replay — deterministic replay (byte-identical re-computation)

Law 12 of the [[beyond]] horizon: given an [[audit]] leaf and a tenant snapshot, the chain step can be re-run and proven to produce the exact same output. `effectsHash` canonicalizes an `AgentEffect` sequence (stripping non-deterministic `emittedAt` timestamps from emit events) into a content-uuid via the [[integrity]] substrate, so the same inputs always hash to the same value. `replayLeaf` invokes the caller's re-run and returns `ok:true` only when the recomputed hash matches the expected one. `isReplayStable` checks a sequence is JCS-serializable and carries no missing timestamps.

Matter-twin: src/beyond/replay/index.ts (`effectsHash` · `replayLeaf` · `isReplayStable`) — `ReplayRequest` / `ReplayResult` typed in src/beyond/types.

**Law — [[law]]: the same inputs always recompute to the same [[integrity]] hash; a replay counts only when the recomputed effects-hash is byte-identical to the [[audit]] leaf's recorded output — the [[trinity]] proof holds the determinism invariant.**

@standard ISRS 4400 agreed-upon-procedures (replay verification)
@standard ISO/IEC 25010:2023 testability + reusability
