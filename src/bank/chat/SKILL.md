---
name: chat
description: "Use when banks chat FI↔FI — BIC sessions, QuantumSecureEnvelope (classical⊕FIPS 203/204), collaborate@2f+1; holds=isApprovedPqc∧digests; verify fail-closed until liboqs."
atomPath: "bank/chat"
coordinate: "bank/chat · 1/base · 55751bae"
contentUuid: "ed4bd5e5-7713-5002-8565-8f94b7d26da1"
diamondUuid: "044b4bf1-969a-89c4-aba8-2e8c89a90b78"
uuid: "55751bae-562a-83a2-b774-b44f6f1e52ff"
horo: 1
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
  computationUuid: "a5d4fb95-c9b8-8b12-a597-f197361c58ed"
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
      stageUuid: "dcfc7764-b48f-8579-bd67-c1d81d9f2772"
    - stage: seal
      stageUuid: "3d6b16ad-a04c-8ce8-a89e-45782e7c1542"
    - stage: uuid
      stageUuid: "4b7ac50f-e548-8ba3-82d5-a3deef74f647"
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
