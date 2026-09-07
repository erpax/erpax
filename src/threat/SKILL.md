---
name: threat
description: "Use when reasoning about threat — Quantum threat classification (immediate-retire vs quantum-accelerated)"
atomPath: threat
coordinate: "threat · 2/share · d6e467f3"
contentUuid: "63b4725b-b521-5696-b984-2a45e4ef1c74"
diamondUuid: "f08c5bc3-307a-8169-b931-9861c49215e2"
uuid: "d6e467f3-0869-81af-aa96-2dc2f92f7685"
horo: 2
typography:
  partition: threat
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "56ad88b6-d349-89d7-9041-a1f6b7acce9b"
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
      stageUuid: "e49c1090-b4f5-8bf1-a533-2d747bda6607"
    - stage: seal
      stageUuid: "6ae09bd0-49d0-856b-a236-aa0581f19a23"
    - stage: uuid
      stageUuid: "0fd60932-279e-87b4-93c8-20802a899a1f"
version: 2
---
# threat — Honest quantum threat model

Shor breaks RSA/ECDLP completely. Grover accelerates AES/SHA only.

## law

Immediate-retire: RSA-2048, ECDLP-P-256 (Shor polynomial time).
Quantum-accelerated: AES-256, SHA-256 (Grover sqrt only).
