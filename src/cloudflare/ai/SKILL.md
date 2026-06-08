---
name: ai
description: "Use when touching Cloudflare Workers AI — the `ai` wrangler binding, vectorize RAG index, AI gateway vars, and uuid-sealed API keys. Every AI binding derives a DiamondModel on the worker face serving [[agent]] atoms."
atomPath: cloudflare/ai
coordinate: cloudflare/ai · 2/share · d2f4926f
contentUuid: "2493a1fe-d02a-5a73-b70c-e287224023b8"
diamondUuid: "6aa5a1fb-aea8-8350-b7c8-12ef04f67d69"
uuid: "d2f4926f-cbee-844d-ab25-b8c23f854b7b"
horo: 2
bonds:
  in:
    - bindings
    - cloudflare
    - identity
    - industry
    - law
    - models
  out:
    - bindings
    - identity
    - industry
    - law
    - models
typography:
  partition: cloudflare
  bondDegree: 31
  neighbors:
    - agent
    - cloudflare
    - diamond
    - secret
standards: []
bindings:
  - ai/AI
  - analytics_engine_datasets/ANALYTICS_AI
  - durable_objects/AUDIT_CHAIN_DO
  - kv_namespaces/AI_CACHE
  - queues/QUEUE_AI_BATCH
  - queues/QUEUE_EMAIL_OUT
  - ratelimit/RATE_LIMITER_AI
  - send_email/EMAIL_SENDER
  - vectorize/VECTORIZE_DOCS
neighbors:
  wikilink:
    - agent
    - cloudflare
    - diamond
    - innovation
    - law
    - path
    - payload
    - secret
  matrix:
    - bindings
    - identity
    - industry
    - law
    - models
  backlinks:
    - bindings
    - identity
    - industry
    - law
    - models
signatures:
  computationUuid: "fc36701b-55d5-802b-9655-750af754f419"
  stages:
    - stage: path
      stageUuid: "f52b7600-5340-89b9-b22c-2a6ff9c5456b"
    - stage: trinity
      stageUuid: "cc9d45cf-142c-890b-892a-bf2a801f6b42"
    - stage: boundary
      stageUuid: "d544386c-21c0-888d-b3a9-59c353d3a0e0"
    - stage: links
      stageUuid: "a433a134-c2b7-8f5b-93cb-ab3e9a01501c"
    - stage: horo
      stageUuid: "cf63d0d0-564d-848c-bb85-9ab2a62d8d8e"
    - stage: seal
      stageUuid: "3f6c39ad-4e71-8421-81f0-06157ac79fc8"
    - stage: uuid
      stageUuid: "1bfc54d0-3a6a-898b-94ff-de75dc19698b"
version: 2
---
# ai — Cloudflare Workers AI bindings as diamonds

Workers AI is a **first-class binding diamond**, not a sidecar. Wrangler declares `{ "ai": { "binding": "AI" } }`; vectorize (`VECTORIZE_DOCS`), `AI_CACHE` KV, `QUEUE_AI_BATCH`, and `ANALYTICS_AI` form the RAG stack. Each entry parses to `aiBindingDiamond` → `DiamondModel` with `cloudflare` facet (modelId, rag, workerFace).

- **Path** — `ai://agent/research` merges with `src/agent/research` via `toAtomPath(…, 'cloudflare')`
- **Secret** — `sealCloudflareAiSecret` / `decryptCloudflareAiSecretIfUuid` ([[secret]] `decryptIfUuid`)
- **Agent** — `agentAiWorkerFace` marks CF AI as the worker deployment face for angels
- **confirm:uuid** — `gateCloudflareAi` verifies AI-stack diamonds without [[payload]]
- **README** — debit `[[asset]]/[[cloudflare]]/ai/bindings` posts one per live wrangler AI binding

**Law — [[law]]: every Cloudflare Workers AI binding has a sealed diamond; innovation ships test-first ([[innovation]]).**

@see [[cloudflare]] · [[agent]] · [[secret]] · [[diamond]] · [[path]] · [[innovation]]
