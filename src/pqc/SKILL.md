---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 7/descent · dde20ec0"
contentUuid: "11791123-7667-5fb0-994e-d3eec31567a4"
diamondUuid: "8f2ad8c4-cb47-8ef7-a85a-30076e7d0784"
uuid: "dde20ec0-d3b7-83e2-9967-fe8ac48c027a"
horo: 7
typography:
  partition: pqc
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "49da003c-a321-8b40-b0a7-40c7cbba7c08"
  stages:
    - stage: path
      stageUuid: "a9e9da78-ed87-8fbb-a557-37dbd7659875"
    - stage: trinity
      stageUuid: "3e672f85-a11d-8b43-85f8-a938b69f7175"
    - stage: boundary
      stageUuid: "db3ec109-9ef5-8b45-a3bf-599fb3980954"
    - stage: links
      stageUuid: "11d2df12-8155-83ff-9713-2bb3fd14c376"
    - stage: horo
      stageUuid: "f1cc9921-b501-8744-9a93-6b4d51964c82"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "02187526-1a9b-839e-8e78-a9d41cc9dd99"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
