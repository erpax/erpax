import { describe, it, expect } from 'vitest'
import { combinations, deriveVariants, keyOf, missing } from '@/ecommerce/variants'

describe('ecommerce/variants — the combinations are computed', () => {
  it('is the cartesian product, in group order', () => {
    expect(combinations([['s', 'm'], ['red', 'blue']])).toEqual([['s', 'red'], ['s', 'blue'], ['m', 'red'], ['m', 'blue']])
  })

  it('has as many members as the product of the group sizes', () => {
    expect(combinations([['a', 'b', 'c'], ['x', 'y'], ['1', '2']])).toHaveLength(12)
  })

  it('yields nothing for no groups, or for a group with no option', () => {
    expect(combinations([])).toEqual([])
    expect(combinations([['s'], []])).toEqual([])
  })
})

describe('ecommerce/variants — a combination is a set', () => {
  it('ignores order', () => {
    expect(keyOf(['red', 's'])).toBe(keyOf(['s', 'red']))
  })

  it('reports only what no existing variant covers, once each', () => {
    expect(missing([['s', 'red'], ['m', 'red'], ['red', 'm']], [['red', 's']])).toEqual([['m', 'red']])
  })
})

/** A stand-in for the two reads and one write the hook makes. */
function fake(variants: { options: string[] }[]) {
  const created: Record<string, unknown>[] = []
  const calls: Record<string, unknown>[] = []
  const payload = {
    find: async (args: { collection: string }) => {
      calls.push(args)
      if (args.collection === 'variantOptions') {
        return { docs: [
          { id: 's', variantType: 'size', label: 'S' }, { id: 'm', variantType: 'size', label: 'M' },
          { id: 'red', variantType: 'colour', label: 'Red' },
        ] }
      }
      return { docs: variants }
    },
    create: async (args: { data: Record<string, unknown> }) => {
      calls.push(args)
      created.push(args.data)
      return args.data
    },
  }
  const req = { payload }
  const run = (doc: Record<string, unknown>, context: Record<string, unknown> = {}) =>
    deriveVariants({ doc, req, context } as unknown as Parameters<typeof deriveVariants>[0])
  return { run, created, calls, req }
}

const product = { id: 'p1', title: 'Shirt', enableVariants: true, variantTypes: ['size', { id: 'colour' }], tenant: { id: 't1' } }

describe('ecommerce/variants — the hook derives what is missing', () => {
  it('creates one draft per uncovered combination, in the product tenant, titled by its options', async () => {
    const f = fake([{ options: ['red', 's'] }])
    await f.run(product)
    expect(f.created).toEqual([
      { product: 'p1', options: ['m', 'red'], title: 'Shirt — M / Red', _status: 'draft', tenant: 't1' },
    ])
  })

  it('passes the request to every nested operation and flags its own writes', async () => {
    const f = fake([])
    await f.run(product)
    expect(f.calls.every((c) => c.req === f.req)).toBe(true)
    expect(f.calls.filter((c) => 'data' in c).every((c) => (c.context as { variantsDerived?: boolean }).variantsDerived)).toBe(true)
  })

  it('writes nothing when every combination already has a variant', async () => {
    const f = fake([{ options: ['s', 'red'] }, { options: ['m', 'red'] }])
    await f.run(product)
    expect(f.created).toEqual([])
  })

  it('does nothing for a product without variants, or for its own writes', async () => {
    const f = fake([])
    await f.run({ ...product, enableVariants: false })
    await f.run(product, { variantsDerived: true })
    expect(f.calls).toEqual([])
  })
})
