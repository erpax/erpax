---
name: depth
description: "Use when a module needs the broadcast cascade guard without inheriting the sync subtree — MAX_BROADCAST_DEPTH and withinBroadcastDepth live here alone, in a module with ZERO imports. That property is the whole atom: the constant used to sit in chat-broadcast.ts, deep inside the corpus's largest import tangle, so any atom wanting one integer paid for @/ai/industry, @/agent, effect-processor, context and payload-chat. A constant that depends on nothing must be reachable without depending on anything."
atomPath: "agent/sync/depth"
coordinate: "agent/sync/depth · 2/share · d3d42d54"
contentUuid: "b68a141e-3088-505a-b776-dadc51c32f81"
diamondUuid: "cd80b2a3-aa07-87a2-aeea-0a3cded1a97f"
uuid: "d3d42d54-b671-8f1d-90ed-32a444a1de6c"
horo: 2
typography:
  partition: agent
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "130b7385-0076-831b-9d27-914aa26f80de"
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
      stageUuid: "1cbda3e4-5ebc-8e54-b317-2667d614ae0a"
    - stage: seal
      stageUuid: "343aa8a1-ee4b-84b8-95a2-b514368c5336"
    - stage: uuid
      stageUuid: "e661a2ea-b663-804e-a5f0-71f341c6226d"
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
