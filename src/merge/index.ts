/**
 * merge — the binary operation of the folded algebra, made real (was a `@generated` stub).
 *
 * merge(a, b) = toUuid(a ∥ b): the content-address of two elements convened. This is the magma
 * operation the whole corpus is named after and the [[fold]] iterates to one root. Same content ⇒
 * same address (the self-address congruence, [[identity]]) — convergence with no coordination, dedup
 * by physics, the ceccec `concept.self.address` theorem. It is a MAGMA, not a monoid: CLOSED (the
 * result is itself a valid element — a uuid) and DETERMINISTIC, but NOT associative and NOT
 * commutative — merge(merge(a,b),c) ≠ merge(a,merge(b,c)) and merge(a,b) ≠ merge(b,a); the Merkle
 * tree structure and leaf order are part of the element.
 *
 * This is the ENCODE direction of the folded algebra (many → one, by fold); the DECODE direction is
 * factoring an element back to its basis generators ([[fold]] · atomBasisScan). "Compute the fusion,
 * do NOT assume it."
 *
 *   tsx src/merge/index.ts
 *
 * Composes [[uuid]] · [[fold]] · [[collapse]] · [[identity]] · [[one]].
 */
import { toUuid } from '@/uuid/matrix'

/** Canonical atom path. */
export const atomPath = 'merge' as const

/** The ∥ delimiter (U+2016 DOUBLE VERTICAL LINE) — makes a ∥ b unambiguous: merge('a','bc') ≠ merge('ab','c'). */
const JOIN = '‖'

/** The magma operation — the content-address of a ∥ b (the fold's binary step). Same content ⇒ same id. */
export function merge(a: string, b: string): string {
  return toUuid(Buffer.from(a + JOIN + b, 'utf8'))
}

/**
 * Canonical bytes for a value — key-ORDER-independent, so the same content addresses the same, whatever
 * order it was built in.
 *
 * This existed already, and that is the finding: it was written TWICE, privately, in [[readme]]/compute and
 * [[readme]]/paper — while `chainLeaf` below serialised with plain `JSON.stringify`, whose key order is
 * INSERTION order. Ten hand-rolled audit leaves all carried a comment claiming "JCS-canonical", and the
 * corpus's own canonicaliser sat two atoms away, duplicated, unreachable from here. Duplication is
 * camouflage: while the function lived in two private corners, nothing showed that the fold was missing it.
 * Stated once, the hole is obvious.
 *
 * HONEST BOUNDARY — this is key-order canonical, NOT RFC 8785 JCS. Those ten comments overclaimed and this
 * one will not: JCS also fixes number serialisation, string escaping and UTF-8 form, and this defers all
 * three to `JSON.stringify`. For the payloads erpax addresses (plain records of strings, finite numbers,
 * booleans, null) the two agree; on a NaN, an Infinity, a lone surrogate, or -0 they need not. Key order was
 * the property the fold actually needed, and it is the one this guarantees.
 */
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

/**
 * The audit chain leaf — the fold's binary step over a record and the leaf before it.
 *
 * This is not a new primitive; it is `merge` with the record serialised, and it exists because the corpus
 * hand-rolled it SEVEN times instead ([[fiscal]]/period/resolver · post/close/analytics ·
 * intercompany/reconciliation · tax/period/reconciliation · audit/compliance/reporting ·
 * currency/reconciliation · closing/period/checker). Every copy was byte-identical:
 *
 *   `Buffer.from(payload + prior).toString('base64').substring(0, 32)`
 *
 * — base64, a reversible encoding, truncated to the first 24 bytes of input, under a banner claiming
 * tamper detection. A field could be rewritten past byte 24 without moving the leaf, and `prior` was
 * appended past the window, so the chain never chained. Seven statutory closing surfaces, zero tamper-cost.
 *
 * A law restated seven times is seven places for one lie to sit, and no fix ever reaches the others. It is
 * stated here once.
 *
 * It serialises through `canonical` above, so key order cannot change a leaf. That was written as an honest
 * boundary here — "the canonicalisation those comments promised is still unwritten" — and it was WRONG: the
 * canonicaliser existed, twice, privately, in [[readme]]/compute and [[readme]]/paper. Finding it took
 * DRY-cleaning by content-address, which is the argument for the fold rather than the sentence: while one
 * law is stated in two private corners, nothing can show you that a third place is missing it.
 *
 * HONEST BOUNDARY: this makes tampering DETECTABLE, never impossible, and only for whoever recomputes the
 * leaf. Canonical here means key-order canonical, NOT full RFC 8785 (see `canonical`).
 */
export function chainLeaf(data: Record<string, unknown>, priorLeaf: string = ''): string {
  return merge(canonical(data), priorLeaf)
}

/**
 * The fold: pair-merge a row of elements up to the ONE root — the actual Merkle root that [[fold]]
 * only COUNTS (depth ⌈log2 N⌉, N−1 merges). An odd element carries up unchanged; a single element is
 * already its own root; the empty row folds to the void's address (the identity of the closed set).
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

/** The bottom ⊥ of the folded algebra — the address of the void; the "absent / no valid path" element. */
export const BOTTOM: string = toUuid(Buffer.from('', 'utf8'))

/** One step of an authentication path: the sibling to fold with, and whether it sits on the right. */
export interface MerkleStep {
  readonly sibling: string
  readonly right: boolean
}

/**
 * The inclusion proof — the TOTAL membership verification of the folded algebra, resolving the
 * one-way wall. merge cannot be inverted (you cannot recover leaves from a root — that
 * non-invertibility IS the tamper-cost), but membership IS total: the leaf's authentication path
 * (its sibling at each level up to the root, O(log N)) re-folds to the root iff the leaf is present.
 * This is the ceccec `concept.proof.merkle.path` theorem as local code — not the impossible inverse,
 * but a total verify returning true, or false (⊥) for a leaf that was never folded in. The odd-carry
 * rule matches foldToRoot exactly (a lone element promotes unchanged, contributing no path step).
 */
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
    i = Math.floor(i / 2)
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
