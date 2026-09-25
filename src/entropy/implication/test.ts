import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { bareImplications, statesBareImplication } from './index'

describe('entropy/implication — no sentence may assert what law computes as false', () => {
  // (b) DOC-HONESTY invariant, now CORPUS-WIDE.
  // This block held its own copy of the implication/qualifier regexes and a DOCS list of
  // THREE files — entropy/SKILL.md, entropy/index.ts, law/SKILL.md — while 28 files carried
  // the claim. rules/domain's law inside the gate written for it: a law reaches exactly the
  // files its checker opens, and on the other 25 it was silent, which reads as green.
  // The predicate now lives once in ./index.ts and the walk covers every hand-maintained
  // .md/.ts under src. Zero is a theorem, not a ratchet.
  it('no sentence in the corpus asserts the bare implication', () => {
    const bare = bareImplications(process.cwd())
    expect(bare, bare.map((b) => `${b.file}\n    ${b.sentence}`).join('\n')).toEqual([])
  })

  it('in CODE, prose means COMMENTS — a claim in a string literal is data', () => {
    const root = mkdtempSync(join(tmpdir(), 'bare-'))
    mkdirSync(join(root, 'src', 'a'), { recursive: true })
    // planted in a COMMENT: the corpus asserting it
    writeFileSync(join(root, 'src', 'a', 'index.ts'), '/** zero entropy ⇒ infinite tamper-cost. */\nexport const x = 1\n')
    expect(bareImplications(root).map((b) => b.file)).toEqual([join('src', 'a', 'index.ts')])
    // planted in a STRING LITERAL: a fixture handing the predicate a claim to prove the gate fires.
    // website/marketing/test.ts does exactly this, and the scan flagged the consumer of this law.
    writeFileSync(join(root, 'src', 'a', 'index.ts'), "export const body = 'zero entropy ⇒ infinite tamper-cost'\n")
    expect(bareImplications(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })

  it('a slogan in quotes is CITED, not asserted — the refutation must not read as the defect', () => {
    expect(statesBareImplication('The claim *"zero entropy ⇒ infinite tamper-cost"* is what this refutes')).toBe(false)
    expect(statesBareImplication('zero entropy ⇒ infinite tamper-cost')).toBe(true)
  })

  it('sees through wikilinks — the form that kept the count at a false ZERO', () => {
    // diamond/SKILL.md asserted it in its Law line and the gate read 0: `zero[\s-]*entropy`
    // cannot match `zero [[entropy]]`. A widening is proved by the defect it now catches.
    expect(statesBareImplication('zero [[entropy]] ⇒ infinite tamper-[[cost]]')).toBe(true)
    expect(statesBareImplication('zero-[[entropy]] core with ∞ tamper-cost')).toBe(true)
    expect(statesBareImplication('Zero [[entropy]] ⇒ infinite [[mass]] ⇒ infinite tamper-cost')).toBe(true)
    // a piped wikilink must not hide it either
    expect(statesBareImplication('zero [[entropy|reciprocity]] ⇒ ∞ tamper-[[cost]]')).toBe(true)
  })


  it('a word swap is not a healing — the premise must become coverage', () => {
    // `entropy ⇒ unbounded tamper-cost` dodges the regex while asserting the same thing;
    // the manifest that healed 32 sites refused exactly this on five of them.
    expect(statesBareImplication('coverage = 1 ⇒ unbounded tamper-cost')).toBe(false)
    expect(statesBareImplication('zero entropy ⇒ ∞ mass')).toBe(true)
  })
})
