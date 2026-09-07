---
name: surface
description: "Use when checking that wrangler.jsonc and the code agree about bindings — a name read from env that no binding declares is undefined at runtime, and every reader guards with an early return, so the function silently does nothing in production. Enforces READ ⇒ DECLARED, which is decidable; deliberately does NOT enforce DECLARED ⇒ READ, because OpenNext, the Payload adapter and plugins legitimately read bindings this scan does not cover. Comments are stripped before the scan: a binding named in prose is not a use."
atomPath: "cloudflare/surface"
coordinate: "cloudflare/surface · 5/round · c021e1eb"
contentUuid: "e46d7df0-a82d-5d78-a381-58dc1f9acc29"
diamondUuid: "6b6de79c-2487-8c89-8713-535e7d346a90"
uuid: "c021e1eb-014c-8e86-b523-357cdc5e0b19"
horo: 5
typography:
  partition: cloudflare
  bondDegree: 20
standards:
  - "ISO/IEC 25010:2023 §5.3 — compatibility: co-existence with the platform's contract"
bindings: []
signatures:
  computationUuid: "b043cd3f-34cf-8238-a071-8b230aba1a1c"
  stages:
    - stage: path
      stageUuid: "32719b63-96f4-8a8a-842a-231ebc7235f4"
    - stage: trinity
      stageUuid: "b0189b81-9b9a-88ed-882f-53e58d564e6f"
    - stage: boundary
      stageUuid: "7c3e2ca6-af46-8fae-9cbe-da6cd757697a"
    - stage: links
      stageUuid: "3de4bc67-1a3b-84e7-ba34-df71ec176cce"
    - stage: horo
      stageUuid: "892bcdd6-5b60-8090-b1f9-2416c8281538"
    - stage: seal
      stageUuid: "db086073-0fd8-803e-9042-6b85cf7545f0"
    - stage: uuid
      stageUuid: "d6e90a30-c04a-89b6-afce-d3265f505f4d"
version: 2
---
# cloudflare/surface — the config and the code must agree, and nothing warns when they do not

A binding read under a name `wrangler.jsonc` does not declare is `undefined` at runtime. Every reader in this corpus guards with an early return, so the failure is **silent**: no error, no log, no failed deploy. The function simply does nothing, forever.

Three are live:

```
ANALYTICS   →  sinkAnalytics returns without writing
QUEUE       →  emitToQueue returns without sending
WORKFLOWS   →  likewise
```

Same shape as the cron triggers that fired into nothing ([[run]]/cron): **the platform does not warn about a declaration with no counterpart, in either direction.** That is why this is a gate and not a fix — a point fix closes one instance, and the next lands unnoticed. It was found by probing the claim *"every binding read by code is declared"* through the chat surface, immediately after a linear fix had closed only the instance in front of it.

## One direction is sound; the other is not

| direction | enforced | why |
| --- | --- | --- |
| **READ ⇒ DECLARED** | yes, ratcheted | a name no binding declares can never be anything but `undefined` |
| DECLARED ⇒ READ | **no** — reported only | OpenNext reads `WORKER_SELF_REFERENCE`; the Payload adapter reads `D1` and `R2`; plugins read more. Failing on these would be a gate that cries wolf, and [[rules]]/bypass records what that costs |

**Parsed, not matched.** A binding named in a comment is prose about the surface, not a use of it — the false positive that cost [[rules]]/confine a wrong measurement. Comments are stripped via [[syntax]] before the scan, and a test pins that a name appearing only in prose is not counted.

**Honest boundary.** The ceiling is **3**, not 0, and the three are left in place deliberately: rerouting them is a *design decision* — which analytics dataset, which named queue — not a repair, and guessing one would replace a visible no-op with an invisible wrong destination. The gate makes them countable and stops a fourth joining them. It also scans a declared file list rather than the whole tree, so a binding read from a module outside `SURFACE_FILES` is not yet covered.

**Law — [[law]]: a binding read by code must be declared by config. The platform does not warn when it is not, so the read returns undefined and the guarded caller silently does nothing.**

Composes: [[cloudflare]] · [[run]]/cron · [[syntax]] · [[rules]]/bypass · [[law]].
