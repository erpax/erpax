/**
 * chart — a pure chart spec: a numeric [[series]] with its range, and a deterministic normalizer to
 * [0,1] (the scale). No rendering — just the spec as [[data]], so the [[quantum]]/chart facet can
 * render it via the analog aura (colour per value). Composes [[series]] · [[data]] · [[scale]].
 *
 *   tsx src/chart/index.ts
 *
 * @see ../series -- ../data -- ../scale -- ../quantum/chart -- ./SKILL.md
 */
export interface Chart {
  readonly series: readonly number[]
  readonly min: number
  readonly max: number
}

/** Build a chart from a numeric series (computes its range; empty ⇒ 0..0). */
export const chart = (series: readonly number[]): Chart =>
  series.length === 0 ? { series, min: 0, max: 0 } : { series, min: Math.min(...series), max: Math.max(...series) }

/** Normalize a value to [0,1] within the chart's range (0 when flat). */
export const normalize = (c: Chart, v: number): number => (c.max === c.min ? 0 : (v - c.min) / (c.max - c.min))

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = chart([3, 1, 4, 1, 5])
  console.log('chart — range ' + c.min + '..' + c.max + ' · normalize(4)=' + normalize(c, 4).toFixed(2))
}
