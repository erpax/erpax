---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 8/crest · 32774abe"
contentUuid: "c12f6fb0-1457-5417-be3a-6b6228651692"
diamondUuid: "20307e9a-f29b-825d-badd-b56674d0d801"
uuid: "32774abe-e4cd-83a7-96cc-bc71ac76def0"
horo: 8
typography:
  partition: pqc
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "d6495e9b-9e09-89a4-ae86-33f675c7b2ca"
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
      stageUuid: "fd5c1ece-eee7-8627-b9ef-50a167751d57"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "8dbbaf54-ab20-8fcf-9c1b-edf0114948ef"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
