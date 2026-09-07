---
name: runtime
description: Use when reasoning about runtime — AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.
atomPath: "agent/runtime"
coordinate: "agent/runtime · 2/share · 182df450"
contentUuid: "4759775a-ddf7-5621-a831-4e27864a543b"
diamondUuid: "97518adc-0d1f-857d-8d3c-15185b0c0434"
uuid: "182df450-58e7-8fcf-8c75-fff6927ede63"
horo: 2
typography:
  partition: agent
  bondDegree: 10
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-25010"
bindings: []
signatures:
  computationUuid: "3daeb9ee-4b8f-8e7b-9a11-bad1a7596509"
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
      stageUuid: "40bb64d4-921b-8fd7-b86d-dc8dfa725f34"
    - stage: seal
      stageUuid: "dcd5c30f-68c9-8b20-b71a-8fdb51a3551b"
    - stage: uuid
      stageUuid: "fb517c0f-cebc-8d8f-ad83-8861a51365f9"
version: 2
---
# agent/runtime

AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.

Extracted from `agent/runtime.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
