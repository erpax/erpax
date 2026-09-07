---
name: pqc
description: "Use when an audit-chain leaf signature must survive a quantum adversary — post-quantum cryptography, the migration target from SHA-256 to lattice signatures (ML-DSA / SLH-DSA, FIPS 204) so a future Shor-capable machine cannot forge the signature that seals the audit chain."
atomPath: "beyond/pqc"
coordinate: "beyond/pqc · 1/base · 69eef9ea"
contentUuid: "92c5b0e1-e56f-5f8a-8630-80dcbb149a18"
diamondUuid: "0f448297-2e87-81b4-9122-9a6f40ce8a19"
uuid: "69eef9ea-fc1e-8da5-90be-6722add411e9"
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
  computationUuid: "98df489e-7646-884a-be55-56693fa8fe2a"
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
      stageUuid: "3668f676-f40b-8dc0-a426-1e2d1ee9afe5"
    - stage: seal
      stageUuid: "71ae10f2-0dca-8d23-b6e5-b6abc8dfca03"
    - stage: uuid
      stageUuid: "7be0847c-7909-8152-bb4b-cef2f2a450ff"
version: 2
---
# beyond/pqc — post-quantum signatures (the quantum-proof seal)

A horizon law: today's [[signature]] over an [[audit]] leaf is RSA/ECDSA-flavoured and a large quantum computer would forge it. `pqc` names the migration target — lattice signatures (ML-DSA, FIPS 204) and stateful-hash signatures — and pins which algorithms NIST has approved, so the seal that makes the [[audit]] chain tamper-evident stays unforgeable when [[quantum]] hardware arrives. The signing/verifying matter is a documented STUB until the Workers-friendly liboqs lands; only the approved-algorithm gate is live.

Matter-twin: src/beyond/pqc/index.ts (`signPqc` · `verifyPqc` · `isApprovedPqc`). A [[beyond]]-horizon primitive that hardens the [[integrity]] substrate.

**Law — [[law]]: the [[signature]] that seals the [[audit]] chain must be forgeable by no adversary, classical or quantum — only NIST-approved post-quantum algorithms may sign, so the seal outlives the machine that would break it.**

@standard NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)
@standard NIST SP 800-208 stateful-hash-based-signatures
