---
name: threat
description: "Use when reasoning about threat — Quantum threat classification (immediate-retire vs quantum-accelerated)"
atomPath: threat
coordinate: "threat · 5/round · f8bd7fe7"
contentUuid: "bfd7a34e-d591-5482-8c23-085349c4070f"
diamondUuid: "9f59c09b-fab0-8432-936a-451b2a8e4b83"
uuid: "f8bd7fe7-a121-8eac-8ad8-87ca0ff5b38c"
horo: 5
typography:
  partition: threat
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "afbfd9d7-a9ca-89fc-8221-ce630b88c84a"
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
      stageUuid: "ad0ca93a-dbff-8ea0-a308-f107266e6e0a"
    - stage: seal
      stageUuid: "6ae09bd0-49d0-856b-a236-aa0581f19a23"
    - stage: uuid
      stageUuid: "e79c9426-671c-8fa8-9a6e-df0ed74ad031"
version: 2
---
# threat — Honest quantum threat model

Shor breaks RSA/ECDLP completely. Grover accelerates AES/SHA only.

## law

Immediate-retire: RSA-2048, ECDLP-P-256 (Shor polynomial time).
Quantum-accelerated: AES-256, SHA-256 (Grover sqrt only).
