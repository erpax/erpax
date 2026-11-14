/**
 * Replay — the erpax collection hooks run over every real etrima row.
 *
 * Each row's RECORDED inputs are mapped onto the erpax document shape, the collection's own
 * exported hook computes the derived fields, and the result is compared with what etrima stored.
 * The output is a match count per law, with the ids of the first rows that disagree. A law marked
 * "(stated)" is an @invariant the collection's banner claims but no hook enforces: the replay
 * measures the claim against the data, since there is no code to run. It reads
 * only; nothing is written to either database, and no row content is printed (ids and counts only).
 *
 *   pnpm test:etrima                      every row
 *   pnpm test:etrima --limit 50000        the first N rows of each table
 *   ETRIMA_DATABASE_URL=postgres://…      another database (default: local etrima_production)
 *
 * Needs a restored etrima dump, so it is a local measurement and not a CI lane.
 */
import type { CollectionBeforeChangeHook } from 'payload'
import pg from 'pg'

import { rollUpLotVariantOptions } from '@/collections/lot-variants'
import { warnLotWorkPhaseFunnel } from '@/collections/lot-work-phases'
import { deriveLotState } from '@/collections/lots'
import { rollUpOptions } from '@/collections/pack-items'
import { balanceWeight, derivePackState } from '@/collections/packs'
import { assertTotalsBalance, deriveState, minutesRemaining, pieceRateWage, pieceWage } from '@/collections/work-orders'
import { computeShiftAuthority, requireWageToClose } from '@/collections/work-shifts'

type Row = Record<string, unknown>
type HookArgs = Parameters<CollectionBeforeChangeHook>[0]

const run = (hook: CollectionBeforeChangeHook, data: Row): Row => {
  void hook({ data, req: {}, context: {}, operation: 'update' } as unknown as HookArgs)
  return data
}

// ─── the tally ────────────────────────────────────────────────────────
interface Law {
  table: string
  law: string
  rows: number
  match: number
  samples: number[]
}
const laws = new Map<string, Law>()
const tally = (table: string, law: string, id: unknown, ok: boolean): void => {
  const key = `${table} · ${law}`
  let l = laws.get(key)
  if (!l) laws.set(key, (l = { table, law, rows: 0, match: 0, samples: [] }))
  l.rows++
  if (ok) l.match++
  else if (l.samples.length < 5) l.samples.push(Number(id))
}
const dist = new Map<string, number>()
const count = (key: string): void => void dist.set(key, (dist.get(key) ?? 0) + 1)

const n = (v: unknown): number => (v === null || v === undefined ? 0 : Number(v))
const cents = (v: unknown): number => Math.round(n(v) * 100)
const iso = (v: unknown): string | null => (v instanceof Date ? v.toISOString() : null)

/** The 12 fixed `option_N_*` column groups folded into the erpax `options[]` array (empty slots dropped). */
const options = (row: Row, fields: Record<string, string>): Row[] => {
  const out: Row[] = []
  for (let i = 1; i <= 12; i++) {
    const line: Row = {}
    let any = false
    for (const [key, suffix] of Object.entries(fields)) {
      const v = row[`option_${i}_${suffix}`]
      if (v !== null && v !== undefined) any = true
      line[key] = v
    }
    if (any) out.push(line)
  }
  return out
}

// ─── the stream (keyset pages, so 2M wide rows never sit in memory at once) ─
const limitArg = process.argv.indexOf('--limit')
const LIMIT = limitArg > 0 ? Number(process.argv[limitArg + 1]) : Infinity
const PAGE = 20_000

const each = async (db: pg.Client, sql: string, visit: (row: Row) => void): Promise<number> => {
  let after = 0
  let seen = 0
  while (seen < LIMIT) {
    const size = Math.min(PAGE, LIMIT - seen)
    const { rows } = await db.query<Row>(`${sql} and t.id > $1 order by t.id limit ${size}`, [after])
    if (rows.length === 0) break
    for (const row of rows) visit(row)
    after = Number(rows[rows.length - 1]!.id)
    seen += rows.length
  }
  return seen
}

// ─── the replays ──────────────────────────────────────────────────────
/** Σ unrounded piece wage per shift (what `shiftOrderWage` rolls up), accumulated while the work orders replay. */
const orderWage = new Map<number, number>()
let pieceWageTotalCents = 0

const workOrders = (row: Row): void => {
  const id = row.id
  const doc = run(assertTotalsBalance, {
    options: options(row, { ordered: 'units_ordered', produced: 'units_produced', backordered: 'units_backordered' }),
  })
  tally('work_orders', 'unitsOrdered = Σ options.ordered', id, doc.unitsOrdered === n(row.units_ordered))
  tally('work_orders', 'unitsProduced = Σ options.produced', id, doc.unitsProduced === n(row.units_produced))
  tally('work_orders', 'unitsBackordered = Σ options.backordered', id, doc.unitsBackordered === n(row.units_backordered))

  if (row.lot_variant_id !== null) tally('work_orders', '(stated) lotVariant resolves', id, row.variant_found !== null)
  if (row.lot_work_phase_id !== null) tally('work_orders', '(stated) lotWorkPhase resolves', id, row.phase_found !== null)
  if (row.variant_lot !== null && row.phase_lot !== null)
    tally('work_orders', '(stated) lotVariant and lotWorkPhase belong to one lot', id, row.variant_lot === row.phase_lot)

  const shape = {
    unitsOrdered: n(row.units_ordered),
    unitsProduced: n(row.units_produced),
    machinesPerWorker: row.machines_per_worker as number | null,
    unitSeconds: row.unit_seconds as number | null,
    payPerHour: row.pay_per_hour === null ? null : n(row.pay_per_hour),
    completedAt: iso(row.completed_at),
  }
  if (row.minutes_remaining !== null)
    tally('work_orders', 'minutesRemaining = ⌊(ordered−produced)·unitSeconds/mpw/60⌋', id, minutesRemaining(shape) === n(row.minutes_remaining))

  pieceWageTotalCents += cents(pieceRateWage(shape))
  const wage = pieceWage(shape)
  if (row.work_shift_id !== null && wage > 0) {
    const shift = Number(row.work_shift_id)
    orderWage.set(shift, (orderWage.get(shift) ?? 0) + wage)
  }
  count(`work_orders state ${deriveState(shape)} · etrima completed=${String(row.completed)} closed=${String(row.closed)}`)
}

const workShifts = (row: Row): void => {
  const id = row.id
  const inputs = (): Row => ({
    presenceMinutes: row.presence_minutes,
    shiftMinutes: row.shift_minutes,
    minutesOrdered: row.minutes_ordered,
    minutesProduced: row.minutes_produced,
    payPerHour: row.pay_per_hour,
    orderWage: orderWage.get(Number(id)) ?? 0,
  })
  const doc = run(computeShiftAuthority, inputs())

  if (row.minutes_backordered !== null)
    tally('work_shifts', 'minutesBackordered = max(0, ordered − produced)', id, doc.minutesBackordered === n(row.minutes_backordered))

  const measurable = n(row.presence_minutes) > 0 && n(row.minutes_produced) > 0
  if (measurable && row.efficiency_percent !== null) {
    const delta = Math.abs(n(doc.efficiencyPercent) - n(row.efficiency_percent))
    tally('work_shifts', 'efficiency = ⌊produced·100/presence⌋ (exact)', id, delta === 0)
    tally('work_shifts', 'efficiency = ⌊produced·100/presence⌋ (within ±1)', id, delta <= 1)
  }
  if (!measurable && row.efficiency_percent !== null) {
    // the fallback, replayed WITHOUT the recorded value: does the employee baseline (or 100) reproduce it?
    const blind = run(computeShiftAuthority, { ...inputs(), employeeWorkEfficiency: row.work_efficiency ?? undefined })
    tally('work_shifts', 'fallback efficiency = employee baseline, else 100', id, blind.efficiencyPercent === n(row.efficiency_percent))
  }

  if (row.wage !== null) {
    const delta = Math.abs(cents(doc.wage) - cents(row.wage))
    tally('work_shifts', 'wage = max(time pay, Σ order wage) (exact)', id, delta === 0)
    tally('work_shifts', 'wage = max(time pay, Σ order wage) (within 1.00)', id, delta <= 100)
  }
  if (row.closed_at !== null) {
    let closes = true
    try {
      run(requireWageToClose, { status: 'closed', wage: row.wage })
    } catch {
      closes = false
    }
    tally('work_shifts', 'a closed shift carries a wage', id, closes)
  }
}

const packs = (row: Row): void => {
  const id = row.id
  if (n(row.net_weight) > 0 && n(row.tare_weight) > 0 && row.gross_weight !== null) {
    const doc = run(balanceWeight, { netWeight: row.net_weight, tareWeight: row.tare_weight })
    tally('packs', 'grossWeight = netWeight + tareWeight', id, doc.grossWeight === n(row.gross_weight))
  }
  if (row.units_packed !== null && row.items_units_packed !== null)
    tally('packs', 'unitsPacked = Σ pack_items.unitsPacked', id, n(row.units_packed) === n(row.items_units_packed))
  count(
    `packs state ${derivePackState({
      unitsOrdered: n(row.items_units_ordered),
      unitsPacked: n(row.units_packed),
      grossWeight: n(row.gross_weight),
    })}`,
  )
}

const packItems = (row: Row): void => {
  const id = row.id
  const lines = options(row, { ordered: 'units_ordered', packed: 'units_packed' })
  const doc = run(rollUpOptions, { options: lines, unitsOrdered: row.units_ordered, unitsPacked: row.units_packed })
  if (lines.length > 0) {
    tally('pack_items', 'unitsOrdered = Σ options.ordered (rows with options)', id, doc.unitsOrdered === n(row.units_ordered))
    tally('pack_items', 'unitsPacked = Σ options.packed (rows with options)', id, doc.unitsPacked === n(row.units_packed))
  }
  if (row.pending_units !== null)
    tally('pack_items', 'unitsBackordered = max(0, ordered − packed) vs pending_units', id, doc.unitsBackordered === n(row.pending_units))
}

const lots = (row: Row): void => {
  const doc = run(deriveLotState, {
    closedAt: row.closed_at,
    finishedAt: row.finished_at,
    startedAt: row.started_at,
    confirmedAt: row.confirmed_at,
    unitsShipped: row.units_shipped,
    unitsDelivered: row.units_delivered,
  })
  count(`lots state ${String(doc.status)}`)
  // the ring is monotone: every watermark the lot reached is at or below the state derived for it
  const order = ['opened', 'confirmed', 'producing', 'finished', 'shipped', 'delivered', 'closed']
  const reached = [true, row.confirmed_at, row.started_at, row.finished_at, n(row.units_shipped) > 0, n(row.units_delivered) > 0, row.closed_at]
  const highest = reached.reduce<number>((top, hit, i) => (hit ? i : top), 0)
  tally('lots', 'state = the highest watermark reached', row.id, order.indexOf(String(doc.status)) === highest)
}

/** every counter present is at or below the one before it (nulls skipped — a stage not reached) */
const monotone = (values: unknown[]): boolean => {
  let floor = Infinity
  for (const v of values) {
    if (v === null || v === undefined) continue
    if (n(v) > floor) return false
    floor = n(v)
  }
  return true
}

const lotVariants = (row: Row): void => {
  const id = row.id
  const lines = options(row, { units: 'units', produced: 'units_produced' })
  const doc = run(rollUpLotVariantOptions, { options: lines, units: row.units, unitsProduced: row.units_produced })
  tally('lot_variants', 'units = Σ options.units', id, n(doc.units) === n(row.units))
  tally('lot_variants', 'unitsProduced = Σ options.produced', id, n(doc.unitsProduced) === n(row.units_produced))
  tally(
    'lot_variants',
    '(stated) funnel tail packed ≥ shipped ≥ delivered',
    id,
    monotone([row.units_packed, row.units_shipped, row.units_delivered]),
  )
}

const lotWorkPhases = (row: Row): void => {
  let warned = false
  const req = { payload: { logger: { warn: () => void (warned = true) } } }
  void warnLotWorkPhaseFunnel({ data: { unitsOrdered: row.units_ordered, unitsProduced: row.units_produced }, req } as unknown as HookArgs)
  tally('lot_work_phases', 'funnel produced ≤ ordered (the hook does not warn)', row.id, !warned)
  tally('lot_work_phases', '(stated) workPhase resolves into the catalog', row.id, row.phase_found !== null)
}

const lotTotals = (row: Row): void => {
  if (row.variant_units !== null)
    tally('lots', '(stated) units = Σ lot_variants.units', row.id, n(row.units) === n(row.variant_units))
  tally(
    'lots',
    '(stated) funnel tail packed ≥ shipped ≥ delivered ≥ invoiced',
    row.id,
    monotone([row.units_packed, row.units_shipped, row.units_delivered, row.units_invoiced]),
  )
}

const items = (row: Row): void => {
  if (row.product_variant_id !== null) tally('items', '(stated) item → variant resolves', row.id, row.variant_found !== null)
  if (row.variant_found !== null) tally('items', '(stated) variant → product resolves', row.id, row.product_found !== null)
}

const phaseIds = new Set<string>()
const workPhases = (row: Row): void => {
  const ancestors = typeof row.ancestry === 'string' && row.ancestry !== '' ? row.ancestry.split('/') : []
  tally('work_phases', '(stated) tree is acyclic — a phase is never its own ancestor', row.id, !ancestors.includes(String(row.id)))
  if (ancestors.length > 0) tally('work_phases', '(stated) the parent exists', row.id, phaseIds.has(ancestors[ancestors.length - 1]!))
}

// ─── run ──────────────────────────────────────────────────────────────
const timed = async (label: string, work: Promise<number>): Promise<number> => {
  const t = Date.now()
  const rows = await work
  console.error(`  ${label} ${rows.toLocaleString('en')} rows · ${((Date.now() - t) / 1000).toFixed(1)}s`)
  return rows
}

const main = async (): Promise<void> => {
  const db = new pg.Client({ connectionString: process.env.ETRIMA_DATABASE_URL ?? 'postgres:///etrima_production' })
  try {
    await db.connect()
  } catch (error) {
    console.error(`replay: no etrima database (${(error as Error).message}). Restore the dump or set ETRIMA_DATABASE_URL.`)
    process.exit(2)
  }
  await db.query('set default_transaction_read_only = on')

  const started = Date.now()
  const seen: Record<string, number> = {}
  // work orders first: the shift wage is the rollup of their piece-rate wages
  seen.work_orders = await timed('work_orders', each(
    db,
    `select t.*, v.id as variant_found, v.lot_id as variant_lot, p.id as phase_found, p.lot_id as phase_lot from work_orders t
       left join lot_variants v on v.id = t.lot_variant_id
       left join lot_work_phases p on p.id = t.lot_work_phase_id where true`,
    workOrders,
  ))
  seen.work_shifts = await timed('work_shifts', each(
    db,
    `select t.*, e.work_efficiency from work_shifts t
       left join employee_contracts c on c.id = t.employee_contract_id
       left join employees e on e.id = c.employee_id where true`,
    workShifts,
  ))
  seen.packs = await timed('packs', each(
    db,
    `select t.*, i.units_packed as items_units_packed, i.units_ordered as items_units_ordered from packs t
       left join (select pack_id, sum(units_packed) as units_packed, sum(units_ordered) as units_ordered
                    from pack_items group by pack_id) i on i.pack_id = t.id where true`,
    packs,
  ))
  seen.pack_items = await timed('pack_items', each(db, 'select t.* from pack_items t where true', packItems))
  seen.lots = await timed('lots', each(
    db,
    `select t.*, v.units as variant_units from lots t
       left join (select lot_id, sum(units) as units from lot_variants group by lot_id) v on v.lot_id = t.id where true`,
    (row) => {
      lots(row)
      lotTotals(row)
    },
  ))
  seen.items = await timed('items', each(
    db,
    `select t.id, t.product_variant_id, v.id as variant_found, p.id as product_found from items t
       left join product_variants v on v.id = t.product_variant_id
       left join products p on p.id = v.product_id where true`,
    items,
  ))
  seen.lot_variants = await timed('lot_variants', each(db, 'select t.* from lot_variants t where true', lotVariants))
  seen.lot_work_phases = await timed('lot_work_phases', each(
    db,
    'select t.id, t.units_ordered, t.units_produced, p.id as phase_found from lot_work_phases t left join work_phases p on p.id = t.work_phase_id where true',
    lotWorkPhases,
  ))
  for (const { id } of (await db.query<{ id: number }>('select id from work_phases')).rows) phaseIds.add(String(id))
  seen.work_phases = await timed('work_phases', each(db, 'select t.id, t.ancestry from work_phases t where true', workPhases))
  await db.end()

  const pct = (l: Law): string => (l.rows === 0 ? '—' : `${((l.match / l.rows) * 100).toFixed(4)}%`)
  console.log(`\nreplay over etrima — ${Object.entries(seen).map(([t, c]) => `${t} ${c.toLocaleString('en')}`).join(' · ')}`)
  console.log(`${((Date.now() - started) / 1000).toFixed(1)}s${Number.isFinite(LIMIT) ? ` · PARTIAL (--limit ${LIMIT}; shift wages miss orders beyond it)` : ''}\n`)
  console.table(
    [...laws.values()].map((l) => ({
      table: l.table,
      law: l.law,
      rows: l.rows,
      mismatches: l.rows - l.match,
      match: pct(l),
      'first mismatching ids': l.samples.join(' '),
    })),
  )
  console.log(`Σ piece-rate wage over work_orders: ${(pieceWageTotalCents / 100).toLocaleString('en', { minimumFractionDigits: 2 })}`)
  console.log('\nderived states (no etrima column to compare against — distribution only):')
  for (const [key, c] of [...dist].sort()) console.log(`  ${key.padEnd(72)} ${c.toLocaleString('en')}`)
}

await main()
