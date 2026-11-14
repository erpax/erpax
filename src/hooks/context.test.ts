import { describe, expect, it } from 'vitest'
import type { PayloadRequest } from 'payload'
import { flagged, remembered } from '@/hooks/context'

const request = (context: Record<string, unknown> = {}) => ({ context }) as unknown as PayloadRequest

describe('hooks/context — a flag lasts as long as the write it guards', () => {
  it('hands the flag to the write and returns what the write returns', async () => {
    const req = request()
    expect(await flagged(req, 'journalEntryLinked', async (context) => context)).toEqual({ journalEntryLinked: true })
  })

  it('takes the flag off the request afterwards — Payload merges a passed context onto the same request', async () => {
    const req = request({ kept: 1 })
    await flagged(req, 'paymentRunLinked', async (context) => {
      req.context = { ...req.context, ...context } // what createLocalReq does with a passed req
      expect(req.context?.paymentRunLinked).toBe(true)
    })
    expect(req.context).toEqual({ kept: 1 })
  })

  it('restores the context when the write throws', async () => {
    const req = request()
    await expect(flagged(req, 'reversalsLinked', async (context) => { req.context = context; throw new Error('no') })).rejects.toThrow('no')
    expect(req.context).toEqual({})
  })
})

describe('remembered — a value computed once per request', () => {
  it('computes on first use and returns the same value afterwards', async () => {
    const req = { context: {} } as unknown as Parameters<typeof remembered>[0]
    let computed = 0
    const compute = async () => { computed++; return { n: computed } }
    const first = await remembered(req, 'ability', compute)
    expect(await remembered(req, 'ability', compute)).toBe(first)
    expect(computed).toBe(1)
  })
  it('two callers that start together still compute it once', async () => {
    const req = { context: {} } as unknown as Parameters<typeof remembered>[0]
    let computed = 0
    const compute = async () => { computed++; await Promise.resolve(); return computed }
    expect(await Promise.all([remembered(req, 'ability', compute), remembered(req, 'ability', compute)])).toEqual([1, 1])
  })
  it('is per request: another request computes its own', async () => {
    let computed = 0
    const compute = async () => ++computed
    await remembered({ context: {} } as unknown as Parameters<typeof remembered>[0], 'ability', compute)
    await remembered({ context: {} } as unknown as Parameters<typeof remembered>[0], 'ability', compute)
    expect(computed).toBe(2)
  })
  it('works on a request that has no context yet', async () => {
    const req = {} as unknown as Parameters<typeof remembered>[0]
    expect(await remembered(req, 'ability', async () => 7)).toBe(7)
  })
})
