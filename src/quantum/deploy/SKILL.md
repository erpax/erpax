---
name: deploy
description: "Use when shipping erpax to the edge — deployment is the collapse of the codebase into live reality (the model becomes real on main); gate-pass then build a content-addressed artifact, migrate D1, push the Worker, a release is finality one-way with rollback to a prior snapshot."
atomPath: "quantum/deploy"
coordinate: "quantum/deploy · 7/descent · 1a5b1061"
contentUuid: "3d5b0405-3340-53bf-a491-e35ffa45e34a"
diamondUuid: "8127f728-c58f-8e09-b223-d9546dc87b8e"
uuid: "1a5b1061-8a9a-8bd8-a442-c543d7a63670"
horo: 7
typography:
  partition: quantum
  bondDegree: 91
standards: []
bindings: []
signatures:
  computationUuid: "cbf29443-7e91-85f9-8209-882ce564bdb7"
  stages:
    - stage: path
      stageUuid: "f71dbc48-d27e-84cb-a6c1-3cc9514088f7"
    - stage: trinity
      stageUuid: "c079e592-82f2-83c5-b2d6-15ca01978428"
    - stage: boundary
      stageUuid: "ad2908d5-a405-8276-9a33-ea646fbb96c0"
    - stage: links
      stageUuid: "7e179010-b42d-8e72-ab61-6f85b9dbbb90"
    - stage: horo
      stageUuid: "18f93a13-7a7f-8fc2-a6b2-171cc26df047"
    - stage: seal
      stageUuid: "dc12700c-1968-87c8-b7e5-0b79a8241c8c"
    - stage: uuid
      stageUuid: "dd163ef0-0630-8a9c-a05a-6dfe83fedeff"
quantum:
  superposition:
    - backup
    - bindings
    - config
    - database
    - deploy
    - dev
    - fold
    - gate
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
    - "[[worker]]"
    - "only a gate-green tree may collapse into reality — deployment is ordered (gate → migrate → build → push) and shipping an unverified tree forges reality, so the gate is the precondition of the release. The release is finality one way: the live world is never mutated in place; recovery is re-collapsing a prior immutable snapshot, so every running state is one a gate once let through."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "cbf29443-7e91-85f9-8209-882ce564bdb7"
    contentUuid: "3d5b0405-3340-53bf-a491-e35ffa45e34a"
version: 2
---
# quantum/deploy — the collapse into reality

The quantum twin of [[deploy]]: deployment is the **collapse of the codebase into live [[reality]]** — the model becomes real. erpax is Next.js on Cloudflare [[worker]]s via OpenNext — pure compute + [[bindings]] (D1 · R2 · AI · Vectorize · Queues · Durable Objects), no native, no fs, no camera at the edge.

## The collapse, in order

1. **[[gate]] first** — only a gate-green tree may collapse ([[confirm]] · [[proof]]). Shipping un-verified is forging reality.
2. **[[migrate]] the [[database]]** — `payload migrate` against remote D1 (never dev-push in prod); the schema is generated, migrations committed.
3. **build the artifact** — `opennextjs-cloudflare build`: a content-addressed snapshot (the [[quantum/fs]] law — immutable, deduped), the matter ([[payload]]) compiled for the Worker.
4. **push** — `opennextjs-cloudflare deploy`. The release is [[finality]] one way; rollback is the *reverse* — re-collapse a prior [[versions]] snapshot, never mutate the live one.

A deploy is a [[measurement]]: the superposed branch becomes the one running world, [[anchor]]ed by the gate that let it through.

**Law — [[law]]: only a gate-green tree may collapse into reality — deployment is ordered (gate → migrate → build → push) and shipping an unverified tree forges reality, so the gate is the precondition of the release. The release is finality one way: the live world is never mutated in place; recovery is re-collapsing a prior immutable snapshot, so every running state is one a gate once let through.**

**Existence proof:** erpax deployed serverless on Cloudflare IS the proof — `proveServerlessQuantum()` ([[quantum/serverless]]) derives sealed diamonds from live `wrangler.jsonc` bindings ⊕ [[quantum]] laws.

@see [[deploy]] · [[reality]] · [[gate]] · [[migrate]] · [[bindings]] · snapshot · [[finality]] · [[payload]] · [[worker]] · [[quantum/serverless]] · [[cloudflare]]

<sub>content-uuid `3d5b0405-3340-53bf-a491-e35ffa45e34a` · account `quantum/deploy` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
