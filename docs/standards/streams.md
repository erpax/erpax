# ERPax Streams Standards — Deep Reference

Slice RRRRRR + slice SSSSSS + slice SSSSSSSS (2026-05-11). The streams layer at `src/services/streams/index.ts` is the **quantum view** (§0l) of the chain-of-blocks classical model (§0k). Every state change is a uuid-chained event in causal order. Two conservation laws govern it — 33 (coherence) and 34 (hash-chain). Trinity collapse (slice JJJJJJJJ) places both at **Law II (Causality)**.

> **Cross-reference**: top-level index at [README.md](./README.md); MCP layer at [mcp.md](./mcp.md); UUID foundation at [integrity.md](./integrity.md).

---

## 1. Two views, one platform

| Classical (§0k — slices PPPPPP + QQQQQQ) | Quantum (§0l — slices RRRRRR + SSSSSS) |
|---|---|
| Discrete events through chain steps | Continuous `AsyncIterable<DomainEvent>` |
| One agent processes one event at a time | Agents subscribe to streams + emit streams |
| Step boundary = control-flow gate | Window operator (tumbling / sliding / session) |
| Chain coherence = ordered execution | Stream coherence = causal Lamport order |
| Law 32 = block composition type-safe | **Law 33 = stream coherence preserved** |
| Tamper detection via Merkle audit (QQQQ) | **Law 34 = streamUuid hash-chain** |

Both views co-exist: classical drives orchestration + spec corpus + audit; quantum drives high-throughput, partial-failure-tolerant pipelines (CDC, IoT, AI dialogs, federation broadcasts).

## 2. Primitives

| Primitive | Purpose |
|---|---|
| `EventStream` | Typed `AsyncIterable<ClockedEvent>` with id + optional subjectFilter + tenantId scope |
| `makeStream({id, subjectFilter, tenantId})` | Hot stream — `push(event)` from producers, `for await` from consumers |
| `mapStream / filterStream` | Functional operators preserving Lamport order + streamUuid chain |
| `tumblingWindow(ms)` | Fixed-size non-overlapping buckets |
| `slidingWindow(sizeMs, stepMs)` | Overlapping windows for moving-average / continuous KPIs |
| `sessionWindow(gapMs)` | Window closes after N ms of silence — natural for user sessions / device telemetry |
| `pipeBlocks({upstreamStream, downstreamSubscribesTo})` | Stream-of-blocks composition (quantum analogue of `composeBlocks`) |
| `ClockedEvent {event, lamport, streamUuid, prevStreamUuid}` | Lamport-clocked + hash-chained envelope |

## 3. Lamport / causal-ordering stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **Lamport 1978 — distributed-system causal ordering** | Lamport clock per event; monotonic non-decreasing within a window | `streams/index.ts` (clock assigned at `push()`) | `erpax.streams.checkCoherence` |
| **W3C Streams API + ReactiveX** | AsyncIterable surface for backpressure-friendly consumption | `streams/index.ts` (every operator returns `AsyncIterable<…>`) | `erpax.streams.tumblingDemo` |
| **W3C PROV-DM** | Per-event provenance attribution (Law 12) | `beyond/provenance.ts` consumes stream emissions | implicit |

## 4. UUID hash-chain stack (slice SSSSSS)

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **RFC 4122 §4.3 — UUIDv5** | `streamUuid = uuidv5({event, lamport, prev})` per ClockedEvent | `streams/index.ts` (push() assigns) | `erpax.streams.checkUuidChain` |
| **RFC 8785 — JCS** | Canonical bytes for the (event, lamport, prev) tuple | `streams/index.ts` via `content-uuid.ts` | indirect |
| **FIPS 180-4 — SHA-256** | Hash function backing the chain | `streams/index.ts` via `content-uuid.ts` | indirect |
| **Bitcoin/Ethereum block-hash semantics** | Same shape — every "block" hashes its predecessor; tampering at any point breaks the chain downstream | `streams/index.ts` + `anchoring/index.ts` (anchor optional) | `erpax.anchoring.anchorRoot` |

## 5. Conservation laws

| Law # | Title | Verifies | Trinity |
|---|---|---|---|
| **33** | stream coherence | Every closed window's events in monotonic non-decreasing Lamport order | **II** (Causality) |
| **34** | stream uuid chain | Each event's streamUuid recomputable from {event, lamport, prevStreamUuid}; tampering breaks the chain at corruption + downstream | **II** (Causality) |

## 6. The two coherence properties

### 6.1 Lamport coherence (Law 33)

```
event[i].lamport >= event[i-1].lamport   for all i in [1, N)
```

Out-of-order delivery within a window violates causal coherence and would silently break event-driven decisions downstream (e.g. `invoice:activated` delivered AFTER `invoice:paid` could trigger a re-activation flow over a paid status).

`checkWindowCoherence(events)` verifies this; the probe (in checks.ts) synthesizes a 16-event window and asserts the consumer sees them in order.

### 6.2 UUID-chain coherence (Law 34)

```
streamUuid[i] = uuidv5(JCS({event: event[i], lamport: lamport[i], prev: streamUuid[i-1]}))
streamUuid[0] = uuidv5(JCS({event: event[0], lamport: lamport[0], prev: STREAM_GENESIS}))
```

`checkStreamUuidChain(events, tenantNs)` walks the list, recomputes each `streamUuid`, compares to stored. Mismatch at index `i` indicates tampering at `i` (or earlier — the chain may still be intact from `0..i-1`).

The Law 34 probe (in checks.ts) pushes 8 synthetic events, captures them, verifies the chain passes, **tampers with index 3's payload**, re-verifies — and asserts the re-verification FAILS. This asserts the implementation actually detects tampering rather than silently short-circuiting.

## 7. Window operators

### 7.1 Tumbling window

Fixed-size non-overlapping buckets. Natural for periodic batch processing:

```ts
for await (const bucket of tumblingWindow(stream, 60_000 /* 1 min */)) {
  // bucket.window = { start, end }
  // bucket.events = ReadonlyArray<ClockedEvent>
}
```

### 7.2 Sliding window

Overlapping windows; emit every `stepMs` carrying the last `sizeMs` of events. Natural for moving-averages + continuous KPIs:

```ts
for await (const slice of slidingWindow(stream, 60_000 /* size */, 10_000 /* step */)) {
  // emits every 10s, each carries the last 60s
}
```

### 7.3 Session window

Closes after `gapMs` of silence. Natural for user sessions + device telemetry:

```ts
for await (const session of sessionWindow(stream, 30_000 /* 30s gap */)) {
  // session ends 30s after last event in the bucket
}
```

## 8. Quantum-classical coupling

Every classical chain step (PPPPPP block boundary) corresponds to a quantum window observation: when `agent.onChainStep()` fires, it is the equivalent of measuring the upstream stream's current window. The stream layer doesn't replace the chain-of-blocks model; it is **the substrate beneath it**.

Conservation Law 33 + Law 32 together guarantee: whether you view ERPax as discrete chain steps or as continuous streams, **the same causal order + same type safety hold**.

## 9. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.streams.probeWindow` | Synthetic 16-event burst through tumblingWindow — Law 33 baseline |
| `erpax.streams.checkCoherence` | Verify a list of `ClockedEvent` for Lamport monotonicity (Law 33) |
| `erpax.streams.checkUuidChain` | Verify the streamUuid hash-chain (Law 34) |
| `erpax.streams.tumblingDemo` | Push N events; return per-window counts (dashboard helper) |

## 10. Coupling with other domains

- **Slice DDDDD (agents)** — agents subscribe to streams; their `onEvent` hook consumes ClockedEvent.
- **Slice PPPPPP+QQQQQQ (blocks + chains)** — each `composeBlocks` boundary maps to a `pipeBlocks` quantum-level composition.
- **Slice QQQQ (Merkle audit)** — every stream window can be anchored as a Merkle leaf via `audit.appendLeaf`.
- **Slice BBBBBB (blockchain anchoring)** — high-stakes streams anchor their head streamUuid to a public chain on a cadence.
- **Slice IIIIII (CF Queues)** — production stream backend; tumblingWindow consumes from CF Queue.
- **Slice OOOOOO (voting)** — vote ballots emit `vote:cast` events into a stream; aggregator window consumes them.
- **Slice NNNNNNNN (PWA)** — background sync queue (`enqueueMutation`) is a uuid-chained stream with the same Law 34 property.

## 11. Standards anchoring

@standard Lamport 1978 — distributed-system causal ordering
@standard W3C Streams API + ReactiveX — AsyncIterable surface
@standard W3C PROV-DM — per-event provenance
@standard RFC 4122 §4.3 + RFC 8785 + FIPS 180-4 — uuid hash-chain
@standard ISO/IEC 25010:2023 §5.2 performance — throughput
@standard ISO 19011:2018 §6.4.6 — stream windows audit-trailed

## 12. Cross-reference — alphabetized

Bitcoin/Ethereum block-hash semantics (informal), FIPS 180-4, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.2, Lamport 1978, RFC 4122 §4.3, RFC 8259, RFC 8785, W3C PROV-DM, W3C Streams API + ReactiveX.
