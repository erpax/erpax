/**
 * variant — the unbounded product dimension, as computable matter.
 *
 * A variant is NOT a row to copy and NOT a fixed grid (`option_1..12`) — it is the **expansion** of a product
 * across composable, open dimensions. erpax stores the *generator*, never the denormalised output: give it the
 * dimensions and the variant space falls out (`expandVariants`), so adding a colour grows the space with no
 * schema change. That is the whole anti-grid law ([[port]]: the one etrima anti-pattern never ported literally).
 *
 * DATA-TRUTH (etrima `product_variants`, N=42 979 over 3 513 products — 20 years of real garment production):
 *  - **~12.2 variants per product** mean expansion; the distribution runs 1..N with no cap — unbounded in fact,
 *    not just in principle.
 *  - The dimension is **free text, never an enum**: `PAOLA 80/20 3090 RUBINO NEW MILL STOCK` composes
 *    base ⊗ colour-code ⊗ colour ⊗ mill-qualifier. Two decades produced no closed vocabulary — the law holds.
 *  - `status` and `metadata` are **100% NULL** — dead columns. Not ported; lifecycle lives on the parent.
 *  - `name` is present on 30 151 (70%), `description` on 17 700 (41%) — both optional, so a variant is
 *    identified by its composition, not its prose.
 *
 * Identity is the FOLD ([[merge]]): a variant IS `fold(product ⊗ sorted dimension values)`. Same composition ⇒
 * same uuid ⇒ the duplicate merges instead of multiplying — the dedup that makes an unbounded space safe.
 *
 * @standard Commerce/product taxonomy — the open variant dimension (no cultivar/option enum)
 *
 * Composes [[merge]] · [[port]] · [[law]].
 */
import { foldToRoot } from '@/merge'

/** One open dimension — a name and its values. Add a value and the space grows; there is no fixed grid. */
export interface Dimension {
  readonly name: string
  readonly values: readonly string[]
}

/** One expanded variant — its content-address, the dimension values that compose it, and a readable label. */
export interface Variant {
  readonly uuid: string
  readonly values: Readonly<Record<string, string>>
  readonly label: string
}

/**
 * The expansion factor — ∏ |dimension|. Unbounded: each added value multiplies the space, which is why the
 * grid is stored as dimensions and never as columns. An empty dimension set expands to the bare product (1).
 */
export function expansionFactor(dims: readonly Dimension[]): number {
  return dims.reduce((n, d) => n * d.values.length, 1)
}

/**
 * A variant's identity — the fold of the product with its sorted dimension values ([[merge]]). Sorted, so the
 * composition is a SET not a sequence: the same variant described in any order folds to one uuid and dedupes.
 */
export function variantUuid(product: string, values: Readonly<Record<string, string>>): string {
  const composed = Object.keys(values)
    .sort()
    .map((k) => `${k}=${values[k]}`)
  return foldToRoot([`product=${product}`, ...composed])
}

/**
 * Expand a product across its dimensions — the cartesian product, each variant content-addressed. This is the
 * generator etrima's 42 979 rows are the output of: erpax keeps this, not the rows.
 */
export function expandVariants(product: string, dims: readonly Dimension[]): Variant[] {
  let rows: Array<Record<string, string>> = [{}]
  for (const d of dims) {
    const next: Array<Record<string, string>> = []
    for (const row of rows) {
      for (const v of d.values) next.push({ ...row, [d.name]: v })
    }
    rows = next
  }
  return rows.map((values) => ({
    uuid: variantUuid(product, values),
    values,
    label: [product, ...Object.keys(values).sort().map((k) => values[k])].join(' '),
  }))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const dims: Dimension[] = [
    { name: 'colour', values: ['RUBINO', 'ROSSO SCURO', 'ARANCIO'] },
    { name: 'mill', values: ['NEW MILL', 'PAPI'] },
  ]
  const variants = expandVariants('PAOLA 80/20', dims)
  console.log(`variant — the unbounded dimension (etrima: 42 979 variants / 3 513 products = ~12.2× mean):`)
  console.log(`  ${dims.length} dimensions ⇒ expansion factor ${expansionFactor(dims)}`)
  for (const v of variants.slice(0, 3)) console.log(`  ${v.label} · ${v.uuid.slice(0, 8)}`)
}
