---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 5/round · 289c84c6"
contentUuid: "6fc10a9d-478f-5c9f-b5c6-c589b3f45691"
diamondUuid: "7b263497-d4e8-867a-a621-b123692e7c77"
uuid: "289c84c6-6679-837f-be44-43516d921952"
horo: 5
typography:
  partition: pqc
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "6a577a48-b0d3-8c03-be48-b54959b3e7d3"
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
      stageUuid: "eeb74cf6-208b-86a6-a18a-e04370a6a549"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "aa6bff1f-3e58-8fea-998d-f109672b499f"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
