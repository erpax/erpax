---
name: ai
description: "Use when touching Cloudflare Workers AI — the `ai` wrangler binding, vectorize RAG index, AI gateway vars, and uuid-sealed API keys. Every AI binding derives a DiamondModel on the worker face serving agent atoms."
atomPath: "cloudflare/ai"
coordinate: "cloudflare/ai · 1/base · 81012de3"
contentUuid: "93db14de-9120-5822-befe-98ccc9e8ddb2"
diamondUuid: "029af200-dfbb-8f76-8a29-340b35232f4a"
uuid: "81012de3-fee5-8128-ab3e-16e5bc3d41c8"
horo: 1
typography:
  partition: cloudflare
  bondDegree: 36
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
  computationUuid: "2f39b967-2bcb-8759-88f0-02305f911bc6"
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
      stageUuid: "15e29e8f-5c1d-8038-bdec-ccda239d7d3d"
    - stage: seal
      stageUuid: "b474c803-f39f-811e-abeb-2ba164275e05"
    - stage: uuid
      stageUuid: "fa49f569-7da3-82a1-91ca-5188c93c1da6"
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
