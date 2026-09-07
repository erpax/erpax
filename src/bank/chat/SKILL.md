---
name: chat
description: "Use when banks chat FI↔FI — BIC sessions, QuantumSecureEnvelope (classical⊕FIPS 203/204), collaborate@2f+1; holds=isApprovedPqc∧digests; verify fail-closed until liboqs."
atomPath: "bank/chat"
coordinate: "bank/chat · 7/descent · 32b92fd8"
contentUuid: "7994bcda-7020-5cbd-956d-ae7529e8bc7d"
diamondUuid: "afa79a74-eb16-8ac8-b137-80479145a737"
uuid: "32b92fd8-2f62-8109-a5bd-91f32d3dd6ab"
horo: 7
typography:
  partition: bank
  bondDegree: 157
standards:
  - "ISO-20022"
  - "ISO-20022:2022 pacs / pain"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "NIST FIPS 203 ML-KEM · FIPS 204 ML-DSA"
bindings: []
signatures:
  computationUuid: "986a31b7-3920-879b-8af3-0715b7cd6a48"
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
      stageUuid: "0d6e8284-8b16-86ab-9bf1-63e50b973b89"
    - stage: seal
      stageUuid: "3d6b16ad-a04c-8ce8-a89e-45782e7c1542"
    - stage: uuid
      stageUuid: "0f6eaa85-a3d2-8902-8f7d-32b3ef4f8891"
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
