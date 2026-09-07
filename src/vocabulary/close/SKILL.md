---
name: close
description: "Use when reasoning about the forbidding boundary state in erpax — fiscal period locked, document sealed, shift/stream finished, month-end close. The universal root of the closed state; dual of open."
atomPath: "vocabulary/close"
coordinate: "vocabulary/close · 1/base · 7b16bbfd"
contentUuid: "45dfea34-b6c0-5732-b1d0-56219870851a"
diamondUuid: "3f5baa0c-1f22-8afc-a978-4edfc717b3a9"
uuid: "7b16bbfd-4c0c-8d77-958d-cfacf80306cd"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 100
standards: []
bindings: []
signatures:
  computationUuid: "3308fae1-9a5e-836d-a586-b8e65be96741"
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
      stageUuid: "c597ba88-55e8-8394-bcbb-a6ac4fa41b1a"
    - stage: seal
      stageUuid: "2c25687a-cc6d-8527-ab7b-ec3a9d00f7c8"
    - stage: uuid
      stageUuid: "5cc8b028-b5b4-855a-88df-0baad175d2d1"
version: 2
---
# close — the forbidding state (locked · sealed)

`close` is the universal root of the **forbidding boundary**: a fiscal period *closes* / locks → no GL writes for any date in it ([[accounting]]); a document seals → its content-uuid is frozen, immutable ([[identity]], [[versions]]); a shift / stream finishes. Dual of [[open]]. The month-end *close* assembles and freezes the period ([[accounting]]). Enforced by a write-guard [[hooks]] — the [[end]] of a [[flow]].

## Traditions (prefix removed)
The sealing boundary every tradition keeps: the **Day of Judgment** — the books locked and weighed, no deed added after ([[accounting]], [[akashic]]); the **Sabbath** / *Shabbat* — work forbidden, the day set apart and sealed (Exodus 20:8-11); the seal of the prophets (*khatam an-nabiyyin*, Quran 33:40); the seal of the fast. To close is to forbid further writing — the locked period, the sealed scroll ([[identity]] freeze-on-seal). Dual of [[open]].

**Law — [[law]]: close is the universal forbidding boundary — a fiscal period locks (no GL writes), a document seals (content-[[uuid]] frozen), a stream finishes; the [[end]] of a [[flow]], dual of [[open]], enforced by a write-guard.**
