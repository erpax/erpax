---
name: depth
description: "Use when a module needs the broadcast cascade guard without inheriting the sync subtree — MAX_BROADCAST_DEPTH and withinBroadcastDepth live here alone, in a module with ZERO imports. That property is the whole atom: the constant used to sit in chat-broadcast.ts, deep inside the corpus's largest import tangle, so any atom wanting one integer paid for @/ai/industry, @/agent, effect-processor, context and payload-chat. A constant that depends on nothing must be reachable without depending on anything."
atomPath: "agent/sync/depth"
coordinate: "agent/sync/depth · 5/round · 39a82e0d"
contentUuid: "ce3eb0f4-b08a-5273-aebd-3872e6c377a4"
diamondUuid: "c3bc4027-6248-8643-b7ca-73164be0384d"
uuid: "39a82e0d-ed51-8d22-9637-7411882a455f"
horo: 5
typography:
  partition: agent
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "406ea094-0a9d-85b7-8e99-7de9f75373a3"
  stages:
    - stage: path
      stageUuid: "1d18d2b1-7906-8ca5-8f57-db9ed521d95c"
    - stage: trinity
      stageUuid: "ee670368-c5d0-8a33-b7d9-bd026e4ea7c6"
    - stage: boundary
      stageUuid: "a37bb543-848d-8f3e-995d-547156f6137b"
    - stage: links
      stageUuid: "9dd436b8-1af5-893a-b7aa-7876ba7cd2fe"
    - stage: horo
      stageUuid: "433186ae-528a-8db7-a169-46ac2ad93fd6"
    - stage: seal
      stageUuid: "343aa8a1-ee4b-84b8-95a2-b514368c5336"
    - stage: uuid
      stageUuid: "15eed389-9f10-8f5a-861f-bdb9818ed753"
version: 2
---
# agent/sync/depth — a constant that depends on nothing, reachable without depending on anything

`MAX_BROADCAST_DEPTH` is the integer 32. It used to live in `chat-broadcast.ts`, a file deep inside the corpus's largest import tangle — so [[team]]/comms, which takes **one symbol**, inherited `@/ai/industry`, `@/agent`, `effect-processor`, `context` and `payload-chat` along with it.

Moving it to a module with **zero imports** is the cut. Importing this adds no edge, which is the only property that matters here and the one its test pins:

```
largest import SCC   249 → 57 files
fatal top-level uses  42 → 24
```

Those three cuts are `@/website` → `@/website/seo`, `@/integrity` → `@/integrity/content`, and this one. `chat-broadcast.ts` re-exports the constant, so everything reading it from `@/agent/sync` is unchanged.

`withinBroadcastDepth` is the comparison the guard actually makes — exclusive at the bound, and refusing a non-integer or negative depth rather than coercing it.

**Honest boundary.** This removes an EDGE; it does not remove the tangle. Two components of 57 and 53 files remain, and 24 top-level uses still run a binding from their own component at load time. What it does prove is that the cut points are findable and lawful: a leaf sub-atom satisfies the cycle law and the import-purity law at once.

**Law — [[law]]: a constant that depends on nothing must be reachable without depending on anything. A zero-import module is a valid cut point in any tangle.**

Composes: [[agent]]/sync · [[team]]/comms · [[rules]]/cycle · [[law]].
