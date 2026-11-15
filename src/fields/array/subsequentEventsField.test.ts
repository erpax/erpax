import { describe, expect, it } from 'vitest'

import { eventError, subsequentEventRules, subsequentEventsField } from '@/fields/array/subsequentEventsField'

const end = '2026-03-31T23:59:59.000Z'

describe('subsequentEventsField — IAS 10 events after the reporting period, on the period', () => {
  it('is one array on the fiscal period', () => {
    expect(subsequentEventsField()).toMatchObject({ name: 'subsequentEvents', type: 'array' })
  })

  it('an event falls after the period ends', () => {
    expect(eventError({ eventDate: '2026-03-15T00:00:00.000Z' }, end)).toMatch(/after the period ends \(2026-03-31\)/)
    expect(eventError({ eventDate: '2026-04-10T00:00:00.000Z' }, end)).toBe(true)
  })

  it('an adjusting event is booked: adjusted only with its journal entry', () => {
    expect(eventError({ classification: 'adjusting', status: 'adjusted' }, end)).toMatch(/names the journal entry/)
    expect(eventError({ classification: 'adjusting', status: 'adjusted', journalEntry: 'je-1' }, end)).toBe(true)
    expect(eventError({ classification: 'adjusting', status: 'disclosed', disclosedInFS: true }, end)).toMatch(/booked, not only disclosed/)
  })

  it('a non-adjusting event is disclosed: disclosed only once in the notes, never adjusted', () => {
    expect(eventError({ classification: 'non_adjusting', status: 'adjusted', journalEntry: 'je-1' }, end)).toMatch(/Only an adjusting event/)
    expect(eventError({ classification: 'going_concern', status: 'disclosed' }, end)).toMatch(/financial-statement notes/)
    expect(eventError({ classification: 'non_adjusting', status: 'disclosed', disclosedInFS: true }, end)).toBe(true)
  })

  it('the hook checks every row against the stored end date when the request leaves it out', () => {
    const run = (data: object, originalDoc?: object) => (subsequentEventRules as unknown as (a: object) => unknown)({ data, originalDoc })
    expect(() => run({ subsequentEvents: [{ eventDate: '2026-03-01T00:00:00.000Z' }] }, { dates: { endDate: end } })).toThrow(/Subsequent event 1/)
    expect(run({ label: 'x' }, { dates: { endDate: end } })).toEqual({ label: 'x' })
  })
})
