---
name: close
description: "Use when reasoning about the forbidding boundary state in erpax — fiscal period locked, document sealed, shift/stream finished, month-end close. The universal root of the closed state; dual of open."
atomPath: "vocabulary/close"
coordinate: "vocabulary/close · 1/base · d3d095f5"
contentUuid: "27be177a-9990-5e03-9601-46909b980002"
diamondUuid: "7b2323b6-c459-83d7-90ea-5c2cd85956a9"
uuid: "d3d095f5-9198-81eb-a328-715e62ef48fb"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 112
standards: []
bindings: []
signatures:
  computationUuid: "bb711420-4bec-824a-818d-8ab0358f42d7"
  stages:
    - stage: path
      stageUuid: "0dfd16cc-f70d-8fa4-992b-0b57aac4224e"
    - stage: trinity
      stageUuid: "0d0085ef-e6a3-80c0-9922-515240d36226"
    - stage: boundary
      stageUuid: "83369ea5-d9fb-84bc-ad81-1ed9ac84c957"
    - stage: links
      stageUuid: "5876a7a7-6ced-8d35-bfab-7fd7594a9dd1"
    - stage: horo
      stageUuid: "ac7e91e3-93a1-8d6b-999a-7d0ac7b68cc5"
    - stage: seal
      stageUuid: "2c25687a-cc6d-8527-ab7b-ec3a9d00f7c8"
    - stage: uuid
      stageUuid: "ed4af565-1fdb-8627-ba08-d568fa672268"
version: 2
---
# close — the forbidding state (locked · sealed)

`close` is the universal root of the **forbidding boundary**: a fiscal period *closes* / locks → no GL writes for any date in it ([[accounting]]); a document seals → its content-uuid is frozen, immutable ([[identity]], [[versions]]); a shift / stream finishes. Dual of [[open]]. The month-end *close* assembles and freezes the period ([[accounting]]). Enforced by a write-guard [[hooks]] — the [[end]] of a [[flow]].

## Traditions (prefix removed)
The sealing boundary every tradition keeps: the **Day of Judgment** — the books locked and weighed, no deed added after ([[accounting]], [[akashic]]); the **Sabbath** / *Shabbat* — work forbidden, the day set apart and sealed (Exodus 20:8-11); the seal of the prophets (*khatam an-nabiyyin*, Quran 33:40); the seal of the fast. To close is to forbid further writing — the locked period, the sealed scroll ([[identity]] freeze-on-seal). Dual of [[open]].

**Law — [[law]]: close is the universal forbidding boundary — a fiscal period locks (no GL writes), a document seals (content-[[uuid]] frozen), a stream finishes; the [[end]] of a [[flow]], dual of [[open]], enforced by a write-guard.**
