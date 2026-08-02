/**
 * run/queue — the consumer the declared queues never had.
 *
 * `wrangler.jsonc` declares five queue consumers (`erpax-ai-batch` · `erpax-einvoice-out` ·
 * `erpax-dunning-out` · `erpax-period-close` · `erpax-email-out`) and the producers ARE live
 * (`queueSendNamed` in src/cloudflare/index.ts sends stamped domain events). But the Worker entry
 * exported no `queue()` handler, so `wrangler deploy` refused to attach the consumers:
 * "Queue handler is missing [code: 11001]" — the deploy-blocking form of [[rules]]/unraised's law,
 * a declared case nothing constructs. Unlike the cron gap this one is NOT silent — the deploy
 * fails — which is how it was found.
 *
 * The consumer is a NUDGE, not a processor. The database is the source of truth and the payload
 * jobs sweep (`/api/payload-jobs/run`) is the one processor; a queue message means "work exists,
 * sweep now" rather than carrying work only the message holds. So consuming a batch IS
 * `runScheduledJobs` — the same derived Bearer, the same service binding, the same refusals
 * ([[cron]]) — followed by ack on a green sweep and retry on anything else. After `max_retries`
 * the platform moves the batch to `erpax-dlq`, so a misconfigured Worker becomes visible in the
 * dead-letter queue instead of spinning forever.
 *
 * @law a declared consumer must reach a handler — the deploy fails closed on this one, and the
 *      handler must exist as an atom so a clean checkout can test it (worker.ts imports a build
 *      artifact and cannot be loaded in a test).
 * @invariant a batch is either fully acked (sweep ok) or fully retried — never partially consumed,
 *            because the sweep is batch-agnostic and re-running it is idempotent
 * @see ../cron -- ../../cloudflare
 */
import { runScheduledJobs, type CronEnv, type CronOutcome } from '../cron'

/** The one method each platform queue message must offer this consumer. */
export interface QueueMessageLike {
  ack(): void
  retry(): void
}

/** The slice of a platform `MessageBatch` this consumer reads. */
export interface QueueBatchLike {
  readonly queue: string
  readonly messages: readonly QueueMessageLike[]
}

export interface QueueOutcome {
  readonly queue: string
  readonly messages: number
  readonly acked: boolean
  readonly sweep: CronOutcome
}

/**
 * Consume one queue batch by running the jobs sweep, then ack the whole batch when the sweep is
 * green and retry the whole batch otherwise. Returns what happened instead of throwing, so
 * worker.ts stays a one-line wire and a test can assert every branch.
 */
export async function consumeQueueBatch(
  batch: QueueBatchLike,
  env: CronEnv,
  log: (m: string) => void = console.error,
): Promise<QueueOutcome> {
  const sweep = await runScheduledJobs(env, log)
  const acked = sweep.ran && sweep.ok
  for (const m of batch.messages) (acked ? m.ack() : m.retry())
  if (!acked) log(`[queue] ${batch.queue}: sweep did not complete — retried ${batch.messages.length} message(s)`)
  return { queue: batch.queue, messages: batch.messages.length, acked, sweep }
}
