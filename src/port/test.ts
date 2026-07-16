/**
 * port — proof the Rosetta mapping diamond is content-addressed.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  portDiamond,
  portMappingUuid,
  upstreamTables,
  candidateCollections,
  candidateModels,
  erpaxAtomIndex,
  portWaves,
  upstreamColumnLife,
} from '@/port'

describe('port — Rosetta diamond', () => {
  it('portMappingUuid is deterministic', () => {
    const a = portMappingUuid('rails', 'payload', 'invoices')
    const b = portMappingUuid('rails', 'payload', 'invoices')
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('portDiamond folds stages into a stable computationUuid', () => {
    const a = portDiamond('activeadmin', 'payload', 'work-orders')
    const b = portDiamond('activeadmin', 'payload', 'work-orders')
    expect(a.computationUuid).toBe(b.computationUuid)
    expect(a.mappingUuid).toBe(b.mappingUuid)
    expect(a.stages.map((s) => s.stage)).toEqual(['map', 'seal', 'uuid'])
  })

  it('different atom paths ⇒ different mapping uuids', () => {
    const a = portMappingUuid('rails', 'payload', 'invoices')
    const b = portMappingUuid('rails', 'payload', 'payments')
    expect(a).not.toBe(b)
  })
})

describe('port — upstream in waves that save their thoughts (DRY)', () => {
  const schema = `
create_table "machines", force: :cascade do |t|
  t.string "code"
  t.integer "cost_per_hour"
end
create_table "stocks", force: :cascade do |t|
  t.integer "quantity"
end
create_table "schema_migrations", force: :cascade do |t|
  t.string "version"
end
create_table "solid_queue_jobs", force: :cascade do |t|
  t.string "queue_name"
end
`

  it('upstreamTables parses table name + column count from create_table blocks', () => {
    const tables = upstreamTables(schema)
    expect(tables.map((t) => t.table)).toContain('machines')
    expect(tables.find((t) => t.table === 'machines')?.columns).toBe(2)
  })

  it('a Rails table is PLURAL — it maps to the COLLECTION side, never singularised', () => {
    expect(candidateCollections('work_phases')).toContain('work/phases')
    expect(candidateCollections('machines')).toContain('machines')
    // a compound table qualifies its head with a PARENT, and a parent is itself a collection ⇒ plural
    expect(candidateCollections('employee_contracts')).toContain('employees/contracts')
  })

  it('a collection has NO bare-leaf fallback — a leaf cannot tell homonyms apart', () => {
    // `contracts` is BOTH customers/contracts (IFRS-15) and employees/contracts (labour); a leaf match
    // would read as "balanced" against the wrong concept — worse than an honest gap.
    expect(candidateCollections('employee_contracts')).not.toContain('contracts')
    expect(candidateCollections('product_variants')).not.toContain('variants')
  })

  it('the MODEL is the singular — via the canonical balance singulariser, not a hand-rolled -s strip', () => {
    expect(candidateModels('machines')).toContain('machine')
    expect(candidateModels('product_variants')).toContain('variant')
    expect(candidateModels('categories')).toContain('category') // -ies→y, not "categorie"
    expect(candidateModels('boxes')).toContain('box') // sibilant -es, not "boxe"
  })

  it('erpaxAtomIndex scans the live tree and marks matter: port has an index.ts, product is vocabulary only', () => {
    const index = erpaxAtomIndex(process.cwd())
    expect(index.get('port')?.implemented).toBe(true)
    expect(index.get('product')?.implemented).toBe(false) // the word exists, the matter does not
  })

  it('DRY cleaning: skips framework infra; a table with neither side is the plainest gap', () => {
    const m = portWaves(process.cwd(), schema, { waves: 2 })
    expect(m.skipped).toBe(2) // schema_migrations + solid_queue_jobs
    expect(m.gaps.map((g) => g.table)).toContain('stocks') // no stock model, no stocks collection
  })

  it('machines is MODEL-WITHOUT-COLLECTION — the law of one machine exists, nowhere to store them', () => {
    // the balance framing changed this verdict: `machine` (singular) is the rate-spread MODEL; there is no
    // `machines` COLLECTION. Previously read as "ported" because a singular match counted as coverage.
    const m = portWaves(process.cwd(), schema, { waves: 2 })
    const g = m.gaps.find((x) => x.table === 'machines')
    expect(g?.model?.atom).toBe('machine')
    expect(g?.collection).toBeNull()
    expect(g?.disbalance).toBe('model-without-collection')
    expect(m.modelsWithoutCollection).toBeGreaterThan(0)
  })

  it('column life: an unreachable DB leaves life UNKNOWN — empty, never guessed', async () => {
    // the honest boundary: no DB ⇒ no verdict. Verified against the live source separately —
    // packing_lists reports 7 DEGENERATE columns (present 727, informative 0), employee_contracts 0.
    expect(await upstreamColumnLife('erpax_no_such_db_xyz', 'packing_lists')).toEqual([])
  })

  it('column life: only identifiers we parsed ourselves reach the DB', async () => {
    expect(await upstreamColumnLife('etrima_production', 'DROP TABLE x; --')).toEqual([])
  })

  it('a table the upstream defined but NEVER USED (0 rows) is not a gap — porting it would invent', () => {
    const m = portWaves(process.cwd(), schema, { waves: 2, rows: new Map([['stocks', 0]]) })
    expect(m.gaps.map((g) => g.table)).not.toContain('stocks')
    expect(m.unused).toBe(1)
  })

  it('usage UNKNOWN (no DB) assumes nothing — the table stays a gap rather than being guessed away', () => {
    const m = portWaves(process.cwd(), schema, { waves: 2 })
    expect(m.gaps.map((g) => g.table)).toContain('stocks')
    expect(m.gaps.find((g) => g.table === 'stocks')?.rows).toBeNull()
    expect(m.unused).toBe(0)
  })

  it('a used table stays a real gap (rows > 0)', () => {
    const m = portWaves(process.cwd(), schema, { waves: 2, rows: new Map([['stocks', 919]]) })
    expect(m.gaps.map((g) => g.table)).toContain('stocks')
    expect(m.unused).toBe(0)
  })

  it('the MODEL is a type (reusable) — product_variants finds `variant`, but has no store of its own', () => {
    const m = portWaves(process.cwd(), `\ncreate_table "product_variants", force: :cascade do |t|\n  t.string "code"\nend\n`, {
      waves: 1,
    })
    const g = m.gaps.find((x) => x.table === 'product_variants')
    expect(g?.model?.atom).toBe('variant') // the singular types it — never mint product/variant
    expect(g?.model?.implemented).toBe(true) // variant carries its matter (the expansion generator)
    expect(g?.collection).toBeNull() // and NO collection: the plural store does not exist
    expect(g?.disbalance).toBe('model-without-collection')
  })

  it('a model without matter still names where to fold — vocabulary is not a port', () => {
    // hermetic: a corpus holding the WORD (SKILL) with no matter (no index.ts)
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-port-'))
    mkdirSync(join(cwd, 'src', 'wombat'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'wombat', 'SKILL.md'), '---\nname: wombat\n---\n')
    const m = portWaves(cwd, `\ncreate_table "wombats", force: :cascade do |t|\n  t.string "code"\nend\n`, { waves: 1 })
    const g = m.gaps.find((x) => x.table === 'wombats')
    expect(g?.model?.atom).toBe('wombat') // the word exists — fold the matter there
    expect(g?.model?.implemented).toBe(false) // vocabulary only
    expect(g?.balanced).toBe(false) // vocabulary alone is never a port
    expect(g?.disbalance).toBe('model-without-collection')
    expect(m.modelsWithoutCollection).toBe(1)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the waves save and share their thought: a second run READS it', () => {
    portWaves(process.cwd(), schema, { waves: 2 }) // seed
    expect(portWaves(process.cwd(), schema, { waves: 2 }).cached).toBe(true)
  })
})
