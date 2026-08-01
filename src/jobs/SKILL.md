---
name: jobs
description: "Use when offloading work to Payload's jobs queue — defining tasks/workflows, queuing jobs, scheduling/cron, retries, or moving slow hook logic to background processing."
atomPath: jobs
coordinate: "jobs · 4/weave · 1c7f876d"
contentUuid: "5fbf84fe-1763-50d0-87bb-d048356f7832"
diamondUuid: "384d6d75-330d-8855-bfef-5e9d77fe4a36"
uuid: "1c7f876d-bcc7-856d-a125-ddcbe10dfe9e"
horo: 4
typography:
  partition: jobs
  bondDegree: 0
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "544e74bb-0f8e-8bc7-b3c3-0a65f74c3664"
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
      stageUuid: "3d93b978-42d0-869b-8ec1-22174057e09a"
    - stage: seal
      stageUuid: "ebbe4f7e-5f39-8414-966e-e8759fca6b84"
    - stage: uuid
      stageUuid: "c48b8bdc-3859-82af-b7ae-f1f09760c625"
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
