/**
 * quantum/calculator — a calculator in the digital-root / mod-9 substrate ([[rodin]] = (ℤ/9ℤ)):
 * arithmetic folds to its digital root, so every result is a single digit 1..9 (or 0). This is the
 * [[quantum]]/math substrate applied as a calculator — deterministic, content-addressable results.
 * Merges into [[calculator]]. Composes [[calculator]] · [[quantum]] · [[rodin]] · [[math]].
 *
 *   tsx src/quantum/calculator/index.ts
 *
 * @standard the digital-root / mod-9 group ([[rodin]])
 * @see ../../calculator -- ../math -- ../../rodin -- ./SKILL.md
 */
import { root } from '@/quantum/math'

/** Add in the digital-root substrate: the digital root of the sum (mod-9). */
export const add = (a: number, b: number): number => root(a + b)

/** Multiply in the digital-root substrate: the digital root of the product (mod-9). */
export const mul = (a: number, b: number): number => root(a * b)

/** Fold any expression's numeric value to its digital root (1..9, or 0). */
export const fold = (value: number): number => root(value)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/calculator — add(7,5)=' + add(7, 5) + ' (mod-9) · mul(4,7)=' + mul(4, 7))
}
