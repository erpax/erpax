---
name: depth
description: "Use when a module needs the broadcast cascade guard without inheriting the sync subtree — MAX_BROADCAST_DEPTH and withinBroadcastDepth live here alone, in a module with ZERO imports. That property is the whole atom: the constant used to sit in chat-broadcast.ts, deep inside the corpus's largest import tangle, so any atom wanting one integer paid for @/ai/industry, @/agent, effect-processor, context and payload-chat. A constant that depends on nothing must be reachable without depending on anything."
atomPath: "agent/sync/depth"
coordinate: "agent/sync/depth · 2/share · b2b130b4"
contentUuid: "f0fcd74e-ca06-59cb-b1b6-53970316c87e"
diamondUuid: "dc20c29b-745c-8205-b5ae-f5c41cdfc3c7"
uuid: "b2b130b4-d7e5-89df-8ae7-0699024cbf0d"
horo: 2
typography:
  partition: agent
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "be0e46e5-dfcb-846e-92d2-78c1f785712d"
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
      stageUuid: "499e25d9-86ce-86ef-b3b5-6aee5e44606e"
    - stage: seal
      stageUuid: "343aa8a1-ee4b-84b8-95a2-b514368c5336"
    - stage: uuid
      stageUuid: "6cb7a0cf-b95b-8ddb-9ae9-e810514bebc2"
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
