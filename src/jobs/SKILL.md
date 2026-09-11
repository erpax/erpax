---
name: jobs
description: "Use when offloading work to Payload's jobs queue — defining tasks/workflows, queuing jobs, scheduling/cron, retries, or moving slow hook logic to background processing."
atomPath: jobs
coordinate: "jobs · 1/base · a00998ca"
contentUuid: "0ce42bb7-74bb-56f1-82ef-1a8b5cede2de"
diamondUuid: "e16b940f-6fd0-88c3-81e1-16901f4cf707"
uuid: "a00998ca-c538-80d5-ad7a-626d5090f1f4"
horo: 1
typography:
  partition: jobs
  bondDegree: 49
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "44e59d24-ff84-8b50-8a00-38a9032687d9"
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
      stageUuid: "16065a63-1fca-895d-a176-c1486c66efa0"
    - stage: seal
      stageUuid: "ef2274f9-5edb-88de-9f9c-457dcb9e8a76"
    - stage: uuid
      stageUuid: "220a77e7-84b9-8e6b-a71a-6a3ee2c5a5af"
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
