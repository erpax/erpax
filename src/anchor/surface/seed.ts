/**
 * anchor/surface — the reachable surfaces and the primitives that seal them, as entangled seed rows.
 *
 * Agnostic by construction: a surface kind and a NIST standard name are facts about cryptography, not
 * about any deployment. Derived from REACHABLE_SURFACES · CHANNEL_SURFACES · ROOT_STANDARDS, so the
 * guard and its seed cannot disagree about what a surface is.
 *
 * @invariant every row derives from the atom's own declared surface lists — nothing re-typed
 * @see ./index.ts -- ../../seed/row
 */
import { rowsFrom, seedAddress, type SeedRow } from '@/seed/row'

import { CHANNEL_STANDARD, CHANNEL_SURFACES, REACHABLE_SURFACES, ROOT_STANDARDS } from './index'

export const SURFACE_ATOM_UUID = 'ee796ded-9be0-805c-9339-3d76d13bae3a'

/** Each reachable surface, derived — and whether it is a channel that ML-KEM must seal. */
export const surfaceRows = (): readonly SeedRow<{
  readonly kind: string
  readonly channel: boolean
  readonly sealedBy: readonly string[]
}>[] =>
  rowsFrom(
    'anchor/surface',
    SURFACE_ATOM_UUID,
    REACHABLE_SURFACES.map((kind) => ({
      kind,
      channel: CHANNEL_SURFACES.includes(kind),
      sealedBy: CHANNEL_SURFACES.includes(kind) ? [CHANNEL_STANDARD] : kind === 'root-signing' ? ROOT_STANDARDS : [],
    })),
  )

export const surfaceSeedAddress = (): string => seedAddress(surfaceRows())
