---
name: runtime
description: Use when reasoning about runtime — AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.
atomPath: "agent/runtime"
coordinate: "agent/runtime · 2/share · dd54acc1"
contentUuid: "54c28bf3-deb4-52b5-b391-1eb09e8d660c"
diamondUuid: "ab6ecd3b-b64c-83f6-ba52-a7df778e68ff"
uuid: "dd54acc1-be7a-80a2-bfbc-e7f7e3d1b8d8"
horo: 2
typography:
  partition: agent
  bondDegree: 10
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-25010"
bindings: []
signatures:
  computationUuid: "16c61b23-2daa-8af7-8dd8-23c18d8eb9cc"
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
      stageUuid: "39c8b0a5-152c-8c89-9306-52e87aaf62df"
    - stage: seal
      stageUuid: "dcd5c30f-68c9-8b20-b71a-8fdb51a3551b"
    - stage: uuid
      stageUuid: "93314daa-6119-80dd-bef2-631be07cfcbe"
version: 2
---
# agent/runtime

AgentRuntime — dispatches chain steps + events + scheduled ticks to the owning DomainAgent and processes its returned effects.

Extracted from `agent/runtime.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
