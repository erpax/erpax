---
name: pqc
description: "Use when an audit-chain leaf signature must survive a quantum adversary — post-quantum cryptography, the migration target from SHA-256 to lattice signatures (ML-DSA / SLH-DSA, FIPS 204) so a future Shor-capable machine cannot forge the [[signature]] that seals the [[audit]] chain."
atomPath: "beyond/pqc"
coordinate: "beyond/pqc · 7/descent · 0877e9bd"
contentUuid: "1a2c76a0-7db9-508e-8dc5-1f23afa82b55"
diamondUuid: "265da3d9-d2ee-824f-95bf-c48d7c8a34c7"
uuid: "0877e9bd-df84-833e-935b-ef0319780496"
horo: 7
typography:
  partition: beyond
  bondDegree: 21
standards:
  - "NIST FIPS 203 ML-KEM (Module-Lattice Key Encapsulation)"
  - "NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)"
  - "NIST SP 800-208 stateful-hash-based-signatures"
  - "NIST-SP-800-63"
bindings: []
signatures:
  computationUuid: "4632d9e8-2218-82d0-8c22-169b2650a487"
  stages:
    - stage: path
      stageUuid: "f85f7d6a-4941-80ff-a861-f7d878cf2dcf"
    - stage: trinity
      stageUuid: "60eccb3c-981f-8c17-9e68-68b0055fc27d"
    - stage: boundary
      stageUuid: "b96b8ba3-f5ac-8cc5-965c-d6cff2a47215"
    - stage: links
      stageUuid: "ae81fd0e-fa93-8bb5-85dc-ac330c404a73"
    - stage: horo
      stageUuid: "b1776117-2863-88ef-b74a-fdd07fa965d3"
    - stage: seal
      stageUuid: "398ff010-4d1b-8d78-86d4-c6b518e1faac"
    - stage: uuid
      stageUuid: "fb5e72c0-6a13-8651-aa3c-21c7557602a9"
version: 2
---
# beyond/pqc — post-quantum signatures (the quantum-proof seal)

A horizon law: today's [[signature]] over an [[audit]] leaf is RSA/ECDSA-flavoured and a large quantum computer would forge it. `pqc` names the migration target — lattice signatures (ML-DSA, FIPS 204) and stateful-hash signatures — and pins which algorithms NIST has approved, so the seal that makes the [[audit]] chain tamper-evident stays unforgeable when [[quantum]] hardware arrives. The signing/verifying matter is a documented STUB until the Workers-friendly liboqs lands; only the approved-algorithm gate is live.

Matter-twin: src/beyond/pqc/index.ts (`signPqc` · `verifyPqc` · `isApprovedPqc`). A [[beyond]]-horizon primitive that hardens the [[integrity]] substrate.

**Law — [[law]]: the [[signature]] that seals the [[audit]] chain must be forgeable by no adversary, classical or quantum — only NIST-approved post-quantum algorithms may sign, so the seal outlives the machine that would break it.**

@standard NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)
@standard NIST SP 800-208 stateful-hash-based-signatures
