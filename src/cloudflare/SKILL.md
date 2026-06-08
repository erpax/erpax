---
name: cloudflare
description: Use when touching Cloudflare — Workers AI first-class, uuid-sealed credentials, binding diamonds for every Wrangler section, path-merge on the 7th surface, mediated binding access fail-closed.
---

# cloudflare — mediated edge, every binding a diamond (AI-first)

Cloudflare **merges with erpax at every quantum binding**. Workers AI (`ai` binding `AI`), vectorize RAG (`VECTORIZE_DOCS`), and the inference stack are **first-class diamonds** — see [[cloudflare/ai]].

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
| Path | toAtomPath | 7th surface `cloudflare` — `ai://`, `r2://`, `d1://` |
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

Matter-twin: `index.ts` · `ai.ts` · `bindings.ts` · `wrangler.ts` · `seal.ts` · `ai/`.

**Law — [[law]]: Cloudflare Workers AI bindings are sealed diamonds wired at every scale; test-first ([[innovation]]).**

@see [[cloudflare/ai]] · [[diamond]] · [[path]] · [[secret]] · [[agent]] · [[innovation]] · [[confirm]]
