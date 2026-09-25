import { describe, it, expect } from 'vitest'
import { existsSync, mkdtempSync, mkdirSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { reachedByImport, reachedFrom, shippedAtoms, unreachedAtoms, unreachedStrict } from './index'

describe('rules/unreached — the doors', () => {
  it('reachedFrom walks imports transitively and names every ancestor path', () => {
    const reached = reachedFrom(['src/rules/index.ts'], process.cwd())
    expect(reached.size).toBeGreaterThan(100)
    expect(reached.has('rules')).toBe(true)
  })

  it('an entry that does not exist contributes nothing rather than throwing', () => {
    expect(reachedFrom(['src/no/such/entry.ts'], process.cwd()).size).toBe(0)
  })

  // The one door left that reads BUILD OUTPUT. `shippedAtoms` reads `packages/*/dist/types`, gitignored;
  // where nothing is built the set is empty. That errs toward CHARGING a shipped atom, never toward
  // hiding one — a false positive a reader sees, not a green that cannot fire.
  it('shippedAtoms reads the published package trees, when they are built', () => {
    const n = shippedAtoms(process.cwd()).size
    if (!existsSync(join(process.cwd(), 'packages'))) {
      expect(n).toBe(0)
      return
    }
    const built = readdirSync(join(process.cwd(), 'packages'), { withFileTypes: true }).some(
      (d) => d.isDirectory() && existsSync(join(process.cwd(), 'packages', d.name, 'dist', 'types')),
    )
    if (!built) {
      expect(n).toBe(0) // nothing built ⇒ nothing shipped; stated, not skipped
      return
    }
    // `> 10` was a magic number from a FULLY built local tree, and a partially built one answers 5
    // — correctly. The refutable claim is that a built package tree yields atoms at all; pinning the
    // magnitude pins how much of the workspace happened to be built, which is not a property of this
    // reader.
    expect(n).toBeGreaterThan(0)
  })
})

/**
 * Facts about THIS corpus — and now they hold in any checkout. The deployment door used to parse
 * each atom's gitignored LLM.md, so a clean clone read "no claim" for every atom, the list was empty,
 * and the axis counted 0 in CI by construction. The face is computed now, so these assert membership
 * unconditionally.
 */
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
    expect(live.map((a) => a.atomPath)).toContain('admin/ui/cells')
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

/** Plant an atom: SKILL.md + index.ts, and optionally a (derived, gitignored) LLM.md face. */
const plant = (root: string, path: string, index: string, llm?: string): void => {
  mkdirSync(join(root, 'src', path), { recursive: true })
  writeFileSync(join(root, 'src', path, 'SKILL.md'), `# ${path}\n`)
  writeFileSync(join(root, 'src', path, 'index.ts'), index)
  if (llm !== undefined) writeFileSync(join(root, 'src', path, 'LLM.md'), `faces worker·plugin·pwa ${llm}\n`)
}

const inFixture = (build: (root: string) => void, check: (charged: string[]) => void): void => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
  try {
    build(root)
    check(unreachedAtoms(root).map((a) => a.atomPath))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

describe('rules/unreached — a fixture with no packages and no gate', () => {
  it('names an atom with code that nothing imports', () => {
    inFixture(
      (root) => plant(root, 'lonely', 'export const x = 1\n'),
      (charged) => expect(charged).toContain('lonely'),
    )
  })

  // `cloudflare/…` is a worker face by `deploymentFaces`' own path rule — a real input, not a label.
  it('does NOT name an atom that carries a deployment face', () => {
    inFixture(
      (root) => plant(root, 'cloudflare/lonely', 'export const x = 1\n'),
      (charged) => expect(charged).not.toContain('cloudflare/lonely'),
    )
  })

  // The regression. A derived LLM.md is present on a working tree and absent in CI; it must not
  // decide the verdict in either direction, or the axis answers differently per machine.
  it('a planted LLM.md face decides nothing — the face is computed, never read', () => {
    inFixture(
      (root) => {
        plant(root, 'lonely', 'export const x = 1\n', '`1`·`0`·`0`')
        plant(root, 'cloudflare/worker', 'export const y = 1\n', '`0`·`0`·`0`')
      },
      (charged) => {
        expect(charged).toContain('lonely')
        expect(charged).not.toContain('cloudflare/worker')
      },
    )
  })

  // The door was checked per-atom and never PROPAGATED: an atom whose only door is "a deployed
  // atom imports it" was charged as unreached. Both halves are planted here — the importer carries
  // a face and passes, and the imported atom has none and must pass THROUGH it.
  it('an atom a deployed atom imports is reached, and one nothing imports is still charged', () => {
    inFixture(
      (root) => {
        plant(root, 'cloudflare/shipped', "export { helper } from '@/helper'\n")
        plant(root, 'helper', 'export const helper = 1\n')
        plant(root, 'orphan', 'export const orphan = 1\n')
      },
      (charged) => {
        expect(charged).not.toContain('helper')
        expect(charged).toContain('orphan')
      },
    )
  })
})

describe('reachedByImport — a root is not its own door', () => {
  it('reaches what an entry IMPORTS, and not the entry itself', () => {
    // src/teller/index.ts imports @/float and @/currency and nothing imports teller from here.
    const reached = reachedByImport(['src/teller/index.ts'])
    expect(reached.has('float')).toBe(true)
    expect(reached.has('currency')).toBe(true)
    // THE FAIL-OPEN: the looser walk counts the root itself, so an atom is reached by being itself.
    expect(reached.has('teller')).toBe(false)
    expect(reachedFrom(['src/teller/index.ts']).has('teller')).toBe(true)
  })

  it('reports nothing for an entry that does not exist, rather than everything', () => {
    expect(reachedByImport(['src/nowhere/index.ts']).size).toBe(0)
  })
})

describe('unreachedStrict — the census with the self-door shut', () => {
  it('finds strictly more than the looser census, because the face exempted everything', () => {
    const loose = unreachedAtoms().length
    const strict = unreachedStrict().length
    expect(strict).toBeGreaterThan(loose)
  })

  it('names atoms that nothing imports, even though they carry a deployment face', () => {
    // `kyc` was the original instance: minted 2026-09-20 with a face and no importer, which the
    // looser census called reached. It is now imported by agents/mcp/tool/kyc, so the tree IMPROVED
    // and an assertion pinned to that one name went red for the right reason. The claim was never
    // about kyc — it is that the strict census is a PROPER superset of the loose one, which is what
    // "shut the self-door" means. rules/drift, for a set instead of a number: state the invariant.
    const strict = new Set(unreachedStrict().map((a) => a.atomPath))
    const loose = new Set(unreachedAtoms().map((a) => a.atomPath))
    const strictOnly = [...strict].filter((p) => !loose.has(p))
    expect(strictOnly.length).toBeGreaterThan(0)
    for (const p of loose) expect(strict.has(p), `${p} is loose-unreached but not strict`).toBe(true)
  })

  it('does not name an atom that a sibling genuinely imports', () => {
    const strict = new Set(unreachedStrict().map((a) => a.atomPath))
    expect(strict.has('float')).toBe(false)
  })
})
