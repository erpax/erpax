---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 5/round · 850d9f12"
contentUuid: "9abcb465-d141-5bf4-babd-080850815c60"
diamondUuid: "09fb201b-e4b2-8486-97e5-03056e3696f2"
uuid: "850d9f12-844a-8f95-875c-7c0122a6fe82"
horo: 5
typography:
  partition: pqc
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "cd8e633a-d993-8ac2-a522-3e90cd6c53e4"
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
      stageUuid: "85ea2843-d80f-8711-836c-275205522d4e"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "3a8227c1-4e1a-8979-9cab-ceb1b3afb15a"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
