import { describe, it, expect } from 'vitest'
import { sendNotification, type NotificationInput } from '@/notification'

// notification — the society's one voice outward. `sendNotification` fans one
// input across the requested channels, picks a per-channel target, gates the
// marketing category on a consent record, and writes a best-effort audit row.
// We drive it with a stub Payload (no network/db): every `create` is recorded
// and `find` returns a controllable consent set, so the contract is deterministic.

function stubPayload(opts: { consentGranted?: boolean } = {}) {
  const created: any[] = []
  const payload: any = {
    created,
    create: async (args: any) => {
      created.push(args)
      return { id: args?.data?.eventId ?? 'audit-1' }
    },
    find: async () => ({
      docs: opts.consentGranted ? [{ id: 'consent-1' }] : [],
    }),
  }
  return payload
}

const base: NotificationInput = {
  tenantId: 't1',
  category: 'transactional',
  subject: 'Receipt',
  body: 'Thank you',
}

describe('notification — sendNotification fan-out contract', () => {
  it('returns the supplied idempotency id when given', async () => {
    const res = await sendNotification(stubPayload(), {
      ...base,
      notificationId: 'fixed-id',
      channels: ['email'],
      toEmail: 'a@b.co',
    })
    expect(res.notificationId).toBe('fixed-id')
  })

  it('mints a UUID when no notificationId is supplied', async () => {
    const res = await sendNotification(stubPayload(), {
      ...base,
      channels: ['email'],
      toEmail: 'a@b.co',
    })
    expect(typeof res.notificationId).toBe('string')
    expect(res.notificationId.length).toBeGreaterThan(0)
  })

  it('queues a delivery when the channel has a resolvable target', async () => {
    const res = await sendNotification(stubPayload(), {
      ...base,
      channels: ['email'],
      toEmail: 'a@b.co',
    })
    expect(res.deliveries).toEqual([
      { channel: 'email', target: 'a@b.co', queued: true },
    ])
  })

  it('reports no_target when the channel has no target', async () => {
    const res = await sendNotification(stubPayload(), {
      ...base,
      channels: ['slack'],
    })
    expect(res.deliveries[0]).toMatchObject({
      channel: 'slack',
      queued: false,
      error: 'no_target',
    })
  })

  it('drops marketing without a consent record (GDPR Art.7)', async () => {
    const res = await sendNotification(stubPayload({ consentGranted: false }), {
      ...base,
      category: 'marketing',
      channels: ['email'],
      toEmail: 'a@b.co',
      toUserId: 'u1',
    })
    expect(res.deliveries[0]).toMatchObject({
      channel: 'email',
      queued: false,
      error: 'no_marketing_consent',
    })
  })

  it('delivers marketing once a granted consent record exists', async () => {
    const res = await sendNotification(stubPayload({ consentGranted: true }), {
      ...base,
      category: 'marketing',
      channels: ['email'],
      toEmail: 'a@b.co',
      toUserId: 'u1',
    })
    expect(res.deliveries[0]).toMatchObject({ channel: 'email', queued: true })
  })

  it('derives email + in_app channels from prefs when none are given', async () => {
    const res = await sendNotification(stubPayload(), {
      ...base,
      toEmail: 'a@b.co',
      toUserId: 'u1',
    })
    expect(res.deliveries.map((d) => d.channel)).toEqual(['email', 'in_app'])
  })

  it('writes exactly one audit row for the whole multi-channel fan-out', async () => {
    const payload = stubPayload()
    await sendNotification(payload, {
      ...base,
      channels: ['email'],
      toEmail: 'a@b.co',
    })
    const audits = payload.created.filter((c: any) => c.collection === 'audit-events')
    expect(audits).toHaveLength(1)
    expect(audits[0].data.eventType).toBe('notification:sent')
  })

  it('never throws when the audit write fails (best-effort trail)', async () => {
    const payload: any = {
      create: async () => {
        throw new Error('audit down')
      },
      find: async () => ({ docs: [] }),
    }
    const res = await sendNotification(payload, {
      ...base,
      channels: ['email'],
      toEmail: 'a@b.co',
    })
    expect(res.deliveries[0]).toMatchObject({ channel: 'email', queued: true })
  })
})
