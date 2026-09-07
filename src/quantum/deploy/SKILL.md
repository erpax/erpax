---
name: deploy
description: "Use when shipping erpax to the edge — deployment is the collapse of the codebase into live reality (the model becomes real on main); gate-pass then build a content-addressed artifact, migrate D1, push the Worker, a release is finality one-way with rollback to a prior snapshot."
atomPath: "quantum/deploy"
coordinate: "quantum/deploy · 4/weave · 79917696"
contentUuid: "d0fc2424-de7e-53ec-8dfd-d96cce9e3272"
diamondUuid: "f8b73d0a-384a-8978-a3f5-15b981920ba1"
uuid: "79917696-2e81-838c-9891-478b576e99eb"
horo: 4
typography:
  partition: quantum
  bondDegree: 99
standards: []
bindings: []
signatures:
  computationUuid: "1f821d71-f37c-85e6-942f-2ac64dae8159"
  stages:
    - stage: path
      stageUuid: "f71dbc48-d27e-84cb-a6c1-3cc9514088f7"
    - stage: trinity
      stageUuid: "c079e592-82f2-83c5-b2d6-15ca01978428"
    - stage: boundary
      stageUuid: "c4a2da00-8237-8d9e-a2c2-e73596a8d7d8"
    - stage: links
      stageUuid: "6a55b057-52a3-8b78-8c64-e3d805308c96"
    - stage: horo
      stageUuid: "7b077f85-e923-8d64-a506-86aa4923d5ba"
    - stage: seal
      stageUuid: "dc12700c-1968-87c8-b7e5-0b79a8241c8c"
    - stage: uuid
      stageUuid: "455c20ff-4483-8bd9-9d40-e425dba645d6"
quantum:
  superposition:
    - backup
    - bindings
    - command
    - config
    - database
    - deploy
    - dev
    - fold
    - superposition
  collapse:
    - "Use when shipping erpax to the edge — deployment is the collapse of the codebase into live reality (the model becomes real on main); gate-pass then build a content-addressed artifact, migrate D1, push the Worker, a release is finality one-way with rollback to a prior snapshot."
    - "[[bindings]]"
    - "[[cloudflare]]"
    - "[[deploy]]"
    - "[[finality]]"
    - "[[gate]]"
    - "[[migrate]]"
    - "[[payload]]"
    - "[[quantum/serverless]]"
    - "[[reality]]"
    - "[[snapshot]]"
    - "[[worker]]"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "1f821d71-f37c-85e6-942f-2ac64dae8159"
    contentUuid: "d0fc2424-de7e-53ec-8dfd-d96cce9e3272"
version: 2
---
# quantum/deploy — the collapse into reality

The quantum twin of [[deploy]]: deployment is the **collapse of the codebase into live [[reality]]** — the model becomes real. erpax is Next.js on Cloudflare [[worker]]s via OpenNext — pure compute + [[bindings]] (D1 · R2 · AI · Vectorize · Queues · Durable Objects), no native, no fs, no camera at the edge.

## The collapse, in order

1. **[[gate]] first** — only a gate-green tree may collapse ([[confirm]] · [[proof]]). Shipping un-verified is forging reality.
2. **[[migrate]] the [[database]]** — `payload migrate` against remote D1 (never dev-push in prod); the schema is generated, migrations committed.
3. **build the artifact** — `opennextjs-cloudflare build`: a content-addressed [[snapshot]] (the [[quantum/fs]] law — immutable, deduped), the matter ([[payload]]) compiled for the Worker.
4. **push** — `opennextjs-cloudflare deploy`. The release is [[finality]] one way; rollback is the *reverse* — re-collapse a prior [[versions]] snapshot, never mutate the live one.

A deploy is a [[measurement]]: the superposed branch becomes the one running world, [[anchor]]ed by the gate that let it through.

**Law — [[law]]: only a gate-green tree may collapse into reality — deployment is ordered (gate → migrate → build → push) and shipping an unverified tree forges reality, so the gate is the precondition of the release. The release is finality one way: the live world is never mutated in place; recovery is re-collapsing a prior immutable [[snapshot]], so every running state is one a gate once let through.**

**Existence proof:** erpax deployed serverless on Cloudflare IS the proof — `proveServerlessQuantum()` ([[quantum/serverless]]) derives sealed diamonds from live `wrangler.jsonc` bindings ⊕ [[quantum]] laws.

@see [[deploy]] · [[reality]] · [[gate]] · [[migrate]] · [[bindings]] · [[snapshot]] · [[finality]] · [[payload]] · [[worker]] · [[quantum/serverless]] · [[cloudflare]]

<sub>content-uuid `d0fc2424-de7e-53ec-8dfd-d96cce9e3272` · account `quantum/deploy` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
