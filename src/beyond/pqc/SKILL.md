---
name: pqc
description: "Use when an audit-chain leaf signature must survive a quantum adversary — post-quantum cryptography, the migration target from SHA-256 to lattice signatures (ML-DSA / SLH-DSA, FIPS 204) so a future Shor-capable machine cannot forge the [[signature]] that seals the [[audit]] chain."
atomPath: "beyond/pqc"
coordinate: "beyond/pqc · 7/descent · b826b476"
contentUuid: "ce1cc9bb-8528-5ebd-ade5-7d5e6c061aad"
diamondUuid: "d5c2c6f0-507b-8964-92a8-e334d50633f3"
uuid: "b826b476-537a-8276-a89c-2e7b7f27fbad"
horo: 7
bonds:
  in:
    - audit
    - beyond
    - integrity
    - law
    - quantum
    - signature
  out:
    - audit
    - beyond
    - integrity
    - law
    - quantum
    - signature
typography:
  partition: beyond
  bondDegree: 18
  neighbors: []
standards:
  - "NIST FIPS 203 ML-KEM (Module-Lattice Key Encapsulation)"
  - "NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)"
  - "NIST SP 800-208 stateful-hash-based-signatures"
  - "NIST-SP-800-63"
bindings: []
neighbors:
  wikilink:
    - audit
    - beyond
    - integrity
    - law
    - quantum
    - signature
  matrix:
    - audit
    - beyond
    - integrity
    - law
    - quantum
    - signature
  backlinks:
    - audit
    - beyond
    - integrity
    - law
    - quantum
    - signature
signatures:
  computationUuid: "60abb9ee-abe0-8956-966c-9a4b41e92d3c"
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
      stageUuid: "af838a4c-a6ba-8b9d-be8c-cf0f0e7c1a7e"
    - stage: seal
      stageUuid: "398ff010-4d1b-8d78-86d4-c6b518e1faac"
    - stage: uuid
      stageUuid: "7f98e3b8-a874-8b2c-8271-2163efd358dc"
version: 2
---
# beyond/pqc — post-quantum signatures (the quantum-proof seal)

A horizon law: today's [[signature]] over an [[audit]] leaf is RSA/ECDSA-flavoured and a large quantum computer would forge it. `pqc` names the migration target — lattice signatures (ML-DSA, FIPS 204) and stateful-hash signatures — and pins which algorithms NIST has approved, so the seal that makes the [[audit]] chain tamper-evident stays unforgeable when [[quantum]] hardware arrives. The signing/verifying matter is a documented STUB until the Workers-friendly liboqs lands; only the approved-algorithm gate is live.

Matter-twin: src/beyond/pqc/index.ts (`signPqc` · `verifyPqc` · `isApprovedPqc`). A [[beyond]]-horizon primitive that hardens the [[integrity]] substrate.

**Law — [[law]]: the [[signature]] that seals the [[audit]] chain must be forgeable by no adversary, classical or quantum — only NIST-approved post-quantum algorithms may sign, so the seal outlives the machine that would break it.**

@standard NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)
@standard NIST SP 800-208 stateful-hash-based-signatures
