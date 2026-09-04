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

/** One step of an authentication path: the sibling to fold with, and whether it sits on the right. */
export interface MerkleStep {
  readonly sibling: string
  readonly right: boolean
}

/** The inclusion proof — the TOTAL membership verification of the folded algebra, resolving the @see ./SKILL.md */
export function merkleProof(leaves: readonly string[], index: number): MerkleStep[] {
  if (index < 0 || index >= leaves.length) return [] // ⊥ — not a leaf of this fold
  const path: MerkleStep[] = []
  let level: string[] = [...leaves]
  let i = index
  while (level.length > 1) {
    const next: string[] = []
    for (let k = 0; k < level.length; k += 2) {
      const hasRight = k + 1 < level.length
      next.push(hasRight ? merge(level[k]!, level[k + 1]!) : level[k]!)
      if ((k === i || k + 1 === i) && hasRight) {
        path.push(i === k ? { sibling: level[k + 1]!, right: true } : { sibling: level[k]!, right: false })
      }
    }
    i = exactFloor(i / 2)
    level = next
  }
  return path
}

/** Verify a leaf is under the root by re-folding its path — TOTAL: true if present, false (⊥) otherwise. */
export function verifyMerkleProof(leaf: string, path: readonly MerkleStep[], root: string): boolean {
  let acc = leaf
  for (const step of path) acc = step.right ? merge(acc, step.sibling) : merge(step.sibling, acc)
  return acc === root
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('merge — the folded algebra operation:')
  console.log('  merge("a","b") =', merge('a', 'b'))
  console.log('  same content ⇒ same id:', merge('a', 'b') === merge('a', 'b'))
  console.log('  non-associative:', merge(merge('a', 'b'), 'c') !== merge('a', merge('b', 'c')))
  const leaves = ['a', 'b', 'c', 'd', 'e']
  const root = foldToRoot(leaves)
  console.log('  foldToRoot([a..e]) =', root)
  console.log('  inclusion proof (leaf c present):', verifyMerkleProof('c', merkleProof(leaves, 2), root))
  console.log('  ⊥ (leaf z absent):', verifyMerkleProof('z', merkleProof(leaves, 2), root))
}
