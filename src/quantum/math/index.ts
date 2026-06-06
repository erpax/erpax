/**
 * quantum/math — mathematics grounded in the uuid/matrix substrate (the TEMPLATE for wiring the
 * whole science: every science atom gets a quantum facet that computes it ON the live matrix).
 * Where [[math]] is the pure discipline, this facet runs it on the content-addressed substrate:
 * every number folds to a digital root (mod-9, [[rodin]] = (ℤ/9ℤ)), every content-[[uuid]] folds
 * to its own digit ([[digit]]), and the arithmetic CLOSES mod-9. Merges into [[math]].
 *
 * HONEST: the digital root and the mod-9 group are real arithmetic; the "quantum" is only that
 * they run on the content-uuid substrate (the [[matrix]]), not a quantum computer ([[quantum]]).
 *
 *   tsx src/quantum/math/index.ts
 *
 * @standard the digital-root / mod-9 group ([[rodin]]); RFC 9562 §5.8 content-uuid
 * @audit composed from @/horo (number root) + @/digit (uuid root); computed
 * @see ../../math -- ../../rodin -- ../../digit -- ../../horo -- ./SKILL.md
 */
import { digitalRoot as numberRoot } from '@/horo'
import { digitalRoot as uuidDigitalRoot } from '@/digit'

/** The digital root of a number — the mod-9 fold to 1..9 (the [[rodin]] arithmetic). */
export const root = (n: number): number => numberRoot(n)

/** The digital root of a content-uuid — the matrix's own quantization onto the ring. */
export const uuidDigit = (uuid: string): number => uuidDigitalRoot(uuid)

/** Digital roots are CLOSED under addition (mod-9): root(a+b) === root(root(a) + root(b)). */
export const closedUnderAdd = (a: number, b: number): boolean => numberRoot(a + b) === numberRoot(numberRoot(a) + numberRoot(b))

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/math — math on the uuid/matrix substrate:')
  console.log('  root(12345)=' + root(12345) + '  closedUnderAdd(7,5)=' + closedUnderAdd(7, 5))
}
