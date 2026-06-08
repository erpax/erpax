---
name: realtime
description: "Use when modeling live delivery of events — an append-only log plus a per-subscriber cursor, where the live tail is everything after the cursor; the pull-side semantics over a stream."
atomPath: realtime
coordinate: realtime · 5/round · 23b77817
contentUuid: "d79cc54b-2408-52d6-8904-3e85f84505ee"
diamondUuid: "1cfae3db-a163-8697-977f-8222d245366c"
uuid: "23b77817-e4f3-8482-8196-0d8340de6df1"
horo: 5
bonds:
  in:
    - access
    - chat
    - comms
    - event
    - live
    - log
    - memory
    - number
    - pi
    - quantum
    - receipt
    - religion
    - sequence
    - stream
    - team
    - topography
    - trading
    - translator
    - uuid
    - wave
  out:
    - access
    - chat
    - comms
    - event
    - live
    - log
    - memory
    - number
    - pi
    - quantum
    - receipt
    - religion
    - sequence
    - stream
    - team
    - topography
    - trading
    - translator
    - uuid
    - wave
typography:
  partition: realtime
  bondDegree: 66
  neighbors: []
standards:
  - "append-only log + cursor (the pull-based realtime model)"
bindings: []
neighbors:
  wikilink:
    - access
    - chat
    - comms
    - event
    - live
    - receipt
    - sequence
    - stream
    - team
    - translator
  matrix:
    - access
    - chat
    - comms
    - event
    - live
    - log
    - memory
    - number
    - pi
    - quantum
    - receipt
    - religion
    - sequence
    - stream
    - team
    - topography
    - trading
    - translator
    - uuid
    - wave
  backlinks:
    - access
    - chat
    - comms
    - event
    - live
    - log
    - memory
    - number
    - pi
    - quantum
    - receipt
    - religion
    - sequence
    - stream
    - team
    - topography
    - trading
    - translator
    - uuid
    - wave
signatures:
  computationUuid: "4612edc6-8a3c-8941-8634-872f96ea7f7f"
  stages:
    - stage: path
      stageUuid: "3a6f25d1-e0df-8b72-92dd-b5c707d6935a"
    - stage: trinity
      stageUuid: "6d59d6cf-03cd-8c00-8faf-786fe8f944a9"
    - stage: boundary
      stageUuid: "84660dca-cbb7-8f48-a43a-92d952677f61"
    - stage: links
      stageUuid: "a2579ebf-7f36-848d-9ac1-e16b670a2f7c"
    - stage: horo
      stageUuid: "146ab988-1085-8fe7-adec-ae6a284e211d"
    - stage: seal
      stageUuid: "ba6a231e-ef33-88c5-905f-6d737747b050"
    - stage: uuid
      stageUuid: "d778966f-785c-8fe3-9f9d-d37d5164bcc2"
version: 2
---
# realtime — the live tail

Delivery of events as they arrive: an **append-only log** plus a **per-subscriber cursor**. The live tail is `since(log, cursor)` — everything after what a subscriber has already seen; `advance` moves the cursor past it. This is the pull-side delivery semantics layered over a [[stream]] (the SSE transport with its lamport clock and uuid-chain). Deterministic and pure: the same log and cursor always yield the same tail.

The [[translator]] facet — [[realtime/translator]] — translates that tail as it arrives, reducing each message to its language-independent meaning.

Matter-twin: `src/realtime/index.ts` (`append` · `since` · `advance`). Team-scoped emits onto the live bus are gated by [[team/comms]] ([[chat]] · [[team]] · [[access]] · [[receipt]]). Composes [[stream]] · [[event]] · [[live]] · [[sequence]].

@standard append-only log + cursor (the pull-based realtime model)
