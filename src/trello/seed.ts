/**
 * trello/seed — the published rate limits as entangled seed rows.
 *
 * A vendor's published limit is reference data: agnostic to any tenant, reusable wherever the client
 * runs. Derived from TRELLO_LIMITS so the limiter and the seed cannot disagree — if Trello changes a
 * published limit, one edit moves both.
 *
 * @invariant the rows derive from TRELLO_LIMITS — the limiter's own table, never a second copy
 * @see ./index.ts -- ../seed/row
 */
import { rowsFrom, seedAddress, type SeedRow } from '@/seed/row'

import { TRELLO_LIMITS } from './index'

export const TRELLO_ATOM_UUID = 'aa2c6916-7d7f-8077-ac63-ef243e2400a8'

/** The per-key and per-token limits, derived from the client's own table. */
export const limitRows = (): readonly SeedRow<{
  readonly scope: string
  readonly capacity: number
  readonly windowMs: number
}>[] =>
  rowsFrom(
    'trello',
    TRELLO_ATOM_UUID,
    Object.entries(TRELLO_LIMITS).map(([scope, l]) => ({ scope, capacity: l.capacity, windowMs: l.windowMs })),
  )

export const trelloSeedAddress = (): string => seedAddress(limitRows())
