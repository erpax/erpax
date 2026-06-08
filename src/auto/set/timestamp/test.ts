/**
 * auto/set/timestamp (trinity proof) — a beforeChange hook FACTORY that records a
 * status-transition time exactly once: it writes canonical UTC ISO-8601 onto the
 * configured field only when the condition fires AND the field is empty, never
 * overwriting an existing value. Pure: minimal typed args, no DB, no `any`.
 * @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import { autoSetTimestamp } from '@/auto/set/timestamp'

type HookArgs = Parameters<CollectionBeforeChangeHook>[0]

const fire = (hook: CollectionBeforeChangeHook, data: Record<string, unknown>): Promise<Record<string, unknown>> =>
  hook({ data, req: {}, operation: 'update', collection: undefined } as unknown as HookArgs) as Promise<Record<string, unknown>>

const ISO_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

describe('auto/set/timestamp — verifiable event time on transition', () => {
  it('stamps canonical UTC ISO-8601 onto the field when the condition fires', async () => {
    const hook = autoSetTimestamp('postedAt', (d) => d.status === 'posted')
    const data: Record<string, unknown> = { status: 'posted' }
    const out = await fire(hook, data)
    expect(typeof out.postedAt).toBe('string')
    expect(out.postedAt as string).toMatch(ISO_UTC)
    // mutates and returns the same data object
    expect(out).toBe(data)
  })

  it('does not stamp when the condition is false', async () => {
    const hook = autoSetTimestamp('approvedAt', (d) => d.status === 'approved')
    const out = await fire(hook, { status: 'draft' })
    expect(out.approvedAt).toBeUndefined()
  })

  it('never overwrites an already-set timestamp (set once, on first occurrence)', async () => {
    const hook = autoSetTimestamp('reconciledAt', () => true)
    const out = await fire(hook, { reconciledAt: '2020-01-01T00:00:00.000Z' })
    expect(out.reconciledAt).toBe('2020-01-01T00:00:00.000Z')
  })

  it('targets the configured field name (factory is reusable)', async () => {
    const hook = autoSetTimestamp('authorizedAt', () => true)
    const out = await fire(hook, {})
    expect(out.authorizedAt as string).toMatch(ISO_UTC)
    expect(out.postedAt).toBeUndefined()
  })
})
