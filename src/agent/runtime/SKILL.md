---
name: runtime
description: Use when reasoning about runtime — AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.
atomPath: "agent/runtime"
coordinate: "agent/runtime · 2/share · cb706970"
contentUuid: "01a3e584-f85b-5683-af12-a90897a02ea9"
diamondUuid: "17949601-9ea2-8a19-860a-65e7bac7a0c1"
uuid: "cb706970-875f-852a-884f-da63d9d9d29c"
horo: 2
typography:
  partition: agent
  bondDegree: 10
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-25010"
bindings: []
signatures:
  computationUuid: "19daeaea-e21e-8df3-ad31-fd2acfdd1537"
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
      stageUuid: "238eeb9c-8d84-83ea-a249-2c57cb6c444c"
    - stage: seal
      stageUuid: "dcd5c30f-68c9-8b20-b71a-8fdb51a3551b"
    - stage: uuid
      stageUuid: "d427121d-c8e2-833a-91d4-cf5e18c50db5"
version: 2
---
# agent/runtime

AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.

Extracted from `agent/runtime.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
