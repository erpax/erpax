---
name: ai
description: "Use when touching Cloudflare Workers AI — the `ai` wrangler binding, vectorize RAG index, AI gateway vars, and uuid-sealed API keys. Every AI binding derives a DiamondModel on the worker face serving [[agent]] atoms."
atomPath: "cloudflare/ai"
coordinate: "cloudflare/ai · 4/weave · 180fdded"
contentUuid: "1c438ea8-1d87-5631-8454-99e670defdf8"
diamondUuid: "a3075b20-318c-8207-a912-1f022c9d004d"
uuid: "180fdded-f9ee-830c-bb74-ab8c55ef52b7"
horo: 4
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
  - "ai/AI"
  - "analytics_engine_datasets/ANALYTICS_AI"
  - "durable_objects/AUDIT_CHAIN_DO"
  - "kv_namespaces/AI_CACHE"
  - "queues/QUEUE_AI_BATCH"
  - "queues/QUEUE_EMAIL_OUT"
  - "ratelimit/RATE_LIMITER_AI"
  - "send_email/EMAIL_SENDER"
  - "vectorize/VECTORIZE_DOCS"
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
  computationUuid: "4d0f5f75-f343-8cca-9304-23dec8b6f13c"
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
      stageUuid: "ab95be0e-dee2-8763-939b-60673eba6ca5"
    - stage: seal
      stageUuid: "b474c803-f39f-811e-abeb-2ba164275e05"
    - stage: uuid
      stageUuid: "75894516-1de1-8209-ae0d-02b43fdd42c0"
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
