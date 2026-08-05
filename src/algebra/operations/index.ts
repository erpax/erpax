import { THEOREMS, type Algebra } from '../constants'

/** Is the operation CLOSED on its carrier? — the minimal proof that it IS an algebra. */
export function isClosed<T>(
  a: Algebra<T>,
  contains: (x: T) => boolean = (x) => a.carrier.some((c) => JSON.stringify(c) === JSON.stringify(x)),
): boolean {
  for (const x of a.carrier) for (const y of a.carrier) if (!contains(a.op(x, y))) return false
  return true
}

/** The movie: the orbit a GENERATOR draws — from the identity (or the generator itself), each next frame `op(prev, generator)`, until it repeats. */
export function movie<T>(a: Algebra<T>, generator: T, maxFrames = 64): T[] {
  const seed = a.identity ?? generator
  const frames: T[] = [seed]
  const seen = new Set<string>([JSON.stringify(seed)])
  let x = seed
  for (let i = 0; i < maxFrames; i += 1) {
    x = a.op(x, generator)
    const k = JSON.stringify(x)
    if (seen.has(k)) break
    seen.add(k)
    frames.push(x)
  }
  return frames
}

/** Compose two algebras into their product — an algebra of algebras, closed componentwise. */
export function product<A, B>(x: Algebra<A>, y: Algebra<B>): Algebra<[A, B]> {
  const carrier: [A, B][] = []
  for (const a of x.carrier) for (const b of y.carrier) carrier.push([a, b])
  return {
    name: `${x.name}×${y.name}`,
    carrier,
    op: ([a1, b1], [a2, b2]) => [x.op(a1, a2), y.op(b1, b2)],
    identity: x.identity !== undefined && y.identity !== undefined ? [x.identity, y.identity] : undefined,
    overlay: `${x.overlay} ⊗ ${y.overlay}`,
  }
}

/** All theorems are algebra only: every registered theorem's operation is closed on its carrier. */
export function allAlgebra(): boolean {
  return THEOREMS.every((t) => isClosed(t))
}
