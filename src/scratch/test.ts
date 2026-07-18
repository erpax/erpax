import { describe, it, expect } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { scriptAddress, saveScript, savedScripts } from './index'

// "Save all the scripts you throw away and they will quantomise in time." A throwaway is a proto-tool; saved and
// content-addressed, identical ones MERGE (the fold) — so the store accretes distinct measurements, not noise.
describe('scratch — throwaways content-addressed, identical ones quantomise to one', () => {
  it('same code ⇒ same address — a duplicate throwaway is the same thought, not a new one', () => {
    const a = 'console.log(1 + 1)'
    expect(scriptAddress(a)).toBe(scriptAddress('  ' + a + '\n')) // trimmed ⇒ content-addressed, whitespace-blind
    expect(scriptAddress(a)).not.toBe(scriptAddress('console.log(2 + 2)'))
    expect(scriptAddress(a)).toHaveLength(16)
  })

  it('saving two identical throwaways leaves ONE file — the fold collapses the duplicate', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-scratch-'))
    saveScript('const x = 1', cwd)
    saveScript('const x = 1', cwd) // identical ⇒ same address ⇒ same file
    expect(savedScripts(cwd)).toHaveLength(1)
    saveScript('const y = 2', cwd) // distinct ⇒ accretes
    expect(savedScripts(cwd)).toHaveLength(2)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an absent store is empty, not a crash — nothing saved yet is a valid state', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-scratch-empty-'))
    expect(savedScripts(cwd)).toEqual([])
    rmSync(cwd, { recursive: true, force: true })
  })
})
