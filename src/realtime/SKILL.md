---
name: realtime
description: "Use when modeling live delivery of events — an append-only log plus a per-subscriber cursor, where the live tail is everything after the cursor; the pull-side semantics over a stream."
atomPath: realtime
coordinate: "realtime · 5/round · fcfeea4c"
contentUuid: "55ab0bbd-bc42-5b1a-a0fd-3f2d5894d1f2"
diamondUuid: "d90b1fde-0c51-82ff-8fd4-07ad656e6fb0"
uuid: "fcfeea4c-7658-8002-a85e-05862e34cfd9"
horo: 5
typography:
  partition: realtime
  bondDegree: 74
standards:
  - "append-only log + cursor (the pull-based realtime model)"
bindings: []
signatures:
  computationUuid: "f7010e76-6f6c-8be1-b7fd-20cbfd9cbe99"
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
      stageUuid: "012e3d23-4b1e-8e00-92ea-a91456f2dfce"
    - stage: seal
      stageUuid: "5dd1fb97-0bf3-8837-9f58-69e9eef0b4f3"
    - stage: uuid
      stageUuid: "93558e4b-6ca3-8345-bbc7-134ecaa2b57c"
version: 2
---
# realtime — the live tail

Delivery of events as they arrive: an **append-only log** plus a **per-subscriber cursor**. The live tail is `since(log, cursor)` — everything after what a subscriber has already seen; `advance` moves the cursor past it. This is the pull-side delivery semantics layered over a [[stream]] (the SSE transport with its lamport clock and uuid-chain). Deterministic and pure: the same log and cursor always yield the same tail.

The [[translator]] facet — [[realtime/translator]] — translates that tail as it arrives, reducing each message to its language-independent meaning.

Matter-twin: `src/realtime/index.ts` (`append` · `since` · `advance`). Team-scoped emits onto the live bus are gated by [[team/comms]] ([[chat]] · [[team]] · [[access]] · [[receipt]]). Composes [[stream]] · [[event]] · [[live]] · [[sequence]].

@standard append-only log + cursor (the pull-based realtime model)
