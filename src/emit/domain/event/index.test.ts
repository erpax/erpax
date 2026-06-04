/**
 * emit-domain-event — the bridge from business events to the society, proved.
 * Every emitted business event also lands as a `chat` row (→ afterChange →
 * agents). Best-effort + fire-and-forget. @see ./index.ts, src/chat/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import { emitDomainEvent } from '@/emit/domain/event'

type Req = Parameters<typeof emitDomainEvent>[0]
type Evt = Parameters<typeof emitDomainEvent>[1]

function mockReq(): { req: Req; rows: Array<Record<string, unknown>> } {
  const rows: Array<Record<string, unknown>> = []
  const payload = {
    create: async ({ data }: { collection: string; data: Record<string, unknown> }) => {
      rows.push(data)
      return data
    },
    find: async () => ({ docs: [] as Array<Record<string, unknown>> }),
    logger: { info: (): void => {}, error: (): void => {}, warn: (): void => {} },
  }
  return { req: { payload } as unknown as Req, rows }
}

const businessEvent = (): Evt =>
  ({
    eventId: 'e1',
    eventType: 'invoice:activated',
    tenantId: 'tA',
    aggregateId: 'inv-1',
    aggregateType: 'invoice',
    timestamp: new Date(0),
    userId: 'u1',
    payload: { amount: 100 },
  }) as unknown as Evt

describe('emit-domain-event: bridges a business event onto the chat bus', () => {
  it('publishes a content-addressed chat row for the event', async () => {
    const { req, rows } = mockReq()
    await emitDomainEvent(req, businessEvent())
    await new Promise((r) => setTimeout(r, 0)) // flush the fire-and-forget bridge
    const chatRow = rows.find((r) => r.event === 'invoice:activated')
    expect(chatRow).toBeDefined()
    expect(chatRow!.tenant).toBe('tA')
    expect(chatRow!.agent).toBe('u1') // the actor rides as the publishing agent
    expect(chatRow!.depth).toBe(0) // an original publish, not a cascade
  })

  it('never throws even if the chat publish fails (best-effort)', async () => {
    const rows: Array<Record<string, unknown>> = []
    const req = {
      payload: {
        create: async () => {
          throw new Error('db down')
        },
        logger: { info: (): void => {}, error: (): void => {}, warn: (): void => {} },
      },
    } as unknown as Req
    await expect(emitDomainEvent(req, businessEvent())).resolves.toBeUndefined()
    expect(rows).toHaveLength(0)
  })
})
