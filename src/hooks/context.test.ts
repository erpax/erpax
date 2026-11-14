import { describe, expect, it } from 'vitest'
import type { PayloadRequest } from 'payload'
import { flagged } from '@/hooks/context'

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
