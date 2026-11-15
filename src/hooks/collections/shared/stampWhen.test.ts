import { describe, it, expect } from 'vitest'
import { stampWhen } from '@/hooks/collections/shared/stampWhen'

const run = (args: object) => (stampWhen('signed') as unknown as (a: object) => unknown)(args)

describe('stampWhen — a row stamps the moment it reaches a status', () => {
  it('stamps when the row first has the status, ignoring what the caller sent', () => {
    const stamped = run({ siblingData: { status: 'signed' }, previousSiblingDoc: { status: 'awaiting_signature' }, previousValue: null, value: '1999-01-01' })
    expect(typeof stamped).toBe('string')
    expect(stamped).not.toBe('1999-01-01')
  })

  it('keeps the first stamp while the row keeps the status', () => {
    expect(run({ siblingData: { status: 'signed' }, previousSiblingDoc: { status: 'signed' }, previousValue: '2026-02-01T00:00:00.000Z', value: '1999-01-01' })).toBe(
      '2026-02-01T00:00:00.000Z',
    )
  })

  it('clears when the row leaves the status', () => {
    expect(run({ siblingData: { status: 'rejected' }, previousSiblingDoc: { status: 'signed' }, previousValue: '2026-02-01T00:00:00.000Z' })).toBeNull()
  })
})

describe('stampWhen — any of several statuses', () => {
  const ended = (args: object) => (stampWhen(['resolved', 'written_off']) as unknown as (a: object) => unknown)(args)

  it('stamps on the first of them and keeps the stamp moving between them', () => {
    expect(typeof ended({ siblingData: { status: 'resolved' }, previousSiblingDoc: { status: 'active' }, previousValue: null })).toBe('string')
    expect(ended({ siblingData: { status: 'written_off' }, previousSiblingDoc: { status: 'resolved' }, previousValue: '2026-03-01T00:00:00.000Z' })).toBe(
      '2026-03-01T00:00:00.000Z',
    )
  })

  it('clears when the row leaves all of them', () => {
    expect(ended({ siblingData: { status: 'active' }, previousSiblingDoc: { status: 'written_off' }, previousValue: '2026-03-01T00:00:00.000Z' })).toBeNull()
  })
})
