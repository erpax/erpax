import { describe, it, expect } from 'vitest'
import { existsSync, mkdtempSync, mkdirSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { nameDoor, namedBy, referrersOf } from './index'
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

  // admin/ui/fields IS in the generated importMap, so Payload reaches it by path string. Its three
  // siblings are reached the same way — `Cell: '@/admin/ui/cells/…'` in the admin plugin — and this
  // test USED to pin them as "the components nothing references". That was the walk's blind spot
  // certified as a fact: the name door is the sixth door, and nothing a path string reaches is named.
  it('does not name an atom the generated importMap or a component path string reaches', () => {
    const names = nameDoor(process.cwd())
    const paths = live.map((a) => a.atomPath)
    expect(paths).not.toContain('admin/ui/fields')
    for (const p of paths) expect(namedBy(p, names)).toBe(false)
  })

  // The dual asked live: on 2026-10-03 it refuted four leads whose parents passed through a door that
  // did not propagate. Every door propagates now, so the census and its involution must agree on the
  // live tree — a refuted live lead here is a door this walk still does not open.
  it('the involution refutes nothing the census names — no LIVE referrer reaches a charged atom', () => {
    const atoms = live.map((a) => a.atomPath)
    const refs = referrersOf(process.cwd(), atoms)
    expect(refs.filter((r) => r.live)).toEqual([])
    // Dead referrers are allowed and are the finding: a parent's barrel nothing imports carries the
    // lead. `dashboard/nav` ← src/dashboard/index.tsx is the live example on 2026-10-03.
    for (const r of refs) expect(r.via).toBe('import')
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

  // The sixth door, planted. A component reached ONLY by a Payload path string passes; one quoted
  // only in a comment is still charged — a comment is not a string literal, so prose opens nothing.
  it('an atom a path STRING names is reached; an atom a COMMENT names is not', () => {
    inFixture(
      (root) => {
        plant(root, 'plugins/admin', "export const cfg = { Cell: '@/widget/Cell', Field: `@/gauge/Field#named` }\n// see @/ghost/Cell for the old one\n")
        plant(root, 'widget', 'export const Cell = 1\n')
        plant(root, 'gauge', 'export const Field = 1\n')
        plant(root, 'ghost', 'export const Cell = 1\n')
      },
      (charged) => {
        expect(charged).not.toContain('widget')
        expect(charged).not.toContain('gauge')
        expect(charged).toContain('ghost')
      },
    )
  })
})

describe('rules/unreached — an exempt atom is a door, not a wall', () => {
  // The seventh correction, found by the involution: a SHIPPED atom is reached by its consumers, so
  // what its barrel imports is reached too. Before this, `carried` was charged while `shipped` passed.
  it('what a shipped atom imports is reached; an atom nothing shipped reaches is still charged', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
    try {
      mkdirSync(join(root, 'packages', 'core', 'dist', 'types', 'shipped'), { recursive: true })
      plant(root, 'shipped', "export { c } from '@/carried'\n")
      plant(root, 'carried', 'export const c = 1\n')
      plant(root, 'island', 'export const i = 1\n')
      const charged = unreachedAtoms(root).map((a) => a.atomPath)
      expect(charged).not.toContain('shipped')
      expect(charged).not.toContain('carried')
      expect(charged).toContain('island')
      // and from the referrer seat the same fixture refutes nothing the census still charges
      expect(referrersOf(root, charged)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})

describe('referrersOf — the census asked from the referrer seat', () => {
  it('names the file that imports a charged atom from outside the charged set, and the string that names it', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
    try {
      plant(root, 'shipped', "export { x } from '@/lonely'\n")
      plant(root, 'lonely', 'export const x = 1\n')
      plant(root, 'plugins/admin', "export const cfg = { Cell: '@/lonely/Cell' }\n")
      plant(root, 'island', 'export const y = 1\n')
      const refs = referrersOf(root, ['lonely', 'island'])
      expect(refs.map((r) => `${r.atomPath} ← ${r.by} (${r.via}${r.live ? ', live' : ', dead'})`)).toEqual([
        'lonely ← @/lonely/Cell (name, live)',
        'lonely ← src/shipped/index.ts (import, dead)',
      ])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('an importer inside the charged set is not a referrer, and neither is a test', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
    try {
      plant(root, 'a', "export { b } from '@/b'\n")
      plant(root, 'b', 'export const b = 1\n')
      writeFileSync(join(root, 'src', 'b', 'test.ts'), "import { b } from '@/b'\nexport const t = b\n")
      expect(referrersOf(root, ['a', 'b'])).toEqual([])
      // Narrow the excluded set and the same importer becomes a referrer: the door is the set, not the file.
      expect(referrersOf(root, ['b'], new Set())).toEqual([{ atomPath: 'b', by: 'src/a/index.ts', via: 'import', live: false }])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  // Liveness is the forward walk's own file set. A deployed barrel (`cloudflare/…` is a worker face
  // by path) is live and REFUTES; a barrel nothing reaches is dead and only CARRIES the lead.
  it('a referrer is live when the forward walk reaches it, dead when it does not', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-unreached-'))
    try {
      plant(root, 'cloudflare/w', "export { l } from '@/leaf'\n")
      plant(root, 'leaf', 'export const l = 1\n')
      // `deploymentFaces` judges a fixture atom by NAME against the real corpus's worker-reached set
      // (`dead` and `parent` carry a face here for that reason alone), so the dead barrel takes a name
      // the live tree does not use. A pure re-export barrel reads as a face too; it declares a value.
      plant(root, 'barrel', "import { m } from '@/carried'\nexport const dm = m + 1\n")
      plant(root, 'carried', 'export const m = 1\n')
      const refs = referrersOf(root, ['leaf', 'carried'], new Set())
      expect(refs).toEqual([
        { atomPath: 'carried', by: 'src/barrel/index.ts', via: 'import', live: false },
        { atomPath: 'leaf', by: 'src/cloudflare/w/index.ts', via: 'import', live: true },
      ])
      // and the census agrees with the liveness: the live-referred atom is reached, the carried one is charged
      const charged = unreachedAtoms(root).map((a) => a.atomPath)
      expect(charged).not.toContain('leaf')
      expect(charged).toContain('carried')
      expect(charged).toContain('barrel')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
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
  }, 120_000)

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
