import { describe, expect, it } from 'vitest'
import * as barrel from '@/merge'
import { canonical, chainLeaf, foldToRoot, merge, sequenceRoot, setRoot } from '@/merge/fold'

describe('merge/fold — the primitive', () => {
  it('is a MAGMA: closed and deterministic, neither associative nor commutative', () => {
    const [a, b, c] = ['a', 'b', 'c']
    expect(merge(a, b)).toBe(merge(a, b)) // deterministic
    expect(merge(a, b)).toMatch(/^[0-9a-f-]{36}$/) // closed: the result is itself an element
    expect(merge(merge(a, b), c)).not.toBe(merge(a, merge(b, c))) // NOT associative
    expect(merge(a, b)).not.toBe(merge(b, a)) // NOT commutative — this is what catches a reorder
  })

  it('the delimiter keeps the split unambiguous', () => {
    expect(merge('a', 'bc')).not.toBe(merge('ab', 'c'))
  })

  it('the parent re-exports every name this child holds — the face is preserved', () => {
    for (const name of ['merge', 'canonical', 'chainLeaf', 'foldToRoot', 'setRoot', 'sequenceRoot']) {
      expect(typeof (barrel as Record<string, unknown>)[name]).toBe('function')
    }
    expect(barrel.merge('a', 'b')).toBe(merge('a', 'b'))
    expect(barrel.foldToRoot(['a', 'b'])).toBe(foldToRoot(['a', 'b']))
  })

  it('canonical sorts keys recursively, so equal content addresses equally', () => {
    expect(canonical({ b: 1, a: { d: 2, c: 3 } })).toBe(canonical({ a: { c: 3, d: 2 }, b: 1 }))
  })

  it('chainLeaf folds in the prior receipt, so a row moved changes everything after it', () => {
    const first = chainLeaf({ x: 1 }, '')
    expect(chainLeaf({ x: 2 }, first)).not.toBe(chainLeaf({ x: 2 }, ''))
  })

  it('the two roots keep their opposite order semantics after the move', () => {
    const u = ['a', 'b', 'c', 'd']
    expect(setRoot(u)).toBe(setRoot([...u].reverse()))
    expect(sequenceRoot(u)).not.toBe(sequenceRoot([...u].reverse()))
  })
})

/**
 * RFC 6962 §2.1 — a leaf and an internal node must not hash the same way.
 *
 * `merge` builds both and both are uuids, so an internal node IS a valid leaf. Two second
 * preimages follow, and both are demonstrated here against the bare fold before the
 * domain-separated one is shown to close them.
 */
describe('merge/fold — the undomained root does not commit to what is a leaf', () => {
  const a = 'aaaaaaaa-0000-8000-8000-000000000001'
  const b = 'bbbbbbbb-0000-8000-8000-000000000002'
  const c = 'cccccccc-0000-8000-8000-000000000003'
  const d = 'dddddddd-0000-8000-8000-000000000004'

  it('an internal node presented as a leaf reaches the same root', async () => {
    const { merge, foldToRoot } = await import('@/merge/fold')
    expect(foldToRoot([a, b, c, d])).toBe(foldToRoot([merge(a, b), merge(c, d)]))
  })

  it('and a three-leaf tree collides with a two-leaf one', async () => {
    const { merge, foldToRoot } = await import('@/merge/fold')
    expect(foldToRoot([a, b, c])).toBe(foldToRoot([merge(a, b), c]))
  })

  it('domain separation closes both', async () => {
    const { merkleRoot, merkleNode, merkleLeaf } = await import('@/merge/fold')
    expect(merkleRoot([a, b, c, d])).not.toBe(merkleRoot([merkleNode(merkleLeaf(a), merkleLeaf(b)), merkleNode(merkleLeaf(c), merkleLeaf(d))]))
    expect(merkleRoot([a, b, c])).not.toBe(merkleRoot([merkleNode(merkleLeaf(a), merkleLeaf(b)), c]))
    // a leaf can never equal a node over the same material — the tags are the whole of it
    expect(merkleLeaf(a)).not.toBe(merkleNode(a, a))
  })

  it('the domained proof still verifies what is really there, and refuses what is not', async () => {
    const { merkleRoot, merkleProof, verifyInclusion } = await import('@/merge/fold')
    const leaves = [a, b, c, d, 'eeeeeeee-0000-8000-8000-000000000005']
    const root = merkleRoot(leaves)
    for (let i = 0; i < leaves.length; i++) {
      expect(verifyInclusion(leaves[i]!, merkleProof(leaves, i), root), `leaf ${i}`).toBe(true)
    }
    expect(verifyInclusion('zzzzzzzz-0000-8000-8000-000000000009', merkleProof(leaves, 2), root)).toBe(false)
    // the attack the verifier must refuse: a NODE offered where a value belongs
    const { merkleNode, merkleLeaf } = await import('@/merge/fold')
    const node = merkleNode(merkleLeaf(a), merkleLeaf(b))
    expect(verifyInclusion(node, merkleProof(leaves, 0), root)).toBe(false)
  })

  it('and it is deterministic and order-sensitive, as a sequence root must be', async () => {
    const { merkleRoot } = await import('@/merge/fold')
    expect(merkleRoot([a, b, c])).toBe(merkleRoot([a, b, c]))
    expect(merkleRoot([a, b, c])).not.toBe(merkleRoot([c, b, a]))
    expect(merkleRoot([])).toBe(merkleRoot([]))
  })
})
