/**
 * recompute-parent-aggregates — generic afterChange/afterDelete factory that
 * caches a parent document's denormalised SUM / COUNT / MIN / MAX columns from
 * its child rows, recomputing on every child create / update / delete (and on
 * reparent — both the old and new parent are refreshed).
 *
 * Ports the Rails write-time aggregate-cache cascade to Payload. In the source
 * apps a `before_save` / `after_commit :update_references` recomputed a parent's
 * cached totals from its children; here the *child's* lifecycle hook does it,
 * which is the Payload-native seam (the parent has no view of its children at
 * its own write time). The single factory is applied uniformly — never re-rolled
 * per collection — exactly like the balanced-entry total hook.
 *
 * Re-entrancy: a per-request Set on `req.context` records which (parentSlug, id)
 * pairs are mid-recompute. A cyclic cascade (A→B→A) is blocked while it unwinds,
 * but independent sequential child writes each recompute afresh (the id is
 * released in `finally`), so bulk line edits stay correct.
 *
 * Best-effort, like the Rails `after_commit`: a recompute failure is logged, not
 * thrown — the child write must not roll back because a derived total hiccuped.
 *
 * @standard EN-16931:2017 BT-106/109/110/112 document-totals
 * @standard ISA-95 IEC-62264 production-order-aggregation
 * @audit ISO-19011:2018 audit-trail derived-total-provenance
 * @compliance SOX §404 internal-controls total-completeness
 * @see ~/github/ceccec/erpax InvoiceTotalsConcern#set_totals, AccountingEquationConcern
 * @see ~/github/ceccec/etrima lot.update_totals (+ counter_cache)
 * @see ../collections/accounting/balanced-entry.hook.ts (the sibling sum hook)
 */

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionSlug,
  PayloadRequest,
  Where,
} from 'payload'

export type AggregateOp = 'sum' | 'count' | 'min' | 'max'

export interface AggregateSpec {
  /** Dot-path on the PARENT to write (e.g. `amounts.itemTotal`). */
  readonly target: string
  readonly op: AggregateOp
  /** Dot-path on each CHILD to read. Required for sum/min/max; ignored for count. */
  readonly source?: string
}

/** read/set accessors over the parent draft, used by the optional derive pass. */
export interface DeriveAccessors {
  readonly read: (path: string) => unknown
  readonly set: (path: string, value: unknown) => void
}

export interface RecomputeParentAggregatesConfig {
  readonly childSlug: CollectionSlug
  readonly parentSlug: CollectionSlug
  /** Field on the child that relates to the parent (e.g. `invoice`, `lot`). */
  readonly parentRelField: string
  readonly aggregates: readonly AggregateSpec[]
  /**
   * Optional second pass for fields derived from the just-recomputed parent
   * (e.g. `amounts.totalDue = totalAmount − totalPaid`). Reads see aggregate
   * results overlaid on the stored parent.
   */
  readonly derive?: (acc: DeriveAccessors) => void
  /** Tenant scope field on parent + child (default `tenant`). */
  readonly tenantField?: string
}

const CTX_IN_PROGRESS = '_recomputeAggregatesInProgress'

function relId(v: unknown): string | undefined {
  if (v == null) return undefined
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  if (typeof v === 'object' && 'id' in (v as object)) {
    const id = (v as { id: unknown }).id
    return id == null ? undefined : String(id)
  }
  return undefined
}

function getPath(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (acc, k) => (acc != null && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined),
      obj,
    )
}

function setPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.')
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    const next = cur[k]
    if (next == null || typeof next !== 'object') cur[k] = {}
    cur = cur[k] as Record<string, unknown>
  }
  cur[keys[keys.length - 1]] = value
}

function num(v: unknown): number {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : 0
}

function aggregateValue(spec: AggregateSpec, children: ReadonlyArray<unknown>): number {
  if (spec.op === 'count') return children.length
  const vals = children.map((c) => num(getPath(c, spec.source as string)))
  switch (spec.op) {
    case 'sum':
      return vals.reduce((a, b) => a + b, 0)
    case 'min':
      return vals.length ? Math.min(...vals) : 0
    case 'max':
      return vals.length ? Math.max(...vals) : 0
  }
}

async function recomputeParent(
  req: PayloadRequest,
  cfg: RecomputeParentAggregatesConfig,
  parentId: string,
  tenantId: string | undefined,
): Promise<void> {
  const ctx = req.context as Record<string, unknown>
  const inProgress = (ctx[CTX_IN_PROGRESS] as Set<string> | undefined) ?? new Set<string>()
  ctx[CTX_IN_PROGRESS] = inProgress
  const key = `${cfg.parentSlug}:${parentId}`
  if (inProgress.has(key)) return
  inProgress.add(key)

  try {
    const tenantField = cfg.tenantField ?? 'tenant'
    const relWhere = { [cfg.parentRelField]: { equals: parentId } }
    const where: Where = tenantId
      ? { and: [relWhere, { [tenantField]: { equals: tenantId } }] }
      : relWhere

    const { docs: children } = await req.payload.find({
      collection: cfg.childSlug,
      where,
      depth: 0,
      pagination: false,
      overrideAccess: true,
      req,
    })

    const parent = (await req.payload
      .findByID({ collection: cfg.parentSlug, id: parentId, depth: 0, overrideAccess: true, req })
      .catch((): null => null)) as unknown as Record<string, unknown> | null
    if (!parent) return

    // Build the update payload, seeding each touched top-level group from the
    // stored parent so a partial group write never clobbers sibling fields
    // (e.g. payments-maintained amounts.totalPaid vs lines-maintained totals).
    const data: Record<string, unknown> = {}
    const set = (path: string, value: unknown): void => {
      const top = path.split('.')[0]
      if (!(top in data)) {
        const cur = parent[top]
        data[top] = cur && typeof cur === 'object' && !Array.isArray(cur) ? { ...(cur as Record<string, unknown>) } : {}
      }
      setPath(data, path, value)
    }
    const read = (path: string): unknown => {
      const fromData = getPath(data, path)
      return fromData !== undefined ? fromData : getPath(parent, path)
    }

    for (const spec of cfg.aggregates) set(spec.target, aggregateValue(spec, children))
    cfg.derive?.({ read, set })

    await req.payload.update({
      collection: cfg.parentSlug,
      id: parentId,
      data,
      depth: 0,
      overrideAccess: true,
      req,
    })
  } finally {
    inProgress.delete(key)
  }
}

export interface RecomputeParentAggregatesHooks {
  readonly afterChange: CollectionAfterChangeHook
  readonly afterDelete: CollectionAfterDeleteHook
}

/**
 * Build the child-collection afterChange + afterDelete hooks that keep the
 * parent's cached aggregates in sync. Spread both onto the child collection:
 *
 *   const lineAgg = recomputeParentAggregates({ childSlug: 'invoice-lines', ... })
 *   hooks: { afterChange: [lineAgg.afterChange, ...], afterDelete: [lineAgg.afterDelete] }
 */
export function recomputeParentAggregates(
  cfg: RecomputeParentAggregatesConfig,
): RecomputeParentAggregatesHooks {
  const tenantField = cfg.tenantField ?? 'tenant'

  const run = async (
    req: PayloadRequest,
    doc: Record<string, unknown> | undefined,
    previousDoc: Record<string, unknown> | undefined,
  ): Promise<void> => {
    const ids = new Set<string>()
    const cur = relId(getPath(doc, cfg.parentRelField))
    if (cur) ids.add(cur)
    const prev = relId(getPath(previousDoc, cfg.parentRelField))
    if (prev) ids.add(prev)

    const tenantId = relId(getPath(doc ?? previousDoc, tenantField))
    for (const id of ids) {
      try {
        await recomputeParent(req, cfg, id, tenantId)
      } catch (err) {
        req.payload.logger.warn(
          { err },
          `recomputeParentAggregates: ${cfg.parentSlug}#${id} from ${cfg.childSlug} failed`,
        )
      }
    }
  }

  return {
    afterChange: async ({ req, doc, previousDoc }) => {
      await run(req, doc as Record<string, unknown>, previousDoc as Record<string, unknown> | undefined)
      return doc
    },
    afterDelete: async ({ req, doc }) => {
      await run(req, doc as Record<string, unknown>, undefined)
      return doc
    },
  }
}
