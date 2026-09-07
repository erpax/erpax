---
name: chat
description: "Use when banks chat FI↔FI — BIC sessions, QuantumSecureEnvelope (classical⊕FIPS 203/204), collaborate@2f+1; holds=isApprovedPqc∧digests; verify fail-closed until liboqs."
atomPath: "bank/chat"
coordinate: "bank/chat · 7/descent · d099fd2f"
contentUuid: "9bb87891-6d60-51f9-8993-821befce949a"
diamondUuid: "609cda35-936d-89bc-b780-ef663f989393"
uuid: "d099fd2f-9865-86b2-b3e9-fc43958e1107"
horo: 7
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
  computationUuid: "553dbbc8-d0bb-8038-91d1-e1483ab66893"
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
      stageUuid: "e2f42119-2422-8d97-a283-9281d751a8e1"
    - stage: seal
      stageUuid: "3d6b16ad-a04c-8ce8-a89e-45782e7c1542"
    - stage: uuid
      stageUuid: "74e782bd-b29e-8f0d-a500-5fcda9417668"
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
