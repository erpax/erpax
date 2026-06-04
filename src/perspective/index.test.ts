import { describe, it, expect } from 'vitest'
import { viewEdgeFrom, viewTransferFrom, isConserved } from '@/perspective'

describe('perspective — one content-uuid node, switched point of view (derived, not stored)', () => {
  it('a supplier edge reads as "my customer" from the other end', () => {
    const edge = { from: 'A', to: 'B', context: 'supplier' } // A supplies B
    expect(viewEdgeFrom(edge, 'A')).toEqual({ viewer: 'A', direction: 'outgoing', counterparty: 'B', relation: 'supplier' })
    expect(viewEdgeFrom(edge, 'B')).toEqual({ viewer: 'B', direction: 'incoming', counterparty: 'A', relation: 'customer' })
  })

  it('a third party sees the whole edge — the auditor/transparency POV', () => {
    expect(viewEdgeFrom({ from: 'A', to: 'B', context: 'governs' }, 'auditor')).toMatchObject({ direction: 'observer', counterparty: null })
  })

  it('symmetric relations are their own inverse (friend stays friend)', () => {
    expect(viewEdgeFrom({ from: 'A', to: 'B', context: 'friend' }, 'B').relation).toBe('friend')
  })

  it('a transfer is an outflow (give) for the payer and an inflow (take) for the payee', () => {
    const t = { payer: 'A', payee: 'B', amount: 1000 }
    expect(viewTransferFrom(t, 'A')).toEqual({ viewer: 'A', direction: 'outflow', signedAmount: -1000, role: 'give' })
    expect(viewTransferFrom(t, 'B')).toEqual({ viewer: 'B', direction: 'inflow', signedAmount: 1000, role: 'take' })
  })

  it('the two points of view always net to zero — conservation makes the switch sound', () => {
    expect(isConserved({ payer: 'A', payee: 'B', amount: 4242 })).toBe(true)
  })
})
