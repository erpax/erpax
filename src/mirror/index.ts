/**
 * mirror — the [[horo]] is a path read both ways. A folder path read left→right and right→left is two
 * DIFFERENT paths (different words, different folders, different meaning): `dual/torus/fusion` vs
 * `fusion/torus/dual` — exactly as a digit sequence reversed is a different sequence. Yet the path's
 * VALUE is direction-invariant: the digital root of the sum of its word-digits is the same both ways,
 * because addition commutes. So the filesystem folder carries the SAME max computed value on both
 * sides, and words and digits agree (each digit is its word's content-[[uuid]] digital root via [[name]]).
 *
 * The path differs by direction; the value does not. That is why both readings are worth encoding —
 * max coverage from one folder, the [[duality]] of L→R ⊕ R→L, the symmetric binding at the path scale.
 *
 *   tsx src/mirror/index.ts
 *
 * @audit forward/backward are the two word-orders; the value is the digital root of a commutative sum
 * @see ../horo -- ../name -- ../digit -- ../duality -- ./SKILL.md
 */
import { uuidOfName } from '@/name'
import { digitalRootOfUuid as drUuid } from '@/digit'
import { digitalRoot as drInt } from '@/horo'

const words = (path: string): string[] => path.split('/').filter(Boolean)

/** The path read left→right vs right→left — different words, so DIFFERENT paths (a/b/c ≠ c/b/a). */
export const forward = (path: string): string[] => words(path)
export const backward = (path: string): string[] => [...words(path)].reverse()

/** Each word's digit — its content-uuid's digital root. The digit-path beneath the word-path. */
export const digitsOf = (ws: readonly string[]): number[] => ws.map((w) => drUuid(uuidOfName(w)))

/** The path's reduced VALUE — the digital root of the sum of its word-digits. Sum is COMMUTATIVE, so
 *  this is direction-invariant: the same read L→R or R→L, for words and digits alike. */
export const pathValue = (path: string): number => drInt(digitsOf(words(path)).reduce((a, b) => a + b, 0))

/** The mirror law: forward and backward are different PATHS but one VALUE — max computed value, same
 *  on both sides. Different words, different folders; the same digital root, because the sum commutes. */
export const balanced = (path: string): boolean => pathValue(path) === pathValue(backward(path).join('/'))

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = 'dual/torus/fusion'
  console.log('mirror — the horo as path read both ways (left→right then right→left):')
  console.log('  forward  ' + forward(p).join('/') + '   digits ' + digitsOf(forward(p)).join('·'))
  console.log('  backward ' + backward(p).join('/') + '   digits ' + digitsOf(backward(p)).join('·'))
  console.log('  value ' + pathValue(p) + ' (L→R) = ' + pathValue(backward(p).join('/')) + ' (R→L) — same both sides: ' + balanced(p))
}
