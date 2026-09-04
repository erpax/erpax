import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { atomAddress } from '@/atom/address'
import { kernelPath } from '@/proof/accepted'
import {
  assertNoUnproven,
  axiomRegister,
  declaredAxioms,
  foreignAxioms,
  formatRegister,
  standardRegister,
  theoremNames,
  unprovenTheorems,
} from '.'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-reg-'))
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}
const has = kernelPath() !== null

describe('proof/register', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('proof/register')
  })

  it('reads theorem names WITH their namespace, as the kernel knows them', () => {
    const root = tree({ 'a/A.lean': 'namespace Foo\ntheorem t : True := trivial\nlemma u : True := trivial\nend Foo\n' })
    expect(theoremNames(join(root, 'src/a/A.lean'))).toEqual(['Foo.t', 'Foo.u'])
  })

  it('reads DECLARED axioms separately from proved theorems', () => {
    const root = tree({ 'a/A.lean': 'namespace Foo\naxiom assumed : True\ntheorem t : True := trivial\nend Foo\n' })
    expect(declaredAxioms(join(root, 'src/a/A.lean'))).toEqual(['Foo.assumed'])
    expect(theoremNames(join(root, 'src/a/A.lean'))).toEqual(['Foo.t'])
  })

  it.runIf(has)('reports a decide-closed theorem as resting on NOTHING', () => {
    const root = tree({ 'a/A.lean': 'namespace Foo\ntheorem t : (1 : Nat) + 1 = 2 := by decide\nend Foo\n' })
    const r = axiomRegister(root)
    expect(r.theorems).toBe(1)
    expect(r.axiomFree).toBe(1)
    expect(r.entries[0]!.axioms).toEqual([])
  }, 120_000)

  it.runIf(has)('catches sorryAx — a theorem that states a claim and proves nothing', () => {
    // Reached by DEPENDENCY here, where proof/accepted reaches the same declarations by reading
    // compiler warnings. Two instruments; either alone would be a single reading.
    const root = tree({ 'a/A.lean': 'namespace Foo\ntheorem t : (1 : Nat) = 2 := by sorry\nend Foo\n' })
    const r = axiomRegister(root)
    expect(unprovenTheorems(r).map((e) => e.name)).toEqual(['Foo.t'])
    expect(r.axiomFree).toBe(0)
  }, 120_000)

  it.runIf(has)('a file that does not compile is UNASKED, never counted as axiom-free', () => {
    // "The question could not be put" and "the answer was none" are different facts, and only one
    // of them is good news.
    const root = tree({ 'a/A.lean': 'namespace Foo\ntheorem t : (1 : Nat) + 1 = 3 := by decide\nend Foo\n' })
    const r = axiomRegister(root)
    expect(r.unasked).toHaveLength(1)
    expect(r.axiomFree).toBe(0)
    expect(formatRegister(r)).toContain('could not ask')
  }, 120_000)

  it.runIf(has)('a DECLARED axiom used by no theorem is a register entry, not a dependency', () => {
    const root = tree({ 'a/A.lean': 'namespace Foo\naxiom assumed : True\ntheorem t : (1:Nat) = 1 := by decide\nend Foo\n' })
    const r = axiomRegister(root)
    expect(r.declared).toEqual(['Foo.assumed'])
    expect(r.byAxiom.has('Foo.assumed')).toBe(false)
    expect(formatRegister(r)).toContain('used by NO theorem')
  }, 120_000)

  it('REFUSES to build with no kernel — an index of guesses is worse than none', () => {
    if (has) expect(() => assertNoUnproven(tree({}), 0)).not.toThrow()
    else expect(() => assertNoUnproven(tree({}), 0)).toThrow(/cannot be built, so it must not pass/)
  })

  it('classifies a cited standard as ASSUMED until a gate discharges it', () => {
    const root = tree({
      'a/index.ts': 'export function assertThing(): void {}\n',
      'b/index.ts': 'export const x = 1\n',
    })
    const reg = standardRegister(
      [
        { atomPath: 'a', standards: ['ISO 19011:2018 §6.4 — audit evidence'] },
        { atomPath: 'b', standards: ['WCAG 2.2 §1.3.1 — info and relationships'] },
      ],
      root,
    )
    const iso = reg.find((r) => r.standard === 'ISO 19011:2018')!
    const wcag = reg.find((r) => r.standard === 'WCAG 2.2')!
    expect(iso.dischargedBy).toEqual(['a'])
    expect(wcag.dischargedBy).toEqual([]) // cited, enforced by nothing — an axiom
  })

  it('folds sections into one standard — §5.4 and §5.5 are the same document', () => {
    const root = tree({ 'a/index.ts': 'export const x = 1\n' })
    const reg = standardRegister(
      [{ atomPath: 'a', standards: ['ISO/IEC 25010:2023 §5.4 — security', 'ISO/IEC 25010:2023 §5.5 — testability'] }],
      root,
    )
    expect(reg).toHaveLength(1)
    expect(reg[0]!.standard).toBe('ISO/IEC 25010:2023')
  })

  it.runIf(has)('this corpus imports no foreign axiom', () => {
    // Anything neither declared here nor shipped by Lean arrived from somewhere, and should be named.
    expect(foreignAxioms(axiomRegister(process.cwd()))).toEqual([])
  }, 300_000)
})
