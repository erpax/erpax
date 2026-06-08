---
name: bindings
description: "Use when attaching every Cloudflare binding to the edge Worker — each binding is a sense the pure-compute Worker is granted to reach the world (D1, R2, AI, Vectorize, KV, Queues, Durable Objects, Browser, Analytics, Email), the platform-level measurement boundary; attach all, gate each through access, emit a receipt."
atomPath: quantum/bindings
coordinate: quantum/bindings · 8/crest · 49335de5
contentUuid: "665134e5-b95f-5b1b-a89d-c64a54af4182"
diamondUuid: "2c0a489c-946b-849a-b9a0-7d39bbd097fd"
uuid: "49335de5-3d49-84c4-a230-01a0d67911e2"
horo: 8
bonds:
  in:
    - binding
    - bindings
    - cache
    - config
    - currency
    - deploy
    - dev
    - harden
    - identity
    - jobs
    - law
    - manufacturing
    - mcp
    - plugins
    - quantum
    - search
    - signal
    - sufficient
    - supto
  out:
    - binding
    - bindings
    - cache
    - config
    - currency
    - deploy
    - dev
    - harden
    - identity
    - jobs
    - law
    - manufacturing
    - mcp
    - plugins
    - search
    - signal
    - sufficient
    - supto
typography:
  partition: quantum
  bondDegree: 77
  neighbors:
    - analytics
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - ai
    - analytics
    - bindings
    - broker
    - cache
    - database
    - deploy
    - device
    - email
    - law
    - queue
    - receipt
    - sandbox
    - storage
    - uuid
    - worker
  matrix:
    - binding
    - bindings
    - cache
    - config
    - currency
    - deploy
    - dev
    - harden
    - identity
    - jobs
    - law
    - manufacturing
    - mcp
    - plugins
    - search
    - signal
    - sufficient
    - supto
  backlinks:
    - binding
    - bindings
    - cache
    - config
    - currency
    - deploy
    - dev
    - harden
    - identity
    - jobs
    - law
    - manufacturing
    - mcp
    - plugins
    - search
    - signal
    - sufficient
    - supto
signatures:
  computationUuid: "ce16f01c-fca8-8597-8a2a-eda1664596f0"
  stages:
    - stage: path
      stageUuid: "6afb2d1c-7bbf-824c-babb-b9e1df553e05"
    - stage: trinity
      stageUuid: "c8e98863-46aa-8751-b0bb-b336a278152d"
    - stage: boundary
      stageUuid: "46d01cee-02e4-88d6-8c20-2d7583268b56"
    - stage: links
      stageUuid: "c6bf8e50-dad7-8046-b7f4-2472538c13fa"
    - stage: horo
      stageUuid: "ffc68ade-9f71-8405-b22a-312fd5ce598b"
    - stage: seal
      stageUuid: "12a8a4a2-3333-8969-a944-0675f5ed5e3e"
    - stage: uuid
      stageUuid: "a2397c9e-8ad5-857f-9d49-d31cde2c069b"
quantum:
  superposition:
    - binding
    - bindings
    - cache
    - config
    - currency
    - deploy
    - dev
    - harden
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
    computationUuid: "ce16f01c-fca8-8597-8a2a-eda1664596f0"
    contentUuid: "665134e5-b95f-5b1b-a89d-c64a54af4182"
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

<sub>content-uuid `665134e5-b95f-5b1b-a89d-c64a54af4182` · account `quantum/bindings` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
