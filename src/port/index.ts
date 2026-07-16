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

/** Depluralise a Rails table word to the erpax atom form: phases→phase, categories→category, machines→machine. */
const singular = (w: string): string =>
  w.endsWith('ies') ? `${w.slice(0, -3)}y` : w.endsWith('s') ? w.slice(0, -1) : w

/** The erpax atom keys a Rails table could already be ported as — raw · path · singular whole · singular path. */
export function candidateAtoms(table: string): string[] {
  const path = table.replace(/_/g, '/')
  const singPath = table.split('_').map(singular).join('/')
  return [...new Set([table, path, singular(table), singPath])]
}

/** The head noun of a compound Rails table — `product_variants`→`variant`: the one-word atom erpax would name it. */
export const headNoun = (table: string): string => singular(table.split('_').pop() ?? table)

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

/** One table's port thought — which erpax atom holds it (if any), how it matched, its matter, and real usage. */
export interface PortThought {
  readonly table: string
  readonly columns: number
  readonly atom: string | null
  /** `exact` = the table's own name/path; `head` = the compound's head noun (a related one-word atom). */
  readonly match: 'exact' | 'head' | null
  /** the matched atom carries executable matter (index.ts), not prose alone. */
  readonly implemented: boolean
  /** rows upstream: 0 = defined but never used; null = usage unknown (no DB). */
  readonly rows: number | null
  /** the upstream defined it and never used it — not a gap; porting it would invent. */
  readonly unused: boolean
  /** ported = an exact atom that actually has matter. A word without logic is NOT ported. */
  readonly covered: boolean
}

const classifyTable = (
  t: UpstreamTable,
  index: ReadonlyMap<string, AtomEntry>,
  rows: ReadonlyMap<string, number>,
): PortThought => {
  const n = rows.has(t.table) ? rows.get(t.table)! : null
  const base = { table: t.table, columns: t.columns, rows: n, unused: n === 0 }
  for (const c of candidateAtoms(t.table)) {
    const e = index.get(c)
    if (e)
      return {
        ...base,
        atom: e.path,
        match: 'exact',
        implemented: e.implemented,
        covered: e.implemented,
      }
  }
  const h = index.get(headNoun(t.table))
  // a head-noun hit is the WORD, not the port — fold the matter into that atom rather than minting a new one
  if (h) return { ...base, atom: h.path, match: 'head', implemented: h.implemented, covered: false }
  return { ...base, atom: null, match: null, implemented: false, covered: false }
}

export interface PortManifest {
  readonly waves: number
  readonly tables: number
  readonly covered: number
  /** Not ported: `atom` names the word that already exists (fold matter there), or null = nothing at all. */
  readonly gaps: readonly PortThought[]
  /** Gaps where erpax already holds the WORD but not the matter — never mint a new word for these. */
  readonly wordsWithoutMatter: number
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
  const gaps = thoughts.filter((th) => !th.covered && !th.unused)
  return {
    waves: ordinal,
    tables: tables.length,
    covered: thoughts.filter((th) => th.covered).length,
    gaps,
    wordsWithoutMatter: gaps.filter((g) => g.atom !== null).length,
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
        `port — ${m.covered}/${m.tables} ported · ${m.skipped} infra · ${m.unused} defined-but-never-used · ${m.gaps.length} REAL gaps (${m.wordsWithoutMatter} words without matter)${m.cached ? ' · READ from saved thoughts' : ' · derived + sealed'}`,
      )
      for (const g of m.gaps) {
        const where = g.atom
          ? ` — the word exists: [[${g.atom}]]${g.implemented ? ' (implemented, but not this table)' : ' (vocabulary only — fold the matter here, do not mint a new word)'}`
          : ' — no atom at all'
        console.log(`  gap: ${g.table} (${g.columns} cols, ${g.rows ?? '?'} rows)${where}`)
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
