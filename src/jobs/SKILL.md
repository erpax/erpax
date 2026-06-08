---
name: jobs
description: "Use when offloading work to Payload's jobs queue — defining tasks/workflows, queuing jobs, scheduling/cron, retries, or moving slow hook logic to background processing."
atomPath: jobs
coordinate: jobs · 2/share · 4c8510ab
contentUuid: "7a108259-fd12-5862-bb78-dd3c29526514"
diamondUuid: "f35bd7b1-43a1-8511-8bb7-d18bc9a3bf87"
uuid: "4c8510ab-ba32-8162-83f3-efa953791834"
horo: 2
bonds:
  in:
    - batch
    - bindings
    - currency
    - desire
    - event
    - hooks
    - idempotency
    - law
    - manufacturing
    - observability
    - optimize
    - port
    - reconcile
    - run
    - spec
    - supto
  out:
    - batch
    - bindings
    - currency
    - desire
    - event
    - hooks
    - idempotency
    - law
    - manufacturing
    - observability
    - optimize
    - port
    - reconcile
    - run
    - spec
    - supto
typography:
  partition: jobs
  bondDegree: 0
  neighbors: []
standards:
  - "Naredba-N-18"
bindings: []
neighbors:
  wikilink:
    - hooks
    - law
    - optimize
  matrix:
    - batch
    - bindings
    - currency
    - desire
    - event
    - hooks
    - idempotency
    - law
    - manufacturing
    - observability
    - optimize
    - port
    - reconcile
    - run
    - spec
    - supto
  backlinks:
    - batch
    - bindings
    - currency
    - desire
    - event
    - hooks
    - idempotency
    - law
    - manufacturing
    - observability
    - optimize
    - port
    - reconcile
    - run
    - spec
    - supto
signatures:
  computationUuid: "90805952-6704-802f-b35a-ea28932c46f1"
  stages:
    - stage: path
      stageUuid: "2219ff37-c700-8086-99fd-8affa98b0a2b"
    - stage: trinity
      stageUuid: "406e53e7-7c3d-8e66-94ac-029c3d861e66"
    - stage: boundary
      stageUuid: "281c5b55-b96a-8cf8-823a-5e5c7994350b"
    - stage: links
      stageUuid: "e5de92d1-2a09-89d8-9376-144538b7fc48"
    - stage: horo
      stageUuid: "3ed8b2ca-0826-87b0-a367-084e465ad827"
    - stage: seal
      stageUuid: "ebbe4f7e-5f39-8414-966e-e8759fca6b84"
    - stage: uuid
      stageUuid: "dda563bd-2da8-8e50-a400-8e63c96eff8b"
version: 2
---
# jobs — the jobs queue (background work)

Move slow/async work (emails, third-party calls, heavy compute) out of the request lifecycle. Configure `config.jobs`.

## Config
```ts
jobs: {
  tasks: [{ slug: 'syncRates', handler: async ({ input, req }) => ({ output }), retries: 3 }],
  workflows: [{ slug: 'onboard', handler: async ({ job, tasks }) => { await tasks.syncRates('1', {}) } }],
  autoRun: [{ cron: '0 * * * *', queue: 'hourly' }],  // scheduled
  shouldAutoRun: () => true,
}
```

## Queue & run
- `payload.jobs.queue({ task|workflow, input, queue, waitUntil })` to enqueue.
- Run: `payload jobs:run --all-queues --limit 50` (CLI) or `payload.jobs.run()`.
- Tasks have `retries`, idempotency, and typed input/output; workflows chain tasks with restart-safety.

## Rules
- Prefer jobs over heavy [[hooks]] (keep hooks lightweight — see [[optimize]]).
- On serverless/Cloudflare, trigger the runner via cron/scheduled worker rather than a long-lived process.

## Common mistakes
- Doing slow work inline in `afterChange` instead of queuing a job.
- Non-idempotent task handlers that break on retry.
- Forgetting to actually run the queue (no runner scheduled).

**Law — [[law]]: slow/async work leaves the request lifecycle for the queue as idempotent, retry-safe tasks (a runner must actually run it) — never inline in a hook.**
