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

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('merge — the folded algebra operation:')
  console.log('  merge("a","b") =', merge('a', 'b'))
  console.log('  same content ⇒ same id:', merge('a', 'b') === merge('a', 'b'))
  console.log('  non-associative:', merge(merge('a', 'b'), 'c') !== merge('a', merge('b', 'c')))
  console.log('  foldToRoot([a,b,c,d]) =', foldToRoot(['a', 'b', 'c', 'd']))
}
