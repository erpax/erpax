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
  it('the award is unreachable in the live config: nothing can name the grant it belongs to', () => {
    const g = collectionGraph(process.cwd())
    expect(g.ifaceOfSlug.has(awardSlug())).toBe(true)
    expect(g.edges.filter((e) => e.to === awardSlug())).toHaveLength(0)
    expect(canReach(awardSlug(), process.cwd()).size).toBe(0)
  })

  it('so every attributable stage fails, and for ONE reason rather than eight', () => {
    const broken = fundedSpine(process.cwd()).filter((s) => !s.served)
    expect(broken.length).toBe(fundedStages().filter((s) => s.attributable).length)
    expect(new Set(broken.map((s) => s.reason)).size).toBe(1)
    expect(spineComplete(process.cwd())).toBe(false)
  })

  it('projects requires a customer, so a funded project cannot be saved without inventing one', () => {
    expect(requiredRelationships('projects', process.cwd())).toContain('customer')
  })

  it('names both blockers, and both sit in the spine — neither is a domain gap', () => {
    const b = awardBlockers(process.cwd())
    expect(b.map((x) => x.kind).sort()).toEqual(['required-counterparty', 'unreachable-award'])
  })
})

describe('fund — the gate can go green', () => {
  // A gate that can only ever be red proves nothing. This is the same corpus, one edge different.
  it('serves every stage once ONE edge exists: each table can name its award', () => {
    const root = fixture(true)
    try {
      expect(canReach(awardSlug(), root).size).toBe(fundedStages().length - 1)
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
