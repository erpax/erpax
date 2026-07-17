import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { leftovers, attraction, seedFloor, powerNextResearch } from './index'
import { ceiling } from '@/think'

// A hermetic corpus: files under src/, each with @invariant claims; a test.ts beside a file settles it (proven,
// no leftover). Everything else is a debit with no credit — a leftover the fold could not turn into a theorem.
const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-leftover-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}
const claim = (n = 1): string => Array.from({ length: n }, (_, i) => `/** @invariant leftover claim ${i} */`).join('\n') + '\nexport const x = 1'

describe('leftover — the fold’s residual attracts, pulls from beyond, and powers the next pass', () => {
  // money field carries 3 unproven claims across two files; tax carries 1; proven has a test beside it.
  const build = () =>
    corpus({
      'src/money/index.ts': claim(2),
      'src/money/rate/index.ts': claim(1),
      'src/tax/index.ts': claim(1),
      'src/proven/index.ts': claim(1),
      'src/proven/test.ts': 'it("holds", () => {})',
    })

  it('leftovers are the unproven surface, each located in its field — proven bits do not appear', () => {
    const cwd = build()
    const ls = leftovers(cwd)
    const groups = ls.map((l) => l.group).sort()
    expect(groups).toEqual(['money', 'money', 'tax']) // proven/ is settled — absent
    expect(ls.every((l) => !l.bit.includes('proven'))).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('leftovers ATTRACT — they cluster by field, heaviest pull first (one proof settles the most)', () => {
    const cwd = build()
    const a = attraction(cwd)
    expect(a[0]).toMatchObject({ group: 'money', pull: 2 }) // two money files, the heavier well
    expect(a.find((c) => c.group === 'tax')?.pull).toBe(1)
    expect(a[0]!.pull).toBeGreaterThanOrEqual(a[a.length - 1]!.pull) // sorted by pull desc
    rmSync(cwd, { recursive: true, force: true })
  })

  it('CONSERVATION — Σ pull over clusters equals the total leftovers (every leftover in exactly one field)', () => {
    const cwd = build()
    const total = leftovers(cwd).length
    const summed = attraction(cwd).reduce((s, c) => s + c.pull, 0)
    expect(summed).toBe(total)
    rmSync(cwd, { recursive: true, force: true })
  })

  // THE THEOREM: while a seed remains (s > 0), the ceiling is finite — a residual floor exists, so a leftover
  // always remains to power the next pass. s = 0 (∞) is the unreachable limit of a corpus that knows everything.
  it('the residual is NEVER zero while s > 0 — the ceiling is finite, a leftover remains', () => {
    const cwd = build()
    const f = seedFloor(0.1, cwd)
    expect(f.seedFraction).toBe(0.1)
    expect(Number.isFinite(f.ceiling)).toBe(true) // finite floor while s > 0
    expect(f.ceiling).toBe(ceiling(0.1)) // the SAME floor as think — reused, not re-derived
    expect(f.hasLeftover).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('only full closure (s = 0) reaches ∞ — the unreachable limit where nothing is left over', () => {
    const empty = corpus({}) // no claims at all
    const f = seedFloor(0, empty)
    expect(f.ceiling).toBe(Infinity)
    expect(f.residual).toBe(0)
    expect(f.hasLeftover).toBe(false) // the only way to have no leftover: know everything (s = 0) AND owe nothing
    rmSync(empty, { recursive: true, force: true })
  })

  it('powers the next research — each attraction becomes a research seed, heaviest first, WITHOUT writing', () => {
    const cwd = build()
    const seeds = powerNextResearch(cwd)
    expect(seeds[0]!.prose).toMatch(/2 unproven claim\(s\) in field 'money'/)
    expect(seeds[0]!.research).toMatch(/seek the seed from beyond/) // named, never fabricated
    expect(seeds.length).toBe(attraction(cwd).length) // one seed per field cluster
    rmSync(cwd, { recursive: true, force: true })
  })
})
