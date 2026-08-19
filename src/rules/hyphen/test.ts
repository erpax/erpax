import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { viableRenames, resolveSpec, renameManifest, danglingSpecifiers, codeFiles } from './index'
import { planScalpel } from '@/scalpel'

/**
 * Hermetic: every claim is proven on a temp tree, never on the live corpus, which
 * this atom exists to CHANGE — a test pinned to today's violation count would rot
 * on the first batch it drives.
 */
const root = mkdtempSync(join(tmpdir(), 'erpax-hyphen-'))
const write = (rel: string, body: string) => {
  const p = join(root, 'src', rel)
  mkdirSync(join(p, '..'), { recursive: true })
  writeFileSync(p, body)
}
afterAll(() => rmSync(root, { recursive: true, force: true }))

write('ai/ai-security.ts', 'export const guard = 1\n')
write('ai/anomaly.ts', "import { guard } from './ai-security'\nexport const a = guard\n")
write('ai/cost-policy.ts', 'export const p = 1\n')          // two words survive → NOT viable
write('ai/plain.ts', 'export const q = 1\n')
write('ai/taken-ai.ts', 'export const t = 1\n')             // target ai/taken.ts is free
write('deep/one/two/two-thing.ts', 'export const z = 1\n')  // 'two' is said by the path

describe('rules/hyphen — the rename the PATH justifies', () => {
  const renames = viableRenames(root)
  const from = (f: string) => renames.find((r) => r.from === `src/${f}`)

  it('drops a word the path already says', () => {
    expect(from('ai/ai-security.ts')?.to).toBe('src/ai/security.ts')
    expect(from('deep/one/two/two-thing.ts')?.to).toBe('src/deep/one/two/thing.ts')
  })

  it('REFUSES when more than one word survives — that is a nesting judgement', () => {
    // `cost-policy` says neither "cost" nor "policy" anywhere in its path, so there is
    // no redundant word to drop and no mechanical answer. A human names the atom.
    expect(from('ai/cost-policy.ts')).toBeUndefined()
  })

  it('leaves an already-lawful stem alone', () => {
    expect(from('ai/plain.ts')).toBeUndefined()
  })

  it('never proposes a target that already exists', () => {
    write('ai/taken.ts', 'export const taken = 1\n')
    expect(viableRenames(root).find((r) => r.from === 'src/ai/taken-ai.ts')).toBeUndefined()
    rmSync(join(root, 'src/ai/taken.ts'))
  })
})

describe('rules/hyphen — specifiers are resolved, not guessed', () => {
  it('resolves relative and alias forms to the same file', () => {
    expect(resolveSpec('src/ai/anomaly.ts', './ai-security', root)).toBe('src/ai/ai-security.ts')
    expect(resolveSpec('src/deep/one/two/two-thing.ts', '@/ai/ai-security', root)).toBe('src/ai/ai-security.ts')
  })

  it('returns undefined for a package import — not our graph', () => {
    expect(resolveSpec('src/ai/anomaly.ts', 'payload', root)).toBeUndefined()
  })

  it('sees every code file under src', () => {
    expect(codeFiles(root).length).toBeGreaterThan(4)
  })
})

describe('rules/hyphen — the manifest is cuttable', () => {
  it('emits an op for each importer, and the scalpel accepts it', () => {
    const ops = renameManifest(viableRenames(root), root)
    expect(ops.some((o) => o.file === 'src/ai/anomaly.ts')).toBe(true)
    const plan = planScalpel(ops, root)
    expect(plan.refused, JSON.stringify(plan.verdicts.filter((v) => v.state !== 'cuts'))).toBe(0)
  })

  it('every op carries a reason — the scalpel refuses a reasonless cut', () => {
    for (const op of renameManifest(viableRenames(root), root)) expect(op.reason.trim().length).toBeGreaterThan(0)
  })

  it('anchors on the LINE, so an import and a re-export of the same module both cut', () => {
    // The bare specifier would match twice here and the scalpel would refuse it.
    write('ai/barrel.ts', "import { guard } from './ai-security'\nexport * from './ai-security'\n")
    const ops = renameManifest(viableRenames(root), root).filter((o) => o.file === 'src/ai/barrel.ts')
    expect(ops).toHaveLength(2)
    expect(planScalpel(ops, root).refused).toBe(0)
    rmSync(join(root, 'src/ai/barrel.ts'))
  })
})

describe('rules/hyphen — the ring', () => {
  it('is quiet on a consistent tree', () => {
    expect(danglingSpecifiers(root)).toEqual([])
  })

  it('CATCHES a specifier left pointing at a moved file — the whole point', () => {
    write('ai/orphan.ts', "import { gone } from './not-here'\nexport const o = gone\n")
    expect(danglingSpecifiers(root).some((d) => d.includes('not-here'))).toBe(true)
    rmSync(join(root, 'src/ai/orphan.ts'))
  })
})
