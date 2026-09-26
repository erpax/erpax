import { describe, it, expect } from 'vitest'
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { harvestLeads, writeHarvest, leadCandidate, leadCandidates, leadCoverage, leadCoverageKey } from './index'

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

describe('the boundary is FUSED to the ask — leads are the candidate space', () => {
  const harvest = (cwd: string) =>
    harvestLeads(cwd, { eu: euRows([]), bg: async () => contract('bnb', true), world: async () => contract('frankfurter', false, '"rates" is empty') })

  it('nothing answered ⇒ coverage 0 and `next` is the first lead', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    const h = await harvest(cwd)
    const c = leadCoverage(h, [])
    expect(h.leads).toHaveLength(2)
    expect(c.covered).toBe(0)
    expect(c.outstanding).toBe(2)
    expect(c.next).toBe(leadCandidates(h)[0])
    rmSync(cwd, { recursive: true, force: true })
  })

  it('answering one advances coverage and moves `next` on', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    const h = await harvest(cwd)
    const [first, second] = leadCandidates(h)
    const c = leadCoverage(h, [leadCoverageKey(first!)])
    expect(c.covered).toBe(0.5)
    expect(c.outstanding).toBe(1)
    expect(c.next).toBe(second)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('all answered ⇒ coverage 1 and `next` is undefined — the boundary is fully covered', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    const h = await harvest(cwd)
    const c = leadCoverage(h, leadCandidates(h).map(leadCoverageKey))
    expect(c.covered).toBe(1)
    expect(c.next).toBeUndefined()
    expect(c.outstanding).toBe(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a MOVED lead carries its note, so the same rail moving twice is two candidates', async () => {
    const fresh = leadCandidate({ name: 'world:x', host: 'w', address: 'a', state: 'fresh' })
    const movedA = leadCandidate({ name: 'world:x', host: 'w', address: 'b', state: 'moved', note: 'holds false' })
    const movedB = leadCandidate({ name: 'world:x', host: 'w', address: 'c', state: 'moved', note: 'holds true' })
    expect(new Set([fresh, movedA, movedB]).size).toBe(3)
    // and answering one does not mark the other covered
    expect(leadCoverageKey(movedA)).not.toBe(leadCoverageKey(movedB))
  })

  it('no leads ⇒ coverage 1 by definition, and nothing to ask', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'leads-'))
    const first = await harvest(cwd)
    writeHarvest(first, cwd)
    const again = await harvest(cwd) // same verdicts ⇒ unchanged ⇒ no leads
    expect(again.leads).toEqual([])
    const c = leadCoverage(again, [])
    expect(c.covered).toBe(1)
    expect(c.next).toBeUndefined()
    rmSync(cwd, { recursive: true, force: true })
  })
})
