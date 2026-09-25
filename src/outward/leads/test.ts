import { describe, it, expect } from 'vitest'
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { harvestLeads, writeHarvest } from './index'

const LEADS_REL = 'outward-leads.json'
import type { OutwardRow } from '@/outward'

const contract = (rail: string, holds: boolean, detail = 'd') => [{ rail, holds, detail }]
const euRows = (rows: OutwardRow[]) => async () => ({ rows })

describe('outward/leads — the boundary asked once, and only what changed costs attention', () => {
  it('first run: every rail is FRESH, and fresh is a lead', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    const h = await harvestLeads(cwd, {
      eu: euRows([{ name: 'eu:vies', host: 'ec.europa.eu', address: 'a1', state: 'fresh' }]),
      bg: async () => contract('bnb', true),
      world: async () => contract('frankfurter', true),
    })
    expect(h.rows).toHaveLength(3)
    expect(h.leads).toHaveLength(3)
    expect(h.unreachable).toEqual([])
    rmSync(cwd, { recursive: true, force: true })
  })

  it('second run with the same verdicts: no leads — the release has no reason from the boundary', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    const first = await harvestLeads(cwd, {
      eu: euRows([]), bg: async () => contract('bnb', true), world: async () => contract('frankfurter', true),
    })
    writeHarvest(first, cwd)
    const second = await harvestLeads(cwd, {
      eu: euRows([]), bg: async () => contract('bnb', true), world: async () => contract('frankfurter', true, 'a DIFFERENT day'),
    })
    expect(second.rows.map((r) => r.state)).toEqual(['unchanged', 'unchanged'])
    expect(second.leads).toEqual([])
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a contract that BREAKS is a lead on the next run', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    writeHarvest(await harvestLeads(cwd, { eu: euRows([]), bg: async () => contract('bnb', true), world: async () => [] }), cwd)
    const after = await harvestLeads(cwd, { eu: euRows([]), bg: async () => contract('bnb', false, '"rates" is empty'), world: async () => [] })
    expect(after.leads.map((r) => [r.name, r.state])).toEqual([['bg:bnb', 'moved']])
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a source that THROWS is unreachable, never a lead — and keeps its prior receipt', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    const h = await harvestLeads(cwd, {
      eu: async () => { throw new Error('ENOTFOUND') },
      bg: async () => { throw new Error('502') },
      world: async () => contract('frankfurter', true),
    })
    expect(h.unreachable.map((r) => r.name)).toEqual(['eu', 'bg'])
    expect(h.leads.map((r) => r.name)).toEqual(['world:frankfurter'])
    expect(h.unreachable[0]!.note).toContain('ENOTFOUND')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the leads file is the release agenda and names only the leads', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    const h = await harvestLeads(cwd, {
      eu: euRows([{ name: 'eu:vies', host: 'h', address: 'a', state: 'unchanged' }]),
      bg: async () => contract('bnb', true), world: async () => [],
    })
    writeHarvest(h, cwd)
    expect(existsSync(join(cwd, LEADS_REL))).toBe(true)
    const doc = JSON.parse(readFileSync(join(cwd, LEADS_REL), 'utf8')) as { asked: number; leads: number; rows: { name: string }[] }
    expect(doc.asked).toBe(2)
    expect(doc.leads).toBe(1)
    expect(doc.rows.map((r) => r.name)).toEqual(['bg:bnb'])
    rmSync(cwd, { recursive: true, force: true })
  })
})
