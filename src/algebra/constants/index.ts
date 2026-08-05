export interface Algebra<T> {
  readonly name: string
  /** the set the operation is closed on (or a finite sample of it). */
  readonly carrier: readonly T[]
  /** the closed binary operation — the theorem. */
  readonly op: (a: T, b: T) => T
  /** the identity, when one exists — its presence is what makes the algebra a monoid, not a bare magma. */
  readonly identity?: T
  /** the picture this operation was dressed as — NOT part of the algebra, marked so it can be stripped. */
  readonly overlay: string
}

const dr9 = (n: number): number => (((n % 9) + 9) % 9) || 9

/** The session's theorems, each as the algebra it always was — overlay named and set aside. */
export const THEOREMS: readonly Algebra<number>[] = [
  { name: 'doubling', carrier: [1, 2, 4, 5, 7, 8], op: (a, b) => dr9(a * b), identity: 1, overlay: 'the moving double torus' },
  { name: 'additive', carrier: [1, 2, 3, 4, 5, 6, 7, 8, 9], op: (a, b) => dr9(a + b), identity: 9, overlay: 'matter/antimatter annihilation to the void' },
]
