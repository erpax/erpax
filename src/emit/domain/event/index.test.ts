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
