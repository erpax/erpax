import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { planScalpel, applyScalpel, mergeManifests, type ScalpelOp } from '@/scalpel'

const tmp = mkdtempSync(join(tmpdir(), 'scalpel-'))
afterAll(() => rmSync(tmp, { recursive: true, force: true }))

const seed = (): void => {
  mkdirSync(join(tmp, 'src'), { recursive: true })
  writeFileSync(join(tmp, 'src', 'one.ts'), 'export const a = 1\nexport const b = 2\n')
  writeFileSync(join(tmp, 'src', 'two.ts'), 'export const x = 1\nexport const x2 = 1\n')
}

const op = (file: string, find: string, replace: string, reason = 'test evidence'): ScalpelOp => ({
  file,
  find,
  replace,
  reason,
})

describe('scalpel — coordinated surgical edits, no fabrication', () => {
  beforeEach(seed)

  it('unique match cuts; zero matches and ambiguity REFUSE — fabrication cannot pass', () => {
    const plan = planScalpel(
      [
        op('src/one.ts', 'export const a = 1', 'export const a = 10'),
        op('src/one.ts', 'export const zz = 9', 'nope'), // matter not there
        op('src/two.ts', '= 1', '= 2'), // matches twice — ambiguous
        op('src/one.ts', 'export const b = 2', 'x', ''), // no reason
      ],
      tmp,
    )
    expect(plan.verdicts.map((v) => v.state)).toEqual(['cuts', 'no-match', 'ambiguous', 'no-reason'])
    expect(plan.cuts.length).toBe(1)
    expect(plan.refused).toBe(3)
  })

  it('two researchers claiming the same bytes is a COLLISION, named before anything is touched', () => {
    const merged = mergeManifests(
      [op('src/one.ts', 'export const a = 1', 'A', 'researcher one')],
      [op('src/one.ts', 'export const a = 1', 'B', 'researcher two')],
    )
    const plan = planScalpel(merged, tmp)
    expect(plan.verdicts[1]).toMatchObject({ state: 'collision', withReason: 'researcher one' })
  })

  it('dry-run is the default — the plan shapes batches, the files keep their bytes', () => {
    const r = applyScalpel([op('src/one.ts', 'export const a = 1', 'export const a = 10')], { cwd: tmp })
    expect(r.batches[0]!.verified).toBe(false)
    expect(readFileSync(join(tmp, 'src', 'one.ts'), 'utf8')).toContain('export const a = 1\n')
  })

  it('apply cuts, verify gates, and a red batch rolls back to the byte', () => {
    const good = applyScalpel([op('src/one.ts', 'export const a = 1', 'export const a = 10')], {
      cwd: tmp,
      apply: true,
      verify: () => true,
    })
    expect(good.complete).toBe(true)
    expect(readFileSync(join(tmp, 'src', 'one.ts'), 'utf8')).toContain('a = 10')

    seed()
    const bad = applyScalpel([op('src/one.ts', 'export const a = 1', 'export const a = 10')], {
      cwd: tmp,
      apply: true,
      verify: () => false,
    })
    expect(bad.complete).toBe(false)
    expect(bad.batches[0]!.verified).toBe(false)
    expect(readFileSync(join(tmp, 'src', 'one.ts'), 'utf8')).toContain('export const a = 1\n')
  })

  it('thousands batch in ≤30-file cuts, sequentially — batch count is the ceiling of files/30', () => {
    for (let i = 0; i < 65; i++) writeFileSync(join(tmp, 'src', `f${i}.ts`), `export const v${i} = ${i}\n`)
    const ops = Array.from({ length: 65 }, (_, i) =>
      op(`src/f${i}.ts`, `export const v${i} = ${i}`, `export const v${i} = ${i + 1}`),
    )
    const r = applyScalpel(ops, { cwd: tmp, apply: true, verify: () => true })
    expect(r.batches.length).toBe(3)
    expect(r.complete).toBe(true)
    expect(readFileSync(join(tmp, 'src', 'f64.ts'), 'utf8')).toContain('= 65')
  })
})
