---
name: jobs
description: "Use when offloading work to Payload's jobs queue — defining tasks/workflows, queuing jobs, scheduling/cron, retries, or moving slow hook logic to background processing."
atomPath: jobs
coordinate: "jobs · 8/crest · f652551e"
contentUuid: "693a1c91-2237-5a6b-ab1c-a4696ea0ef1b"
diamondUuid: "c116a647-28aa-8d15-a746-d3ebb389d03c"
uuid: "f652551e-ced7-8f7d-84b1-dc7b2167dc65"
horo: 8
typography:
  partition: jobs
  bondDegree: 49
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "0bd1727e-be9a-8f93-add4-d65a4f87794b"
  stages:
    - stage: path
      stageUuid: "2219ff37-c700-8086-99fd-8affa98b0a2b"
    - stage: trinity
      stageUuid: "a8b6c4d4-ce89-8de1-b3ec-958e8408ac7b"
    - stage: boundary
      stageUuid: "b3d85d0e-870d-8214-bcb5-9b949ac11ee4"
    - stage: links
      stageUuid: "e5de92d1-2a09-89d8-9376-144538b7fc48"
    - stage: horo
      stageUuid: "03b1bc3a-8456-82e7-8b59-dd4c58b6e11e"
    - stage: seal
      stageUuid: "ef2274f9-5edb-88de-9f9c-457dcb9e8a76"
    - stage: uuid
      stageUuid: "798a180c-d47b-8605-ba6e-f38b4a0b1775"
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
