---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 7/descent · 3f51b4ad"
contentUuid: "939426d5-b7ca-573c-96f1-e035722298c9"
diamondUuid: "d61334c2-e853-89ef-b9b2-fc97772b2c5b"
uuid: "3f51b4ad-5fe3-8413-a891-9a33c054b1bb"
horo: 7
typography:
  partition: pqc
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "1e6dd556-e9d9-82f8-b38b-f80026cedf1b"
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
      stageUuid: "a1062dd7-6809-8318-a5f3-0d6a1ffd9b0e"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "2df85f61-f44e-8526-b5ba-ceedc8c228ac"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
