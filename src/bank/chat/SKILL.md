---
name: chat
description: "Use when banks chat FI↔FI — BIC sessions, QuantumSecureEnvelope (classical⊕FIPS 203/204), collaborate@2f+1; holds=isApprovedPqc∧digests; verify fail-closed until liboqs."
atomPath: "bank/chat"
coordinate: "bank/chat · 4/weave · 2137d694"
contentUuid: "21ea4e29-6a24-53e1-bba5-d51ea9759789"
diamondUuid: "da59b5d7-3c64-886c-ab23-42c4bc4c62a7"
uuid: "2137d694-0e9a-820d-9762-af7a54ee2033"
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
  computationUuid: "fddaf08b-bc1e-80ab-9e0f-4985bf645c33"
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
      stageUuid: "129a2022-1c5c-8b72-98d0-b7e0397a171e"
    - stage: seal
      stageUuid: "3d6b16ad-a04c-8ce8-a89e-45782e7c1542"
    - stage: uuid
      stageUuid: "141418bb-588c-8bd6-abaa-4b26d7b33c2a"
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
