/**
 * merkaba — two interlocked tetrahedra over the ten digits, measured.
 *
 * The three figures are DECLARED (a human named them); everything said about
 * them here is COMPUTED. The split matters: a hand-picked list pretending to
 * be a measurement is the frozen rosetta.
 */

/** A merkaba: two vertex sets over the digits, plus the pair its two tetrahedra leave uncovered. */
export interface Merkaba {
  readonly name: string
  readonly up: readonly number[]
  readonly down: readonly number[]
  readonly centre: readonly number[]
}

/** The three declared figures. Not derived — named, so they can be argued with. */
export const MERKABAS: readonly Merkaba[] = [
  { name: 'm0', up: [0, 1, 2, 9], down: [3, 5, 6, 7], centre: [4, 8] },
  { name: 'm1', up: [0, 1, 2, 9], down: [3, 5, 7, 8], centre: [4, 6] },
  { name: 'm2', up: [1, 2, 4, 8], down: [3, 5, 6, 7], centre: [0, 9] },
]

const sorted = (xs: readonly number[]): number[] => [...xs].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))

/** Canonical form of one tetrahedron — order carries no meaning, so it is normalised away. */
export function tetraKey(tetra: readonly number[]): string {
  return sorted(tetra).join(',')
}

/** Canonical form of a merkaba: unordered pair of tetrahedra (up/down is a labelling, not a fact). */
export function merkabaKey(m: Pick<Merkaba, 'up' | 'down'>): string {
  return [tetraKey(m.up), tetraKey(m.down)].sort().join('|')
}

export interface MerkabaShape {
  readonly union: number
  readonly centre: number
  readonly cover: number
  readonly tetrahedraDisjoint: boolean
  readonly centreDisjoint: boolean
}

/** What one figure actually is, counted rather than claimed. */
export function merkabaShape(m: Merkaba): MerkabaShape {
  const union = new Set([...m.up, ...m.down])
  const centre = new Set(m.centre)
  return {
    union: union.size,
    centre: centre.size,
    cover: new Set([...union, ...centre]).size,
    tetrahedraDisjoint: union.size === m.up.length + m.down.length,
    centreDisjoint: [...centre].every((x) => !union.has(x)),
  }
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/** Every map x ↦ ax+b of Z/modulus with a a unit — the affine group, computed not counted. */
export function affineMaps(modulus: number): readonly (readonly [number, number])[] {
  const maps: [number, number][] = []
  for (let a = 0; a < modulus; a++) {
    if (gcd(a, modulus) !== 1) continue
    for (let b = 0; b < modulus; b++) maps.push([a, b])
  }
  return maps
}

/** Apply a relabelling of the digits to a figure. */
export function relabel(m: Merkaba, at: (digit: number) => number): Pick<Merkaba, 'up' | 'down'> {
  return { up: m.up.map(at), down: m.down.map(at) }
}

export interface Symmetry {
  /** images of 0..9 */
  readonly image: readonly number[]
  /** where each merkaba lands, by index */
  readonly induced: readonly number[]
}

/**
 * Every relabelling of the ten digits that carries the merkaba SET into itself.
 * Exhaustive over all 10! permutations — a complete search is a theorem; a
 * sampled one is a guess.
 */
export function digitSymmetries(figures: readonly Merkaba[] = MERKABAS): readonly Symmetry[] {
  const index = new Map(figures.map((m, i) => [merkabaKey(m), i]))
  const p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const counters = new Array<number>(p.length).fill(0)
  const found: Symmetry[] = []
  const at = (d: number): number => p[d] as number
  const probe = (): void => {
    const induced: number[] = []
    for (const m of figures) {
      const landed = index.get(merkabaKey(relabel(m, at)))
      if (landed === undefined) return
      induced.push(landed)
    }
    found.push({ image: [...p], induced })
  }
  probe()
  for (let i = 0; i < p.length; ) {
    if ((counters[i] as number) < i) {
      const j = i % 2 === 1 ? (counters[i] as number) : 0
      const swap = p[j] as number
      p[j] = p[i] as number
      p[i] = swap
      probe()
      counters[i] = (counters[i] as number) + 1
      i = 0
    } else {
      counters[i] = 0
      i++
    }
  }
  return found
}

/** The distinct permutations the symmetries induce ON the figures — the action that decides orbits. */
export function inducedActions(figures: readonly Merkaba[] = MERKABAS): readonly string[] {
  return [...new Set(digitSymmetries(figures).map((s) => s.induced.join(',')))].sort()
}

/** Affine maps of Z/modulus carrying the merkaba set into itself. */
export function affineSymmetries(
  modulus: number,
  figures: readonly Merkaba[] = MERKABAS,
): readonly (readonly [number, number])[] {
  const keys = new Set(figures.map(merkabaKey))
  const wrap = (n: number): number => ((n % modulus) + modulus) % modulus
  return affineMaps(modulus).filter(([a, b]) =>
    figures.every((m) => keys.has(merkabaKey(relabel(m, (x) => wrap(a * x + b))))),
  )
}

/** Which figures share a tetrahedron — the incidence that explains the orbits. */
export function sharedTetrahedra(
  figures: readonly Merkaba[] = MERKABAS,
): readonly { readonly tetra: string; readonly figures: readonly string[] }[] {
  const by = new Map<string, string[]>()
  for (const m of figures)
    for (const t of [m.up, m.down]) {
      const k = tetraKey(t)
      by.set(k, [...(by.get(k) ?? []), m.name])
    }
  return [...by]
    .filter(([, who]) => who.length > 1)
    .map(([tetra, who]) => ({ tetra, figures: who }))
}

/** @index-cross.foldback child=horo/merkaba parent=horo — this cross folds back into its parent. */
