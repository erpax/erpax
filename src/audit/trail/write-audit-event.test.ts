/**
 * writeAuditEvent — round-trip tests.
 *
 * Slice PPPPPPPPP-cut1 (2026-05-11). Pins the contract that closes
 * Finding 2 of the tamper-surface review:
 *
 *   1. With a mediator, the DO chain leaf is appended FIRST; the row
 *      is then written carrying the leaf's uuid + status='linked'.
 *   2. Without a mediator (CLI / no-CF context), the row is written
 *      with chainLeafUuid=null + status='unbound' — discoverable.
 *   3. Chain-append failure does NOT swallow the Payload row write;
 *      the row is written with status='pending' so a reconciliation
 *      sweep can replay it later.
 *   4. Payload row write failure RE-THROWS — Finding 4 of the review
 *      (silent audit-write swallowing) is explicitly fixed here.
 *
 * @audit Conservation Law 8 content-addressable integrity (chainLeafUuid)
 * @audit Conservation Law 53 self-referential-closure (pending reconciliation)
 */
import { describe, it, expect, vi } from 'vitest'
import { writeAuditEvent } from './write-audit-event'
import type { UuidLinkedLeaf } from '@/integrity'

function fakePayload(opts: {
  createImpl?: (args: { collection: string; data: Record<string, unknown> }) => Promise<unknown>
}) {
  return {
    create: vi.fn(opts.createImpl ?? (async () => ({ id: 'row-1' }))),
  }
}

const FAKE_LEAF: UuidLinkedLeaf = {
  seq: 42,
  leafUuid: '00000000-0000-5000-8000-000000abcdef',
  prevUuid: '00000000-0000-5000-8000-000000aaaaaa',
  occurredAt: '2026-05-11T08:00:00.000Z',
  payloadUuid: '00000000-0000-5000-8000-000000bbbbbb',
} as unknown as UuidLinkedLeaf

const INPUT = {
  tenantId: 'tenant-1',
  eventName: 'invoice:activated',
  subjectCollection: 'invoices',
  subjectId: 'inv-7',
  action: 'status-transition',
}

describe('writeAuditEvent — chain-linked write path', () => {
  it('appends to the DO chain THEN writes the Payload row with chainLeafUuid', async () => {
    const payload = fakePayload({})
    const mediator = {
      auditChainAppendLinked: vi.fn(async () => FAKE_LEAF),
    }
    const out = await writeAuditEvent({ payload: payload as never, mediator }, INPUT)
    expect(out.chainLinkStatus).toBe('linked')
    expect(out.chainLeafUuid).toBe(FAKE_LEAF.leafUuid)
    expect(out.id).toBe('row-1')
    // Order check: chain-append called BEFORE payload.create.
    const chainCallOrder = mediator.auditChainAppendLinked.mock.invocationCallOrder[0]!
    const rowCallOrder = payload.create.mock.invocationCallOrder[0]!
    expect(chainCallOrder).toBeLessThan(rowCallOrder)
    // The persisted row carries the leaf uuid.
    const persisted = payload.create.mock.calls[0]![0] as { data: Record<string, unknown> }
    expect(persisted.data.chainLeafUuid).toBe(FAKE_LEAF.leafUuid)
    expect(persisted.data.chainLinkStatus).toBe('linked')
  })

  it('without a mediator, writes the row with chainLinkStatus=unbound', async () => {
    const payload = fakePayload({})
    const out = await writeAuditEvent({ payload: payload as never /* no mediator */ }, INPUT)
    expect(out.chainLinkStatus).toBe('unbound')
    expect(out.chainLeafUuid).toBeNull()
    const persisted = payload.create.mock.calls[0]![0] as { data: Record<string, unknown> }
    expect(persisted.data.chainLinkStatus).toBe('unbound')
  })

  it('chain-append failure does NOT block the row write; status=pending for reconciliation', async () => {
    const payload = fakePayload({})
    const mediator = {
      auditChainAppendLinked: vi.fn(async () => { throw new Error('do-storage-quota') }),
    }
    const out = await writeAuditEvent({ payload: payload as never, mediator }, INPUT)
    expect(out.chainLinkStatus).toBe('pending')
    expect(out.chainLeafUuid).toBeNull()
    expect(out.id).toBe('row-1')   // row write still succeeded
    const persisted = payload.create.mock.calls[0]![0] as { data: Record<string, unknown> }
    expect(persisted.data.chainLinkStatus).toBe('pending')
  })

  it('Payload row write failure RE-THROWS (Finding 4 fix — no silent audit swallowing)', async () => {
    const payload = fakePayload({
      createImpl: async () => { throw new Error('d1-write-failed') },
    })
    const mediator = { auditChainAppendLinked: vi.fn(async () => FAKE_LEAF) }
    await expect(
      writeAuditEvent({ payload: payload as never, mediator }, INPUT),
    ).rejects.toThrow(/d1-write-failed/)
  })

  // ── Slice PPPPPPPPP-cont — stream-pause / sealed status ─────────

  it('signatureRequired:true + signUuid available → status=sealed', async () => {
    const payload = fakePayload({})
    const signed = {
      uuid: FAKE_LEAF.leafUuid, alg: 'EdDSA', kid: 'k', sig: 'sig', signedAt: '2026-05-11T08:00:00.000Z',
    }
    const mediator = {
      auditChainAppendLinked: vi.fn(async () => FAKE_LEAF),
      signUuid: vi.fn(async () => signed),
    }
    const out = await writeAuditEvent(
      { payload: payload as never, mediator },
      { ...INPUT, signatureRequired: true },
    )
    expect(out.chainLinkStatus).toBe('sealed')
    expect(out.signedUuid).toEqual(signed)
    expect(mediator.signUuid).toHaveBeenCalledWith(FAKE_LEAF.leafUuid)
    const persisted = payload.create.mock.calls[0]![0] as { data: Record<string, unknown> }
    expect(persisted.data.chainLinkStatus).toBe('sealed')
    expect(persisted.data.signatureRequired).toBe(true)
    expect(persisted.data.sealedAt).toBeDefined()
  })

  it('signatureRequired:true + signUuid throws → status=pending-signature', async () => {
    const payload = fakePayload({})
    const mediator = {
      auditChainAppendLinked: vi.fn(async () => FAKE_LEAF),
      signUuid: vi.fn(async () => { throw new Error('qtsp-unreachable') }),
    }
    const out = await writeAuditEvent(
      { payload: payload as never, mediator },
      { ...INPUT, signatureRequired: true },
    )
    expect(out.chainLinkStatus).toBe('pending-signature')
    expect(out.signedUuid).toBeUndefined()
    expect(out.chainLeafUuid).toBe(FAKE_LEAF.leafUuid)   // chain still linked
    const persisted = payload.create.mock.calls[0]![0] as { data: Record<string, unknown> }
    expect(persisted.data.sealedAt).toBeNull()
  })

  it('signatureRequired:true + no signUuid wrapper → status=pending-signature (mediator partial)', async () => {
    const payload = fakePayload({})
    const mediator = {
      auditChainAppendLinked: vi.fn(async () => FAKE_LEAF),
      // signUuid intentionally absent — mediator predates Slice HHHHHHHHH-cut2
    }
    const out = await writeAuditEvent(
      { payload: payload as never, mediator },
      { ...INPUT, signatureRequired: true },
    )
    expect(out.chainLinkStatus).toBe('pending-signature')
  })

  it('signatureRequired:false (default) → status=linked, sealedAt=null', async () => {
    const payload = fakePayload({})
    const mediator = {
      auditChainAppendLinked: vi.fn(async () => FAKE_LEAF),
      signUuid: vi.fn(async () => ({ /* unused */ })),
    }
    const out = await writeAuditEvent({ payload: payload as never, mediator }, INPUT)
    expect(out.chainLinkStatus).toBe('linked')
    expect(out.signedUuid).toBeUndefined()
    expect(mediator.signUuid).not.toHaveBeenCalled()    // not invoked when not required
    const persisted = payload.create.mock.calls[0]![0] as { data: Record<string, unknown> }
    expect(persisted.data.signatureRequired).toBe(false)
    expect(persisted.data.sealedAt).toBeNull()
  })

  it('preserves occurredAt timestamp consistency between chain and row', async () => {
    let recordedAtChain: string | undefined
    let recordedAtRow: string | undefined
    const payload = fakePayload({
      createImpl: async (args) => {
        recordedAtRow = (args.data as { occurredAt?: string }).occurredAt
        return { id: 'row-1' }
      },
    })
    const mediator = {
      auditChainAppendLinked: vi.fn(async (p: Record<string, unknown>) => {
        recordedAtChain = p.occurredAt as string | undefined
        return FAKE_LEAF
      }),
    }
    await writeAuditEvent({ payload: payload as never, mediator }, INPUT)
    expect(recordedAtChain).toBeDefined()
    expect(recordedAtRow).toBe(recordedAtChain)   // same instant on both sides
  })
})
