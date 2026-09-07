---
name: queue
description: "Use when a declared Cloudflare queue consumer must actually reach a handler — consumeQueueBatch runs the payload jobs sweep (the queue message is a nudge; the database holds the work) and acks the whole batch on a green sweep, retries the whole batch otherwise, so max_retries moves a misconfigured batch to erpax-dlq where it is visible. Found because wrangler deploy FAILS CLOSED on a consumer with no queue() export — code 11001 — the deploy-blocking form of an unraised case."
atomPath: "run/queue"
coordinate: "run/queue · 2/share · eb006449"
contentUuid: "c07df4ca-cec3-50ec-a7c0-bb370d3b61eb"
diamondUuid: "52273ab9-f291-847a-a409-238128e15e5c"
uuid: "eb006449-80cd-8e20-ae81-cb7fbaf3e18b"
horo: 2
typography:
  partition: run
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "d06613cd-6016-826e-aca1-7fc7ba5949a4"
  stages:
    - stage: path
      stageUuid: "146f62e1-40af-82f3-9917-8745cd896e73"
    - stage: trinity
      stageUuid: "e5f9fe2e-2bf5-83e2-9799-3b2b45e062b0"
    - stage: boundary
      stageUuid: "55ec32a9-8fbd-8f04-9980-ac414ec6a450"
    - stage: links
      stageUuid: "301614fb-50d1-8ed0-a17a-f0fce80705e5"
    - stage: horo
      stageUuid: "d79005fb-08e2-8b00-9bb6-343cfd460046"
    - stage: seal
      stageUuid: "ad467567-bf53-8b6a-9d9a-70740d785cf6"
    - stage: uuid
      stageUuid: "a34f3ff0-e713-8e5b-9579-c6852bf1e17c"
version: 2
---
# run/queue — the consumer the declared queues never had

`wrangler.jsonc` declares five queue consumers and the producers are live — `queueSendNamed` in the [[cloudflare]] atom sends stamped domain events to `erpax-ai-batch` · `erpax-einvoice-out` · `erpax-dunning-out` · `erpax-period-close` · `erpax-email-out`. But the Worker entry exported no `queue()` handler, so `wrangler deploy` refused to attach the consumers:

```
Queue handler is missing [code: 11001]
```

That is [[rules]]/unraised's law wearing deploy clothes: **a declared case nothing constructs**. The [[cron]] gap next door was silent — Cloudflare fired the trigger into nothing and emitted no warning. This one **fails closed at deploy**, which is how it was found: the same defect class, opposite visibility, and the loud form is the kinder one.

## The consumer is a nudge, not a processor

The database is the source of truth and the payload jobs sweep (`/api/payload-jobs/run`) is the one processor. A queue message means *"work exists — sweep now"*; it never carries work only the message holds. So consuming a batch **is** `runScheduledJobs` — the same derived Bearer, the same `WORKER_SELF_REFERENCE` service binding, the same refusal semantics as [[cron]] — followed by:

- **green sweep → ack the whole batch** (re-running the sweep is idempotent, so acking is safe)
- **anything else → retry the whole batch** — after `max_retries` the platform moves it to `erpax-dlq`, so a misconfigured Worker becomes **visible in the dead-letter queue** instead of spinning forever

Never partially: the sweep is batch-agnostic, so a batch is one unit of consumption.

## Why an atom, not worker.ts

`worker.ts` imports a build artifact (`.open-next/worker.js`) and cannot be loaded in a test on a clean checkout. The logic lives here so every branch — ack, non-2xx retry, no-secret refusal, no-binding refusal — is pinned by `test.ts`; worker.ts wires it in one line, exactly as it wires [[cron]].

**Law — [[law]]: a declared consumer must reach a handler. The deploy fails closed on this one — keep it that way by never removing the `queue()` export while `wrangler.jsonc` declares a consumer.**

Composes: [[cron]] · [[cloudflare]] · [[rules]] · [[law]].
