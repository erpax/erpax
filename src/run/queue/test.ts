/**
 * run/queue — the refutable proofs.
 *
 * Pins: a green sweep acks every message and a refused/failed sweep retries every message (the
 * all-or-nothing invariant); the outcome reports the sweep verdict so the caller can see WHY; and
 * the consumer never throws — refusal is a value, exactly as [[cron]] returns it.
 */
import { describe, it, expect } from 'vitest'
import { consumeQueueBatch } from './index'

const batchOf = (n: number) => {
  const acked: number[] = []
  const retried: number[] = []
  return {
    batch: {
      queue: 'erpax-ai-batch',
      messages: Array.from({ length: n }, (_, i) => ({
        ack: () => void acked.push(i),
        retry: () => void retried.push(i),
      })),
    },
    acked,
    retried,
  }
}

const okBinding = { fetch: async () => new Response('ok', { status: 200 }) }
const redBinding = { fetch: async () => new Response('no', { status: 500 }) }
const SECRET = 'a-test-payload-secret-32-characters!'

describe('consumeQueueBatch — ack on green sweep, retry otherwise, never partially', () => {
  it('acks every message when the sweep is green', async () => {
    const { batch, acked, retried } = batchOf(3)
    const out = await consumeQueueBatch(batch, { PAYLOAD_SECRET: SECRET, WORKER_SELF_REFERENCE: okBinding }, () => {})
    expect(out.acked).toBe(true)
    expect(acked).toEqual([0, 1, 2])
    expect(retried).toEqual([])
    expect(out.sweep).toMatchObject({ ran: true, ok: true })
  })
  it('retries every message when the sweep responds non-2xx', async () => {
    const { batch, acked, retried } = batchOf(2)
    const out = await consumeQueueBatch(batch, { PAYLOAD_SECRET: SECRET, WORKER_SELF_REFERENCE: redBinding }, () => {})
    expect(out.acked).toBe(false)
    expect(acked).toEqual([])
    expect(retried).toEqual([0, 1])
  })
  it('retries (never acks) when the sweep refuses — no secret, no binding', async () => {
    const { batch, retried } = batchOf(1)
    const out = await consumeQueueBatch(batch, {}, () => {})
    expect(out.acked).toBe(false)
    expect(retried).toEqual([0])
    expect(out.sweep).toMatchObject({ ran: false })
  })
  it('reports the batch shape it consumed', async () => {
    const { batch } = batchOf(5)
    const out = await consumeQueueBatch(batch, { PAYLOAD_SECRET: SECRET, WORKER_SELF_REFERENCE: okBinding }, () => {})
    expect(out).toMatchObject({ queue: 'erpax-ai-batch', messages: 5 })
  })
})
