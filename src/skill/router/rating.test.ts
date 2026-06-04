import { describe, expect, it } from 'vitest'

import type { SkillNode } from '@/skill/router/resolve'
import { rate, rateAll } from '@/skill/router/rating'

const node = (name: string, related: string[] = []): SkillNode => ({
  route: `/${name}/SKILL`,
  path: [name],
  name,
  description: '',
  content: '',
  ancestors: [],
  siblings: [],
  children: [],
  related,
})

describe('rating — every [[link]] is a vote; rating = distinct incoming attestations', () => {
  // balance attested by transaction + flow; flow attested by transaction; orphan by none.
  const transaction = node('transaction', ['balance', 'flow'])
  const flow = node('flow', ['balance'])
  const balance = node('balance')
  const orphan = node('orphan')
  const index = [transaction, flow, balance, orphan]

  it('counts distinct incoming attestations', () => {
    expect(rate('balance', index).confirmations).toBe(2) // transaction + flow
    expect(rate('flow', index).confirmations).toBe(1) // transaction
    expect(rate('orphan', index).confirmations).toBe(0) // none
  })

  it('an orphan rates 0 — nothing confirms it (rating and tamper-cost both 0)', () => {
    expect(rate('orphan', index).rating).toBe(0)
    expect(rate('orphan', index).tamperCost).toBe(0)
  })

  it('rating is normalized 0..1 against the most-attested atom', () => {
    expect(rate('balance', index).rating).toBe(1) // balance is the max (2 votes)
    expect(rate('flow', index).rating).toBeCloseTo(0.5)
  })

  it('tamperCost equals the attestation count (the forger must fool each)', () => {
    expect(rate('balance', index).tamperCost).toBe(2)
  })

  it('a duplicate attester counts once — the merge law, no ballot stuffing', () => {
    const idx = [node('transaction', ['balance', 'balance']), node('balance')]
    expect(rate('balance', idx).confirmations).toBe(1)
  })

  it('self-links never count', () => {
    expect(rate('selfish', [node('selfish', ['selfish'])]).confirmations).toBe(0)
  })

  it('rateAll is descending + comparable across the whole corpus', () => {
    const all = rateAll(index)
    expect(all[0].subject).toBe('balance')
    expect(all.map((r) => r.subject)).toContain('orphan')
  })
})
