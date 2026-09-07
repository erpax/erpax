---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 7/descent · 43d21982"
contentUuid: "2c863004-6297-5312-bedb-9c9d1d983902"
diamondUuid: "3aba936f-ccab-8c56-bfe4-124da9254f25"
uuid: "43d21982-6793-8afa-9b82-d0f428a0d621"
horo: 7
typography:
  partition: pqc
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "730d46a5-3c20-829a-8cbf-55c5014c8744"
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
      stageUuid: "473eb4ab-6a69-81aa-854f-aab0f28ba797"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "99cb018e-bc09-87be-9564-9ce566884db1"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
