/**
 * readme/entropy-unit — lawful physics bindings (no imports).
 *
 * Comparable unit label and Landauer floor — leaf module so ratchet scans and
 * accounting/corpus never pull readme/entropy's pivot·seal cycle at init.
 *
 * @see ./entropy — ../accounting/corpus
 */

/** The comparable unit label — entropy-bit (tamper-cost log₂ mass). */
export const COMPARABLE_UNIT = 'eb' as const

/** Landauer floor — one bit destroyed/ordered = 1 eb at unity horo scale. */
export const LANDAUER_BIT = Math.log2(2)
