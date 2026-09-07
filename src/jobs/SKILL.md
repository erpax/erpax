---
name: jobs
description: "Use when offloading work to Payload's jobs queue — defining tasks/workflows, queuing jobs, scheduling/cron, retries, or moving slow hook logic to background processing."
atomPath: jobs
coordinate: "jobs · 2/share · 862889a2"
contentUuid: "5527a3b9-9603-5978-94c9-db5ba9d9a5c0"
diamondUuid: "d0c36122-29a4-8b02-bcbc-eff46e5838a7"
uuid: "862889a2-5184-89a3-b65e-fe2dc947c52f"
horo: 2
typography:
  partition: jobs
  bondDegree: 45
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "d45d8d40-a1d8-8668-924d-03cdcafba711"
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
      stageUuid: "9384a6f5-6ac5-8e23-ae90-0467d9369521"
    - stage: seal
      stageUuid: "ef2274f9-5edb-88de-9f9c-457dcb9e8a76"
    - stage: uuid
      stageUuid: "7504804f-0cbd-873b-a91c-ca51fdb8d8f2"
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
