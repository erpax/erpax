import { describe, expect, it } from 'vitest'

import { fieldEntanglementOf } from './field'

describe('entanglement/field — party field entanglement warnings', () => {
  it('returns empty when parties are independent', () => {
    expect(
      fieldEntanglementOf({
        seller: 'addr-seller',
        buyer: 'addr-buyer',
      }),
    ).toEqual([])
  })

  it('flags seller/buyer collision as error', () => {
    const warnings = fieldEntanglementOf({
      seller: 'same-id',
      buyer: 'same-id',
    })
    expect(warnings).toHaveLength(2)
    expect(warnings[0]?.severity).toBe('error')
    expect(warnings[0]?.entangledWith).toContain('buyer')
  })

  it('focusField filters to one role', () => {
    const warnings = fieldEntanglementOf(
      { seller: 'x', buyerAgent: 'x' },
      'buyerAgent',
    )
    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.field).toBe('buyerAgent')
  })
})
