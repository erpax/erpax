---
name: communication
description: Use when reasoning about communication on the quantum level — a message is a content-uuid (no-cloning, so a forged message has a different uuid), the channel is entanglement, and a received message is intact iff its uuid matches the original.
---

# quantum/communication — no-cloning + tamper-evidence

The quantum facet of [[communication]]: a [[message]] is a content-uuid, so it obeys **no-cloning** ([[entanglement]], Wootters–Zurek 1982) — each meaning has one uuid, so a forged message has a *different* uuid, never the same identity — and the channel is **entanglement** (sender and receiver share the binding). A received message is **intact** iff its content-uuid matches the original: tamper-evidence by architecture. Merges into [[communication]].

Matter-twin: `src/quantum/communication/index.ts` (`intact` · `noCloningHolds`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[cloning]].

@standard no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid
