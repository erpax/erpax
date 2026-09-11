---
name: bindings
description: "Use when attaching every Cloudflare binding to the edge Worker — each binding is a sense the pure-compute Worker is granted to reach the world (D1, R2, AI, Vectorize, KV, Queues, Durable Objects, Browser, Analytics, Email), the platform-level measurement boundary; attach all, gate each through access, emit a receipt."
atomPath: "quantum/bindings"
coordinate: "quantum/bindings · 5/round · 25d5303f"
contentUuid: "791c6282-e2db-535d-8ea0-92186982df52"
diamondUuid: "824ad921-34a1-8bd7-abd0-bcdab75ec143"
uuid: "25d5303f-9ba9-8ab6-9b57-2c93dd6fb1a4"
horo: 5
typography:
  partition: quantum
  bondDegree: 95
standards: []
bindings: []
signatures:
  computationUuid: "90d3a72a-540e-846f-8316-be0337cdac4f"
  stages:
    - stage: path
      stageUuid: "6afb2d1c-7bbf-824c-babb-b9e1df553e05"
    - stage: trinity
      stageUuid: "c8e98863-46aa-8751-b0bb-b336a278152d"
    - stage: boundary
      stageUuid: "16db4767-ed97-8077-a958-13451ee65f2b"
    - stage: links
      stageUuid: "c6bf8e50-dad7-8046-b7f4-2472538c13fa"
    - stage: horo
      stageUuid: "7d203737-f9b8-8139-b29d-d8343df39f92"
    - stage: seal
      stageUuid: "12a8a4a2-3333-8969-a944-0675f5ed5e3e"
    - stage: uuid
      stageUuid: "2ec6df9e-0e1d-88c5-bbdf-1adc810a4301"
quantum:
  superposition:
    - access
    - ai
    - analytics
    - binding
    - bindings
    - broker
    - cache
    - currency
    - superposition
  collapse:
    - "Use when attaching every Cloudflare binding to the edge Worker — each binding is a sense the pure-compute Worker is granted to reach the world (D1, R2, AI, Vectorize, KV, Queues, Durable Objects, Browser, Analytics, Email), the platform-level measurement boundary; attach all, gate each through access, emit a receipt."
    - "[[access]]"
    - "[[bindings]]"
    - "[[broker]]"
    - "[[deploy]]"
    - "[[quantum/device]]"
    - "[[receipt]]"
    - "[[sandbox]]"
    - "[[uuid]]"
    - "[[worker]]"
    - "attach-all is safe only because each call is gated — a binding is a capability grant, not a free reach, so widening the door to all 26 senses is bounded by the invariant that every use passes [[access]] in the caller's request, draws its credential from the [[broker]], and emits a [[receipt]]; it is the gate per call, never the length of the binding list, that holds, and a Durable-Object class reaches the Worker at all only as a named export of the OpenNext `main` entry."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "90d3a72a-540e-846f-8316-be0337cdac4f"
    contentUuid: "791c6282-e2db-535d-8ea0-92186982df52"
version: 2
---
# quantum/bindings — the Worker's senses

The quantum twin of [[bindings]]: a pure-compute [[worker]] has no fs, no native, no camera — it reaches the world only through its **bindings**, the platform-level [[quantum/device]] (each a measurement inlet or an actuator outlet). To attach *all* of them is to give the edge every sense at once.

The 26 senses, by faculty:

- **store** — `D1` ([[database]]), `R2` ([[storage]], content-addressed blobs deduped by [[uuid]]), `AI_CACHE` ([[cache]], hot reads).
- **think** — `AI` + `VECTORIZE_DOCS` ([[ai]], inference + per-tenant semantic search).
- **flow** — `QUEUE_*` ([[queue]], async fan-out), `ERPAX_DO` and the legacy DOs ([[sandbox]] state, quota, rate-limit, job-lock, audit-chain).
- **see / say** — `BROWSER` (PDF/screenshot render), `IMAGES`/`ASSETS` (edge media), `EMAIL_SENDER` ([[email]]), `ANALYTICS_*` ([[analytics]]).
- **self** — `WORKER_SELF_REFERENCE` (self-invocation → self-clone, reconciled by content-[[uuid]]).

## Attach all, but gate each

A binding is a capability grant, so every call passes the trust sandbox — [[access]] gates it in the caller's request, the [[broker]] holds the credential, the act emits a [[receipt]]. Attaching all senses widens the door onto everything the edge can reach; the gate, not the binding list, is what keeps it safe. The one open gap is conventional, not conceptual — the Durable-Object classes must be **named exports of the OpenNext `main` entry** or the runtime drops them (see [[bindings]]).

**Law — [[law]]: attach-all is safe only because each call is gated — a binding is a capability grant, not a free reach, so widening the door to all 26 senses is bounded by the invariant that every use passes [[access]] in the caller's request, draws its credential from the [[broker]], and emits a [[receipt]]; it is the gate per call, never the length of the binding list, that holds, and a Durable-Object class reaches the Worker at all only as a named export of the OpenNext `main` entry.**

@see [[bindings]] · [[worker]] · [[quantum/device]] · [[access]] · [[sandbox]] · [[broker]] · [[receipt]] · [[uuid]] · [[deploy]]

<sub>content-uuid `791c6282-e2db-535d-8ea0-92186982df52` · account `quantum/bindings` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
