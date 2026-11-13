---
name: deploy
description: "Use when shipping erpax to the edge — deployment is the collapse of the codebase into live reality (the model becomes real on main); gate-pass then build a content-addressed artifact, migrate D1, push the Worker, a release is finality one-way with rollback to a prior snapshot."
atomPath: "quantum/deploy"
coordinate: "quantum/deploy · 8/crest · 71db2b35"
contentUuid: "fd2fea2c-d3e7-54a7-8c63-1d1b7e1c839a"
diamondUuid: "4bfe6b1c-7d63-84f5-86d4-9b3eab2c87b4"
uuid: "71db2b35-85d0-8b6e-8398-a38dfe717ffa"
horo: 8
typography:
  partition: quantum
  bondDegree: 68
standards: []
bindings: []
signatures:
  computationUuid: "341eabfe-9245-890d-a8fc-a1b71decc19b"
  stages:
    - stage: path
      stageUuid: "f71dbc48-d27e-84cb-a6c1-3cc9514088f7"
    - stage: trinity
      stageUuid: "c079e592-82f2-83c5-b2d6-15ca01978428"
    - stage: boundary
      stageUuid: "ad2908d5-a405-8276-9a33-ea646fbb96c0"
    - stage: links
      stageUuid: "8a0336fb-0749-8c39-af50-bade4a04c8a4"
    - stage: horo
      stageUuid: "46adc65b-1e40-8c23-9275-5de39be24f9b"
    - stage: seal
      stageUuid: "dc12700c-1968-87c8-b7e5-0b79a8241c8c"
    - stage: uuid
      stageUuid: "50556871-1412-80d1-9e85-1d80fb6510cb"
quantum:
  superposition:
    - bindings
    - config
    - deploy
    - dev
    - fold
    - gate
    - harmony
    - law
    - superposition
  collapse:
    - "Use when shipping erpax to the edge — deployment is the collapse of the codebase into live reality (the model becomes real on main); gate-pass then build a content-addressed artifact, migrate D1, push the Worker, a release is finality one-way with rollback to a prior snapshot."
    - "[[bindings]]"
    - "[[cloudflare]]"
    - "[[deploy]]"
    - "[[gate]]"
    - "[[migrate]]"
    - "[[payload]]"
    - "[[quantum/serverless]]"
    - "[[reality]]"
    - finality
    - "only a gate-green tree may collapse into reality — deployment is ordered (gate → migrate → build → push) and shipping an unverified tree forges reality, so the gate is the precondition of the release. The release is finality one way: the live world is never mutated in place; recovery is re-collapsing a prior immutable snapshot, so every running state is one a gate once let through."
    - snapshot
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "341eabfe-9245-890d-a8fc-a1b71decc19b"
    contentUuid: "fd2fea2c-d3e7-54a7-8c63-1d1b7e1c839a"
version: 2
---
# quantum/deploy — the collapse into reality

The quantum twin of [[deploy]]: deployment is the **collapse of the codebase into live [[reality]]** — the model becomes real. erpax is Next.js on Cloudflare workers via OpenNext — pure compute + [[bindings]] (D1 · R2 · AI · Vectorize · Queues · Durable Objects), no native, no fs, no camera at the edge.

## The collapse, in order

1. **[[gate]] first** — only a gate-green tree may collapse ([[confirm]] · [[proof]]). Shipping un-verified is forging reality.
2. **[[migrate]] the database** — `payload migrate` against remote D1 (never dev-push in prod); the schema is generated, migrations committed.
3. **build the artifact** — `opennextjs-cloudflare build`: a content-addressed snapshot (the [[quantum/fs]] law — immutable, deduped), the matter ([[payload]]) compiled for the Worker.
4. **push** — `opennextjs-cloudflare deploy`. The release is finality one way; rollback is the *reverse* — re-collapse a prior [[versions]] snapshot, never mutate the live one.

A deploy is a [[measurement]]: the superposed branch becomes the one running world, [[anchor]]ed by the gate that let it through.

**Law — [[law]]: only a gate-green tree may collapse into reality — deployment is ordered (gate → migrate → build → push) and shipping an unverified tree forges reality, so the gate is the precondition of the release. The release is finality one way: the live world is never mutated in place; recovery is re-collapsing a prior immutable snapshot, so every running state is one a gate once let through.**

**Existence proof:** erpax deployed serverless on Cloudflare IS the proof — `proveServerlessQuantum()` ([[quantum/serverless]]) derives sealed diamonds from live `wrangler.jsonc` bindings ⊕ [[quantum]] laws.

@see [[deploy]] · [[reality]] · [[gate]] · [[migrate]] · [[bindings]] · snapshot · finality · [[payload]] · worker · [[quantum/serverless]] · [[cloudflare]]

<sub>content-uuid `fd2fea2c-d3e7-54a7-8c63-1d1b7e1c839a` · account `quantum/deploy` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
