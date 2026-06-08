---
name: request
description: "Use when an agent calls an external system — quantum-compress the request to its most compact and cheapest form; content-address it so the uuid is the idempotency key, dedup against the cache, batch, and send the hash not the payload when the other side has seen it; squeeze the request to a point and the external cost drops toward zero."
atomPath: quantum/request
coordinate: quantum/request · 1/base · edba3733
contentUuid: "8d4135cc-13f0-5d86-9293-38a765309e77"
diamondUuid: "45d87cfc-0431-86bd-b0ce-405153452917"
uuid: "edba3733-e514-8326-a44a-e0d4a9805096"
horo: 1
bonds:
  in:
    - balance
    - law
    - quantum
    - request
    - requests
    - workflow
  out:
    - balance
    - law
    - request
    - requests
    - workflow
typography:
  partition: quantum
  bondDegree: 32
  neighbors:
    - agent
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - agent
    - broker
    - cache
    - cost
    - entropy
    - finality
    - gravity
    - law
    - linearity
    - merge
    - queue
    - receipt
    - request
    - uuid
  matrix:
    - balance
    - law
    - request
    - requests
    - workflow
  backlinks:
    - balance
    - law
    - request
    - requests
    - workflow
signatures:
  computationUuid: "7964fed9-eb26-8d10-b37e-ce90cfaefdc6"
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
      stageUuid: "cf3f7287-2c3c-8e00-86fe-eead644522d1"
    - stage: seal
      stageUuid: "eaa89010-4909-807c-a0d1-cddfcaaa7389"
    - stage: uuid
      stageUuid: "63fc79d8-ad34-88f7-bbad-358c0c5d6312"
quantum:
  superposition:
    - balance
    - law
    - quantum
    - request
    - requests
    - workflow
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
    computationUuid: "7964fed9-eb26-8d10-b37e-ce90cfaefdc6"
    contentUuid: "8d4135cc-13f0-5d86-9293-38a765309e77"
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

<sub>content-uuid `8d4135cc-13f0-5d86-9293-38a765309e77` · account `quantum/request` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
