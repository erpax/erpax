import { exactFloor } from '@/algebra'
import { toUuid } from '@/uuid/matrix'

/** merge/fold — the primitive: the magma operation, canonicalisation, and the two roots. @see ./SKILL.md */

/** The ∥ delimiter (U+2016 DOUBLE VERTICAL LINE) — makes a ∥ b unambiguous: merge('a','bc') ≠ merge('ab','c'). */
const JOIN = '‖'

/** The magma operation — the content-address of a ∥ b (the fold's binary step). Same content ⇒ same id. */
export function merge(a: string, b: string): string {
  return toUuid(Buffer.from(a + JOIN + b, 'utf8'))
}

/** Canonical bytes for a value — key-ORDER-independent, so the same content addresses the same, whatever @see ./SKILL.md */
export function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']'
  const obj = value as Record<string, unknown>
  return (
    '{' +
    Object.keys(obj)
      .sort()
      .map((k) => JSON.stringify(k) + ':' + canonical(obj[k]))
      .join(',') +
    '}'
  )
}

/** The audit chain leaf — the fold's binary step over a record and the leaf before it. @see ./SKILL.md */
export function chainLeaf(data: Record<string, unknown>, priorLeaf: string = ''): string {
  return merge(canonical(data), priorLeaf)
}

/**
 * Pair-merge a row up to the ONE root — the Merkle root. ORDER-SENSITIVE: a transposition moves
 * it, which is what a chained receipt needs. `@/fusion` exports a DIFFERENT function under this
 * name that sorts first; [[merge]]/order gates the collision.
 *
 * @rootKind sequence
 */
export function foldToRoot(elements: readonly string[]): string {
  if (elements.length === 0) return toUuid(Buffer.from('', 'utf8'))
  let level: string[] = [...elements]
  while (level.length > 1) {
    const next: string[] = []
    for (let i = 0; i < level.length; i += 2) {
      next.push(i + 1 < level.length ? merge(level[i]!, level[i + 1]!) : level[i]!)
    }
    level = next
  }
  return level[0]!
}

/** Which question a root answers: WHO is in the collection, or in WHAT ORDER. */
export type RootKind = 'set' | 'sequence'

/** Address the MEMBERS: sorted first, so no permutation moves it. @rootKind set */
export const setRoot = (uuids: readonly string[]): string => {
  const s = [...uuids].sort()
  return s.length === 0 ? '' : s.reduce((acc, u) => merge(acc, u))
}

/** Address the ORDER: any transposition moves it, as a chained receipt needs. @rootKind sequence */
export const sequenceRoot = (uuids: readonly string[]): string => foldToRoot(uuids)

/**
 * The two domains, as ADDRESSES — content-uuids of the words themselves. See SKILL.md.
 *
 * Not a byte prefix: a prefix is a payload, and the tag would then be carried rather than
 * addressed. These are uuids, composed with the same magma everything else uses, so domain
 * separation costs one more fold and no new encoding.
 */
const LEAF_DOMAIN: string = toUuid(Buffer.from('leaf', 'utf8'))
const NODE_DOMAIN: string = toUuid(Buffer.from('node', 'utf8'))

/** A leaf commitment — `merge(leafDomain, x)`. */
export function merkleLeaf(value: string): string {
  return merge(LEAF_DOMAIN, value)
}

/** An internal node — `merge(nodeDomain, merge(l, r))`, in a domain no leaf can enter. */
export function merkleNode(left: string, right: string): string {
  return merge(NODE_DOMAIN, merge(left, right))
}

/**
 * The domain-separated Merkle root (RFC 6962 §2.1). See SKILL.md.
 *
 * `foldToRoot` is the bare magma fold and stays what it is — the corpus's existing addresses
 * are folded with it. This is what a root used as EVIDENCE must be built with.
 *
 * @rootKind sequence
 */
export function merkleRoot(values: readonly string[]): string {
  if (values.length === 0) return merkleLeaf('')
  let level: string[] = values.map(merkleLeaf)
  while (level.length > 1) {
    const next: string[] = []
    for (let i = 0; i < level.length; i += 2) {
      next.push(i + 1 < level.length ? merkleNode(level[i]!, level[i + 1]!) : level[i]!)
    }
    level = next
  }
  return level[0]!
}

/** One step of an authentication path: the sibling to fold with, and whether it sits on the right. */
export interface MerkleStep {
  readonly sibling: string
  readonly right: boolean
}

/**
 * The inclusion proof. There is no undomained twin to reach for by mistake. See SKILL.md.
 *
 * The bare-magma pair that stood here built a tree in which an internal node is a valid leaf.
 * Removing it IS the fix: a safe alternative beside an unsafe default is obeyed only by whoever
 * remembers, which is the shape [[rules]] refuses everywhere else.
 */
export function merkleProof(values: readonly string[], index: number): MerkleStep[] {
  if (index < 0 || index >= values.length) return []
  const path: MerkleStep[] = []
  let level: string[] = values.map(merkleLeaf)
  let i = index
  while (level.length > 1) {
    const next: string[] = []
    for (let k = 0; k < level.length; k += 2) {
      const hasRight = k + 1 < level.length
      next.push(hasRight ? merkleNode(level[k]!, level[k + 1]!) : level[k]!)
      if ((k === i || k + 1 === i) && hasRight) {
        path.push(i === k ? { sibling: level[k + 1]!, right: true } : { sibling: level[k]!, right: false })
      }
    }
    i = exactFloor(i / 2)
    level = next
  }
  return path
}

/**
 * Verify a VALUE is included under a domain-separated root. See SKILL.md.
 *
 * Takes the value, never the leaf commitment: a caller that could hand in a node hash is the
 * attack this domain separation exists to stop.
 */
export function verifyInclusion(value: string, path: readonly MerkleStep[], root: string): boolean {
  let acc = merkleLeaf(value)
  for (const step of path) acc = step.right ? merkleNode(acc, step.sibling) : merkleNode(step.sibling, acc)
  return acc === root
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('merge — the folded algebra operation:')
  console.log('  merge("a","b") =', merge('a', 'b'))
  console.log('  same content ⇒ same id:', merge('a', 'b') === merge('a', 'b'))
  console.log('  non-associative:', merge(merge('a', 'b'), 'c') !== merge('a', merge('b', 'c')))
  const leaves = ['a', 'b', 'c', 'd', 'e']
  const root = merkleRoot(leaves)
  console.log('  merkleRoot([a..e]) =', root)
  console.log('  inclusion (leaf c present):', verifyInclusion('c', merkleProof(leaves, 2), root))
  console.log('  ⊥ (leaf z absent):', verifyInclusion('z', merkleProof(leaves, 2), root))
  console.log('  ⊥ (an internal NODE as a leaf):', verifyInclusion(merkleNode(merkleLeaf('a'), merkleLeaf('b')), merkleProof(leaves, 0), root))
}
