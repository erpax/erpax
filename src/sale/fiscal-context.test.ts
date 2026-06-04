/**
 * Fiscal-context resolver tests — the config cascade deployment→country→tenant
 * →device: regime applicability (BG → Н-18), resolved currency + VAT bands +
 * active device number, with device-level overrides winning.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО fiscal-device-regime
 * @see src/services/sales/fiscal-context.ts
 */

import { describe, it, expect, vi } from 'vitest'
import type { Payload } from 'payload'
import { resolveFiscalContext } from '@/sale/fiscal-context'

type DeviceFixture = {
  individualNumber?: string
  currency?: string
  taxGroups?: Array<{ group?: string; rate?: number }>
  defaultOperator?: { id?: string; code?: string; status?: string }
  defaultTerminal?: { id?: string; status?: string }
}

function mockPayload(opts: {
  country?: string
  reportingCurrency?: string
  device?: DeviceFixture | null
} = {}) {
  const { country = 'BG', reportingCurrency, device = { individualNumber: '12345678' } } = opts
  const findByID = vi.fn().mockResolvedValue({
    config: { identity: { country }, currency: reportingCurrency ? { reportingCurrency } : undefined },
  })
  const find = vi.fn().mockResolvedValue({ docs: device ? [device] : [] })
  return { findByID, find }
}
const asPayload = (m: ReturnType<typeof mockPayload>) => m as unknown as Payload

describe('resolveFiscalContext', () => {
  it('applies the Н-18 regime for a BG tenant and resolves the active device', async () => {
    const ctx = await resolveFiscalContext(asPayload(mockPayload()), { tenant: 't1' })
    expect(ctx.applies).toBe(true)
    expect(ctx.regime).toBe('naredba-n-18')
    expect(ctx.country).toBe('BG')
    expect(ctx.standardRate).toBe(20)
    expect(ctx.reducedRates).toEqual([9, 0])
    expect(ctx.deviceNumber).toBe('12345678')
  })

  it('does NOT apply for a non-regime jurisdiction (e.g. US)', async () => {
    const ctx = await resolveFiscalContext(asPayload(mockPayload({ country: 'US', device: null })), { tenant: 't1' })
    expect(ctx.applies).toBe(false)
    expect(ctx.regime).toBeUndefined()
  })

  it('resolves currency device → tenant → country', async () => {
    // device currency wins
    const a = await resolveFiscalContext(
      asPayload(mockPayload({ device: { individualNumber: '1', currency: 'USD' }, reportingCurrency: 'EUR' })),
      { tenant: 't1' },
    )
    expect(a.currency).toBe('USD')
    // no device currency → tenant reporting currency
    const b = await resolveFiscalContext(
      asPayload(mockPayload({ device: { individualNumber: '1' }, reportingCurrency: 'EUR' })),
      { tenant: 't1' },
    )
    expect(b.currency).toBe('EUR')
  })

  it('prefers a device tax-group rate over the country default', async () => {
    const ctx = await resolveFiscalContext(
      asPayload(mockPayload({ device: { individualNumber: '1', taxGroups: [{ group: 'Б', rate: 19 }] } })),
      { tenant: 't1' },
    )
    expect(ctx.standardRate).toBe(19)
  })

  it('reports no device number when none is registered (in-regime tenant)', async () => {
    const ctx = await resolveFiscalContext(asPayload(mockPayload({ device: null })), { tenant: 't1' })
    expect(ctx.applies).toBe(true)
    expect(ctx.deviceNumber).toBeUndefined()
  })

  it('resolves the device default operator + terminal (active only)', async () => {
    const ctx = await resolveFiscalContext(
      asPayload(
        mockPayload({
          device: {
            individualNumber: '12345678',
            defaultOperator: { id: 'op-1', code: '0042', status: 'active' },
            defaultTerminal: { id: 'term-1', status: 'active' },
          },
        }),
      ),
      { tenant: 't1' },
    )
    expect(ctx.operatorId).toBe('op-1')
    expect(ctx.operatorCode).toBe('0042')
    expect(ctx.terminalId).toBe('term-1')
  })

  it('ignores a decommissioned operator / inactive terminal default', async () => {
    const ctx = await resolveFiscalContext(
      asPayload(
        mockPayload({
          device: {
            individualNumber: '12345678',
            defaultOperator: { id: 'op-1', code: '0042', status: 'decommissioned' },
            defaultTerminal: { id: 'term-1', status: 'inactive' },
          },
        }),
      ),
      { tenant: 't1' },
    )
    expect(ctx.operatorId).toBeUndefined()
    expect(ctx.operatorCode).toBeUndefined()
    expect(ctx.terminalId).toBeUndefined()
  })
})
