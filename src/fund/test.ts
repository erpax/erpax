import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { awardBlockers, awardSlug, fundedStages, canReach, collectionGraph, fundedSpine, orphanCollections, requiredRelationships, spineComplete } from './index'

/** A hermetic config: eight stage tables, and an award that CAN be named. */
const fixture = (awardReachable: boolean): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-fund-'))
  mkdirSync(join(root, 'src'))
  const slugs = fundedStages().map((s) => s.slug)
  const iface = (s: string): string => s.split('-').map((w) => w[0]!.toUpperCase() + w.slice(1)).join('')
  const body = slugs
    .map((s) => {
      const link = s === awardSlug() ? '' : `  award${awardReachable ? '' : '?'}: string | ${iface(awardSlug())};\n`
      return `export interface ${iface(s)} {\n  id: string;\n${link}  name: string;\n}\n`
    })
    .join('\n')
  const config = `export interface Config {\n  collections: {\n${slugs.map((s) => `    '${s}': ${iface(s)};`).join('\n')}\n  };\n}\n`
  writeFileSync(join(root, 'src', 'payload-types.ts'), `${body}\n${config}`)
  return root
}

describe('fund — the collection graph', () => {
  it('reads edges from the live config, in every spelling a relationship takes', () => {
    const g = collectionGraph(process.cwd())
    expect(g.ifaceOfSlug.size).toBeGreaterThan(200)
    expect(g.edges.length).toBeGreaterThan(500)
  })

  // Perturbation: a zero is only worth reading once the instrument is known to find a non-zero.
  it('finds the reachable targets, so a zero is a fact rather than a broken walk', () => {
    expect(canReach('tenants', process.cwd()).size).toBeGreaterThan(100)
    expect(canReach('customers', process.cwd()).size).toBeGreaterThan(10)
  })

  it('an orphan is a booted table with no inbound edge', () => {
    const g = collectionGraph(process.cwd())
    for (const slug of orphanCollections(process.cwd())) {
      expect(g.edges.some((e) => e.to === slug)).toBe(false)
    }
  })
})

describe('fund — the funded-project spine', () => {
  // It was 0 of 231. `government-grants` named its tenant, entity, clawback provision and funded
  // asset, and nothing named IT — so no cost, invoice, milestone or report could be attributed to
  // the grant that paid for it, identically in all 21 NACE sections. Five edges closed it.
  it('the award is reachable: a row can name the grant it belongs to', () => {
    const g = collectionGraph(process.cwd())
    expect(g.ifaceOfSlug.has(awardSlug())).toBe(true)
    expect(g.edges.filter((e) => e.to === awardSlug()).length).toBeGreaterThan(0)
    expect(canReach(awardSlug(), process.cwd()).size).toBeGreaterThan(50)
  })

  it('every stage is served', () => {
    expect(fundedSpine(process.cwd()).filter((s) => !s.served)).toEqual([])
    expect(spineComplete(process.cwd())).toBe(true)
  })

  it('projects no longer REQUIRE a customer — a funded project has a funder', () => {
    expect(requiredRelationships('projects', process.cwd())).not.toContain('customer')
  })

  it('names no blockers', () => {
    expect(awardBlockers(process.cwd())).toEqual([])
  })

  // The funder's report is a ROW, not a table. A new collection is warranted only by a new
  // signature, and a periodic filing to an external authority — entity, period, due date,
  // submission, status, feedback — is a shape this corpus already had.
  it('added no collection to close the spine', () => {
    expect(collectionGraph(process.cwd()).ifaceOfSlug.size).toBe(231)
    expect(fundedSpine(process.cwd()).find((s) => s.stage === 'report')!.slug).toBe('regulatory-reports')
  })
})

describe('fund — the gate can go green', () => {
  // A gate that can only ever be red proves nothing. This is the same corpus, one edge different.
  it('serves every stage once ONE edge exists: each table can name its award', () => {
    const root = fixture(true)
    try {
      // distinct slugs, minus the award itself: `close` is recorded ON the award, so it shares a slug
      const others = new Set(fundedStages().map((x) => x.slug))
      others.delete(awardSlug())
      expect(canReach(awardSlug(), root).size).toBe(others.size)
      expect(fundedSpine(root).filter((s) => !s.served)).toHaveLength(0)
      expect(spineComplete(root)).toBe(true)
      expect(awardBlockers(root)).toHaveLength(0)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('…and the same corpus with that edge OPTIONAL still serves — required is not the test', () => {
    const root = fixture(false)
    try {
      expect(spineComplete(root)).toBe(true)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
