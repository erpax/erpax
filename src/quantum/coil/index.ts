/**
 * quantum/coil — coins in trinities; one rotation each way covers every cross.
 *
 * A COIN is a law with two faces: the claim and its dual. A COIL is a trinity of coins rotated
 * once forward (each with its successor) and once backward (each with its predecessor) — six
 * ordered pairs, which is every cross of three things in both faces. That is exact for three and
 * for nothing larger: C(n,2) = n ⇔ n = 3 (`Coil.trinity_is_the_coil`). A rosetta of more laws is
 * coiled FRACTALLY — trinities of coils with the remainder as the axis — and a rotation at every
 * node covers every pair of laws, because two laws meet at the lowest node holding them in
 * different children and that node's rotation crosses those children.
 *
 * The faces of a cross are DIRECTIONAL containment: forward reads how much of A lies inside B,
 * backward how much of B lies inside A. The shared count and the theorem-at-zero are symmetric;
 * the faces are not, and that asymmetry is what the two rotations carry.
 *
 * @see ./SKILL.md · src/verify/lean/Coil.lean
 */
import { crossIntersections } from '@/conjecture'

export type Coil<T> =
  | { readonly kind: 'coin'; readonly value: T }
  | { readonly kind: 'coil'; readonly children: readonly Coil<T>[] }

/**
 * Coil a rosetta: consecutive trinities, the remainder (one or two) kept whole as the AXIS at that
 * level, and the resulting nodes coiled again until one remains. Order is the rosetta's own — the
 * coil never reorders what it was handed, so the same rosetta always gives the same coil.
 */
export function coil<T>(items: readonly T[]): Coil<T> {
  let level: Coil<T>[] = items.map((value) => ({ kind: 'coin', value }))
  while (level.length > 3) {
    const next: Coil<T>[] = []
    for (let i = 0; i + 3 <= level.length; i += 3) next.push({ kind: 'coil', children: level.slice(i, i + 3) })
    const rest = level.length % 3
    for (let i = level.length - rest; i < level.length; i++) next.push(level[i] as Coil<T>)
    level = next
  }
  return level.length === 1 ? (level[0] as Coil<T>) : { kind: 'coil', children: level }
}

/** The coins under a node, in rosetta order. */
export function coins<T>(node: Coil<T>): T[] {
  return node.kind === 'coin' ? [node.value] : node.children.flatMap(coins)
}

/** The ordered child pairs one rotation yields — forward: each with its successor; backward: with its predecessor. */
export function rotation<T>(node: Coil<T>, direction: 'forward' | 'backward'): ReadonlyArray<readonly [Coil<T>, Coil<T>]> {
  if (node.kind === 'coin') return []
  const c = node.children
  const k = c.length
  const out: Array<readonly [Coil<T>, Coil<T>]> = []
  for (let i = 0; i < k; i++) {
    const j = direction === 'forward' ? (i + 1) % k : (i + k - 1) % k
    if (j !== i) out.push([c[i] as Coil<T>, c[j] as Coil<T>])
  }
  return out
}

export interface Coverage {
  /** Unordered coin pairs some node's rotation crosses. */
  readonly covered: number
  /** C(n,2) — every cross the rosetta has. */
  readonly crosses: number
  readonly complete: boolean
  /** Internal nodes, each rotated once forward and once backward. */
  readonly nodes: number
  readonly rotations: number
}

const pairKey = (a: string, b: string): string => (a < b ? `${a}\u0000${b}` : `${b}\u0000${a}`)

/** Which coin pairs the fractal coil crosses — the theorem, measured on the structure it was handed. */
export function coverage<T>(node: Coil<T>, label: (t: T) => string = String): Coverage {
  const all = coins(node)
  const covered = new Set<string>()
  let nodes = 0
  const visit = (n: Coil<T>): void => {
    if (n.kind === 'coin') return
    nodes++
    for (const [a, b] of rotation(n, 'forward')) {
      for (const x of coins(a)) for (const y of coins(b)) covered.add(pairKey(label(x), label(y)))
    }
    for (const c of n.children) visit(c)
  }
  visit(node)
  const crosses = (all.length * (all.length - 1)) / 2
  return { covered: covered.size, crosses, complete: covered.size === crosses, nodes, rotations: nodes * 2 }
}

export interface CoilCross {
  /** The two nodes, named by their coins. */
  readonly a: readonly string[]
  readonly b: readonly string[]
  /** Files both sides flag. */
  readonly shared: number
  /** Forward face: the share of A's population that lies inside B. */
  readonly forward: number
  /** Backward face: the share of B's population that lies inside A. */
  readonly backward: number
  /** Both sides non-empty and nothing shared — the cross holds at zero. */
  readonly theorem: boolean
  /** Observed ÷ expected under independence, when both are single laws with a universe to compare in. */
  readonly lift: number | null
}

export interface CoilLevel {
  readonly depth: number
  readonly children: readonly (readonly string[])[]
  readonly forward: readonly CoilCross[]
  readonly backward: readonly CoilCross[]
}

const union = (sets: ReadonlyMap<string, ReadonlySet<string>>, laws: readonly string[]): Set<string> => {
  const out = new Set<string>()
  for (const l of laws) for (const f of sets.get(l) ?? []) out.add(f)
  return out
}

/**
 * Rotate the whole coil over the measured populations. Every node is turned once forward and once
 * backward; each turn crosses the node's children pairwise, a child being one law or the union of
 * the laws it coils. The lift is the pairwise one [[conjecture]] already computes, available only
 * for coin-coin crosses — a coil-coil cross has no single independence model and says so with null.
 */
export function coilCrosses(sets: ReadonlyMap<string, ReadonlySet<string>>, rosetta: readonly string[]): CoilLevel[] {
  const tree = coil(rosetta)
  const lifts = new Map(crossIntersections(sets).map((i) => [pairKey(i.a, i.b), i.lift]))
  const cross = (a: Coil<string>, b: Coil<string>): CoilCross => {
    const la = coins(a)
    const lb = coins(b)
    const sa = union(sets, la)
    const sb = union(sets, lb)
    const shared = [...sa].filter((f) => sb.has(f)).length
    return {
      a: la,
      b: lb,
      shared,
      forward: sa.size === 0 ? 0 : shared / sa.size,
      backward: sb.size === 0 ? 0 : shared / sb.size,
      theorem: sa.size > 0 && sb.size > 0 && shared === 0,
      lift: la.length === 1 && lb.length === 1 ? (lifts.get(pairKey(la[0] as string, lb[0] as string)) ?? null) : null,
    }
  }
  const out: CoilLevel[] = []
  const visit = (n: Coil<string>, depth: number): void => {
    if (n.kind === 'coin') return
    out.push({
      depth,
      children: n.children.map(coins),
      forward: rotation(n, 'forward').map(([a, b]) => cross(a, b)),
      backward: rotation(n, 'backward').map(([a, b]) => cross(a, b)),
    })
    for (const c of n.children) visit(c, depth + 1)
  }
  visit(tree, 0)
  return out
}

/** One law's view of an axis: how many of the axis's files it flags, and both containment faces. */
export interface Perspective {
  readonly law: string
  readonly seen: number
  /** Forward face: the share of the axis's files this law flags. */
  readonly forward: number
  /** Backward face: the share of this law's population that lies at the axis. */
  readonly backward: number
}

/** How many seats see the axis — twin of `Coil.seatOf`. */
export type Seat = 'unseen' | 'single' | 'corroborated'

export const seatOf = (seats: number): Seat => (seats === 0 ? 'unseen' : seats === 1 ? 'single' : 'corroborated')

export interface Rotation {
  /** The atom path the rosetta was turned about. */
  readonly axis: string
  /** Files under the axis that some law of the rosetta flags. */
  readonly files: number
  readonly perspectives: readonly Perspective[]
  /** The laws that see the axis, in rosetta order. */
  readonly seats: readonly string[]
  readonly seat: Seat
}

/**
 * Turn the rosetta about a LEAD: the lead's atom is the axis, every law of the rosetta is a seat,
 * and each seat is asked both faces — how much of the axis it flags (forward) and how much of its
 * own population the axis is (backward). A lead seen from two seats is corroborated by laws that
 * were never written to agree; seen from one, it rests on that law alone; seen from none, no law
 * holds it as matter and it is a count, not a thing. The rosetta's order is kept, as everywhere.
 */
export function rotateAbout(axis: string, sets: ReadonlyMap<string, ReadonlySet<string>>, rosetta: readonly string[]): Rotation {
  const under = (f: string): boolean => f.startsWith(`src/${axis}/`) || f === `src/${axis}.ts` || f === `src/${axis}.tsx`
  const files = new Set<string>()
  for (const l of rosetta) for (const f of sets.get(l) ?? []) if (under(f)) files.add(f)
  const perspectives = rosetta.map((law) => {
    const pop = sets.get(law) ?? new Set<string>()
    const seen = [...files].filter((f) => pop.has(f)).length
    return { law, seen, forward: files.size === 0 ? 0 : seen / files.size, backward: pop.size === 0 ? 0 : seen / pop.size }
  })
  const seats = perspectives.filter((p) => p.seen > 0).map((p) => p.law)
  return { axis, files: files.size, perspectives, seats, seat: seatOf(seats.length) }
}
