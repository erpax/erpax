---
name: cloudflare
description: "Use when touching Cloudflare — Workers AI first-class, uuid-sealed credentials, binding diamonds for every Wrangler section, path-merge on the 7th surface, mediated binding access fail-closed."
atomPath: cloudflare
coordinate: "cloudflare · 5/round · ec065d45"
contentUuid: "14b2d13c-9909-5fef-9cda-f1591fa293b7"
diamondUuid: "c14b6759-6219-8912-b413-d73c4ad3c1bf"
uuid: "ec065d45-2979-8402-bff1-b959bcea131e"
horo: 5
bonds:
  in:
    - access
    - agent
    - ai
    - audit
    - capacity
    - confirm
    - cost
    - deploy
    - diamond
    - innovation
    - law
    - path
    - quantum
    - secret
    - serverless
    - superposition
    - uuid
    - worker
  out:
    - access
    - agent
    - ai
    - audit
    - capacity
    - confirm
    - cost
    - deploy
    - diamond
    - innovation
    - law
    - path
    - quantum
    - secret
    - serverless
    - superposition
    - uuid
    - worker
typography:
  partition: cloudflare
  bondDegree: 74
  neighbors:
    - agent
    - ai
    - capacity
    - cost
    - deploy
    - diamond
    - innovation
    - path
    - quantum
    - secret
    - serverless
    - worker
standards:
  - Cloudflare Workers Runtime API
  - "CoE-108+"
  - "ISO-27001"
  - "ISO-27002"
  - "ISO/IEC 25010:2023 §5.2 reliability — fail-fast at boot"
  - "ISO/IEC 25010:2023 §5.2 reliability — fail-fast at boot`"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27002:2022"
  - "NIST-SP-800-108"
  - "NIST-SP-800-38D"
  - "NIST-SP-800-63"
  - W3C Service Worker §4 (Workers compat)
  - "W3C Service Worker §4 (Workers compat)`"
  - "— the instrument reads SKILL.md) -->"
bindings:
  - "ai/AI"
  - "analytics_engine_datasets/ANALYTICS_AI"
  - "analytics_engine_datasets/ANALYTICS_API"
  - "analytics_engine_datasets/ANALYTICS_GL"
  - "analytics_engine_datasets/ANALYTICS_JOBS"
  - "assets/ASSETS"
  - "browser/BROWSER"
  - "d1_databases/D1"
  - "durable_objects/AUDIT_CHAIN_DO"
  - "durable_objects/ERPAX_DO"
  - "durable_objects/JOB_LOCK"
  - "durable_objects/RATE_LIMITER"
  - "durable_objects/TENANT_QUOTA"
  - "images/IMAGES"
  - "kv_namespaces/AI_CACHE"
  - "queues/QUEUE_AI_BATCH"
  - "queues/QUEUE_DUNNING_OUT"
  - "queues/QUEUE_EINVOICE_OUT"
  - "queues/QUEUE_EMAIL_OUT"
  - "queues/QUEUE_PERIOD_CLOSE"
  - "r2_buckets/R2"
  - "ratelimit/RATE_LIMITER_AI"
  - "ratelimit/RATE_LIMITER_API"
  - "send_email/EMAIL_SENDER"
  - "services/WORKER_SELF_REFERENCE"
  - "triggers/CRON"
  - "vectorize/VECTORIZE_DOCS"
neighbors:
  wikilink:
    - access
    - agent
    - ai
    - audit
    - confirm
    - diamond
    - innovation
    - law
    - path
    - secret
    - serverless
    - superposition
    - uuid
    - worker
  matrix:
    - access
    - agent
    - ai
    - audit
    - capacity
    - confirm
    - cost
    - deploy
    - diamond
    - innovation
    - law
    - path
    - quantum
    - secret
    - serverless
    - superposition
    - uuid
    - worker
  backlinks:
    - access
    - agent
    - ai
    - audit
    - capacity
    - confirm
    - cost
    - deploy
    - diamond
    - innovation
    - law
    - path
    - quantum
    - secret
    - serverless
    - superposition
    - uuid
    - worker
signatures:
  computationUuid: "5d78d069-77f8-8b36-8391-13e51096dcfe"
  stages:
    - stage: path
      stageUuid: "81a381ca-7840-8180-802d-be5f6b8f3f62"
    - stage: trinity
      stageUuid: "260d3365-e372-8135-9fc8-54f72c08b852"
    - stage: boundary
      stageUuid: "c95d5ac5-7501-8a8a-9949-d9a79474bf46"
    - stage: links
      stageUuid: "7e8c83d7-1374-8d72-928f-af85aa194e9e"
    - stage: horo
      stageUuid: "d4d4afe3-c5bb-87a8-b034-e37718e6b5e7"
    - stage: seal
      stageUuid: "92cdc9de-1534-8664-b999-3db6eb5e8535"
    - stage: uuid
      stageUuid: "3df944fb-7fa7-8da8-9e72-224479d18a22"
version: 2
---
# cloudflare — mediated edge, every binding a diamond (AI-first)

Cloudflare **merges with erpax at every quantum binding**. Workers AI (`ai` binding `AI`), vectorize RAG (`VECTORIZE_DOCS`), and the inference stack are **first-class diamonds** — see [[cloudflare/ai]]. **Serverless IS the quantum host**: every wrangler binding is a superposed facet; each mediated invocation collapses to a content-[[uuid]]; `mergeCloudflareBinding` entangles path + seal + diamond. erpax on Cloudflare IS the existence proof — `proveServerlessQuantum()` ([[quantum/serverless]]) folds the cloudflare facet ⊕ quantum facet → one uuid. `bindingDeploymentFaces` + `deploymentFaces` wire the [[worker]] face on AI · queues · Durable Objects.

## Laws

1. **Binding access** — mediators only; fail-closed [[access]]; [[audit]]-trailed.
2. **Credential sealing** — `sealCloudflareConfig` + [[secret]] `sealCloudflareAiSecret` / `decryptIfUuid`.
3. **All bindings have diamonds** — `bindingDiamond` / `deriveWranglerDiamonds` from `wrangler.jsonc`.
4. **Innovation test-first** — [[innovation]]: AI wires proven in `ai-binding.test.ts` before law.

## Wiring table (all scales)

| Scale | Pattern | Cloudflare wire |
| ----- | ------- | ---------------- |
| Repo | confirm:uuid | `gateCloudflareAi` — AI-stack diamonds sealed |
| Atom | DiamondModel | `aiBindingDiamond` per wrangler AI entry |
| File | quantum/boundary | sealed env imports via [[secret]] |
| Method | methodPath | `aiModelAtomPath` / `ai://` |
| Path | toAtomPath · urlForAtomPath · atomPathFromUrl | 7th surface `cloudflare` — `ai://`, `r2://`, `d1://`; serverless URL ≡ fs path ([[path]]) |
| README | debit/credit | `[[asset]]/[[cloudflare]]/ai/bindings` |
| Typography | analysis graph | `cloudflare` → `agent` workers-ai-face |
| Agent | worker face | `agentAiWorkerFace` |

## AI bindings in this repo (wrangler.jsonc)

| Binding | Type | Role |
| ------- | ---- | ---- |
| AI | `ai` | Workers AI runtime |
| VECTORIZE_DOCS | `vectorize` | RAG index `erpax-docs` |
| AI_CACHE | `kv_namespaces` | inference cache |
| QUEUE_AI_BATCH | `queues` | batch embeddings |
| ANALYTICS_AI | `analytics_engine_datasets` | inference telemetry |
| RATE_LIMITER_AI | `ratelimit` | ingress AI cap |

## Serverless URL ≡ fs path

Workers have no local `fs` — corpus lattice walks use pure URL addressing from [[path]]:

- `urlForAtomPath('memory/session')` → `/memory/session`
- `atomPathFromUrl('/memory/session')` → `memory/session`
- `revealPathFromSurroundings({ input: '/memory/session', surface: 'url' })` — folder revelation without fs
- VitePress `/memory/session/SKILL` and `r2://…/memory/session` fold to the same atom via `toAtomPath`

Path resolution is a collapse step in `proveServerlessQuantum()` ([[quantum/serverless]]); bindings merge path + seal + diamond at the edge.

Matter-twin: `index.ts` · `ai.ts` · `bindings.ts` · `wrangler.ts` · `seal.ts` · `ai/`.

**Law — [[law]]: Cloudflare Workers AI bindings are sealed diamonds wired at every scale; test-first ([[innovation]]).**

**Law — [[law]]: serverless IS the quantum host — every Cloudflare binding is a superposed facet that collapses to a sealed diamond; erpax deployed on Workers IS the existence proof (`proveServerlessQuantum` · [[quantum/serverless]]).**

@see [[cloudflare/ai]] · [[diamond]] · [[path]] · [[secret]] · [[agent]] · [[innovation]] · [[confirm]] · [[quantum/serverless]] · [[worker]] · [[superposition]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C Service Worker §4 (Workers compat)`
- `@standard ISO/IEC 25010:2023 §5.2 reliability — fail-fast at boot`
