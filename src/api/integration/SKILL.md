---
name: integration
description: "Use when calling any external HTTP API — the outbound face of the one api atom, where a vendor is DATA (base URL, declared auth style, published limits with their source, credentials) and the machinery is shared: a continuous-refill token bucket over every published limit at once so a burst queues rather than drops, credentials that fail closed naming every missing variable, errors that propagate as IntegrationError with the vendor named, and a reuse fold that measures the same IntegrationFtl for every vendor — safe methods only, because deduping a write would drop it."
atomPath: "api/integration"
coordinate: "api/integration"
contentUuid: "3fd6082e-60e4-5e1f-9dda-146638a37c51"
diamondUuid: "8f468862-9267-875e-9cda-7aeea34fa9b8"
uuid: "8bf016d4-2307-8ddc-9572-1fab64fa0d58"
horo: 1
bonds:
  in:
    - api
    - law
    - period
  out:
    - law
    - period
typography:
  partition: api
  bondDegree: 16
  neighbors:
    - diamond
    - hallucination
    - purity
standards:
  - "ISO/IEC 25010:2023 §5.7.2 fault-tolerance — a rate-limited burst queues; it does not drop"
  - "RFC 6749 §1.4 bearer-credential — the token is the whole authority, env-only"
  - "RFC 9110 §9 http-semantics (methods, status classes, safe/idempotent)"
  - "RFC-6749"
bindings: []
neighbors:
  wikilink:
    - api
    - constitution
    - convention
    - law
    - perspective
    - quantum
    - trello
  matrix:
    - law
    - period
  backlinks:
    - law
    - period
signatures:
  computationUuid: "273aee4b-2a06-8028-91d7-3503cc3a8b18"
  stages:
    - stage: path
      stageUuid: "20410d15-2737-8a23-a46e-5e03071ce4b1"
    - stage: trinity
      stageUuid: "00aa3519-5233-8d51-ad9d-e185502fad9f"
    - stage: boundary
      stageUuid: "c638d449-8d89-80d1-9285-0a35a69c7efc"
    - stage: links
      stageUuid: "d1b3c5ad-6ef8-8254-8099-1d0a730b3213"
    - stage: horo
      stageUuid: "35e825cc-6565-8998-9ae0-916b1d47a5e6"
    - stage: seal
      stageUuid: "f422d8c9-e34f-8da2-8e17-93bfefa72b20"
    - stage: uuid
      stageUuid: "a741c15a-7474-8781-ae37-e88fc4b47782"
version: 2
---
# api/integration — the outbound face, where the vendor dissolves into data

Inbound and outbound **coexist in one atom** because they are one surface observed twice ([[perspective]]). [[api]] already holds Local · REST · GraphQL — the three ways the world calls erpax. This is the fourth face: the one way erpax calls the world. Same law, opposite arrow.

[[trello]] proved the pattern against a system erpax did not design. This dissolves the vendor out of it:

| was, in trello | is, here |
| --- | --- |
| `TrelloRateLimiter` · `TrelloError` · `TrelloConfig` · `createTrelloClient` | `RateLimiter` · `IntegrationError` · `IntegrationConfig` · `createIntegrationClient` |
| 200 lines of machinery per vendor | **one `IntegrationSpec`** — base URL, auth style, credentials, limits, limits-source |

## The four that are not negotiable

**Errors propagate.** A non-2xx becomes `IntegrationError` carrying vendor · status · verb · path · body. There is **no catch in the module**. A revoked key (401), a missing resource (404) and an outage (503) are three different repairs; a defaulted catch makes all three look like an empty result.

**A burst queues, it does not drop.** *Every* published limit binds at once and the wait is the largest — Trello's 100/10s token limit bites before its 300/10s key limit, and `bindingLimit` computes which rather than assuming. Past the line the reservation returns the **ms owed**, and the debt carries.

**The credential fails closed**, naming every missing variable at once so the environment is fixed in one pass. A public endpoint declares `credentials: []` — an honest empty list, not a missing key.

**Auth is declared, never guessed.** `query` writes params, `bearer` writes one `Authorization` header, `header` writes one per credential. Three different wire shapes; the spec says which.

## One instrument for every vendor

A request has an address (method ⊕ path ⊕ canonical params), so a repeat of a **safe** request is answered from the fold at zero upstream cost — reuse, not search ([[quantum]]/ftl). `foldingClient` reports `IntegrationFtl` — `answers · calls · reuses · holds · speedupLog2` — **measured from its own behaviour**, never supplied. Eight identical GETs cost one fetch: `speedupLog2 = 3`, verified at the wire and not merely on the counter.

**Only safe methods fold.** A POST/PUT/PATCH/DELETE is not idempotent (RFC 9110 §9.2.2), and deduping one would **drop a write** — the worst possible "optimisation". Every write reaches the wire, and the honest consequence is that a write-heavy client shows **no speedup at all**. `holds` is `false` there, and that is the instrument telling the truth rather than flattering the seam.

## Discovered, not invented

Every spec in `seed.ts` is derived from something already in the repo — a `package.json` dependency, a `.env.example` credential, a wrangler binding, a `.mcp.json` server, or an atom that already calls the lane: **trello · pollinations · stripe · resend**. A vendor nobody depends on is a wish, not an integration. Every limit carries `limitsSource`, the vendor's own published page — the recompute path ([[constitution]] Law 5), so a number here is checkable against its origin rather than asserted.

## Honest boundary

The limiter is **in-memory and per-process**: N workers hold N limiters, so a published ceiling is respected by one process, not a fleet — a distributed budget needs a shared counter (a Durable Object), which this does not claim. The fold is **per-client-instance and unbounded**; it is a request-scoped reuse, not a cache with eviction or TTL, so a long-lived client holds every safe response it has seen. Limits are **declared** from vendor documentation: if a vendor changes one, `seed.ts` is where it lands, and nothing here detects the drift. And the suite mocks `fetch` entirely — it proves URLs, waits, auth shapes and error propagation, never that a live API agrees with its own docs.

**Law — [[law]]: an external system is data, not machinery — one seam holds the client, the limiter, the credential gate and the reuse fold, and a vendor is a spec whose every published number carries the source that documents it.**

## Standards

- **RFC 9110 §9** — HTTP semantics: methods, status classes, safe and idempotent.
- **RFC 6749 §1.4** — bearer credential: the token is the whole authority, so it lives in the environment.
- **ISO/IEC 25010:2023 §5.7.2** — fault tolerance: a rate-limited burst queues; it does not drop.

Composes: [[api]] · [[trello]] · [[constitution]] · [[convention]] · [[quantum]] · [[law]].
