---
name: chat
description: "Use when banks chat FI↔FI — BIC sessions, QuantumSecureEnvelope (classical⊕FIPS 203/204), collaborate@2f+1; holds=isApprovedPqc∧digests; verify fail-closed until liboqs."
atomPath: "bank/chat"
coordinate: "bank/chat · 4/weave · 3dbc3471"
contentUuid: "96448d89-8887-50f8-9924-95bcf6f3f6d9"
diamondUuid: "61d93917-cdad-82d6-9f42-92a3f6f2b71d"
uuid: "3dbc3471-7006-871d-a396-c363a853b642"
horo: 4
typography:
  partition: bank
  bondDegree: 161
standards:
  - "ISO-20022"
  - "ISO-20022:2022 pacs / pain"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "NIST FIPS 203 ML-KEM · FIPS 204 ML-DSA"
bindings: []
signatures:
  computationUuid: "872d9876-f52a-8ed0-922c-c82bdc1e6061"
  stages:
    - stage: path
      stageUuid: "97871e4e-cf51-8e98-9816-3ccb3586340d"
    - stage: trinity
      stageUuid: "fbe69ad8-1c1a-85cb-b740-9b94e898b0c2"
    - stage: boundary
      stageUuid: "e25535a7-e3bb-8e8e-acc2-20204a5c6929"
    - stage: links
      stageUuid: "aa542098-0da7-8431-877a-b05b1e0f6a0e"
    - stage: horo
      stageUuid: "c1f4ee82-3f10-8e7c-8de5-8b1533a49760"
    - stage: seal
      stageUuid: "3d6b16ad-a04c-8ce8-a89e-45782e7c1542"
    - stage: uuid
      stageUuid: "da695ac0-287f-8ae2-b3e6-b64cc2887d66"
version: 2
---
# bank/chat

| fold | compute |
| --- | --- |
| seal | `sealQuantumSecure` |
| chat | `banksChat` |
| develop | `developQuantumSecureBanking` |

**Law — [[law]]: holds ⇔ isApprovedPqc ∧ digests ∧ consensus. No hand-asserted physics claims.**

Composes [[beyond/pqc]] · [[quantum/ftl]] · [[quantum/chat]] · [[bank/research]].
