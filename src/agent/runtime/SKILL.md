---
name: runtime
description: Use when reasoning about runtime — AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.
atomPath: "agent/runtime"
coordinate: "agent/runtime · 2/share · c387024b"
contentUuid: "723d58bf-a991-5676-80f4-1c5152134bba"
diamondUuid: "aa1e52d8-6925-8726-bd34-63d920a127a9"
uuid: "c387024b-dc0a-8b72-8dae-05510e58c636"
horo: 2
typography:
  partition: agent
  bondDegree: 10
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-25010"
bindings: []
signatures:
  computationUuid: "d6ec3943-e1ef-88ee-8fbf-8fb6bc3fc478"
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
      stageUuid: "dda379b6-ee5b-82f9-8055-b47fe6003fe5"
    - stage: seal
      stageUuid: "dcd5c30f-68c9-8b20-b71a-8fdb51a3551b"
    - stage: uuid
      stageUuid: "ef7ab82e-8d21-8ec5-930e-744ab10dd5bf"
version: 2
---
# agent/runtime

AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.

Extracted from `agent/runtime.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
