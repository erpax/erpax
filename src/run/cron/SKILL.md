---
name: cron
description: "Use when a Cloudflare cron trigger must actually reach the Payload jobs sweep — runScheduledJobs POSTs to /api/payload-jobs/run with the Bearer token derived from PAYLOAD_SECRET. The logic lives here rather than in worker.ts because that file imports a build artifact and cannot be loaded in a test. Refuses rather than calling unauthenticated when the secret is unset, refuses rather than reaching the public internet when the service binding is missing, and reports a non-2xx — a cron that fails quietly is the defect it closes."
atomPath: "run/cron"
coordinate: "run/cron · 1/base · 1414c44d"
contentUuid: "d2adff91-32db-51a5-9ec5-0594cafc980d"
diamondUuid: "8a84de47-8167-89e1-ad02-133e1af8d8f0"
uuid: "1414c44d-4193-8ca9-ac03-11b9d696d302"
horo: 1
typography:
  partition: run
  bondDegree: 14
standards:
  - RFC 6750 §2.1 — Bearer token in the Authorization header
  - "RFC-6750"
bindings: []
signatures:
  computationUuid: "78226f2d-c2d1-89ad-ac14-b80b6f5c9b43"
  stages:
    - stage: path
      stageUuid: "8fa13a34-29df-87a5-b437-0ce52f7bd972"
    - stage: trinity
      stageUuid: "ae04bf94-bfa6-84ad-8f23-c456845815b9"
    - stage: boundary
      stageUuid: "99019a46-0e11-8e1b-bd38-2101a03791f3"
    - stage: links
      stageUuid: "8ab2e060-7fba-843f-a0bf-0563936a0e7d"
    - stage: horo
      stageUuid: "81bb4e41-71db-8bbe-b2ca-a1a012b6b77d"
    - stage: seal
      stageUuid: "a2c61223-c5ca-8404-87dd-e824d992ef9c"
    - stage: uuid
      stageUuid: "ea88986c-a3ab-8097-8797-78f3bf6f1c97"
version: 2
---
# run/cron — the trigger that fired into nothing

`wrangler.jsonc` declares two cron triggers, and its own comment said the `scheduled()` handler lived in `.open-next/worker.js`. **It did not.** That artifact contains no `scheduled` at all, and neither did the Worker entry — so Cloudflare invoked every 15 minutes and at 01:00 UTC, found no handler, and did nothing.

The dunning-cycle sweep and the BNB rates sync never ran.

**Wrangler emits no warning for a declared trigger with no handler.** There is no error, no log, no failed deploy — which is why it survived. The only signal was the job never happening.

## Why the logic is here and not in the entry

`worker.ts` imports `./.open-next/worker.js`, a build artifact absent from a clean checkout, so nothing that lives there can be unit-tested. An atom can. The entry keeps only the wiring:

```ts
export default {
  ...openNextHandler,
  async scheduled(_c, env, ctx) { ctx.waitUntil(runScheduledJobs(env)) },
}
```

Confirmed in the bundled output, not assumed: `wrangler deploy --dry-run` emits `worker_default2 = { ...worker_default, async scheduled(...) }`, and the five Durable Object classes still export beside it. The handler costs **0.49 KiB** gzip — measured by bundling with and without it.

## What it refuses

| condition | behaviour |
| --- | --- |
| `PAYLOAD_SECRET` unset | refuse — never send an unauthenticated request to the jobs endpoint |
| `WORKER_SELF_REFERENCE` unbound | refuse — never fall back to the public internet |
| non-2xx response | report it; a cron that fails quietly is the defect being closed |
| 2xx | silent — only failures speak |

The token is the **same construction** the endpoint checks (`jobs.access.run`). A Worker gets its secrets in `env`, never `process.env`, so this calls the explicit-master form of the derivation rather than re-deriving the HMAC — two derivations that can drift is how an internal token stops matching the endpoint that validates it, silently, on a schedule.

**Honest boundary.** This proves the trigger **reaches a handler and authenticates**. It does not prove the sweep *succeeds* — what the jobs do once invoked is theirs. And the five declared queue **consumers** still have no `queue()` handler; that is the same class of defect and is not closed here.

**Law — [[law]]: a declared trigger must reach a handler. The platform does not warn when it does not, so the absence is invisible until someone notices the job never ran.**

Composes: [[run]] · [[108]] (NIST SP 800-108 key derivation) · [[cloudflare]] · [[law]].
