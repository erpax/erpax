---
name: cron
description: "Use when a Cloudflare cron trigger must actually reach the Payload jobs sweep — runScheduledJobs POSTs to /api/payload-jobs/run with the Bearer token derived from PAYLOAD_SECRET. The logic lives here rather than in worker.ts because that file imports a build artifact and cannot be loaded in a test. Refuses rather than calling unauthenticated when the secret is unset, refuses rather than reaching the public internet when the service binding is missing, and reports a non-2xx — a cron that fails quietly is the defect it closes."
atomPath: "run/cron"
coordinate: "run/cron · 4/weave · a56d89d9"
contentUuid: "33c53e7b-568f-50b6-bf69-a9e2a06660db"
diamondUuid: "006ce2ff-d4d9-8120-b1e5-e00beb69940c"
uuid: "a56d89d9-5a2a-810a-8e83-263bfe669afb"
horo: 4
typography:
  partition: run
  bondDegree: 14
standards:
  - RFC 6750 §2.1 — Bearer token in the Authorization header
  - "RFC-6750"
bindings: []
signatures:
  computationUuid: "c822a332-d146-869e-888f-8ec502f96665"
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
      stageUuid: "51e90bb7-ce89-8d31-9562-d7038b0ccfec"
    - stage: seal
      stageUuid: "a2c61223-c5ca-8404-87dd-e824d992ef9c"
    - stage: uuid
      stageUuid: "6db1473d-697b-86a3-99ab-80c5227a4f64"
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
