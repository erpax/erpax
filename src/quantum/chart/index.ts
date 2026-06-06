/**
 * quantum/chart — render a [[chart]] through the analog aura: each value maps to a colour from the
 * spectrum by its normalized position ([[color]] · [[signal]] · [[analog]]). The data becomes a
 * coherent colour field — the same data renders the same colours (deterministic). Merges into [[chart]].
 * Composes [[chart]] · [[color]] · [[analog]] · [[signal]] · [[quantum]].
 *
 *   tsx src/quantum/chart/index.ts
 *
 * @see ../../chart -- ../../color -- ../../analog -- ../../signal -- ./SKILL.md
 */
import { chart, normalize, type Chart } from '@/chart'
import { colorOf } from '@/color'

/** Render each value to a spectrum colour by its normalized position (the analog aura over the chart). */
export const colors = (c: Chart): string[] => c.series.map((v) => colorOf(1 + Math.round(normalize(c, v) * 6)))

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/chart — colours: ' + colors(chart([1, 3, 5])).join(' '))
}
