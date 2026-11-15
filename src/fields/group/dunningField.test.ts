import { describe, expect, it } from 'vitest'

import { dunningField, dunningHistory, historyError, pauseError, withStageEntry } from '@/fields/group/dunningField'

const NOW = '2026-11-15T10:00:00.000Z'

describe('dunningField — an overdue invoice carries its own collection process (IFRS-9 §5.5)', () => {
  it('is one group on the invoice', () => {
    expect(dunningField()).toMatchObject({ name: 'dunning', type: 'group' })
  })

  it('a stage change appends its entry, stamped with the time and the amount then due', () => {
    const next = withStageEntry({ stage: 'first_demand' }, { stage: 'reminder', stageEnteredAt: '2026-11-01T00:00:00.000Z', history: [{ id: 'a', stage: 'reminder', enteredAt: '2026-11-01T00:00:00.000Z' }] }, NOW, 120)
    expect(next.stageEnteredAt).toBe(NOW)
    expect(next.history).toEqual([
      { id: 'a', stage: 'reminder', enteredAt: '2026-11-01T00:00:00.000Z' },
      { stage: 'first_demand', enteredAt: NOW, amountOverdueAtEntry: 120 },
    ])
  })

  it('the same stage keeps its entry time, whatever a caller sends', () => {
    const kept = withStageEntry({ stage: 'reminder', stageEnteredAt: '1999-01-01' }, { stage: 'reminder', stageEnteredAt: '2026-11-01T00:00:00.000Z', history: [] }, NOW, 120)
    expect(kept.stageEnteredAt).toBe('2026-11-01T00:00:00.000Z')
    expect(kept.history).toEqual([])
  })

  it('the history is append-only', () => {
    const stored = [{ id: 'a', stage: 'reminder', enteredAt: '2026-11-01T00:00:00.000Z' }]
    expect(historyError(stored, [...stored, { stage: 'first_demand', enteredAt: NOW }])).toBe(true)
    expect(historyError(stored, [])).toMatch(/append-only/)
    expect(historyError(stored, [{ ...stored[0], stage: 'first_demand' }])).toMatch(/append-only/)
    expect(historyError(stored, [{ ...stored[0], enteredAt: NOW }])).toMatch(/append-only/)
  })

  it('a pause names its reason', () => {
    expect(pauseError(undefined, true)).toMatch(/names its reason/)
    expect(pauseError('disputed', true)).toBe(true)
    expect(pauseError(undefined, false)).toBe(true)
  })

  it('the hook refuses a rewritten history and records a stage change', async () => {
    const originalDoc = { amounts: { totalDue: 80 }, dunning: { stage: 'reminder', history: [{ id: 'a', stage: 'reminder', enteredAt: '2026-11-01T00:00:00.000Z' }] } }
    const run = (data: object) => (dunningHistory as unknown as (a: object) => unknown)({ data, originalDoc })
    expect(() => run({ dunning: { stage: 'reminder', history: [] } })).toThrow(/append-only/)
    const saved = (await run({ dunning: { stage: 'second_demand' } })) as { dunning: { history: { stage: string; amountOverdueAtEntry: number }[] } }
    expect(saved.dunning.history.at(-1)).toMatchObject({ stage: 'second_demand', amountOverdueAtEntry: 80 })
  })
})
