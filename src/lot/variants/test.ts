import { describe, it, expect } from 'vitest'
import LotVariants, { rollUpLotVariantOptions } from '@/lot/variants'
import type { CollectionBeforeChangeHook } from 'payload'

// lot/variants — the roll-up law: the variant total IS the sum of its option
// postings. `rollUpLotVariantOptions` (beforeChange) DERIVES units / unitsProduced
// from options[] so they can never drift from their parts (computed-not-stored).

// The hook signature only reads `data`; the other args are unused by the impl.
const run = (data: Record<string, unknown>): Record<string, unknown> => {
  const hook = rollUpLotVariantOptions as CollectionBeforeChangeHook
   
  return hook({ data, operation: 'create', req: {} } as any) as Record<string, unknown>
}

describe('lot/variants — the option roll-up (Σ options = total)', () => {
  it('derives units = Σ options[].units and unitsProduced = Σ options[].produced', () => {
    const out = run({
      options: [
        { units: 3, produced: 2 },
        { units: 5, produced: 4 },
        { units: 2, produced: 1 },
      ],
    })
    expect(out.units).toBe(10)
    expect(out.unitsProduced).toBe(7)
  })

  it('the derived total OVERRIDES any pre-supplied total (computed-not-stored)', () => {
    const out = run({
      units: 999,
      unitsProduced: 999,
      options: [
        { units: 1, produced: 0 },
        { units: 1, produced: 1 },
      ],
    })
    expect(out.units).toBe(2)
    expect(out.unitsProduced).toBe(1)
  })

  it('treats missing option counters as 0', () => {
    const out = run({
      options: [{ units: 4 }, { produced: 3 }, {}],
    })
    expect(out.units).toBe(4)
    expect(out.unitsProduced).toBe(3)
  })

  it('does NOT touch the totals when options[] is absent or empty', () => {
    const noOptions = run({ units: 42, unitsProduced: 7 })
    expect(noOptions.units).toBe(42)
    expect(noOptions.unitsProduced).toBe(7)

    const emptyOptions = run({ units: 42, unitsProduced: 7, options: [] })
    expect(emptyOptions.units).toBe(42)
    expect(emptyOptions.unitsProduced).toBe(7)
  })

  it('exposes a lot-variants collection wired with the roll-up beforeChange hook', () => {
    expect(LotVariants.slug).toBe('lot-variants')
    expect(LotVariants.hooks?.beforeChange).toContain(rollUpLotVariantOptions)
    const fieldNames = (LotVariants.fields ?? [])
      .map((f) => ('name' in f ? f.name : undefined))
      .filter(Boolean)
    expect(fieldNames).toContain('options')
    expect(fieldNames).toContain('units')
    expect(fieldNames).toContain('unitsProduced')
    expect(fieldNames).toContain('lot')
  })
})
