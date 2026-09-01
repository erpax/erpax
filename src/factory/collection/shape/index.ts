/**
 * factory/collection/shape — the rosetta: what SHAPE a collection is.
 *
 * `collectionSignature` scores a collection against the closed 9-axis basis, and a
 * new collection is warranted only by a NEW signature — otherwise it is a row, not
 * a table. `shapeRatchetVerdict` fails closed against ROSETTA_BASELINE so the basis
 * cannot silently grow, and `auditCorpus` reports the collapse clusters.
 *
 * @see ./SKILL.md
 */
import type { CollectionConfig, Field } from 'payload'

/**
 * Rosetta shape basis (2026-07-15) — the closed 9-axis space every collection
 * signature folds onto. Collections are POINTS in this space; a new collection
 * is only warranted by a NEW signature — otherwise it is a row in an existing
 * shape ([[rules]] rosetta limitation · [[horo]] 9-digit ring).
 */
export const SHAPE_AXES = [
  'money', 'party', 'item', 'period', 'lifecycle', 'record', 'schedule', 'report', 'standard',
] as const
export type ShapeAxis = (typeof SHAPE_AXES)[number]

const AXIS_MARKERS: Readonly<Record<ShapeAxis, ReadonlySet<string>>> = {
  money: new Set(['amount', 'debit', 'credit', 'currency', 'total', 'netAmount', 'grossAmount', 'unitPrice']),
  party: new Set(['employee', 'customer', 'supplier', 'party', 'vendor', 'counterparty', 'owner', 'contact', 'email']),
  item: new Set(['quantity', 'sku', 'unit', 'item', 'product', 'lot', 'batch', 'warehouse']),
  period: new Set(['periodStart', 'periodEnd', 'fiscalYear', 'period', 'effectiveFrom', 'dueDate', 'startDate', 'endDate']),
  lifecycle: new Set(['status']),
  record: new Set(['findings', 'assessment', 'evidence', 'conclusion', 'rationale', 'review', 'opinion', 'severity']),
  schedule: new Set(['schedule', 'frequency', 'recurrence', 'installment', 'nextRun']),
  report: new Set(['reportType', 'template', 'format', 'submission', 'filing']),
  standard: new Set(['standardId', 'standard', 'regulation', 'framework', 'directive']),
}

const flattenFieldNames = (fields: ReadonlyArray<Field>, out: string[] = []): string[] => {
  for (const f of fields) {
    const named = f as { name?: string; fields?: Field[] }
    if (typeof named.name === 'string') out.push(named.name)
    if (Array.isArray(named.fields)) flattenFieldNames(named.fields, out)
  }
  return out
}

/** Fold a built CollectionConfig to its rosetta signature — its point in the closed basis. */
export function collectionSignature(config: { fields: Field[] }): ReadonlyArray<ShapeAxis> {
  const names = new Set(flattenFieldNames(config.fields))
  return SHAPE_AXES.filter((axis) => [...AXIS_MARKERS[axis]].some((m) => names.has(m)))
}

export interface ShapeCatalogue {
  readonly collections: number
  readonly signatures: ReadonlyMap<string, readonly string[]>
  readonly basisOccupancy: number
}

/** Compute the shape catalogue over built configs — the measured basis, never hand-picked. */
export function shapeCatalogue(configs: ReadonlyArray<{ slug: string; fields: Field[] }>): ShapeCatalogue {
  const signatures = new Map<string, string[]>()
  for (const c of configs) {
    const key = collectionSignature(c).join('·') || 'plain'
    const list = signatures.get(key) ?? []
    list.push(c.slug)
    signatures.set(key, list)
  }
  return { collections: configs.length, signatures, basisOccupancy: signatures.size }
}

/**
 * Rosetta ratchet — fails CLOSED when the basis grows: more distinct signatures
 * or more collections than the sealed baseline means unfolded schema entropy.
 */
export function shapeRatchetVerdict(
  catalogue: Pick<ShapeCatalogue, 'collections' | 'basisOccupancy'>,
  baseline: { readonly collections: number; readonly signatures: number },
): { readonly ok: boolean; readonly detail: string } {
  const ok = catalogue.collections <= baseline.collections && catalogue.basisOccupancy <= baseline.signatures
  return {
    ok,
    detail: `collections ${catalogue.collections}/${baseline.collections} · signatures ${catalogue.basisOccupancy}/${baseline.signatures}`,
  }
}

/**
 * The sealed rosetta ratchet line (2026-07-15): the corpus must never GROW past this —
 * a new collection is warranted only by folding an existing one down (the 217→9 telos),
 * so both ceilings ratchet DOWN over time, never up. `erpax doctor corpus` fails closed
 * on any growth. Lower these numbers in the same diff that folds a collection away.
 */
export const ROSETTA_BASELINE = { collections: 210, signatures: 38 } as const

export interface CollapseCluster {
  readonly signature: string
  readonly members: readonly string[]
}

export interface CorpusAudit {
  readonly collections: number
  readonly signatures: number
  readonly speaking: number
  readonly bare: readonly string[]
  readonly inputHeavyHookless: readonly string[]
  /** Rosetta-purge: signature classes with ≥ threshold members — collapse candidates
   * (rows pretending to be tables). Largest first. */
  readonly collapseClusters: readonly CollapseCluster[]
  /** collections ÷ signatures — the compression headroom toward the basis (1.0 = fully folded). */
  readonly compressionHeadroom: number
}

/** The corpus gap audit, pure — shapes · speaking · bare · input-heavy · collapse candidates ([[rules]] rosetta).
 * Derived each number once (2026-07-15 session, ~20K transcript tokens); now a read. */
export function auditCorpus(configs: ReadonlyArray<CollectionConfig>, collapseThreshold = 10): CorpusAudit {
  const cat = shapeCatalogue(configs as ReadonlyArray<{ slug: string; fields: Field[] }>)
  const bare: string[] = []
  const heavy: string[] = []
  let speaking = 0
  for (const c of configs) {
    const hooks = (c.hooks?.afterChange?.length ?? 0) + (c.hooks?.beforeChange?.length ?? 0)
    if ((c.hooks?.afterChange?.length ?? 0) > 0) speaking++
    const required = JSON.stringify(c.fields).split('"required":true').length - 1
    if (hooks === 0 && collectionSignature(c as { fields: Field[] }).length === 0) bare.push(c.slug)
    if (hooks === 0 && required >= 5) heavy.push(c.slug)
  }
  const collapseClusters: CollapseCluster[] = [...cat.signatures.entries()]
    .filter(([, members]) => members.length >= collapseThreshold)
    .map(([signature, members]) => ({ signature, members: [...members] }))
    .sort((a, b) => b.members.length - a.members.length)
  return {
    collections: cat.collections,
    signatures: cat.basisOccupancy,
    speaking,
    bare,
    inputHeavyHookless: heavy,
    collapseClusters,
    compressionHeadroom: cat.basisOccupancy > 0 ? cat.collections / cat.basisOccupancy : 0,
  }
}
