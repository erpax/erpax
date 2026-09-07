---
name: ai
description: "Use when touching Cloudflare Workers AI — the `ai` wrangler binding, vectorize RAG index, AI gateway vars, and uuid-sealed API keys. Every AI binding derives a DiamondModel on the worker face serving agent atoms."
atomPath: "cloudflare/ai"
coordinate: "cloudflare/ai · 2/share · 5b083770"
contentUuid: "8d546c04-af7c-570c-a21d-0ae0522c0193"
diamondUuid: "9fc513da-0f00-87e7-8cbe-403af92d89b9"
uuid: "5b083770-0f9b-8a88-96f8-0c0892c80552"
horo: 2
typography:
  partition: cloudflare
  bondDegree: 40
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
signatures:
  computationUuid: "ef4319a5-dbc6-852e-9a13-de0b93908b6f"
  stages:
    - stage: path
      stageUuid: "f52b7600-5340-89b9-b22c-2a6ff9c5456b"
    - stage: trinity
      stageUuid: "cc9d45cf-142c-890b-892a-bf2a801f6b42"
    - stage: boundary
      stageUuid: "d544386c-21c0-888d-b3a9-59c353d3a0e0"
    - stage: links
      stageUuid: "5a49d9c4-b501-809e-ad18-8f83176837ca"
    - stage: horo
      stageUuid: "68e28ff1-42cf-899c-be50-4141b234e091"
    - stage: seal
      stageUuid: "b474c803-f39f-811e-abeb-2ba164275e05"
    - stage: uuid
      stageUuid: "1ebee2ae-7b39-80a7-8663-9d7b53d8fde3"
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
