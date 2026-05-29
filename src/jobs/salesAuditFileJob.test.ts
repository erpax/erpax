/**
 * СУПТО audit-file job tests — prior-month window + per-tenant build, graceful.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §Приложение-38
 * @see src/jobs/suptoAuditFileJob.ts
 */

import { describe, it, expect, vi } from 'vitest'
import type { Payload } from 'payload'
import { priorMonthUtc, processSuptoAuditFiles } from './suptoAuditFileJob'

describe('priorMonthUtc', () => {
  it('returns the prior calendar month window', () => {
    const { periodStart, periodEnd } = priorMonthUtc(new Date('2026-05-15T12:00:00Z'))
    expect(periodStart).toBe('2026-04-01T00:00:00.000Z')
    expect(periodEnd).toBe('2026-04-30T23:59:59.999Z')
  })

  it('handles the January → prior-December year boundary', () => {
    const { periodStart, periodEnd } = priorMonthUtc(new Date('2026-01-10T00:00:00Z'))
    expect(periodStart).toBe('2025-12-01T00:00:00.000Z')
    expect(periodEnd).toBe('2025-12-31T23:59:59.999Z')
  })
})

describe('processSuptoAuditFiles', () => {
  it('builds an audit file per tenant for the prior month', async () => {
    const find = vi
      .fn()
      // 1st call: tenants
      .mockResolvedValueOnce({ docs: [{ id: 't1' }, { id: 't2' }] })
      // subsequent: sales per tenant
      .mockResolvedValue({ docs: [{ unp: '12345678-0042-0000001', fiscalDeviceNumber: '12345678', saleDate: '2026-04-10T00:00:00Z', total: 500_00 }] })
    const payload = { find, logger: { info: vi.fn(), error: vi.fn() } } as unknown as Payload

    const res = await processSuptoAuditFiles(payload, { now: new Date('2026-05-05T00:00:00Z') })
    expect(res.tenants).toBe(2)
    expect(res.built).toBe(2)
    expect(res.periodStart).toBe('2026-04-01T00:00:00.000Z')
  })

  it('passes the submitter through when provided', async () => {
    const find = vi
      .fn()
      .mockResolvedValueOnce({ docs: [{ id: 't1' }] })
      .mockResolvedValue({ docs: [] })
    const submit = vi.fn().mockResolvedValue({ status: 200 })
    const payload = { find, logger: { info: vi.fn(), error: vi.fn() } } as unknown as Payload

    await processSuptoAuditFiles(payload, { submit, now: new Date('2026-05-05T00:00:00Z') })
    expect(submit).toHaveBeenCalledOnce()
  })

  it('does not throw when a tenant build fails', async () => {
    const find = vi
      .fn()
      .mockResolvedValueOnce({ docs: [{ id: 't1' }] })
      .mockRejectedValue(new Error('db down'))
    const payload = { find, logger: { info: vi.fn(), error: vi.fn() } } as unknown as Payload

    const res = await processSuptoAuditFiles(payload, { now: new Date('2026-05-05T00:00:00Z') })
    expect(res.built).toBe(0)
    expect((payload.logger as { error: ReturnType<typeof vi.fn> }).error).toHaveBeenCalled()
  })
})
