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
import { uuid, jcsCanonicalize } from '@/integrity'
import { think } from '@/think'
import {
  stageUuid,
  computationUuid,
  type DiamondComputationStage,
} from '@/diamond'

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
const INFRA_PREFIXES: readonly string[] = ['solid_queue_', 'solid_cache_', 'solid_cable_', 'active_storage_']

/** DRY cleaning — a table is framework noise (skip) not a domain gap: named infra, an engine prefix, or a dated archive. */
const isInfra = (table: string): boolean =>
  UPSTREAM_INFRA.has(table) || INFRA_PREFIXES.some((p) => table.startsWith(p)) || /_\d{6,8}$/.test(table)

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

/** Every erpax atom's path + each path segment — the set a candidate is matched against (DRY dedupe). */
export function erpaxAtomKeys(cwd: string = process.cwd()): Set<string> {
  const root = join(cwd, 'src')
  const keys = new Set<string>()
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
      keys.add(rel)
      for (const seg of rel.split('/')) keys.add(seg)
    }
    for (const e of entries) {
      if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'worktrees') walk(join(dir, e.name))
    }
  }
  walk(root)
  return keys
}

/** One table's port thought — already an erpax atom (DRY), and if so which. */
export interface PortThought {
  readonly table: string
  readonly columns: number
  readonly atom: string | null
  readonly covered: boolean
}

const classifyTable = (t: UpstreamTable, atoms: Set<string>): PortThought => {
  const atom = candidateAtoms(t.table).find((c) => atoms.has(c)) ?? null
  return { table: t.table, columns: t.columns, atom, covered: atom !== null }
}

export interface PortManifest {
  readonly waves: number
  readonly tables: number
  readonly covered: number
  readonly gaps: readonly PortThought[]
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
  opts?: { waves?: number; onWave?: (ordinal: number, itemCount: number) => void },
): PortManifest {
  const all = upstreamTables(schemaRb)
  const tables = all.filter((t) => !isInfra(t.table))
  const atoms = erpaxAtomKeys(cwd)
  const seal = (s: string): string => createHash('sha256').update(s).digest('hex').slice(0, 16)
  const atomSeal = seal([...atoms].sort().join('\n'))
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
    const t = think(`port-wave:${schemaSeal}:${atomSeal}:${genSeal}:${ordinal}`, () => batch.map((tb) => classifyTable(tb, atoms)), cwd)
    if (!t.cached) allCached = false
    thoughts.push(...(t.value as PortThought[]))
    opts?.onWave?.(ordinal, batch.length)
  }
  const gaps = thoughts.filter((th) => !th.covered)
  return {
    waves: ordinal,
    tables: tables.length,
    covered: thoughts.length - gaps.length,
    gaps,
    skipped: all.length - tables.length,
    cached: allCached,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const first = process.argv[2]
  if (first && first.endsWith('.rb')) {
    const m = portWaves(process.cwd(), readFileSync(first, 'utf8'), {
      onWave: (o, n) => console.log(`port wave ${o} · ${n} tables`),
    })
    console.log(
      `port — ${m.covered}/${m.tables} covered (${m.skipped} infra skipped) · ${m.gaps.length} gaps${m.cached ? ' · READ from saved thoughts' : ' · derived + sealed'}`,
    )
    for (const g of m.gaps) console.log(`  gap: ${g.table} (${g.columns} cols)`)
  } else {
    const [source = 'rails', target = 'payload', atom = 'invoices'] = process.argv.slice(2)
    const result = portDiamond(source, target, atom)
    console.log(`port — ${result.sourceLang}→${result.targetLang} @ ${result.atomPath}`)
    console.log(`  mappingUuid: ${result.mappingUuid}`)
    console.log(`  computation: ${result.computationUuid} (${result.stages.length} stages)`)
  }
}
