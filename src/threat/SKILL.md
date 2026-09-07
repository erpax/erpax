---
name: threat
description: "Use when reasoning about threat — Quantum threat classification (immediate-retire vs quantum-accelerated)"
atomPath: threat
coordinate: "threat · 4/weave · 6ec24ae2"
contentUuid: "3cead05b-f492-55f3-85cb-c9d766f5ed94"
diamondUuid: "089fa88a-016d-86b4-b86c-5a8cbb0abbfa"
uuid: "6ec24ae2-d9f8-8f13-bbb9-de0af83c79c6"
horo: 4
typography:
  partition: threat
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "6a1a9d00-7022-8fb3-95ff-b4a7adc409f2"
  stages:
    - stage: path
      stageUuid: "aa7397ec-c05e-8b35-bc54-1da76235e563"
    - stage: trinity
      stageUuid: "d66065f5-f205-8a10-bb57-0b74e44823fd"
    - stage: boundary
      stageUuid: "6e3d6d48-7b86-8cb7-8bb8-7d6d96907cd6"
    - stage: links
      stageUuid: "ab9d9b48-d283-81ef-ad83-573114150bd8"
    - stage: horo
      stageUuid: "ad6fc89d-db99-8d43-bde6-cd9d94cf3c04"
    - stage: seal
      stageUuid: "6ae09bd0-49d0-856b-a236-aa0581f19a23"
    - stage: uuid
      stageUuid: "fd2250b8-5456-80f3-adae-4cebb474d083"
version: 2
---
# threat — Honest quantum threat model

Shor breaks RSA/ECDLP completely. Grover accelerates AES/SHA only.

## law

Immediate-retire: RSA-2048, ECDLP-P-256 (Shor polynomial time).
Quantum-accelerated: AES-256, SHA-256 (Grover sqrt only).
