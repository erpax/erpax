---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 8/crest · 732b64d3"
contentUuid: "08d81888-56ee-55ee-800d-ed0c8c5f089b"
diamondUuid: "6d72ac36-1853-8295-af8b-9a1f783ae660"
uuid: "732b64d3-7ec4-87ec-b8f8-66ddd0dd9d56"
horo: 8
typography:
  partition: pqc
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "feae613e-d685-81cf-96ac-9ee381a7a612"
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
      stageUuid: "19273b2e-c119-8829-9be6-5efd003a6307"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "17d85c3d-93bb-8cbb-9c21-754451b7d1c6"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
