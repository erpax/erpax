/**
 * constitution/seed — the articles, the two rules and the nine laws as ENTANGLED seed rows.
 *
 * Everything here is agnostic and reusable in any combination: an article, a root rule and a law are
 * pure declarative facts about how a change is judged — they carry no tenant, no country, no schema.
 * That is exactly what belongs in a seed, and exactly what must stay addressable when it gets there.
 *
 * Every row is DERIVED from this atom's own exports ([[seed]]: a seed is a function of its source,
 * never a re-typed constant). Edit a law and the seed moves in the same commit; there is no second
 * copy to drift. Each row is content-addressed and folded with the atom uuid ([[seed]]/row), so two
 * corpora holding this constitution hold the same rows and federate by set-union.
 *
 * @invariant every row derives from CONSTITUTION · ROOT_RULES · LAWS — no literal is written twice
 * @see ./index.ts -- ../seed/row
 */
import { rowsFrom, seedAddress, unionRows, type SeedRow } from '@/seed/row'

import { CONSTITUTION, LAWS, ROOT_RULES } from './index'

/** This atom's uuid — the parent every seed row folds in. */
export const CONSTITUTION_ATOM_UUID = 'b9b4a3cc-0558-898a-8791-4c55a26742e4'

/** The seven articles, derived — what the polity may not vote away. */
export const articleRows = (): readonly SeedRow<(typeof CONSTITUTION)[number]>[] =>
  rowsFrom('constitution', CONSTITUTION_ATOM_UUID, CONSTITUTION)

/** The two rules at the root, derived from ROOT_RULES — the axis, as data. */
export const ruleRows = (): readonly SeedRow<{ readonly rule: string; readonly statement: string }>[] =>
  rowsFrom(
    'constitution',
    CONSTITUTION_ATOM_UUID,
    Object.entries(ROOT_RULES).map(([rule, statement]) => ({ rule, statement })),
  )

/** The nine laws, derived — id, title, statement, invariant and the rule each reduces to. */
export const lawRows = (): readonly SeedRow<{
  readonly id: string
  readonly title: string
  readonly statement: string
  readonly invariant: string
  readonly rule: string
}>[] =>
  rowsFrom(
    'constitution',
    CONSTITUTION_ATOM_UUID,
    LAWS.map((l) => ({ id: l.id, title: l.title, statement: l.statement, invariant: l.invariant, rule: l.rule })),
  )

/** The whole constitution as one federated seed set — articles ⊕ rules ⊕ laws. */
export const constitutionSeed = (): readonly SeedRow<unknown>[] =>
  unionRows<unknown>(articleRows(), ruleRows(), lawRows())

/** The seed's own address — moves iff any article, rule or law moves. */
export const constitutionSeedAddress = (): string => seedAddress(constitutionSeed())
