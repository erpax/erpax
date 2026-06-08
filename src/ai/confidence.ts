/**
 * AI auto-accept confidence thresholds — imperial rationals only.
 *
 * Seal-bearing paths must not hand-set decimal literals (integrity law).
 * Every threshold is an exact rational: horo decade ratios, halves, thirds,
 * quarters, or their sum — never `0.92`, `0.95`, `0.97` literals.
 *
 * @see ../horo (`horoRatio`, `imperialRatio`) · ../integrity/SKILL.md
 */
import { horoRatio, imperialRatio } from '@/horo'

/** Reversible routing — horo unity per decade (9/10). */
export const AI_AUTO_ACCEPT_ROUTING = horoRatio(9)

/** Bank matching — unity + 1/50 (46/50, was 0.92 literal). */
export const AI_AUTO_ACCEPT_BANK = horoRatio(9) + imperialRatio(1, 50)

/** Invoice OCR — 19/20 (was 0.95 literal). */
export const AI_AUTO_ACCEPT_INVOICE = imperialRatio(19, 20)

/** Tax classification — 9/10 + 7/100 = 97/100 (was 0.97 literal; fines risk). */
export const AI_AUTO_ACCEPT_TAX = horoRatio(9) + horoRatio(7, 100)
