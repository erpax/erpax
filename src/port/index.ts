/**
 * port — Rails/ActiveAdmin → Payload/Next Rosetta diamond.
 *
 * A port facet is content-addressed by `{ sourceLang, targetLang, atomPath }` so
 * re-porting unchanged mappings merges (no duplicate) and changed mappings get a
 * new identity. Composes with [[quantum/port]] `portUuid` for upstream sources.
 *
 *   tsx src/port/index.ts rails payload invoices
 *
 * @see ./SKILL.md — ../diamond/projection — ../quantum/port
 */
import { readFileSync, readdirSync, type Dirent } from 'node:fs'
import { join, relative } from 'node:path'
import { createHash } from 'node:crypto'
import { Client, escapeIdentifier } from 'pg'
import { uuid, jcsCanonicalize } from '@/integrity'
import { candidateSingulars } from '@/balance'
import { think } from '@/think'
import { stageUuid, computationUuid, type DiamondComputationStage } from '@/diamond'

export interface PortDiamondResult {
  readonly sourceLang: string
  readonly targetLang: string
  readonly atomPath: string
  readonly mappingUuid: string
  readonly stages: readonly DiamondComputationStage[]
  readonly computationUuid: string
}

function pushStage(
  stages: DiamondComputationStage[],
  stage: string,
  input: unknown,
  output: unknown,
): void {
  stages.push({ stage, input, output, stageUuid: stageUuid(stage, input, output) })
}

/** Content-uuid of one Rosetta mapping — stable across recomputation. */
export function portMappingUuid(sourceLang: string, targetLang: string, atomPath: string): string {
  return uuid(jcsCanonicalize({ sourceLang, targetLang, atomPath }))
}

/**
 * Canonical port diamond — map → seal → uuid fold.
 * Used by @/diamond `kind: 'port'` pipeline.
 */
export function portDiamond(
  sourceLang: string,
  targetLang: string,
  atomPath: string,
): PortDiamondResult {
  const mappingUuid = portMappingUuid(sourceLang, targetLang, atomPath)
  const stages: DiamondComputationStage[] = []

  pushStage(
    stages,
    'map',
    { sourceLang, targetLang, atomPath },
    { rosetta: `${sourceLang}→${targetLang}`, atomPath, mappingUuid },
  )
  pushStage(stages, 'seal', { atomPath }, { sealed: true, impurities: [] as string[] })
  pushStage(stages, 'uuid', { mappingUuid }, { mappingUuid })

  return {
    sourceLang,
    targetLang,
    atomPath,
    mappingUuid,
    stages,
    computationUuid: computationUuid(stages),
  }
}

// ─── Port the upstream in waves that save their thoughts (DRY) ────────
//
// The etrima Rails schema is the source of truth. `portWaves` walks its tables in waves, seals each wave's
// coverage analysis as a shared thought ([[think]], keyed by the schema ⊕ the current atom set), and DRY-
// dedupes against atoms erpax already holds — so an unchanged upstream ⊕ corpus READ the manifest instead of
// re-deriving it, and covered tables (machine · work/phases · work/shifts …) are never re-ported. What
// remains is the gaps: the honest answer to "do you see the upstream gaps?", computed not eyeballed.

/** Rails framework tables — not domain gaps (ActiveAdmin / ActiveStorage / migration bookkeeping). */
const UPSTREAM_INFRA: ReadonlySet<string> = new Set([
  'schema_migrations',
  'ar_internal_metadata',
  'active_admin_comments',
  'admin_users',
  'admin_users_roles',
  'data_imports',
  'versions',
  'version_associations',
])

/** Framework table prefixes — Rails engines (Solid Queue/Cache/Cable, ActiveStorage) that carry no domain. */
const INFRA_PREFIXES: readonly string[] = [
  'solid_queue_',
  'solid_cache_',
  'solid_cable_',
  'active_storage_',
]

/** DRY cleaning — a table is framework noise (skip) not a domain gap: named infra, an engine prefix, or a dated archive. */
const isInfra = (table: string): boolean =>
  UPSTREAM_INFRA.has(table) ||
  INFRA_PREFIXES.some((p) => table.startsWith(p)) ||
  /_\d{6,8}$/.test(table)

/** An upstream table from etrima's schema.rb — the port unit (name + column count). */
export interface UpstreamTable {
  readonly table: string
  readonly columns: number
}

/** Parse `create_table` blocks from a Rails schema.rb — the upstream source of truth. */
export function upstreamTables(schemaRb: string): UpstreamTable[] {
  const out: UpstreamTable[] = []
  for (const block of schemaRb.split('create_table ').slice(1)) {
    const table = block.match(/^"([^"]+)"/)?.[1]
    if (!table) continue
    const end = block.indexOf('\n  end')
    const body = end >= 0 ? block.slice(0, end) : block
    out.push({ table, columns: (body.match(/^\s+t\.\w+ /gm) ?? []).length })
  }
  return out.sort((a, b) => (a.table < b.table ? -1 : a.table > b.table ? 1 : 0))
}

/**
 * The erpax COLLECTION (the plural store) a Rails table maps to. A Rails table name is ALREADY plural, so it
 * is the collection side of the [[balance]] — never singularised here.
 */
export function candidateCollections(table: string): string[] {
  const segs = table.split('_')
  const head = segs[segs.length - 1]!
  const qualifiers = segs.slice(0, -1)
  const out = [table, table.replace(/_/g, '/')]
  // A compound table qualifies its head with a PARENT, and a parent is itself a collection — so it is
  // plural in erpax: `employee_contracts` → `employees/contracts`, never `employee/contracts`.
  if (qualifiers.length > 0) {
    out.push([...qualifiers.map((q) => (q.endsWith('s') ? q : `${q}s`)), head].join('/'))
  }
  // NO bare-head fallback: a leaf cannot tell homonyms apart (`contracts` is BOTH the IFRS-15 customer
  // contract and the labour contract; `variants` is both the product catalog and a lot's variant line), and
  // a wrong match reads as "balanced" — worse than an honest gap. Only a real path counts.
  return [...new Set(out)]
}

/**
 * The erpax MODEL (singular — the law of ONE row) of a Rails table. Uses the corpus's canonical
 * `candidateSingulars` ([[balance]]), never a hand-rolled `-s` strip: English plural→singular is ambiguous
 * (`leases`→`lease` not `leas`; `boxes`→`box` not `boxe`) and `NON_PLURAL`/`-ss` protect `status`, `address`.
 */
export function candidateModels(table: string): string[] {
  const segs = table.split('_')
  const head = segs[segs.length - 1]!
  const out = new Set<string>()
  for (const s of candidateSingulars(head)) {
    out.add(s) // variant
    if (segs.length > 1) out.add([...segs.slice(0, -1), s].join('/')) // product/variant
  }
  return [...out]
}

/** @deprecated The head noun's canonical singular — kept for callers; prefer `candidateModels`. */
export const headNoun = (table: string): string =>
  candidateSingulars(table.split('_').pop() ?? table)[0] ?? table

/** An erpax atom: its path, and whether it carries executable MATTER (index.ts) or is vocabulary only. */
export interface AtomEntry {
  readonly path: string
  readonly implemented: boolean
}

/**
 * Index every erpax atom by its full path AND its leaf (head noun) → whether it has matter. The rosetta
 * distinction is what makes the port honest: an atom with a SKILL but no `index.ts` is a WORD WITHOUT LOGIC
 * ([[rules]]/word-without-logic) — the vocabulary exists, the matter does not, so the table is not ported.
 */
export function erpaxAtomIndex(cwd: string = process.cwd()): Map<string, AtomEntry> {
  const root = join(cwd, 'src')
  const index = new Map<string, AtomEntry>()
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    const names = new Set(entries.filter((e) => e.isFile()).map((e) => e.name))
    if (names.has('SKILL.md') || names.has('index.ts')) {
      const rel = relative(root, dir).replace(/\\/g, '/')
      const entry: AtomEntry = { path: rel, implemented: names.has('index.ts') }
      // an implemented atom wins the key over a vocabulary-only homonym
      const add = (k: string): void => {
        const prev = index.get(k)
        if (!prev || (!prev.implemented && entry.implemented)) index.set(k, entry)
      }
      add(rel)
      add(rel.split('/').pop()!)
    }
    for (const e of entries) {
      if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'worktrees')
        walk(join(dir, e.name))
    }
  }
  walk(root)
  return index
}

/**
 * Real upstream USAGE — table → row count, read from the live source DB through the CANONICAL client
 * (`pg`, node-postgres), not a shell-out to the `psql` binary: one connection, `pg_class.reltuples` where
 * exact counts are not needed, and a guaranteed `end()`. Driving the CLI would depend on `psql` being on
 * PATH and reparse its text output — a package is used through its API, never through its binary.
 *
 * The decisive signal a schema read cannot give: a table with **0 rows** was defined and never used, so
 * porting it would invent a domain the source never had. Unreachable tables are left unknown (absent),
 * never guessed.
 *
 * Identifiers are quoted via `pg`'s own escaping (`format('%I')` semantics applied by `escapeIdentifier`),
 * and only names this module parsed out of the schema itself are ever passed.
 */
export async function upstreamRowCounts(
  connection: string,
  tables: readonly string[],
): Promise<Map<string, number>> {
  const counts = new Map<string, number>()
  const client = new Client(
    /^\w+:\/\//.test(connection) ? { connectionString: connection } : { database: connection },
  )
  try {
    await client.connect()
  } catch {
    return counts // DB unreachable — every table's usage stays UNKNOWN, never assumed
  }
  try {
    for (const t of tables) {
      if (!/^[a-z0-9_]+$/.test(t)) continue // only identifiers parsed out of the schema reach the DB
      try {
        const { rows } = await client.query<{ n: string }>(
          `select count(*)::text as n from ${escapeIdentifier(t)}`,
        )
        const n = Number(rows[0]?.n)
        if (Number.isFinite(n)) counts.set(t, n)
      } catch {
        /* table absent/unreadable — usage stays UNKNOWN for this table only */
      }
    }
  } finally {
    await client.end()
  }
  return counts
}

/** One column's LIFE — does it carry information, or only presence? */
export interface ColumnLife {
  readonly column: string
  readonly type: string
  /** rows where the column is non-NULL — presence only. `count()` counts non-NULL, and **0 is non-NULL**. */
  readonly present: number
  /** rows where it carries INFORMATION — non-zero for numbers, non-empty for text. */
  readonly informative: number
  /** present everywhere yet informative nowhere: the column is DEAD, and any law over it holds vacuously. */
  readonly degenerate: boolean
}

/**
 * Does a column carry INFORMATION, or merely presence? `rows > 0` is necessary and NOT sufficient — this is
 * the check that was left to a human, and it is the one that matters most.
 *
 * `packing_lists` has 727 rows whose `net_weight` · `gross_weight` · `volume` · `items_count` are all
 * `min = max = sum = 0`, and whose `number` · `status` are 100% empty. Its mass-balance law (`gross >= net`)
 * held **727/727 with zero violations — because both sides were zero**. A green check over dead data is
 * indistinguishable from a green check over real data; only `min`/`max`/`sum` tells them apart.
 *
 * Reads through the canonical `pg` client. Unreachable ⇒ empty, never guessed.
 */
export async function upstreamColumnLife(connection: string, table: string): Promise<ColumnLife[]> {
  if (!/^[a-z0-9_]+$/.test(table)) return []
  const client = new Client(
    /^\w+:\/\//.test(connection) ? { connectionString: connection } : { database: connection },
  )
  try {
    await client.connect()
  } catch {
    return [] // unreachable — every column's life stays UNKNOWN
  }
  try {
    const cols = await client.query<{ column_name: string; data_type: string }>(
      `select column_name, data_type from information_schema.columns where table_name = $1 order by ordinal_position`,
      [table],
    )
    const out: ColumnLife[] = []
    for (const { column_name: col, data_type: type } of cols.rows) {
      if (!/^[a-z0-9_]+$/.test(col)) continue
      const id = escapeIdentifier(col)
      // numbers: 0 is present but says nothing. text: '' is present but says nothing.
      const informativeExpr = /int|numeric|double|real|decimal/.test(type)
        ? `${id} is not null and ${id} <> 0`
        : /char|text/.test(type)
          ? `${id} is not null and ${id} <> ''`
          : `${id} is not null`
      try {
        const { rows } = await client.query<{ present: string; informative: string }>(
          `select count(${id})::text as present,
                  count(*) filter (where ${informativeExpr})::text as informative
             from ${escapeIdentifier(table)}`,
        )
        const present = Number(rows[0]?.present ?? 0)
        const informative = Number(rows[0]?.informative ?? 0)
        out.push({ column: col, type, present, informative, degenerate: present > 0 && informative === 0 })
      } catch {
        /* unreadable column — left out rather than guessed */
      }
    }
    return out
  } finally {
    await client.end()
  }
}

/** One table's port thought — which erpax atom holds it (if any), how it matched, its matter, and real usage. */
/** One side of the [[balance]] — the atom that holds it, and whether it carries matter. */
export interface BalanceSide {
  readonly atom: string
  readonly implemented: boolean
}

/**
 * One table's port thought, read through the [[balance]] law — **every collection has its model**. A Rails
 * table is a plural STORE, so a real port needs BOTH sides: the COLLECTION (plural — where rows live) and the
 * MODEL (singular — the law of one row). Conflating them is what made `employee_contracts` match
 * `vocabulary/contract` (the *customer* contract's MODEL) and read as "fold the matter here".
 */
export interface PortThought {
  readonly table: string
  readonly columns: number
  /** The plural store — where the rows live. */
  readonly collection: BalanceSide | null
  /** The singular model — the law of one row. */
  readonly model: BalanceSide | null
  /** rows upstream: 0 = defined but never used; null = usage unknown (no DB). */
  readonly rows: number | null
  /** the upstream defined it and never used it — not a gap; porting it would invent. */
  readonly unused: boolean
  /** BALANCED = both sides exist. Every collection has its model; every model has its collection. */
  readonly balanced: boolean
  /** Which side is missing — the gap IS the disbalance. */
  readonly disbalance: 'model-without-collection' | 'collection-without-model' | 'neither-side' | null
}

const find = (keys: readonly string[], index: ReadonlyMap<string, AtomEntry>): BalanceSide | null => {
  for (const k of keys) {
    const e = index.get(k)
    if (e) return { atom: e.path, implemented: e.implemented }
  }
  return null
}

const classifyTable = (
  t: UpstreamTable,
  index: ReadonlyMap<string, AtomEntry>,
  rows: ReadonlyMap<string, number>,
): PortThought => {
  const n = rows.has(t.table) ? rows.get(t.table)! : null
  const collection = find(candidateCollections(t.table), index)
  const model = find(candidateModels(t.table), index)
  const balanced = collection !== null && model !== null
  return {
    table: t.table,
    columns: t.columns,
    collection,
    model,
    rows: n,
    unused: n === 0,
    balanced,
    // The gap IS the disbalance — a store with no type, or a type with nowhere to live.
    disbalance: balanced
      ? null
      : model !== null
        ? 'model-without-collection'
        : collection !== null
          ? 'collection-without-model'
          : 'neither-side',
  }
}

export interface PortManifest {
  readonly waves: number
  readonly tables: number
  /** Tables whose BOTH sides exist — the collection and its model ([[balance]]). */
  readonly balanced: number
  /** The disbalanced tables — the gap IS the missing side. */
  readonly gaps: readonly PortThought[]
  /** Gaps holding a MODEL (the law of one row) with no COLLECTION to store it. */
  readonly modelsWithoutCollection: number
  /** Gaps holding a COLLECTION (a store) with no MODEL — a store with no type. */
  readonly collectionsWithoutModel: number
  /** Tables the upstream defined and never used (0 rows) — excluded from gaps; porting them would invent. */
  readonly unused: number
  readonly skipped: number
  /** true when every wave was READ from its saved thought (unchanged upstream ⊕ corpus). */
  readonly cached: boolean
}

/**
 * Port the upstream in waves that save their thoughts. The Rails tables (minus framework infra) are batched
 * into `waves` (7 by default, like the readme); each wave's coverage analysis is sealed via `think`, keyed by
 * the schema ⊕ atom-set fold — so an unchanged upstream and corpus READ the manifest, and only a real change
 * (a new upstream table, or a newly-ported atom that closes a gap) re-derives. DRY: covered tables are named,
 * never re-ported; the gaps are what remains to fold.
 */
export function portWaves(
  cwd: string,
  schemaRb: string,
  opts?: {
    waves?: number
    onWave?: (ordinal: number, itemCount: number) => void
    /** Real upstream usage (table → rows) from `upstreamRowCounts`. Absent ⇒ usage unknown, nothing assumed. */
    rows?: ReadonlyMap<string, number>
  },
): PortManifest {
  const all = upstreamTables(schemaRb)
  const tables = all.filter((t) => !isInfra(t.table))
  const atoms = erpaxAtomIndex(cwd)
  const rows = opts?.rows ?? new Map<string, number>()
  const seal = (s: string): string => createHash('sha256').update(s).digest('hex').slice(0, 16)
  const atomSeal = seal(
    [...atoms.entries()]
      .sort()
      .map(([k, v]) => `${k}:${v.implemented ? 1 : 0}`)
      .join('\n'),
  )
  const rowSeal = seal(
    [...rows.entries()]
      .sort()
      .map(([k, v]) => `${k}:${v}`)
      .join('\n'),
  )
  const schemaSeal = seal(schemaRb)
  // The generator seal — this module's own source. Without it a classifier change reads a stale thought
  // (decoherence): the key must capture the code the thought depends on, not just its inputs.
  const genSeal = seal(readFileSync(new URL(import.meta.url), 'utf8'))
  const size = Math.max(1, Math.ceil(tables.length / (opts?.waves ?? 7)))
  const thoughts: PortThought[] = []
  let allCached = true
  let ordinal = 0
  for (let i = 0; i < tables.length; i += size) {
    ordinal++
    const batch = tables.slice(i, i + size)
    const t = think(
      `port-wave:${schemaSeal}:${atomSeal}:${rowSeal}:${genSeal}:${ordinal}`,
      () => batch.map((tb) => classifyTable(tb, atoms, rows)),
      cwd,
    )
    if (!t.cached) allCached = false
    thoughts.push(...(t.value as PortThought[]))
    opts?.onWave?.(ordinal, batch.length)
  }
  // A table the upstream never used is NOT a gap — porting it would invent a domain the source never had.
  const gaps = thoughts.filter((th) => !th.balanced && !th.unused)
  return {
    waves: ordinal,
    tables: tables.length,
    balanced: thoughts.filter((th) => th.balanced).length,
    gaps,
    modelsWithoutCollection: gaps.filter((g) => g.disbalance === 'model-without-collection').length,
    collectionsWithoutModel: gaps.filter((g) => g.disbalance === 'collection-without-model').length,
    unused: thoughts.filter((th) => th.unused).length,
    skipped: all.length - tables.length,
    cached: allCached,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void (async () => {
    const first = process.argv[2]
    if (first && first.endsWith('.rb')) {
      const schemaRb = readFileSync(first, 'utf8')
      // Optional 2nd arg = the live source DB (name or connection string); without it usage is unknown and
      // nothing is assumed unused.
      const database = process.argv[3]
      const rows = database
        ? await upstreamRowCounts(
            database,
            upstreamTables(schemaRb).map((t) => t.table),
          )
        : undefined
      const m = portWaves(process.cwd(), schemaRb, {
        rows,
        onWave: (o, n) => console.log(`port wave ${o} · ${n} tables`),
      })
      console.log(
        `port — ${m.balanced}/${m.tables} balanced · ${m.skipped} infra · ${m.unused} never-used · ${m.gaps.length} disbalanced (${m.modelsWithoutCollection} model-without-collection · ${m.collectionsWithoutModel} collection-without-model)${m.cached ? ' · READ from saved thoughts' : ' · derived + sealed'}`,
      )
      for (const g of m.gaps) {
        const has =
          g.disbalance === 'model-without-collection'
            ? `model [[${g.model!.atom}]] has no collection — the law of one row exists, nowhere to store rows`
            : g.disbalance === 'collection-without-model'
              ? `collection [[${g.collection!.atom}]] has no model — a store with no type`
              : 'neither model nor collection'
        console.log(`  gap: ${g.table} (${g.columns} cols, ${g.rows ?? '?'} rows) — ${has}`)
      }
    } else {
      const [source = 'rails', target = 'payload', atom = 'invoices'] = process.argv.slice(2)
      const result = portDiamond(source, target, atom)
      console.log(`port — ${result.sourceLang}→${result.targetLang} @ ${result.atomPath}`)
      console.log(`  mappingUuid: ${result.mappingUuid}`)
      console.log(`  computation: ${result.computationUuid} (${result.stages.length} stages)`)
    }
  })()
}
