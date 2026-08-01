---
name: chat
description: "Use when banks chat FI↔FI — BIC sessions, QuantumSecureEnvelope (classical⊕FIPS 203/204), collaborate@2f+1; holds=isApprovedPqc∧digests; verify fail-closed until liboqs."
atomPath: "bank/chat"
coordinate: "bank/chat · 1/base · 22467d8c"
contentUuid: "fc8f812e-06f4-55a8-ad2b-a22ce082f265"
diamondUuid: "bb1634ad-ae3e-85c2-ac5d-0dd8a996e27e"
uuid: "22467d8c-3ca8-8d87-bec6-786ee93a8898"
horo: 1
typography:
  partition: bank
  bondDegree: 156
standards:
  - "ISO-20022"
  - "ISO-20022:2022 pacs / pain"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "NIST FIPS 203 ML-KEM · FIPS 204 ML-DSA"
bindings: []
signatures:
  computationUuid: "df418c27-9022-86b2-989e-22a982930701"
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
      stageUuid: "1f5c71e9-4bfc-86c3-a28f-461c9c78a8a8"
    - stage: seal
      stageUuid: "eb285548-2b7a-81e7-b2ec-8939040dfbb7"
    - stage: uuid
      stageUuid: "d24b1b25-c8c5-8d13-aae2-50c0529c3aad"
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
