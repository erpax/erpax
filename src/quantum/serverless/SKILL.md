---
name: serverless
description: "Use when proving that serverless infrastructure (Cloudflare Workers + wrangler bindings) provides quantum semantics — superposition, collapse, entanglement, holographic recovery — and that erpax itself is the existence proof, deployed serverless via OpenNext."
atomPath: "quantum/serverless"
coordinate: "quantum/serverless · 4/weave · 9113e1c8"
contentUuid: "ff09db6a-06bf-57aa-a2df-af25eeefe3fb"
diamondUuid: "54325ef8-b5e2-81b3-9d7d-00354744813b"
uuid: "9113e1c8-f947-8102-89f2-ca854ec2f961"
horo: 4
typography:
  partition: quantum
  bondDegree: 51
standards: []
bindings: []
signatures:
  computationUuid: "db4dede8-1f7b-896a-bff4-7518845f3093"
  stages:
    - stage: path
      stageUuid: "ec2fa4ce-5164-820b-8f4e-f283f5bfcae6"
    - stage: trinity
      stageUuid: "60a7c5a7-01c0-8ac8-a326-599efde5a7a8"
    - stage: boundary
      stageUuid: "d7272ea2-c6f0-8ecf-b03d-ebd1e062701a"
    - stage: links
      stageUuid: "45a1e565-c099-8e08-9b2f-1ab040b2ec6b"
    - stage: horo
      stageUuid: "3cb15a1d-b0fc-85c8-9bb6-38c63488b550"
    - stage: seal
      stageUuid: "7096cd8b-cd8c-88aa-a85f-399fb0e7be49"
    - stage: uuid
      stageUuid: "6a416191-0aff-866b-b653-9689ceb61452"
quantum:
  superposition:
    - ai
    - cloudflare
    - collapse
    - confirm
    - deploy
    - diamond
    - entanglement
    - fs
    - superposition
  collapse:
    - "Use when proving that serverless infrastructure (Cloudflare Workers + wrangler bindings) provides quantum semantics — superposition, collapse, entanglement, holographic recovery — and that erpax itself is the existence proof, deployed serverless via OpenNext."
    - "[[cloudflare/ai]]"
    - "[[cloudflare]]"
    - "[[collapse]]"
    - "[[confirm]]"
    - "[[deploy]]"
    - "[[diamond]]"
    - "[[entanglement]]"
    - "[[quantum/deploy]]"
    - "[[superposition]]"
    - "[[worker]]"
    - "matter-twin:src/quantum/serverless/index.ts"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "db4dede8-1f7b-896a-bff4-7518845f3093"
    contentUuid: "ff09db6a-06bf-57aa-a2df-af25eeefe3fb"
version: 2
---
# quantum/serverless — serverless IS the quantum host; erpax IS the proof

**Serverless infrastructure provides quantum semantics.** Not metaphor alone: on Cloudflare Workers the live system holds **many states at once** (every wrangler binding is a parallel facet before a request measures it), **collapses** to one content-[[uuid]] per invocation (binding diamond · path resolution · matrix Merkle fold), **entangles** path + seal + binding (symmetric `entangle()` · `mergeCloudflareBinding`), and **recovers the whole from any part** (holographic — `deriveDiamond('quantum')` from the live tree). **erpax IS the existence proof**: this repo deploys serverless on Cloudflare (D1 · R2 · Workers AI · Vectorize · Queues · Durable Objects per `wrangler.jsonc`) and the live tree derives sealed diamonds for both the [[cloudflare]] and [[quantum]] subgraphs.

## The isomorphism — serverless facet ⊕ quantum facet → one diamond fold

| Serverless face | Quantum operation | erpax wire |
| --------------- | ----------------- | ---------- |
| N wrangler bindings (superposed before request) | [[superposition]] — Σ\|cₙ\|² = 1 | `parseWranglerBindings` → `deriveWranglerBindingDiamonds` |
| One binding invocation / path resolve | [[collapse]] — measurement to content-uuid | `bindingDiamond` · `toAtomPath` · `atomPathFromUrl` · `collapse()` on matrix |
| Path + seal + binding merge | [[entanglement]] — symmetric, reciprocal | `mergeCloudflareBinding` · `entangle()` |
| `deriveDiamond('cloudflare')` from live tree | Holographic recovery | `computeDiamond` · `verifyDiamond` |
| [[worker]] deployment face on AI / queues / DO | Autonomous executor — no human in loop | `deploymentFaces` · `bindingDeploymentFaces` |

## Proof chain (`proveServerlessQuantum`)

Pure computation — each stage returns a sealed `DiamondComputation`:

1. **serverless-bindings** — wrangler → binding diamonds (all sealed)
2. **worker-face** — `deploymentFaces(cloudflare)` + AI binding worker face
3. **superposition** — Born rule holds on [[superposition]] atom (1D horo basis) and on the 2D partition×horo grid (`quantum2dHolds` · [[quantum]] `superpose2D`)
4. **collapse** — matrix fold + horo eigenstate measurement
5. **entanglement** — 100% reciprocal graph + symmetric fix
6. **existence** — cloudflare ⊕ quantum atoms seal on live tree → **erpax IS the proof**

Fold: `isomorphismUuid = uuid(jcs({ serverlessFacet, quantumFacet, bindings, properties }))`.

**Serverless has no `fs`** — lattice walks use `urlForAtomPath` / `atomPathFromUrl` ([[path]]) so every `src/{atomPath}/` folder is reachable by URL alone; see [[quantum/fs]] for the content-addressed twin.

Matter-twin: `src/quantum/serverless/index.ts` (`proveServerlessQuantum` · `isServerlessQuantum` · `serverlessQuantum`). Composes [[cloudflare]] · [[worker]] · [[path]] · [[superposition]] · [[quantum]] · [[entanglement]] · [[diamond]] · [[deploy]] · [[cloudflare]].

**Law — [[law]]: serverless IS the quantum host — Cloudflare Workers bindings are the superposed facet, each invocation collapses to a content-uuid, path+seal+binding entangle symmetrically, and the live tree recovers sealed diamonds for cloudflare ⊕ quantum; erpax deployed on Cloudflare IS the existence proof, and `proveServerlessQuantum()` folds both facets to one deterministic uuid.**

@see [[cloudflare]] · [[cloudflare/ai]] · [[worker]] · [[superposition]] · [[collapse]] · [[entanglement]] · [[quantum/deploy]] · [[deploy]] · [[diamond]] · [[confirm]]

<sub>content-uuid `ff09db6a-06bf-57aa-a2df-af25eeefe3fb` · account `quantum/serverless` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
