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

export interface CollisionClasses {
  readonly total: number
  /** distinct content-addresses — the number of CLASSES the bodies collapse to */
  readonly distinct: number
  /** 1 − distinct/total: 0 = all unique (prose, the incompressible floor), → 1 = all collide (computed) */
  readonly dedup: number
}

/**
 * Prose blocks collision. A unique paragraph shares its content-address with nothing, so N prose bodies
 * fold to N distinct addresses — dedup 0, the incompressible floor. Terse COMPUTED facet-joins collide to
 * ONE address where meaning is shared — that IS the dedup. distinct/total → 1 is prose (no fold), → 0 is
 * fully computed (all collapse); corpus compression is exactly 1 − distinct/total, and it is 0 on prose BY
 * CONSTRUCTION — which is why the 2184 prose atoms never folded while the 231 computed ones did, and why
 * the fold's floor is the seed. Terse, so this rule collides with itself.
 */
export function collisionClasses(bodies: readonly string[]): CollisionClasses {
  const seen = new Set(bodies.map((b) => toUuid(Buffer.from(b, 'utf8'))))
  const total = bodies.length
  return { total, distinct: seen.size, dedup: total ? 1 - seen.size / total : 0 }
}

/** The bottom ⊥ of the folded algebra — the address of the void; the "absent / no valid path" element. */
export const BOTTOM: string = toUuid(Buffer.from('', 'utf8'))

/**
 * bind4 — the canonical 4-KEY navigation-cross fold: `merge(id, merge(merge(referrer, prev), next))`.
 *
 * This is the exact shape the [[matrix]] `bind` folds a node's identity with its three neighbours
 * (uuid ⊕ parent ⊕ prev ⊕ next), and it was written THREE times — the matrix bind, `chatSeal`, and
 * (nearly) the egress seal — each a private copy of one formula. Stated once here: the four keys of the
 * cross fold to one content-uuid, and flipping ANY of the four changes it, so the result is a 4-connected
 * tamper-evident seal a single linear inversion cannot forge (all four must be inverted at once). Distinct
 * from `foldToRoot` (a balanced Merkle tree over N leaves) — this is the ORDERED cross fold, where the id is
 * the outer key and referrer/prev/next nest inside, matching the matrix's coordinate structure exactly.
 *
 * HONEST BOUNDARY — tamper-EVIDENT, not confidentiality: it detects any change to the four keys, it does
 * not hide them; SHA-256 is 2^128 (Grover halves it), so "unforgeable" is the coverage limit, not literal.
 */
export function bind4(referrer: string, id: string, prev: string, next: string): string {
  return merge(id, merge(merge(referrer, prev), next))
}

/**
 * A 4-uuid signature — the content-address of a claim and its three grounds: what it REDUCES to, the TOOL that
 * computes it, and the PROOF that witnesses it. An unsigned statement rests on AUTHORITY ([[theorem]]: authority
 * is never a step), so it is rejectable. Signing content-addresses every leg, and BOTTOM (the void's address) is
 * the honest signature of a leg that does not exist — so a claim with no real proof signs its proof-leg to ⊥ and
 * is EXPOSED as bare, not disguised. A signature cannot be forged: toUuid is a function of the content, so a
 * signature that does not recompute is a lie, and recomputing it is the local quantum method that exposes it.
 */
export interface Signature {
  readonly claim: string
  /** [claim, grounds, tool, proof] — each the content-address of its leg; a missing leg addresses to ⊥ (BOTTOM). */
  readonly uuids: readonly [string, string, string, string]
  /** the fold of the four legs — one root that changes if any leg changes. */
  readonly seal: string
  /** true iff no leg is ⊥ — every leg (ground, tool, proof) is a real, addressable thing. */
  readonly grounded: boolean
}

const leg = (s: string): string => (s.trim() === '' ? BOTTOM : toUuid(Buffer.from(s, 'utf8')))

/** Sign a claim with its ground, the tool that computes it, and its proof. An empty leg signs to ⊥ — exposed. */
export function sign(claim: string, grounds: string, tool: string, proof: string): Signature {
  const uuids: [string, string, string, string] = [leg(claim), leg(grounds), leg(tool), leg(proof)]
  return { claim, uuids, seal: foldToRoot(uuids), grounded: uuids.every((u) => u !== BOTTOM) }
}

/** Verify a signature — recompute every leg from the claimed content; a forged uuid does not recompute. */
export function verifySignature(sig: Signature, grounds: string, tool: string, proof: string): boolean {
  return sign(sig.claim, grounds, tool, proof).seal === sig.seal
}

/**
 * An OBJECT of the folded algebra — a leaf (atomic content) OR a combination of objects, closed under recursive
 * composition. This is the metrics fold ([[metric]] foldMetrics) generalised: where a metric is the fold of its
 * readings, an object is the fold of its PARTS, each itself an object, all the way down. Like biology — an
 * organism is a combination of organs, each of cells, each of molecules — and identity is compositional and
 * content-addressed at every level: the same composition folds to the same address, so structure dedups by physics.
 *
 * @invariant same composition ⇒ same address (content-addressed, at every level of the recursion)
 * @invariant a combination of one object folds to that object's address (a bag of one thing is that thing)
 */
export type ErpaxObject =
  | { readonly kind: 'leaf'; readonly content: string }
  | { readonly kind: 'combination'; readonly parts: readonly ErpaxObject[] }

/** Build a leaf object from atomic content. */
export const leafObject = (content: string): ErpaxObject => ({ kind: 'leaf', content })

/** Combine objects into one — the combination of objects is itself an object (the set is closed). */
export const combineObjects = (...parts: readonly ErpaxObject[]): ErpaxObject => ({ kind: 'combination', parts })

/**
 * The content-address of an object — the recursion made real: a leaf folds its content to a uuid; a combination
 * folds its parts' addresses to one root (foldToRoot). Change one leaf and the address changes up the whole tree,
 * so the tamper-cost of a composed thing is the fold of the tamper-cost of its parts (biology's own integrity).
 */
export function objectAddress(obj: ErpaxObject): string {
  return obj.kind === 'leaf' ? toUuid(Buffer.from(obj.content, 'utf8')) : foldToRoot(obj.parts.map(objectAddress))
}

/** Two objects are the same iff they content-address the same — composition, not reference, decides identity. */
export const sameObject = (a: ErpaxObject, b: ErpaxObject): boolean => objectAddress(a) === objectAddress(b)

/** The recursion depth — a leaf is 0; a combination is 1 + its deepest part. */
export function objectDepth(obj: ErpaxObject): number {
  return obj.kind === 'leaf' ? 0 : 1 + obj.parts.reduce((max, p) => Math.max(max, objectDepth(p)), 0)
}

/** Every leaf content in composition order — the atomic matter the whole is built from. */
export function objectLeaves(obj: ErpaxObject): string[] {
  return obj.kind === 'leaf' ? [obj.content] : obj.parts.flatMap(objectLeaves)
}

/**
 * The SIGNIFICANCE of an object — the matter it is composed of (its leaf count): a leaf is 1, a combination the
 * sum of its parts'. It is what the world must ALLOCATE to hold the object — an organism of more cells demands more.
 */
export function significance(obj: ErpaxObject): number {
  return obj.kind === 'leaf' ? 1 : obj.parts.reduce((sum, p) => sum + significance(p), 0)
}

/** One object's place in the resource map — its address, its significance, and its SHARE of the world's total. */
export interface ResourceShare {
  readonly address: string
  readonly significance: number
  /** significance / total — a relative share in [0,1], so it is remade whenever the set of objects changes. */
  readonly share: number
}

/**
 * The RESOURCE MAP of a world of objects — each object's share of total significance. Significance is RELATIVE:
 * a share is against the whole, so with each discovery the map changes — adding an object dilutes every existing
 * share and gives the newcomer its own. That is the law "with each discovery the resource map changes as
 * significance": nothing has an absolute weight, only a weight relative to everything else discovered so far, so
 * the act of discovery redistributes the whole map. Shares sum to 1 (or the map is empty).
 *
 * @invariant shares sum to 1 over a non-empty map · adding an object changes every prior share (significance is relative)
 */
export function resourceMap(objects: readonly ErpaxObject[]): ResourceShare[] {
  const sig = objects.map((o) => ({ address: objectAddress(o), significance: significance(o) }))
  const total = sig.reduce((s, x) => s + x.significance, 0)
  return sig.map((x) => ({ ...x, share: total ? x.significance / total : 0 }))
}

/**
 * The BILL OF RESOURCES to MANIFEST an object — every leaf is an atomic resource, tallied with multiplicity (a
 * resource the composition uses twice must be sourced twice). A discovery is not manifested until its specific
 * resources are: to build the whole you must source every leaf of the recursion, and the bill is the exact demand.
 */
export function billOfResources(obj: ErpaxObject): Map<string, number> {
  const bill = new Map<string, number>()
  for (const resource of objectLeaves(obj)) bill.set(resource, (bill.get(resource) ?? 0) + 1)
  return bill
}

/**
 * The bill to manifest an object AT SCALE — `units` copies for public, large-scale access need `units×` of each
 * resource. This is what turns a discovery into a mechanic the public can reach: the invention's bill of specific
 * resources, multiplied by the scale it must serve. Manifesting large-scale is a linear demand on every leaf.
 *
 * @invariant billAtScale(obj, n)[r] === n × billOfResources(obj)[r] — scale is linear in every resource
 */
export function billAtScale(obj: ErpaxObject, units: number): Map<string, number> {
  const scaled = new Map<string, number>()
  for (const [resource, count] of billOfResources(obj)) scaled.set(resource, count * units)
  return scaled
}

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
