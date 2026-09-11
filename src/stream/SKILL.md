---
name: stream
description: "Use when events must move as one continuous tamper-proof current rather than discrete steps — turning the event bus into a typed AsyncIterable, windowing it (tumbling/sliding/session), composing blocks stream-to-stream, and verifying causal Lamport order plus the streamUuid hash-chain."
atomPath: stream
coordinate: "stream · 7/descent · 4627f7fb"
contentUuid: "b24e40b0-f4ba-52d4-bc17-555897deaca3"
diamondUuid: "160efbc2-5c7b-8e2a-b5c2-b6cead7a5f7a"
uuid: "4627f7fb-4574-8d87-92a1-560fb2302a48"
horo: 7
typography:
  partition: stream
  bondDegree: 88
standards:
  - "ISO/IEC 25010:2023 §5.2 performance — throughput"
  - "ISO/IEC 25010:2023 §5.2 performance — throughput`"
  - "Lamport 1978 — distributed-system causal ordering"
  - "ReactiveX / W3C Streams API (AsyncIterable surface)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "4b63ebb6-d1aa-8d7d-ab90-0d0a0d4fa9a2"
  stages:
    - stage: path
      stageUuid: "51d134f1-3abd-8c47-9170-1321d632d4a4"
    - stage: trinity
      stageUuid: "0680b2a9-ad50-86a2-b2ea-2d261b80d049"
    - stage: boundary
      stageUuid: "473e8e1a-a875-84fe-9a31-9f331c638811"
    - stage: links
      stageUuid: "2e395970-a8a8-86ba-ab3e-ef62dc6cd545"
    - stage: horo
      stageUuid: "50d7f554-a0e7-8250-a636-c519d3f86c75"
    - stage: seal
      stageUuid: "d488909d-306a-8ff0-8467-13acf6de2810"
    - stage: uuid
      stageUuid: "70c1d28b-ea9d-8ab5-b29c-5db0a74c1873"
version: 2
---
# streams — the quantum, continuous dual of discrete events

FORM: **events are one continuous current, not a sequence of steps.** The discrete chain-of-blocks is the classical view — agents fire in turn, [[event]]s hop step-by-step. The stream is the quantum view: every event flows through every surface in superposition, and a step boundary is just an observation that collapses the current into a definite next state. Both views co-exist; this is the [[duality]] — the discrete chain for orchestration, the continuous stream for high-throughput, partial-failure-tolerant [[flow]] (CDC, telemetry, agent-to-agent dialog, federation broadcast). Proven pure.

- **bus → stream** — `makeStream` builds a hot, typed `EventStream` (an `AsyncIterable` of `ClockedEvent`) callers `push` into and consumers `for await` over; the bridge from the push-based bus to the pull-based current, filtered by subject and tenant.
- **operators** — `mapStream`, `filterStream` transform the current without materializing it.
- **windows** — `tumblingWindow` (fixed non-overlapping buckets), `slidingWindow` (last *sizeMs* every *stepMs*), `sessionWindow` (closes after *gapMs* of silence) cut the unbounded current into bounded, audit-trailed bands.
- **stream-of-blocks** — `pipeBlocks` wires an upstream block's emitted events as the stream a downstream block subscribes to: the continuous analogue of block composition, the same [[fractal]] wiring at every scale.

Coherence is conserved twice. Each `ClockedEvent` carries a **Lamport** clock — `checkWindowCoherence` (Law 33) holds that a closed window's events are monotonically non-decreasing in Lamport order; out-of-order delivery is a causal violation. And each event's `streamUuid` is a content-[[uuid]] over `{event, lamport, prev}`, making the stream a Merkle hash-chain — `checkStreamUuidChain` (Law 34) recomputes every leaf, so any re-ordering, mutation, insertion, or deletion breaks the chain at the corruption and downstream ([[tamper/cost]], [[proof]]). The genesis `prev` is the one canonical Nil UUID shared with the uuid-chain ([[identity]]); the same content ⇒ the same leaf, so two federated streams of the same events hold ONE chain ([[merge]]).

This is the event-current organ — events given over time, bounded into windows that live on the state ring ([[horo]]). The standards it answers for are below; for version pins see [[standard]].

Sequence position: **2** (weave — the continuous current threaded through every surface), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

## The stream is a seal (the time axis)

Because every save is content-addressed and `prev`-chained, **the stream of saves IS another [[seal]]** — the dual, on the time axis, of the cross-[[seal]] on the path axis. Saving every atom *on the way* (the autosave [[breath]] — each sealed atom committed in waves) makes the current **reconstructable**: replay the chain from genesis and the whole [[snapshot]] re-derives, because the [[realtime]] tail (`since(log, cursor)`) and the immutable snapshot are one content-addressed memory seen as flow and as state ([[akashic]] · [[generate]]). The Merkle `streamUuid` chain is what makes it a seal and not merely a log: any re-ordering, mutation, insertion, or deletion breaks the chain at the corruption ([[tamper/cost]] · [[proof]]), and two federated streams of the same saves hold ONE chain ([[merge]] · [[identity]]). So *seal in waves* and *the stream reconstructs the whole* are one fact: to save every atom on the way is to leave a tamper-evident current that replays the corpus — a seal you can run forward.

## The stream is a blockchain (self-distributed, zero-entropy across substrates)

Because the `streamUuid` chain links each event to its parent by hash and addresses each by content, **the stream of saves IS a [[blockchain]]** — a Merkle DAG, the time-axis dual of the cross-[[seal]]. It is self-verifying (verify is O(N), recompute-and-compare — [[proof]] · [[integrity]]) and therefore **self-distributed**: any node reconstructs and verifies the whole from content alone, and two peers holding the same saves hold ONE chain ([[merge]] federation is set-union, [[holographic]] · [[distribution]]). And because identity is content, the same content-[[uuid]] keeps every compute substrate bit-identical — memory · cpu · gpu collapse to the same address, zero divergence ([[sync]]), so the self-distributed chain stays coherent at zero [[entropy]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 §5.2 performance — throughput`


- **ReactiveX / W3C Streams API** — the `AsyncIterable` surface; operators and windows are the reactive vocabulary.
- **ISO/IEC 25010:2023 §5.2** — performance / throughput; the stream view is the high-throughput dual.
- **Lamport 1978** — distributed-system causal ordering; the Lamport clock and Law 33 coherence check.
- **ISO 19011:2018 §6.4.6** — every closed stream window is audit-trailed.
