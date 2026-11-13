---
name: bindings
description: "Use when attaching every Cloudflare binding to the edge Worker — each binding is a sense the pure-compute Worker is granted to reach the world (D1, R2, AI, Vectorize, KV, Queues, Durable Objects, Browser, Analytics, Email), the platform-level measurement boundary; attach all, gate each through access, emit a receipt."
atomPath: "quantum/bindings"
coordinate: "quantum/bindings · 4/weave · 4f09f413"
contentUuid: "d9659f53-5b33-5ff7-a810-e0b3522393c2"
diamondUuid: "4e4c97db-f770-8cfe-a852-2592b1fd8bbc"
uuid: "4f09f413-3658-82c6-8cfd-8e36baf1d1b0"
horo: 4
typography:
  partition: quantum
  bondDegree: 76
standards: []
bindings: []
signatures:
  computationUuid: "576daea3-1d05-8123-a69f-56b75494bcfa"
  stages:
    - stage: path
      stageUuid: "6afb2d1c-7bbf-824c-babb-b9e1df553e05"
    - stage: trinity
      stageUuid: "c8e98863-46aa-8751-b0bb-b336a278152d"
    - stage: boundary
      stageUuid: "97b3b94a-3bf9-82bf-bb69-79f1c8e07df7"
    - stage: links
      stageUuid: "14403cf2-502c-874f-b60d-ff71ed4b34bf"
    - stage: horo
      stageUuid: "71519437-8204-869b-9881-cc406b84fcce"
    - stage: seal
      stageUuid: "12a8a4a2-3333-8969-a944-0675f5ed5e3e"
    - stage: uuid
      stageUuid: "3a5b2a4b-9161-890d-990a-cf9859a15171"
quantum:
  superposition:
    - access
    - ai
    - analytics
    - bindings
    - cache
    - currency
    - deploy
    - dev
    - superposition
  collapse:
    - "Use when attaching every Cloudflare binding to the edge Worker — each binding is a sense the pure-compute Worker is granted to reach the world (D1, R2, AI, Vectorize, KV, Queues, Durable Objects, Browser, Analytics, Email), the platform-level measurement boundary; attach all, gate each through access, emit a receipt."
    - "[[access]]"
    - "[[bindings]]"
    - "[[deploy]]"
    - "[[quantum/device]]"
    - "[[receipt]]"
    - "[[sandbox]]"
    - "[[uuid]]"
    - "attach-all is safe only because each call is gated — a binding is a capability grant, not a free reach, so widening the door to all 26 senses is bounded by the invariant that every use passes [[access]] in the caller's request, draws its credential from the broker, and emits a [[receipt]]; it is the gate per call, never the length of the binding list, that holds, and a Durable-Object class reaches the Worker at all only as a named export of the OpenNext `main` entry."
    - broker
    - worker
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "576daea3-1d05-8123-a69f-56b75494bcfa"
    contentUuid: "d9659f53-5b33-5ff7-a810-e0b3522393c2"
version: 2
---
# quantum/bindings — the Worker's senses

The quantum twin of [[bindings]]: a pure-compute worker has no fs, no native, no camera — it reaches the world only through its **bindings**, the platform-level [[quantum/device]] (each a measurement inlet or an actuator outlet). To attach *all* of them is to give the edge every sense at once.

The 26 senses, by faculty:

- **store** — `D1` (database), `R2` ([[storage]], content-addressed blobs deduped by [[uuid]]), `AI_CACHE` ([[cache]], hot reads).
- **think** — `AI` + `VECTORIZE_DOCS` ([[ai]], inference + per-tenant semantic search).
- **flow** — `QUEUE_*` ([[queue]], async fan-out), `ERPAX_DO` and the legacy DOs ([[sandbox]] state, quota, rate-limit, job-lock, audit-chain).
- **see / say** — `BROWSER` (PDF/screenshot render), `IMAGES`/`ASSETS` (edge media), `EMAIL_SENDER` ([[email]]), `ANALYTICS_*` ([[analytics]]).
- **self** — `WORKER_SELF_REFERENCE` (self-invocation → self-clone, reconciled by content-[[uuid]]).

## Attach all, but gate each

A binding is a capability grant, so every call passes the trust sandbox — [[access]] gates it in the caller's request, the broker holds the credential, the act emits a [[receipt]]. Attaching all senses widens the door onto everything the edge can reach; the gate, not the binding list, is what keeps it safe. The one open gap is conventional, not conceptual — the Durable-Object classes must be **named exports of the OpenNext `main` entry** or the runtime drops them (see [[bindings]]).

**Law — [[law]]: attach-all is safe only because each call is gated — a binding is a capability grant, not a free reach, so widening the door to all 26 senses is bounded by the invariant that every use passes [[access]] in the caller's request, draws its credential from the broker, and emits a [[receipt]]; it is the gate per call, never the length of the binding list, that holds, and a Durable-Object class reaches the Worker at all only as a named export of the OpenNext `main` entry.**

@see [[bindings]] · worker · [[quantum/device]] · [[access]] · [[sandbox]] · broker · [[receipt]] · [[uuid]] · [[deploy]]

<sub>content-uuid `d9659f53-5b33-5ff7-a810-e0b3522393c2` · account `quantum/bindings` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
