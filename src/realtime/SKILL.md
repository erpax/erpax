---
name: realtime
description: "Use when modeling live delivery of events — an append-only log plus a per-subscriber cursor, where the live tail is everything after the cursor; the pull-side semantics over a stream."
atomPath: realtime
coordinate: "realtime · 4/weave · d9578de1"
contentUuid: "524ce1e6-b67f-55e4-9a14-8d735b7bb7e7"
diamondUuid: "c9b0403e-4442-84c5-b697-4259cc9674e7"
uuid: "d9578de1-069e-84f1-a542-e615ccd5c587"
horo: 4
typography:
  partition: realtime
  bondDegree: 71
standards:
  - "append-only log + cursor (the pull-based realtime model)"
bindings: []
signatures:
  computationUuid: "248c2784-3a8c-8262-9a0d-3826624e1748"
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
      stageUuid: "d649372e-3b0b-809a-a636-e6ff9b45272f"
    - stage: seal
      stageUuid: "5dd1fb97-0bf3-8837-9f58-69e9eef0b4f3"
    - stage: uuid
      stageUuid: "593a0e4b-abca-8ad8-a7d9-edba5b9fa5d1"
version: 2
---
# realtime — the live tail

Delivery of events as they arrive: an **append-only log** plus a **per-subscriber cursor**. The live tail is `since(log, cursor)` — everything after what a subscriber has already seen; `advance` moves the cursor past it. This is the pull-side delivery semantics layered over a [[stream]] (the SSE transport with its lamport clock and uuid-chain). Deterministic and pure: the same log and cursor always yield the same tail.

The [[translator]] facet — [[realtime/translator]] — translates that tail as it arrives, reducing each message to its language-independent meaning.

Matter-twin: `src/realtime/index.ts` (`append` · `since` · `advance`). Team-scoped emits onto the live bus are gated by [[team/comms]] ([[chat]] · [[team]] · [[access]] · [[receipt]]). Composes [[stream]] · [[event]] · [[live]] · [[sequence]].

@standard append-only log + cursor (the pull-based realtime model)
