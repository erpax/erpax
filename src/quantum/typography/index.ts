/**
 * quantum/typography — typography is holographic: every typographic feature a page uses is a
 * dimension the [[search]] index entangles and a forger must reproduce. So typographic depth
 * becomes [[tamper]]-cost — fuller typography (no gaps) costs more to forge. This is the quantum
 * facet of [[typography]] (it merges into it). Composes [[typography]] · [[quantum]] · [[holographic]] · [[tamper]].
 *
 *   tsx src/quantum/typography/index.ts
 *
 * @standard tamper-cost = entangled dimensions (the holographic principle)
 * @see ../../typography -- ../../tamper -- ../../holographic -- ./SKILL.md
 */
import { featuresUsed, coverage, FEATURES } from '@/typography'

/** Holographic depth: the number of distinct typographic dimensions present. */
export const depth = (md: string): number => featuresUsed(md).length

/** Tamper-cost in bits: each typographic dimension the forger must reproduce is one bit. */
export const tamperBits = (md: string): number => depth(md)

/** Gapless ⟺ every typographic feature is used — the holographic maximum (coverage = 1). */
export const isGapless = (md: string): boolean => coverage(md) === 1

if (import.meta.url === 'file://' + process.argv[1]) {
  const full = '# h\n**b** *i* `c`\n```\nx\n```\n[l](x)\n- a\n| a | b |\n> q\n::: tip\n:::\n$x$\n'
  console.log('quantum/typography — depth=' + depth(full) + '/' + FEATURES.length + ' · gapless=' + isGapless(full))
}
