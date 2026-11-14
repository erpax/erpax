/**
 * etrima → erpax — the port. Each etrima table maps onto the erpax collection that took its place.
 *
 * Data that is not code is a seed: this turns rows of the upstream etrima database into erpax
 * documents, ready for `@payloadcms/plugin-import-export` (one JSON array per file). It is the
 * load path the replay (`pnpm test:etrima`) was missing — the replay checks the hooks against
 * etrima rows, this carries the rows across.
 *
 *   - `oid` gives every row a stable id, so a relationship written here points at the same
 *     document on every run and a re-import updates rather than duplicates.
 *   - a mapper is pure: one row in, one document out. No database, no clock.
 *   - `conform` measures a document against the LIVE collection config — unknown field, missing
 *     required field, value outside a select — so a mapper cannot drift from the schema silently.
 *
 * What is deliberately not carried: derived values the collection's own hooks recompute on
 * import (lot status, work-order totals and state, shift wage and efficiency when measurable).
 *
 * @standard ISA-95:2013 / IEC-62264-1 production-operations-management
 * @compliance GDPR Art.5(1)(c) data-minimisation — an employee is exported as number, name and hire date only
 * @see tests/replay/etrima.ts (the same rows, replayed through the hooks)
 */
import { createHash } from 'node:crypto'

import type { CollectionConfig, Field } from 'payload'

export type Row = Record<string, unknown>
export type Doc = Record<string, unknown> & { id: string }

/**
 * A stable uuid for one etrima row: same table and id, same uuid. RFC 9562 version 8 (custom) —
 * the first 128 bits of SHA-256 over the row's address. It is an identifier, not a secret, but
 * SHA-256 keeps a weak hash away from ids derived from personal records.
 */
export const oid = (table: string, id: unknown): string => {
  const hex = createHash('sha256').update(`etrima:${table}:${String(id)}`).digest('hex')
  const variant = ((parseInt(hex.slice(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, '0')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-8${hex.slice(13, 16)}-${variant}${hex.slice(18, 20)}-${hex.slice(20, 32)}`
}

/** A relationship to another etrima row, or undefined when the row has none. */
const ref = (table: string, id: unknown): string | undefined => (id === null || id === undefined ? undefined : oid(table, id))

const iso = (v: unknown): string | undefined => {
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? undefined : v.toISOString()
  return typeof v === 'string' && v !== '' ? v : undefined
}
const num = (v: unknown): number | undefined => (v === null || v === undefined || v === '' ? undefined : Number(v))
const text = (v: unknown): string | undefined => (typeof v === 'string' && v.trim() !== '' ? v : undefined)

/** Drop undefined values, so an absent etrima column is an absent field and not an explicit null. */
const compact = <T extends Record<string, unknown>>(doc: T): T => {
  for (const key of Object.keys(doc)) if (doc[key] === undefined) delete doc[key]
  return doc
}

/** The 12 fixed `option_N_*` column groups folded into an `options[]` array (empty slots dropped). */
export const options = (row: Row, fields: Record<string, string>, labels?: Row): Row[] => {
  const out: Row[] = []
  for (let i = 1; i <= 12; i++) {
    const line: Row = {}
    let any = false
    for (const [key, suffix] of Object.entries(fields)) {
      const value = num(row[`option_${i}_${suffix}`])
      if (value !== undefined) any = true
      line[key] = value
    }
    if (!any) continue
    const label = labels ? text(labels[`option_${i}_label`]) : undefined
    out.push(compact(label ? { label, ...line } : line))
  }
  return out
}

/** A shift's lifecycle position from its watermarks — the furthest one reached. */
export const shiftStatus = (row: Row): string =>
  row.closed_at ? 'closed' : row.finished_at ? 'finished' : row.started_at ? 'started' : 'opened'

export interface Mapper {
  /** The erpax collection the rows land in. */
  readonly collection: string
  /** The etrima table read (aliased `t`); extra columns may be joined in. */
  readonly sql: string
  readonly map: (row: Row) => Doc
}

/**
 * The mappers, in import order: a document is listed after everything it points at.
 * Each `sql` ends in `where true` so the exporter can append its keyset page.
 */
export const mappers: readonly Mapper[] = [
  {
    collection: 'work-phases',
    sql: `select t.*, nullif(split_part(t.ancestry, '/', -1), '') as parent_id from work_phases t where true`,
    map: (r) =>
      compact({
        id: oid('work_phases', r.id),
        code: text(r.code) ?? `WP-${String(r.id)}`,
        // 29,661 of 41,854 etrima phases carry no name; the code is what the shop floor called them.
        name: text(r.name) ?? text(r.code) ?? `WP-${String(r.id)}`,
        kind: text(r.kind),
        parent: ref('work_phases', r.parent_id),
        machineType: text(r.machine_code),
        workType: text(r.work_type),
        workSeconds: num(r.work_seconds),
        skillLevel: num(r.skill_level),
      }),
  },
  {
    collection: 'products',
    sql: 'select t.* from products t where true',
    map: (r) =>
      compact({
        id: oid('products', r.id),
        title: text(r.name) ?? text(r.code) ?? `P-${String(r.id)}`,
        code: text(r.code),
        barcode: text(r.barcode),
        physical: compact({ hsCode: text(r.hs_code), contents: text(r.contents), grams: num(r.net_weight) }),
      }),
  },
  {
    collection: 'employees',
    sql: `select t.id, t.number, t.name, t.started_at, t.created_at, t.left_at from employees t where true`,
    map: (r) => {
      const name = text(r.name) ?? `Employee ${String(r.id)}`
      const parts = name.trim().split(/\s+/)
      return compact({
        id: oid('employees', r.id),
        employeeNumber: text(r.number) ?? `E-${String(r.id)}`,
        displayName: name,
        identity: { givenName: parts[0] ?? name, familyName: parts.length > 1 ? parts.slice(1).join(' ') : (parts[0] ?? name) },
        jobTitle: 'Production worker',
        employmentType: 'full_time_indefinite',
        hireDate: iso(r.started_at) ?? iso(r.created_at),
        terminationDate: iso(r.left_at),
      })
    },
  },
  {
    collection: 'lots',
    sql: 'select t.* from lots t where true',
    map: (r) =>
      compact({
        id: oid('lots', r.id),
        number: text(r.number),
        product: ref('products', r.product_id),
        kind: text(r.kind),
        confirmedAt: iso(r.confirmed_at),
        startedAt: iso(r.started_at),
        finishedAt: iso(r.finished_at),
        closedAt: iso(r.closed_at),
        canceledAt: iso(r.canceled_at),
        cancelReason: text(r.cancel_reason),
        date: iso(r.date),
        deliveryDate: iso(r.delivery_date),
        shippedAt: iso(r.shipped_at),
        deliveredAt: iso(r.delivered_at),
        unitsOrdered: num(r.units_ordered),
        units: num(r.units),
        unitsProduced: num(r.units_produced),
        unitsPacked: num(r.units_packed),
        unitsShipped: num(r.units_shipped),
        unitsDelivered: num(r.units_delivered),
        unitsInvoiced: num(r.units_invoiced),
        currency: text(r.currency_code),
        unitPrice: num(r.unit_price),
        unitCost: num(r.unit_cost),
        amountInvoiced: num(r.amount_invoiced),
        amountPaid: num(r.amount_paid),
        minutesOrdered: num(r.minutes_ordered),
        minutesProduced: num(r.minutes_produced),
        minutesToProduce: num(r.minutes_to_produce),
        netWeight: num(r.net_weight),
        grossWeight: num(r.gross_weight),
        billableWeight: num(r.billable_weight),
        lotVariantsCount: num(r.lot_variants_count),
        lotWorkPhasesCount: num(r.lot_work_phases_count),
        notes: text(r.note),
      }),
  },
  {
    collection: 'lot-work-phases',
    sql: 'select t.* from lot_work_phases t where true',
    map: (r) =>
      compact({
        id: oid('lot_work_phases', r.id),
        lot: ref('lots', r.lot_id),
        workPhase: ref('work_phases', r.work_phase_id),
        sort: num(r.sort),
        code: text(r.code),
        name: text(r.name),
        unitsOrdered: num(r.units_ordered),
        unitsProduced: num(r.units_produced),
        seconds: num(r.seconds),
        minutes: num(r.minutes),
        minutesProduced: num(r.minutes_produced),
        minutesRemaining: num(r.minutes_remaining),
        minutesBackordered: num(r.minutes_backordered),
        efficiencyPercent: num(r.efficiency_percent),
        percentCompleted: num(r.percent_completed),
        payPerHour: num(r.pay_per_hour),
        pricePerMinute: num(r.price_per_minute),
        variantsCount: num(r.variants_count),
        batchesCount: num(r.batches_count),
        startedAt: iso(r.started_at),
        completedAt: iso(r.completed_at),
        confirmedAt: iso(r.confirmed_at),
        notes: text(r.note),
      }),
  },
  {
    collection: 'lot-variants',
    sql: `select t.*, v.product_id from lot_variants t left join product_variants v on v.id = t.product_variant_id where true`,
    map: (r) =>
      compact({
        id: oid('lot_variants', r.id),
        lot: ref('lots', r.lot_id),
        productVariant: ref('products', r.product_id),
        workPhase: ref('lot_work_phases', r.lot_work_phase_id),
        code: text(r.code),
        name: text(r.name),
        batch: text(r.batch),
        subVariant: num(r.sub_variant),
        options: options(r, {
          units: 'units',
          produced: 'units_produced',
          packed: 'units_packed',
          shipped: 'units_shipped',
          delivered: 'units_delivered',
          ordered: 'units_ordered',
          unitGrams: 'unit_grams',
          minutesOrdered: 'minutes_ordered',
          minutesProduced: 'minutes_produced',
        }),
        unitsOrdered: num(r.units_ordered),
        units: num(r.units),
        unitsProduced: num(r.units_produced),
        unitsPacked: num(r.units_packed),
        unitsShipped: num(r.units_shipped),
        unitsDelivered: num(r.units_delivered),
        minutesOrdered: num(r.minutes_ordered),
        minutesProduced: num(r.minutes_produced),
        minutesToProduce: num(r.minutes_to_produce),
        netWeight: num(r.net_weight),
        grossWeight: num(r.gross_weight),
        billableWeight: num(r.billable_weight),
        notes: text(r.note),
      }),
  },
  {
    collection: 'work-shifts',
    sql: `select t.*, c.employee_id from work_shifts t left join employee_contracts c on c.id = t.employee_contract_id where true`,
    map: (r) =>
      compact({
        id: oid('work_shifts', r.id),
        reference: `WS-${String(r.id)}`,
        actor: ref('employees', r.employee_id),
        date: iso(r.date),
        status: shiftStatus(r),
        startedAt: iso(r.started_at),
        finishedAt: iso(r.finished_at),
        closedAt: iso(r.closed_at),
        presenceMinutes: num(r.presence_minutes),
        shiftMinutes: num(r.shift_minutes),
        payPerHour: num(r.pay_per_hour),
        minutesOrdered: num(r.minutes_ordered),
        minutesProduced: num(r.minutes_produced),
        // Carried so the Rails `||=` fallback holds on import: a recorded value stands when nothing is measurable.
        efficiencyPercent: num(r.efficiency_percent),
        productsCount: num(r.products_count),
        lotsCount: num(r.lots_count),
        variantsCount: num(r.variants_count),
        phasesCount: num(r.phases_count),
        unitsCount: num(r.units_count),
      }),
  },
  {
    collection: 'work-orders',
    sql: `select t.*, p.sort as phase_sort from work_orders t left join lot_work_phases p on p.id = t.lot_work_phase_id where true`,
    map: (r) =>
      compact({
        id: oid('work_orders', r.id),
        reference: `WO-${String(r.id)}`,
        date: iso(r.date),
        options: options(r, { ordered: 'units_ordered', produced: 'units_produced', backordered: 'units_backordered' }),
        unitSeconds: num(r.unit_seconds),
        machinesPerWorker: num(r.machines_per_worker),
        payPerHour: num(r.pay_per_hour),
        efficiencyPercent: num(r.efficiency_percent),
        startedAt: iso(r.started_at),
        completedAt: iso(r.completed_at),
        estimatedAt: iso(r.estimated_at),
        lotVariant: ref('lot_variants', r.lot_variant_id),
        lotWorkPhase: ref('lot_work_phases', r.lot_work_phase_id),
        lotWorkPhaseSort: num(r.phase_sort),
        workShift: ref('work_shifts', r.work_shift_id),
        note: text(r.note),
      }),
  },
  {
    collection: 'packs',
    sql: 'select t.* from packs t where true',
    map: (r) =>
      compact({
        id: oid('packs', r.id),
        number: num(r.number),
        barcode: text(r.barcode),
        unitsPacked: num(r.units_packed),
        netWeight: num(r.net_weight),
        tareWeight: num(r.tare_weight),
        grossWeight: num(r.gross_weight),
        volume: num(r.volume),
        productsCount: num(r.products_count),
        variantsCount: num(r.variants_count),
        itemsCount: num(r.items_count),
        lot: ref('lots', r.lot_id),
        note: text(r.note),
      }),
  },
  {
    collection: 'pack-items',
    sql: 'select t.* from pack_items t where true',
    map: (r) =>
      compact({
        id: oid('pack_items', r.id),
        reference: `PI-${String(r.id)}`,
        pack: ref('packs', r.pack_id),
        lotVariant: ref('lot_variants', r.lot_variant_id),
        unitsOrdered: num(r.units_ordered),
        unitsPacked: num(r.units_packed),
        options: options(r, { ordered: 'units_ordered', packed: 'units_packed', unitGrams: 'unit_grams', netUnitGrams: 'net_unit_grams' }),
        note: text(r.note),
      }),
  },
]

// ─── conformity: a document measured against the live collection config ─────

interface Shape {
  readonly required: boolean
  readonly options?: ReadonlySet<string>
  readonly children?: Map<string, Shape>
  readonly many?: boolean
}

const shapeOf = (fields: readonly Field[], into = new Map<string, Shape>()): Map<string, Shape> => {
  for (const field of fields) {
    if (field.type === 'tabs') {
      for (const tab of field.tabs) {
        if ('name' in tab && typeof tab.name === 'string') into.set(tab.name, { required: false, children: shapeOf(tab.fields) })
        else shapeOf(tab.fields, into)
      }
      continue
    }
    if (field.type === 'row' || field.type === 'collapsible') {
      shapeOf(field.fields, into)
      continue
    }
    if (!('name' in field)) continue
    // A required field with a default is satisfied by Payload itself on create; only one without is the document's to supply.
    const required = 'required' in field && field.required === true && !('defaultValue' in field && field.defaultValue !== undefined)
    if (field.type === 'group') into.set(field.name, { required, children: shapeOf(field.fields) })
    else if (field.type === 'array') into.set(field.name, { required, children: shapeOf(field.fields), many: true })
    else if (field.type === 'select') into.set(field.name, { required, options: new Set(field.options.map((o) => (typeof o === 'string' ? o : o.value))) })
    else into.set(field.name, { required })
  }
  return into
}

const measure = (value: Record<string, unknown>, shape: Map<string, Shape>, path: string, problems: string[]): void => {
  for (const [key, v] of Object.entries(value)) {
    if (path === '' && key === 'id') continue
    const field = shape.get(key)
    if (!field) {
      problems.push(`unknown field ${path}${key}`)
      continue
    }
    if (field.options && typeof v === 'string' && !field.options.has(v)) problems.push(`${path}${key} = ${JSON.stringify(v)} is not an option`)
    if (field.children && v && typeof v === 'object') {
      for (const item of field.many ? (v as unknown[]) : [v]) measure(item as Record<string, unknown>, field.children, `${path}${key}.`, problems)
    }
  }
  for (const [key, field] of shape) {
    const v = value[key]
    if (field.required && (v === undefined || v === null || v === '')) problems.push(`missing required ${path}${key}`)
    else if (field.children && !field.many && v === undefined && [...field.children.values()].some((c) => c.required)) problems.push(`missing required ${path}${key}`)
  }
}

/** What stops this document from being a valid one of this collection. Empty means it conforms. */
export const conform = (collection: Pick<CollectionConfig, 'fields'>, doc: Record<string, unknown>): string[] => {
  const problems: string[] = []
  measure(doc, shapeOf(collection.fields), '', problems)
  return problems
}
