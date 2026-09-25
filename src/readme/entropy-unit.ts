import { algebraLog2 } from '@/algebra'
/**
 * readme/entropy-unit — lawful physics bindings (no imports).
 *
 * Comparable unit label, Landauer floor and the horo decade — leaf module so ratchet
 * scans and accounting/corpus never pull readme/entropy's pivot·seal cycle at init.
 *
 * @see ./entropy — ../accounting/corpus — ../horo/arithmetic
 */

/** The comparable unit label — entropy-bit (tamper-cost log₂ mass). */
export const COMPARABLE_UNIT = 'eb' as const

/** Landauer floor — one bit destroyed/ordered = 1 eb at unity horo scale. */
export const LANDAUER_BIT = algebraLog2(2)

/**
 * The decade a horo digit normalises against — `horoRatio(8)` is 8/10.
 *
 * Exported so the prose that states the formula divides by the same constant the
 * arithmetic divides by. Bound to `horoRatio` by proof, never by coincidence
 * (`readme/test.ts`): a prose `horoRatio/10` reads as 8/10/10 and is the drift this
 * constant exists to make impossible.
 */
export const HORO_DECADE = 10

/**
 * The eb formula, rendered from the constants that evaluate it.
 *
 * The generated READMEs stated `eb = amount × log₂(weight) × horoRatio/10` — wrong
 * twice over, in every one of them. The weight IS the log₂ (a bit is `log₂2 = 1`, a
 * trinity `log₂3 = 1.585`), so a second log₂ collapses a Landauer line to `log₂1 = 0`;
 * and `horoRatio` is already `digit/10`, so dividing again reads ring 8 as 0.08 while
 * the table beside it says 0.8. The sentence also applied the horo factor to every
 * line, when the code scales ring-positioned lines only — which is exactly why those
 * tables show `horo ring 0.8` beside twelve seals of `1` at the same horo 8.
 *
 * `toComparableUnit` is the arithmetic; this is its prose twin, and `readme/test.ts`
 * proves they agree on the two lines the tables actually print.
 */
export function comparableUnitFormula(): string {
  return `${COMPARABLE_UNIT} = amount × log₂(states) × horo/${HORO_DECADE}`
}
