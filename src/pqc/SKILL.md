---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 8/crest · e5211b57"
contentUuid: "c533862c-46ad-5119-9713-2301e31f2a97"
diamondUuid: "732f67fa-b89e-8a9a-9610-f8fa2787b148"
uuid: "e5211b57-5e2a-83ea-8ce5-e997bcb7d2cc"
horo: 8
typography:
  partition: pqc
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "9bd80ccb-472a-8cdf-bf6b-e6ea1a1c91ce"
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
      stageUuid: "8ab908b4-3484-8b7f-9174-9626b583fce3"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "a6b65ac4-244e-8272-a958-b74e7fadab39"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
