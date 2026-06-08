---
name: serverless
description: "Use when proving that serverless infrastructure (Cloudflare Workers + wrangler bindings) provides quantum semantics — superposition, collapse, entanglement, holographic recovery — and that erpax itself is the existence proof, deployed serverless via OpenNext."
atomPath: quantum/serverless
coordinate: quantum/serverless · 8/crest · c1a636be
contentUuid: "d3c22b42-3e76-5114-b765-274bcad8cd7c"
diamondUuid: "11ec7776-0f48-8a2d-bfe8-6bfeac75ad58"
uuid: "c1a636be-875c-8193-a5e5-036280b33a7d"
horo: 8
bonds:
  in:
    - ai
    - cloudflare
    - collapse
    - confirm
    - deploy
    - diamond
    - entanglement
    - fs
    - law
    - path
    - quantum
    - superposition
    - uuid
    - worker
  out:
    - ai
    - cloudflare
    - collapse
    - confirm
    - deploy
    - diamond
    - entanglement
    - fs
    - law
    - path
    - quantum
    - superposition
    - uuid
    - worker
typography:
  partition: quantum
  bondDegree: 51
  neighbors:
    - cloudflare
    - diamond
standards: []
bindings: []
neighbors:
  wikilink:
    - ai
    - cloudflare
    - collapse
    - confirm
    - deploy
    - diamond
    - entanglement
    - fs
    - law
    - path
    - quantum
    - superposition
    - uuid
    - worker
  matrix:
    - ai
    - cloudflare
    - collapse
    - confirm
    - deploy
    - diamond
    - entanglement
    - fs
    - law
    - path
    - quantum
    - superposition
    - uuid
    - worker
  backlinks:
    - ai
    - cloudflare
    - collapse
    - confirm
    - deploy
    - diamond
    - entanglement
    - fs
    - law
    - path
    - quantum
    - superposition
    - uuid
    - worker
signatures:
  computationUuid: "ea08776a-b63c-82e1-bf13-94a8d4354cbe"
  stages:
    - stage: path
      stageUuid: "ec2fa4ce-5164-820b-8f4e-f283f5bfcae6"
    - stage: trinity
      stageUuid: "60a7c5a7-01c0-8ac8-a326-599efde5a7a8"
    - stage: boundary
      stageUuid: "87c2ffde-c26e-8751-a81a-2d53a35593a4"
    - stage: links
      stageUuid: "45a1e565-c099-8e08-9b2f-1ab040b2ec6b"
    - stage: horo
      stageUuid: "0be7bc7c-ae5f-8fec-9d4b-127f272f8154"
    - stage: seal
      stageUuid: "7096cd8b-cd8c-88aa-a85f-399fb0e7be49"
    - stage: uuid
      stageUuid: "1bbde4ec-ae8a-832d-99bd-3e5a858388c3"
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
    computationUuid: "ea08776a-b63c-82e1-bf13-94a8d4354cbe"
    contentUuid: "d3c22b42-3e76-5114-b765-274bcad8cd7c"
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

<sub>content-uuid `d3c22b42-3e76-5114-b765-274bcad8cd7c` · account `quantum/serverless` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
