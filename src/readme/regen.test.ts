import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expandRegenScopes } from './regen'
import { corpusFoldRoot, readCorpusFoldReceipt, sealCorpusFold, atomBasisScan } from './compute'

describe('readme/regen — focused face regen', () => {
  it('expands a known atom scope', () => {
    const paths = expandRegenScopes(['readme'])
    expect(paths).toContain('readme')
  })
})

describe('readme — corpus quantum fold (content IS the key)', () => {
  const scratch = (): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-fold-'))
    mkdirSync(join(cwd, 'src', 'atom'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const one = 1\n')
    return cwd
  }

  it('same tree ⇒ same root · changed input ⇒ different key', () => {
    const cwd = scratch()
    try {
      const a = corpusFoldRoot(cwd)
      expect(corpusFoldRoot(cwd)).toBe(a)
      writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const one = 2\n')
      expect(corpusFoldRoot(cwd)).not.toBe(a)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('seal → read round-trips · absent receipt is null', () => {
    const cwd = scratch()
    try {
      expect(readCorpusFoldReceipt(cwd)).toBeNull()
      const root = corpusFoldRoot(cwd)
      sealCorpusFold(root, 1, cwd)
      expect(readCorpusFoldReceipt(cwd)?.root).toBe(root)
      expect(readCorpusFoldReceipt(cwd)?.faces).toBe(1)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('readme — atom basis scan (generators vs rosetta combinations)', () => {
  it('classifies vocab-only, barrel, compose, and own-logic atoms', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-basis-'))
    const atom = (name: string, index?: string) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), `# ${name}`)
      if (index !== undefined) writeFileSync(join(cwd, 'src', name, 'index.ts'), index)
    }
    try {
      atom('prose')                                            // vocab-only (no index) — combination
      atom('barrel', `export { x } from './child'\n`)          // barrel — combination
      atom('wire', `import { a } from '@/a'\nconsole.log(a)\n`)   // compose-no-logic (no own def) — combination
      atom('gen', `export function real(n: number) { return n * 2 }\n`) // own logic — basis
      const b = atomBasisScan(cwd)
      expect(b.atoms).toBe(4)
      expect(b.basis).toBe(1)
      expect(b.combinations).toBe(3)
      expect(b.vocabOnly).toBe(1)
      expect(b.barrelOnly).toBe(1)
      expect(b.combinationShare).toBeCloseTo(0.75)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
