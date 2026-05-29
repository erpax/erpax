/**
 * Fiscal-reference validation tests — reject a sale on a decommissioned ФУ or
 * operator; pass when references are active or absent.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature
 * @see src/services/sales/validate-fiscal-refs.ts
 */

import { describe, it, expect, vi } from 'vitest'
import { validateSaleFiscalRefsHook } from './validate-fiscal-refs'

type HookArgs = Parameters<ReturnType<typeof validateSaleFiscalRefsHook>>[0]

function run(
  data: Record<string, unknown>,
  statuses: Record<string, string> = {},
  operation: 'create' | 'update' = 'create',
) {
  const findByID = vi.fn(({ id }: { id: string }) =>
    Promise.resolve(statuses[id] ? { id, status: statuses[id] } : { id, status: 'active' }),
  )
  const args = { data, operation, req: { payload: { findByID } } } as unknown as HookArgs
  return { promise: validateSaleFiscalRefsHook()(args), findByID }
}

describe('validateSaleFiscalRefsHook', () => {
  it('passes when device + operator are active', async () => {
    const { promise } = run({ fiscalDevice: 'fd-1', operator: 'op-1' }, { 'fd-1': 'active', 'op-1': 'active' })
    await expect(promise).resolves.toBeDefined()
  })

  it('rejects a sale on a decommissioned fiscal device', async () => {
    const { promise } = run({ fiscalDevice: 'fd-1' }, { 'fd-1': 'decommissioned' })
    await expect(promise).rejects.toThrow(/decommissioned fiscal device/)
  })

  it('rejects a sale by a decommissioned operator', async () => {
    const { promise } = run({ operator: { id: 'op-1' } }, { 'op-1': 'decommissioned' })
    await expect(promise).rejects.toThrow(/decommissioned operator/)
  })

  it('passes (no lookup) when no references are present', async () => {
    const { promise, findByID } = run({ fiscalDeviceNumber: '12345678' })
    await expect(promise).resolves.toBeDefined()
    expect(findByID).not.toHaveBeenCalled()
  })

  it('is a no-op on update', async () => {
    const { promise, findByID } = run({ fiscalDevice: 'fd-1' }, { 'fd-1': 'decommissioned' }, 'update')
    await expect(promise).resolves.toBeDefined()
    expect(findByID).not.toHaveBeenCalled()
  })
})
