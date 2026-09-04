import { describe, expect, it } from 'vitest'
import { atomAddress } from '.'

describe('atom/address', () => {
  it('reads its own address from its own url — the claim this atom exists to make', () => {
    const a = atomAddress(import.meta.url)
    expect(a.leaf).toBe('address')
    expect(a.parent).toBe('atom')
    expect(a.path).toBe('atom/address')
    expect(a.specifier).toBe('@/atom/address')
    expect(a.canonical).toBe('@/address')
  })

  it('separates the facet from the canonical atom it re-exports', () => {
    // `body/auto` re-exports `@/auto` — NOT `@/body/auto`. Collapsing these reads correct at the
    // root, where leaf and path coincide, and is wrong for every nested atom. 12 rewritten proofs
    // failed on exactly this and were right to.
    const a = atomAddress('/x/src/body/auto')
    expect(a.specifier).toBe('@/body/auto')
    expect(a.canonical).toBe('@/auto')
  })

  it('accepts a directory as readily as a file', () => {
    expect(atomAddress('/x/src/body/abdomen').path).toBe('body/abdomen')
    expect(atomAddress('/x/src/body/abdomen/test.ts').path).toBe('body/abdomen')
  })

  it('names a root atom with no parent', () => {
    const a = atomAddress('/x/src/akashic/index.ts')
    expect(a.path).toBe('akashic')
    expect(a.leaf).toBe('akashic')
    expect(a.parent).toBe('')
  })

  it('takes the LAST src, so a checkout under a path containing src still resolves', () => {
    expect(atomAddress('/home/src-work/erpax/src/horo/constants').path).toBe('horo/constants')
  })

  it('is refutable — a different folder gives a different address', () => {
    expect(atomAddress('/x/src/body/anatomy').leaf).not.toBe(atomAddress('/x/src/body/abdomen').leaf)
  })
})
