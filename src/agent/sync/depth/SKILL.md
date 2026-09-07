---
name: depth
description: "Use when a module needs the broadcast cascade guard without inheriting the sync subtree — MAX_BROADCAST_DEPTH and withinBroadcastDepth live here alone, in a module with ZERO imports. That property is the whole atom: the constant used to sit in chat-broadcast.ts, deep inside the corpus's largest import tangle, so any atom wanting one integer paid for @/ai/industry, @/agent, effect-processor, context and payload-chat. A constant that depends on nothing must be reachable without depending on anything."
atomPath: "agent/sync/depth"
coordinate: "agent/sync/depth · 1/base · de92ed38"
contentUuid: "715342cd-e2fa-521c-8bb8-1ea05fd77cac"
diamondUuid: "f2e6dfbc-1f36-8041-a8ab-41440f60fde3"
uuid: "de92ed38-d52b-845c-95dd-8a17a6ec578f"
horo: 1
typography:
  partition: agent
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "e6e79707-d0ee-8f35-bfd2-e1d7142b0c2a"
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
      stageUuid: "231ca8ea-13a0-8612-961a-8677c107e2e7"
    - stage: seal
      stageUuid: "343aa8a1-ee4b-84b8-95a2-b514368c5336"
    - stage: uuid
      stageUuid: "6dc1753b-6729-8e1a-8579-b59ee9ef3bd3"
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
