import { describe, expect, it } from 'vitest'

import type { SkillNode } from './resolve'
import { relatedSubgraph } from './subgraph'

const node = (
  name: string,
  rel: { related?: string[]; ancestors?: string[]; children?: string[] } = {},
): SkillNode => ({
  route: `/${name}/SKILL`,
  path: [name],
  name,
  description: '',
  content: '',
  ancestors: rel.ancestors ?? [],
  siblings: [],
  children: rel.children ?? [],
  related: rel.related ?? [],
})

describe('subgraph — the per-message aura (load related skills, flag absent neighbours)', () => {
  const transaction = node('transaction', { related: ['balance', 'flow', 'ghost'] })
  const balance = node('balance', { related: ['transaction'] })
  const flow = node('flow')
  const index = [transaction, balance, flow]

  it('loads the seed + its present related neighbours (the harmonic context)', () => {
    const g = relatedSubgraph(transaction, index, 1)
    const names = g.atoms.map((a) => a.name).sort()
    expect(names).toEqual(['balance', 'flow', 'transaction'])
  })

  it('flags an absent neighbour as a dynamic gap (the gap discovered by use)', () => {
    const g = relatedSubgraph(transaction, index, 1)
    expect(g.gaps).toEqual(['ghost'])
  })

  it('coverage = loaded / (loaded + gaps) — the skill-completeness ratio', () => {
    const g = relatedSubgraph(transaction, index, 1)
    expect(g.coverage).toBeCloseTo(3 / 4) // 3 atoms, 1 gap
  })

  it('full coverage (1) when every neighbour resolves', () => {
    const g = relatedSubgraph(balance, index, 1)
    expect(g.gaps).toEqual([])
    expect(g.coverage).toBe(1)
  })

  it('resolves links by canonical norm (case/hyphen-insensitive), like the gates', () => {
    const seed = node('seed', { related: ['Gl-Accounts'] })
    const gl = node('glaccounts')
    const g = relatedSubgraph(seed, [seed, gl], 1)
    expect(g.gaps).toEqual([]) // [[Gl-Accounts]] resolves to the glaccounts atom
    expect(g.atoms.map((a) => a.name)).toContain('glaccounts')
  })

  it('depth>1 expands transitively without revisiting (the wider neighbourhood)', () => {
    const a = node('a', { related: ['b'] })
    const b = node('b', { related: ['c'] })
    const c = node('c', { related: ['a'] })
    const g = relatedSubgraph(a, [a, b, c], 2)
    expect(g.atoms.map((x) => x.name).sort()).toEqual(['a', 'b', 'c'])
  })

  it('a route-form ref resolves by its leaf word', () => {
    const seed = node('seed', { related: ['/services/exchange/SKILL'] })
    const exchange = node('exchange')
    const g = relatedSubgraph(seed, [seed, exchange], 1)
    expect(g.gaps).toEqual([])
  })
})
