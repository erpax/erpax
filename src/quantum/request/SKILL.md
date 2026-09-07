---
name: request
description: "Use when an agent calls an external system — quantum-compress the request to its most compact and cheapest form; content-address it so the uuid is the idempotency key, dedup against the cache, batch, and send the hash not the payload when the other side has seen it; squeeze the request to a point and the external cost drops toward zero."
atomPath: "quantum/request"
coordinate: "quantum/request · 5/round · 7d57f68b"
contentUuid: "a63ba5ef-9c44-546a-a16c-a51048bac6a6"
diamondUuid: "ebd49173-d46c-8bd9-8ccd-cff2dc87c36c"
uuid: "7d57f68b-2fd0-8edd-a44e-99ba44f4e0af"
horo: 5
typography:
  partition: quantum
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "a612f307-c4c8-8517-9d7c-d0aeeb2939f4"
  stages:
    - stage: path
      stageUuid: "a27573a0-750b-84e2-bfcd-6c16b5c1d0e2"
    - stage: trinity
      stageUuid: "03079fbe-132c-8fe8-863a-563f69f3164e"
    - stage: boundary
      stageUuid: "ea542019-e8cb-8c57-b740-e68a6c7eb6f0"
    - stage: links
      stageUuid: "dfcaf07b-8859-8a08-8e67-ff7d9923ffd6"
    - stage: horo
      stageUuid: "77055679-e409-8924-8f2f-eedda82897a9"
    - stage: seal
      stageUuid: "eaa89010-4909-807c-a0d1-cddfcaaa7389"
    - stage: uuid
      stageUuid: "fbc5c076-daa8-8038-bd21-f45253e931aa"
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
    computationUuid: "a612f307-c4c8-8517-9d7c-d0aeeb2939f4"
    contentUuid: "a63ba5ef-9c44-546a-a16c-a51048bac6a6"
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

<sub>content-uuid `a63ba5ef-9c44-546a-a16c-a51048bac6a6` · account `quantum/request` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
