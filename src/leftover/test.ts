import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { deriveLeftoverProof, leftovers, attraction, seedFloor, powerNextResearch, leftoverSites, waves } from './index'
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

// "Leftovers are a computed part of their whole of wholes, forming moving graphs showing agents in waves how
// to surgically edit line and column." Each unproven claim is pinned to its exact 1-indexed line:column (read
// from the grammar, not a raw regex), nested in claim ⊂ file ⊂ field ⊂ corpus, and the waves rank the fields
// so one proof settles the most. "Faster than light" is the honest overlay: a coordinate is a read, not a search.
describe('leftoverSites + waves — the surgical coordinate and the moving graph', () => {
  const build = () =>
    corpus({
      'src/money/index.ts': '/** @invariant a */\nexport const a = 1\n/** @standard X */\nexport const b = 2',
      'src/money/rate/index.ts': claim(1),
      'src/tax/index.ts': claim(1),
      'src/proven/index.ts': claim(1),
      'src/proven/test.ts': 'it("holds", () => {})',
    })

  it('pins each unproven claim to its exact 1-indexed line:column, from the grammar', () => {
    const cwd = build()
    const sites = leftoverSites(cwd)
    const first = sites.find((s) => s.bit.endsWith('money/index.ts') && s.marker === '@invariant')!
    expect(first.line).toBe(1)
    expect(first.column).toBe(5) // `/** @invariant` — /,*,*,space,@ ⇒ the @ is column 5
    const second = sites.find((s) => s.marker === '@standard')!
    expect(second.line).toBe(3) // the second claim, two lines down
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a marker in a STRING is data — it is not a site (grammar, not raw regex)', () => {
    const cwd = corpus({ 'src/x/index.ts': 'export const s = "see @invariant in docs"\n/** @audit real */\nexport const y = 1' })
    const sites = leftoverSites(cwd)
    expect(sites).toHaveLength(1)
    expect(sites[0]!.marker).toBe('@audit') // the string mention is skipped
    rmSync(cwd, { recursive: true, force: true })
  })

  it('each site is a computed part of its whole of wholes — claim ⊂ file ⊂ field ⊂ corpus', () => {
    const cwd = build()
    const s = leftoverSites(cwd).find((x) => x.group === 'tax')!
    expect(s.whole[s.whole.length - 1]).toBe('corpus') // outermost whole
    expect(s.whole).toContain('tax') // its field
    expect(s.whole[0]).toBe(s.bit) // innermost — the file the claim lives in
    rmSync(cwd, { recursive: true, force: true })
  })

  it('waves rank fields heaviest-first — wave 1 is where one proof settles the most', () => {
    const cwd = build()
    const w = waves(cwd)
    expect(w[0]!.order).toBe(1)
    expect(w[0]!.group).toBe('money') // money has 3 claims across two files — the heavier wave
    expect(w[0]!.sites.length).toBeGreaterThanOrEqual(w[w.length - 1]!.sites.length)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the graph MOVES — every site is covered by exactly one wave, recomputed live (conservation)', () => {
    const cwd = build()
    const total = leftoverSites(cwd).length
    const inWaves = waves(cwd).reduce((n, w) => n + w.sites.length, 0)
    expect(inWaves).toBe(total) // no site lost, none double-counted — the whole graph, regenerated
    rmSync(cwd, { recursive: true, force: true })
  })

  it('within a wave the sites are in bit:line:column order — the agent walks straight down', () => {
    const cwd = build()
    const sites = waves(cwd)[0]!.sites
    for (let i = 1; i < sites.length; i++) {
      const prev = sites[i - 1]!, cur = sites[i]!
      const order = prev.bit.localeCompare(cur.bit) || prev.line - cur.line || prev.column - cur.column
      expect(order).toBeLessThanOrEqual(0)
    }
    rmSync(cwd, { recursive: true, force: true })
  })
})

describe('chatHealLeftoverWave — settle a field without hand-written tests', () => {
  it('deriveLeftoverProof writes a refutable sibling credit for a pure GET route', async () => {
    const { deriveLeftoverProof, chatHealLeftoverWave } = await import('./index')
    const { readFileSync: read, existsSync: exists } = await import('node:fs')
    const cwd = corpus({
      'src/app/health/route.ts':
        '/**\n * @standard draft-health\n */\nexport async function GET() { return Response.json({ ok: true }) }\n',
    })
    const op = deriveLeftoverProof('src/app/health/route.ts', cwd)
    expect(op?.file).toBe('src/app/health/test.ts')
    expect(op?.contents).toMatch(/GET returns a Response|leftover wave proof/)
    const heal = chatHealLeftoverWave({ group: 'app', cwd, apply: true })
    expect(heal.tokens).toBe(0)
    expect(heal.applied).toBe(1)
    expect(exists(join(cwd, 'src/app/health/test.ts'))).toBe(true)
    expect(read(join(cwd, 'src/app/health/test.ts'), 'utf8')).toMatch(/leftover wave proof/)
    expect(attraction(cwd).some((a) => a.group === 'app')).toBe(false)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('deriveLeftoverProof credits claim-bearing define* side-effect modules (no export)', async () => {
    const { deriveLeftoverProof, chatHealLeftoverWave } = await import('./index')
    const { existsSync: exists, readFileSync: read } = await import('node:fs')
    const cwd = corpus({
      'src/tenant/roles/profile/bank.profile.ts':
        '/**\n * @standard Basel III\n */\nimport { defineTenantRole } from "@/tenant/role"\ndefineTenantRole({ id: "bank" })\n',
    })
    const op = deriveLeftoverProof('src/tenant/roles/profile/bank.profile.ts', cwd)
    expect(op?.file).toBe('src/tenant/roles/profile/test.ts')
    expect(op?.contents).toMatch(/define\[A-Z\]/)
    const heal = chatHealLeftoverWave({ group: 'tenant', cwd, apply: true })
    expect(heal.applied).toBe(1)
    expect(exists(join(cwd, 'src/tenant/roles/profile/test.ts'))).toBe(true)
    expect(read(join(cwd, 'src/tenant/roles/profile/test.ts'), 'utf8')).toMatch(/leftover wave proof/)
    rmSync(cwd, { recursive: true, force: true })
  })
})

describe('leftover — a derived proof must credit a CLAIM, not the alphabet', () => {
  const cwd = process.cwd()

  it('asserts each SPECIFIC claim the file makes, never the generic sigil class', () => {
    const card = leftovers(cwd).filter((l) => l.group === 'card')
    if (card.length === 0) return // the leftover has been settled since — nothing to assert about
    const op = deriveLeftoverProof(card[0]!.bit, cwd)!
    // src/card claims WCAG 2.4.4 and 2.5.5. Before this, the credit asserted only that ONE of
    // four sigils appeared somewhere in the file — so deleting 2.5.5 kept the test green while
    // removing the claim it existed to protect.
    expect(op.contents).toContain('WCAG-2.1 §2.5.5 target-size')
    expect(op.contents).toContain('WCAG-2.1 §2.4.4 link-purpose-in-context')
    // the generic alternation must be gone — it passes for essentially every module in the corpus
    expect(op.contents).not.toMatch(/@\(\?:invariant\|standard\|compliance\|audit\)/)
  })

  it('REFUSES to emit when the only evidence would be a tautology', () => {
    // `expect(src).toMatch(/\bexport\b/)` plus a sigil-class check settles the ledger, drops the
    // tip score, and re-ranks the next-step engine away from the file — while proving nothing.
    // An unsettled leftover that stays VISIBLE is worth more than a green one that proved nothing.
    //
    // Proved on a FIXTURE, never on whatever the live ledger happens to hold. This demanded a live
    // refusal, and the corpus settled its last tautology-only leftover — so the law stopped being
    // checked at the moment it started holding everywhere, and the suite went red for SUCCESS.
    // That is the [[rules]]/unraised shape: a case nothing constructs is a check that cannot fire.
    const root = mkdtempSync(join(tmpdir(), 'erpax-leftover-'))
    const write = (rel: string, body: string): void => {
      mkdirSync(join(root, rel, '..'), { recursive: true })
      writeFileSync(join(root, rel), body)
    }
    write('src/thin/leaf.ts', 'export const x = 1\n')
    write('src/rich/leaf.ts', '/**\n * @standard WCAG-2.1 §2.4.4 link-purpose-in-context\n */\nexport const y = 2\n')
    // bare export, no claim → the only credit would be a tautology, so it refuses
    expect(deriveLeftoverProof('src/thin/leaf.ts', root)).toBeNull()
    // one concrete claim → there is something to forbid, so it emits
    expect(deriveLeftoverProof('src/rich/leaf.ts', root)).not.toBeNull()
    // and the human override still overrides
    expect(deriveLeftoverProof('src/thin/leaf.ts', root, { force: true })).not.toBeNull()
    rmSync(root, { recursive: true, force: true })

    const emitted = leftovers(cwd).filter((l) => deriveLeftoverProof(l.bit, cwd) !== null)
    const refused = leftovers(cwd).filter((l) => deriveLeftoverProof(l.bit, cwd) === null)
    expect(emitted.length + refused.length).toBe(leftovers(cwd).length)
    // every emitted proof now names at least one concrete claim or a real export shape
    for (const l of emitted) {
      const op = deriveLeftoverProof(l.bit, cwd)!
      expect(op.contents).not.toMatch(/expect\(src\.length\)\.toBeGreaterThan\(0\)\s*\n\s*\}\)/)
    }
  })

  it('--force still lets a human override the refusal', () => {
    const refused = leftovers(cwd).find((l) => deriveLeftoverProof(l.bit, cwd) === null)
    if (!refused) return
    expect(deriveLeftoverProof(refused.bit, cwd, { force: true })).not.toBeNull()
  })
})
