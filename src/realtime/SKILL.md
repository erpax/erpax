---
name: realtime
description: Use when modeling live delivery of events — an append-only log plus a per-subscriber cursor, where the live tail is everything after the cursor; the pull-side semantics over a stream.
---

# realtime — the live tail

Delivery of events as they arrive: an **append-only log** plus a **per-subscriber cursor**. The live tail is `since(log, cursor)` — everything after what a subscriber has already seen; `advance` moves the cursor past it. This is the pull-side delivery semantics layered over a [[stream]] (the SSE transport with its lamport clock and uuid-chain). Deterministic and pure: the same log and cursor always yield the same tail.

The [[translator]] facet — [[realtime/translator]] — translates that tail as it arrives, reducing each message to its language-independent meaning.

Matter-twin: `src/realtime/index.ts` (`append` · `since` · `advance`). Composes [[stream]] · [[event]] · [[live]] · [[sequence]].

@standard append-only log + cursor (the pull-based realtime model)
