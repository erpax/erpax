---
name: request
description: "Use when an agent calls an external system — quantum-compress the request to its most compact and cheapest form; content-address it so the uuid is the idempotency key, dedup against the cache, batch, and send the hash not the payload when the other side has seen it; squeeze the request to a point and the external cost drops toward zero."
atomPath: "quantum/request"
coordinate: "quantum/request · 1/base · da3c1c94"
contentUuid: "838ef33f-6dd7-50f4-b9a2-1bfff04a25dc"
diamondUuid: "c0ae5498-4b83-8bbf-8c53-72a5ba2cf72b"
uuid: "da3c1c94-9037-8222-ba40-465c0b857f60"
horo: 1
typography:
  partition: quantum
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "e67709d0-2ab0-88ec-bf99-4528657ad1de"
  stages:
    - stage: path
      stageUuid: "a27573a0-750b-84e2-bfcd-6c16b5c1d0e2"
    - stage: trinity
      stageUuid: "03079fbe-132c-8fe8-863a-563f69f3164e"
    - stage: boundary
      stageUuid: "ea542019-e8cb-8c57-b740-e68a6c7eb6f0"
    - stage: links
      stageUuid: "d68e379c-cb54-8594-bfa6-5c1c3042697f"
    - stage: horo
      stageUuid: "56eeb5fa-094c-82f7-822f-bfabaceb0521"
    - stage: seal
      stageUuid: "eaa89010-4909-807c-a0d1-cddfcaaa7389"
    - stage: uuid
      stageUuid: "5070fe01-1ec8-85e9-96b3-df8a4f933f5e"
quantum:
  superposition:
    - quantum
    - request
    - superposition
  collapse:
    - "Use when an agent calls an external system — quantum-compress the request to its most compact and cheapest form; content-address it so the uuid is the idempotency key, dedup against the cache, batch, and send the hash not the payload when the other side has seen it; squeeze the request to a point and the external cost drops toward zero."
    - "[[agent]]"
    - "[[broker]]"
    - "[[cache]]"
    - "[[cost]]"
    - "[[finality]]"
    - "[[merge]]"
    - "[[queue]]"
    - "[[request]]"
    - "[[uuid]]"
    - "a request and its replay carry the same content-uuid, so that uuid is the idempotency key — identical calls collapse to one and the external side is never billed twice for the same question. The cost paid out is bounded below by only what is irreducible after dedup; compress the request toward a point and the bytes (and the bill) fall toward zero, but the trust gate still admits it."
  seal:
    sandbox: true
    receipt: true
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "e67709d0-2ab0-88ec-bf99-4528657ad1de"
    contentUuid: "838ef33f-6dd7-50f4-b9a2-1bfff04a25dc"
version: 2
---
# quantum/request — the cheapest external call

The quantum twin of [[request]]: every [[agent]] call to an external system is a collapse at the boundary — the one place the bill comes due ([[finality]]; a sent request is the measurement, [[cost]] paid in latency, money, [[entropy]]). So compress it first.

## Compress to a point

1. **content-address it** — the request's content-[[uuid]] is its most compact identity (128 bits) and its idempotency key in one. Same content ⇒ same id, so the external system dedups a replay ([[merge]]).
2. **dedup against the [[cache]]** — if `AI_CACHE`/KV has seen this uuid, the answer is a $0 read; never pay twice for the same question (same goods description → same HS code → one cached call).
3. **send the hash, not the payload** — when the other side already holds the content, send only its [[uuid]]; squeeze the request to a point and the bytes (and the cost) collapse toward zero ([[gravity]] · [[linearity]]).
4. **batch the irreducible** — what truly must go out, queue and batch ([[queue]]) so many calls amortise to one.

Every external call still passes the trust gate — [[access]] permits it, the [[broker]] holds the credential, the act emits a [[receipt]]. Cheapest *and* gated: the compression lowers the cost, the gate keeps it safe.

@see [[request]] · [[agent]] · [[uuid]] · [[cache]] · [[merge]] · [[cost]] · [[finality]] · [[broker]] · [[queue]]

**Law — [[law]]: a request and its replay carry the same content-uuid, so that uuid is the idempotency key — identical calls collapse to one and the external side is never billed twice for the same question. The cost paid out is bounded below by only what is irreducible after dedup; compress the request toward a point and the bytes (and the bill) fall toward zero, but the trust gate still admits it.**

<sub>content-uuid `838ef33f-6dd7-50f4-b9a2-1bfff04a25dc` · account `quantum/request` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
