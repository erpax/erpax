---
name: cron
description: "Use when a Cloudflare cron trigger must actually reach the Payload jobs sweep — runScheduledJobs GETs /api/payload-jobs/run (Payload serves it as GET; a POST is a 404) with the Bearer token derived from PAYLOAD_SECRET. The logic lives here rather than in worker.ts because that file imports a build artifact and cannot be loaded in a test. Refuses rather than calling unauthenticated when the secret is unset, refuses rather than reaching the public internet when the service binding is missing, and reports a non-2xx — a cron that fails quietly is the defect it closes."
atomPath: "run/cron"
coordinate: "run/cron · 8/crest · a9e36668"
contentUuid: "3d9b2c83-cddb-5e7c-96a0-ff936bb9a6f8"
diamondUuid: "dcb726c5-f3c2-84f3-9a43-56a7bc9ee027"
uuid: "a9e36668-3aa9-8f36-bcaa-629e47bf0bac"
horo: 8
typography:
  partition: run
  bondDegree: 14
standards:
  - RFC 6750 §2.1 — Bearer token in the Authorization header
  - "RFC-6750"
bindings: []
signatures:
  computationUuid: "24b6f53d-bc83-8172-8036-e840c0e06eda"
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
      stageUuid: "9c7d06a8-810b-8dbf-8f09-7508fe91c599"
    - stage: seal
      stageUuid: "a2c61223-c5ca-8404-87dd-e824d992ef9c"
    - stage: uuid
      stageUuid: "747b7e17-87e2-801f-95a0-76f64439b031"
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

## The handler that answered 404

Wiring the handler was half the fix. It POSTed, and Payload registers the run endpoint as `method: 'get', path: '/run'` (`payload/dist/queues/endpoints/run.js`, "GET instead of POST to allow it to be used in a Vercel Cron"), so a POST matches no endpoint. Measured on the live Worker 2026-09-12 with `wrangler tail`: the `*/15` trigger fired (`outcome ok`, 9 ms), the self-request came back `404 Not Found`, and it ended `canceled` because nothing read its body. Every sweep since the handler landed ran nothing. It now sends GET and reads the body; the unit test pins the method, which it previously pinned wrong.

**Honest boundary.** This proves the trigger reaches the endpoint with the right method and token — not that the sweep *does* anything. `/run` executes jobs already in the queue, and queues scheduled tasks only when `jobs.scheduling` is configured; no task here declares a `schedule`, so `dunning-cycle` and `bg-bnb-rates-sync` still run only if something else enqueues them. Whether dunning should run on its own is a product decision, not a cron fix. The live Worker keeps answering 404 until it is redeployed.

**Law — [[law]]: a declared trigger must reach a handler. The platform does not warn when it does not, so the absence is invisible until someone notices the job never ran.**

Composes: [[run]] · [[108]] (NIST SP 800-108 key derivation) · [[cloudflare]] · [[law]].
