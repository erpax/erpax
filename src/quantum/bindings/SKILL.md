---
name: bindings
description: "Use when attaching every Cloudflare binding to the edge Worker — each binding is a sense the pure-compute Worker is granted to reach the world (D1, R2, AI, Vectorize, KV, Queues, Durable Objects, Browser, Analytics, Email), the platform-level measurement boundary; attach all, gate each through access, emit a receipt."
atomPath: "quantum/bindings"
coordinate: "quantum/bindings · 7/descent · eabcb4f9"
contentUuid: "848e54d4-b012-59ac-9619-9246708fe2a2"
diamondUuid: "49fb149d-c99c-8231-80db-9e32f3a4ab72"
uuid: "eabcb4f9-3b59-8543-b686-8f7f09cd1cb3"
horo: 7
typography:
  partition: quantum
  bondDegree: 95
standards: []
bindings: []
signatures:
  computationUuid: "4b3f9093-ac61-80da-993d-665125b8ed62"
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
      stageUuid: "cba8ba74-7522-80f8-916a-78938fabf89a"
    - stage: seal
      stageUuid: "12a8a4a2-3333-8969-a944-0675f5ed5e3e"
    - stage: uuid
      stageUuid: "3ec111c2-f0a5-830d-b8b7-e1073a7dac00"
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
    computationUuid: "4b3f9093-ac61-80da-993d-665125b8ed62"
    contentUuid: "848e54d4-b012-59ac-9619-9246708fe2a2"
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

<sub>content-uuid `848e54d4-b012-59ac-9619-9246708fe2a2` · account `quantum/bindings` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
