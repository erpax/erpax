---
name: pqc
description: "Use when reasoning about pqc — NIST post-quantum cryptography (Kyber-768 + SPHINCS+)"
atomPath: pqc
coordinate: "pqc · 8/crest · 875d5398"
contentUuid: "cfd8c1ea-cfab-51bd-896a-46ef7600b36a"
diamondUuid: "3b486acb-176b-8671-a793-5d137f413db2"
uuid: "875d5398-3984-87cc-a849-f1d67431da21"
horo: 8
typography:
  partition: pqc
  bondDegree: 10
standards: []
bindings: []
signatures:
  computationUuid: "cbdbdf00-a296-8b30-aa88-37b18d9b9f96"
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
      stageUuid: "399e118c-2bb8-8b0f-9d16-05d8884a875e"
    - stage: seal
      stageUuid: "043f6e38-2073-8f87-84ca-5bab4ae3d961"
    - stage: uuid
      stageUuid: "fc680b09-e80c-856d-918f-6211702c0c32"
version: 2
---
# pqc — NIST Post-Quantum Cryptography

Kyber-768 (ML-KEM) + SPHINCS+ (SLH-DSA) per NIST FIPS 203/204.

## law

Quantum-resistant cryptography must be NIST-standardized.
