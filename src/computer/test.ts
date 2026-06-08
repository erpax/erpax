import { describe, it, expect } from 'vitest'
import { PARTS, hardwareParts, softwareParts, allHealthy, failing, operates, recordComputerOnPath } from '@/computer'
import { finishedIdeaCrossed } from '@/seal'
import { deriveDiamond } from '@/diamond'
import { deriveFolderModel, buildReadmeCorpusContext, buildReadmeTypographyGraph } from '@/readme'

describe('computer — machine parts', () => {
  it('lists eight canonical parts (seven hardware + one software)', () => {
    expect(PARTS).toHaveLength(8)
    expect(hardwareParts()).toHaveLength(7)
    expect(softwareParts()).toHaveLength(1)
    expect(new Set(PARTS.map((p) => p.name)).size).toBe(8)
  })
  it('every part is healthy — the machine operates', () => {
    expect(failing()).toEqual([])
    expect(allHealthy()).toBe(true)
    expect(operates()).toBe(true)
  })
})

describe('computer — path ledger hook', () => {
  it('recordComputerOnPath — content-addressed append-only entry', () => {
    const a = recordComputerOnPath({ kind: 'test' }, '2026-06-08T12:00:00.000Z', null, 0)
    const b = recordComputerOnPath({ kind: 'test' }, '2026-06-08T12:00:00.000Z', null, 0)
    expect(a.entryUuid).toBe(b.entryUuid)
    expect(a.atomPath).toBe('computer')
  })
})

describe('computer — finishedIdeaCrossed', () => {
  const cwd = process.cwd()
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)

  it.each(['computer', 'computer/memory', 'computer/processor'] as const)(
    '%s crosses after trinity collapse',
    (atomPath) => {
      const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
      const model = deriveDiamond(atomPath)
      const cross = finishedIdeaCrossed({
        ...model,
        trinity: { form: folder.form, code: folder.code, proof: folder.proof },
        sealed: folder.sealed,
      })
      expect(folder.sealed).toBe(true)
      expect(folder.form).toBe(1)
      expect(folder.code).toBe(1)
      expect(folder.proof).toBe(1)
      expect(cross.crossed).toBe(true)
      expect(cross.impurities).toEqual([])
    },
  )
})
