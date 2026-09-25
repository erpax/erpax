import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { copyCount, duplicateBodies, policyAddresses, formulaAddresses, COINCIDENT_FORMULAS } from './index'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-copy-'))
  for (const [rel, body] of Object.entries(files)) {
    const full = join(root, 'src', rel)
    mkdirSync(join(full, '..'), { recursive: true })
    writeFileSync(full, body)
  }
  return root
}

const big = (extra: string) => `export function f() {
  const a = 1; const b = 2; const c = 3; const d = 4; const e = 5
  const g = [a, b, c, d, e].map((x) => x * 2).filter((x) => x > 2).reduce((s, x) => s + x, 0)
  const h = { a, b, c, d, e, g, ${extra} }
  return Object.keys(h).length + g
}
`

describe('rules/copy — same bytes, same address', () => {
  it('finds one body at two addresses', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'b/index.ts': big('z: 1') })
    try {
      const g = duplicateBodies(root, 20)
      expect(g.length).toBe(1)
      expect(g[0]!.sites.map((s) => s.file).sort()).toEqual(['src/a/index.ts', 'src/b/index.ts'])
      expect(copyCount(root, 20)).toBe(1)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  // Comments are data, not code: two identical implementations documented differently are still one.
  it('ignores comments and whitespace — the same code annotated twice is one body', () => {
    const root = tree({
      'a/index.ts': big('z: 1'),
      'b/index.ts': '// a thorough explanation\n' + big('z: 1').replace('const a = 1;', 'const a = 1; /* one */'),
    })
    try {
      expect(copyCount(root, 20)).toBe(1)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  // Identifiers are NOT normalised. A body that reads different names is doing something else until
  // a human says otherwise, and erasing names is how a duplicate report fills with false pairs.
  it('does NOT collapse two bodies that differ only in what they name', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'b/index.ts': big('y: 1') })
    try {
      expect(duplicateBodies(root, 20)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('respects the declared noise floor — a small shared body is not a finding', () => {
    const tiny = 'export const f = () => 1\n'
    const root = tree({ 'a/index.ts': tiny, 'b/index.ts': tiny })
    try {
      expect(duplicateBodies(root, 40)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('skips generated faces, which restate every symbol', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'a/thing.generated.ts': big('z: 1') })
    try {
      expect(duplicateBodies(root, 20)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('skips tests, where scaffolding legitimately repeats', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'a/test.ts': big('z: 1') })
    try {
      expect(duplicateBodies(root, 20)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('counts copies BEYOND the first — what DRY would actually remove', () => {
    const root = tree({ 'a/index.ts': big('z: 1'), 'b/index.ts': big('z: 1'), 'c/index.ts': big('z: 1') })
    try {
      expect(copyCount(root, 20)).toBe(2)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})

describe('rules/copy — the live corpus', () => {
  it('reports groups largest-first, so the biggest copy is read first', () => {
    const g = duplicateBodies(process.cwd())
    expect(g.length).toBeGreaterThan(0)
    for (let i = 1; i < g.length; i++) {
      expect(g[i]!.nodes * g[i]!.sites.length).toBeLessThanOrEqual(g[i - 1]!.nodes * g[i - 1]!.sites.length)
    }
  })

  it('every group really has two or more distinct sites', () => {
    for (const g of duplicateBodies(process.cwd())) {
      expect(new Set(g.sites.map((s) => `${s.file}:${s.line}`)).size).toBeGreaterThan(1)
    }
  })
})

/**
 * The copy × cycle cross — formulated from the enumerator, then built.
 *
 * `conjecture.crosses()` ranked `rules/copy × rules/cycle` second at 1.11 bits: both laws widely
 * cited, never drawn together. The claim it names is a real one — a duplicated body whose two
 * sites lie in ONE strongly connected component is strictly worse than an ordinary copy, because
 * inside a tangle the initialisation order of the two files is decided by the graph rather than
 * by either author.
 */
describe('rules/copy — a copy inside one tangle', () => {
  it('the population is real, so a zero here is a measurement', async () => {
    const { duplicateBodies } = await import('@/rules/copy')
    const { importCycles } = await import('@/rules/cycle')
    const crossFile = duplicateBodies().filter((g) => new Set(g.sites.map((s) => s.file)).size > 1)
    expect(crossFile.length).toBeGreaterThan(0) // 7 at the time of writing
    const tangled = importCycles()
    expect(tangled.length).toBeGreaterThan(0)
    expect(tangled.reduce((n, c) => n + c.length, 0)).toBeGreaterThan(1)
  }, 300_000)

  it('and no cross-file copy currently sits inside one', async () => {
    const { copiesInTangle } = await import('@/rules/copy')
    expect(copiesInTangle()).toEqual([])
  }, 300_000)

  it('a same-FILE duplicate is excluded — a file is trivially its own component', async () => {
    const { copiesInTangle, duplicateBodies } = await import('@/rules/copy')
    const sameFile = duplicateBodies().filter((g) => new Set(g.sites.map((s) => s.file)).size === 1)
    expect(sameFile.length).toBeGreaterThan(0) // the readme/compute pair
    // counting those would make every same-file duplicate a tangle finding — the noise floor
    for (const g of copiesInTangle()) expect(new Set(g.sites.map((s) => s.file)).size).toBeGreaterThan(1)
  }, 300_000)
})

/**
 * The copy × unfolded cross — found by MEASURING the intersection, not by ranking the prose.
 */
describe('rules/copy — a copy no site earns', () => {
  it('flags a body whose site has an export with no more than one caller', async () => {
    const { unearnedCopies, duplicateBodies } = await import('@/rules/copy')
    const { unfoldedExports } = await import('@/rules/unfolded')
    const r = unfoldedExports()
    const files = new Set([...r.dead, ...r.single].map((e) => e.file))
    const u = unearnedCopies(files)
    expect(u.length).toBeLessThanOrEqual(duplicateBodies().length)
    // every reported group has at least one site whose export is not earning its place
    for (const g of u) {
      expect(g.unearned.length).toBeGreaterThan(0)
      for (const s of g.unearned) expect(files.has(s.file)).toBe(true)
    }
  }, 300_000)

  it('and reports nothing when no site is un-folded', async () => {
    const { unearnedCopies } = await import('@/rules/copy')
    expect(unearnedCopies(new Set<string>())).toEqual([])
  }, 300_000)
})

describe('accessPolicies — a rule a reviewer must trust has one address', () => {
  it('every access policy in the corpus lives at exactly one address', () => {
    expect(policyAddresses(process.cwd())).toEqual([])
  })

  it('a body written `{ return x }` is the same policy as `x` — braces are not a difference', () => {
    // a fifth copy of `() => false` hid behind a pair of braces until this normalised
    const root = tree({
      'a.ts': "import type { Access } from 'payload'\nexport const x: Access = () => false\n",
      'b.ts': "import type { Access } from 'payload'\nexport const y: Access = () => {\n  return false\n}\n",
    })
    const g = policyAddresses(root)
    expect(g).toHaveLength(1)
    expect(g[0]!.map((p) => p.name).sort()).toEqual(['x', 'y'])
    rmSync(root, { recursive: true, force: true })
  })

  it('Access and FieldAccess are DIFFERENT interfaces — one body under both is lawful', () => {
    // superAdminOnly and fieldAccess in @/is/super/admin share a body and must not be flagged
    const root = tree({
      'a.ts':
        "import type { Access, FieldAccess } from 'payload'\n" +
        'export const c: Access = ({ req }) => Boolean(req.user)\n' +
        'export const f: FieldAccess = ({ req }) => Boolean(req.user)\n',
    })
    expect(policyAddresses(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })

  it('an alias points AT an implementation and is never a second one', () => {
    const root = tree({
      'a.ts':
        "import type { Access } from 'payload'\n" +
        'export const base: Access = () => false\n' +
        'export const same: Access = base\n',
    })
    expect(policyAddresses(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })
})

describe('formulaAddresses — one formula, one address, and a coincidence is not a copy', () => {
  it('the corpus has no unexplained formula duplication', () => {
    expect(formulaAddresses(process.cwd())).toEqual([])
  })

  it('a bare operator is NOT a formula — `a*b` says nothing about what it multiplies', () => {
    // energyJoules = h*f and consultProfit = rate*hours share multiplication and no physics.
    // Five atoms matched `$0*$1` before this refusal, which is a noise floor above the signal.
    const root = tree({
      'a.ts': 'export const energy = (h: number, f: number): number => h * f\n',
      'b.ts': 'export const profit = (rate: number, hours: number): number => rate * hours\n',
    })
    expect(formulaAddresses(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })

  it('one non-parameter operand makes it a formula, and two copies are then a finding', () => {
    const root = tree({
      'a.ts': 'export const half = (d: number): number => d / 2\n',
      'b.ts': 'export const halve = (bits: number): number => bits / 2\n',
    })
    const g = formulaAddresses(root)
    expect(g).toHaveLength(1)
    expect(g[0]!.map((f) => f.name).sort()).toEqual(['half', 'halve'])
    expect(g[0]![0]!.shape).toBe('$0/2')
    rmSync(root, { recursive: true, force: true })
  })

  it('a DECLARED coincidence is exempt — folding it would erase a cross-domain fact', () => {
    // birthdayLog2 and groverPreimageLog2 are both d/2 and neither derives the other
    const names = COINCIDENT_FORMULAS.flatMap(([a, b]) => [a, b])
    expect(names).toContain('birthdayLog2')
    expect(names).toContain('groverPreimageLog2')
    for (const [, , why] of COINCIDENT_FORMULAS) expect(why.length).toBeGreaterThan(40)
    const root = tree({
      'a.ts': 'export const birthdayLog2 = (d: number): number => d / 2\n',
      'b.ts': 'export const groverPreimageLog2 = (d: number): number => d / 2\n',
    })
    expect(formulaAddresses(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })
})
