/**
 * The keys hooks agree on in `req.context` — https://payloadcms.com/docs/hooks/context
 *
 * A hook that writes back through the Local API passes `req` (same transaction) and a flag, and
 * returns early when it meets its own flag again. Payload merges a passed context onto the SAME
 * request object, so a flag would otherwise stay set for every later hook of the outer request —
 * the next document in a bulk write would be skipped. `flagged` takes the flag off again.
 */
import type { PayloadRequest, RequestContext } from 'payload'

declare module 'payload' {
  export interface RequestContext {
    /** set while a posting hook links its journal entry back onto the source document */
    journalEntryLinked?: boolean
    /** set while the payroll disbursement hook links its payment run back */
    paymentRunLinked?: boolean
    /** set while closing entries are linked to the reversals generated for them */
    reversalsLinked?: boolean
    /** set while a finished work order hands its quantities to the next phase */
    workOrderForwarded?: boolean
  }
}

type Flag = 'journalEntryLinked' | 'paymentRunLinked' | 'reversalsLinked' | 'workOrderForwarded'

/** Run `write` with `flag` set in the request context, and restore the context afterwards. */
export async function flagged<T>(req: PayloadRequest, flag: Flag, write: (context: RequestContext) => Promise<T>): Promise<T> {
  const before = req.context
  try {
    return await write({ [flag]: true })
  } finally {
    req.context = before
  }
}
