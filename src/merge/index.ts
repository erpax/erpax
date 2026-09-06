import { exactMax } from '@/algebra'
/** merge — the folded algebra's binary operation and everything built on it. @see ./SKILL.md */
import { foldToRoot, merge } from './fold'
import { toUuid } from '@/uuid/matrix'

/** Canonical atom path. */
export const atomPath = 'merge' as const

export {
  canonical,
  chainLeaf,
  foldToRoot,
  merge,
  sequenceRoot,
  setRoot,
  type RootKind,
  type MerkleStep,
  merkleProof,
  verifyMerkleProof,
} from './fold'

export interface CollisionClasses {
  readonly total: number
  /** distinct content-addresses — the number of CLASSES the bodies collapse to */
  readonly distinct: number
  /** 1 − distinct/total: 0 = all unique (prose, the incompressible floor), → 1 = all collide (computed) */
  readonly dedup: number
}

/** Prose blocks collision. A unique paragraph shares its content-address with nothing, so N prose bodies @see ./SKILL.md */
export function collisionClasses(bodies: readonly string[]): CollisionClasses {
  const seen = new Set(bodies.map((b) => toUuid(Buffer.from(b, 'utf8'))))
  const total = bodies.length
  return { total, distinct: seen.size, dedup: total ? 1 - seen.size / total : 0 }
}

/** The bottom ⊥ of the folded algebra — the address of the void; the "absent / no valid path" element. */
export const BOTTOM: string = toUuid(Buffer.from('', 'utf8'))

/** bind4 — the canonical 4-KEY navigation-cross fold: `merge(id, merge(merge(referrer, prev), next))`. @see ./SKILL.md */
export function bind4(referrer: string, id: string, prev: string, next: string): string {
  return merge(id, merge(merge(referrer, prev), next))
}

/** A 4-uuid signature — the content-address of a claim and its three grounds: what it REDUCES to, the TOOL that @see ./SKILL.md */
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

/** An OBJECT of the folded algebra — a leaf (atomic content) OR a combination of objects, closed under… @see ./SKILL.md */
export type ErpaxObject =
  | { readonly kind: 'leaf'; readonly content: string }
  | { readonly kind: 'combination'; readonly parts: readonly ErpaxObject[] }

/** Build a leaf object from atomic content. */
export const leafObject = (content: string): ErpaxObject => ({ kind: 'leaf', content })

/** Combine objects into one — the combination of objects is itself an object (the set is closed). */
export const combineObjects = (...parts: readonly ErpaxObject[]): ErpaxObject => ({ kind: 'combination', parts })

/** The content-address of an object — the recursion made real: a leaf folds its content to a uuid; a… @see ./SKILL.md */
export function objectAddress(obj: ErpaxObject): string {
  return obj.kind === 'leaf' ? toUuid(Buffer.from(obj.content, 'utf8')) : foldToRoot(obj.parts.map(objectAddress))
}

/** Two objects are the same iff they content-address the same — composition, not reference, decides identity. */
export const sameObject = (a: ErpaxObject, b: ErpaxObject): boolean => objectAddress(a) === objectAddress(b)

/** The recursion depth — a leaf is 0; a combination is 1 + its deepest part. */
export function objectDepth(obj: ErpaxObject): number {
  return obj.kind === 'leaf' ? 0 : 1 + obj.parts.reduce((max, p) => exactMax(max, objectDepth(p)), 0)
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

/** The RESOURCE MAP of a world of objects — each object's share of total significance. Significance is… @see ./SKILL.md */
export function resourceMap(objects: readonly ErpaxObject[]): ResourceShare[] {
  const sig = objects.map((o) => ({ address: objectAddress(o), significance: significance(o) }))
  const total = sig.reduce((s, x) => s + x.significance, 0)
  return sig.map((x) => ({ ...x, share: total ? x.significance / total : 0 }))
}

/** The BILL OF RESOURCES to MANIFEST an object — every leaf is an atomic resource, tallied with… @see ./SKILL.md */
export function billOfResources(obj: ErpaxObject): Map<string, number> {
  const bill = new Map<string, number>()
  for (const resource of objectLeaves(obj)) bill.set(resource, (bill.get(resource) ?? 0) + 1)
  return bill
}

/** The bill to manifest an object AT SCALE — `units` copies for public, large-scale access need… @see ./SKILL.md */
export function billAtScale(obj: ErpaxObject, units: number): Map<string, number> {
  const scaled = new Map<string, number>()
  for (const [resource, count] of billOfResources(obj)) scaled.set(resource, count * units)
  return scaled
}

/** DISSECT — break an object into its immediate parts. Dead code is not waste: a combination that is… @see ./SKILL.md */
export function dissect(obj: ErpaxObject): readonly ErpaxObject[] {
  return obj.kind === 'leaf' ? [] : obj.parts
}

/** BIRTH — recombine parts into a new object. Dead code can be dissected and new code may be born: the… @see ./SKILL.md */
export function birth(parts: readonly ErpaxObject[]): ErpaxObject {
  return combineObjects(...parts)
}

export {
  type RootSite,
  type RootCollision,
  assertNoRootCollision,
  assertRootsDeclared,
  rootCollisions,
  rootSites,
  undeclaredRoots,
} from './order'
