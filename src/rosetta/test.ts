import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { folderAgents, rosettaLanes } from './index'

// A hermetic tree of folder-agents. Every folder with an index.ts is an agent; @standard banners are its
// declared incidence; a test.ts beside it is its paid proof.
const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-rosetta-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('rosetta — every folder is an agent, lanes derived from incidence', () => {
  it('reads every folder with an index.ts as an agent, with its declared state', () => {
    const cwd = corpus({
      'src/tamper/index.ts': '/** @standard ISO-27001 tamper-cost */\nexport const t = 1',
      'src/tamper/test.ts': 'it("x", () => {})',
      'src/tax/index.ts': '/** @standard ЗДДС */\nexport const v = 1',
      'src/plain/index.ts': 'export const p = 1', // no standard claimed
    })
    const agents = folderAgents(cwd)
    const tamper = agents.find((a) => a.atom === 'tamper')!
    expect(tamper.hasTrinity).toBe(false) // no SKILL.md in fixture
    expect(tamper.proven).toBe(true) // test.ts beside
    expect(tamper.security).toBe(true) // cites ISO-27001 — a security standard, derived
    expect(agents.find((a) => a.atom === 'tax')!.security).toBe(false) // ЗДДС is a standard, not a security one
    expect(agents.find((a) => a.atom === 'plain')!.standards).toEqual([]) // claims nothing
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a @standard in a STRING is not a claim — read from comments, not raw text (grammar)', () => {
    const cwd = corpus({ 'src/x/index.ts': 'export const s = "mentions @standard ISO-27001 in a string"\nexport const y = 1' })
    expect(folderAgents(cwd)[0]!.standards).toEqual([]) // the string mention is data, not a banner
    rmSync(cwd, { recursive: true, force: true })
  })

  // THE MOVING ROSETTA: the security pole is whoever CITES a security standard — add one and it joins, no edit.
  it('derives the security lane from incidence — a proven security agent makes the pole GREEN', () => {
    const cwd = corpus({
      'src/tamper/index.ts': '/** @standard ISO/IEC-27017 cloud */\nexport const t = 1',
      'src/tamper/test.ts': 'it("x", () => {})',
    })
    const lanes = rosettaLanes(cwd)
    expect(lanes.security[0]!.gate).toBe('quantum-security')
    expect(lanes.security[0]!.pass).toBe(true) // the one security agent is proven
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an UNPROVEN security agent makes the pole RED and names it — the rosetta owes evidence', () => {
    const cwd = corpus({
      'src/tamper/index.ts': '/** @compliance ISO-27001 */\nexport const t = 1', // no test beside
    })
    const lanes = rosettaLanes(cwd)
    expect(lanes.security[0]!.pass).toBe(false)
    expect(lanes.security[0]!.detail).toMatch(/tamper/) // named
    rmSync(cwd, { recursive: true, force: true })
  })

  // FAIL-CLOSED, and the deep correction: a pole with NO incidence cannot warrant a push. You cannot claim the
  // security training if no folder-agent carries a security standard — the frozen empty list is not a yes.
  it('a pole with no incidence DENIES — no security agent means no security warrant', () => {
    const cwd = corpus({ 'src/tax/index.ts': '/** @standard ЗДДС */\nexport const v = 1', 'src/tax/test.ts': 'it("x",()=>{})' })
    const lanes = rosettaLanes(cwd)
    expect(lanes.security[0]!.pass).toBe(false) // no security agent — the pole cannot warrant
    expect(lanes.standards[0]!.pass).toBe(true) // but the standards pole has a proven claimant
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the standards lane is every standard-claiming agent — all proven ⇒ GREEN, one unproven ⇒ RED', () => {
    const green = corpus({
      'src/a/index.ts': '/** @standard X */\nexport const a = 1',
      'src/a/test.ts': 'it("x",()=>{})',
    })
    expect(rosettaLanes(green).standards[0]!.pass).toBe(true)
    rmSync(green, { recursive: true, force: true })
    const red = corpus({ 'src/b/index.ts': '/** @standard Y */\nexport const b = 1' }) // claims, no proof
    expect(rosettaLanes(red).standards[0]!.pass).toBe(false)
    rmSync(red, { recursive: true, force: true })
  })
})
