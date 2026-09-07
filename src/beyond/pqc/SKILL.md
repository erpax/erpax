---
name: pqc
description: "Use when an audit-chain leaf signature must survive a quantum adversary — post-quantum cryptography, the migration target from SHA-256 to lattice signatures (ML-DSA / SLH-DSA, FIPS 204) so a future Shor-capable machine cannot forge the signature that seals the audit chain."
atomPath: "beyond/pqc"
coordinate: "beyond/pqc · 1/base · 454fc169"
contentUuid: "013cd4b6-1f31-52d9-8e28-49e39f27e11d"
diamondUuid: "90768bbc-fb2a-8f67-8b2d-49e46b0f8f46"
uuid: "454fc169-36d2-8412-b446-21a36e36cbeb"
horo: 1
typography:
  partition: beyond
  bondDegree: 10
standards:
  - "NIST FIPS 203 ML-KEM (Module-Lattice Key Encapsulation)"
  - "NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)"
  - "NIST SP 800-208 stateful-hash-based-signatures"
  - "NIST-SP-800-63"
bindings: []
signatures:
  computationUuid: "4c3ca6b1-ceb5-8e1f-86d5-96afa112d2d6"
  stages:
    - stage: path
      stageUuid: "f85f7d6a-4941-80ff-a861-f7d878cf2dcf"
    - stage: trinity
      stageUuid: "60eccb3c-981f-8c17-9e68-68b0055fc27d"
    - stage: boundary
      stageUuid: "b96b8ba3-f5ac-8cc5-965c-d6cff2a47215"
    - stage: links
      stageUuid: "31bddfc0-7937-884e-a920-26133111a862"
    - stage: horo
      stageUuid: "6076f427-07f8-8154-84d2-d7390552a321"
    - stage: seal
      stageUuid: "71ae10f2-0dca-8d23-b6e5-b6abc8dfca03"
    - stage: uuid
      stageUuid: "ad52832e-017c-8b31-a0d6-cc04fa4d3699"
version: 2
---
# beyond/pqc — post-quantum signatures (the quantum-proof seal)

A horizon law: today's [[signature]] over an [[audit]] leaf is RSA/ECDSA-flavoured and a large quantum computer would forge it. `pqc` names the migration target — lattice signatures (ML-DSA, FIPS 204) and stateful-hash signatures — and pins which algorithms NIST has approved, so the seal that makes the [[audit]] chain tamper-evident stays unforgeable when [[quantum]] hardware arrives. The signing/verifying matter is a documented STUB until the Workers-friendly liboqs lands; only the approved-algorithm gate is live.

Matter-twin: src/beyond/pqc/index.ts (`signPqc` · `verifyPqc` · `isApprovedPqc`). A [[beyond]]-horizon primitive that hardens the [[integrity]] substrate.

**Law — [[law]]: the [[signature]] that seals the [[audit]] chain must be forgeable by no adversary, classical or quantum — only NIST-approved post-quantum algorithms may sign, so the seal outlives the machine that would break it.**

@standard NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)
@standard NIST SP 800-208 stateful-hash-based-signatures
