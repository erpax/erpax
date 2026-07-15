import { describe, it, expect } from 'vitest'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  atomPath,
  atomDeeds,
  changedAtoms,
  rosettaGate,
  loadReceipt,
  writeReceipt,
  formatVerdict,
} from './index'

/** A tiny synthetic corpus of deed nodes — enough to exercise the fold without the 3178-atom matrix. */
const NODES = [
  { path: 'a', horo: 1, uuid: 'uuid-a', prev: 'z', next: 'b' },
  { path: 'b', horo: 5, uuid: 'uuid-b', prev: 'a', next: 'c' },
  { path: 'c', horo: 9, uuid: 'uuid-c', prev: 'b', next: 'z' },
] as const

describe('gate/rosetta — the incremental fold-first gate', () => {
  it('exports its atom path', () => {
    expect(atomPath).toBe('gate/rosetta')
  })

  it('atomDeeds keys every atom by path to a stable deed', () => {
    const d1 = atomDeeds(NODES)
    const d2 = atomDeeds(NODES)
    expect(Object.keys(d1).sort()).toEqual(['a', 'b', 'c'])
    expect(d1).toEqual(d2) // deterministic — same input ⇒ same deeds
  })

  it('changedAtoms is the deed diff — added, removed, altered', () => {
    const before = { a: 'd1', b: 'd2', c: 'd3' }
    expect(changedAtoms(before, { a: 'd1', b: 'd2', c: 'd3' })).toEqual([]) // unchanged
    expect(changedAtoms(before, { a: 'd1', b: 'X', c: 'd3' })).toEqual(['b']) // altered
    expect(changedAtoms(before, { a: 'd1', b: 'd2', c: 'd3', d: 'd4' })).toEqual(['d']) // added
    expect(changedAtoms(before, { a: 'd1', b: 'd2' })).toEqual(['c']) // removed
    expect(changedAtoms(undefined, before).sort()).toEqual(['a', 'b', 'c']) // genesis: all new
  })

  it('genesis gate seals a receipt and passes; the re-run short-circuits O(1)', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-gate-'))
    const first = rosettaGate(cwd, NODES)
    expect(first.pass).toBe(true)
    expect(first.sealed).toBe(true)
    expect(first.shortCircuit).toBe(false) // genesis verifies the changed (all) atoms
    expect(first.changed.length).toBe(3)

    const receipt = loadReceipt(cwd)
    expect(receipt).not.toBeNull()
    expect(receipt!.root).toBe(first.root)
    expect(receipt!.protocol.length).toBe(1) // one sealed act

    // Unchanged corpus ⇒ same root ⇒ O(1) short-circuit, no per-atom work, no new act.
    const second = rosettaGate(cwd, NODES)
    expect(second.shortCircuit).toBe(true)
    expect(second.pass).toBe(true)
    expect(second.changed).toEqual([])
    expect(second.root).toBe(first.root)
    expect(loadReceipt(cwd)!.protocol.length).toBe(1) // short-circuit does NOT append
  })

  it('a changed atom flips the root and re-verifies only the changed one', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-gate-'))
    const genesis = rosettaGate(cwd, NODES) // seal genesis

    const mutated = [NODES[0], { ...NODES[1], uuid: 'uuid-b2' }, NODES[2]]
    const v = rosettaGate(cwd, mutated)
    expect(v.shortCircuit).toBe(false)
    expect(v.root).not.toBe(genesis.root) // the root moved because b's deed changed
    expect(v.changed).toEqual(['b']) // ONLY b's deed changed
    expect(v.pass).toBe(true)
    expect(loadReceipt(cwd)!.protocol.length).toBe(2) // a second chained act sealed
  })

  it('the notary chain is tamper-evident — a forged receipt fails the seal check', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-gate-'))
    rosettaGate(cwd, NODES)
    const receipt = loadReceipt(cwd)!
    // Forge: keep the root but tamper the sealed act's record ⇒ chainIntact must reject on next run.
    const forged = {
      ...receipt,
      protocol: receipt.protocol.map((a) => ({ ...a, record: 'forged-root' })),
    }
    writeReceipt(forged, cwd)
    const v = rosettaGate(cwd, NODES) // same root ⇒ short-circuit path, but chain is broken
    expect(v.shortCircuit).toBe(true)
    expect(v.sealed).toBe(false) // the tamper is caught
    expect(v.pass).toBe(false)
  })

  it('formatVerdict names the honest structure-vs-semantics boundary', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-gate-'))
    const out = formatVerdict(rosettaGate(cwd, NODES))
    expect(out).toContain('semantic lanes')
    expect(out).toContain('does NOT replace them')
  })
})
