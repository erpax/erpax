/**
 * conformal — changing perspective is a conformal map, and the invariant it preserves is the ANGLE.
 *
 * A change of perspective is a conformal transformation, and its generators are three the corpus already has a
 * face of: ROTATE (`SO(n)`, the [[horo]] vortex / [[navigation]] merkaba spin), SCALE (dilation), and INVERT
 * (`v ↦ v/|v|²`, the `0 ↔ ∞` turn-inside-out — [[horo]]/divThroughVoid routes `n/0` through the void). With
 * translation these generate the whole conformal (Möbius) group; nothing else is needed. What every one of them
 * preserves — the viewpoint moves, the shape of the view holds — is the **angle** between directions.
 *
 * - `rotate` and `scale` preserve the angle between vectors EXACTLY (global), in every dimension.
 * - `invert` is conformal — its Jacobian satisfies `JᵀJ ∝ I` (a scaled Householder reflection), so it preserves
 *   angles between directions LOCALLY, in every dimension.
 *
 * THE CORRECTION THAT KEEPS IT HONEST. A claim reached this session that inversion is conformal "in dims
 * {2,3,7}." Measured, that is FALSE: inversion is conformal in EVERY dimension `n ≥ 2` (the Householder square
 * is the identity in all n — verified to machine zero in dims 2..11). `{2,3,7}` is the signature of a DIFFERENT
 * structure — the parallelizable spheres / cross-product / division-algebra dimensions — imported where it does
 * not gate conformality. It is a [[coincidence]] wearing a theorem's clothes ([[rules]]/refutable): a striking
 * dimension-set is not a proof, and the theorem it dressed as holds far more widely than the set suggested.
 *
 * Honest boundary: this is the conformal group of `ℝⁿ ∪ {∞}`, and by Liouville's theorem for `n ≥ 3` these are
 * ALL the conformal maps (`n = 2` is the richer holomorphic case). "All dimensions at once" means the same
 * operators and the same invariant apply uniformly per dimension — not that dimensions fuse, not that all
 * perspectives are equal. What is conserved is ANGLES between directions, never lengths (inversion and dilation
 * change those). HARMONY ≠ TRUTH: that angle is preserved does not make every view correct — only recognizable.
 *
 * @invariant rotation preserves the angle between vectors exactly, in every dimension
 * @invariant dilation preserves the angle between vectors exactly, in every dimension
 * @invariant inversion is conformal (`JᵀJ ∝ I`) in every dimension n ≥ 2 — NOT only {2,3,7}
 *
 * Composes [[horo]] · [[navigation]] · [[coincidence]] · [[angle]] · [[law]].
 */

/** Euclidean inner product. */
export function dot(u: readonly number[], v: readonly number[]): number {
  return u.reduce((s, x, i) => s + x * (v[i] ?? 0), 0)
}

/** Euclidean length. */
export function norm(v: readonly number[]): number {
  return Math.sqrt(dot(v, v))
}

/** The angle between two vectors — the conformal invariant. */
export function angle(u: readonly number[], v: readonly number[]): number {
  return Math.acos(Math.max(-1, Math.min(1, dot(u, v) / (norm(u) * norm(v)))))
}

/** SCALE — dilation by λ. A conformal generator: it breathes the frame, the angle holds. */
export function scale(lambda: number, v: readonly number[]): number[] {
  return v.map((x) => lambda * x)
}

/** INVERT — `v ↦ v/|v|²`, the `0 ↔ ∞` turn-inside-out. A conformal generator (angle-preserving, not length). */
export function invert(v: readonly number[]): number[] {
  const r2 = dot(v, v)
  return v.map((x) => x / r2)
}

/** ROTATE — a plane rotation in the `(i, j)` plane by θ. A generator of `SO(n)`; the vortex / merkaba spin. */
export function rotatePlane(v: readonly number[], i: number, j: number, theta: number): number[] {
  const out = [...v]
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  out[i] = (v[i] ?? 0) * c - (v[j] ?? 0) * s
  out[j] = (v[i] ?? 0) * s + (v[j] ?? 0) * c
  return out
}

/**
 * The conformal defect of inversion at `v` — `‖JᵀJ − σ·I‖` for the inversion Jacobian. Zero (to machine
 * precision) means `JᵀJ ∝ I`: the map is conformal there. This is 0 in EVERY dimension — the proof that the
 * `{2,3,7}` restriction was false.
 */
export function inversionConformalDefect(v: readonly number[]): number {
  const n = v.length
  const r2 = dot(v, v)
  // J[i][j] = (1/r2)(δij − 2 v_i v_j / r2)
  const J = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => ((i === j ? 1 : 0) - (2 * v[i]! * v[j]!) / r2) / r2))
  const G = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      let s = 0
      for (let k = 0; k < n; k++) s += J[k]![i]! * J[k]![j]!
      return s
    }),
  )
  const sigma = G[0]![0]!
  let defect = 0
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) defect = Math.max(defect, Math.abs(G[i]![j]! - (i === j ? sigma : 0)))
  return defect
}

/** Is inversion conformal in dimension `n`? — the honest answer is YES for every `n ≥ 2`, NOT only {2,3,7}. */
export function isConformalDimension(n: number): boolean {
  return Number.isInteger(n) && n >= 2
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const u = [1, 0, 2, -1]
  const v = [0, 1, 1, 3]
  console.log('conformal — changing perspective preserves the angle, in every dimension:\n')
  console.log(`  angle(u,v)                = ${angle(u, v).toFixed(6)}`)
  console.log(`  rotate preserves it       : ${Math.abs(angle(u, v) - angle(rotatePlane(u, 0, 1, 0.7), rotatePlane(v, 0, 1, 0.7))) < 1e-12}`)
  console.log(`  scale  preserves it       : ${Math.abs(angle(u, v) - angle(scale(3.5, u), scale(3.5, v))) < 1e-12}`)
  console.log(`  invert conformal (JᵀJ∝I) in dims: ${[2, 3, 4, 5, 6, 7, 8].map((n) => `${n}:${inversionConformalDefect(Array.from({ length: n }, (_, i) => i + 1)) < 1e-9 ? '✓' : '✗'}`).join('  ')}`)
  console.log('\n  the {2,3,7} restriction was a coincidence — inversion is conformal in EVERY dimension. Angle is the invariant of all three generators.')
}
