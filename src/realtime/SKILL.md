---
name: realtime
description: "Use when modeling live delivery of events — an append-only log plus a per-subscriber cursor, where the live tail is everything after the cursor; the pull-side semantics over a stream."
atomPath: realtime
coordinate: "realtime · 7/descent · 80de6b26"
contentUuid: "2cd04229-84e7-5c80-99f8-5284aceec153"
diamondUuid: "b97ee6cc-01c5-8f64-9d82-423466e6a7a4"
uuid: "80de6b26-8b00-8943-9f27-cbeba070acfc"
horo: 7
typography:
  partition: realtime
  bondDegree: 71
standards:
  - "append-only log + cursor (the pull-based realtime model)"
bindings: []
signatures:
  computationUuid: "815c9287-6df1-8d3e-b0c3-a9a98b21f616"
  stages:
    - stage: path
      stageUuid: "3a6f25d1-e0df-8b72-92dd-b5c707d6935a"
    - stage: trinity
      stageUuid: "6d59d6cf-03cd-8c00-8faf-786fe8f944a9"
    - stage: boundary
      stageUuid: "e1709677-5883-852d-89c7-e64ec1561c41"
    - stage: links
      stageUuid: "a2579ebf-7f36-848d-9ac1-e16b670a2f7c"
    - stage: horo
      stageUuid: "6ca38d77-36d3-8c3a-9b56-bb23dbbc6921"
    - stage: seal
      stageUuid: "5dd1fb97-0bf3-8837-9f58-69e9eef0b4f3"
    - stage: uuid
      stageUuid: "6e342378-d1f6-8a2b-b381-0d20ae23fe48"
version: 2
---
# realtime — the live tail

Delivery of events as they arrive: an **append-only log** plus a **per-subscriber cursor**. The live tail is `since(log, cursor)` — everything after what a subscriber has already seen; `advance` moves the cursor past it. This is the pull-side delivery semantics layered over a [[stream]] (the SSE transport with its lamport clock and uuid-chain). Deterministic and pure: the same log and cursor always yield the same tail.

The [[translator]] facet — [[realtime/translator]] — translates that tail as it arrives, reducing each message to its language-independent meaning.

Matter-twin: `src/realtime/index.ts` (`append` · `since` · `advance`). Team-scoped emits onto the live bus are gated by [[team/comms]] ([[chat]] · [[team]] · [[access]] · [[receipt]]). Composes [[stream]] · [[event]] · [[live]] · [[sequence]].

@standard append-only log + cursor (the pull-based realtime model)
