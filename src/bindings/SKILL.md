---
name: bindings
description: Use when wiring, debugging, or cost-tuning erpax's Cloudflare bindings — D1, R2, KV, Durable Objects, Queues, Workers AI, Vectorize, Analytics Engine, Browser, service self-reference, Hyperdrive, cron — or when a binding "works in config but fails at runtime" (e.g. "no such Durable Object class is exported from the worker"). The map of binding ↔ capability ↔ cost lever ↔ gap for the self-managed edge app.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# bindings — erpax fully self-managed on Cloudflare (every binding is a cost lever)

erpax runs as a self-managed edge app: each Cloudflare binding is a capability AND a cost/efficiency lever. Using them fully means pushing each workload to its cheapest-correct primitive, metering its own usage, and (with [[identity]]'s content-uuid) cloning itself. Composes with [[deploy]], [[config]], [[harden]], [[jobs]]; declared in `wrangler.jsonc`, consumed via `src/services/cloudflare/` + `@erpax/cloudflare` (see [[plugins]]).

## Where the knowledge lives (the map)
| Concern | File |
|---|---|
| binding declarations | `wrangler.jsonc` |
| Durable Object classes | `src/services/ai/durable-objects.ts` (all 5) |
| CF mediator / env access | `src/services/cloudflare/` (`plugin-helper.ts`, `index.ts`) |
| OpenNext worker entry | `open-next.config.ts` (`defineCloudflareConfig`) |
| publishable wrapper | `@erpax/cloudflare` (monorepo) |

## Binding inventory → capability → cost lever
| Binding | CF primitive | erpax capability | efficiency / cost lever |
|---|---|---|---|
| `D1` | D1 (SQLite) | relational store (Payload db adapter) | primary OLTP; keep hot reads off it |
| `R2` | R2 | content-addressed blobs | [[identity]] "dry storage" — dedup by content-uuid ⇒ no redundant storage cost |
| `AI_CACHE` | KV | hot edge reads (AI results, config, sessions) | absorb repeat reads ⇒ fewer D1/AI calls |
| `AI` / `VECTORIZE_DOCS` | Workers AI / Vectorize | agents/MCP, embeddings, per-tenant semantic search | inference at edge; cache via `AI_CACHE` |
| `QUEUE_*` (ai-batch, einvoice-out, dunning-out, period-close, email-out) | Queues | async fan-out for [[jobs]] / events | smooth spikes, batch ⇒ lower per-op cost |
| `ERPAX_DO`/`TENANT_QUOTA`/`RATE_LIMITER`/`JOB_LOCK`/`AUDIT_CHAIN_DO` | Durable Objects | tenant state, **quota metering**, rate-limit ([[harden]]), single-flight job locks, hash-chained audit | coordination without DB locks; `TENANT_QUOTA` = self-cost-management |
| `ANALYTICS_*` (ai/gl/api/jobs) | Analytics Engine | high-cardinality metrics | cheap write-heavy telemetry vs rows in D1 |
| `BROWSER` | Browser Rendering | PDF/screenshot render | on-demand, no separate service |
| `WORKER_SELF_REFERENCE` | service binding (self) | self-invocation → **self-clone** | seed a new instance, reconcile via content-uuid ([[identity]]) |
| `IMAGES`/`ASSETS` | Images / static | image transforms, static assets | edge-served, no origin cost |
| `HYPERDRIVE_*` / `CF_MTLS_*` | Hyperdrive / mTLS | external PG pool / qualified seals | declared but commented (future) |

## Crucial binding gaps (the chain-breaks)
- **DO classes not exported from the worker.** All 5 classes exist + are exported in `src/services/ai/durable-objects.ts`, but `main` is the OpenNext-generated `.open-next/worker.js`, which does not re-export them, so `workerd` warns "no such Durable Object class is exported from the worker" and the bindings fail at runtime. A DO must be a **named export of the `main` entry** — a side-effect `import '@/workers'` from the boot path canNOT add exports to the entry (that hand-rolled hack was removed). Fix the **conventional** way: per `@opennextjs/cloudflare` Durable-Objects docs, not a bespoke re-export file. This is what blocks quota metering (self-management) and `ErpaxStateDO` (self-cloning).
- **DO base class:** new runtime expects `class X extends DurableObject` (from `cloudflare:workers`); plain classes warn. Align when wiring exports.
- **Queue consumers:** producers are declared; confirm each `QUEUE_*` has a consumer handler or messages pile up.

## The self-management + self-clone loop (why "use all bindings")
`TenantQuotaCounter` (DO) meters per-tenant D1/R2/AI/Queue usage → erpax prices + caps itself per tenant. `ErpaxStateDO` + `WORKER_SELF_REFERENCE` let an instance spawn another; because data is content-addressed ([[identity]]), the clone reconciles to the origin as a set-union — no id remap. Standards (ISO/SOX/GDPR tenant-isolation + audit-trail, via `AUDIT_CHAIN_DO`) dictate which bindings MUST exist; the gaps above are where the standards aren't yet backed by a live binding.

## Common mistakes
- Declaring a DO binding in `wrangler.jsonc` but not re-exporting the class from the worker entry (the gap above).
- Reaching for D1 where KV (hot reads), R2 (blobs), Queues (async), or a DO (coordination) is cheaper/correct.
- Storing files by random name instead of content-uuid → loses R2 dedup ([[identity]] "dry storage").
- Forgetting Queue consumers; metering without `TENANT_QUOTA` (no cost control); rate-limit in app code instead of the `RATE_LIMITER` DO.
