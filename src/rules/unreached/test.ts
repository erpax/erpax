import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { reachedFrom, shippedAtoms, unreachedAtoms } from './index'

describe('rules/unreached — the doors', () => {
  it('reachedFrom walks imports transitively and names every ancestor path', () => {
    const reached = reachedFrom(['src/rules/index.ts'], process.cwd())
    expect(reached.size).toBeGreaterThan(100)
    expect(reached.has('rules')).toBe(true)
  })

  it('an entry that does not exist contributes nothing rather than throwing', () => {
    expect(reachedFrom(['src/no/such/entry.ts'], process.cwd()).size).toBe(0)
  })

  it('shippedAtoms reads the published package trees', () => {
    expect(shippedAtoms(process.cwd()).size).toBeGreaterThan(10)
  })
})

describe('rules/unreached — the live corpus', () => {
  const live = unreachedAtoms(process.cwd())

  it('names atoms that survived every door, with a reason a reader need not re-derive', () => {
    expect(live.length).toBeGreaterThan(0)
    for (const a of live.slice(0, 20)) expect(a.reason).toContain('not shipped')
  })

  // admin/ui/fields IS in the generated importMap, so Payload reaches it by path string. It must not
  // be named here — and the three siblings nothing names must be. That pair is the whole boundary:
  // the walk is lexical, so a dynamic reference is invisible to it, and this is where that shows.
  it('does not name an atom the generated importMap reaches', () => {
    expect(live.map((a) => a.atomPath)).not.toContain('admin/ui/fields')
  })

  it('does name the admin components nothing references', () => {
    const paths = live.map((a) => a.atomPath)
    expect(paths).toContain('admin/ui/cells')
  })

  it('never names a vocabulary word — its barrel exists only to name the word', () => {
    const paths = new Set(live.map((a) => a.atomPath))
    for (const word of ['abdomen', 'abstract', 'acceptance']) expect(paths.has(word)).toBe(false)
  })

  it('is sorted, so two runs are comparable line for line', () => {
    const paths = live.map((a) => a.atomPath)
    expect([...paths].sort((x, y) => x.localeCompare(y))).toEqual(paths)
  })
})

describe('rules/unreached — a fixture with no packages and no gate', () => {
  it('names an atom with code that nothing imports', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
    try {
      mkdirSync(join(root, 'src', 'lonely'), { recursive: true })
      writeFileSync(join(root, 'src', 'lonely', 'SKILL.md'), '# lonely\n')
      writeFileSync(join(root, 'src', 'lonely', 'index.ts'), 'export const x = 1\n')
      writeFileSync(join(root, 'src', 'lonely', 'LLM.md'), 'faces worker·plugin·pwa `0`·`0`·`0`\n')
      expect(unreachedAtoms(root).map((a) => a.atomPath)).toContain('lonely')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('does NOT name it once its LLM face reports a deployment face', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
    try {
      mkdirSync(join(root, 'src', 'lonely'), { recursive: true })
      writeFileSync(join(root, 'src', 'lonely', 'SKILL.md'), '# lonely\n')
      writeFileSync(join(root, 'src', 'lonely', 'index.ts'), 'export const x = 1\n')
      writeFileSync(join(root, 'src', 'lonely', 'LLM.md'), 'faces worker·plugin·pwa `1`·`0`·`0`\n')
      expect(unreachedAtoms(root).map((a) => a.atomPath)).not.toContain('lonely')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  // Absence of evidence is not evidence: an atom with no computed face makes no claim, so it is not
  // charged on the strength of a file that was never generated.
  it('does not charge an atom whose face was never computed', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
    try {
      mkdirSync(join(root, 'src', 'lonely'), { recursive: true })
      writeFileSync(join(root, 'src', 'lonely', 'SKILL.md'), '# lonely\n')
      writeFileSync(join(root, 'src', 'lonely', 'index.ts'), 'export const x = 1\n')
      expect(unreachedAtoms(root).map((a) => a.atomPath)).not.toContain('lonely')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  // The door was checked per-atom and never PROPAGATED: an atom whose only door is "a deployed
  // atom imports it" was charged as unreached. Both halves are planted here — the importer carries
  // a face and passes, and the imported atom carries a 0·0·0 face and must pass THROUGH it.
  it('an atom a deployed atom imports is reached, and one nothing imports is still charged', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
    try {
      mkdirSync(join(root, 'src', 'shipped'), { recursive: true })
      writeFileSync(join(root, 'src', 'shipped', 'SKILL.md'), '# shipped\n')
      writeFileSync(join(root, 'src', 'shipped', 'index.ts'), "export { helper } from '@/helper'\n")
      writeFileSync(join(root, 'src', 'shipped', 'LLM.md'), 'faces worker·plugin·pwa `1`·`0`·`0`\n')

      mkdirSync(join(root, 'src', 'helper'), { recursive: true })
      writeFileSync(join(root, 'src', 'helper', 'SKILL.md'), '# helper\n')
      writeFileSync(join(root, 'src', 'helper', 'index.ts'), 'export const helper = 1\n')
      writeFileSync(join(root, 'src', 'helper', 'LLM.md'), 'faces worker·plugin·pwa `0`·`0`·`0`\n')

      mkdirSync(join(root, 'src', 'orphan'), { recursive: true })
      writeFileSync(join(root, 'src', 'orphan', 'SKILL.md'), '# orphan\n')
      writeFileSync(join(root, 'src', 'orphan', 'index.ts'), 'export const orphan = 1\n')
      writeFileSync(join(root, 'src', 'orphan', 'LLM.md'), 'faces worker·plugin·pwa `0`·`0`·`0`\n')

      const charged = unreachedAtoms(root).map((a) => a.atomPath)
      expect(charged).not.toContain('helper')
      expect(charged).toContain('orphan')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
