/**
 * etrima-to-import — convert the FULL etrima production pg_dump into
 * @payloadcms/plugin-import-export JSON (one array of documents per erpax
 * collection). The data is the whole life of the factory across decades —
 * every shift, every operation — so we convert ALL rows, faithfully.
 *
 * Identity: every integer PK and every FK is converted to a deterministic
 * uuid derived from its source `(table, oid)` — `oidUuid(table, id)` =
 * uuidv5-style sha over `etrima:<table>:<id>`. A FK to table T row N derives
 * the SAME uuid as T-row-N's PK, so the relationship graph is preserved as
 * uuids (the 0), no integer ids. Import collections must take text ids.
 *
 * Scale: output is STREAMED (no in-memory arrays) so 2M-row tables fit.
 * Small lookup tables (employee_contracts, lot_work_phases) precede the big
 * ones in the dump, so the FK-resolution maps are built inline in one pass.
 *
 * Usage:  node src/port/etrima-import.mjs [path-to-dump.zip]
 */
import { spawn } from 'node:child_process'
import { createInterface } from 'node:readline'
import { createWriteStream, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'

const ZIP =
  process.argv[2] ??
  '/Users/ceci/github/ceccec/etrima/db/dump/host-leon1103-etrima_production.zip'
const ENTRY = 'etrima_production/etrima_production.dump.gz'
const OUT_DIR = resolve(process.cwd(), 'seed/import')

// ── oid → deterministic uuid (the 0) ─────────────────────────────────
const NS = 'erpax:etrima:'
const oidUuid = (table, id) => {
  if (id == null || id === '') return null
  const h = createHash('sha256').update(NS + table + ':' + id).digest()
  const b = h.subarray(0, 16)
  b[6] = (b[6] & 0x0f) | 0x50 // version 5
  b[8] = (b[8] & 0x3f) | 0x80 // RFC 4122 variant
  const x = b.toString('hex')
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20, 32)}`
}

// ── pg COPY TSV helpers ──────────────────────────────────────────────
const unescape = (v) =>
  v === '\\N'
    ? null
    : v.replace(/\\(.)/g, (_, c) => (c === 't' ? '\t' : c === 'n' ? '\n' : c === 'r' ? '\r' : c))
const num = (v) => (v == null ? null : Number(v))
const bool = (v) => (v == null ? null : v === 't')
const nz = (v) => (v != null && Number(v) !== 0 ? Number(v) : null) // non-zero number
const parentId = (anc) => {
  if (!anc) return null
  const p = String(anc).split('/').filter(Boolean)
  return p.length ? Number(p[p.length - 1]) : null
}

// ── FK-resolution maps (built inline; small source tables precede big) ─
const contractToEmployee = new Map() // employee_contracts.id → employee_id
const lwpToLot = new Map() // lot_work_phases.id → lot_id

// Collapse the option_1..12 grid into the unbounded variants[] array.
const optionVariants = (r) => {
  const out = []
  for (let i = 1; i <= 12; i++) {
    const o = nz(r[`option_${i}_units_ordered`])
    const p = nz(r[`option_${i}_units_produced`])
    const b = nz(r[`option_${i}_units_backordered`])
    if (o == null && p == null && b == null) continue
    out.push({ attributes: { option: i }, qtyOrdered: o ?? 0, qtyProduced: p ?? 0, qtyBackordered: b ?? 0 })
  }
  return out.length ? out : undefined
}

// ── Mapping table: source table → erpax collection ───────────────────
// `build` runs per row for side-effects (lookup maps) before `map`.
const MAPPINGS = {
  employee_contracts: {
    build: (r) => contractToEmployee.set(Number(r.id), num(r.employee_id)),
  },
  machine_types: {
    slug: 'work-centers',
    map: (r) => ({
      id: oidUuid('machine_types', r.id),
      reference: r.code ?? `WC-${r.id}`,
      name: r.name ?? r.code ?? `Work Center ${r.id}`,
      type: 'cell',
      parallelism: num(r.machines_per_worker) || 1,
      costPerMinute: num(r.cost_per_minute),
      payPerHour: num(r.pay_per_hour),
      status: 'active',
      notes: r.description ?? undefined,
    }),
  },
  work_phases: {
    slug: 'operations',
    filter: (r) => {
      const code = (r.code ?? '').trim()
      const name = (r.name ?? r.original_name ?? '').trim()
      return (code && code !== '0') || (name && name !== '0')
    },
    map: (r) => ({
      id: oidUuid('work_phases', r.id),
      reference: r.code ?? `OP-${r.id}`,
      name: r.name ?? r.original_name ?? r.code ?? `Operation ${r.id}`,
      defaultWorkCenter: oidUuid('machine_types', r.machine_type_id),
      parent: oidUuid('work_phases', parentId(r.ancestry)),
      status: bool(r.archived) ? 'inactive' : 'active',
      notes: r.description ?? undefined,
    }),
  },
  employees: {
    slug: 'employees',
    map: (r) => ({
      id: oidUuid('employees', r.id),
      employeeNumber: r.number ?? `E-${r.id}`,
      displayName: r.name ?? `Employee ${r.id}`,
      dateOfBirth: r.date_of_birth ?? undefined,
      nationalIdRef: r.egn ?? undefined,
    }),
  },
  lots: {
    slug: 'work-orders',
    map: (r) => ({
      id: oidUuid('lots', r.id),
      reference: r.number ?? `WO-${r.id}`,
      plannedQuantity: num(r.units) ?? 0,
      completedQuantity: num(r.units_produced) ?? 0,
      scrappedQuantity: 0,
      releaseDate: r.date ?? r.created_at ?? undefined,
      dueDate: r.delivery_date ?? r.estimated_delivery_date ?? undefined,
      completedAt: r.finished_at ?? undefined,
      status: r.canceled_at ? 'cancelled' : r.finished_at ? 'completed' : 'released',
      notes: r.note ?? undefined,
    }),
  },
  lot_work_phases: {
    slug: 'routings',
    build: (r) => lwpToLot.set(Number(r.id), num(r.lot_id)),
    map: (r) => ({
      id: oidUuid('lot_work_phases', r.id),
      reference: r.code ?? `RT-${r.id}`,
      workOrder: oidUuid('lots', r.lot_id),
      operation: oidUuid('work_phases', r.work_phase_id),
      workCenter: oidUuid('machine_types', r.machine_type_id),
      seq: num(r.sort) ?? 0,
      runTimeSecondsPerUnit: num(r.seconds),
      unitOfMeasure: 'pcs',
      status: r.completed_at ? 'completed' : r.started_at ? 'in_progress' : 'draft',
      notes: r.note ?? undefined,
    }),
  },
  work_orders: {
    slug: 'operation-runs',
    map: (r) => ({
      id: oidUuid('work_orders', r.id),
      reference: `OR-${r.id}`,
      workOrder: oidUuid('lots', lwpToLot.get(Number(r.lot_work_phase_id))),
      routing: oidUuid('lot_work_phases', r.lot_work_phase_id),
      workShift: oidUuid('work_shifts', r.work_shift_id),
      qtyOrdered: num(r.units_ordered) ?? 0,
      qtyProduced: num(r.units_produced) ?? 0,
      qtyBackordered: num(r.units_backordered) ?? 0,
      unitOfMeasure: 'pcs',
      variants: optionVariants(r),
      startedAt: r.started_at ?? undefined,
      completedAt: r.completed_at ?? undefined,
      status: r.completed ? 'completed' : r.started ? 'in_progress' : 'draft',
    }),
  },
  work_shifts: {
    slug: 'work-shifts',
    map: (r) => ({
      id: oidUuid('work_shifts', r.id),
      reference: `WS-${r.id}`,
      worker: oidUuid('employees', contractToEmployee.get(Number(r.employee_contract_id))),
      shiftStart: r.started_at ?? r.date ?? undefined,
      shiftEnd: r.finished_at ?? undefined,
      runTimeMinutes: num(r.shift_minutes) ?? num(r.presence_minutes) ?? 0,
      qtyProduced: num(r.units_count) ?? 0,
      rate: num(r.pay_per_hour),
      wage: num(r.wage),
      status: r.closed_at ? 'closed' : 'open',
      notes: r.note ?? undefined,
    }),
  },
}

// ── Streaming COPY parser + per-slug streamed JSON-array writer ───────
const COPY_RE = /^COPY public\.([a-z_0-9]+) \(([^)]*)\) FROM stdin;/
const writers = {} // slug → { stream, count, first }
const emit = (slug, doc) => {
  let w = writers[slug]
  if (!w) {
    const stream = createWriteStream(resolve(OUT_DIR, `${slug}.json`))
    stream.write('[')
    w = writers[slug] = { stream, count: 0, first: true }
  }
  w.stream.write((w.first ? '\n' : ',\n') + JSON.stringify(doc))
  w.first = false
  w.count++
}

async function run() {
  mkdirSync(OUT_DIR, { recursive: true })
  const child = spawn('bash', ['-c', `unzip -p '${ZIP}' '${ENTRY}' | gzip -dc`])
  const rl = createInterface({ input: child.stdout, crlfDelay: Infinity })
  let cur = null
  for await (const line of rl) {
    if (cur) {
      if (line === '\\.') { cur = null; continue }
      const m = cur.mapping
      const vals = line.split('\t').map(unescape)
      const row = {}
      cur.cols.forEach((c, i) => (row[c] = vals[i]))
      if (m.build) m.build(row)
      if (m.slug) {
        if (m.filter && !m.filter(row)) continue
        emit(m.slug, m.map(row))
      }
      continue
    }
    const cm = COPY_RE.exec(line)
    if (cm && MAPPINGS[cm[1]]) {
      cur = { table: cm[1], cols: cm[2].split(',').map((s) => s.trim()), mapping: MAPPINGS[cm[1]] }
    }
  }
  await Promise.all(
    Object.entries(writers).map(
      ([slug, w]) =>
        new Promise((res) => {
          w.stream.end('\n]\n', () => {
            console.log(`${slug.padEnd(16)} ${w.count} docs`)
            res()
          })
        }),
    ),
  )
}

run().catch((e) => { console.error(e); process.exit(1) })
