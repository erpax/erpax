/**
 * millennium/seed — the seven Clay problems as entangled seed rows.
 *
 * The register is canonical reference data in the same sense as the SNA-2008 sectors or the SDG goals
 * already seeded in this corpus: facts about the world, agnostic to any tenant, reusable in any
 * combination. Derived from MILLENNIUM, so `corpusSolves` stays the literal `false` in the seed too —
 * the seed cannot claim what the register forbids.
 *
 * @invariant every row derives from MILLENNIUM — seven rows, none of them asserting a corpus solution
 * @see ./index.ts -- ../seed/row
 */
import { rowsFrom, seedAddress, type SeedRow } from '@/seed/row'

import { MILLENNIUM } from './index'

export const MILLENNIUM_ATOM_UUID = '25b8305e-6dab-8f45-b18b-905723ef91c9'

/** The seven problems, derived — name, open/solved, solver, lens, and the perpetual `corpusSolves: false`. */
export const problemRows = (): readonly SeedRow<(typeof MILLENNIUM)[number]>[] =>
  rowsFrom('millennium', MILLENNIUM_ATOM_UUID, MILLENNIUM)

export const millenniumSeedAddress = (): string => seedAddress(problemRows())
