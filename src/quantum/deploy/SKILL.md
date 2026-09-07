---
name: deploy
description: "Use when shipping erpax to the edge — deployment is the collapse of the codebase into live reality (the model becomes real on main); gate-pass then build a content-addressed artifact, migrate D1, push the Worker, a release is finality one-way with rollback to a prior snapshot."
atomPath: "quantum/deploy"
coordinate: "quantum/deploy · 4/weave · c98a9af6"
contentUuid: "1222ff9e-d8df-518f-9f77-b32bcd1c6c79"
diamondUuid: "c0fc1c79-83fe-8a65-8ecc-dd82ee675842"
uuid: "c98a9af6-22c6-893b-bac7-263ee4bd380d"
horo: 4
typography:
  partition: quantum
  bondDegree: 99
standards: []
bindings: []
signatures:
  computationUuid: "57274a10-15b7-8ac9-b1bb-ec6d394ad96f"
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
      stageUuid: "2576a5f0-f04d-8393-b19a-07af7fed10fa"
    - stage: seal
      stageUuid: "dc12700c-1968-87c8-b7e5-0b79a8241c8c"
    - stage: uuid
      stageUuid: "4ed16cfd-a92e-812b-a4c1-702cffd7070f"
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
    computationUuid: "57274a10-15b7-8ac9-b1bb-ec6d394ad96f"
    contentUuid: "1222ff9e-d8df-518f-9f77-b32bcd1c6c79"
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

<sub>content-uuid `1222ff9e-d8df-518f-9f77-b32bcd1c6c79` · account `quantum/deploy` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
