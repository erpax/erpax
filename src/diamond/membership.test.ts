import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { diamondMembershipViolations, diamondMembershipOk } from '@/diamond/membership'

describe('diamond/membership — stray matter blocks seal', () => {
  // BOUNDED-WITNESS: prove the DETECTOR on a hermetic fixture, not a live atom — a live
  // "known-dirty" atom (skill/router) is a moving target: the corpus cleans it and the test
  // rots. Here we plant stray matter in a temp tree and assert the detector catches it.
  const root = mkdtempSync(join(tmpdir(), 'erpax-membership-'))
  const atom = 'strayatom'
  const dir = join(root, 'src', atom)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'SKILL.md'), '# strayatom\n')
  writeFileSync(join(dir, 'index.ts'), 'export const x = 1\n')
  writeFileSync(join(dir, 'test.ts'), 'export {}\n')
  writeFileSync(join(dir, '.stray'), 'x') // a stray dotfile — unaddressable matter
  afterAll(() => rmSync(root, { recursive: true, force: true }))

  it('detects stray matter (a dotfile) in an atom', () => {
    const v = diamondMembershipViolations(atom, root)
    expect(v.length).toBeGreaterThan(0)
    expect(v.some((x) => x.reason === 'stray-dotfile')).toBe(true)
    expect(diamondMembershipOk(atom, root)).toBe(false)
  })

  it('law/folder is membership-pure (live)', () => {
    expect(diamondMembershipOk('law/folder')).toBe(true)
  })
})
