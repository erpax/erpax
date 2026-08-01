import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { derivedCliFaces, descriptionOf, hasCliFace, mergeDerivedFaces } from './index'

const cwd = process.cwd()

describe('cli/face — the command surface, derived', () => {
  it('a guard in CODE is a face', () => {
    expect(hasCliFace('a.ts', 'if (import.meta.url === `file://${process.argv[1]}`) { run() }')).toBe(true)
  })

  it('a guard in a COMMENT or a STRING is not — the grammar decides, never a match', () => {
    // this is the exact false-positive class rules/confine was built on: a regex flagged a
    // docstring describing the code it replaced
    expect(hasCliFace('b.ts', '/* if (import.meta.url === x) run() */ export const a = 1')).toBe(false)
    expect(hasCliFace('c.ts', 'export const s = "if (import.meta.url === y)"')).toBe(false)
    expect(hasCliFace('d.ts', 'export const t = `if (import.meta.url === z)`')).toBe(false)
  })

  it('a module with no guard at all is not a face', () => {
    expect(hasCliFace('e.ts', 'export function f(): number { return 1 }')).toBe(false)
  })

  it('THE MEASUREMENT: the tree already holds hundreds of commands', () => {
    const faces = derivedCliFaces(cwd)
    // the argument for deriving: hand-registration had found a handful of these
    expect(faces.length).toBeGreaterThan(200)
    for (const f of faces) {
      expect(f.file.endsWith('/index.ts')).toBe(true)
      expect(f.atomPath.length).toBeGreaterThan(0)
      expect(f.file).toContain(f.atomPath)
    }
    // stable ordering — an unstable listing is a diff nobody can read
    expect([...faces].map((f) => f.atomPath)).toEqual([...faces].map((f) => f.atomPath).sort((a, b) => a.localeCompare(b)))
  })

  it('the help line comes from the atom OWN SKILL.md — nothing typed twice', () => {
    const desc = descriptionOf(`${cwd}/src/inertia`)
    expect(desc.length).toBeGreaterThan(10)
    expect(desc.length).toBeLessThanOrEqual(140)
    expect(descriptionOf(`${cwd}/src/no-such-atom`)).toBe('') // absent is empty, never a throw
  })

  it('EXPLICIT beats implicit — derivation never overwrites a hand-written entry', () => {
    const hand = { readme: { desc: 'hand-written' } }
    const merged = mergeDerivedFaces(hand, [{ atomPath: 'readme', file: 'src/readme/index.ts', desc: 'derived' }], (f) => ({ desc: f.desc }))
    expect(merged.readme!.desc).toBe('hand-written')
    // and a gap IS filled
    const filled = mergeDerivedFaces(hand, [{ atomPath: 'inertia', file: 'src/inertia/index.ts', desc: 'derived' }], (f) => ({ desc: f.desc }))
    expect(filled.inertia!.desc).toBe('derived')
  })
})

describe('cli/face — judged by the constitution', () => {
  const change: Change = {
    atom: 'cli/face',
    dualities: [
      { builds: 'hasCliFace', breaks: 'a guard in a comment or a string is not a face' },
      { builds: 'derivedCliFaces', breaks: 'only index.ts, only under src, stable order' },
      { builds: 'mergeDerivedFaces', breaks: 'an explicit entry is never overwritten' },
    ],
    anchors: ['ISO/IEC 25010:2023 §5.6.2', 'ISO-19011:2018 §6.4'],
    claims: [
      {
        text: 'every atom is now reachable as a command',
        boundary:
          'every atom that CARRIES A CLI GUARD is reachable — an atom with no guard is still a ' +
          'library and this does not give it a face. It proves the guard is present, never that ' +
          'running the atom does anything useful',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'explicit⊕derived', ring: [1, 1] },
    ],
    served: [{ result: 'the command surface', recompute: 'src/cli/face/index.ts' }],
    postings: [
      { debit: 'atom/guard', credit: 'cli/command', amount: 1 },
      { debit: 'cli/command', credit: 'atom/guard', amount: 1 },
    ],
    edges: [
      { from: 'face', to: 'registry' },
      { from: 'registry', to: 'face' },
    ],
    quantities: [{ name: 'atoms carrying a CLI guard', value: derivedCliFaces(cwd).length, derivation: 'src/cli/face/index.ts' }],
    keepers: [],
    seed: ['src/cli/face/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
