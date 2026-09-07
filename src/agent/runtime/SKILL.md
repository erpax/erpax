---
name: runtime
description: Use when reasoning about runtime — AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.
atomPath: "agent/runtime"
coordinate: "agent/runtime · 8/crest · e4aa608d"
contentUuid: "1e16579d-26da-51d7-8234-354325a432ae"
diamondUuid: "af0bb7c2-69e6-8476-a843-47fabd1aaf31"
uuid: "e4aa608d-893b-865b-adc4-15f873d86e40"
horo: 8
typography:
  partition: agent
  bondDegree: 10
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-25010"
bindings: []
signatures:
  computationUuid: "afad6c20-c304-8402-8f1d-f23450d06a92"
  stages:
    - stage: path
      stageUuid: "4176836a-85e7-89cc-9808-83d4818fc47d"
    - stage: trinity
      stageUuid: "c298e8fe-b2e9-87c3-8153-79d3ce9c7cc7"
    - stage: boundary
      stageUuid: "72d6c5f0-f100-841c-9320-186fb596f48f"
    - stage: links
      stageUuid: "6fe967e4-30cb-8c10-a75e-bd9f9c5f5e3c"
    - stage: horo
      stageUuid: "6fe25df5-f68e-84f3-9d12-a3bd0455bd42"
    - stage: seal
      stageUuid: "dcd5c30f-68c9-8b20-b71a-8fdb51a3551b"
    - stage: uuid
      stageUuid: "5b092848-b6cd-8c2d-8069-e08e5a7adfde"
version: 2
---
# agent/runtime

AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.

Extracted from `agent/runtime.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
