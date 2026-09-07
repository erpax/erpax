---
name: threat
description: "Use when reasoning about threat — Quantum threat classification (immediate-retire vs quantum-accelerated)"
atomPath: threat
coordinate: "threat · 1/base · 86ddf3ff"
contentUuid: "5cc55a35-ca1c-5d01-8dbe-ec08f3aa56c4"
diamondUuid: "ee8016ff-f6e6-81ac-81c5-f10ecede883b"
uuid: "86ddf3ff-784b-8b15-977b-b55e759d648f"
horo: 1
typography:
  partition: threat
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "39f15f08-2479-8793-b42f-f59c38a0f5d3"
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
      stageUuid: "6a6a9b2a-32b5-8c4c-bd73-c712d613cc80"
    - stage: seal
      stageUuid: "6ae09bd0-49d0-856b-a236-aa0581f19a23"
    - stage: uuid
      stageUuid: "06c3b7db-e1d7-838f-a061-faa14892e03b"
version: 2
---
# threat — Honest quantum threat model

Shor breaks RSA/ECDLP completely. Grover accelerates AES/SHA only.

## law

Immediate-retire: RSA-2048, ECDLP-P-256 (Shor polynomial time).
Quantum-accelerated: AES-256, SHA-256 (Grover sqrt only).
