import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { ISO_27002_CATALOG } from '@/utilities/iso/27002'
import { COLLISIONS, catalogue, gaps, primitivesUsed, standardsCovered } from '@/utilities/iso/primitives'

const root = join(import.meta.dirname, '..', '..', '..', '..')

describe('iso/primitives — a standard is claimed only where code carries it', () => {
  it.each(COLLISIONS.map((row) => [`${row.standard} · ${row.requirement}`, row] as const))('%s has its evidence on disk', (_name, row) => {
    expect(existsSync(join(root, row.evidence)), row.evidence).toBe(true)
  })

  it('every 27002 control a row names is in the catalogue', () => {
    const known = new Set<string>(ISO_27002_CATALOG.map((c) => c.id))
    for (const row of COLLISIONS) if (row.control) expect(known.has(row.control), `${row.standard}: ${row.control}`).toBe(true)
  })

  it('no row names an edition (editions are data, not code)', () => {
    for (const row of COLLISIONS) expect(`${row.standard} ${row.requirement}`).not.toMatch(/:\d{4}/)
  })

  it('the catalogue is the full cross and its gaps are the empty cells', () => {
    expect(catalogue()).toHaveLength(standardsCovered().length * primitivesUsed().length)
    expect(gaps().length).toBe(catalogue().filter((cell) => cell.rows === 0).length)
    expect(catalogue().reduce((sum, cell) => sum + cell.rows, 0)).toBe(COLLISIONS.length)
  })
})
