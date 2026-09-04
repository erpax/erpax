import { describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { foldToRoot as fusionFold } from '@/fusion'
import { foldToRoot as mergeFold } from '@/merge'
import {
  assertNoRootCollision,
  assertRootsDeclared,
  rootCollisions,
  rootSites,
  sequenceRoot,
  setRoot,
  undeclaredRoots,
} from '@/merge'

const U = [
  '11111111-1111-8111-8111-111111111111',
  '22222222-2222-8222-8222-222222222222',
  '33333333-3333-8333-8333-333333333333',
  '44444444-4444-8444-8444-444444444444',
]

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-order-'))
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}

describe('merge/order — a root addresses a SET or a SEQUENCE', () => {
  it('a SET root does not move under permutation; a SEQUENCE root does', () => {
    expect(setRoot(U)).toBe(setRoot([...U].reverse()))
    expect(sequenceRoot(U)).not.toBe(sequenceRoot([...U].reverse()))
  })

  it('they are not each other — substituting one changes the address', () => {
    expect(setRoot(U)).not.toBe(sequenceRoot(U))
  })

  it('a REORDERING tamper is invisible to a set root and caught by a sequence root', () => {
    const tampered = [U[1]!, U[0]!, U[2]!, U[3]!] // same members, different order
    expect(setRoot(U)).toBe(setRoot(tampered))
    expect(sequenceRoot(U)).not.toBe(sequenceRoot(tampered)) // this is why a receipt chains
  })

  // The live collision, pinned so it cannot be re-discovered by accident a third time.
  it('`foldToRoot` means OPPOSITE things in @/merge and @/fusion', () => {
    expect(mergeFold(U)).not.toBe(fusionFold(U))
    expect(fusionFold(U)).toBe(fusionFold([...U].reverse())) // fusion: order-free
    expect(mergeFold(U)).not.toBe(mergeFold([...U].reverse())) // merge: order-bound
    expect(fusionFold(U)).toBe(setRoot(U)) // fusion now delegates — one implementation per semantics
    expect(mergeFold(U)).toBe(sequenceRoot(U))
  })

  it('reports the collision, and only between DECLARED kinds', () => {
    const live = rootCollisions(process.cwd())
    expect(live.map((c) => c.name)).toEqual(['foldToRoot'])
    expect(live[0]!.sites.map((s) => s.kind).sort()).toEqual(['sequence', 'set'])
    expect(() => assertNoRootCollision(process.cwd(), 1)).not.toThrow()
    expect(() => assertNoRootCollision(process.cwd(), 0)).toThrow(/two order semantics/)
  })

  it('two UNDECLARED roots sharing a name are not a collision — guessing would fabricate one', () => {
    const root = tree({
      'a/index.ts': 'export function thingRoot(u: readonly string[]): string { return u.join() }\n',
      'b/index.ts': 'export function thingRoot(u: readonly string[]): string { return u.join() }\n',
    })
    expect(rootCollisions(root)).toEqual([])
    expect(undeclaredRoots(root)).toHaveLength(2)
  })

  it('an ARITHMETIC root is not a collection root — read from the signature, not the name', () => {
    const root = tree({
      'a/index.ts': [
        '/** mod-9 fold of a number. */',
        'export function digitalRoot(n: number): number { return n % 9 }',
        '/** address of a collection. */',
        'export function corpusRoot(u: readonly string[]): string { return u.join() }',
      ].join('\n'),
    })
    expect(rootSites(root).map((s) => s.name)).toEqual(['corpusRoot'])
  })

  it('the corpus is at or under its ceiling', () => {
    expect(() => assertRootsDeclared(process.cwd(), 8)).not.toThrow()
    expect(undeclaredRoots(process.cwd()).length).toBeLessThanOrEqual(8)
  })
})
