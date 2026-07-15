import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expandRegenScopes } from './regen'
import { corpusFoldRoot, readCorpusFoldReceipt, sealCorpusFold, atomBasisScan, foldPlan, standardsDimensions } from './compute'

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

describe('readme — fold plan (safe foldable families)', () => {
  it('finds ≥2-member enum and compound families, ignores singletons and referenced', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-fold-'))
    const atom = (name: string, skill = `# ${name}`) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), skill)
    }
    try {
      // parents + components
      atom('rate'); atom('it'); atom('social'); atom('sport')
      // enum family: rate10, rate25 (rate ⊕ code)
      atom('rate10'); atom('rate25')
      // compound family: itsocial, itsport (it ⊕ atom)
      atom('itsocial'); atom('itsport')
      // singleton (only one member) — not a family
      atom('rate99')  // rate ⊕ 99 but rate already has 10,25 → joins rate enum (3 members)
      const fams = foldPlan(cwd)
      const rate = fams.find((f) => f.parent === 'rate')
      const it = fams.find((f) => f.parent === 'it')
      expect(rate?.kind).toBe('enum')
      expect(rate?.members.length).toBe(3) // rate10, rate25, rate99
      expect(it?.kind).toBe('compound')
      expect([...(it?.members ?? [])].sort()).toEqual(['itsocial', 'itsport'])
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('readme — 7-dimensional standards invariant', () => {
  it('buckets atoms by horo ray and flags off-ring + the met-in-all invariant', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-7dim-'))
    const atom = (name: string, horo: number | null, std?: string) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      const fm = horo === null ? '' : `\nhoro: ${horo}`
      const body = std ? `\n@standard ${std}` : ''
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), `---\nname: ${name}${fm}\n---\n# ${name}${body}`)
    }
    try {
      atom('a', 1, 'ISO-9001')      // base, has standard
      atom('b', 2)                   // share, no standard
      atom('c', 3)                   // off-ring (axis 3)
      atom('d', null)                // off-ring (no horo)
      const sd = standardsDimensions(cwd)
      expect(sd.offRing).toBe(2)     // c (axis 3 not in ring map) + d (no horo)
      expect(sd.dimensions.find((x) => x.ray === 'base')?.withStandard).toBe(1)
      expect(sd.dimensions.find((x) => x.ray === 'share')?.withStandard).toBe(0)
      expect(sd.metInAll).toBe(false) // only base has a standard
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
