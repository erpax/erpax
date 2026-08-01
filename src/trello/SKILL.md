---
name: trello
description: "Use when entangling an external REST system with erpax — the first worked proof that a third-party API becomes a one-word atom judged by the same constitution as everything else: a typed Trello client (key+token query auth, 300/10s per key and 100/10s per token as a continuous-refill token bucket that QUEUES a burst rather than dropping it), errors that propagate as TrelloError instead of being swallowed, and a Payload plugin whose record→card sync is idempotent on a stored card id."
atomPath: trello
coordinate: "trello · 5/round · 6fd00706"
contentUuid: "21cccb16-ab78-5641-a98c-2cfca44de35d"
diamondUuid: "fc086e34-095b-8bb9-9114-f76c56bd7a99"
uuid: "6fd00706-9eee-87b0-a58f-ab0cc349c15a"
horo: 5
typography:
  partition: trello
  bondDegree: 20
standards:
  - "ISO/IEC 25010:2023 §5.7.2 fault-tolerance (a rate-limited burst queues; it does not drop)"
  - "RFC 6749 §1.4 bearer-credential (the token is the whole authority — env-only, never stored)"
  - "RFC-6749"
bindings: []
signatures:
  computationUuid: "51ac15da-b5d9-80e9-ad06-4cf05be0a240"
  stages:
    - stage: path
      stageUuid: "f1f9c7eb-245e-8497-9f63-16d09458e5e0"
    - stage: trinity
      stageUuid: "70e0ff2e-3585-825a-8d51-8a8b29781909"
    - stage: boundary
      stageUuid: "de239737-afea-8f8d-8c5c-5f4af7ce4baf"
    - stage: links
      stageUuid: "72bfbe57-f94c-8ef6-811c-697b7daf1d08"
    - stage: horo
      stageUuid: "80744c88-9073-8332-a3cf-0d2d5dd4b212"
    - stage: seal
      stageUuid: "d25f7d7b-91b4-890e-9d13-c716236f283b"
    - stage: uuid
      stageUuid: "92d74bb8-2193-8e7d-8880-fcb42b9c663c"
version: 2
---
# trello — an external system becomes an entangled atom, not a swallowed dependency

The [[constitution]] is the anchor; this is the first atom built to prove it holds against something erpax did not design. Trello is chosen precisely because it is **ordinary** — a keyed REST surface with published rate limits and no affinity for anything here. If the pattern survives contact with an indifferent third party, it is a pattern; if it only works on a system shaped to fit, it is a coincidence.

## What the entanglement had to get right

**Errors propagate.** A non-2xx becomes `TrelloError` carrying status · verb · path · body, and there is **no catch in the client** — nothing to swallow ([[convention]]/sealed: entropy leaves through error handling). The distinction matters at the caller: a revoked token (401), a deleted list (404) and an outage (503) are three different repairs, and a defaulted catch makes all three look like an empty result.

**A burst queues; it does not drop.** Trello publishes **300 requests / 10s per key** and **100 / 10s per token**. `TokenBucket` refills continuously (`capacity / windowMs` tokens per ms) over both, and `TrelloRateLimiter` waits the larger of the two. Past the line a reservation returns the **milliseconds owed** rather than a rejection, and the debt accumulates — so a burst of 101 becomes a schedule, not a lost request. That the queueing is a returned *number* is the point: the suite reads it (`0` for the first 100, then `100`, then `200`) instead of trusting a comment that claims the behaviour.

**The credential is env-only.** The Trello token grants **full account access**. `trelloConfigFromEnv` fails **closed** when either half is missing — a default here would be a silent unauthenticated client, the assumption that leaks entropy.

**One write path.** `moveCard` IS `updateCard` with `idList`, so the two cannot drift into disagreeing about how a card is written.

## Setup

A Trello **Power-Up** at `trello.com/power-ups/admin` → **API Key** tab yields the key; the same page issues the token. Both go in the environment (`TRELLO_API_KEY`, `TRELLO_TOKEN`), never in the repo. `TRELLO_BOARD_ID` is optional (the board whose lists `getLists` reads); `TRELLO_MCP_ENABLED` gates the flag-gated MCP server in `.mcp.json`, off unless set to `1`.

## REST or MCP

erpax already runs an MCP gateway, so an existing Trello MCP server is a legitimate second door. The REST client is the **default** and the plugin's only dependency, because it is the surface a hook can call inside a Payload `afterChange` with a deterministic rate-limit and a typed error. The MCP entry is **scaffolded and off** (`TRELLO_MCP_ENABLED`): it is for an *agent* holding a conversation about a board, not for the sync path — a hook that reached the board through a chat-shaped protocol would make the write ordering and the retry budget unobservable from here.

The record→card mapping and the idempotency argument live in the child atom: [[trello/plugin]].

## Honest boundary

The limiter is **in-memory and per-process**: N Workers hold N buckets, so the published ceiling is respected by one process, not by a fleet — a distributed budget needs a shared counter (a Durable Object), which this atom does not claim. The suite mocks `fetch` entirely, so it proves the client's URLs, waits and error propagation, never that Trello's live API agrees with its documentation. And a rate limit read from a vendor's docs is a **declared** number: if Trello changes it, `TRELLO_LIMITS` is where the change lands, and nothing here detects the drift.

**Law — [[law]]: an external system enters the corpus as an atom under the same constitution as everything else — its errors propagate, its published limits are respected by queueing rather than dropping, its credential fails closed, and its sync is idempotent or it is not a sync.**

## Standards

- **RFC 6749 §1.4** — bearer credential: the token is the whole authority, so it lives in the environment and nowhere else.
- **ISO/IEC 25010:2023 §5.7.2** — fault tolerance: a rate-limited burst queues; it does not drop.

Composes: [[constitution]] · [[convention]] · [[law]].
