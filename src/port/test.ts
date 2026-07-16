/**
 * port — proof the Rosetta mapping diamond is content-addressed.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { portDiamond, portMappingUuid, upstreamTables, candidateAtoms, headNoun, erpaxAtomIndex, portWaves } from '@/port'

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

  it('candidateAtoms depluralises a Rails table to the erpax atom forms', () => {
    expect(candidateAtoms('machines')).toContain('machine')
    expect(candidateAtoms('work_phases')).toContain('work/phases')
    expect(candidateAtoms('work_phases')).toContain('work/phase')
  })

  it('headNoun reduces a compound Rails table to the one-word atom erpax would name it', () => {
    expect(headNoun('product_variants')).toBe('variant')
    expect(headNoun('stocks')).toBe('stock')
  })

  it('erpaxAtomIndex scans the live tree and marks matter: port has an index.ts, product is vocabulary only', () => {
    const index = erpaxAtomIndex(process.cwd())
    expect(index.get('port')?.implemented).toBe(true)
    expect(index.get('product')?.implemented).toBe(false) // the word exists, the matter does not
  })

  it('DRY cleaning: skips framework infra, ports machines via the machine atom, flags stocks as a gap', () => {
    const m = portWaves(process.cwd(), schema, { waves: 2 })
    expect(m.skipped).toBe(2) // schema_migrations + solid_queue_jobs
    expect(m.gaps.map((g) => g.table)).toContain('stocks')
    expect(m.gaps.map((g) => g.table)).not.toContain('machines') // ported — never re-ported
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

  it('a head-noun hit names the word, never a literal port — product_variants → the variant generator', () => {
    const m = portWaves(process.cwd(), `\ncreate_table "product_variants", force: :cascade do |t|\n  t.string "code"\nend\n`, {
      waves: 1,
    })
    const g = m.gaps.find((x) => x.table === 'product_variants')
    expect(g?.atom).toBe('variant') // the word already exists — never mint product/variant
    expect(g?.match).toBe('head')
    expect(g?.implemented).toBe(true) // variant now carries its matter (the expansion generator)
    expect(g?.covered).toBe(false) // a head match is the algebra, not this table's literal port
  })

  it('a word without matter is NOT ported — it names where to fold, not a new word to mint', () => {
    // hermetic: a corpus holding the WORD (SKILL) with no matter (no index.ts)
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-port-'))
    mkdirSync(join(cwd, 'src', 'wombat'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'wombat', 'SKILL.md'), '---\nname: wombat\n---\n')
    const m = portWaves(cwd, `\ncreate_table "wombats", force: :cascade do |t|\n  t.string "code"\nend\n`, { waves: 1 })
    const g = m.gaps.find((x) => x.table === 'wombats')
    expect(g?.atom).toBe('wombat') // the word exists — fold the matter there
    expect(g?.implemented).toBe(false) // vocabulary only
    expect(g?.covered).toBe(false) // vocabulary alone is never a port
    expect(m.wordsWithoutMatter).toBe(1)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the waves save and share their thought: a second run READS it', () => {
    portWaves(process.cwd(), schema, { waves: 2 }) // seed
    expect(portWaves(process.cwd(), schema, { waves: 2 }).cached).toBe(true)
  })
})
