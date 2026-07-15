/**
 * port — proof the Rosetta mapping diamond is content-addressed.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { portDiamond, portMappingUuid, upstreamTables, candidateAtoms, erpaxAtomKeys, portWaves } from '@/port'

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

  it('erpaxAtomKeys scans the live tree (port itself is an atom key)', () => {
    expect(erpaxAtomKeys(process.cwd()).has('port')).toBe(true)
  })

  it('DRY cleaning: skips framework infra, covers machines via the machine atom, flags stocks as a gap', () => {
    const m = portWaves(process.cwd(), schema, { waves: 2 })
    expect(m.skipped).toBe(2) // schema_migrations + solid_queue_jobs
    expect(m.gaps.map((g) => g.table)).toContain('stocks')
    expect(m.gaps.map((g) => g.table)).not.toContain('machines') // covered — never re-ported
  })

  it('the waves save and share their thought: a second run READS it', () => {
    portWaves(process.cwd(), schema, { waves: 2 }) // seed
    expect(portWaves(process.cwd(), schema, { waves: 2 }).cached).toBe(true)
  })
})
