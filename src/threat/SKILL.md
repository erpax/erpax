---
name: threat
description: "Use when reasoning about threat — Quantum threat classification (immediate-retire vs quantum-accelerated)"
atomPath: threat
coordinate: "threat · 8/crest · 4be78691"
contentUuid: "6e2f471d-4100-5f75-84d2-b61b7f418093"
diamondUuid: "82069fc9-eb83-8b45-9949-db233f8d5c51"
uuid: "4be78691-addc-87c3-b8b1-9d983a7c8295"
horo: 8
typography:
  partition: threat
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "f481f0e3-e629-8097-8b09-f31b9d8b99aa"
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
      stageUuid: "957caf25-2a65-83b7-a7af-264d8af43b3c"
    - stage: seal
      stageUuid: "6ae09bd0-49d0-856b-a236-aa0581f19a23"
    - stage: uuid
      stageUuid: "842cdae0-0bc5-8cca-8d60-71fbfa799e87"
version: 2
---
# threat — Honest quantum threat model

Shor breaks RSA/ECDLP completely. Grover accelerates AES/SHA only.

## law

Immediate-retire: RSA-2048, ECDLP-P-256 (Shor polynomial time).
Quantum-accelerated: AES-256, SHA-256 (Grover sqrt only).
