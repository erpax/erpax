import { describe, expect, it } from 'vitest'

import { applyPlan, assertMigration, isDeterministic, isIdempotent, type Move, NotAMigration, planOf } from './index'

const TREE = ['src/a/thing.ts', 'src/b/other.ts', 'src/c/keep.ts']

/** A real rule: fold a hyphenated stem into a nested path. Settles after one pass. */
const fold = (tree: readonly string[]): Move[] =>
  tree
    .filter((p) => /\/[a-z]+-[a-z]+\.ts$/.test(p))
    .map((p) => ({ from: p, to: p.replace(/\/([a-z]+)-([a-z]+)\.ts$/, '/$1/$2.ts'), reason: 'hyphen is a slash' }))

describe('migrate — a plan is a canonical value', () => {
  it('the plan is SORTED, so traversal order cannot change what the migration is', () => {
    const moves: Move[] = [
      { from: 'z', to: 'zz', reason: 'r' },
      { from: 'a', to: 'aa', reason: 'r' },
      { from: 'm', to: 'mm', reason: 'r' },
    ]
    expect(planOf(moves).map((m) => m.to)).toEqual(['aa', 'mm', 'zz'])
    // the same moves in any order are the same plan — that IS determinism, in one line
    expect(planOf([...moves].reverse())).toEqual(planOf(moves))
  })

  it('a REASONLESS cut is refused before anything moves', () => {
    expect(() => planOf([{ from: 'a', to: 'b', reason: '   ' }])).toThrow(NotAMigration)
    expect(() => planOf([{ from: 'a', to: 'b', reason: '' }])).toThrow(/names no reason/)
  })
})

describe('migrate — deterministic and idempotent, or it is a sweep', () => {
  it('a real rule is deterministic and settles after one pass', () => {
    const tree = ['src/a/gl-account.ts', 'src/b/plain.ts']
    expect(isDeterministic(() => fold(tree))).toBe(true)
    expect(isIdempotent(tree, fold)).toBe(true)
    expect(applyPlan(tree, planOf(fold(tree)))).toEqual(['src/a/gl/account.ts', 'src/b/plain.ts'])
    expect(() => assertMigration(tree, fold)).not.toThrow()
  })

  it('AN UNSTABLE RULE IS REFUSED — a plan that differs between runs is not a rule', () => {
    let n = 0
    const drifting = (): Move[] => [{ from: 'a', to: `b${(n += 1)}`, reason: 'depends on when it ran' }]
    expect(isDeterministic(drifting)).toBe(false)
    expect(() => assertMigration(TREE, drifting)).toThrow(/that is a sweep, not a rule/)
  })

  it('AN OSCILLATING RULE IS REFUSED — its output still matches its own trigger', () => {
    // the classic: the rename produces a name the pattern matches again, so every run moves it once more
    const forever = (tree: readonly string[]): Move[] =>
      tree.map((p) => ({ from: p, to: `${p}.moved`, reason: 'always has more to do' }))
    expect(isIdempotent(TREE, forever)).toBe(false)
    expect(() => assertMigration(TREE, forever)).toThrow(NotAMigration)
    expect(() => assertMigration(TREE, forever)).toThrow(/never settles/)
  })

  it('applying a settled plan TWICE equals applying it once — the interrupted-batch case', () => {
    const tree = ['src/a/gl-account.ts', 'src/x/saf-t.ts']
    const once = applyPlan(tree, planOf(fold(tree)))
    const twice = applyPlan(once, planOf(fold(once)))
    expect(twice).toEqual(once)
  })

  it('a rule with nothing to do is trivially both — an empty plan is settled', () => {
    const none = (): Move[] => []
    expect(isDeterministic(none)).toBe(true)
    expect(isIdempotent(TREE, none)).toBe(true)
  })
})
