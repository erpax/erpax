/**
 * Operator-code derivation tests — the УНП second segment is read from the
 * operator register on create, defaulting to 0000 with no linked operator.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature
 * @see src/services/sales/operator-code.ts
 */

import { describe, it, expect, vi } from 'vitest'
import { deriveSaleOperatorCodeHook } from '@/sale/operator-code'

type HookArgs = Parameters<ReturnType<typeof deriveSaleOperatorCodeHook>>[0]

function run(data: Record<string, unknown>, operation: 'create' | 'update', operatorCode?: string) {
  const findByID = vi.fn().mockResolvedValue(operatorCode ? { code: operatorCode } : null)
  const args = { data, operation, req: { payload: { findByID } } } as unknown as HookArgs
  return { promise: deriveSaleOperatorCodeHook()(args), findByID }
}

describe('deriveSaleOperatorCodeHook', () => {
  it('reads the linked operator code into operatorCode on create', async () => {
    const { promise, findByID } = run({ operator: 'op-1', operatorCode: '0000' }, 'create', '0042')
    const out = (await promise) as { operatorCode?: string }
    expect(out.operatorCode).toBe('0042')
    expect(findByID).toHaveBeenCalledWith(expect.objectContaining({ collection: 'operators', id: 'op-1' }))
  })

  it('resolves an operator passed as a populated { id } object', async () => {
    const { promise } = run({ operator: { id: 'op-9' } }, 'create', '7')
    const out = (await promise) as { operatorCode?: string }
    expect(out.operatorCode).toBe('7') // formatUnp pads to 0007 later
  })

  it('keeps the 0000 default when no operator is linked', async () => {
    const { promise, findByID } = run({ operatorCode: '0000' }, 'create')
    const out = (await promise) as { operatorCode?: string }
    expect(out.operatorCode).toBe('0000')
    expect(findByID).not.toHaveBeenCalled()
  })

  it('is a no-op on update (УНП is frozen at creation)', async () => {
    const { promise, findByID } = run({ operator: 'op-1', operatorCode: '0000' }, 'update', '0042')
    await promise
    expect(findByID).not.toHaveBeenCalled()
  })
})
