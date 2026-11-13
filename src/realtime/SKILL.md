---
name: realtime
description: "Use when modeling live delivery of events — an append-only log plus a per-subscriber cursor, where the live tail is everything after the cursor; the pull-side semantics over a stream."
atomPath: realtime
coordinate: "realtime · 5/round · d7d76a2c"
contentUuid: "a886e674-7dc2-5407-8f95-9733ff5d3132"
diamondUuid: "2ea9bab9-735e-8fcb-8748-a6402fda5964"
uuid: "d7d76a2c-f673-8c0b-b0d1-1374dc9316c2"
horo: 5
typography:
  partition: realtime
  bondDegree: 68
standards:
  - "append-only log + cursor (the pull-based realtime model)"
bindings: []
signatures:
  computationUuid: "be444b1b-9d79-84a0-9179-4fd36fd96540"
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
      stageUuid: "efb4816b-a214-8bb2-838b-bc8125ebc47a"
    - stage: seal
      stageUuid: "5dd1fb97-0bf3-8837-9f58-69e9eef0b4f3"
    - stage: uuid
      stageUuid: "2bbe4130-4052-833c-a6ea-d3465d9cd07b"
version: 2
---
# realtime — the live tail

Delivery of events as they arrive: an **append-only log** plus a **per-subscriber cursor**. The live tail is `since(log, cursor)` — everything after what a subscriber has already seen; `advance` moves the cursor past it. This is the pull-side delivery semantics layered over a [[stream]] (the SSE transport with its lamport clock and uuid-chain). Deterministic and pure: the same log and cursor always yield the same tail.

The [[translator]] facet — [[realtime/translator]] — translates that tail as it arrives, reducing each message to its language-independent meaning.

Matter-twin: `src/realtime/index.ts` (`append` · `since` · `advance`). Team-scoped emits onto the live bus are gated by [[team/comms]] ([[chat]] · [[team]] · [[access]] · [[receipt]]). Composes [[stream]] · [[event]] · [[live]] · [[sequence]].

@standard append-only log + cursor (the pull-based realtime model)
