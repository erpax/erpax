---
name: close
description: "Use when reasoning about the forbidding boundary state in erpax — fiscal period locked, document sealed, shift/stream finished, month-end close. The universal root of the closed state; dual of open."
atomPath: "vocabulary/close"
coordinate: "vocabulary/close · 2/share · aa795fe1"
contentUuid: "aea3d0db-24e3-55c7-bd3d-16066fd01ce2"
diamondUuid: "4e3f55d5-479c-8a81-ad52-1b7859176de0"
uuid: "aa795fe1-c498-8a88-916d-6b292b5e6455"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 112
standards: []
bindings: []
signatures:
  computationUuid: "0095a0c0-a3c3-8f02-a845-5ab273eacbe9"
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
      stageUuid: "413e18fe-dca4-8a87-abdb-146a5e88e80c"
    - stage: seal
      stageUuid: "2c25687a-cc6d-8527-ab7b-ec3a9d00f7c8"
    - stage: uuid
      stageUuid: "ce490d06-a37d-8e90-95e2-c37c457ee713"
version: 2
---
# close — the forbidding state (locked · sealed)

`close` is the universal root of the **forbidding boundary**: a fiscal period *closes* / locks → no GL writes for any date in it ([[accounting]]); a document seals → its content-uuid is frozen, immutable ([[identity]], [[versions]]); a shift / stream finishes. Dual of [[open]]. The month-end *close* assembles and freezes the period ([[accounting]]). Enforced by a write-guard [[hooks]] — the [[end]] of a [[flow]].

## Traditions (prefix removed)
The sealing boundary every tradition keeps: the **Day of Judgment** — the books locked and weighed, no deed added after ([[accounting]], [[akashic]]); the **Sabbath** / *Shabbat* — work forbidden, the day set apart and sealed (Exodus 20:8-11); the seal of the prophets (*khatam an-nabiyyin*, Quran 33:40); the seal of the fast. To close is to forbid further writing — the locked period, the sealed scroll ([[identity]] freeze-on-seal). Dual of [[open]].

**Law — [[law]]: close is the universal forbidding boundary — a fiscal period locks (no GL writes), a document seals (content-[[uuid]] frozen), a stream finishes; the [[end]] of a [[flow]], dual of [[open]], enforced by a write-guard.**
