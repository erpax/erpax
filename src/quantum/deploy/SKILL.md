---
name: deploy
description: "Use when shipping erpax to the edge — deployment is the collapse of the codebase into live reality (the model becomes real on main); gate-pass then build a content-addressed artifact, migrate D1, push the Worker, a release is finality one-way with rollback to a prior snapshot."
atomPath: "quantum/deploy"
coordinate: "quantum/deploy · 8/crest · a7f7985e"
contentUuid: "2c38c5b3-d782-51c3-a852-a1ca6f0cbd82"
diamondUuid: "1f450274-17db-8bb5-9e36-42109f4d965d"
uuid: "a7f7985e-5165-8618-b512-d8daa3a3e3cd"
horo: 8
typography:
  partition: quantum
  bondDegree: 99
standards: []
bindings: []
signatures:
  computationUuid: "30f97f92-1bef-8942-ac97-3a2a61bb68ee"
  stages:
    - stage: path
      stageUuid: "f71dbc48-d27e-84cb-a6c1-3cc9514088f7"
    - stage: trinity
      stageUuid: "c079e592-82f2-83c5-b2d6-15ca01978428"
    - stage: boundary
      stageUuid: "c4a2da00-8237-8d9e-a2c2-e73596a8d7d8"
    - stage: links
      stageUuid: "991636b0-04eb-8002-98fc-ff5c67b7c419"
    - stage: horo
      stageUuid: "890c3613-44dd-8238-aee3-4e042c5a6e0e"
    - stage: seal
      stageUuid: "dc12700c-1968-87c8-b7e5-0b79a8241c8c"
    - stage: uuid
      stageUuid: "abc8e669-5359-8e24-a3b6-7634662ec678"
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
    computationUuid: "30f97f92-1bef-8942-ac97-3a2a61bb68ee"
    contentUuid: "2c38c5b3-d782-51c3-a852-a1ca6f0cbd82"
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

<sub>content-uuid `2c38c5b3-d782-51c3-a852-a1ca6f0cbd82` · account `quantum/deploy` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
