import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { describe, it, expect, afterEach } from 'vitest'
import { computedBaseline } from './baseline'
import { userWordUnprovenViolations, proveDiamondOrRevert, phraseWithoutDiamondChangesetGate } from './user-word'

describe('law/folder/user-word', () => {
  let fixtureRoot: string
  afterEach(() => { if (fixtureRoot) rmSync(fixtureRoot, { recursive: true, force: true }) })

  it('detects hyphenated phrase folder', () => {
    fixtureRoot = mkdtempSync(join(tmpdir(), 'uw-'))
    const atom = join(fixtureRoot, 'src', 'quantum', 'fold', 'linear-logic')
    mkdirSync(atom, { recursive: true })
    writeFileSync(join(atom, 'SKILL.md'), '---\nname: linear-logic\n---\n')
    const audit = userWordUnprovenViolations(fixtureRoot)
    expect(audit.violationCount).toBe(1)
    expect(audit.violations[0]?.kind).toBe('phrase-folder')
  })

  it('gate fails SKILL-only changeset', () => {
    fixtureRoot = mkdtempSync(join(tmpdir(), 'uw-g-'))
    const skill = join(fixtureRoot, 'src', 'x', 'SKILL.md')
    mkdirSync(join(fixtureRoot, 'src', 'x'), { recursive: true })
    writeFileSync(skill, '---\nname: x\n---\n')
    expect(phraseWithoutDiamondChangesetGate([skill], fixtureRoot)).toHaveLength(1)
  })

  it('reverts phrase-folder', () => {
    fixtureRoot = mkdtempSync(join(tmpdir(), 'uw-r-'))
    const atom = join(fixtureRoot, 'src', 'vocabulary', 'lead-score')
    mkdirSync(atom, { recursive: true })
    writeFileSync(join(atom, 'SKILL.md'), '---\nname: lead-score\n---\n')
    expect(proveDiamondOrRevert('vocabulary/lead-score', fixtureRoot).action).toBe('reverted')
  })

  it('within ratchet ceiling', () => {
    expect(userWordUnprovenViolations().violationCount).toBeLessThanOrEqual(computedBaseline('phrase-without-diamond'))
  })
})
