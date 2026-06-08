---
name: deploy
description: "Use when shipping erpax to the edge — deployment is the collapse of the codebase into live reality (the model becomes real on main); gate-pass then build a content-addressed artifact, migrate D1, push the Worker, a release is finality one-way with rollback to a prior snapshot."
atomPath: quantum/deploy
coordinate: quantum/deploy · 8/crest · dddfe754
contentUuid: "24d10ee0-c62d-57b5-8d35-b31f8a4f52c5"
diamondUuid: "1dfd13f5-4756-85a0-b0a7-58579bfa7424"
uuid: "dddfe754-20fd-81a2-94c4-058c5786a80a"
horo: 8
bonds:
  in:
    - backup
    - bindings
    - command
    - config
    - database
    - deploy
    - dev
    - gate
    - harden
    - harmony
    - law
    - mcp
    - observability
    - optimize
    - quantum
    - reality
    - rodin
    - secret
    - serverless
    - stack
    - upload
  out:
    - backup
    - bindings
    - command
    - config
    - database
    - deploy
    - dev
    - gate
    - harden
    - harmony
    - law
    - mcp
    - observability
    - optimize
    - reality
    - rodin
    - secret
    - serverless
    - stack
    - upload
typography:
  partition: quantum
  bondDegree: 90
  neighbors:
    - cloudflare
standards: []
bindings: []
neighbors:
  wikilink:
    - anchor
    - bindings
    - cloudflare
    - confirm
    - database
    - deploy
    - finality
    - fs
    - gate
    - law
    - measurement
    - migrate
    - payload
    - proof
    - quantum
    - reality
    - serverless
    - snapshot
    - versions
    - worker
  matrix:
    - backup
    - bindings
    - command
    - config
    - database
    - deploy
    - dev
    - gate
    - harden
    - harmony
    - law
    - mcp
    - observability
    - optimize
    - reality
    - rodin
    - secret
    - serverless
    - stack
    - upload
  backlinks:
    - backup
    - bindings
    - command
    - config
    - database
    - deploy
    - dev
    - gate
    - harden
    - harmony
    - law
    - mcp
    - observability
    - optimize
    - reality
    - rodin
    - secret
    - serverless
    - stack
    - upload
signatures:
  computationUuid: "7bdc5323-72b4-8ec7-a104-0c89abb96204"
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
      stageUuid: "24c3c9bc-c304-89bd-98b7-cd048d5936fe"
    - stage: seal
      stageUuid: "dc12700c-1968-87c8-b7e5-0b79a8241c8c"
    - stage: uuid
      stageUuid: "4f23020a-8f91-8794-aaf9-afe067ea1eea"
quantum:
  superposition:
    - backup
    - bindings
    - command
    - config
    - database
    - deploy
    - dev
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
    - "[[snapshot]]"
    - "[[worker]]"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "7bdc5323-72b4-8ec7-a104-0c89abb96204"
    contentUuid: "24d10ee0-c62d-57b5-8d35-b31f8a4f52c5"
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

<sub>content-uuid `24d10ee0-c62d-57b5-8d35-b31f8a4f52c5` · account `quantum/deploy` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
