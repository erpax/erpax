import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { atomAddress } from '@/atom/address'
import { assertProofsAccepted, kernelPath, kernelVerdict, leanFiles, unacceptedProofs } from '.'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-proof-'))
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}

const has = kernelPath() !== null

describe('proof/accepted', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('proof/accepted')
  })

  it('finds every .lean under src', () => {
    const root = tree({ 'a/A.lean': 'def x := 1\n', 'b/c/B.lean': 'def y := 2\n', 'a/index.ts': '' })
    expect(leanFiles(root)).toHaveLength(2)
  })

  it.runIf(has)('accepts a theorem the kernel closes', () => {
    const root = tree({ 'a/Ok.lean': 'theorem t : (1 : Nat) + 1 = 2 := by decide\n' })
    const v = kernelVerdict(join(root, 'src/a/Ok.lean'), root)
    expect(v.accepted).toBe(true)
    expect(v.sorries).toBe(0)
    expect(unacceptedProofs(root)).toEqual([])
  })

  it.runIf(has)('flags a file the kernel REJECTS, and says why', () => {
    const root = tree({ 'a/Bad.lean': 'theorem t : (1 : Nat) + 1 = 3 := by decide\n' })
    const [v] = unacceptedProofs(root)
    expect(v!.accepted).toBe(false)
    expect(v!.error).toContain('error')
  })

  it.runIf(has)('flags a file ACCEPTED WITH sorry — the case most likely to read as success', () => {
    // The kernel compiles it and tells you the declaration is unproven. A gate reading only the
    // exit code calls that a pass.
    const root = tree({ 'a/S.lean': 'theorem t : (1 : Nat) + 1 = 2 := by sorry\n' })
    const [v] = unacceptedProofs(root)
    expect(v!.accepted).toBe(true)
    expect(v!.sorries).toBe(1)
  })

  it.runIf(has)('counts sorry from the COMPILER, never by grepping the source', () => {
    // A comment saying "no sorry" contains the word — the false positive three sibling repos each
    // paid for separately in one day.
    const root = tree({ 'a/C.lean': '-- this file has no sorry anywhere\ntheorem t : (1:Nat) = 1 := by decide\n' })
    expect(unacceptedProofs(root)).toEqual([])
  })

  it('REFUSES TO PASS when there is no kernel — a verifier-less verification gate is the defect', () => {
    // Not skipped: this is the gate's own failure mode, and it must be checked on every machine.
    // Where a kernel exists the assertion runs for real; where it does not, the refusal is the claim.
    const root = tree({})
    if (has) expect(() => assertProofsAccepted(root, 0)).not.toThrow()
    else expect(() => assertProofsAccepted(root, 0)).toThrow(/cannot run, so it must not pass/)
  })

  it.runIf(has)('fails closed above the ceiling and passes at it', () => {
    const root = tree({ 'a/S.lean': 'theorem t : (1 : Nat) = 1 := by sorry\n' })
    expect(() => assertProofsAccepted(root, 1)).not.toThrow()
    expect(() => assertProofsAccepted(root, 0)).toThrow(/not accept as proof/)
  })

  it.runIf(has)('the corpus is at or under its ceiling', () => {
    expect(unacceptedProofs(process.cwd()).length).toBeLessThanOrEqual(4)
  }, 180_000)
})
