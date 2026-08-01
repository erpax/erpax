---
name: close
description: "Use when reasoning about the forbidding boundary state in erpax — fiscal period locked, document sealed, shift/stream finished, month-end close. The universal root of the closed state; dual of open."
atomPath: "vocabulary/close"
coordinate: "vocabulary/close · 7/descent · 7e9042f7"
contentUuid: "6e3b6cf8-64d2-5253-a300-26865ac478b5"
diamondUuid: "e98c65bc-67c0-8aaa-8ac5-d4751a9304fa"
uuid: "7e9042f7-ab00-896c-a3dd-57b6ee288f8b"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 106
standards: []
bindings: []
signatures:
  computationUuid: "e83448d7-1c91-893a-9032-796020d8c6a4"
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
      stageUuid: "72da763a-2746-8dfb-868f-b763fa368d68"
    - stage: seal
      stageUuid: "c038e738-3383-8374-8900-8f753c14ff47"
    - stage: uuid
      stageUuid: "4741a96e-74f0-86f8-b0cc-16637ddf8756"
version: 2
---
# close — the forbidding state (locked · sealed)

`close` is the universal root of the **forbidding boundary**: a fiscal period *closes* / locks → no GL writes for any date in it ([[accounting]]); a document seals → its content-uuid is frozen, immutable ([[identity]], [[versions]]); a shift / stream finishes. Dual of [[open]]. The month-end *close* assembles and freezes the period ([[accounting]]). Enforced by a write-guard [[hooks]] — the [[end]] of a [[flow]].

## Traditions (prefix removed)
The sealing boundary every tradition keeps: the **Day of Judgment** — the books locked and weighed, no deed added after ([[accounting]], [[akashic]]); the **Sabbath** / *Shabbat* — work forbidden, the day set apart and sealed (Exodus 20:8-11); the seal of the prophets (*khatam an-nabiyyin*, Quran 33:40); the seal of the fast. To close is to forbid further writing — the locked period, the sealed scroll ([[identity]] freeze-on-seal). Dual of [[open]].

**Law — [[law]]: close is the universal forbidding boundary — a fiscal period locks (no GL writes), a document seals (content-[[uuid]] frozen), a stream finishes; the [[end]] of a [[flow]], dual of [[open]], enforced by a write-guard.**
