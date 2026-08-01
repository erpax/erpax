import { describe, expect, it } from 'vitest'

import { CONSTITUTION, LAWS, ROOT_RULES } from '@/constitution'
import { articleRows, constitutionSeed, constitutionSeedAddress, lawRows, ruleRows, CONSTITUTION_ATOM_UUID } from '@/constitution/seed'
import { MILLENNIUM } from '@/millennium'
import { problemRows } from '@/millennium/seed'
import { REACHABLE_SURFACES } from '@/anchor/surface'
import { surfaceRows } from '@/anchor/surface/seed'
import { TRELLO_LIMITS } from '@/trello'
import { limitRows } from '@/trello/seed'

import { contentAddress, rowsFrom, seedAddress, unboundRows, unionRows } from './index'

const ATOM = 'fixture'
const UUID = 'b9b4a3cc-0558-898a-8791-4c55a26742e4'

describe('seed/row — the entanglement continued one scale down', () => {
  it('same content ⇒ same uuid, so federation is set-union', () => {
    const a = rowsFrom(ATOM, UUID, [{ k: 1 }, { k: 2 }])
    const b = rowsFrom(ATOM, UUID, [{ k: 2 }, { k: 1 }]) // same content, other order
    expect(a.map((r) => r.uuid).sort()).toEqual(b.map((r) => r.uuid).sort())
    // merging a fork of itself converges instead of duplicating — idempotent by construction
    expect(unionRows(a, b)).toHaveLength(2)
    expect(unionRows(a, a, b)).toHaveLength(2)
    expect(seedAddress(a)).toBe(seedAddress(b)) // order-independent seed address
  })

  it('key ORDER cannot move an address — the canonical fold, not JSON.stringify', () => {
    expect(contentAddress({ a: 1, b: 2 })).toBe(contentAddress({ b: 2, a: 1 }))
    expect(contentAddress({ a: 1 })).not.toBe(contentAddress({ a: 2 }))
  })

  it('a row folds in its ATOM — re-parenting moves the address, so a row cannot be silently adopted', () => {
    const mine = rowsFrom(ATOM, UUID, [{ k: 1 }])
    const theirs = rowsFrom(ATOM, '25b8305e-6dab-8f45-b18b-905723ef91c9', [{ k: 1 }])
    expect(mine[0]!.content).toBe(theirs[0]!.content) // same content …
    expect(mine[0]!.uuid).not.toBe(theirs[0]!.uuid) // … different parent, different address
    expect(unboundRows(mine, UUID)).toEqual([])
    expect(unboundRows(mine, 'ee796ded-9be0-805c-9339-3d76d13bae3a')).toHaveLength(1) // detects the re-parent
  })

  it('a tampered row is caught — the uuid must recompute from its own content', () => {
    const [row] = rowsFrom(ATOM, UUID, [{ amount: 100 }])
    const tampered = { ...row!, value: { amount: 999 } }
    expect(unboundRows([tampered], UUID)).toHaveLength(1)
  })
})

describe('seed/row — every seed is DERIVED from its atom, never re-typed', () => {
  it('constitution: articles · rules · laws all come from the atom itself', () => {
    expect(articleRows()).toHaveLength(CONSTITUTION.length)
    expect(ruleRows()).toHaveLength(Object.keys(ROOT_RULES).length)
    expect(lawRows()).toHaveLength(LAWS.length)
    // the values ARE the atom's — not a copy that can drift
    expect(articleRows().map((r) => r.value.id)).toEqual(CONSTITUTION.map((a) => a.id))
    expect(lawRows().map((r) => r.value.id)).toEqual(LAWS.map((l) => l.id))
    expect(lawRows().map((r) => r.value.rule)).toEqual(LAWS.map((l) => l.rule))
    // the whole constitution is one federated set, every row bound to the atom
    expect(constitutionSeed()).toHaveLength(CONSTITUTION.length + 2 + LAWS.length)
    expect(unboundRows(constitutionSeed(), CONSTITUTION_ATOM_UUID)).toEqual([])
    expect(constitutionSeedAddress()).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('millennium: the seed cannot claim what the register forbids', () => {
    expect(problemRows()).toHaveLength(MILLENNIUM.length)
    for (const r of problemRows()) expect(r.value.corpusSolves as boolean).toBe(false)
  })

  it('anchor/surface and trello derive from their own declared tables', () => {
    expect(surfaceRows()).toHaveLength(REACHABLE_SURFACES.length)
    expect(surfaceRows().find((r) => r.value.kind === 'channel-keying')!.value.sealedBy).toEqual(['ML-KEM'])
    expect(limitRows()).toHaveLength(Object.keys(TRELLO_LIMITS).length)
    expect(limitRows().find((r) => r.value.scope === 'token')!.value.capacity).toBe(TRELLO_LIMITS.token.capacity)
  })

  it('the seed address MOVES when the source moves — the two cannot drift apart', () => {
    const before = seedAddress(rowsFrom(ATOM, UUID, LAWS.map((l) => ({ id: l.id, rule: l.rule }))))
    const after = seedAddress(rowsFrom(ATOM, UUID, LAWS.map((l) => ({ id: l.id, rule: 'no-expectation' }))))
    expect(before).not.toBe(after)
  })
})
