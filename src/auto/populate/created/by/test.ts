import { describe, it, expect } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'

// A pure beforeChange gate: it stamps `createdBy` from the request user, only on
// create, only when absent. Exercise the gate logic with minimal typed args — no
// DB, no network. The hook's first parameter is the only thing it reads.
type HookArgs = Parameters<CollectionBeforeChangeHook>[0]

const run = (args: Partial<HookArgs>): Promise<Record<string, unknown>> =>
  autoPopulateCreatedBy({ data: {}, req: {}, operation: 'create', ...args } as HookArgs) as Promise<
    Record<string, unknown>
  >

describe('auto/populate/created/by — authorship attribution on create', () => {
  it('stamps createdBy from req.user.id on create when absent', async () => {
    const data: Record<string, unknown> = {}
    const out = await run({ data, req: { user: { id: 'u-1' } } as HookArgs['req'], operation: 'create' })
    expect(out.createdBy).toBe('u-1')
    // mutates and returns the same data object
    expect(out).toBe(data)
  })

  it('does not stamp on update (only create)', async () => {
    const out = await run({ req: { user: { id: 'u-1' } } as HookArgs['req'], operation: 'update' })
    expect(out.createdBy).toBeUndefined()
  })

  it('never overwrites an existing createdBy', async () => {
    const out = await run({
      data: { createdBy: 'original' },
      req: { user: { id: 'u-2' } } as HookArgs['req'],
      operation: 'create',
    })
    expect(out.createdBy).toBe('original')
  })

  it('does nothing without a request user', async () => {
    const out = await run({ req: {} as HookArgs['req'], operation: 'create' })
    expect(out.createdBy).toBeUndefined()
  })
})
