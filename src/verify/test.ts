import { describe, expect, it } from 'vitest'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { atomPath, INVENTORY, proved } from '@/verify'

const LEAN = join(process.cwd(), 'src', 'verify', 'lean')

describe('verify — the barrel offers the record, and the record answers for the sources', () => {
  it('addresses itself at the path it lives at', () => {
    expect(existsSync(join(process.cwd(), 'src', atomPath, 'SKILL.md'))).toBe(true)
  })

  it('offers the inventory through the barrel, so nothing deep-imports the child', () => {
    expect(typeof proved).toBe('function')
    expect(Array.isArray(INVENTORY.files)).toBe(true)
  })

  it('names every .lean source the tree holds — a file the record omits is unjudged', () => {
    const onDisk = readdirSync(LEAN)
      .filter((f) => f.endsWith('.lean'))
      .sort()
    const recorded = INVENTORY.files.map((f) => f.file).sort()
    expect(recorded).toEqual(onDisk)
  })

  it('derives every stub flag from the kernel\'s axiom list, never from the file text', () => {
    // sorryAx in the axioms IS the kernel saying 'declared, not proved'. A record whose stub flag
    // disagrees with its own axiom list was derived from something else — which is the defect.
    for (const file of INVENTORY.files) {
      for (const t of file.entries) {
        expect(t.stubbed).toBe(t.axioms.includes('sorryAx'))
        expect(t.axiomFree).toBe(t.axioms.length === 0)
      }
    }
  })
})
